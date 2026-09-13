---
theme: default
title: "ApplyIQ — Module 6: Performance & Real-Time Features"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 6: Performance & Real-Time Features

Making ApplyIQ Fast and Alive

6 Videos · 6 PA Checkpoints

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#FF5F56]" />
<div class="font-semibold">Akhil — Co-founder @ Zaio</div>
</div>

<style src="./styles/zaio.css"></style>

<!--
🎥 VIDEO NAME: "M6.0 — Module 6 Intro"
WHAT TO SAY: "ApplyIQ works and it's tested. But it's not fast, and it's not alive. Every page load hits Postgres even when nothing changed, and the only way to see an update is to hit refresh yourself. This module fixes both — caching makes it fast, WebSockets make it alive."
ENERGY: Purposeful. Two clear problems, two clear halves.
TIME: 1 min
-->

---

# Quick Recap: Where ApplyIQ Actually Is

<div class="columns"><div>

### ✅ After Module 5

- Full test suite, green in both workspaces
- `createApplicationController(repo)` — repo injected
- `applicationRepository(prisma)` — prisma injected
- `POST /api/applications` now validates (the bug tests found)
- Dashboard shows **real** stats from `lib/stats.js`

</div><div>

### 🔧 What's missing

- **`node-cache` not installed** — every read hits Postgres
- **`socket.io` not installed** — server can't push
- `@tanstack/react-query` **installed since Module 3, never used**
- `main.jsx` has no `QueryClientProvider`
- **Nothing in the UI can change a status** — no `api.patch` anywhere

</div></div>

> ⚠️ That last one matters more than it looks. `@dnd-kit` has been in `package.json` since Module 3 and is used in exactly zero files. The Kanban board renders columns and nothing else. We fix that in 6.4, because 6.5 and 6.6 have nothing to demo without it.

<!--
TIME: 2.5 min
ENERGY: Honest inventory again. Same as Module 5 opened.
WHAT TO SAY: "Two of these are just missing packages — node-cache and socket.io, we install those when we need them. But look at the last two, because they're the same kind of loose end I've been flagging since Module 4. TanStack Query has been sitting in our package.json since Module 3 doing absolutely nothing. And here's the one that actually blocks us: there is no way, anywhere in our interface, to change an application's status. The server endpoint exists. The controller even logs a status-change activity. But nothing in React ever calls it. So when I tell you in video five that we push a notification the moment a status changes — there is currently no way to make a status change. We fix that in 6.4."
DEMO: `grep -rn "api.patch" client/src` — nothing. Open KanbanPage, show it only filters and maps.
TRANSITION: "Six videos, two halves."
-->

---

# Module 6 Map — 6 Videos, 6 Checkpoints

Two themes: make it **fast** (caching), then make it **alive** (real-time).

<div class="columns"><div>

| # | PA | Video |
|---|----|-------|
| 6.1 | PA1101 | Plan a Caching Strategy |
| 6.2 | PA1103 | Implement Caching |
| 6.3 | PA1102 | Manage State Between Requests |

</div><div>

| # | PA | Video |
|---|----|-------|
| 6.4 | PA1104 | State-Management Technologies |
| 6.5 | PA1105 | Two-Way Communication (WebSockets) |
| 6.6 | PA1106 | Real-Time Notifications (Socket.IO) |

</div></div>

> 💡 This entire module earns **PS11** — the performance & real-time outcome set.

> ⚠️ Everything we add this module must keep the Module 5 suite green. If a cache breaks a controller test, the cache is wrong — not the test.

<!--
TIME: 1 min
WHAT TO SAY: "First three videos are speed. Last three are real-time. And read the warning, because it's the rule for this whole module: we have a test suite now, and it stays green. If something I add in video two makes a video-5.4 test go red, that's not the test being annoying — that's the test doing exactly the job we built it for."
TRANSITION: "One note on format, then video one."
-->

---

# Same Format — Read Before You Trust

<div class="columns"><div>

### The loop, unchanged
1. **Spec** — I say what I want and why
2. **Prompt** — you paste the prompt on the slide
3. **Read** — walk the generated code line by line
4. **Check** — tick the Checkpoint Check slide

</div><div>

### What's different here
- The server is **CommonJS**. Every caching and socket tutorial online is ESM.
- Our routes go through **controller + repository**. Tutorials inline Prisma into the route.
- We now have **tests**. Run them after every video.

</div></div>

> ⚠️ This module has the widest gap yet between what the internet writes and what our codebase looks like. Every Socket.IO example you'll ever see puts `io` in `server.js` and reaches for it globally. Ours has to travel to a controller that takes its dependencies as arguments. Read the diff.

> 💡 `server/CLAUDE.md` from Video 4.1 is doing heavy lifting this module. If a prompt returns `import` statements, the model didn't read it.

<!--
TIME: 1.5 min
ENERGY: Brisk.
WHAT TO SAY: "Same four beats. The thing to watch this module is the gap between tutorials and us. Caching and WebSockets are the two most blogged-about topics in Node, and every single one of those posts inlines Prisma straight into a route handler and uses import syntax. We don't do either. So the read step is where you earn your money this module — the code will look plausible and be wired into the wrong layer."
TRANSITION: "Video one — decide what to cache before we cache anything."
-->

---
layout: section
---

<span class="pa-badge">PA1101</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.1

# Plan a Caching Strategy

#### ApplyIQ · Deciding what to cache, and for how long, before writing a line of code

~6 min

<!--
🎥 VIDEO NAME: "M6.1 — Plan a Caching Strategy (PA1101)"
🎯 OBJECTIVE: By the end the student can explain cache-aside and justify a TTL and a cache key for each real endpoint in our API.
WHAT TO SAY: "Before we touch code, we plan. Caching isn't 'add caching everywhere' — it's deciding what's safe to cache and for how long. Get it wrong and users see stale data, which is a worse bug than slow data because it looks like it's working."
DEMO: DevTools Network tab on the dashboard. Point at the response time for /api/applications. That number is what we're killing.
COMMON QUESTION: "Why not cache everything forever?" — Because data changes. A stale cache is a bug. Strategy = matching TTL to how often data actually changes.
TRANSITION: "Plan in hand — let's implement it."
TIME: 15s divider
-->

---

# The Prompt — Video 6.1

