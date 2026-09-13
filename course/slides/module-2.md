---
theme: default
title: "ApplyIQ — Module 2: Building the Backend API"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 2: Building the Backend API

"We stop planning. We start building the brain of ApplyIQ."

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#3D3DFF]" />
<div>
<div class="font-semibold">Akhil — Co-founder, Zaio</div>
<div class="text-sm text-gray-400">18 Videos · 37 PA Checkpoints</div>
</div>
</div>

<style src="./styles/zaio.css"></style>

<!--
🎥 VIDEO NAME: "0. Module 2 — Building the Backend API"
🎯 OBJECTIVE: Orient the student to what Module 2 builds and how the videos are grouped.
WHAT TO SAY: "Welcome to Module 2. This is where we stop designing and start building. By the end you'll have a fully working backend API — middleware, controllers, models, a real database, error handling, and security."
ENERGY: High energy hook — this is the start of real coding
TRANSITION: "Let's start at the front door of every request — the pipeline."
TIME: 15s title card
-->

---
layout: section
---

# VIDEO 1

## The Backend Request Pipeline & Module 2 Roadmap

Duration: ~5 min

> 🎤 **SLIDES ONLY** — concept & roadmap, no codebase yet.

<!--
🎥 VIDEO NAME: "1. The Backend Request Pipeline & Module 2 Roadmap"
🎯 OBJECTIVE: By the end the student can describe how a request flows request → middleware → controller → response, and what an API is.
WHAT TO SAY: "Before any code, let's see the shape of the whole backend. Every request walks the same path: it arrives, passes through middleware, reaches a controller, and a response goes back. Everything in this module is one of those stations."
ENERGY: Calm, foundational — this is the map for the entire module
DEMO: Draw the pipeline left to right; point at each station.
TRANSITION: "Let's zoom into the very first station — middleware."
TIME: 15s divider
-->

---

# Where We Are: Building Back-to-Front

You're building ApplyIQ like a real product team — **back-to-front, brain first:**

<div class="text-center text-lg my-4">🧠 <b>brain (M2)</b> → 🎨 face (M3) → ✨ magic (M4) → ✅ trust (M5) → 🚀 polish (M6) → 🌍 ship (M7)</div>

Every module consumes the one before it:

- M3's UI calls **M2's endpoints**
- M5 tests **M2's controllers**
- M7 deploys **the whole thing**

> 💡 That's why Module 2 matters most — everything downstream plugs into the API you're about to build. Nail the brain, and the rest has something to connect to.

<div class="text-sm opacity-60 mt-4">📍 You are here: M1 (plan + scaffold) ✅ · M2 (backend) — building now · 12 / 101 checkpoints earned</div>

<!--
TIME: 45s
ENERGY: Zoom out — give them the whole journey before the first line of code.
WHAT TO SAY: "Before we build anything, see the bigger picture. We're building ApplyIQ back-to-front, like a real product team — the brain first. This module is the engine. In Module 3 the React UI calls these exact endpoints; in Module 5 we test these controllers; in Module 7 we deploy all of it. Get M2 right and everything else just plugs in."
TRANSITION: "But first — a quick reminder of what we already built in Module 1, because Module 2 picks up exactly where it left off."
-->

---

# Quick Recap: What We Built in Module 1

We didn't start from zero — Module 1 already gave us the foundation:

<div class="columns-2 mt-2">
<div>

### 🧠 We planned the product
- Understood the problem & business needs *(PA0101–0102)*
- Project plan, scope, wireframes *(PA0106–0108)*
- Data structures & MVC architecture *(PA0103, PA0105)*
- State management *(PA0104)*

</div>
<div>

### 🛠️ We scaffolded the code
- React + Node monorepo, Git workflow
- A running Express server *(PA0201)*
- The middleware pipeline: `cors`, `express.json`, `urlencoded`, `morgan` *(PA0203, PA0204)*
- Static file serving + `/api/health` *(PA0205)*

</div>
</div>

> ✅ **12 checkpoints already earned.** The server boots, the pipeline runs, `/api/health` returns `200`. We are NOT re-explaining cors/json/morgan — that's done.

> ➡️ **Module 2 picks up here:** we write our *own* code that runs *inside* that working pipeline.

<!--
TIME: 60s
ENERGY: Reassuring recap — remind them the engine already turns over.
WHAT TO SAY: "Quick reminder of where we are. In Module 1 we did all the planning — the problem, the business needs, the wireframes, the data models, the MVC architecture. Then we scaffolded the code: a React and Node monorepo, and a real Express server that's already running. It's got the middleware pipeline — cors, express.json, morgan — and a health endpoint that returns 200. So we are NOT starting from scratch, and I'm not going to re-explain cors or morgan — we earned those checkpoints in Module 1. What we're doing now is writing our OWN code that runs inside that pipeline."
TRANSITION: "So what exactly is this 'brain' we're building? Let's start with what an API even is."
-->

---

# What Is an API? The Restaurant

<div class="columns-3">
<div>

### Customer
**React Frontend**

The customer never walks into the kitchen.

</div>
<div>

### Waiter
**API (Express)**

Takes the order, brings the food back.

</div>
<div>

### Kitchen
**Database (PostgreSQL)**

Does the work; never meets the customer.

</div>
</div>

> 💡 The API lets React and the database stay independent — React doesn't care if data lives in PostgreSQL, MongoDB, or a spreadsheet.

> ↩ Recall **PA1201 / PA1202** — the full "what is a web API" detail is covered in Module 4. Here it's just the mental model.

<!--
TIME: 60s
ENERGY: Relatable — let the analogy land.
WHAT TO SAY: "Think of a restaurant. You, the customer — that's React — don't walk into the kitchen. You tell the waiter what you want; the waiter tells the kitchen; the kitchen sends it back. The API is the waiter."
COMMON QUESTION: "Why can't the frontend talk to the database directly?" — Security, scalability, separation of concerns.
TRANSITION: "So how does a request actually travel through the waiter? A pipeline."
-->

---

# Every Request Walks the Same Pipeline

| Step | Station | Purpose |
|------|---------|---------|
| 1 | CORS | Is this origin allowed in? |
| 2 | JSON parser | Turn the body into an object |
| 3 | Logger | Record the request |
| 4 | Auth | Who is this user? |
| 5 | Controller | Your business logic runs |
| → | Response | JSON + status code go back |

> 💡 Middleware is any function that runs **between** the request arriving and the response leaving. The controller is where YOUR logic lives. The whole module fills in these stations.

> ↩ **Recap from Module 1:** you already built the middleware pipeline itself — `cors`, `express.json`, `morgan`, and `express.static` are wired in `app.js`, earning **PA0201 / PA0203 / PA0204 / PA0205** (already earned in Module 1). Module 2 builds everything that runs **after** the pipeline: custom middleware, controllers, models, the database, error handling, and security.

<!--
TIME: 60s
ENERGY: Orienting — this diagram is the table of contents for the module.
WHAT TO SAY: "Every request hits CORS, gets its body parsed, gets logged, gets authenticated, then reaches a controller that does the work and sends a response. Save this diagram — every video adds detail to one of these stations."
DEMO: Open app.js and point at the app.use() lines in order.
TRANSITION: "Before we write code — let's see WHERE in the project every file we write is going to live."
-->

---

# Where Everything Lives: The `server/` Folder

Every file we write this module drops into one of these folders. Keep this map open:

```text
server/
├── src/
│   ├── app.js            ← the pipeline (built in M1) — we wire things in here
│   ├── server.js         ← starts the app (built in M1)
│   ├── middleware/       ← our own middleware  (Video 2)
│   ├── controllers/      ← the actions that handle requests  (Video 4)
│   ├── routes/           ← which URL maps to which action  (Video 5)
│   ├── services/         ← reusable logic, e.g. talk to the DB  (Video 3)
│   ├── models/ + prisma/ ← the data + database  (Videos 7–12)
│   └── lib/              ← shared setup, e.g. the prisma client
└── public/               ← static files (built in M1)
```

> 💡 **The rule:** one job per folder. When you don't know where a file goes, ask "what's its *job*?" A function that runs on every request → `middleware/`. A function that handles a URL → `controllers/`.

> 📍 Right now the repo only has `app.js`, `server.js`, and `public/`. We create the rest, one folder at a time, as we go.

<!--
TIME: 60s
ENERGY: Orienting — give them the physical map before any file is created.
WHAT TO SAY: "Quick but important — where does everything go? Our server folder has a place for each kind of file. Middleware in the middleware folder, controllers in controllers, routes in routes. Right now the repo is almost empty — just app.js, server.js and the public folder from Module 1. Every video, we add one folder. So whenever I say 'create a file', you'll always know exactly where it lands."
TRANSITION: "Let's create our very first folder — middleware — by writing our own."
-->

---
layout: section
---

# VIDEO 2

## Writing Your Own Custom Middleware

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `middleware/requestLogger.js` + `middleware/loginLimiter.js`, wire both into `app.js`, `npm run dev`.

<span class="pa-badge">PA0202</span> <span class="pa-badge">PA0206</span>

