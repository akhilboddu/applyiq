---
theme: default
title: "ApplyIQ — Module 7: Deployment — Ship to Production"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 7: Deployment — Ship It to Production

"Works on my machine" means nothing. This does.

5 Videos · 5 PA Checkpoints

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#F5C518]" />
<div class="font-semibold">Akhil — Co-founder @ Zaio</div>
</div>

<style src="./styles/zaio.css"></style>

<!--
🎥 VIDEO NAME: "M7.0 — Module 7 Intro"
WHAT TO SAY: "Works on my machine means nothing. Every developer has said it. Every tech lead has rolled their eyes at it. This module is about making your app work on EVERY machine — by putting it on the internet where anyone can use it. This is the finish line of the entire course."
ENERGY: High. This is the finale. Open with conviction.
TIME: 1 min
-->

---

# Quick Recap: What We're Actually Deploying

<div class="columns"><div>

### ✅ After Module 6

- Express 5 API — tested, cached, rate-limited, JWT-protected
- React client — TanStack Query, working Kanban, live notification bell
- Socket.IO pushing per-user events
- Prisma 7 + Postgres via a driver adapter
- Full test suite green in both workspaces

</div><div>

### 🔧 What blocks deployment today

- `client/src/lib/api.js` **hardcodes `http://localhost:3000/api`**
- `server/package.json` has **no `build` script**
- `app.js` **throws at boot** if `CLIENT_URL` is unset
- `User` has **no `avatarUrl`** field
- No `.github/workflows/` — nothing runs the tests we wrote

</div></div>

> ⚠️ The first one is the single biggest deployment bug in this course. Deploy right now and you get a beautiful React app on a real URL that tries to fetch from `localhost` — so it works perfectly on your laptop and is completely broken for everyone else on earth.

<!--
TIME: 2.5 min
ENERGY: Honest inventory, same as the last two modules opened.
WHAT TO SAY: "Read that warning, because it's the classic. Your app will deploy successfully. Render will go green. You'll open the URL on your laptop and it'll work perfectly — because your laptop is running the API on localhost three thousand. Then you'll send it to a friend and they'll get a login page that spins forever, and the console will say connection refused to localhost, on their machine, where nothing is running. Every developer ships this bug exactly once. We're going to ship it zero times."
DEMO: Open `client/src/lib/api.js`, point at the hardcoded baseURL. Then `grep -rn "VITE_" client/src` — nothing.
TRANSITION: "Five videos to a live URL."
-->

---

# Module 7 Map — Your 5 Deployment Videos

<div class="columns"><div>

| # | PA | Video |
|---|---|---|
| 7.1 | PA1303 | Host & deploy on a web server |
| 7.2 | PA1301 | Deploy to the cloud |
| 7.3 | PA1304 | Host on a public cloud platform |

</div><div>

| # | PA | Video |
|---|---|---|
| 7.4 | PA1302 | Upload an image to cloud storage |
| 7.5 | PA1305 | Use cloud services to improve capabilities |

</div></div>

> 💡 This is PS13 — the whole deployment outcome set. By the end, ApplyIQ has a real public URL.

> ⚠️ Order matters here more than in any other module: the API has to be live before the frontend can point at it, and the database has to be migrated before either works.

<!--
TIME: 1 min
WHAT TO SAY: "Five videos, in the order you'd actually do it. Understand what hosting means, get the API up, get the frontend up and pointed at it, add proper image storage, then bolt on the managed services. And the dependency is real — you cannot point the frontend at the backend in video three until video two has given you a URL to point at."
TRANSITION: "Video one — what a web server actually is."
-->

---
layout: section
---

<span class="pa-badge">PA1303</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS13</span>

## VIDEO 7.1

# Host & Deploy on a Web Server

#### ApplyIQ · What a web server is — and the three changes that make our app hostable

~7 min

<!--
🎥 VIDEO NAME: "M7.1 — Host & Deploy on a Web Server (PA1303)"
🎯 OBJECTIVE: By the end the student can explain what a web server does, the difference between localhost and a hosted server, and what production-readiness changes a Node app needs.
⚠️ RECORDING NOTE — be honest about what's already done. server.js ALREADY reads process.env.PORT (fallback 3000, not 3001 — the old slide was wrong). And /api/health ALREADY exists in app.js. Do not pretend to add either from scratch. The genuinely missing piece is the build script — server/package.json has no "build", which means the Render build command in the next video would fail. That's the real work in this video.
WHAT TO SAY: "Before we deploy to any fancy cloud, you need to understand the thing we're deploying TO. A web server is just a computer, always on, with a public address, that listens for HTTP requests and sends back responses. Your laptop already does this — the only difference is yours isn't reachable from the internet."
DEMO: Show the app running on localhost:3000, then: 'a web server is the same loop, on a machine the whole world can hit.'
TRANSITION: Into what a server actually is.
TIME: 15s divider
-->

---

# The Prompt — Video 7.1

```text
Read server/src/server.js, server/src/app.js, server/package.json and
server/prisma/schema.prisma first, and tell me what is ALREADY
production-ready before changing anything.

Then make only the changes that are genuinely missing:

1. server/package.json has NO "build" script. Add
   "build": "prisma generate". Render's build command runs it, and
   without a generated Prisma client the server cannot start.
2. /api/health already exists and returns { status: "ok" }. Extend it to
   also return uptime: process.uptime() and the current NODE_ENV. Keep
   the path exactly /api/health — do not add a second /health route.
3. Create server/DEPLOYMENT.md listing every environment variable the
   server reads at runtime. Get them by actually grepping for
   process.env across server/src — do not guess. For each, say what
   breaks if it is missing.

Do NOT change the PORT line. server.js already reads process.env.PORT
with a fallback, which is exactly right.

Tell me explicitly which of the three classic production-readiness
changes were already done before this prompt.
```

> ⚠️ **What it usually gets wrong:** "adding" `process.env.PORT` as though it weren't there, and inventing a second bare `/health` route next to our real `/api/health`. Then Render's health check points at a path that 404s and the platform restarts your perfectly healthy service in a loop.

> 💡 The `DEPLOYMENT.md` step is doing the real work. `app.js` throws at boot when `CLIENT_URL` is missing — that's a crash loop on Render, and you want that written down *before* you hit deploy, not while you're reading logs.

<!--
TIME: 3 min
ENERGY: Honest audit. Resist the urge to perform work that's already done.
WHAT TO SAY: "I've asked it to tell me what's already right before it changes anything, and I want you to notice why. Two of the three classic production-readiness changes — reading PORT from the environment, and having a health endpoint — we did months ago, in Module 1 and Module 2, for completely different reasons. If I let the AI 'add' them now it would produce a diff that looks like progress and changes nothing, or worse, adds a duplicate health route. The only thing genuinely missing is the build script, and that one will break the deploy in the next video if we miss it."
DEMO: Run the prompt, read its audit aloud against server.js and app.js. Confirm PORT untouched.
TRANSITION: "So what IS a web server?"
-->

