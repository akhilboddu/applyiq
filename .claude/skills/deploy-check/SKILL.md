---
name: deploy-check
description: Verifies this repo is safe to deploy. Use before any push to main, before opening a deploy PR, and before running a Render deploy. Checks that every env var the server reads is documented, that the client hardcodes no localhost URLs, that a build script exists, and that render.yaml leaks no secrets.
---

# Deploy Check

Run all four checks, report **PASS** or **FAIL** for each, then give the verdict.

Report what the commands actually return. If a check fails, list the specific
offending lines — never a bare "FAIL" with no evidence.

---

## 1. Every `process.env.*` read in `server/src` is documented

The failure this prevents: an undocumented variable is forgotten in the
platform's dashboard, and the server either crashes at boot or misbehaves at
runtime with no clue why.

```bash
cd server

# every variable the code reads
grep -rhoE 'process\.env\.[A-Z_]+' src/ | sed 's/process\.env\.//' | sort -u > /tmp/dc-code.txt

# every variable the doc mentions
grep -ohE '\b[A-Z][A-Z0-9_]{2,}\b' DEPLOYMENT.md | sort -u > /tmp/dc-doc.txt

# in the code but not the doc
comm -23 /tmp/dc-code.txt /tmp/dc-doc.txt
```

- **PASS** — the final command prints nothing.
- **FAIL** — list each variable printed, with the `file:line` that reads it
  (`grep -rn "process.env.<NAME>" src/`).

If `server/DEPLOYMENT.md` does not exist, this is an automatic FAIL.

## 2. Nothing in `client/src` hardcodes localhost

The failure this prevents: a deployed frontend calling `localhost:3000`, which
resolves to the *visitor's own machine* and fails for every user.

A `localhost` string is only a bug when it is the *value used in production*. A
documented dev fallback behind `import.meta.env` is fine — Vite replaces the
env expression with a literal at build time and the fallback is folded away.
So exclude those lines, then confirm against the built bundle:

```bash
# 1. any localhost NOT behind an env-var fallback
grep -rn "localhost" client/src/ | grep -v "import.meta.env" || echo "CLEAN"

# 2. ground truth — a production build must not contain it
cd client && VITE_API_URL=https://example.invalid npm run build >/dev/null 2>&1
grep -c "localhost:3000" dist/assets/*.js || echo "0 — clean bundle"
```

- **PASS** — step 1 prints `CLEAN` and step 2 finds no matches.
- **FAIL** — list every `file:line` from step 1. Each needs to read
  `import.meta.env.VITE_API_URL` or use a relative path with a proxy.

`src/lib/api.js` exports `API_ORIGIN` as the single source of the host;
`CoverLetterPage.jsx` (streaming `fetch`) and `SocketContext.jsx` (socket
origin) both import it, so fixing `api.js` fixes all three.

## 3. `server/package.json` has a `build` script

The failure this prevents: Render's build step runs nothing, so
`prisma generate` never runs, the Prisma client is never generated — it is not
committed — and the server cannot start.

```bash
node -pe "require('./server/package.json').scripts.build || 'MISSING'"
```

- **PASS** — prints a command (expected: `prisma generate`).
- **FAIL** — prints `MISSING`, or prints a command that does not generate the
  Prisma client.

## 4. `render.yaml` leaks no secrets and pins the free plan

Only run this check **if `render.yaml` exists**. If it does not, report
`SKIPPED (no render.yaml)` — that is not a failure.

```bash
test -f render.yaml && cat render.yaml || echo "SKIPPED"
```

Read the file and confirm both:

- **Every secret-bearing `envVar`** (anything matching `*_URL`, `*_KEY`,
  `*_SECRET`, `*_TOKEN`, `DATABASE_*`) uses `sync: false` or `generateValue:
  true`. A literal `value:` on any of these commits the secret to the repo —
  FAIL, and name the key.
- **The API service sets `plan: free`.** A missing or different plan risks an
  unintended paid tier — FAIL, and say what it is set to.

Non-secret values (`NODE_ENV: production`, `PORT`) are fine as literals.

---

## Verdict

End with exactly one line:

- All checks passed → `SAFE TO DEPLOY`
- Otherwise → `NOT SAFE TO DEPLOY — failed: 1, 2` (the numbers that failed)

Do not soften a FAIL into a warning, and do not give the verdict before running
every check.