```text
Read server/src/routes/applications.js, server/src/routes/ai.js,
server/src/controllers/applications.js and
server/src/repositories/applicationRepository.js first.

Create server/CACHING.md — a written caching strategy. No code changes.

For every GET endpoint that actually exists in our API, give a row with:
 - the route as it is really mounted (they live under /api/applications)
 - whether to cache it, yes or no
 - a TTL in seconds, with a one-line justification
 - the exact cache key, which MUST include the user id, because every
   one of our reads is scoped to req.user.id
 - which write operations invalidate that key

Then add a short "Do not cache" section listing endpoints that must
never be cached and why. Consider the AI cover-letter routes carefully.

Only list endpoints that exist in the files you read. Do not invent a
/applications/stats route — we do not have one; stats are computed on
the client in lib/stats.js.
```

> ⚠️ **What it usually gets wrong:** inventing `GET /api/applications/stats`. It's in every caching tutorial and it is not in our API — we compute stats client-side in `lib/stats.js`, which we built in Module 5.3. A strategy doc describing routes you don't have is worse than no doc.

> 💡 The AI routes are the interesting judgement call. `POST /api/ai/cover-letter` costs real money per call — but it's a `POST`, and caching a generation would hand every user the same letter. Make it say why.

<!--
TIME: 3 min
ENERGY: Planning video. Keep it tight — the thinking is the deliverable.
WHAT TO SAY: "Notice the last instruction, and notice that I had to write it. Every caching tutorial on the internet caches a stats endpoint, so the model will confidently put one in your strategy document. We don't have one — we deliberately moved stats to the client in Module 5 and tested it as a pure function. If your strategy doc lists a route you don't own, then in video two you'll be implementing a cache for a route that doesn't exist, and you'll waste twenty minutes before you work out why."
DEMO: Run the prompt. Open CACHING.md, read the TTL column against `routes/applications.js`. Delete any invented row live.
TRANSITION: "Why cache-aside, and why a key per user?"
-->

---

# Every Read Hits the Database

ApplyIQ re-queries PostgreSQL on every request — even when nothing changed.

<div class="columns"><div>

**Without cache**

React → Express → controller → repo → Prisma → Postgres
**200–800 ms**, every single time

</div><div>

**With cache**

React → Express → controller → **cache HIT**
**~0 ms** on repeat requests

</div></div>

> 💡 **Cache-aside:** check the cache → HIT returns instantly; MISS queries the DB, stores the result, then returns it. The next request is free.

> ⚠️ Common mistake: caching data that changes constantly. A stale number is a worse bug than a slow one, because the app looks like it's working.

<!--
WHAT TO SAY: "Cache-aside is the pattern and the name tells you the shape — the cache sits beside your data source, not in front of it. Check it first. Hit, return. Miss, go to Postgres, store what you got, return it. Every fast app you've used today works this way."
DEMO: DevTools, reload the dashboard three times, point at the repeated query time in the server log.
TIME: 3 min
-->

---

# Different Data, Different Lifetimes

A strategy means matching the **TTL** to how often the data actually changes — and keying by user.

| Real endpoint | Cache? | TTL | Key |
|---|---|---|---|
| `GET /api/applications` | ✅ | 300s | `applications:{userId}` |
| `GET /api/applications/:id` | ✅ | 300s | `application:{userId}:{id}` |
| `POST /api/ai/cover-letter` | ❌ | — | a POST, and it costs money per call |
| `POST /api/auth/login` | ❌ | — | never cache credentials |

> 💡 **Every key contains the user id.** Our repository filters by `userId` on every read — the cache must too, or you serve User A's applications to User B.

> 🔗 QCTO Bridge: ASP.NET frames this as configuring `OutputCache` / `MemoryCache` durations. Same idea — we pick a TTL per endpoint instead of a `[OutputCache(Duration=...)]` attribute.

<span class="pa-badge earned">PA1101 ✅</span>

<!--
WHAT TO SAY: "Look at the key column, because this is the part that becomes a security incident rather than a performance bug. Go back to Module 5.5 — we tested that findOwned filters on id AND userId, and I told you that where clause was an authorisation check. A cache key is exactly the same thing one layer up. Cache under the key 'applications' with no user id, and the first user to load the page fills the cache, and the second user gets handed their data. That's not slow, that's a breach."
DEMO: Walk the table. Ask out loud why the AI route is a no — it's a POST, and it costs money, and two users must never share a letter.
TIME: 2 min
-->

---

# Checkpoint Check — PA1101

- [ ] `server/CACHING.md` exists and lists **only** routes that are really mounted
- [ ] There is **no** `/applications/stats` row — we don't have that endpoint
- [ ] Every cache key includes `{userId}`
- [ ] Each TTL has a one-line justification, not just a number
- [ ] The AI cover-letter routes are listed as **do not cache**, with a reason
- [ ] Every row names the write that invalidates it

> 🔎 Check it against reality: open `routes/applications.js` beside the doc. Every row in the table should map to a line in that file. Anything left over was invented.

<!--
TIME: 2 min
WHAT TO SAY: "Do the 🔎 check properly — files side by side. A strategy document is only useful if it describes the system you actually have, and the failure mode of an AI-written doc is that it describes the system most people have. Those aren't the same thing, and the difference is where your bugs live."
DEMO: Side-by-side walkthrough. Delete any invented row.
TRANSITION: "Plan's real. Let's build it."
-->

---
layout: section
---

<span class="pa-badge">PA1103</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.2

# Implement Caching

#### ApplyIQ · A cache service wired into our controller — without breaking the test suite

~8 min

<!--
🎥 VIDEO NAME: "M6.2 — Implement Caching (PA1103)"
🎯 OBJECTIVE: By the end the student can build a cache service and wire cache-aside into a controller that receives its dependencies by injection.
⚠️ RECORDING NOTE — node-cache is NOT installed. This is a real npm install. Also: do NOT change the JSON response shape. DashboardPage, ApplicationsPage and KanbanPage all do `const { data } = await api.get("/applications")` and treat data as a bare array. Wrapping it in { data, fromCache } breaks all three pages at once. We signal cache status in an X-Cache header instead — which is also what real APIs do.
WHAT TO SAY: "We have the plan, now we build it. And we build it into the layer our app actually uses, not into a route handler."
DEMO: Install node-cache. Create lib/cacheService.js. Wire it into the controller. Hit the endpoint twice and watch X-Cache flip from MISS to HIT.
COMMON QUESTION: "Is in-memory cache enough for production?" — For one server, yes. Scale to several and you move to Redis — same pattern, shared store.
TRANSITION: "Caching is great until the data changes underneath it."
TIME: 15s divider
-->