---

# A Web Server Is Just an Always-On Listener

<div class="columns"><div>

**Your laptop (localhost)**
- Runs only when you say `npm run dev`
- Address `localhost:3000` — only you
- Sleeps when you close the lid

</div><div>

**A web server (hosted)**
- Runs 24/7, restarts itself
- Public address: `applyiq-api.onrender.com`
- Anyone on earth can send a request

</div></div>

```
Browser ──HTTP request──▶  Web Server (Node + Express)
       ◀──HTTP response──  the same app.js you already wrote
```

> 💡 Hosting = putting your exact same Express app on a machine that's always on and publicly reachable. Nothing about your code becomes magic in production.

> 🔗 QCTO Bridge: In the ASP.NET world this server is **IIS** hosting your app. Our equivalent is a Node process behind the platform's reverse proxy — same job: accept HTTP, return HTTP.

<!--
WHAT TO SAY: "The mental model: a web server is the exact same request/response loop you've been running on localhost since Module 1, just on a machine that never sleeps and has an address the world can reach. Your app.js does not change."
COMMON QUESTION: "Is the server different software from my app?" — No. The platform runs YOUR node app.js. The 'server' is the always-on machine plus a reverse proxy in front.
TIME: 3 min
-->

---

# What Was Already Ready — and What Wasn't

| Change | Status | Why it matters |
|---|---|---|
| `process.env.PORT` | ✅ **already done** (Module 1) | Host assigns the port, not you |
| `/api/health` | ✅ **already existed** (Module 2) | Host pings it; restarts you if it fails |
| `"build": "prisma generate"` | ❌ **missing — we add it** | Without it Render's build fails |

```js
// server/src/server.js — unchanged. It was right all along.
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);     // ← from Module 6.5
server.listen(PORT, () => logger.info("Server started", { port: PORT }));
```

> ⚠️ Common mistake: hard-coding `app.listen(3000)`. The host assigns a port through `PORT` — ignore it and your app binds the wrong port and is unreachable, while the logs look perfectly healthy.

> 🔗 QCTO Bridge: ASP.NET's health checks come from `app.MapHealthChecks("/health")`. Same contract — the host pings an endpoint to decide whether you're alive.

<span class="pa-badge earned">PA1303 ✅</span>

<!--
WHAT TO SAY: "Two green ticks and one red cross, and the green ones are the interesting story. We read PORT from the environment back in Module 1 because I told you hard-coding config is bad practice. We added a health endpoint in Module 2 as a smoke test for the middleware pipeline. Neither was done for deployment. And yet here we are, five modules later, already production-ready on both — because good practice earlier costs you nothing later. The build script is the one thing we genuinely owe, and it'd have failed the deploy in about nine minutes' time."
DEMO: Show server.js untouched. Add the build script, run `npm run build`, watch Prisma generate.
TIME: 4 min
-->

---

# Checkpoint Check — PA1303

- [ ] `server/package.json` has `"build": "prisma generate"`
- [ ] `npm run build` succeeds locally
- [ ] `/api/health` returns `status`, `uptime` and `NODE_ENV`
- [ ] There is exactly **one** health route — no stray bare `/health`
- [ ] `server.js`'s `PORT` line is **unchanged**
- [ ] `DEPLOYMENT.md` lists every `process.env` the server reads, including `CLIENT_URL`
- [ ] You can explain the difference between localhost and a hosted server

> 🔎 Check it for real: `grep -rn "process.env" server/src` and compare it line by line with `DEPLOYMENT.md`. Any variable missing from that doc is a variable you'll forget to set on Render — and `CLIENT_URL` missing means the app throws at boot.

<!--
TIME: 2 min
WHAT TO SAY: "Do the grep. That list is your deployment checklist for the next video, and the one people miss is CLIENT_URL, because it's not a secret and it doesn't feel important. But app.js throws on boot without it, so your first deploy dies instantly with an error about CORS config, and you'll be staring at Render's build logs which will look completely fine."
DEMO: Run the grep side by side with the doc.
TRANSITION: "The app is hostable. Let's host it."
-->

---

# Stop Doing That Grep By Hand

You're going to run that checklist again in 7.2, again in 7.3, and again before every push in 7.5. So don't run it — **teach your CLI to run it.**

```text
Create .claude/skills/deploy-check/SKILL.md — a skill that verifies this
repo is safe to deploy. Frontmatter: name deploy-check, and a description
saying to use it before any push to main.

The body tells you to check and report PASS/FAIL for each:
1. Every process.env.* read anywhere in server/src appears in
   server/DEPLOYMENT.md. List any that are missing.
2. Nothing in client/src hardcodes localhost.
3. server/package.json has a "build" script.
4. If render.yaml exists: every secret is sync:false or generateValue
   (no literal values), and the API service sets plan: free.

End with a one-line verdict: SAFE TO DEPLOY or the numbered failures.
```

> 💡 That's the whole thing. A skill is a **folder with a markdown file in it.** No install, no config, no framework. You describe the job in English, and `/deploy-check` exists from that moment on — in this repo, for you and for anyone who clones it.

> ⚠️ Note what the skill does *not* contain: a script. It's instructions, not code. The agent already knows how to grep — what it doesn't know is *what you care about*. That's the part worth writing down.

<!--
TIME: 3 min
ENERGY: This is a "wait, that's it?" moment. Play it that way — build it fast, on camera, no preparation.
WHAT TO SAY: "I want to stop and show you something that isn't on the QCTO checklist, because it's the most useful habit in this entire course. I just made you run a grep and eyeball it against a document. That's fine once. I'm going to make you do it four more times before this module ends, and by the third time you'll skip it, and the time you skip it is the time CLIENT_URL is missing.
So watch this. A skill is a folder with a markdown file in it. That's the whole specification. I describe what I want checked, in English, and now slash deploy-check is a command that exists. Not in some product roadmap — in my repo, right now, because I wrote a paragraph.
And look at what's in the file: there's no code. No bash, no node script, nothing to maintain. The agent already knows how to search a codebase. What it can't know is which four things I lose sleep over on this project. That's the bit that was in my head, and now it's in the repo where my teammate gets it for free.
This is the shift I want you to take out of this course. You're not just someone who writes application code any more. You're someone who builds the tools that build the application."
DEMO: Write the file live — one file, maybe fifteen lines. Then immediately run /deploy-check and let it find something real. It should flag whatever is genuinely not ready yet. Then `git add .claude/` and commit it: "this ships with the repo."
TRANSITION: "Now let's use it. Host it."
-->