<!--
🎥 VIDEO NAME: "2. Writing Your Own Custom Middleware (PA0202, PA0206)"
🎯 OBJECTIVE: By the end the student can write a custom (req, res, next) middleware and apply it globally or to one route.
WHAT TO SAY: "Custom middleware is just a function with three parameters: req, res, next. We'll write a request logger that times every request, then an applied one — a rate limiter that protects only the login route."
DEMO: Add requestLogger to app.js; then mount loginLimiter on an inline app.post('/api/login', ...) demo route in app.js and fire 6 fast requests in Postman. (No routes/ folder yet — that's Video 5 — so we attach it directly on app for now.)
COMMON QUESTION: "What if I forget next()?" — The request hangs and the client times out.
TRANSITION: "Some requests aren't for code at all — they're for files."
TIME: 15s divider
-->

---

# First — What Even Is `req`, `res`, `next`?

Every middleware and every controller you write gets these **three things** handed to it. That's it. Learn these once and the whole backend stops being scary:

<div class="columns-3 mt-2">
<div>

### 📥 `req` (request)
**Everything that came IN.**

- `req.body` — the JSON sent
- `req.params` — `/apps/:id`
- `req.query` — `?status=applied`
- `req.headers` — auth token, etc.

*You READ from `req`.*

</div>
<div>

### 📤 `res` (response)
**The reply you're sending BACK.**

- `res.json({...})` — send JSON
- `res.status(201)` — set the code
- `res.send(...)` — send anything

*You WRITE to `res`.*

</div>
<div>

### ➡️ `next`
**A function: "I'm done, pass it on."**

- `next()` → go to the next step
- Don't call it → request **hangs**

*Middleware only. Controllers usually send `res` instead.*

</div>
</div>

<!--
TIME: 75s
ENERGY: This is THE foundational slide — slow down, let it land.
WHAT TO SAY: "Before any code — three words you'll see in every single file from now on: req, res, next. req is the request — everything that came IN: the body, the URL params, the query string, the headers. You READ from it. res is the response — what you're sending BACK: res.json sends data, res.status sets the code. You WRITE to it. And next is a function — it just means 'I'm done, pass it to the next step.' If a middleware forgets to call next, the request just hangs forever."
TRANSITION: "Now the code makes sense — a middleware is just a function that takes those three."
-->

---

# The Signature: (req, res, next)

**Step 1 — create the file:** `server/src/middleware/requestLogger.js`

```javascript
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.path} → ${res.statusCode} (${ms}ms)`);
  });
  next();              // hand off to the next middleware
};

module.exports = requestLogger;   // export so app.js can use it
```

**Step 2 — wire it into `server/src/app.js`** (above your routes):

```javascript
const requestLogger = require("./middleware/requestLogger");
// ...
app.use(morgan("dev"));
app.use(requestLogger);   // ← runs on every request
```

> 💡 Every custom middleware does one of two things: call `next()` to continue, or send a response to stop the chain.

> 🔗 QCTO Bridge: This is ASP.NET's `app.Use(async (context, next) => { ... await next(); })` inline middleware — the same before/after-the-response pattern.

<!--
TIME: 75s
ENERGY: Code-along — TYPE this live in the repo.
WHAT TO SAY: "Two steps. First, make a new folder called middleware inside server/src, and a file requestLogger.js. Paste the function — three parameters, and the magic word next() passes the request along. res.on('finish') lets us measure how long the request took, then we export it. Second step: open app.js, import it at the top, and app.use it right after morgan. Order matters — it runs top to bottom, so we put it above the routes."
DEMO: Create server/src/middleware/requestLogger.js, export it; import + app.use in app.js; npm run dev; hit /api/health in Postman; point at the terminal log line.
TRANSITION: "Custom middleware can also target ONE route — here's a rate limiter."
-->

---

# Applied: One Concern, One Route (PA0206)

```javascript
// middleware/loginLimiter.js
const loginLimiter = (() => {
  const hits = new Map();
  return (req, res, next) => {
    const ip = req.ip;
    const count = (hits.get(ip) || 0) + 1;
    hits.set(ip, count);
    setTimeout(() => hits.set(ip, (hits.get(ip) || 1) - 1), 60_000);
    if (count > 5) return res.status(429).json({ error: 'Too many attempts' });
    next();
  };
})();
module.exports = loginLimiter;

// app.js — apply to ONE route. No routes/ folder yet (that's Video 5),
// so mount it directly on app with a demo handler:
app.post('/api/login', loginLimiter, (req, res) =>
  res.json({ message: 'login attempt received' }));
```

> 💡 Middleware applied as a route argument runs only for that route — perfect for throttling, caching, or extra validation. `app.use()` = everywhere; a route argument = just that route.

> ↩ In **Video 16** this exact line re-homes onto the real login route: `router.post('/login', loginLimiter, login)`. Same mechanism, real route.

> ⚠️ Common mistake: in production use the battle-tested `express-rate-limit` package — this hand-rolled version is for understanding the pattern.

> 🔗 QCTO Bridge: ASP.NET solves this with rate-limiting middleware (`AddRateLimiter` / `RequireRateLimiting`) attached per-endpoint — same selective application.

<span class="pa-badge earned">PA0202 ✅</span> <span class="pa-badge earned">PA0206 ✅</span>

<!--
TIME: 75s
ENERGY: Practical — a real security concern in miniature.
WHAT TO SAY: "Custom middleware doesn't have to run on everything. This limiter applies only to the login route to slow brute-force attacks. Global vs route-specific is just where you attach it."
DEMO: Mount loginLimiter on app.post('/api/login', ...); fire 6 fast POSTs in Postman; show 200 ×5 then 429 on the 6th. (In Video 16 it re-homes onto the real login route.)
TRANSITION: "Some requests just want a file. Let's serve static files."
-->

---
layout: section
---

# VIDEO 3

## Dependency Injection & Injecting Services into Controllers

Duration: ~7 min

> 🎤 **SLIDES ONLY** — the DI *pattern*; we apply it for real when we build the controller in Video 4.

<span class="pa-badge">PA0207</span> <span class="pa-badge">PA0208</span>

<!--
🎥 VIDEO NAME: "3. Dependency Injection & Injecting Services into Controllers (PA0207, PA0208)"
🎯 OBJECTIVE: By the end the student can inject a shared service instead of importing it, and wire it into a controller at startup.
WHAT TO SAY: "A service is a reusable object that does one job — talk to the database, send email, log. We already have a single shared instance; now we INJECT it rather than have files reach out and grab it. That makes code testable and is exactly what an interviewer means by dependency injection."
DEMO: Refactor a controller to receive prisma; wire it in routes/applications.js.
COMMON QUESTION: "Why one instance?" — A new DB client per request exhausts the connection pool. Share one.
TRANSITION: "Services wired. Time to write the controllers themselves."
TIME: 15s divider
-->

---

# Don't Grab Dependencies — Receive Them (PA0207, PA0208)

<div class="columns">
<div>

### ❌ Hardcoded (hard to test)

```javascript
const prisma = require('../lib/prisma');

const list = async (req, res) => {
  const apps = await prisma.application
    .findMany();
  res.json(apps);
};
```

</div>
<div>

### ✅ Injected (swappable)

```javascript
const createApplicationController = (prisma) => ({
  list: async (req, res) => {
    const apps = await prisma.application
      .findMany();
    res.json(apps);
  }
});

// routes/applications.js — inject at startup
const controller = createApplicationController(prisma);
router.get('/', controller.list);
```

</div>
</div>

> 💡 When an interviewer asks "what is dependency injection?" you point to this exact refactor — and the injection happens in ONE place, where the router is assembled.

> ⚠️ Common mistake: thinking DI requires a framework. In JavaScript it's just passing arguments. (And don't inject a fresh `new PrismaClient()` — pass the shared instance.)

> ↩ This is the *same* `createApplicationController` we flesh out in Video 4 — here we're just establishing the shape: receive `prisma`, don't grab it.

> 🔗 QCTO Bridge: ASP.NET's container auto-injects services into a controller's constructor (`public AppController(IAppService svc)`). Our factory parameter is the same constructor injection, function-style.

<span class="pa-badge earned">PA0207 ✅</span> <span class="pa-badge earned">PA0208 ✅</span>

<!--
TIME: 90s
ENERGY: This is an interview-favourite — make it click.
WHAT TO SAY: "Left: the file reaches out and grabs prisma — untestable. Right: prisma is passed in. In tests you pass a fake; in production the real one. The controller never imports prisma; the router injects it once at startup."
DEMO: Show both versions; show wiring createApplicationController(prisma) in the router.
TRANSITION: "Our services are wired. Let's write the controllers."
-->

---

# Custom Middleware & DI — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0202** — Wrote your own custom middleware
- ✅ **PA0206** — Built an applied custom middleware
- ✅ **PA0207** — Used dependency injection
- ✅ **PA0208** — Injected a service into a controller

</div>

<div class="text-sm opacity-60 mt-8">4 checkpoints down · Next section: Controllers & Routing</div>

<!--
TIME: 20s
ENERGY: Satisfied checkpoint moment.
WHAT TO SAY: "Four checkpoints — custom middleware and dependency injection. (The built-in pipeline itself was already wired in Module 1.) The request can now reach shared services. Next we build the things that actually handle requests."
TRANSITION: "Controllers and routing."
-->

---
layout: section
---

# VIDEO 4

## Writing Controllers & Actions

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `controllers/applications.js` (the `createApplicationController` factory + `list`/`create` actions).
> ⚠️ Uses `prisma` + `req.user`, which aren't live until Videos 10 & 16 — so you write the file here, but the full Postman round-trip demo lands in Video 11.

<span class="pa-badge">PA0301</span> <span class="pa-badge">PA0303</span> <span class="pa-badge">PA0307</span>

<!--
🎥 VIDEO NAME: "4. Writing Controllers & Actions (PA0301, PA0303, PA0307)"
🎯 OBJECTIVE: By the end the student can write controller actions, mount the router on the app, and trace a full request → JSON round-trip in Postman.
WHAT TO SAY: "A controller is a group of related functions — we call each an 'action'. Each action reads req, does work, sends res. We write them, mount them with three clean lines, and watch a real round-trip in Postman."
DEMO: Write list/create actions; mount routers in app.js; POST in Postman and show the 201.
COMMON QUESTION: "Controller vs route?" — The route says WHICH URL; the action says WHAT happens.
TRANSITION: "The URL was hardcoded — let's configure routing properly."
TIME: 15s divider
-->

---

# A Controller Is a Bag of Actions (PA0301)

```javascript
// controllers/applications.js
const createApplicationController = (prisma) => ({

  list: async (req, res) => {                       // ACTION: list
    const apps = await prisma.application.findMany({
      where: { userId: req.user.id }
    });
    res.json(apps);
  },

  create: async (req, res) => {                     // ACTION: create
    const app = await prisma.application.create({
      data: { ...req.body, userId: req.user.id }
    });
    res.status(201).json(app);
  }
});