---

# The Prompt — Video 6.2

```text
Read server/CACHING.md, server/src/controllers/applications.js,
server/src/routes/applications.js and server/tests/applicationsController.test.js
first.

1. Install node-cache in server/ (it is not installed yet).

2. Create server/src/lib/cacheService.js — CommonJS, module.exports.
   Wrap node-cache with get, set, del, invalidatePattern(prefix) and
   stats. Use stdTTL 300 and checkperiod 60. Create the NodeCache
   instance once at module load, never per request.

3. Wire cache-aside into the LIST action in
   server/src/controllers/applications.js. Critical constraints:
   - The controller is a factory: createApplicationController(repo).
     Add cache as a SECOND parameter WITH A DEFAULT:
     (repo, cache = cacheService). The Module 5 tests call it with one
     argument and they must keep passing.
   - Key it applications:${req.user.id} exactly as CACHING.md says.
   - DO NOT change the JSON body. It must stay a bare array. Three React
     pages destructure it as an array today.
   - Signal cache status with a response header instead:
     res.set("X-Cache", "HIT") or "MISS".

4. Do not touch routes/applications.js. Do not add caching to any other
   action yet — invalidation is the next video.

Then run the server test suite and confirm it is still green.
```

> ⚠️ **What it usually gets wrong:** rewriting the response as `res.json({ data: apps, fromCache: true })`. That is what every tutorial does, and it silently breaks `DashboardPage`, `ApplicationsPage` and `KanbanPage` — all three read the body as an array. You'd see three blank pages and no error message.

> 💡 The default parameter `cache = cacheService` is the whole trick for keeping Module 5 green. Your existing tests call `createApplicationController(fakeRepo)` with one argument and carry on working.

<!--
TIME: 4 min
ENERGY: This is the "new feature meets existing tests" video. Lean on it.
WHAT TO SAY: "Two constraints in this prompt are load-bearing and I want to explain both. Constraint three, second bullet: the default parameter. Our controller takes a repo. I'm adding a cache, and if I just add a second required argument then every test we wrote in Module 5.4 breaks instantly, because they all call it with one. Give it a default and they don't even notice. That's not a trick, that's how you add a dependency to code that's already under test. And the third bullet is the one that would have cost me an afternoon: do not touch the response shape. Every tutorial wraps the array in an object with a fromCache flag. Do that here and three pages go blank, because they all destructure the body as an array — and React won't error, it'll just render nothing."
DEMO: Run the prompt. Read the controller diff. Then run `npm test` and show green — that's the real checkpoint.
TRANSITION: "Let's look at the service itself."
-->

---

# A Cache Service With One Job

```js
// server/src/lib/cacheService.js — CommonJS, like every other lib/ file
const NodeCache = require("node-cache");

// created ONCE at module load — never inside a request handler
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const cacheService = {
  get: (key) => cache.get(key),
  set: (key, val, ttl) => cache.set(key, val, ttl),
  del: (key) => cache.del(key),
  invalidatePattern: (prefix) =>
    cache.keys().filter((k) => k.startsWith(prefix)).forEach((k) => cache.del(k)),
  stats: () => cache.getStats(),
};

module.exports = cacheService;
```

> 💡 `stdTTL: 300` = keys expire after 5 minutes. `checkperiod: 60` = sweep expired keys every minute. One file, one responsibility — it sits in `lib/` next to `prisma.js` and `logger.js`.

> ⚠️ Building the cache inside a handler gives every request its own empty cache. It will appear to work, hit rate zero, and you'll wonder why nothing got faster.

<!--
WHAT TO SAY: "Same shape as lib/prisma.js and lib/logger.js — one module-level instance, exported. And that matters here more than usual: if you create the NodeCache inside the request handler, every single request gets a brand new empty cache. Nothing errors. Nothing warns you. Your hit rate is just permanently zero and the app is exactly as slow as before."
DEMO: Create the file. In a REPL, set a key, get it back, log stats.
TIME: 3 min
-->

---

# Cache-Aside Inside the Controller

```js
const createApplicationController = (repo, cache = cacheService) => ({
  list: async (req, res) => {
    const key = `applications:${req.user.id}`;      // per-user, always

    const cached = cache.get(key);
    if (cached) {
      res.set("X-Cache", "HIT");                    // header, not body
      return res.json(cached);                      // ← still a bare array
    }

    const apps = await repo.findByUser(req.user.id);
    cache.set(key, apps);
    res.set("X-Cache", "MISS");
    res.json(apps);                                 // ← same shape as before
  },
  // ...create, getOne, update, remove unchanged for now
});
```

> 💡 The controller still doesn't know what a database is. It asks `repo` for data and asks `cache` to remember it — both arrived as arguments. That's the same seam from Module 5, now carrying two things.

> 🔗 QCTO Bridge: ASP.NET injects `IMemoryCache` and calls `_cache.GetOrCreate(key, ...)`. Our injected `cache` is the same `GetOrCreate` shape, hand-rolled. Scaling out swaps node-cache for **Redis**, exactly as ASP.NET swaps to `IDistributedCache`.

<span class="pa-badge earned">PA1103 ✅</span>

<!--
WHAT TO SAY: "Read the return statements. Both of them send a bare array, identical to what this endpoint sent before we touched it. The only difference a client can see is a header. That's deliberate — I've added a significant performance feature and the API contract did not change, which means no React code has to change, and none of our tests have to change. Adding capability without changing contracts is most of what senior engineering actually is."
DEMO: Hit the endpoint twice in Postman. Show X-Cache flip MISS → HIT, and the time drop. Then run the M5 suite — still green.
TIME: 4 min
-->

---

# Checkpoint Check — PA1103

- [ ] `node-cache` is in `server/package.json` — a real install happened
- [ ] `cacheService.js` uses **`require`** and `module.exports`
- [ ] The `NodeCache` instance is created **once**, at module load
- [ ] The controller signature is `(repo, cache = cacheService)` — with the default
- [ ] `GET /api/applications` still returns a **bare array** — check in Postman
- [ ] `X-Cache` flips `MISS` → `HIT` on the second call
- [ ] **`npm test` is still green in `server/`**

> 🔎 Test it for real: open the dashboard, the applications page and the Kanban board in the browser. All three must still render. If any is blank, the response shape changed.