---
layout: section
---

<span class="pa-badge">PA1301</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS13</span>

## VIDEO 7.2

# Deploy to the Cloud

#### ApplyIQ · One blueprint file, both services live, every secret in the platform

~9 min

<!--
🎥 VIDEO NAME: "M7.2 — Deploy to the Cloud (PA1301)"
🎯 OBJECTIVE: By the end the student can describe a whole system in a blueprint file, connect it to a managed cloud host, and explain why secrets live in the platform and never in code.
⚠️ RECORDING NOTE — This video now creates BOTH services from one render.yaml, so the frontend exists (empty) before 7.3 fills it in. That is deliberate: it kills the CLIENT_URL placeholder dance from the old cut, because after the first sync you have both URLs in front of you.
⚠️ RECORDING NOTE — Free Postgres on Render EXPIRES AFTER 30 DAYS. Do not use it. We use Neon, whose free plan is permanent. Students who follow the old advice will lose their database a month after they ship, which is exactly when an assessor opens it.
⚠️ RECORDING NOTE — `plan: free` must be explicit on the API service. Omit it and Render silently provisions a billed Starter instance. Say the word "billed" out loud.
WHAT TO SAY: "Now we put this in the cloud. And 'the cloud' just means someone else's always-on machine that you rent by the minute. But we're not going to click our way through a dashboard twice — we're going to write one file that describes the entire system, and let the platform build it."
TRANSITION: Into the architecture of the whole stack.
TIME: 15s divider
-->

---

# The Prompt — Video 7.2

```text
Read server/DEPLOYMENT.md, server/package.json, client/package.json,
server/src/app.js and server/prisma/schema.prisma first.

Create render.yaml at the repo root describing BOTH services.

1. The API — a web service:
   - runtime node, name applyiq-api, rootDir "server"
   - plan: free — set it EXPLICITLY. Omitting plan provisions a billed
     Starter instance.
   - buildCommand: "npm ci && npm run build && npx prisma migrate deploy"
     Migrations run in the build because preDeployCommand is not
     supported on free instances.
   - startCommand "npm start", healthCheckPath "/api/health"
   - envVars: every variable named in DEPLOYMENT.md as sync: false,
     EXCEPT JWT_SECRET which uses generateValue: true.

2. The frontend — a static site:
   - type web with runtime: static, name applyiq-web, rootDir "client"
   - buildCommand "npm ci && npm run build", staticPublishPath "./dist"
   - a routes entry: type rewrite, source /*, destination /index.html
   - VITE_API_URL as sync: false

Add a comment at the top saying CLIENT_URL is REQUIRED because
server/src/app.js throws at import when it is missing, and that both
URLs are only known after the first sync.

Then update server/.env.example to match the API's envVars exactly —
same keys, empty values, one comment per key.

Do not put a single real value in either file.
```

> ⚠️ **What it usually gets wrong:** writing real-looking placeholders into `render.yaml` (`JWT_SECRET: changeme123`). Anything with a value in that file is committed to GitHub. And the second one: omitting `plan: free`, which deploys a service that bills you.

> 💡 `generateValue: true` on `JWT_SECRET` is the better pattern than `sync: false` — Render invents a real 256-bit secret so nobody is ever tempted to type `secret123` into a box.

<!--
TIME: 3 min
ENERGY: Procedural but high-stakes. Slow right down on secrets.
WHAT TO SAY: "Everything in this prompt is one idea: the difference between describing configuration and containing it. render.yaml gets committed to GitHub — it is a public file. So it can say 'this service needs a JWT_SECRET' and it must never say what the secret is. That's what sync false means: the key is declared here, the value is typed into the dashboard where nobody can clone it. And notice JWT_SECRET is different — generateValue true. Render makes one up, properly random, and I never see it or type it. The secret I never handle is the secret I can never leak."
DEMO: Run the prompt. Read render.yaml top to bottom. Confirm zero values, confirm plan: free on the API.
TRANSITION: "Here's the whole architecture."
-->

---

# Three Services, One Production SaaS

```
Static site (Render)  ──API calls──▶  Node.js (Render)  ──Prisma──▶  Postgres (Neon)
                      ◀──WebSocket──▶        │
                                             └──image uploads──▶  Cloudinary
```

<div class="columns"><div>

- **Static site on Render** — the React build, on a global CDN
- **Web service on Render** — your API *and* the Socket.IO server from Module 6

</div><div>

- **Postgres on Neon** — managed, free, permanent
- **Cloudinary** — image storage (coming in 7.4)

</div></div>

> 💡 Two services, one `render.yaml`, one dashboard, one deploy log. The static site has **no `startCommand`** — because nothing runs. It's files on a CDN. The API has one, because it's a process that stays alive.

> ⚠️ That WebSocket arrow goes to the **web service**, never the static site. A CDN serves files and gets out of the way; the persistent connection from Module 6 needs a process that's still running when the next message arrives.

<!--
WHAT TO SAY: "Look at the difference between those two services, because it's the whole architecture in one contrast. The static one has no start command. There's nothing to start — it's a folder of files that a CDN copies around the world. The API has a start command because it's a process that has to still be alive in four hours when someone drags a Kanban card and a WebSocket message needs delivering. Same file, same platform, two completely different kinds of thing."
DEMO: Draw the diagram. Trace a request from the phone all the way to Neon and back.
TIME: 3 min
-->

---

# The Free Tier, Honestly

<div class="columns"><div>

**What's genuinely free forever**
- Render static site — CDN, no spin-down
- Neon Postgres — 0.5 GB, permanent
- Cloudinary — generous free tier
- GitHub Actions — CI minutes

</div><div>

**What has strings**
- API **spins down after 15 min idle** — next request takes ~50s
- 750 instance-hours per month
- Disk is **ephemeral** — nothing you write survives a deploy
- No shell, no `preDeployCommand`

</div></div>

> ⚠️ **Render's own free Postgres expires after 30 days.** That's why we're on Neon. If you use Render's, your database is deleted a month after you ship — right about when someone wants to look at it.

> 💡 The 50-second cold start is real and it is not a bug in your code. Send someone your link and warn them the first load is slow. If you want it gone, it's $7/month — and knowing *exactly* what that $7 buys you is a more useful thing to learn than pretending the constraint doesn't exist.

