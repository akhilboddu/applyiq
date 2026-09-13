# ApplyIQ — Server Conventions

This file is read automatically by Claude Code / Cursor on every prompt in this folder.

## Stack and module system

- **Express 5**.
- **CommonJS** throughout — `require(...)` / `module.exports`. Never `import`/`export`, never `.mjs`.
- Prisma **7** (`@prisma/client` + `@prisma/adapter-pg`), Joi **18**, `jsonwebtoken`, `bcryptjs`, `winston` (via `lib/logger.js`).

## Folder rules

```
src/
├── app.js                  # express() instance, middleware pipeline, route mounting
├── server.js               # boots app.js (the actual `node` entrypoint)
├── routes/                 # router files — wire middleware + controller, no logic
├── controllers/            # req/res handling: pull params, call the repo, shape the response
├── repositories/           # the only layer that talks to Prisma
├── middleware/             # authenticateToken, requireAuth, validate, asyncHandler, auditAction, authorize, errorHandler, loginLimiter, requestLogger
├── schemas/                # Joi schemas (e.g. auth.schema.js)
├── lib/                    # prisma client singleton, logger
└── errors/                 # custom error classes (e.g. NotFoundError)
```

**Do not exist yet — do not assume them:**
- `services/` — there is no service layer. Controllers call repositories directly.
- A `schemas/` file per resource — only `auth.schema.js` exists today. There is no
  `application.schema.js` yet; the applications routes currently take no Joi validation
  (see the "never do this" note below — this is a gap, not a pattern to copy without asking).

## The guard order on a protected route

```js
router.use(authenticateToken);   // 1. who are you — verifies the JWT, loads req.user
router.use(requireAuth);         // 2. are you logged in — 401s if req.user is missing
```

`authenticateToken` (`middleware/authenticateToken.js`) verifies the bearer token and attaches
`req.user`. `requireAuth` (`middleware/requireAuth.js`) is the route-scoped check that `req.user`
is actually set before the action runs — it's the "action filter" pattern, meant to sit after
`authenticateToken` in the chain.

Note: `routes/applications.js` currently mounts only `authenticateToken` and does not chain
`requireAuth` after it. Treat `authenticateToken` → `requireAuth` as the documented order for any
new protected route; don't silently "fix" the existing file to match — flag it if asked.

Ownership checks (a record belongs to `req.user.id`) happen inside the repository query itself
(`findFirst({ where: { id, userId } })`), not as separate middleware — a record you don't own
comes back 404, never 403.

## Validation

Validation is **Joi**, always through `middleware/validate.js`:

```js
router.post("/", validate(someSchema), asyncHandler(controller.create));
```

`validate(schema)` runs `schema.validate(req.body, { abortEarly: false })`, replaces `req.body`
with the cleaned `value`, and returns a `400` with a `{ field, message }[]` array on error.

**Never hand-roll validation** (`if (!req.body.email) ...` chains in a controller). If a route
needs a new shape validated, add/extend a schema in `schemas/`, not inline ifs.

## Never do this

- **Never log or return a `process.env` value.** Not in a response body, not in a `logger.info`/
  `logger.error` call, not in an error message. `errorHandler.js` already refuses to leak
  anything but a safe message for 500s — don't undo that by echoing config or secrets elsewhere.
- **Never call an external API directly from a route handler.** Route handlers wire middleware
  to a controller; controllers call repositories. Nothing in `routes/` or `controllers/` should
  hold a `fetch`/`axios` call to a third-party service.
- **Never create a new client instance per request.** `prisma` is a single instance from
  `lib/prisma.js`, imported wherever needed — never `new PrismaClient()` inside a route or
  controller. The same goes for any future external SDK client: instantiate once in `lib/`.