module.exports = { createApplicationController };
```

> 💡 Each action does three things: read `req`, do work, send `res`. Keep them small and focused.

> ↩ Where does `req.user` come from? It's attached by the auth middleware we build in **Videos 16–17**. We're writing these actions "auth-ready" now; until then, `req.user` is the one piece that lights up later.

> 🔗 QCTO Bridge: This object is an ASP.NET controller class; each property is an action method like `public IActionResult List()` on a `ControllerBase`.

<!--
TIME: 60s
ENERGY: Code-along.
WHAT TO SAY: "A controller is just a bag of actions. Each one reads the request, does the work, sends a response. That's the whole job."
COMMON QUESTION: "Where does req.user come from?" — Auth middleware attaches it; we build that in Videos 16–17. We write these actions auth-ready now so we don't refactor them later. Until then req.user is the one piece not yet wired.
DEMO: Write list and create in controllers/applications.js.
TRANSITION: "Now the app needs to know these exist — we mount them."
-->

---

# Mount Controllers, See the Round-Trip (PA0303, PA0307)

<div class="columns">
<div>

### Three clean lines in app.js

```javascript
app.use('/api/auth', authRouter);
app.use('/api/applications', appRouter);
app.use('/api/contacts', contactRouter);
```

Three lines route to three entire modules.

</div>
<div>

### The request round-trip

```
POST /api/applications
   → appRouter → controller.create
   → res.status(201).json(app)
   ◀ 201 { id, companyName, ... }
```

The request is the order, the router is the waiter, the action is the chef, the JSON is the plated dish.

</div>
</div>

> 💡 `app.use(base, router)` is how real teams keep Express apps organised — group by resource, not one file per route.

> ⚠️ Common mistake: forgetting to set a status code. A created resource should return `201`, not the default `200`.

> 🔗 QCTO Bridge: ASP.NET discovers controllers via `app.MapControllers()` and actions return `IActionResult` (`Ok()`, `Created()`, `NotFound()`). Same attach-and-respond pattern.

<span class="pa-badge earned">PA0301 ✅</span> <span class="pa-badge earned">PA0303 ✅</span> <span class="pa-badge earned">PA0307 ✅</span>

<!--
TIME: 75s
ENERGY: Satisfying — first real end-to-end moment.
WHAT TO SAY: "Three lines mount three whole modules. Then in Postman we POST, the router picks the controller, the action replies with 201 and the created object. That's the round-trip every feature follows."
DEMO: Mount routers; POST in Postman; show the 201 and created object.
TRANSITION: "Our URL was hardcoded. Let's configure routing properly."
-->

---
layout: section
---

# VIDEO 5

## Configuring Routes & Friendly URLs

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `routes/applications.js` + `routes/auth.js`, mount them in `app.js` with `app.use('/api/...', router)`.

<span class="pa-badge">PA0304</span> <span class="pa-badge">PA0305</span> <span class="pa-badge">PA0308</span>

<!--
🎥 VIDEO NAME: "5. Configuring Routes & Friendly URLs (PA0304, PA0305, PA0308)"
🎯 OBJECTIVE: By the end the student can lay out a full route table, declare routes inline (attribute-style), and design clean REST URLs.
WHAT TO SAY: "Two ways to declare routes: a central routing table, and attribute-style routes that sit right next to the handler. Either way the URLs should read like English — nouns, plurals, the method as the verb."
DEMO: Walk the route table; show routes/applications.js inline; contrast /getApp?id=3 with GET /api/applications/3.
COMMON QUESTION: "Table or attributes?" — Both are valid; we mix them.
TRANSITION: "Routing done. Now meet action filters."
TIME: 15s divider
-->

---

# The Routing Table (PA0304)

| Method | Route | Action |
|--------|-------|--------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Current user |
| GET | `/api/applications` | List (user-scoped) |
| POST | `/api/applications` | Create |
| GET | `/api/applications/:id` | Get one |
| PATCH | `/api/applications/:id` | Update |
| DELETE | `/api/applications/:id` | Delete |
| POST | `/api/applications/:id/activities` | Add activity |
| POST | `/api/applications/:id/contacts` | Add contact |
| POST | `/api/ai/cover-letter` | Generate cover letter |

> 💡 A routing table is the master list: every method + path and the action it triggers. Each row is a controller action we build in this module.

> 🔗 QCTO Bridge: This is ASP.NET's conventional routing — `app.MapControllerRoute("default", "{controller}/{action}/{id?}")` — a central table mapping URLs to actions.

<!--
TIME: 60s
ENERGY: Orienting — this is the API contract.
WHAT TO SAY: "Here's the whole API in one table. Method, path, action. The HTTP method is the verb, the URL is the resource. Every row becomes code we write."
DEMO: Walk the table; open the matching Postman collection folders.
TRANSITION: "Tables centralise. The other style puts routes next to the handler."
-->

---

# Attribute-Style Routes + Friendly URLs (PA0305, PA0308)

<div class="columns">
<div>

### Routes next to the handler

```javascript
// routes/applications.js
router.get('/',       controller.list);
router.post('/',      controller.create);
router.get('/:id',    controller.getOne);
router.patch('/:id',  controller.update);
router.delete('/:id', controller.remove);
```

Base path set once at mount; each line declares only the rest.

</div>
<div>

### Resource-shaped, not action-in-URL

```
❌ GET  /getApplication?id=3
❌ POST /createApplication

✅ GET    /api/applications/3
✅ POST   /api/applications
✅ DELETE /api/applications/3
```

The method is the verb; the URL is the noun.

</div>
</div>

> 💡 `DELETE /applications/3` needs no word "delete" in the path. Attribute routing keeps the path next to the code; tables centralise — both are valid.

> ⚠️ Common mistake: mixing singular and plural (`/application` vs `/applications`), or repeating the base prefix inside an inline route so it never matches.

> 🔗 QCTO Bridge: ASP.NET attribute routing — `[Route("api/applications")]` on the class, `[HttpGet("{id}")]` on the action — produces these same clean REST URLs.

<span class="pa-badge earned">PA0304 ✅</span> <span class="pa-badge earned">PA0305 ✅</span> <span class="pa-badge earned">PA0308 ✅</span>

<!--
TIME: 75s
ENERGY: Practical — good-taste rules they'll reuse forever.
WHAT TO SAY: "Inline routes sit beside the handler they call. And good URLs read like English: nouns, plurals, the method as the verb. Never put 'getApplication' in the path."
DEMO: Show inline routes; contrast a bad URL with a REST one.
TRANSITION: "Now — code that runs around every action. Action filters."
-->

---
layout: section
---

# VIDEO 6

## Action Filters — Code Before & After an Action

Duration: ~7 min

> 🎤 **SLIDES ONLY** — concept: a filter is just route-scoped middleware (you already built that mechanism in Video 2).

<span class="pa-badge">PA0302</span> <span class="pa-badge">PA0306</span> <span class="pa-badge">PA0309</span>

<!--
🎥 VIDEO NAME: "6. Action Filters — Code Before & After an Action (PA0302, PA0306, PA0309)"
🎯 OBJECTIVE: By the end the student can write an action filter, stack filters on a route in order, and run logic both before an action and after the response.
WHAT TO SAY: "An action filter is middleware scoped to an action — it runs before or after the action to do cross-cutting work like auth, validation, or auditing, without cluttering the action itself."
DEMO: Write requireAuth; stack requireAuth + validateBody on a route; show a filter that times before and audits after via res.on('finish').
COMMON QUESTION: "Filter vs middleware?" — In Express they're the same mechanism; a filter is middleware attached to a route/action.
TRANSITION: "Controllers and routing done. Now give our data shape with models."
TIME: 15s divider
-->

---

# Write a Filter, Stack It in Order (PA0302, PA0306)

```javascript
// An action filter = route-scoped middleware that runs around the action
const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Login required' });
  next();   // pass control to the action
};