<!--
TIME: 3 min
ENERGY: Straight, honest, no salesmanship.
WHAT TO SAY: "I want to be completely straight with you about what free means here, because a lot of tutorials aren't. Your API goes to sleep after fifteen minutes of nobody using it. The next person who hits it waits about fifty seconds while it wakes up. That is not your code being slow, it's not a bug you introduced, and you will absolutely think it is the first time you see it. And the one that actually catches people out: Render's free database deletes itself after thirty days. Not pauses. Deletes. That's why we're using Neon, where the free plan just keeps existing."
DEMO: Let a service spin down earlier in the session, then hit it live and let the 50 seconds actually elapse on camera. Don't cut it.
TRANSITION: "Now — the secrets."
-->

---

# Secrets Live in the Platform, Never in Code

| Variable | Service | Why it's needed |
|---|---|---|
| `DATABASE_URL` | API | Neon connection string — Prisma adapter |
| `JWT_SECRET` | API | Signs and verifies every token — **generated, never typed** |
| `OPENAI_API_KEY` | API | The AI routes from Module 4 |
| `CLIENT_URL` | API | **CORS + Socket.IO origin — app throws without it** |
| `VITE_API_URL` | Static site | Tells React where the API lives (Video 7.3) |

> ⚠️ One leaked `OPENAI_API_KEY` is thousands in charges — bots scan public repos within minutes of a push. One leaked `JWT_SECRET` is worse and silent: anyone can forge a token and become any user, and nothing in your logs looks wrong.

> 💡 `CLIENT_URL` is the one people forget, because it isn't a secret and doesn't feel important. Miss it and the service crash-loops on boot with an error that reads like a local config typo.

<!--
ENERGY: Serious. Slow down. This is the most important security lesson in the module.
WHAT TO SAY: "Those top three go in the dashboard and nowhere else. Not in .env committed by accident, not in a screenshot, not pasted into a chat. There are bots whose entire job is scanning new GitHub commits for keys that look like OpenAI keys, and they are fast. A leaked JWT secret is the quiet one though — nothing errors, nothing logs, someone just signs their own token and is you."
COMMON QUESTION: "I accidentally committed a secret — now what?" — Rotate it immediately. The old value is compromised forever; it stays in git history even after you delete the commit.
TIME: 4 min
-->

---

# One File, Two Services, One Button

<div class="columns"><div>

**The flow**
1. Push `render.yaml` to GitHub
2. Render → **New → Blueprint**
3. Point it at the repo
4. Render reads the file and shows you **both** services
5. Fill in the `sync: false` values
6. Apply

</div><div>

**Then, once**
Copy the static site's URL → set `CLIENT_URL` on the API → redeploy.

Both URLs only exist *after* the first sync. That one manual step is unavoidable, so do it deliberately.

</div></div>

> ⚠️ `sync: false` only prompts you **during initial blueprint creation**. Variables you add to the file later are ignored on sync — you set those by hand in the dashboard. This surprises everyone exactly once.

> 🔗 QCTO Bridge: This is the modern equivalent of publishing a build to a hosting server. Where an ASP.NET dev clicks "Publish to Azure," we commit a file that *describes* the infrastructure and the platform builds it on every push. The file is the deployment.

<span class="pa-badge earned">PA1301 ✅</span>

<!--
WHAT TO SAY: "New, blueprint, point at the repo. And watch what happens — Render reads that file and tells you what it's about to build. Two services, from one commit. That's the bit I want you to feel: I didn't configure anything in a browser. I described the system in a file that lives in the repo, next to the code, reviewed in the same pull request. Somebody joining this project tomorrow can read render.yaml and know exactly what runs in production."
DEMO: Walk the blueprint sync live. Show the confirmation screen listing both services. Fill in the values. Apply. Watch both build logs. Then hit /api/health on the live API URL.
ENERGY: Exciting — this is the first deployment milestone.
TIME: 5 min
-->

---

# Checkpoint Check — PA1301

- [ ] `render.yaml` is committed and contains **no values** — every secret is `sync: false` or `generateValue`
- [ ] The API service has **`plan: free`** explicitly — you are not being billed
- [ ] `buildCommand` runs `prisma migrate deploy` — migrations are part of the build
- [ ] Both services appear in one Render dashboard from one blueprint sync
- [ ] `CLIENT_URL` is set to the real static-site URL — service boots instead of crash-looping
- [ ] `https://<your-api>.onrender.com/api/health` returns JSON in a browser
- [ ] `git log -p` shows no secret was ever committed
- [ ] **`/deploy-check` passes** — the skill you wrote in 7.1, earning its keep

> 🔎 Test it for real: temporarily unset `CLIENT_URL` in the dashboard and redeploy. The service must fail to boot. Now you've seen that error message once, deliberately, instead of at midnight wondering why a green build won't serve traffic.

<!--
TIME: 2 min
WHAT TO SAY: "Do the sabotage on this one too. Unset CLIENT_URL, redeploy, read the crash. The error message says CLIENT_URL is not set, check your .env — which is going to be very confusing when it appears on a cloud host where there is no .env file at all. Seeing it once on purpose is worth an hour of debugging later."
DEMO: Hit the live health endpoint. Then do the CLIENT_URL sabotage and restore.
TRANSITION: "The API's live and the frontend is an empty shell. Now the localhost bug."
-->

---
layout: section
---

<span class="pa-badge">PA1304</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS13</span>

## VIDEO 7.3

# Host & Deploy on a Public Cloud Platform

#### ApplyIQ · The site is already live — and already broken for everyone but you

~8 min

<!--
🎥 VIDEO NAME: "M7.3 — Host & Deploy on a Public Cloud Platform (PA1304)"
🎯 OBJECTIVE: By the end the student can serve a Vite/React build from a public cloud platform, wire it to a live API through a build-time environment variable, and verify the whole stack from a phone.
⚠️ RECORDING NOTE — THE key video of the module. The static site went live in 7.2 and BUILT SUCCESSFULLY, because client/src/lib/api.js hardcodes http://localhost:3000/api and that compiles perfectly fine. Open the live URL on your laptop and it works — your laptop is running the API. Open it on your phone and it's dead. Lead with that. It is a far better demo than talking about the bug in the abstract.
⚠️ RECORDING NOTE — SocketContext derives its origin from api.defaults.baseURL (Module 6.6), so fixing api.js fixes the WebSocket too. Call it out — it's the payoff for deriving instead of repeating, and you promised it on camera last module.
⚠️ RECORDING NOTE — Module 6's outro slide says "Render · Vercel · Cloudinary · CI/CD". Address that head-on with the platform-choice slide; don't let it dangle.
WHAT TO SAY: "Your frontend is already deployed. It went up in the last video and the build was green. And it is completely broken for every human being on earth except you. Let me show you."
TRANSITION: Into the localhost bug, live.
TIME: 15s divider
-->