<!--
TIME: 2 min
ENERGY: The last two lines are the real checkpoint.
WHAT TO SAY: "The last line and the 🔎 line are the two that matter. Anyone can make a cache return a value. What we're checking is that adding it didn't break the seven tests we wrote last module or the three pages we built two modules ago. That's the actual skill — changing a live system without disturbing it."
DEMO: Run the suite, then open all three pages.
TRANSITION: "Now — what happens when the data changes?"
-->

---
layout: section
---

<span class="pa-badge">PA1102</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.3

# Manage State Between Requests

#### ApplyIQ · Invalidating on every write so users never see stale results

~7 min

<!--
🎥 VIDEO NAME: "M6.3 — Manage State Between Requests (PA1102)"
🎯 OBJECTIVE: By the end the student can invalidate cached state on writes so reads stay consistent across requests.
WHAT TO SAY: "HTTP is stateless — each request starts fresh. But our cache now holds state between requests, and that state goes stale the moment anyone writes. Managing it means: every write throws the old cache away."
DEMO: Cache the list. Create an application. Without invalidation the GET still shows the old list — that's the bug, show it first. Then add invalidation and watch it correct.
COMMON QUESTION: "What if I forget to invalidate somewhere?" — That's the classic bug. Every write endpoint invalidates. A POST/PATCH/DELETE with no invalidation should fail code review.
TRANSITION: "Server state's consistent. Now the client's."
TIME: 15s divider
-->

---

# The Prompt — Video 6.3

```text
Read server/src/controllers/applications.js (now cached) and
server/CACHING.md first.

Add cache invalidation to the write actions in the applications
controller. It already receives cache as its second parameter.

1. create, update and remove must each call
   cache.invalidatePattern(`applications:${req.user.id}`) AFTER the
   write succeeds, never before.
2. Do not invalidate in list or getOne — reads populate the cache,
   writes clear it.
3. Keep every existing behaviour intact: create still calls
   repo.logActivity, update still logs STATUS_CHANGE only when the
   status actually changed, remove still returns 204.

Then add server/tests/cache.test.js with two tests:
 - list caches: call list twice with a fakeRepo whose findByUser is a
   jest.fn(), and assert findByUser was called ONCE
 - create invalidates: call create then list, and assert findByUser
   is called again afterwards
Pass a real cacheService in these tests, and clear it between tests.

Run the full server suite afterwards.
```

> ⚠️ **What it usually gets wrong:** invalidating *before* the write. If `repo.update` then throws, you've cleared a perfectly good cache for nothing. Worse, some versions invalidate inside `list` — which empties the cache on every read and makes the hit rate permanently zero while looking completely reasonable.

> 💡 The two tests are the point of this video. A cache you can't prove is invalidating is a cache you'll be debugging at 2am.

<!--
TIME: 3 min
WHAT TO SAY: "Instruction one says after the write succeeds, and that ordering is not fussiness. If you clear the cache and then the database write throws, you've thrown away good data to make room for a change that never happened. Invalidate after. And the tests at the bottom are the real deliverable here — this is the first module where we're adding behaviour that's genuinely hard to see. A stale cache doesn't crash. It just quietly serves yesterday's answer, and the only thing that catches it early is a test that counts how many times the repository actually got called."
DEMO: Run the prompt. Read the diff — check invalidation is after the await in all three.
TRANSITION: "Why this is famously the hard one."
-->

---

# The Hardest Problem in Computer Science

> "There are only two hard things in computer science: cache invalidation and naming things." — Phil Karlton

<div class="columns"><div>

**Invalidate on writes**

- `POST` — create
- `PATCH` — update
- `DELETE` — remove

</div><div>

**Never on reads**

`list` and `getOne` **populate** the cache. If a read clears it, your hit rate is zero forever — and nothing errors.

</div></div>

```js
create: async (req, res) => {
  const app = await repo.create({ ...req.body, userId: req.user.id });
  await repo.logActivity(app.id, "APPLIED");
  cache.invalidatePattern(`applications:${req.user.id}`);  // ← after the write
  res.status(201).json(app);
},
```

> 💡 The next `GET` is now a guaranteed MISS, so it re-reads the truth from Postgres and rebuilds the cache. Reads and writes stay in sync.

> 🔗 QCTO Bridge: This is QCTO's "manage state for consistency between requests." ASP.NET meets the same need with **Session** (per-user server state) and **TempData** (state surviving one redirect). We hold per-user state in the cache and clear it deliberately.

<span class="pa-badge earned">PA1102 ✅</span>

<!--
WHAT TO SAY: "One line, placed after the write. And notice it sits underneath logActivity, which we wrote back in Module 2 — the create action now does three things and they're in causal order: write it, log it, forget what you thought you knew. Read that right-hand column too, because 'invalidating on reads' is a bug I've genuinely shipped. It looks completely sensible in a diff. Your cache just never holds anything, and your app is exactly as slow as it was before you spent a day adding caching."
DEMO: Show the stale bug FIRST — comment out invalidation, create an app, GET, old list. Then uncomment and show it correct.
TIME: 4 min
-->

---

# Checkpoint Check — PA1102

- [ ] `create`, `update` and `remove` all invalidate — **after** the write
- [ ] `list` and `getOne` do **not** invalidate
- [ ] The invalidation key matches the one `list` writes — same `applications:${userId}` prefix
- [ ] `cache.test.js` proves `findByUser` is called **once** across two `list` calls
- [ ] `cache.test.js` proves it's called **again** after a `create`
- [ ] The full server suite is green

> 🔎 Test it for real: comment out the invalidation in `create`. The second cache test must go red. That test is the only thing standing between you and a stale-data bug that users report as "the app is broken" three weeks from now.

<!--
TIME: 2 min
WHAT TO SAY: "Line three catches a genuinely nasty typo. If list writes under 'applications:u1' and create clears 'application:u1' — singular — everything runs, nothing errors, and the cache never clears. Same prefix, both places. Read them next to each other."
DEMO: Do the sabotage.
TRANSITION: "Server's fast and consistent. The browser still re-fetches everything."
-->

---
layout: section
---

<span class="pa-badge">PA1104</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.4

# State-Management Technologies

#### ApplyIQ · TanStack Query on the client — and finally making the Kanban board work

~9 min