router.post('/',
  requireAuth,        // 1. is the user logged in?
  validateBody,       // 2. is the payload valid?
  controller.create   // 3. finally, do the work
);
```

> 💡 Read a route left-to-right as a checklist: each filter must pass (`next()`) before the next runs. Filters keep cross-cutting concerns out of your action code.

> ⚠️ Common mistake: validating before authenticating — you'd leak validation details to users who shouldn't even reach the route.

> 🔗 QCTO Bridge: This is exactly an ASP.NET action filter (`IActionFilter`, or `[Authorize]`) stacked with attributes like `[Authorize] [ValidateModel]` on the action.

<!--
TIME: 75s
ENERGY: Clear, rules-based.
WHAT TO SAY: "A filter is route-scoped middleware. Stack several and they run left to right, then the action runs last. Auth before validation before the work — order matters here too."
DEMO: Write requireAuth; attach requireAuth + validateBody + controller.create.
TRANSITION: "Filters can also run AFTER the action — let's see before/after logic."
-->

---

# Two Hooks: On the Way In, On the Way Out (PA0309)

```javascript
const auditAction = (req, res, next) => {
  // ── BEFORE the action ──
  const start = Date.now();
  req.requestId = crypto.randomUUID();

  // ── AFTER the response is sent ──
  res.on('finish', () => {
    const ms = Date.now() - start;
    logger.info('action complete', {
      id: req.requestId, route: req.path,
      status: res.statusCode, ms
    });
  });

  next();   // run the action in between
};
```

> 💡 The same function brackets the action: setup runs before `next()`, teardown runs inside the `finish` listener. That's how you run code after the response is sent.

> 🔗 QCTO Bridge: This is ASP.NET's `OnActionExecuting` (before) and `OnActionExecuted` (after) on an `IActionFilter`. One filter, two moments — identical shape.

<span class="pa-badge earned">PA0302 ✅</span> <span class="pa-badge earned">PA0306 ✅</span> <span class="pa-badge earned">PA0309 ✅</span>

<!--
TIME: 60s
ENERGY: A neat trick — the res 'finish' event.
WHAT TO SAY: "A filter can work on the way IN and on the way OUT. The trick is res.on('finish') — it fires after the response is sent, a clean 'after action' hook for timing and auditing."
DEMO: Show the start time before, the duration + status after.
TRANSITION: "Controllers and routing are done. Now models."
-->

---

# Controllers & Routing — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0301** — Wrote controllers & actions
- ✅ **PA0302** — Wrote an action filter
- ✅ **PA0303** — Mounted controllers on the app
- ✅ **PA0304** — Configured routes (routing table)
- ✅ **PA0305** — Configured routes via attributes

</div>
<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0306** — Added an action filter to a route
- ✅ **PA0307** — A controller that responds to users
- ✅ **PA0308** — Designed user-friendly URLs
- ✅ **PA0309** — Ran before/after action logic

</div>

<div class="text-sm opacity-60 mt-8">17 checkpoints down · Next section: Models & Validation</div>

<!--
TIME: 20s
ENERGY: Checkpoint pride.
WHAT TO SAY: "Nine checkpoints in this section — the whole controllers-and-routing layer. Requests now reach the right action and respond cleanly. Next: the shape of our data."
TRANSITION: "Models and validation."
-->

---
layout: section
---

# VIDEO 7

## Creating Models & Business Logic

Duration: ~7 min

> 🎤 **SLIDES ONLY** — model *design* (the five entities & relationships). The actual `schema.prisma` gets written in Video 10, after we install Prisma.

<span class="pa-badge">PA0501</span> <span class="pa-badge">PA0504</span>

<!--
🎥 VIDEO NAME: "7. Creating Models & Business Logic (PA0501, PA0504)"
🎯 OBJECTIVE: By the end the student can define data models with relationships and place domain rules in the right layer (controller/service), not the UI.
WHAT TO SAY: "A model is the shape of one kind of thing. ApplyIQ has five: User, Application, Activity, Contact, CoverLetter. And a model isn't just storage — it carries rules. Creating an application auto-logs an 'Applied' activity; changing status logs the change."
DEMO: Walk schema.prisma; in Postman create an app and show the auto-created activity; PATCH status and show the STATUS_CHANGE activity.
COMMON QUESTION: "DB trigger instead?" — For learning, the controller is clearer.
TRANSITION: "Business rules need clean input. Let's validate."
TIME: 15s divider
-->

---

# Five Models, Every Relationship Defined (PA0501)

```
User ──(1:many)──▶ Application ──(1:many)──▶ Activity
                         │
                         ├──(1:many)──▶ Contact
                         └──(1:many)──▶ CoverLetter
```

**Key modelling decisions:** `cuid()` IDs (URL-safe, unique) · `onDelete: Cascade` (deleting an application removes its activities) · `@map` snake_case (JS camelCase ↔ SQL snake_case).

> 💡 A model is a noun in your domain. If you can draw it as a box with arrows, you can model it.

> ⚠️ Common mistake: forgetting the back-relation. Prisma needs the relation declared on both sides (User has Applications, Application belongs to User).

> 🔗 QCTO Bridge: These are ASP.NET POCO entity classes — `public class Application { public User User; }` — with navigation properties for the relationships.

<!--
TIME: 60s
ENERGY: Slow down — relationships trip students up.
WHAT TO SAY: "Five models. User has many Applications; an Application has many Activities, Contacts, CoverLetters. Get the relationships right and everything downstream is easy."
DEMO: Open schema.prisma; walk User and Application relation fields.
TRANSITION: "A model also carries rules — business logic."
-->

---

# Rules Live With the Model, Not the UI (PA0504)

```javascript
// POST /api/applications — creating one also logs the first activity
const create = async (req, res) => {
  const app = await prisma.application.create({
    data: { ...value, userId: req.user.id }
  });
  await prisma.activity.create({
    data: { applicationId: app.id, type: 'APPLIED', date: new Date() }
  });
  res.status(201).json(app);
};

// PATCH — if the status changed, record it
if (value.status && value.status !== existing.status) {
  await prisma.activity.create({
    data: { applicationId: app.id, type: 'STATUS_CHANGE',
            note: `${existing.status} → ${value.status}`, date: new Date() }
  });
}
```

> 💡 If the frontend disappeared tomorrow, the business rules would still hold. That's how you know they're in the right layer.

> 🔗 QCTO Bridge: ASP.NET puts this in a service or domain method, never in the Razor view. Same separation — logic lives behind the controller.

<span class="pa-badge earned">PA0501 ✅</span> <span class="pa-badge earned">PA0504 ✅</span>

<!--
TIME: 75s
ENERGY: The "aha" — logic that feels like magic.
WHAT TO SAY: "Create an app and an 'Applied' activity appears automatically. Change the status and the change is logged. The frontend just creates an app; the rules live in the controller, the right layer."
DEMO: Create in Postman, GET with include, show the activity; PATCH status, show STATUS_CHANGE.
TRANSITION: "Rules need clean input. Validation."
-->

---
layout: section
---

# VIDEO 8

## Validating User Input

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — `npm install joi`, create `middleware/validate.js` + the Joi schemas, attach `validate(schema)` to a route.

<span class="pa-badge">PA0503</span> <span class="pa-badge">PA0506</span> <span class="pa-badge">PA0508</span>

<!--
🎥 VIDEO NAME: "8. Validating User Input (PA0503, PA0506, PA0508)"
🎯 OBJECTIVE: By the end the student can write a Joi schema, return all field errors at once using the sanitised value, and apply validation across the whole app with one reusable middleware.
WHAT TO SAY: "Never trust user input. A Joi schema declares exactly what valid data looks like and rejects everything else. We return ALL errors at once, use the sanitised value, and factor it into one validate(schema) middleware applied everywhere."
DEMO: Write registerSchema; send bad fields in Postman; show the error array; attach validate(applicationSchema) to a route.
COMMON QUESTION: "Where does validation go — middleware or controller?" — Both work; middleware scales better.
TRANSITION: "Validated data needs a home. The database and ORMs."
TIME: 15s divider
-->

---

# Declare the Shape, Reject the Rest (PA0506)

**① Install Joi:** `npm install joi`
**② Create `server/src/schemas/auth.schema.js`:**

```javascript
const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({ 'string.email': 'Please enter a valid email address' }),
  password: Joi.string().min(8)
    .pattern(/[A-Z]/)          // at least one uppercase
    .pattern(/[0-9]/)          // at least one number
    .required()
    .messages({ 'string.min': 'Password must be at least 8 characters' }),
  name: Joi.string().max(50).trim()
});

module.exports = { registerSchema };
```

> 💡 A schema is a contract: valid data passes through (sanitised), everything else bounces with a clear message.

> ⚠️ Common mistake: validating in the frontend only. The backend must re-validate — anyone can call your API directly with Postman.

> 🔗 QCTO Bridge: ASP.NET expresses this with Data Annotations (`[Required]`, `[EmailAddress]`, `[StringLength(50)]`). Joi is the same rules as a standalone object instead of attributes.

<!--
TIME: 60s
ENERGY: Practical — immediately reusable.
WHAT TO SAY: "Never trust user input. Joi declares valid email, an 8-char password with an uppercase and a number, a trimmed name. Anything else bounces with a readable message."
DEMO: Write registerSchema; send a bad email + short password in Postman; show errors.
TRANSITION: "Now wire it in and return every error at once."
-->

---

# Every Error at Once, One Reusable Validator (PA0508, PA0503)

**③ Create `server/src/middleware/validate.js`** — one reusable validator:

```javascript
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false }); // collect ALL errors
  if (error) return res.status(400).json({
    errors: error.details.map(d => ({ field: d.path[0], message: d.message }))
  });
  req.body = value;   // hand the route the cleaned, sanitised data
  next();
};
module.exports = validate;
```

**④ Wire it on a throwaway route in `app.js`** (real routes come together in Video 10):

```javascript
const validate = require('./middleware/validate');
const { registerSchema } = require('./schemas/auth.schema');
app.post('/api/test-validate', validate(registerSchema), (req, res) => res.json({ ok: true }));
```

**⑤ Test in Postman:** POST `{ "email": "nope", "password": "short" }` → **400** with both errors · POST valid data → **200 `{ ok: true }`**

> 💡 `abortEarly: false` returns every error at once; `req.body = value` passes the sanitised data on. This one `validate(schema)` covers all 13 endpoints once routes exist. `router.post('/', validate(applicationSchema), controller.create)` is that real wiring.

> 🔗 QCTO Bridge: Mirrors ASP.NET's `if (!ModelState.IsValid) return BadRequest(ModelState)` and the app-wide `[ApiController]` validation convention.

<span class="pa-badge earned">PA0503 ✅</span> <span class="pa-badge earned">PA0506 ✅</span> <span class="pa-badge earned">PA0508 ✅</span>

<!--
TIME: 90s
ENERGY: Professional polish.
WHAT TO SAY: "Two things make validation feel professional: abortEarly false so the user gets ALL errors at once, and using the sanitised value not raw req.body. Then we factor it into one validate(schema) middleware applied to every route."
DEMO (runnable now, no DB needed): `npm install joi`; create `middleware/validate.js` + a schema. There are no real routes/controllers yet (those come together at V10), so demo on a throwaway inline route — same trick as loginLimiter in V2: `app.post('/api/test-validate', validate(registerSchema), (req, res) => res.json({ ok: true }));`. In Postman, POST a bad email + short password → show the 400 with the full error array; POST valid data → 200 { ok: true }. The `router.post('/', validate(...), controller.create)` line on the slide is the real wiring we assemble from V10.
TRANSITION: "Validated data needs a home. ORMs."
-->

---

# Models & Validation — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0501** — Created models & relationships
- ✅ **PA0503** — Validated the whole application
- ✅ **PA0504** — Added model business logic

</div>
<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0506** — Added validation (Joi schemas)
- ✅ **PA0508** — Validated input, returning all errors

</div>

<div class="text-sm opacity-60 mt-8">22 checkpoints down · Next section: Object-Database Mapper</div>

<!--
TIME: 20s
ENERGY: Checkpoint.
WHAT TO SAY: "Five checkpoints — models and validation. Our data has shape and our input is trustworthy. Now we make it permanent."
TRANSITION: "The database, through an ORM."
-->

---
layout: section
---

# VIDEO 9

## What Is an ORM?

Duration: ~6 min

> 🎤 **SLIDES ONLY** — concept: what an ORM is and why we use Prisma. We install it next video.

<span class="pa-badge">PA0601</span> <span class="pa-badge">PA0602</span>

<!--
🎥 VIDEO NAME: "9. What Is an ORM? (PA0601, PA0602)"
🎯 OBJECTIVE: By the end the student can explain what an ORM is, why we use Prisma over raw SQL, and use the core CRUD methods.
WHAT TO SAY: "An ORM — Object-Relational Mapper — lets you talk to a SQL database using objects and methods instead of SQL strings. Same query, but type-safe, autocompleted, typo-proof. Day to day it's about five methods."
DEMO: Show prisma.application.find autocomplete; typo a field, show the red squiggly; run findMany and create.
COMMON QUESTION: "Should I still learn SQL?" — Yes; ORMs generate SQL and understanding it helps you debug.
TRANSITION: "Knowing what an ORM is, let's add it to our project."
TIME: 15s divider
-->

---

# Same Query, Two Languages (PA0601)

<div class="columns">
<div>

### Raw SQL

```sql
SELECT * FROM applications
WHERE user_id = '123'
  AND status = 'Interview'