---

# The Prompt — Video 7.3

```text
Read client/src/lib/api.js, client/src/context/SocketContext.jsx,
client/vite.config.js and render.yaml first.

1. client/src/lib/api.js currently hardcodes
   baseURL: "http://localhost:3000/api". Replace it with
   import.meta.env.VITE_API_URL, falling back to the localhost value so
   local development keeps working with no .env file.

2. Create client/.env.example with VITE_API_URL and a comment. Vite only
   exposes variables prefixed VITE_ to the browser — say so in the
   comment.

3. Do NOT change SocketContext.jsx. It already derives its origin from
   api.defaults.baseURL, so fixing api.js fixes the socket URL too.
   Confirm this by reading it and tell me why no change is needed.

4. Check the applyiq-web service in render.yaml already has the rewrite
   route (source /*, destination /index.html). If it does not, add it.
   Without it, refreshing on /kanban returns 404 because there is no
   file called kanban on disk.

Do not put the real API URL in any committed file — it goes in the
Render dashboard as VITE_API_URL.
```

> ⚠️ **What it usually gets wrong:** using `process.env.VITE_API_URL`. That's Node syntax; Vite exposes `import.meta.env`. You get `undefined`, axios falls back to a relative URL, and every request 404s against your own static domain instead of the API.

> 💡 Step 4 is a check, not a build — the route went into `render.yaml` back in 7.2. Verifying something you already wrote is a real part of the job, and a prompt that says "check X, add it only if missing" is one of the most useful shapes you can learn to write.

<!--
TIME: 3 min
ENERGY: This is the fix that makes the whole module work.
WHAT TO SAY: "Step three is the one I want to dwell on, because it's a lesson about a decision we made an hour of footage ago. Back in Module 6.6 I wrote a regex to derive the socket origin from the axios baseURL instead of typing the URL a second time, and I told you I was thinking one module ahead. This is the module. We change one line in api.js and the WebSocket follows automatically. If I'd hardcoded it twice, we'd deploy right now, the API calls would work, the notification bell would silently fail, and we'd be hunting it for twenty minutes."
DEMO: Run the prompt. Show the api.js diff. Then open SocketContext and trace exactly why it needs no change.
TRANSITION: "Deploy it."
-->

---

# The One Line That Breaks Every First Deploy

```js
// client/src/lib/api.js — BEFORE
const api = axios.create({ baseURL: "http://localhost:3000/api" });  // ☠️

// AFTER — environment-driven, with a local fallback
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});
```

<div class="columns"><div>

**Local dev**

No `.env` needed — the fallback keeps `npm run dev` working exactly as before.

</div><div>

**Production**

Render injects `VITE_API_URL` at build time, pointing at the API service.

</div></div>

> 💡 One change, two fixes. `SocketContext` reads `api.defaults.baseURL` and strips `/api`, so the WebSocket follows automatically — the payoff for deriving it in Module 6.6 instead of repeating it.

> ⚠️ `VITE_` variables are baked in **at build time**, not read at runtime. Change it in the dashboard and you must **redeploy** — editing the variable alone does nothing, and you will swear the platform is broken.

<!--
WHAT TO SAY: "Two things worth knowing. The fallback means local development doesn't change at all — no .env file, npm run dev still works, nobody on your team has to do anything. And the warning: VITE variables get compiled into the bundle at build time. They're not read when the page loads. So if you fix a typo in the dashboard and refresh the site, nothing happens. You have to redeploy so it rebuilds with the new value."
DEMO: Make the change. Show it still works locally with no .env. Then open the built dist/ bundle and grep for the URL — show it literally baked into the JavaScript.
TIME: 4 min
-->

---

# Wait — Module 6 Said Vercel

<div class="columns"><div>

**What changed**

Last module's outro promised Vercel. We're using a Render static site instead — one dashboard, one `render.yaml`, one deploy log for the whole system.

</div><div>

**What didn't**

Everything you just learned. `VITE_API_URL`, the SPA rewrite, the build-time baking, CORS between two origins — identical on Vercel, Netlify, Cloudflare Pages, Azure Static Web Apps.

</div></div>

> 💡 Vercel is an excellent platform and the React world's default. Deploy this exact `client/` folder there if you want — set `VITE_API_URL`, add a rewrite to `/index.html`, point `CLIENT_URL` at the new origin. Twenty minutes. The skill transfers because the *concepts* transfer.

> ⚠️ What does **not** transfer: your API. Vercel runs serverless functions, which start up, answer, and stop. Socket.IO from Module 6 needs a process that's still alive when the next message arrives. That's why the API is a Render web service and always will be.

> 🔗 QCTO Bridge: The checkpoint says deploy to a **public cloud platform** — Azure App Service in the QCTO's framing. A Render static site qualifies exactly as Vercel or Azure Static Web Apps does. Picking a platform for a real reason, and being able to say what the reason was, is the actual skill.

<!--
TIME: 2 min
ENERGY: Direct. Don't be sheepish about it — this is how real decisions get made.
WHAT TO SAY: "If you were paying attention at the end of last module, I said Vercel. I've changed my mind, and I want to tell you why rather than quietly pretending I didn't. Keeping both services in one render.yaml means one file describes your whole system, one dashboard, one set of logs. For learning this, that's worth more than using the more famous tool. And here's the thing — nothing you learn here is Render-specific. The environment variable, the rewrite, the CORS origin: that's every static host that has ever existed. But notice what I did NOT move. The API stays on Render, because Vercel's functions stop running between requests and our WebSocket needs a process that's still there. That's not a preference, that's the architecture deciding for us."
TRANSITION: "So — set the two variables."
-->

---

# Point the Two Services at Each Other

| Where | Variable | Value |
|---|---|---|
| `applyiq-web` | `VITE_API_URL` | `https://<your-api>.onrender.com/api` |
| `applyiq-api` | `CLIENT_URL` | `https://<your-web>.onrender.com` |

**Then redeploy both.** The frontend needs a rebuild to bake in the new URL; the API needs a restart to read the new origin.

> ⚠️ Skip the second row and every API call is blocked by CORS and every WebSocket is refused. `app.js` allows exactly one origin — `process.env.CLIENT_URL` — a decision we made back in Module 2, Video 18.

> 💡 Note the shapes differ on purpose: `VITE_API_URL` ends in `/api` because axios appends paths to it. `CLIENT_URL` is a bare origin because CORS compares origins, not paths. Get these backwards and the errors are genuinely confusing.

