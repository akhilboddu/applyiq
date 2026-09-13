# ApplyIQ Server — Deployment

## Commands

| Phase | Command | Why |
|---|---|---|
| Build | `npm run build` (`prisma generate`) | Generates the Prisma client into `node_modules`. It is **not** committed, so without this step `require("@prisma/client")` resolves to an unusable stub and the server cannot start. |
| Start | `npm start` (`node src/server.js`) | `src/server.js` binds `process.env.PORT` with a `3000` fallback — the host assigns the port at runtime. |
| Migrate | `npx prisma migrate deploy` | Applies committed migrations. Use `deploy`, never `migrate dev`, which can prompt and can reset data. |

## Environment variables

Found by grepping `process.env` across `server/src` and `prisma.config.ts` —
this is the complete list, not a guess.

| Variable | Read at | Required | What breaks without it |
|---|---|---|---|
| `DATABASE_URL` | `src/lib/prisma.js:9`, `prisma.config.ts` | **Yes** | The Postgres adapter gets `undefined` as its connection string. Every query fails; `prisma generate` and `migrate deploy` also fail at build time. |
| `CLIENT_URL` | `src/app.js:20,23`, `src/lib/io.js:13` | **Yes** | `app.js` **throws at import time** — the process exits on boot, deliberately. Even if that guard were removed, `cors` would send no `Access-Control-Allow-Origin` header and every browser call would be blocked, as would every Socket.IO connection. |
| `JWT_SECRET` | `src/controllers/auth.js:55`, `src/middleware/authenticateToken.js:12`, `src/lib/io.js:24` | **Yes** | `jwt.sign` throws, so login 500s. `jwt.verify` throws for every request, so `authenticateToken` returns 403 on every protected route and every socket handshake is rejected. Changing this value invalidates all existing tokens. |
| `OPENAI_API_KEY` | `src/services/openai.js:8,12` | **Yes** | `services/openai.js` **throws at import time**. That module is reached through `routes/ai.js` → `app.js`, so a missing key stops the entire server booting, not just the AI routes. |
| `PORT` | `src/server.js:8` | No — falls back to `3000` | Nothing breaks locally. On a platform that assigns a port dynamically, the fallback would bind the wrong port and the health check would never pass. Set it in production. |
| `NODE_ENV` | `src/lib/logger.js:6`, `src/app.js` (health) | No — defaults to development behaviour | Logger stays at `debug` instead of `info`, so production logs are noisier and may include more detail than intended. Set to `production`. |
| `API_KEYS` | `src/middleware/authorize.js:27` | No | Only used by `apiKeyAuth`, which **is not currently mounted on any route**. Defaults to `""` → an empty allowlist, so every key is rejected. Set it only when you start using that middleware. |

Four of these (`DATABASE_URL`, `CLIENT_URL`, `JWT_SECRET`, `OPENAI_API_KEY`)
are hard requirements: two of them abort the process at import time by design,
which is preferable to failing mysteriously on the first request.

`server/.env.example` lists the same keys with empty values.

## Health check

`GET /api/health` — unauthenticated, returns:

```json
{ "status": "ok", "uptime": 123.45, "environment": "production" }
```

`uptime` is seconds since process start; a value that keeps resetting means the
process is crash-looping. Point the platform's health check at this path.

Note it reports that the **process** is up, not that the database is. A
dependency check would need a real query (`SELECT 1`) and is not implemented.

## Before the first deploy

- **There is no `.gitignore` in this repo, and `server/` is not a git
  repository at all.** `server/.env` and `server/.env.test` both contain a live
  `OPENAI_API_KEY`. Add a `.gitignore` covering `.env*` (keeping
  `.env.example`), `node_modules/`, and `logs/` *before* running `git init` —
  once a secret is committed, removing it later does not remove it from history.
- **Rotate the OpenAI key** if it has ever been pushed anywhere. It currently
  appears in two files on disk.
- `logger.js` writes to `logs/error.log` and `logs/combined.log`. On a platform
  with an ephemeral filesystem those vanish on restart — the Console transport
  is the one that matters there.
- `middleware/loginLimiter.js` and `lib/cacheService.js` both hold state in
  process memory. With more than one instance each gets its own, so rate limits
  and cache hits are per-instance. Fine for a single instance; needs a shared
  store (Redis) to scale out.