<!--
🎥 VIDEO NAME: "M6.4 — State-Management Technologies (PA1104)"
🎯 OBJECTIVE: By the end the student can use TanStack Query to cache server state on the client, mutate it, and invalidate after the mutation.
⚠️ RECORDING NOTE — this is the biggest video in the module and it does double duty. @tanstack/react-query has been installed since Module 3 and never used; main.jsx has no provider. AND there is currently no way to change a status in the UI (@dnd-kit installed, zero usages, no api.patch anywhere). Videos 6.5 and 6.6 have NOTHING TO DEMO until this video wires drag-and-drop to a mutation. Do not skip the dnd part or the rest of the module doesn't work.
WHAT TO SAY: "We cached on the server. The browser still re-fetches everything on every navigation. TanStack Query is the client-side answer — and while we're in there, we're finally going to make that Kanban board do something."
DEMO: Wrap the app. Refactor DashboardPage from useState/useEffect to useQuery — watch the line count drop. Then drag a card and watch the list update itself.
COMMON QUESTION: "Isn't useState/Redux enough?" — That's for UI state. TanStack Query is for SERVER state — data that lives somewhere else and can go stale. Different problem, different tool.
TRANSITION: "The client's fast. Now let's make the server able to talk back."
TIME: 15s divider
-->

---

# The Prompt — Video 6.4

```text
Read client/CLAUDE.md, client/src/main.jsx, client/src/lib/api.js,
client/src/pages/DashboardPage.jsx, client/src/pages/KanbanPage.jsx,
client/src/lib/statuses.js and client/src/components/applications/
ApplicationCard.jsx first.

@tanstack/react-query and @dnd-kit are ALREADY in package.json — do not
install them. The client is ESM.

1. Wrap the router in QueryClientProvider in main.jsx. One QueryClient,
   created once at module scope.

2. Create client/src/hooks/useApplications.js:
   - useApplications() — useQuery, key ["applications"], queryFn hits
     api.get("/applications").then(r => r.data). Our API returns a BARE
     ARRAY, not { data }. staleTime 5 minutes to match the server TTL.
   - useUpdateApplication() — useMutation calling
     api.patch(`/applications/${id}`, patch), and on success
     invalidateQueries({ queryKey: ["applications"] }).

3. Refactor DashboardPage to use useApplications() instead of
   useState/useEffect. Keep calculateStats from lib/stats.js and keep
   toWeeklyData — do not reimplement either.

4. Wire drag-and-drop on KanbanPage with @dnd-kit so dragging a card to
   another column calls useUpdateApplication with { status: <new column> }.
   Columns come from lib/statuses.js. Keep ApplicationCard as the card.

Do not change client/src/lib/api.js.
```

> ⚠️ **What it usually gets wrong:** writing `queryFn: () => api.get("/applications")` and forgetting `.then(r => r.data)` — you get an axios response object where the component expects an array. Also watch for it re-implementing stats inline instead of importing the tested `calculateStats` we wrote in Module 5.3.

> 💡 Four jobs in one prompt, but only two ideas: a cache for reads (`useQuery`) and an invalidation after writes (`useMutation`). It's the same pattern as videos 6.2 and 6.3, moved into the browser.

<!--
TIME: 4 min
ENERGY: Big video. Signpost clearly so it doesn't feel like a pile of tasks.
WHAT TO SAY: "Four instructions, and I know that's a lot for one prompt, so here's the shape: two of them are the checkpoint and two of them are unblocking the rest of the module. Instructions one to three are PA1104 — client-side state management, useQuery for reads, useMutation with invalidation for writes, which is literally the same thing we did on the server in the last two videos just moved into React. Instruction four is the one I flagged at the start: there is currently no way to change an application's status anywhere in this app, and videos five and six are entirely about what happens when a status changes. So we're wiring drag-and-drop now, and when a card lands in a new column it fires that mutation. Watch for the .then r.data — our API returns a bare array, and if it forgets that unwrap, every page renders an axios response object and nothing works."
DEMO: Run the prompt. Show main.jsx diff, then the hook, then DashboardPage before/after line counts. Then drag a card.
TRANSITION: "Two caches now. Let's see how they line up."
-->

---

# Two Layers of Cache, One Pattern

```jsx
// client/src/hooks/useApplications.js
export const useApplications = () =>
  useQuery({
    queryKey: ["applications"],
    queryFn: () => api.get("/applications").then((r) => r.data),  // ← bare array
    staleTime: 5 * 60 * 1000,        // mirrors the server's 300s TTL
  });

export const useUpdateApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...patch }) => api.patch(`/applications/${id}`, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });
};
```

> 💡 `invalidateQueries` is `invalidatePattern` from video 6.3, in the browser. **node-cache** cuts database queries; **TanStack Query** cuts network round-trips. Same pattern, two layers.

> ⚠️ No `useState`, no `useEffect`, no manual loading flag. If the refactored `DashboardPage` still has a `useEffect` fetching applications, the refactor didn't happen.

<!--
WHAT TO SAY: "Put this side by side with the controller from video 6.3 and it's the same file written twice in different languages. Read populates a keyed cache. Write invalidates that key. The only difference is that one runs in Node and holds JSON, and the other runs in Chrome and holds React state. Learn the pattern once and you've learned both — and you'll recognise it again the first time you meet Redis or a CDN."
DEMO: DashboardPage before/after side by side — 15 lines of fetching become 1 hook call.
TIME: 4 min
-->

---

# Make the Board Do Something

Drag a card between columns → `useUpdateApplication` fires → server writes → **both** caches invalidate → UI updates.

```jsx
// KanbanPage.jsx — the drop handler is the whole point
function handleDragEnd(event) {
  const { active, over } = event;
  if (!over || active.data.current?.status === over.id) return;   // no-op drag

  updateApplication.mutate({ id: active.id, status: over.id });
}
```

> 💡 The guard on line three matters: dropping a card back into the column it came from must **not** fire a PATCH. Without it, every accidental nudge writes to your database.

> ⚠️ Until this video, `@dnd-kit` sat in `package.json` unused since Module 3 and nothing in the client had ever called `api.patch`. Videos 6.5 and 6.6 depend entirely on this handler existing.

> 🔗 QCTO Bridge: ASP.NET caches at the HTML layer with `OutputCache` on server-rendered views. TanStack Query is the SPA equivalent, caching at the **data** layer. Same goal — don't recompute what hasn't changed.

<span class="pa-badge earned">PA1104 ✅</span>