<!--
WHAT TO SAY: "Two variables, two services, each one telling the other where to find it. And look at the shapes — one ends in slash api, one doesn't. That's not me being inconsistent. Axios takes a base and appends paths to it, so it needs the slash api. CORS compares origins — scheme, host, port, full stop — so a trailing path on CLIENT_URL means it never matches and every single request gets blocked. We locked CORS to a single origin back in Module 2 on purpose, and this is the moment that decision reaches out and asks to be honoured."
DEMO: Set both in the Render dashboard. Redeploy both. Then reload the live site.
TIME: 4 min
-->

---

# ApplyIQ Is Live — Anyone Can Use It

Final production smoke test, live on a phone:

- Open the live URL on your phone ✓
- Register a new account ✓
- Add 3 applications ✓
- **Drag a Kanban card** — the feature we built in 6.4 ✓
- Generate an AI cover letter, streaming ✓
- **The notification bell updates** — the WebSocket survived deployment ✓
- Refresh on `/kanban` — no 404, thanks to the rewrite ✓

> 💡 Screenshot the live URL running on your phone. That screenshot goes straight into your portfolio, your LinkedIn, your CV.

<span class="pa-badge earned">PA1304 ✅</span>

<!--
WHAT TO SAY: "Pull out your phone — not a resized browser window, an actual phone on mobile data with the wifi off. That's the real test, because on mobile data there is definitely no localhost server of yours pretending to be the API. Register, add applications, drag a card, generate a letter, watch the bell. Every one of those is something you built, running on a machine you have never seen, for anyone in the world. Screenshot it."
DEMO: THE CLIMAX. Full walkthrough live on a phone on mobile data. Register, use it, generate a letter, drag a card, screenshot, drop the URL in the chat. If the API has spun down, let the cold start happen and name it — "that's the fifty seconds we talked about."
ENERGY: Peak. The proudest moment of the course so far. Pause after and let it land.
TIME: 5 min
-->

---

# Checkpoint Check — PA1304

- [ ] `api.js` uses `import.meta.env.VITE_API_URL` — **not** `process.env`
- [ ] `SocketContext.jsx` is **unchanged** and the bell works in production
- [ ] The `applyiq-web` service rewrites all routes to `/index.html` — refreshing `/kanban` doesn't 404
- [ ] `VITE_API_URL` ends in `/api`; `CLIENT_URL` is a **bare origin** with no trailing path
- [ ] No API URL is committed anywhere — `git grep onrender` finds nothing outside `render.yaml` comments
- [ ] The full flow works **on a phone, on mobile data**
- [ ] **`/deploy-check` passes** — no hardcoded localhost left anywhere

> 🔎 Test it for real: open the live site in a private window on your phone with wifi off. If anything still reaches `localhost`, it will fail here and nowhere else.

<!--
TIME: 2 min
WHAT TO SAY: "Wifi off. Private window. That's the only test that can't lie to you, because your laptop's localhost server isn't reachable from a phone on mobile data. Everything still pointing at localhost will fail loudly, right now, in front of you — instead of quietly, to a stranger, next week."
DEMO: Do it live on camera, wifi genuinely off.
TRANSITION: "It's live. Now let's store images properly."
-->

---
layout: section
---

<span class="pa-badge">PA1302</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS13</span>

## VIDEO 7.4

# Upload an Image to Cloud Storage

#### ApplyIQ · Profile avatars on a CDN instead of the server's disappearing disk

~7 min

<!--
🎥 VIDEO NAME: "M7.4 — Upload an Image to Cloud Storage (PA1302)"
🎯 OBJECTIVE: By the end the student can upload a user image to cloud object storage, store the returned URL in the database, and explain why the server's local disk can't be trusted.
⚠️ RECORDING NOTE — real work here: cloudinary and multer are NOT installed, and the User model has NO avatarUrl field, so this needs a real Prisma migration. That migration is also what sets up video 7.5's `migrate deploy` demo — mention the handoff.
WHAT TO SAY: "Users want profile avatars. You can NOT store them on the Render server — its filesystem is ephemeral and wipes on every deploy. The professional answer is cloud object storage: upload the image, get back a permanent CDN URL, store the URL in your database."
TRANSITION: Into why local disk fails.
TIME: 15s divider
-->

---

# The Prompt — Video 7.4

```text
Read server/prisma/schema.prisma, server/src/routes/auth.js,
server/src/middleware/authenticateToken.js and server/src/lib/prisma.js
first. CommonJS only.

1. Install cloudinary and multer in server/ (neither is installed).
2. The User model has NO avatarUrl field. Add avatarUrl String? to it and
   create a migration — do not edit the database by hand.
3. Create server/src/lib/cloudinary.js configuring the SDK from
   CLOUDINARY_URL. Build the client ONCE at module load, like
   lib/prisma.js and lib/cacheService.js.
4. Create server/src/routes/upload.js:
   - multer with memoryStorage (NOT diskStorage — Render's disk is
     ephemeral), a 2MB limit, and an image-only mimetype filter
   - POST /avatar behind authenticateToken
   - upload req.file.buffer to Cloudinary with public_id
     `user-${req.user.id}-avatar`
   - save the returned secure_url to the user's avatarUrl and return it
5. Mount it in app.js at /api/upload, ABOVE app.use(errorHandler).
6. Add CLOUDINARY_URL to DEPLOYMENT.md, .env.example and render.yaml
   (sync: false).

Never write to a local uploads/ folder.
```

> ⚠️ **What it usually gets wrong:** `multer({ dest: 'uploads/' })` — disk storage. It works perfectly on your laptop and silently loses every avatar on the next Render deploy. We want the bytes in memory, forwarded straight to Cloudinary, never touching our disk.

> 💡 Step 5's "above `errorHandler`" matters — mounting a router after the error handler makes it unreachable, and you'll get a 404 on a route that plainly exists. Same trap we flagged in Module 4.2.

<!--
TIME: 3 min
ENERGY: Practical. The disk-vs-memory distinction is the lesson.
WHAT TO SAY: "The multer setting is the whole video in one line. Disk storage versus memory storage. Disk works flawlessly in development — you upload an avatar, it appears, you're happy. Then you push a commit, Render rebuilds your container from scratch, and every avatar every user uploaded is gone. Not corrupted, not erroring. Just gone, with the app still working perfectly. Memory storage means the bytes land in RAM for a moment and go straight out to Cloudinary, and our server never pretends to be a place where things are kept."
DEMO: Run the prompt. Check for memoryStorage. Run the migration and show the new column.
TRANSITION: "Why not just save it on the server?"
-->

---

# Why Not Just Save It on the Server?

<div class="columns"><div>

**Server disk (wrong)**
- Wiped on every deploy
- One instance can't share files with another
- No CDN, no optimisation

</div><div>

**Cloud object storage (right)**
- Permanent, survives deploys
- Global CDN, auto-optimised
- Free tier (Cloudinary 25GB)

