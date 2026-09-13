# ApplyIQ — Caching Strategy

Scope: the endpoints that exist today in `src/routes/applications.js` and
`src/routes/ai.js`. Nothing here is implemented yet — this is the plan to
implement against.

## The rule that governs every key

Every read in this API is scoped to the caller. `controller.list` calls
`repo.findByUser(req.user.id)` and `controller.getOne` calls
`repo.findOwned(req.params.id, req.user.id)` — ownership is enforced *inside
the query* (`findFirst({ where: { id, userId } })`), which is why a record you
don't own returns 404 rather than 403.

That means **a cache key without the user id is a data leak**, not a
performance bug. Two users requesting `/api/applications` must never collide,
and `GET /api/applications/:id` must not serve user A's record to user B just
because the id matches. Every key below starts with the user id for that
reason.

## GET endpoints

| Route (as mounted) | Cache? | TTL | Cache key | Invalidated by |
|---|---|---|---|---|
| `GET /api/applications` | Yes | **60s** — read on every dashboard, list and kanban load; the only writer is the user themselves, and each write invalidates explicitly, so the TTL is a backstop rather than the primary freshness mechanism | `applications:list:{userId}` | `POST /api/applications`, `PATCH /api/applications/:id`, `DELETE /api/applications/:id` |
| `GET /api/applications/:id` | Yes | **30s** — deliberately shorter than the list, because this payload includes relations mutated from *another router*: `saveCoverLetter` is called by `routes/ai.js`, so an invalidation can be missed across module boundaries. The short TTL caps that blast radius | `applications:detail:{userId}:{applicationId}` | `PATCH /api/applications/:id`, `DELETE /api/applications/:id`, `POST /api/ai/cover-letter`, `POST /api/ai/cover-letter/stream` |

Those are the only two GET routes under `/api/applications`. There is **no
`/api/applications/stats` endpoint** — the dashboard totals are computed on the
client by `calculateStats` in `client/src/lib/stats.js` from the list response,
so caching the list is what makes the dashboard fast.

### Why the detail key has more invalidators than you'd expect

`repo.findOwned` does not return a bare application row. It includes:

```js
include: {
  activities:   { orderBy: { date: "desc" } },
  contacts:     true,
  coverLetters: { orderBy: { createdAt: "desc" }, take: 1 },
}
```

So the cached detail payload goes stale whenever any of those change:

- `PATCH /api/applications/:id` writes the application **and** may append an
  activity (`logActivity(app.id, "STATUS_CHANGE", ...)`) — two reasons at once.
- `POST /api/applications` appends an `APPLIED` activity, but to a brand-new
  application that has no cached detail entry yet. It invalidates the **list**
  key only.
- **Both AI routes call `repo.saveCoverLetter(applicationId, body)`**, and
  `coverLetters` is part of this payload with `take: 1` — a new letter changes
  what the detail route returns. These are `POST` routes on a different router
  that invalidate an `/api/applications` key. This is the easiest invalidation
  in the codebase to forget.

### Write operations, for reference

None of these are ever cached. Listed only to show what they invalidate.

| Write | Invalidates |
|---|---|
| `POST /api/applications` | `applications:list:{userId}` |
| `PATCH /api/applications/:id` | `applications:list:{userId}` + `applications:detail:{userId}:{applicationId}` |
| `DELETE /api/applications/:id` | `applications:list:{userId}` + `applications:detail:{userId}:{applicationId}` |
| `POST /api/ai/cover-letter` | `applications:detail:{userId}:{applicationId}` |
| `POST /api/ai/cover-letter/stream` | `applications:detail:{userId}:{applicationId}` |

## Do not cache

**`POST /api/ai/cover-letter`** — not idempotent. Each call is a fresh LLM
generation that bills an external provider and inserts a `CoverLetter` row via
`repo.saveCoverLetter`. Caching on the request body would return a stale letter
and silently skip the database write, so the user's letter would never be
saved. Two users sending identical form fields must get different letters.

**`POST /api/ai/cover-letter/stream`** — everything above, plus the response is
physically uncacheable as written. It sets `Content-Type: text/event-stream`,
calls `res.flushHeaders()`, and then `res.write(delta)` per chunk. A cache layer
that buffers the body to store it destroys the incremental delivery that is the
entire point of the route, and a cache that replays a stored body replays it
instantly, not as a stream. It also sets `Cache-Control: no-cache` already.

**All `POST` / `PATCH` / `DELETE` routes** — writes are never served from cache.
They are the invalidation triggers.

**Anything keyed without `userId`** — see the rule at the top. A key like
`applications:detail:{applicationId}` looks reasonable and leaks records across
accounts, because the ownership check lives in the query rather than in a
separate authorisation step.

**Error responses** — a 404 from `NotFoundError` means "not yours *or* not
there". Caching it would keep returning 404 after the record is created or
after ownership is granted.

### One endpoint outside the files above

`GET /api/health` (defined inline in `src/app.js`, not in a router) must never
be cached. A health check that returns a cached `{ status: "ok" }` reports the
cache's health, not the service's — it would keep saying "ok" after the process
has stopped being able to serve anything.

## Implementation notes

- Invalidate **on write completion**, not before — a failed `PATCH` must not
  evict a still-valid entry.
- Prefer explicit invalidation over short TTLs; the TTLs above exist to bound
  the damage when an invalidation is missed, not to substitute for one.
- `DELETE` should evict the detail key rather than let it expire, or a deleted
  record stays readable by id for up to 30 seconds.
- If a shared store (Redis) is introduced, namespace the keys by environment —
  `applyiq:{env}:applications:list:{userId}` — so a test run cannot serve
  entries into development.