<!--
WHAT TO SAY: "That early return is small and it is the difference between a feature and a bug. Drag a card, change your mind, drop it back where it started — that fires a drag-end event with a perfectly valid target. Without the guard you've just written a PATCH to your database, invalidated two caches, and logged a status-change activity, for a status that didn't change. Users nudge cards constantly."
DEMO: Drag a card between columns — watch the list update and the server log show the PATCH. Then drag one back onto its own column and show nothing fires.
ENERGY: Satisfying — the board has been decorative for three modules.
TIME: 4 min
-->

---

# Checkpoint Check — PA1104

- [ ] `main.jsx` wraps the router in `QueryClientProvider`, one client at module scope
- [ ] `useApplications` unwraps with `.then(r => r.data)` — our API returns a bare array
- [ ] `DashboardPage` has **no** `useEffect` fetching applications any more
- [ ] It still imports `calculateStats` from `lib/stats.js` — not a reimplementation
- [ ] Dragging a card to a new column fires exactly **one** `PATCH`
- [ ] Dropping a card back on its own column fires **nothing**
- [ ] The list updates with no manual refetch and no page refresh

> 🔎 Test it for real: open the Network tab, drag a card, and count the requests. One `PATCH`, then one `GET` from the invalidation. If you see a `GET` storm, `staleTime` is missing or the query key is unstable.

<!--
TIME: 2 min
WHAT TO SAY: "Count the requests. One PATCH, one GET. If you're seeing a stream of GETs, the usual cause is a query key built inline as a new array or object every render, so TanStack thinks it's a different query each time. Network tab tells you in five seconds what reading the code might not."
DEMO: Network tab, drag, count.
TRANSITION: "The client asks and the server answers. Now let's let the server speak first."
-->

---
layout: section
---

<span class="pa-badge">PA1105</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.5

# Two-Way Communication

#### ApplyIQ · Opening a persistent, authenticated WebSocket so the server can push

~8 min

<!--
🎥 VIDEO NAME: "M6.5 — Two-Way Communication / WebSockets (PA1105)"
🎯 OBJECTIVE: By the end the student can explain why WebSockets beat polling, and emit a server-to-client event scoped to one authenticated user.
⚠️ RECORDING NOTE — socket.io is NOT installed. AND server.js currently calls app.listen(PORT) directly; Socket.IO needs an http.Server to attach to, so server.js gets a real refactor to http.createServer(app). The emit point already exists: controller.update has an `if (req.body.status && req.body.status !== existing.status)` block where it logs STATUS_CHANGE. The emit goes inside that same if. Point that out — the condition we need was written in Module 2.
WHAT TO SAY: "Until now the client asks and the server answers. One direction. But what if the server needs to tell the client something happened? That's two-way communication, and it needs a connection that stays open."
DEMO: Two browser tabs as two different users. Drag a card in A. Only A's tab gets the event.
COMMON QUESTION: "Does this cost a lot of server resources?" — WebSocket connections are lightweight; one server handles thousands. Far cheaper than every client polling every five seconds.
TRANSITION: "The server can push. Now the UI that receives it."
TIME: 15s divider
-->

---

# The Prompt — Video 6.5

```text
Read server/src/server.js, server/src/app.js,
server/src/controllers/applications.js,
server/src/middleware/authenticateToken.js and server/src/lib/prisma.js
first. CommonJS only.

1. Install socket.io in server/.

2. Refactor server/src/server.js. It currently calls app.listen(PORT)
   directly. Socket.IO needs a real http.Server, so:
   const http = require("http"); const server = http.createServer(app);
   then server.listen(PORT). Keep the existing logger.info line.

3. Create server/src/lib/io.js exporting { init(server), getIO() }.
   init builds the Socket.IO server with cors origin process.env.CLIENT_URL
   (the same variable app.js already requires) and stores the instance;
   getIO returns it and throws a clear error if init has not run.
   Follow the shape of lib/prisma.js and lib/logger.js.

4. Authenticate the socket in an io.use() middleware. Read
   socket.handshake.auth.token, jwt.verify it with process.env.JWT_SECRET
   exactly as middleware/authenticateToken.js does, then
   socket.join(`user:${payload.userId}`). Reject the connection if the
   token is missing or invalid.

5. In controllers/applications.js, inside the EXISTING
   `if (req.body.status && req.body.status !== existing.status)` block
   in the update action — right next to the repo.logActivity call —
   emit to that user's room:
   getIO().to(`user:${req.user.id}`).emit("application:statusChanged",
     { id: app.id, status: app.status, at: Date.now() })

Do not emit outside that if. Do not use io.emit — always scope to the room.
Run the server test suite afterwards.
```

> ⚠️ **What it usually gets wrong:** leaving `app.listen()` in `server.js` alongside the new `http.Server`. You get two listeners fighting for one port and an `EADDRINUSE` that looks like a stale process. It also loves `io.emit(...)` — which broadcasts one user's status change to **every connected user**.

> 💡 Step 5 needs almost no new logic. `controller.update` has had an `if status actually changed` block since Module 2, because that's when we added the activity log. We're adding one line inside a condition that already exists.

<!--
TIME: 4 min
ENERGY: The architecture video of the back half. Take it steadily.
WHAT TO SAY: "Step two is a real change to a file we've barely touched since Module 1. app.listen is a convenience — under the hood Express creates an http server for you. Socket.IO needs to attach to that server, so we have to create it ourselves and hand it to both. Watch for the model leaving the old app.listen line in; you'll get EADDRINUSE and spend ten minutes killing node processes that aren't the problem. And step five — go and read the update action before you run this. That if statement is already there. We wrote it in Module 2 so we could log a status change to the activity feed. The exact condition we need for 'should we notify?' was written months ago for a different reason. That happens a lot when the model's right."
DEMO: Run the prompt. Show the server.js diff. Then open controller.update and show the emit landing beside logActivity.
TRANSITION: "Why not just poll?"
-->

---

# Polling vs. WebSockets

<div class="columns"><div>

**Polling**

Client asks "anything new?" every 5s.
Wasteful when nothing changed, delayed when it did, and load scales with users.

</div><div>

**WebSockets**

One persistent connection. The server pushes the instant something happens.
No waste, no delay, low overhead.

</div></div>

```js
// lib/io.js — one instance, same shape as lib/prisma.js
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token"));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.join(`user:${payload.userId}`);     // ← private room per user
    next();
  } catch { next(new Error("Invalid token")); }
});
```