</div></div>

```js
// memoryStorage → buffer → straight to the CDN. Nothing touches our disk.
const result = await cloudinary.uploader.upload_stream({
  public_id: `user-${req.user.id}-avatar`,
});
await prisma.user.update({
  where: { id: req.user.id },
  data: { avatarUrl: result.secure_url },   // store the URL, not the bytes
});
```

> 💡 Store the **URL** in your database, never the image bytes. The bytes live on the CDN; your row holds a string.

> 🔗 QCTO Bridge: The QCTO checkpoint maps to **Azure Blob Storage** — object storage for files. Cloudinary (or AWS S3) is our equivalent: upload a blob, get back a durable URL.

<span class="pa-badge earned">PA1302 ✅</span>

<!--
WHAT TO SAY: "Store the URL, not the bytes. I've seen people base64 an image into a Postgres text column, and it works right up until the table is four gigabytes and every query that touches a user is slow. Your database holds a string. The CDN holds the file and serves it faster than you ever could."
DEMO: Upload an avatar, show the secure_url in the DB row, open the URL — loads instantly from the CDN. Then redeploy and show it still there.
TIME: 4 min
-->

---

# Checkpoint Check — PA1302

- [ ] `cloudinary` and `multer` are in `server/package.json`
- [ ] `avatarUrl String?` is on the `User` model, added by a **migration** file
- [ ] Multer uses **`memoryStorage`** — no `dest:`, no `uploads/` folder anywhere
- [ ] There's a file-size limit and an image-only mimetype filter
- [ ] The route is behind `authenticateToken` and mounted **above** `errorHandler`
- [ ] The database stores `secure_url`, not image data
- [ ] `CLOUDINARY_URL` is in `DEPLOYMENT.md`, `.env.example` and `render.yaml`

> 🔎 Test it for real: upload an avatar, then trigger a redeploy on Render. The avatar must still load. That's the entire argument for cloud storage in one test.

<!--
TIME: 2 min
WHAT TO SAY: "That last check takes four minutes and it's worth every second, because it's the only way to actually feel what ephemeral means. Upload your face. Redeploy. Your face is still there. Do the same thing with disk storage and it isn't — and nothing in your logs will tell you why."
DEMO: Upload, redeploy, confirm it survives.
TRANSITION: "Last video. The services that keep this healthy."
-->

---
layout: section
---

<span class="pa-badge">PA1305</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS13</span>

## VIDEO 7.5

# Use Cloud Services to Improve Capabilities

#### ApplyIQ · Migrations on the live server, and CI/CD that won't let broken code deploy

~9 min

<!--
🎥 VIDEO NAME: "M7.5 — Use Cloud Services to Improve Capabilities (PA1305)"
🎯 OBJECTIVE: By the end the student can use platform services (managed Postgres with branching, GitHub Actions CI/CD) to add capabilities they'd otherwise build by hand, and can run migrations safely on a platform that gives them no shell at all.
⚠️ RECORDING NOTE — there is no .github/ directory at all, so this is created from scratch. The CI needs a Postgres service container plus the same env vars tests need locally (CLIENT_URL included, or app.js throws on import and every Supertest suite dies). The avatarUrl migration from 7.4 is the perfect thing to run via `migrate deploy` — it's a real pending migration, not a staged one.
WHAT TO SAY: "Deployment isn't the finish line. The cloud gives you SERVICES that make your app better with almost no work — managed databases you can branch like git, and CI/CD that blocks broken code before it can reach production."
TRANSITION: Into running migrations on a platform with no shell.
TIME: 15s divider
-->

---

# The Prompt — Video 7.5

```text
Read server/package.json, client/package.json, server/jest.config.js,
server/tests/setup.js and server/DEPLOYMENT.md first.

Create .github/workflows/ci.yml with three jobs:

1. test-backend
   - a postgres:16 service container with health options
   - node 20, npm ci in server/
   - env: DATABASE_URL pointing at the service container, plus
     JWT_SECRET and CLIENT_URL as dummy values. CLIENT_URL is REQUIRED —
     server/src/app.js throws at import time without it, so every
     Supertest suite fails at require if it is missing.
   - npx prisma migrate deploy, then npm test
2. test-frontend
   - node 20, npm ci in client/, npm test (Vitest)
3. deploy
   - needs: [test-backend, test-frontend]
   - only on pushes to main
   - curls the Render deploy hook from a secret, RENDER_DEPLOY_HOOK

Use actions/checkout@v4 and actions/setup-node@v4 with npm caching.
Put no real secret in the file — reference secrets.* only.
```

> ⚠️ **What it usually gets wrong:** omitting `CLIENT_URL` from the CI env. Locally it comes from `.env.test`, which isn't committed — so the suite passes on your machine and every job fails in CI at the `require("../src/app")` line with an error that never mentions CI.

> 💡 `needs:` is the whole point. Without it the three jobs run in parallel and `deploy` ships broken code while the tests are still running.

<!--
TIME: 3 min
ENERGY: The last build of the course. Methodical, then triumphant.
WHAT TO SAY: "The CLIENT_URL warning is the same bug for the third time this module, and that's deliberate — I want you to notice the shape of it. That throw in app.js has now bitten us in local tests, on Render, and in CI. It's a good line of code. It fails loudly instead of quietly. But 'loudly' means the error shows up at import time in a place that has nothing to do with the cause, and every new environment you create has to be told about it. That's the real cost of configuration, and it's why DEPLOYMENT.md exists."
DEMO: Run the prompt. Read the YAML. Check `needs:` is on the deploy job.
TRANSITION: "First service — the database."
-->

---

# Cloud Service #1 — Managed Postgres You Can Branch

<div class="columns"><div>

**Migrations run in the build**

```
npm ci && npm run build
  && npx prisma migrate deploy
```

Free instances have **no shell** and no `preDeployCommand`. So the migration is part of the build — it runs before the new container ever serves traffic.

</div><div>

**Why `deploy`, not `dev`**

`migrate dev` asks interactive questions and offers to reset your data — there is nobody there to answer them, and "yes" to the wrong question drops your users.

`migrate deploy` applies what's pending and exits. Production-safe.

</div></div>

**The capability you'd otherwise build by hand:** Neon lets you **branch the database** like a git branch — a copy-on-write clone of production data in seconds. Run the scary migration against the branch, inspect it, delete it.

> 💡 The `avatarUrl` migration from 7.4 is genuinely pending against production right now. This is a real migration, not a rehearsal — watch the column appear in the Neon dashboard when the build runs.