ORDER BY applied_date DESC;
```

</div>
<div>

### Prisma (an ORM)

```javascript
prisma.application.findMany({
  where: {
    userId: '123',
    status: 'Interview'
  },
  orderBy: { appliedDate: 'desc' }
});
```

</div>
</div>

> 💡 Prisma is type-safe: a typo'd field fails in your editor, not at midnight in production.

> 🔗 QCTO Bridge: Prisma is the JS equivalent of ASP.NET's Entity Framework Core — both map database rows to objects so you write code, not SQL.

<!--
TIME: 60s
ENERGY: Clear comparison.
WHAT TO SAY: "Same query, two languages. Raw SQL needs exact table and column names. Prisma is just JavaScript — and it catches typos before you run it."
DEMO: Show autocomplete; typo a field; show the squiggly.
TRANSITION: "Day to day it comes down to five methods."
-->

---

# The Five Methods You'll Use Daily (PA0602)

```javascript
await prisma.application.findMany({ where: { userId } });   // READ many
await prisma.application.findUnique({ where: { id } });     // READ one
await prisma.application.create({ data: { companyName, userId } });  // CREATE
await prisma.application.update({ where: { id }, data: { status } });// UPDATE
await prisma.application.delete({ where: { id } });         // DELETE
```

> 💡 Every model gets the same method set automatically — learn them once, use them on User, Application, Contact, everything.

> ⚠️ Common mistake: `findUnique` only works on unique fields (id, email). Use `findFirst` to query by a non-unique field.

> 🔗 QCTO Bridge: These map to Entity Framework's `DbSet` methods — `ToListAsync()`, `FindAsync()`, `Add()`, `Update()`, `Remove()`.

<span class="pa-badge earned">PA0601 ✅</span> <span class="pa-badge earned">PA0602 ✅</span>

<!--
TIME: 60s
ENERGY: Reassuring — it's a small surface area.
WHAT TO SAY: "Learn these five — findMany, findUnique, create, update, delete — and you can build most apps. Every model gets them for free."
DEMO: Run a findMany and a create against the dev DB.
TRANSITION: "Let's add the ORM to our actual project."
-->

---
layout: section
---

# VIDEO 10

## Adding & Connecting the ORM

Duration: ~7 min

> 🖥️ **TO THE CODEBASE — THE BIG BUILD** — `npm install prisma @prisma/client`, `npx prisma init`, write all 5 models in `prisma/schema.prisma`, set `DATABASE_URL` in `.env`, create `lib/prisma.js`, then `npx prisma migrate dev --name init`.
> ↩ This is where the controllers/routes from Videos 4–5 finally light up — `prisma` now exists.

<span class="pa-badge">PA0603</span> <span class="pa-badge">PA0604</span> <span class="pa-badge">PA0606</span>

<!--
🎥 VIDEO NAME: "10. Adding & Connecting the ORM (PA0603, PA0604, PA0606)"
🎯 OBJECTIVE: By the end the student can install Prisma, define a schema, configure the connection string and a shared client, and run the first migration to create real tables.
WHAT TO SAY: "Adding an ORM is three steps: install, define a schema, configure the connection. Then one command — migrate dev — turns the schema into real database tables."
DEMO: npm install prisma; npx prisma init; add the Application model; show DATABASE_URL in .env; run npx prisma migrate dev --name init; show the tables.
COMMON QUESTION: "Migration failed?" — Check DATABASE_URL and that the DB is running.
TRANSITION: "Tables exist — let's store and retrieve real data."
TIME: 15s divider
-->

---

# Install, Define, Configure (PA0604, PA0606)

**① Install Prisma & scaffold it:**

```bash
npm install prisma @prisma/client
npx prisma init            # creates prisma/schema.prisma + .env
```

**② Define your models in `prisma/schema.prisma`** (Application shown — add `User`, `Activity`, `Contact`, `CoverLetter` the same way):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")     // read from .env, never hardcoded
}

model Application {
  id String @id @default(cuid())
  companyName String
  status String @default("Applied")
  userId String
  user User @relation(fields: [userId], references: [id])
  @@map("applications")
}
```

**③ Set the connection in `.env`:** `DATABASE_URL="postgresql://USER:PASS@localhost:5432/applyiq"`
**④ Create the shared client `server/src/lib/prisma.js`:**

```javascript
const { PrismaClient } = require('@prisma/client');
module.exports = new PrismaClient();
```

> 💡 The schema file is the single source of truth — Prisma generates the client and migrations from it. One connection string, one shared client.

> ⚠️ Common mistake: committing `.env`. Add it to `.gitignore` before your first commit, or your DB credentials end up on GitHub.

> 🔗 QCTO Bridge: ASP.NET adds EF Core via NuGet, defines a `DbContext` with `DbSet<Application>`, and stores the connection in `appsettings.json`/user-secrets. `schema.prisma` is that `DbContext` in declarative form.

<!--
TIME: 75s
ENERGY: Setup pace — keep it moving.
WHAT TO SAY: "Install Prisma, init it, define the model, point the datasource at DATABASE_URL in .env, and export one shared client. That's the whole connection config."
DEMO: Run install + init; add the model; show .env and lib/prisma.js.
TRANSITION: "Schema's defined — now make it real with a migration."
-->

---

# `migrate dev` — Schema Becomes Reality (PA0603)

**⑤ Run the migration** — one command does four things:

```bash
$ npx prisma migrate dev --name init

# 1. Diff schema against the database
# 2. Generate a SQL migration file
# 3. Run it against PostgreSQL
# 4. Regenerate the Prisma Client (JS types)

✅ Migration applied: 20240225_init
✅ Generated Prisma Client
```

**⑥ Verify:** open your DB dashboard — all five tables are live. Restart the server; the data survives. It's persistent now.

> 💡 The schema is the source of truth — never edit the database by hand. Change the schema, then `migrate` again, and every environment stays in sync.

> ⚠️ Migration failed? 99% of the time it's `DATABASE_URL` wrong or the database not running. Check both, then re-run.

> 🔗 QCTO Bridge: This is EF Core's `Add-Migration init` + `Update-Database`. Prisma folds both into one `migrate dev` command.

<span class="pa-badge earned">PA0603 ✅</span> <span class="pa-badge earned">PA0604 ✅</span> <span class="pa-badge earned">PA0606 ✅</span>

<!--
TIME: 75s
ENERGY: Big moment — data becomes real. Celebrate it.
WHAT TO SAY: "This is the moment data becomes real. migrate dev diffs the schema, generates SQL, runs it, and regenerates the client — four things in one command. Open the dashboard: all five tables, live."
DEMO: Run migrate dev LIVE; open the DB dashboard, show the tables.
TRANSITION: "Tables exist — let's store and retrieve data."
-->

---
layout: section
---

# VIDEO 11

## Retrieving & Storing Data

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — flesh out the controller actions with real Prisma (`create`, `findUnique` + `include`); now do the full Postman round-trip you set up in Video 4.

<span class="pa-badge">PA0605</span> <span class="pa-badge">PA0608</span>

<!--
🎥 VIDEO NAME: "11. Retrieving & Storing Data (PA0605, PA0608)"
🎯 OBJECTIVE: By the end the student can persist records and query them back with related data, and trace a full request → ORM → table → response.
WHAT TO SAY: "Now we read and write for real. create stores a row; findUnique with include pulls it back with its activities and contacts in a single query. And we trace the whole chain end-to-end."
DEMO: Create an app in Postman; GET it with include; show the nested response and the row in the DB dashboard.
COMMON QUESTION: "N+1 queries?" — include generates one JOIN instead of many round-trips.
TRANSITION: "Direct prisma calls in controllers get repetitive — let's introduce a repository."
TIME: 15s divider
-->

---

# One Query, All the Related Data (PA0605, PA0608)

```javascript
const getApplication = async (req, res) => {
  const app = await prisma.application.findUnique({
    where: { id: req.params.id, userId: req.user.id },   // ownership check
    include: {
      activities: { orderBy: { date: 'desc' } },
      contacts: true,
      coverLetters: { orderBy: { createdAt: 'desc' }, take: 1 }
    }
  });
  if (!app) return res.status(404).json({ error: 'Not found' });
  res.json(app);
};
```

```
POST /api/applications → controller.create → prisma.create
  → PostgreSQL INSERT → returns row → res.status(201).json(app) → client
```