> 💡 Rooms isolate pushes. `io.to("user:" + id).emit(...)` reaches only that user's tabs — User A's notifications never land in User B's browser.

> ⚠️ Common mistake: `io.emit(...)`, which broadcasts to *everyone*. That's the same class of bug as a cache key without a user id — a privacy leak dressed as a feature.

<!--
WHAT TO SAY: "This is the third time this module we've hit the same idea, and I want to name it. Cache keys need a user id. Repository where-clauses need a user id. Socket rooms need a user id. Every layer that holds or routes data has to know who it belongs to, and every time somebody forgets, the bug isn't 'slow' or 'broken' — it's 'that user could see this other user's things.' Same mistake, three different disguises."
DEMO: Two tabs, two users, emit to one room, only that tab reacts.
TIME: 4 min
-->

---

# Emit Only When State Actually Changes

```js
update: async (req, res) => {
  const existing = await repo.findOwned(req.params.id, req.user.id);
  if (!existing) throw new NotFoundError("Application not found");

  const app = await repo.update(req.params.id, req.body);

  if (req.body.status && req.body.status !== existing.status) {
    await repo.logActivity(app.id, "STATUS_CHANGE",
      `${existing.status} → ${req.body.status}`);          // ← Module 2

    getIO().to(`user:${req.user.id}`).emit("application:statusChanged", {
      id: app.id, status: app.status, at: Date.now(),      // ← Module 6
    });
  }

  cache.invalidatePattern(`applications:${req.user.id}`);  // ← Module 6.3
  res.json(app);
},
```

> 💡 Editing a note → no push. Dragging a card from Applied to Interview → a real status change → push. The condition was already right.

> 🔗 QCTO Bridge: This is QCTO's "two-way communication server→client." ASP.NET's tool is **SignalR** — `Clients.Group(...).SendAsync(...)`. Socket.IO's `io.to(room).emit(...)` is the same call.

<span class="pa-badge earned">PA1105 ✅</span>

<!--
WHAT TO SAY: "Look at the dates on this function. The ownership check is Module 2. The activity log is Module 2. The invalidation is forty minutes ago. The emit is right now. Four modules of decisions stacked into one action, and every one of them is still doing its job. That's what it looks like when a codebase grows instead of getting rewritten — and it only works because each of those lines went in with a reason we could name."
DEMO: PATCH without a status change — silence. Drag a card to a new column — instant emit in the server log.
TIME: 4 min
-->

---

# Checkpoint Check — PA1105

- [ ] `socket.io` is in `server/package.json`
- [ ] `server.js` uses `http.createServer(app)` and `server.listen` — **no** leftover `app.listen`
- [ ] `lib/io.js` exports `init` / `getIO`, matching the `lib/` convention
- [ ] `io.use()` verifies the JWT and **rejects** a missing or bad token
- [ ] Each socket joins `user:${userId}` — nothing uses bare `io.emit`
- [ ] The emit sits **inside** the existing status-changed `if`
- [ ] `npm test` still green in `server/`

> 🔎 Test it for real: connect with a deliberately invalid token. The connection must be **rejected**, not accepted-then-ignored. An unauthenticated socket that silently joins no room is the bug you won't notice until someone else's data arrives.

<!--
TIME: 2 min
WHAT TO SAY: "Do the 🔎 check. The failure mode isn't a crash — it's a socket that connects fine, joins nothing, and sits there looking healthy. Then later someone loosens a room name, and that anonymous connection starts receiving events. Reject it at the door."
DEMO: Connect with a junk token, show the rejection.
TRANSITION: "The server pushes. Let's build the thing that listens."
-->

---
layout: section
---

<span class="pa-badge">PA1106</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS11</span>

## VIDEO 6.6

# Real-Time Notifications

#### ApplyIQ · The Socket.IO client, one shared connection, and a live notification bell

~8 min

<!--
🎥 VIDEO NAME: "M6.6 — Real-Time Notifications / Socket.IO (PA1106)"
🎯 OBJECTIVE: By the end the student can subscribe a React app to async server notifications on one shared connection and render them live.
⚠️ RECORDING NOTE — socket.io-client is NOT installed. Also: React 18+ StrictMode in dev mounts effects TWICE, so a naive connection opens two sockets and every notification appears twice. main.jsx has StrictMode on. The cleanup function in useEffect is what fixes it — demo the duplicate first, it's the best lesson in the video.
WHAT TO SAY: "The server pushes. Now the client listens — once, for the whole app, on a connection any component can read from."
DEMO: THE wow moment. Two windows side by side. Drag a Kanban card in one. The bell in the other updates instantly. Pause. Let it land.
COMMON QUESTION: "Why a context instead of connecting per component?" — One connection, many listeners. Per-component sockets duplicate events and waste resources.
TRANSITION: "PS11 earned. Next module we put it on the internet."
TIME: 15s divider
-->

---

# The Prompt — Video 6.6

```text
Read client/CLAUDE.md, client/src/main.jsx, client/src/lib/api.js,
client/src/components/layout/Header.jsx and client/src/hooks/
useApplications.js first. The client is ESM.

1. Install socket.io-client in client/.

2. Create client/src/context/SocketContext.jsx:
   - One socket, created in a useEffect, connecting to the API origin
     with auth: { token: localStorage.getItem("token") }
   - api.js baseURL ends in /api — the socket needs the ORIGIN, so strip
     the /api suffix rather than hardcoding a second URL
   - CRITICAL: return a cleanup function from the useEffect that calls
     socket.disconnect(). main.jsx runs StrictMode, which mounts effects
     twice in dev — without cleanup you get two sockets and every
     notification fires twice.
   - Listen for "application:statusChanged" and keep the last 10
     notifications in state, newest first, each with read: false
   - Expose { notifications, unreadCount, markAllRead }

3. Wrap the app in SocketProvider in main.jsx, inside QueryClientProvider.

4. Create client/src/components/layout/NotificationBell.jsx — a bell with
   an unread-count badge and a dropdown listing notifications with
   timestamps. Clicking it calls markAllRead. Mount it in Header.jsx.

5. When a notification arrives, also call
   queryClient.invalidateQueries({ queryKey: ["applications"] }) so the
   other tab's list refreshes, not just its bell.
```

> ⚠️ **What it usually gets wrong:** creating the socket in the component body instead of inside a `useEffect` with cleanup. In StrictMode you then get two connections and every notification renders twice — and because it's dev-only behaviour, people "fix" it by disabling StrictMode, which hides the bug instead of solving it.