> ⚠️ A migration in `buildCommand` runs even if the deploy later fails its health check. That's the trade for having no shell. It's fine here because the migration is additive — `avatarUrl String?` is nullable, so old code and new code both work against the new schema. **Additive migrations deploy safely. Destructive ones need a plan.**

> 🔗 QCTO Bridge: Managed Postgres with instant branching replaces self-hosting a database server, SSHing into the box, and taking a dump before every risky change — the kind of managed capability **Azure** offers around App Service.

<!--
WHAT TO SAY: "There's no shell button on a free instance. No SSH either. So where does the migration run? In the build command — before the new container takes any traffic. And notice it's migrate deploy, not migrate dev. Dev is the interactive one you use locally, the one that will cheerfully offer to reset your database to resolve a conflict. On a build server there's nobody there to say no. Deploy just applies what's pending and exits.
Now the bit that's actually the cloud service. Neon lets you branch a database the way git branches code — a full copy of production data, in about two seconds, that costs almost nothing because it's copy-on-write. So when you've got a migration you're genuinely nervous about, you don't test it on a hand-made dump from three weeks ago. You branch production as it is right now, run it there, look at the result, and throw the branch away. That used to be a whole afternoon and a DBA."
DEMO: Show the build log running migrate deploy. Then open Neon, show the avatarUrl column live. Then create a branch from production, show it has the real data, delete it.
COMMON QUESTION: "My migration failed — why?" — Usually a non-nullable column added to a table with existing rows. Give it a default or make it nullable, then redeploy.
TIME: 5 min
-->

---

# Cloud Service #2 — CI/CD: Bad Code Can't Reach Production

```yaml
# .github/workflows/ci.yml — three jobs, one gate
jobs:
  test-backend:   # Jest + a postgres:16 service container
  test-frontend:  # Vitest
  deploy:
    needs: [test-backend, test-frontend]   # ← the gate
    if: github.ref == 'refs/heads/main'
```

1. Break a test on purpose → push to a branch → open a PR
2. Actions runs → the test fails → **`deploy` is skipped**, merge blocked
3. Fix the test → push → green check → merge allowed

> 💡 `needs:` is the gate — `deploy` only runs when **both** test jobs pass. The 20 tests you wrote in Module 5 are now the thing standing between a bad commit and your users.

> 🔗 QCTO Bridge: The same idea as Azure DevOps / Azure Pipelines — a managed CI/CD service that builds, tests and gates deployments. We get it free from GitHub Actions.

<span class="pa-badge earned">PA1305 ✅</span>

<!--
WHAT TO SAY: "This is the moment Module 5 pays off, and I want to say that plainly. When we wrote those tests, the honest answer to 'why bother' was 'you'll thank me later.' This is later. Every test you wrote is now an automated gatekeeper that runs on every push, on a machine you're not watching, and refuses to let broken code near your users. Break one on purpose and watch the deploy job go grey — not fail, skipped. It never even got the chance to run."
DEMO: Show the YAML. Break a test, push, show the red X and the skipped deploy job. Fix, push, green check, deploy runs. Most impactful demo in the module.
ENERGY: Methodical, then triumphant on the green check.
TIME: 5 min
-->

---

# Checkpoint Check — PA1305

- [ ] `.github/workflows/ci.yml` exists with all three jobs
- [ ] `test-backend` has a `postgres` service container
- [ ] The CI env includes `CLIENT_URL` — without it every Supertest suite fails at `require`
- [ ] CI runs `prisma migrate deploy` before `npm test`
- [ ] `deploy` has `needs: [test-backend, test-frontend]`
- [ ] No secret is in the YAML — only `secrets.*` references
- [ ] You **watched** a failing test block a deploy, then fixed it and watched it pass

> 🔎 Test it for real: break one assertion, push to a branch, open a PR. The deploy job must show as **skipped**, not failed. Skipped means the gate worked — it never ran at all.

<!--
TIME: 2 min
ENERGY: Final checkpoint of the course.
WHAT TO SAY: "Last line, and please actually do it rather than trusting the YAML. There's a difference between believing CI works and having watched it stop you. Break something, push it, and watch GitHub refuse. That grey skipped badge on the deploy job is the whole module in one pixel."
DEMO: Do the full break-push-fix cycle live.
TRANSITION: "That's PS13. That's the course."
-->

---

# Module 7 Complete — ApplyIQ Is in Production

All 5 deployment checkpoints earned:

<div class="mt-4 flex flex-wrap gap-2">
<span class="pa-badge earned">PA1301 ✅</span>
<span class="pa-badge earned">PA1302 ✅</span>
<span class="pa-badge earned">PA1303 ✅</span>
<span class="pa-badge earned">PA1304 ✅</span>
<span class="pa-badge earned">PA1305 ✅</span>
</div>

<div class="columns mt-4"><div>

**Web server & cloud**
Production-ready Node and a CDN-served React build, both from one render.yaml, one origin locked by CORS

</div><div>

**Storage & services**
Avatars on Cloudinary, branchable Neon Postgres, migrations in the build, CI/CD quality gate

</div></div>

<div class="progress-bar"><div class="fill" style="width:100%"></div></div>

> 💡 We also killed the hardcoded `localhost` that would have made every other video in this module pointless.

<!--
WHAT TO SAY: "PS13 fully earned. Web server understood, deployed to the cloud, public on a real platform, images in proper object storage, and managed services keeping it healthy. Your app is production-grade — and it's protected by tests you wrote yourself."
ENERGY: Proud, grounded. Building to the finale.
TIME: 1 min
-->

---
layout: cover
---

# ApplyIQ — Every PM-09 Outcome. One Real Product.

| | | |
|---|---|---|
| PS01 Planning ✅ | PS02 Middleware ✅ | PS03 Controllers ✅ |
| PS04 Views ✅ | PS05 Models ✅ | PS06 Database ✅ |
| PS07 UI/UX ✅ | PS08 Client-Side ✅ | PS09 Testing ✅ |
| PS10 Security ✅ | PS11 Performance ✅ | PS12 Web APIs ✅ |
| PS13 Deployment ✅ | | |

**PA0101 through PA1305. Every outcome. Every checkpoint. Earned by building.**

<!--
WHAT TO SAY: "Look at this grid. Thirteen outcome sets, every one earned by building ONE real product that grew more sophisticated each module — not thirteen separate assignments. You didn't just learn these concepts, you shipped them into an app that's live on the internet right now, with a test suite guarding it and a CI pipeline that won't let you break it. Screenshot it. Put it on your CV, your LinkedIn, send the link to your family. You are a full-stack developer who can ship to production — you earned that."
ENERGY: Celebration. Full energy. The final moment of the entire course. Applaud them. Mean it.
TIME: 2 min
-->