> 💡 Without `include` you'd fire four queries; with it, Prisma emits one SQL JOIN. Persistence is the milestone that turns a demo into an app — restart the server and your data is still there.

> ⚠️ Common mistake: not handling an unreachable DB. We'll formalise turning that into a clean 500 in the errors section.

> 🔗 QCTO Bridge: `include` is Entity Framework's `.Include(x => x.Activities)` eager loading; the full request → `DbContext` → SQL → entity → `Ok()` flow is identical.

<span class="pa-badge earned">PA0605 ✅</span> <span class="pa-badge earned">PA0608 ✅</span>

<!--
TIME: 75s
ENERGY: Satisfying — the whole system breathes.
WHAT TO SAY: "create stores a row; findUnique with include pulls it back with activities and contacts in one JOIN. A POST flows controller → prisma → INSERT → row → response. Your app and database are now one working system."
DEMO: Create in Postman; GET with include; show nested response and the row in the dashboard.
TRANSITION: "Direct prisma calls get repetitive — let's add a repository."
-->

---
layout: section
---

# VIDEO 12

## The Repository Pattern

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `repositories/applicationRepository.js`; point a controller at its named methods instead of calling `prisma` directly.

<span class="pa-badge">PA0607</span>

<!--
🎥 VIDEO NAME: "12. The Repository Pattern (PA0607)"
🎯 OBJECTIVE: By the end the student can move data-access code into a repository and explain the benefit.
WHAT TO SAY: "A repository is a thin layer that hides the ORM behind named methods. The controller says findByUser; it doesn't know prisma is underneath. Swap the database later and the controller never changes — and it's far easier to test."
DEMO: Show applicationRepository with findByUser/create; controller calling repo methods.
COMMON QUESTION: "Isn't Prisma already an abstraction?" — Yes, but a repository abstracts YOUR domain operations, not generic CRUD.
TRANSITION: "Data layer done. Now make the app robust with error handling."
TIME: 15s divider
-->

---

# Hide the ORM Behind Named Methods

```javascript
// repositories/applicationRepository.js
const applicationRepository = (prisma) => ({
  findByUser: (userId) =>
    prisma.application.findMany({ where: { userId } }),
  findOwned: (id, userId) =>
    prisma.application.findUnique({ where: { id, userId } }),
  create: (data) =>
    prisma.application.create({ data })
});
module.exports = { applicationRepository };

// controller just calls intent-named methods:
const apps = await repo.findByUser(req.user.id);
```

> 💡 The controller speaks business language (`findOwned`), not database language. Data access lives in one swappable place.

> ⚠️ Common mistake: leaking Prisma-specific shapes out of the repo. Keep the ORM details inside it so the rest of the app stays decoupled.

> 🔗 QCTO Bridge: This is the classic ASP.NET Repository pattern — `IApplicationRepository` injected into the controller — exactly the separation QCTO asks for here.

<span class="pa-badge earned">PA0607 ✅</span>

<!--
TIME: 75s
ENERGY: Architectural — the payoff of separation.
WHAT TO SAY: "A repository hides the ORM behind named methods. The controller calls findOwned and never mentions prisma. Swap databases later and the controller doesn't change."
DEMO: Show the repository; controller calling repo methods.
TRANSITION: "Data layer done. Now error handling."
-->

---

# Object-Database Mapper — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0601** — Explained what an ORM is
- ✅ **PA0602** — Worked with the ORM (CRUD methods)
- ✅ **PA0603** — Connected the ORM to the database
- ✅ **PA0604** — Added the ORM to the project

</div>
<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0605** — Retrieved & stored data
- ✅ **PA0606** — Configured the ORM connection
- ✅ **PA0607** — Separated logic via the repository pattern
- ✅ **PA0608** — Connected the app to the database

</div>

<div class="text-sm opacity-60 mt-8">30 checkpoints down · Next section: Errors & Logging</div>

<!--
TIME: 20s
ENERGY: Checkpoint.
WHAT TO SAY: "Eight checkpoints — the entire data layer. The app reads and writes a real database through clean, swappable access. Now we make it robust."
TRANSITION: "Errors and logging."
-->

---
layout: section
---

# VIDEO 13

## Handling Exceptions Gracefully

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `middleware/errorHandler.js`, `middleware/asyncHandler.js`, `errors/NotFoundError.js`; wire the error handler **last** in `app.js` (below all routes).

<span class="pa-badge">PA0906</span> <span class="pa-badge">PA0907</span>

<!--
🎥 VIDEO NAME: "13. Handling Exceptions Gracefully (PA0906, PA0907)"
🎯 OBJECTIVE: By the end the student can register a global error handler, forward async errors to it, and distinguish expected from unexpected failures.
WHAT TO SAY: "Your strategy isn't try/catch in every action. It's ONE global error handler, registered LAST, that catches everything. Async errors need forwarding, and custom error classes turn a 'not found' into a clean 404, not a 500."
DEMO: Add the handler last; throw in a route; show the sanitised response; wrap with asyncHandler; throw NotFoundError, show the 404.
COMMON QUESTION: "Why does my async error crash instead of returning 500?" — On Express 4, because it was never passed to next(); asyncHandler fixes that. (Express 5, which we use, forwards it automatically — so frame asyncHandler as the explicit, portable habit, not a hard requirement here.)
TRANSITION: "Errors are handled — now record what happens with proper logs."
TIME: 15s divider
-->

---

# The Four-Parameter Safety Net (PA0906)

```javascript
// app.js — MUST be the LAST middleware registered
const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack, path: req.path,
    method: req.method, userId: req.user?.id || 'anonymous'
  });

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: statusCode === 500
      ? 'Internal Server Error'   // never leak stack traces to users
      : err.message               // client errors are safe to show
  });
};

app.use(errorHandler);
```

> 💡 Four parameters `(err, req, res, next)` = error handler. Three = regular middleware. Express uses the count to tell them apart.

> ⚠️ Common mistake: registering it too early. It must come after all routes, or it won't catch their errors.

> 🔗 QCTO Bridge: This is ASP.NET's `app.UseExceptionHandler("/error")` — one place that catches unhandled exceptions and shapes the response.

<!--
TIME: 75s
ENERGY: Production mindset.
WHAT TO SAY: "One global handler, registered last, catches everything. The trick: Express recognises four parameters as an error handler. Log full detail for developers; send a sanitised message to users — never leak stack traces."
DEMO: Add the handler last; throw in a route; show the sanitised response.
TRANSITION: "Now let's make sure async errors always reach it — and name the expected ones."
-->

---

# Forward Async Errors, Name Known Ones (PA0907)

```javascript
// Wrap async actions so thrown errors reach the global handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Custom error = expected failure with a status code
class NotFoundError extends Error {
  constructor(msg = 'Not found') { super(msg); this.statusCode = 404; }
}

router.get('/:id', asyncHandler(async (req, res) => {
  const app = await repo.findOwned(req.params.id, req.user.id);
  if (!app) throw new NotFoundError();      // → global handler → 404
  res.json(app);
}));
```

> 💡 Expected failures (not found, forbidden) carry their own `statusCode`. Anything without one is unexpected and becomes a 500.

> ↩ **Express 5 note:** Express 5 (what we use) *auto-forwards* a rejected promise from an `async` handler to the error handler — so `asyncHandler` isn't strictly required here. We still teach it because Express 4 and countless codebases/tutorials *do* require it, and because it makes the forwarding explicit. Know both — interviewers and old code will assume the manual version.

> 🔗 QCTO Bridge: ASP.NET distinguishes these with typed exceptions and problem-details responses; `asyncHandler` is the JS way to make `await` errors hit the pipeline explicitly.

<span class="pa-badge earned">PA0906 ✅</span> <span class="pa-badge earned">PA0907 ✅</span>

<!--
TIME: 75s
ENERGY: A subtle but vital gotcha.
WHAT TO SAY: "In Express 4, an async error doesn't reach the global handler unless you forward it — and asyncHandler does exactly that, wrapping the action and piping any rejection to next(). We're on Express 5, which auto-forwards async rejections for you — so be honest with students: you don't strictly need it here. We still write it because Express 4 and most real codebases require it, and it makes the forwarding explicit. Then custom error classes with a statusCode turn a 'not found' into a clean 404 instead of a 500."
DEMO: Wrap with asyncHandler; throw NotFoundError; show the 404. (Don't promise a crash without the wrapper — on Express 5 it'll get caught anyway. Demo the 404 path instead.)
TRANSITION: "Errors handled — now log what happens."
-->

---
layout: section
---

# VIDEO 14

## Logging for Production

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — `npm install winston`, create `lib/logger.js`, swap a `console.log` for `logger.info`.

<span class="pa-badge">PA0908</span> <span class="pa-badge">PA0911</span>

<!--
🎥 VIDEO NAME: "14. Logging for Production (PA0908, PA0911)"
🎯 OBJECTIVE: By the end the student can configure Winston with levels, timestamps, and file output, and use one shared logger with consistent levels everywhere.
WHAT TO SAY: "console.log is for your machine. Winston is for production: log levels to filter by severity, timestamps so you know WHEN, file output so logs survive a restart. The real win is one shared logger and the same four levels everywhere."
DEMO: Create the logger; replace a console.log with logger.info; restart; show formatted output and logs/error.log; show levels filtering debug in production.
COMMON QUESTION: "When do I use which level?" — error=broke, warn=recoverable surprise, info=milestone, debug=detail.
TRANSITION: "Robust and observable — the last layer is security."
TIME: 15s divider
-->

---