> 💡 Step 5 is what makes it feel magical. Without it the bell updates but the board behind it is stale until you refetch. With it, the other tab's board rearranges itself.

<!--
TIME: 4 min
ENERGY: Build-up to the wow moment. Keep the pace.
WHAT TO SAY: "Two things I want to flag. The cleanup function — React's StrictMode deliberately mounts every effect twice in development to catch exactly this class of bug, so if you create a socket without disconnecting on unmount you end up with two live connections and every notification appears twice. And the fix people reach for is turning StrictMode off, which is like unplugging the smoke alarm. And step five is the one that turns this from a demo into a feature: when the event lands, we also invalidate the query, so the other tab doesn't just show a badge — the board actually rearranges."
DEMO: Run the prompt. Read the useEffect cleanup carefully. Then run it WITHOUT cleanup first to show the double notification.
TRANSITION: "One connection, many listeners."
-->

---

# One Connection, Many Listeners

```jsx
// client/src/context/SocketContext.jsx
useEffect(() => {
  const origin = api.defaults.baseURL.replace(/\/api$/, "");   // strip /api
  const socket = io(origin, { auth: { token: localStorage.getItem("token") } });

  socket.on("application:statusChanged", (data) => {
    setNotifications((prev) => [{ ...data, read: false }, ...prev.slice(0, 9)]);
    queryClient.invalidateQueries({ queryKey: ["applications"] });
  });

  return () => socket.disconnect();      // ← StrictMode-safe. Not optional.
}, []);
```

> 💡 One authenticated connection for the whole app. The bell, the board and the dashboard all read the same context — none of them open their own socket.

> ⚠️ Deriving the origin from `api.defaults.baseURL` matters more than it looks. Hardcode a second URL here and you'll deploy in Module 7 with a React app that calls the live API over HTTPS and opens a WebSocket to `localhost`.

<!--
WHAT TO SAY: "That regex on line two is me thinking one module ahead. Our axios baseURL points at the API and ends in slash api; the socket needs the bare origin. I could type the URL again — and then in Module 7 when we deploy, I'd change the axios one, forget this one, and ship a frontend that fetches from Render and opens a websocket to localhost. Derive it, don't repeat it. One source of truth for where the backend lives."
DEMO: Show the cleanup missing → two notifications per drag. Add cleanup → one.
TIME: 4 min
-->

---

# The Live Notification Bell

The payoff: a bell that updates the instant the server pushes — zero polling.

- 🔔 Bell with an **unread-count badge**
- Dropdown panel listing notifications with timestamps
- `markAllRead()` clears the badge on open
- The board behind it **also** refreshes, thanks to the invalidation

> 💡 Drag a Kanban card → `PATCH` → server writes → emits to `user:{id}` → **every open tab for that user** updates its bell *and* its board. No refresh, no delay.

> 🔗 QCTO Bridge: QCTO's "library for async server→client notifications" is **SignalR** in ASP.NET. **Socket.IO** is our equivalent — same job, same room/group model, JavaScript instead of C#.

<span class="pa-badge earned">PA1106 ✅</span>

<!--
WHAT TO SAY: "Two windows, side by side, logged in as the same user. Drag a card in the left one. Watch the right one. The bell counts up and the board rearranges itself, and nobody touched that window. That's the second wow of this course after the streaming letter in Module 4 — and this one's built out of four things you already understood: a PATCH, a room, an event, and a cache invalidation. Let it land before you say anything else."
DEMO: Two windows. Drag. Pause. Let students react before moving on.
ENERGY: Peak of the module. Do not rush past it.
TIME: 4 min
-->

---

# Checkpoint Check — PA1106

- [ ] `socket.io-client` is in `client/package.json`
- [ ] The socket is created **inside** a `useEffect` with a `disconnect()` cleanup
- [ ] Dragging a card produces exactly **one** notification, not two
- [ ] The origin is derived from `api.defaults.baseURL` — no second hardcoded URL
- [ ] Only one socket connects for the whole app — check the Network tab's WS panel
- [ ] The other tab's **board** updates too, not just the bell
- [ ] Logging out and back in reconnects with the new token

> 🔎 Test it for real: open two tabs as **different** users. Drag a card in one. The other user's bell must stay silent. If it moves, the room scoping is broken and every user is getting everyone's notifications.

<!--
TIME: 2 min
ENERGY: Serious on the last line.
WHAT TO SAY: "The 🔎 check is the one that matters and it's the same check I've asked for in three videos now. Two different users. One drags. The other must see nothing. If both bells move, you've got io.emit somewhere instead of io.to, and you've built a feature that broadcasts every user's private activity to your whole userbase."
DEMO: Two users, two tabs. Verify silence.
TRANSITION: "That's PS11."
-->

---
layout: cover
---

# Module 6 Complete — ApplyIQ Is Fast and Alive

Six checkpoints earned. Two layers of caching, consistent state, and real-time push.

<div class="mt-4 flex flex-wrap gap-2">
<span class="pa-badge earned">PA1101 ✅</span>
<span class="pa-badge earned">PA1102 ✅</span>
<span class="pa-badge earned">PA1103 ✅</span>
<span class="pa-badge earned">PA1104 ✅</span>
<span class="pa-badge earned">PA1105 ✅</span>
<span class="pa-badge earned">PA1106 ✅</span>
</div>

<div class="progress-bar mt-6"><div class="fill" style="width:100%"></div></div>

### We also closed two long-standing gaps

- `@tanstack/react-query` — installed in Module 3, finally doing its job
- The Kanban board — decorative for three modules, now drives the whole real-time flow

> 💡 One pattern, four places: cache the read, invalidate on write. node-cache, TanStack Query, socket rooms and repository filters all needed the same thing — a user id.

**Next — Module 7: Ship It to Production** · Render · Vercel · Cloudinary · CI/CD

<!--
🎥 VIDEO NAME: "M6.7 — End of Module 6!"
WHAT TO SAY: "PS11 fully earned. But the thing I'd actually take from this module is that one pattern showed up in four different disguises — cache the read, invalidate on the write, and always, always key it by user. Server cache, client cache, socket room, database query. Same shape every time. Next module we put this on the internet, and you get a URL you can send to your family."
ENERGY: Momentum into the finale.
TIME: 1 min
-->