# Production Logging, Not console.log (PA0908)

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;
```

> 💡 Three upgrades over console.log: severity levels, timestamps, and durable file output you can read after a crash.

> ⚠️ Common mistake: logging secrets (passwords, tokens) into the file. Scrub sensitive fields before logging.

> 🔗 QCTO Bridge: ASP.NET's `ILogger` with providers (Console, File/Serilog) and `LogLevel` is the same idea — configured logging, not raw prints.

<!--
TIME: 75s
ENERGY: Professional.
WHAT TO SAY: "console.log has no levels, no timestamps, no persistence. Winston gives you all three. Error logs to their own file; everything to combined. In production you raise the level to hide debug."
DEMO: Create the logger; replace a console.log; restart; show output and logs/error.log.
TRANSITION: "The win is consistency — one logger, four levels."
-->

---

# One API, Four Levels (PA0911)

| Level | When | Example |
|-------|------|---------|
| `error` | Something broke | `logger.error('DB connection failed', { host })` |
| `warn` | Recoverable surprise | `logger.warn('Rate limit approaching', { ip })` |
| `info` | Normal milestone | `logger.info('User registered', { userId })` |
| `debug` | Deep detail | `logger.debug('Query result', { rows: 5 })` |

```
2024-02-25 14:30:00 [ERROR]: Database connection failed {"host":"...","stack":"..."}
2024-02-25 14:30:01 [INFO]:  Server started {"port":3001}
```

> 💡 A common logging API means every developer imports the SAME logger and uses the SAME levels — so logs can be searched, filtered, and shipped to a monitoring tool together.

> 🔗 QCTO Bridge: This is logging against a single abstraction — `ILogger<T>` injected everywhere in ASP.NET — so you can swap providers without touching call sites.

<span class="pa-badge earned">PA0908 ✅</span> <span class="pa-badge earned">PA0911 ✅</span>

<!--
TIME: 60s
ENERGY: Tidy close to the section.
WHAT TO SAY: "Four levels: error, warn, info, debug. The win isn't Winston specifically — it's that everyone imports the same logger and uses the same levels, so the logs are consistent and filterable across every file."
DEMO: Trigger an error and a normal op; show level filtering hide debug in production.
TRANSITION: "Robust and observable. The last layer is security."
-->

---

# Errors & Logging — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0906** — Built an exception-handling strategy
- ✅ **PA0907** — Handled unexpected errors

</div>
<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0908** — Added logs to monitor & debug
- ✅ **PA0911** — Logged via a common logging API

</div>

<div class="text-sm opacity-60 mt-8">34 checkpoints down · Final section: Security & Identity</div>

<!--
TIME: 20s
ENERGY: Checkpoint.
WHAT TO SAY: "Four checkpoints — errors and logging. The app fails gracefully and records what happens. One layer left, and it's the most important: security."
TRANSITION: "Security and identity."
-->

---
layout: section
---

# VIDEO 15

## Hashing Passwords with Identity

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — `bcryptjs` is already installed; demo `bcrypt.hash('password123', 12)` twice in a Node REPL, then use it inside `register`.

<span class="pa-badge">PA1001</span>

<!--
🎥 VIDEO NAME: "15. Hashing Passwords with Identity (PA1001)"
🎯 OBJECTIVE: By the end the student can hash passwords with bcrypt and explain why hashing is one-way.
WHAT TO SAY: "The single most important rule in auth: never store passwords. Store bcrypt hashes. If your database leaks, plaintext is a catastrophe; a bcrypt hash can't be reversed — not even by you."
DEMO: In a Node REPL, bcrypt.hash('password123', 12) twice — show two DIFFERENT hashes; explain salting.
COMMON QUESTION: "Different hash each time — how does login work?" — bcrypt.compare extracts the salt from the stored hash.
TRANSITION: "We can hash — now authenticate users and scope their data."
TIME: 15s divider
-->

---

# Store Hashes, Not Passwords

<div class="columns">
<div>

### ❌ Plaintext (disaster)

| Email | Password |
|-------|----------|
| alice@zaio.io | `password123` |

</div>
<div>

### ✅ Hashed (safe)

| Email | Password |
|-------|----------|
| alice@zaio.io | `$2b$12$EixZa...` |

</div>
</div>

```javascript
const passwordHash = await bcrypt.hash(password, 12);  // 12 salt rounds
```

> 💡 Hashing is one-way. Even the developers cannot reverse a bcrypt hash — that's the point.

> ⚠️ Common mistake: using too few salt rounds. 12 is the standard; 10 is too fast for modern GPUs.

> 🔗 QCTO Bridge: ASP.NET Core Identity hashes passwords for you via `UserManager.CreateAsync(user, password)`. We do the same job explicitly with bcrypt so you see the mechanism.

<span class="pa-badge earned">PA1001 ✅</span>

<!--
TIME: 75s
ENERGY: Serious — most important security concept in the module.
WHAT TO SAY: "Never store passwords. Store bcrypt hashes. If the database leaks, plaintext is catastrophe; a bcrypt hash can't be reversed, not even by you. 12 salt rounds is the standard."
DEMO: bcrypt.hash twice in a REPL; show two different hashes; explain salting.
TRANSITION: "Now authenticate users and let them log in with JWT."
-->

---
layout: section
---

# VIDEO 16

## Authentication & Login with JWT

Duration: ~8 min

> 🖥️ **TO THE CODEBASE** — `jsonwebtoken` is installed; create `controllers/auth.js` (`register` + `login`), wire `routes/auth.js`, add `JWT_SECRET` to `.env`. This is where `loginLimiter` re-homes onto the real `POST /login` route.

<span class="pa-badge">PA1002</span> <span class="pa-badge">PA1003</span>

<!--
🎥 VIDEO NAME: "16. Authentication & Login with JWT (PA1002, PA1003)"
🎯 OBJECTIVE: By the end the student can build a secure register endpoint that scopes data per user, and a login that issues a JWT.
WHAT TO SAY: "Registration packs five security decisions into one function and scopes every query by userId. Login verifies the password and signs a JWT — a stateless token the client sends on every request."
DEMO: Register in Postman (no passwordHash in response, 409 on duplicate); login, decode the token at jwt.io.
COMMON QUESTION: "Can someone read my userId in the token?" — Yes, but they can't MODIFY it without the secret; the signature prevents tampering.
TRANSITION: "We issue tokens — now enforce them with authorisation."
TIME: 15s divider
-->

---

# Register: Five Security Decisions, Per-User Data (PA1002)

```javascript
const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);          // 1 validate
  if (error) return res.status(400).json({ errors: error.details });

  const email = value.email.toLowerCase();                             // 2 normalise
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' }); // 3 conflict

  const passwordHash = await bcrypt.hash(value.password, 12);          // 4 hash
  const user = await prisma.user.create({ data: { email, passwordHash, name: value.name } });

  const { passwordHash: _, ...safeUser } = user;                       // 5 strip hash
  res.status(201).json(safeUser);
};
```

> 💡 Per-user content = every query carries `where: { userId: req.user.id }`. A user can never read another user's rows.

> 🔗 QCTO Bridge: ASP.NET Identity + `[Authorize]` plus filtering on the current `User.Identity` does this; we wire it explicitly so the scoping is visible.

<!--
TIME: 75s
ENERGY: Methodical — count the decisions.
WHAT TO SAY: "Five decisions in one function: validate, normalise email, 409 on duplicates, hash, strip the hash from the response. Then every query is scoped by userId so users only see their own data."
DEMO: Register in Postman; show no passwordHash; register again, show 409.
TRANSITION: "Users exist — let them log in and stay logged in."
-->

---

# Verify, Then Sign a Token (PA1003)

```javascript
const login = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { email: req.body.email.toLowerCase() } });

  const ok = user && await bcrypt.compare(req.body.password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token });
};
```

The flow: **credentials → bcrypt.compare → sign JWT → client stores it → sends `Authorization: Bearer <token>` on every request.**

> 💡 Stateless = any of 100 servers can verify any token without a shared session store.

> 🔗 QCTO Bridge: ASP.NET configures this with `AddAuthentication().AddJwtBearer(...)` and issues tokens the same way. JWT is framework-agnostic.

<span class="pa-badge earned">PA1002 ✅</span> <span class="pa-badge earned">PA1003 ✅</span>

<!--
TIME: 75s
ENERGY: Core concept — stateless auth.
WHAT TO SAY: "Login verifies the password with bcrypt.compare, then signs a JWT carrying the userId and an expiry. The client sends it on every request. Stateless: any server can verify any token, no session store."
DEMO: Login in Postman; decode the token at jwt.io; show payload is signed, not encrypted.
TRANSITION: "We issue tokens — now enforce them."
-->

---
layout: section
---

# VIDEO 17

## Authorization — Controlling Access

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — create `middleware/authenticateToken.js` (the guard) + `requireRole`; add the guard to your protected routes. `req.user` is now real everywhere.

<span class="pa-badge">PA1004</span> <span class="pa-badge">PA1005</span>

<!--
🎥 VIDEO NAME: "17. Authorization — Controlling Access (PA1004, PA1005)"
🎯 OBJECTIVE: By the end the student can write auth middleware that verifies a JWT and protects routes, and describe role-based, resource-based, and API-key authorisation.
WHAT TO SAY: "Authentication asked 'who are you'; authorisation asks 'are you allowed'. One guard verifies the token, confirms the user exists, attaches req.user, and lets the request through. Then three patterns: roles, ownership, API keys."
DEMO: Hit a protected route with no token (401), valid token (success), tampered token (403); show requireRole and the ownership check.
COMMON QUESTION: "Why re-fetch the user from the DB?" — The token may be valid but the user deleted. Always confirm.
TRANSITION: "Approaches covered — now defend against actual attacks."
TIME: 15s divider
-->

---

# The Guard: Authentication Middleware (PA1004)

```javascript
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);          // verify signature
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ error: 'User not found' }); // still exists?
    req.user = { id: user.id, email: user.email };                       // attach identity
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
```

> 💡 401 means "you're not logged in"; 403 means "your token is bad/forbidden". Use them precisely.

> 🔗 QCTO Bridge: This middleware is ASP.NET's `[Authorize]` attribute — it validates the bearer token and populates `HttpContext.User` before the action runs.

<!--
TIME: 75s
ENERGY: The keystone of security.
WHAT TO SAY: "One guard verifies the token, confirms the user still exists, attaches req.user, and only then lets the request through. We re-fetch the user because the token may be valid but the user deleted."
DEMO: No token (401), valid token (success), tampered token (403).
TRANSITION: "Basic auth works — production needs several approaches."
-->

---

# Three Patterns, Three Use Cases (PA1005)

```javascript
// 1. Role-Based (RBAC) — higher-order middleware
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};

// 2. Resource-Based (already in our CRUD) — you can only touch what you own
if (application.userId !== req.user.id)
  return res.status(403).json({ error: 'Forbidden' });

// 3. API Key — for machine-to-machine callers
const apiKeyAuth = (req, res, next) => {
  if (!validKeys.includes(req.headers['x-api-key']))
    return res.status(401).json({ error: 'Invalid API key' });
  next();
};
```

> 💡 Roles for admin vs user, ownership for data isolation, API keys for services. You already shipped #2 without realising it.

> 🔗 QCTO Bridge: ASP.NET offers `[Authorize(Roles="Admin")]`, policy-based authorisation, and API-key schemes — the same three approaches, built in.

<span class="pa-badge earned">PA1004 ✅</span> <span class="pa-badge earned">PA1005 ✅</span>

<!--
TIME: 60s
ENERGY: Connect the dots — they already built one.
WHAT TO SAY: "Three ways to control access. Role-based: admin vs user. Resource-based: you only touch what you own — we already built this. API keys: machine-to-machine, like how OpenAI authenticates you."
DEMO: Show requireRole; point at the ownership check already in our CRUD.
TRANSITION: "Now defend against actual attacks."
-->

---
layout: section
---

# VIDEO 18

## Defending Against Exploits & CSRF

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — harden `login` (identical errors + constant-time fake-hash); confirm the `cors({ origin })` config from M1. Mostly editing existing files, no new packages.

<span class="pa-badge">PA1006</span> <span class="pa-badge">PA1007</span>

<!--
🎥 VIDEO NAME: "18. Defending Against Exploits & CSRF (PA1006, PA1007)"
🎯 OBJECTIVE: By the end the student can prevent email enumeration and timing attacks, and explain why header-based JWT auth is CSRF-immune.
WHAT TO SAY: "Two subtle login attacks — email enumeration and timing — and the famous CSRF. Identical errors and constant-time responses defeat the first two; JWT-in-header sidesteps CSRF entirely. Know WHY: interviewers ask this in every security round."
DEMO: Show identical error + fake-hash bcrypt; draw the CSRF flow; show the CORS config and cookie hardening.
COMMON QUESTION: "So we don't need CSRF tokens?" — Not with header JWT. With cookie auth you'd add httpOnly + sameSite + secure.
TRANSITION: "That's all 37 checkpoints — the backend is done. Let's celebrate."
TIME: 15s divider
-->

---

# Reveal Nothing to the Attacker (PA1006)

<div class="columns">
<div>

### Same error for both failures

```javascript
// User not found?  →
return res.status(401).json({
  error: 'Invalid credentials' });

// Wrong password?  →
return res.status(401).json({
  error: 'Invalid credentials' });
```

Prevents **email enumeration**.

</div>
<div>

### Constant-time response

```javascript
// Even if the user doesn't exist,
// run bcrypt anyway:
if (!user) {
  await bcrypt.compare(
    password, '$2b$12$fakehash...');
  return res.status(401).json({
    error: 'Invalid credentials' });
}
```

Prevents **timing attacks**.

</div>
</div>

> 💡 Identical messages and constant time mean an attacker learns nothing from probing your login endpoint.

> 🔗 QCTO Bridge: ASP.NET Identity's sign-in manager deliberately uses the same failure result for both cases. We replicate that defence by hand.

<!--
TIME: 75s
ENERGY: "Think like an attacker."
WHAT TO SAY: "Two subtle attacks. Identical errors for wrong-email and wrong-password stop enumeration. Running bcrypt even when the user doesn't exist keeps response time constant, stopping timing attacks."
DEMO: Show both blocks; explain attackers measure millisecond differences across thousands of requests.
TRANSITION: "One more famous exploit — CSRF."
-->

---

# Header JWT = CSRF-Proof by Design (PA1007)

<div class="columns">
<div>

### The attack

A hidden form on an evil site auto-submits a POST to applyiq.com. The browser **auto-attaches cookies**, so the server thinks it's the real user.

</div>
<div>

### Our defence

We send JWT in the `Authorization` header, **not** cookies. Browsers don't auto-attach headers cross-origin, and CORS blocks unknown origins.

</div>
</div>

```javascript
app.use(cors({ origin: process.env.CLIENT_URL }));   // blocks unknown origins

// If you ever switch to cookie auth, harden it:
res.cookie('token', jwt, { httpOnly: true, sameSite: 'strict', secure: true });
```

> 💡 JWT-in-header is CSRF-proof — but know *why*, because interviewers ask about CSRF in every security question.

> 🔗 QCTO Bridge: ASP.NET defends cookie auth with anti-forgery tokens (`[ValidateAntiForgeryToken]`, `@Html.AntiForgeryToken()`). Header-token SPAs sidestep the whole class of attack.

<span class="pa-badge earned">PA1006 ✅</span> <span class="pa-badge earned">PA1007 ✅</span>

<!--
TIME: 75s
ENERGY: Interview-critical close.
WHAT TO SAY: "CSRF tricks a browser into sending authenticated requests with auto-attached cookies. The attack only works with cookie auth. We use JWT in a header — browsers don't auto-attach headers cross-origin, and CORS blocks unknown origins. Know why; interviewers always ask."
DEMO: Draw the attack flow; show the CORS config; show cookie hardening as a 'what if'.
TRANSITION: "That's all 37 checkpoints — let's celebrate."
-->

---

# Security & Identity — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA1001** — Hashed passwords with Identity (bcrypt)
- ✅ **PA1002** — Authenticated users with per-user data
- ✅ **PA1003** — Configured & added login (JWT)
- ✅ **PA1004** — Basic authorisation (the guard)

</div>
<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA1005** — Several authorisation approaches
- ✅ **PA1006** — Defended against exploits
- ✅ **PA1007** — Avoided CSRF

</div>

<div class="text-sm opacity-60 mt-8">All 37 checkpoints earned · The backend is complete</div>

<!--
TIME: 20s
ENERGY: Big — the final section is done.
WHAT TO SAY: "Seven checkpoints — the full security layer. Passwords hashed, JWT auth, authorisation patterns, and real exploit defences. That's all 37 checkpoints. The backend is done."
TRANSITION: "Let's celebrate the whole module."
-->

---
layout: cover
---

# Module 2 Complete 🎉

"You have built the entire backend of a production-grade SaaS application — 37 checkpoints, one topic at a time."

<div class="columns">
<div>

**Custom Middleware & DI**
<span class="pa-badge earned">PA0202</span> <span class="pa-badge earned">PA0206</span> <span class="pa-badge earned">PA0207</span> <span class="pa-badge earned">PA0208</span>

**Controllers & Routing**
<span class="pa-badge earned">PA0301</span> <span class="pa-badge earned">PA0302</span> <span class="pa-badge earned">PA0303</span> <span class="pa-badge earned">PA0304</span> <span class="pa-badge earned">PA0305</span> <span class="pa-badge earned">PA0306</span> <span class="pa-badge earned">PA0307</span> <span class="pa-badge earned">PA0308</span> <span class="pa-badge earned">PA0309</span>

**Models & Validation**
<span class="pa-badge earned">PA0501</span> <span class="pa-badge earned">PA0503</span> <span class="pa-badge earned">PA0504</span> <span class="pa-badge earned">PA0506</span> <span class="pa-badge earned">PA0508</span>

</div>
<div>

**Object-Database Mapper**
<span class="pa-badge earned">PA0601</span> <span class="pa-badge earned">PA0602</span> <span class="pa-badge earned">PA0603</span> <span class="pa-badge earned">PA0604</span> <span class="pa-badge earned">PA0605</span> <span class="pa-badge earned">PA0606</span> <span class="pa-badge earned">PA0607</span> <span class="pa-badge earned">PA0608</span>

**Errors & Logging**
<span class="pa-badge earned">PA0906</span> <span class="pa-badge earned">PA0907</span> <span class="pa-badge earned">PA0908</span> <span class="pa-badge earned">PA0911</span>

**Security & Identity**
<span class="pa-badge earned">PA1001</span> <span class="pa-badge earned">PA1002</span> <span class="pa-badge earned">PA1003</span> <span class="pa-badge earned">PA1004</span> <span class="pa-badge earned">PA1005</span> <span class="pa-badge earned">PA1006</span> <span class="pa-badge earned">PA1007</span>

</div>
</div>

<!--
🎥 VIDEO NAME: "19. End of Module 2!"
🎯 OBJECTIVE: Celebrate the completed backend and preview Module 3.
WHAT TO SAY: "37 checkpoints across six themes — middleware, controllers, models, the database, errors and logging, and security. This is a real API: authentication, persistence, validation, error handling, structured logging. Be proud of it."
ENERGY: Big payoff moment — let it breathe
TRANSITION: "And now... what's next?"
TIME: 60s
-->

---

# Coming Up in Module 3: The React Frontend

"Every endpoint you just built gets consumed. The app becomes real and visual."

<div class="columns">
<div>

### 1. Kanban Board
React DnD

</div>
<div>

### 2. Dashboard & Analytics
Charts

</div>
<div>

### 3. Forms & Validation
The Joi schemas, now in the UI

</div>
<div>

### 4. Authentication UI
Login / Register screens

</div>
</div>

**Start Module 3 →**

<!--
WHAT TO SAY: "Module 3 — every endpoint we built gets a React interface. Kanban board with drag-and-drop, dashboard charts, forms, and the auth UI. Everything you built here is the engine behind what users finally see. Note: the AI cover-letter feature and web-API integration live in Module 4. Take a break — you've earned it."
ENERGY: Build anticipation
TRANSITION: "End of module. See you in Module 3."
TIME: 30s
-->
