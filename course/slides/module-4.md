---
theme: default
title: "ApplyIQ — Module 4: Web APIs & AI Integration — OpenAI Cover Letter Generator"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 4: Web APIs & AI Integration

Turning ApplyIQ into an Intelligent Assistant — the AI Cover Letter Generator

9 Videos · 7 PA Checkpoints

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#8B5CF6]" />
<div class="font-semibold">Akhil — Co-founder @ Zaio</div>
</div>

<style src="./styles/zaio.css"></style>

<!--
WHAT TO SAY: "This is where ApplyIQ stops being a CRUD app and becomes something you'd actually pay for. We're consuming and building web APIs — and the flagship is a real, production-grade AI cover letter generator powered by the OpenAI API."
ENERGY: High opening energy. This is the module students have been waiting for.
TIME: 1 min
-->

---

# Quick Recap: Where ApplyIQ Actually Is

Three modules are behind us. This module builds on a working app, not a blank folder.

<div class="columns-2 mt-2">
<div>

### ✅ Already built and running
- Express server on `localhost:3000`, full middleware pipeline *(M1)*
- Controllers, repository, Prisma + Postgres, Joi validation *(M2)*
- JWT auth, bcrypt hashing, rate limiting, CORS lock-down *(M2)*
- Winston logging + a global `errorHandler` *(M2)*
- React client: router, pages, `ApplicationForm`, Kanban, charts *(M3)*

</div>
<div>

### 🔧 Known loose ends we fix here
- `client/src/lib/api.js` still ships a **hardcoded `DEV_TOKEN`** — Video 4.7 kills it
- `LoginPage.jsx` is a **stub** — Video 4.7 makes it real
- `schema.prisma` already has a **`CoverLetter` table nothing writes to** — Video 4.6 fills it

</div>
</div>

> ✅ **76 of 101 checkpoints already earned** (12 + 37 + 27). We are not re-explaining routers, controllers, Prisma, or JWTs — those are done and recorded.

> ➡️ **Module 4 picks up here:** the server starts *consuming* an API instead of only serving one.

<!--
TIME: 90s
ENERGY: Reassuring recap, same beat as the Module 2 opener. Point at real files.
WHAT TO SAY: "Before we start, a reminder of what's actually on disk, because this module builds on all of it. The server runs, it's got controllers and a repository and Prisma against real Postgres, and it's protected with JWTs. The React client fetches from it. Eighty-six checkpoints are already banked. But I'm also going to be honest about three loose ends we left behind, because we're fixing all three in this module — there's a hardcoded token sitting in `lib/api.js` that I put there in Module 3 to keep moving, the login page is still a stub, and there's a CoverLetter table in our database that nothing has ever written a row to. Module 4 closes all three."
DEMO: Open `client/src/lib/api.js` and point at `DEV_TOKEN`. Open `prisma/schema.prisma` and point at the empty `CoverLetter` model. Say "we're coming back for both."
TRANSITION: "Here's the nine videos."
-->

---

# Module Map — 9 Videos

<div class="columns"><div>

| # | PA | Title |
|---|---|---|
| 4.1 | PA1201 | What Is a Web API? |
| 4.2 | PA1202 | Developing a Web API |
| 4.3 | PA1203 | Calling an API Server-Side |
| 4.4 | PA1204 | Adding Actions & Calling Them |
| 4.5 | PA1205 | Creating Services |

</div><div>

| # | PA | Title |
|---|---|---|
| 4.6 | — | Persisting What the AI Writes |
| 4.7 | — | Real Login, Real Token |
| 4.8 | PA1206 | Calling APIs from the Client |
| 4.9 | PA1207 | REST Services Done Right |

</div></div>

> 💡 The whole module is anchored on **one flagship feature**: an AI cover-letter generator that streams text word-by-word, just like ChatGPT.

> ⚠️ **4.6 and 4.7 carry no new checkpoint** — they close loose ends from Module 3 (`DEV_TOKEN`, the stub login, the empty `CoverLetter` table). They're short, and 4.8 does not work without 4.7.

<!--
WHAT TO SAY: "Nine videos, seven QCTO checkpoints. Seven of these are assessed; two are not. Videos six and seven are cleanup — in Module 3 I hardcoded an auth token into the API client so we could keep building the UI without stopping for a login screen, and I promised we'd come back. This is coming back. They're short videos and they carry no checkpoint, but skip video seven and video eight cannot work, because streaming needs a real token in a real header."
DEMO: Briefly show the finished feature — paste a job description, click Generate, watch the stream. Then show the letter appearing in the database afterwards.
TIME: 2 min
-->

---

# Same Format as Module 3 — Now Server-Side

<div class="columns"><div>

### The loop, unchanged
1. **Spec** — I say what I want and why
2. **Prompt** — you paste the prompt on the slide
3. **Read** — walk the generated code line by line
4. **Check** — tick the Checkpoint Check slide

</div><div>

### The two rules
- **Never prompt for the thing the checkpoint is about.** PA1203 is "call an API server-side" — so *you* type the `openai.chat.completions.create` call.
- **Give it the rules first.** Module 3 had `client/CLAUDE.md`. The server has none yet — video 4.1 fixes that.

</div></div>

> ⚠️ New in this module: the AI is now writing code that **spends your money**. A hallucinated retry loop on a paid endpoint is a bill, not a bug. Read every line before you run it.

> 💡 `server/CLAUDE.md` is the first thing we build, for the same reason as Module 3: without it you get ESM `import` syntax in a CommonJS project and invented routes.

<!--
TIME: 1.5 min
ENERGY: Brisk. They know this format — this is a reminder, not a re-teach.
WHAT TO SAY: "Same four beats as Module 3: spec, prompt, read, check. Two things change. One, we're back on the server, and the server has no conventions file yet — that's the first thing we build. Two, and this is new: the code the AI writes here calls a paid API. In Module 3 a bad component was ugly. Here a bad loop is a bill. So the reading step matters more than it ever did."
TRANSITION: "First, what a web API actually is."
-->

---
layout: section
---

<span class="pa-badge">PA1201</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.1

# What Is a Web API?

#### ApplyIQ · The contract that lets our app talk to OpenAI (and any service on the internet)

~6 min

<!--
🎥 VIDEO NAME: "M4.1 — What Is a Web API? (PA1201)"
🎯 OBJECTIVE: By the end the student can describe a web API from both sides of the wire — as a provider and as a consumer — and name every part of a request/response using their own code as the example.
⚠️ DO NOT re-teach the restaurant analogy. It was Module 2, Video 1, and students have seen it. Reference it in one sentence and move on. This video's job is the FLIP: our server has been the waiter for three modules; today it sits down as a customer.
WHAT TO SAY: "You already know what a web API is — you built one. Module 2 was eighteen videos of building the waiter. What's new today is that our server is about to walk into somebody else's restaurant and order."
DEMO: Two Postman tabs side by side — a real request from our React client into `localhost:3000/api/applications`, and a real request from our server out to `api.openai.com`. Same anatomy, opposite direction.
COMMON QUESTION: "Is an API a website?" — No. A website returns HTML for humans. An API returns data (usually JSON) for programs.
TRANSITION: "Now that we know what an API is, let's develop our own."
TIME: 15s divider
-->

---

# The Prompt — Video 4.1

**You spec it. The AI scaffolds it. You still own PA1201.**

```text
Read server/src/app.js, server/src/routes/applications.js and everything
in server/src/middleware/. Then create server/CLAUDE.md documenting:

1. Stack and module system — Express 5, CommonJS (require, never import)
2. Folder rules: routes/ controllers/ services/ repositories/
   middleware/ schemas/ lib/ — and say which of these do not exist yet
3. The guard order on a protected route: authenticateToken, then requireAuth
4. Validation is Joi via middleware/validate.js — never hand-rolled ifs
5. A "never do this" list: never log or return a process.env value,
   never call an external API directly from a route handler, never
   create a new client instance per request

Do not change any existing file. Create server/CLAUDE.md only.
```

> ✍️ **You write this yourself:** the explanation. PA1201 is *describing* the request anatomy — verb, URL, headers, body, status. That's the whiteboard, and nothing in this prompt touches it.

> ⚠️ **What it usually gets wrong:** writing `import express from 'express'`. The server is CommonJS. If the conventions file shows ESM, every prompt for the next six videos inherits the mistake.

<!--
TIME: 2 min
ENERGY: Setting the ground rules again — but for the server this time.
WHAT TO SAY: "Module 3 opened by giving the AI the client's rules. The server has never had that file, and it needs it more, because there's more here to get wrong — CommonJS versus ESM, the guard order, where a service goes. So the first thing we do is have it read our own server and write down what it found. Notice I'm not telling it the conventions — I'm asking it to derive them from the code and then I check the answer. If it writes something that isn't true about our codebase, I've learned something before it costs me anything."
DEMO: Run the prompt. Open the generated `server/CLAUDE.md` and read it against the real folders. Fix any line that's wrong, live.
TRANSITION: "It knows the server. Now — what actually is a web API?"
-->

---

# You've Spent Three Modules Being the API

Module 2 called your server **the waiter**. For eighteen videos that's exactly what it was — React ordered, your Express app served.

```
MODULE 2–3   React ──POST /api/applications──▶ YOUR SERVER ──▶ Postgres
                        (you were the waiter)

MODULE 4     YOUR SERVER ──POST /v1/chat/completions──▶ OpenAI
                        (now you're the customer)
```

Today your server keeps serving React **and** starts consuming someone else's API. Same protocol, opposite seat.

> 💡 Nothing new to learn about *what* an API is — you built one. What's new is being on the calling side, where you don't control the contract, the uptime, or the bill.

> ↩ **Recall Module 2, Video 1** — the restaurant. You are still the waiter for React. You're now also a customer at OpenAI's restaurant, and you don't get to see their kitchen either.

> 🔗 QCTO Bridge: QCTO's PS12 covers both sides — *developing* a web API (`ApiController` in ASP.NET, our Express router) and *consuming* one (`HttpClient` in ASP.NET, the `openai` SDK here). Module 2 earned you the first half. This module is the second.

<!--
TIME: 3 min
ENERGY: Framing. Do NOT re-explain the analogy — they've seen it. Spend the energy on the flip.
WHAT TO SAY: "I'm not going to re-run the restaurant, you got it in Module 2 video one. I want you to notice what changed instead. For three modules your server has been the waiter — React orders, you serve. Today your server walks into somebody else's restaurant and becomes the customer. It's both at once now, and that's the actual lesson of this module. Because being a customer is different: you don't control their uptime, you don't control their response format, and every order costs you money."
DEMO: Open `server/src/routes/applications.js` — 'here you are the waiter.' Then open the OpenAI docs page — 'here you're reading somebody else's menu.'
COMMON QUESTION: "Why JSON and not HTML?" — JSON is structured data a program can parse. HTML is layout for a human's eyes.
TRANSITION: "The anatomy is identical in both directions. Let's prove it with our own two requests."
-->

---

# The Same Anatomy, Both Directions

Two real requests from this codebase — one coming in, one going out. Identical structure.

| Part | React → **your API** | Your API → **OpenAI** |
|---|---|---|
| **Verb** | `POST` | `POST` |
| **URL** | `localhost:3000/api/applications` | `api.openai.com/v1/chat/completions` |
| **Headers** | `Authorization: Bearer <your JWT>` | `Authorization: Bearer sk-...` |
| **Body** | `{ companyName, role, status }` | `{ model, messages }` |
| **Back** | `201` + the created row | `200` + `choices[0].message` |

> 💡 You wrote the left-hand column in Module 2. The right-hand column is the same four parts pointed at a machine you don't own — which is why the anatomy is worth naming once and reusing forever.

> ⚠️ The `Authorization` header means opposite things in each column. On the left it's a JWT **you** signed and can verify. On the right it's a secret key **you pay for** — and if it leaks, the bill is yours.

> 🔗 QCTO Bridge: PA1201 asks you to describe a web API and its request/response cycle. Describing it from both seats — provider and consumer — is the complete answer.

<span class="pa-badge earned">PA1201 ✅</span>

<!--
TIME: 3 min
ENERGY: Concrete. Everything on this slide is real and openable.
WHAT TO SAY: "Verb, URL, headers, body going up. Status, headers, body coming back. Both columns, no difference. But look at the headers row, because that's where the two sides stop being symmetrical. On the left, that token is a JWT you signed yourself in Module 2 — you can verify it, you can revoke it, it costs nothing. On the right, that's a key you're paying for by the token. Same header name, completely different consequences if it leaks."
DEMO: Two Postman tabs side by side — fire the real POST to `localhost:3000/api/applications`, then a real POST to OpenAI. Point at each row of the table in both tabs.
TRANSITION: "You know the shape. Let's develop the endpoint that will use it."
-->

---

# Checkpoint Check — PA1201

Read the generated file against these. **Every one must be true before we move on.**

- [ ] `server/CLAUDE.md` exists and says **CommonJS / `require`** — not `import`
- [ ] Guard order is documented as `authenticateToken` → `requireAuth`, in that order
- [ ] The folder list matches what's actually on disk — `services/` does **not** exist yet, and the file should say so
- [ ] It changed **nothing else** — `git status` shows exactly one new file
- [ ] You can name verb, URL, headers, body and status code without looking at the slide

> 🔎 Test it for real: ask it "which module system does this project use?" in a fresh chat. If the answer is ESM, the file isn't being read.

<!--
TIME: 1.5 min
ENERGY: First check of the module. Slow down on line three.
WHAT TO SAY: "Line three is the one that catches people. The model will happily list `services/` as an existing folder because every Express tutorial has one — ours doesn't, not until video 5. A conventions file that describes a codebase you don't have is worse than no conventions file, because now it's confidently wrong on every future prompt. And the last line is the actual assessment: PA1201 is you explaining the anatomy. No file gets you that mark."
DEMO: Walk each line against the generated file and `ls server/src`. Fix the folder list live if it's wrong.
TRANSITION: "Rules are in place. Let's develop our own API."
-->

---
layout: section
---

<span class="pa-badge">PA1202</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.2

# Developing a Web API

#### ApplyIQ · Building our own `/api/ai/cover-letter` endpoint that the frontend will call

~7 min

<!--
🎥 VIDEO NAME: "M4.2 — Developing a Web API (PA1202)"
🎯 OBJECTIVE: By the end the student can scaffold a web API endpoint with an Express router, return JSON, and explain why an API server returns data instead of rendered pages.
WHAT TO SAY: "We just consumed an API. Now we build one. ApplyIQ's backend IS a web API — every route returns JSON, not HTML, because React renders the screen."
DEMO: Open the routes folder, show an existing JSON route, then scaffold the new AI route file.
COMMON QUESTION: "Is my Express app an API?" — Yes. Because it returns JSON for a React client, it's a web API, not a server-rendered site.
TRANSITION: "We have a route. Now let's make it actually call OpenAI."
TIME: 15s divider
-->

---

# The Prompt — Video 4.2

**You spec it. The AI scaffolds it. You still own PA1202.**

```text
Read server/CLAUDE.md first.

1. Create server/src/middleware/aiLimiter.js using the express-rate-limit
   package — it is already installed. 20 requests per hour, keyed by IP,
   responding 429 with { error: "Too many requests, try again later" }.
   Do NOT copy the hand-rolled Map approach in middleware/loginLimiter.js.

2. I have already created server/src/routes/ai.js with the router and the
   POST /cover-letter handler. Add ONLY the guards to that route, in this
   order: authenticateToken, requireAuth, aiLimiter.
   Do not touch the handler body.

3. Mount it in server/src/app.js as app.use("/api/ai", aiRouter) —
   after the applications router, before app.use(errorHandler).

Do not create a controller, a service, or any other file.
```

> ✍️ **You write this yourself:** `routes/ai.js` — `express.Router()`, `router.post('/cover-letter', …)` and `res.json({ message: 'AI endpoint alive' })`. PA1202 *is* "develop a web API". The router and the JSON response are the checkpoint.

> ⚠️ **What it usually gets wrong:** mounting `requireAuth` on its own. Ours only checks `req.user` — `authenticateToken` is what puts it there, so the wrong order 401s every request. It also likes to mount the router *below* `errorHandler`, which makes the route silently unreachable.

<!--
TIME: 2 min
ENERGY: Back in familiar Express territory — move quickly.
WHAT TO SAY: "Look at the split. I write the router and the JSON response, because that IS the checkpoint — PA1202 is developing a web API and I don't get to delegate the thing being assessed. What I do delegate is the rate limiter and the mount line, because that's plumbing. And read point one: I explicitly told it not to copy our own loginLimiter. We wrote that by hand back in Module 2 to see how rate limiting works, but it's an in-memory Map that resets on every restart. It was a teaching tool, not a pattern to spread."
DEMO: Write `routes/ai.js` yourself on camera first. Then paste the prompt and let it add the guards and the mount.
TRANSITION: "Let's read what it wired up."
-->

---

# A Web API Returns Data, Not Pages

In a classic server-rendered app, the server builds HTML. In our stack, **React owns the UI** and the server is a pure data API.

<div class="columns"><div>

**Server-rendered (old)**

Server → HTML → browser paints it. Logic and markup tangled together.

</div><div>

**Web API + React (ours)**

Server → JSON → React decides what to render. Clean separation.

</div></div>

```javascript
// routes/ai.js — scaffolding our web API endpoint
const express = require('express')
const router = express.Router()

router.post('/cover-letter', requireAuth, (req, res) => {
  res.json({ message: 'AI endpoint alive' }) // JSON, not HTML
})

module.exports = router
```

> 💡 The endpoint returns `res.json(...)`. That single choice is what makes this a *web API* rather than a website.

> 🔗 QCTO Bridge: QCTO's checkpoint is "develop a web API." In ASP.NET you'd create a controller class decorated with `[ApiController]` and `[Route("api/ai")]`. Our Express router with `POST /cover-letter` is the same construct — a grouping of API actions under a base path.

<!--
WHAT TO SAY: "The big mental shift: our server never renders a page. It hands React structured data and React paints the screen. res.json is the tell — that's a web API."
DEMO: Wire the router into app.js, hit it with Postman, show the JSON come back.
TIME: 4 min
-->

---

# Mounting & Protecting the Endpoint

```javascript
// app.js — mount the router under a versioned base path
app.use('/api/ai', aiRoutes)
```

An AI endpoint costs **real money** every call, so we guard it from the start:

| Guard | Why | Returns on failure |
|---|---|---|
| `requireAuth` | Only logged-in users | `401` |
| `rateLimit` (20/hr per IP) | Stop cost abuse & runaway scripts | `429` |
| Validation (next video) | No empty/garbage prompts | `400` |

> 💡 Versioned base path (`/api/ai`) means you can ship `/api/v2/ai` later without breaking old clients.

> ⚠️ Common mistake: shipping an unprotected AI endpoint. One script in a loop can drain your OpenAI account overnight — an unguarded AI route is a blank cheque.

> 🔗 QCTO Bridge: ↩ Recall PA0203/PA0207 — Module 2 (middleware & DI). Mounting `requireAuth` and `rateLimit` here is exactly the middleware pipeline you configured earlier, now applied to a web API route.

<span class="pa-badge earned">PA1202 ✅</span>

<!--
WHAT TO SAY: "Twenty requests per hour per IP is generous for cover letters — nobody writes twenty an hour — but it stops a script looping your endpoint. Protect the bill before you write a single line of AI logic."
DEMO: Hit the endpoint 21 times, show the 429 response on the last call.
COMMON QUESTION: "What if a real user hits the limit?" — They get a clear error and can retry next hour. You can raise the number anytime.
TIME: 3 min
-->

---

# Checkpoint Check — PA1202

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `routes/ai.js` uses `express.Router()` and the handler returns `res.json(...)` — no HTML, no `res.render`
- [ ] Guard order on the route reads `authenticateToken`, `requireAuth`, `aiLimiter`
- [ ] `app.use("/api/ai", aiRouter)` sits **above** `app.use(errorHandler)` in `app.js`
- [ ] `aiLimiter.js` uses the installed `express-rate-limit` — not a copy of `loginLimiter.js`
- [ ] It created **no** controller and **no** service file

> 🔎 Test it for real in Postman, three requests: no token → `401`. Valid token → `200` and your JSON. Then hold the send button — request 21 → `429`.

<!--
TIME: 1.5 min
ENERGY: This is where the guard-order bug shows up. Let it.
WHAT TO SAY: "Line two is the one that bites. If `requireAuth` ends up first, the app boots fine, the route exists, and every single request comes back 401 — including yours, with a perfectly valid token. Nothing errors, nothing logs, it just refuses you. Ten minutes of your life, or one line of reading. And run the third test properly: if you can send a hundred requests, the limiter isn't wired, and this endpoint costs real money per call."
DEMO: Walk the guard array. Then Postman: no token, valid token, then hammer it to 429.
TRANSITION: "The endpoint is alive but it's lying — it returns a hardcoded message. Time to call OpenAI."
-->

---
layout: section
---

<span class="pa-badge">PA1203</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.3

# Calling an API from Server-Side Code

#### ApplyIQ · Our backend calls OpenAI — the secret key never touches the browser

~7 min

<!--
🎥 VIDEO NAME: "M4.3 — Calling a Web API Server-Side (PA1203)"
🎯 OBJECTIVE: By the end the student can call an external API (OpenAI) from server-side code and explain why the API key must stay on the server, never in the browser.
WHAT TO SAY: "Here's the rule that separates juniors from professionals: secret API keys NEVER go to the browser. Our server is the trusted middleman that calls OpenAI on the user's behalf."
DEMO: Show the .env with OPENAI_API_KEY, then the server-side call. Open browser devtools network tab — the key is nowhere to be found.
COMMON QUESTION: "Can't React just call OpenAI directly?" — Technically yes, but you'd ship your secret key to every user. Anyone could steal it and bill you.
TRANSITION: "We can call OpenAI. Now let's shape the request and add real actions."
TIME: 15s divider
-->

---

# The Prompt — Video 4.3

**You spec it. The AI scaffolds it. You still own PA1203.**

```text
Read server/CLAUDE.md first.

1. Run npm install openai in server/ and tell me which version installed.

2. Create server/src/services/openai.js: require the SDK, create ONE
   instance from process.env.OPENAI_API_KEY at module load, export it.
   Follow the exact shape of server/src/lib/prisma.js.

3. Fail loud: if OPENAI_API_KEY is missing, throw at module load with a
   message naming the variable — the same pattern as the CLIENT_URL
   guard at the top of app.js.

4. server/.env.example does not exist yet — create it. Mirror every key
   currently in server/.env (DATABASE_URL, JWT_SECRET, CLIENT_URL) with
   EMPTY values plus a one-line comment each, then add OPENAI_API_KEY.
   Do NOT copy any real value across, do NOT touch server/.env, and do
   not log or return the key anywhere.

Leave routes/ai.js alone — I am writing the OpenAI call myself.
```

> ✍️ **You write this yourself:** the call. `await openai.chat.completions.create({ model, messages })` and reading `completion.choices[0].message.content`. PA1203 is "call a web API from server-side code" — that's the line, and it's yours.

> ⚠️ **What it usually gets wrong:** adding a `console.log` to "verify the key loaded" — which puts your secret in the terminal you're screen-recording *and* in `logs/combined.log`. It also likes to construct the client inside the handler, so you build a new one on every request.

<!--
TIME: 2 min
ENERGY: Serious. This is the video where a careless line costs money.
WHAT TO SAY: "Four instructions, and three of them are about the key. That's not paranoia — a leaked OpenAI key gets scraped off GitHub in minutes and billed to you. Point three is the pattern we already used for CLIENT_URL in Module 2: fail at boot, loudly, with the variable name in the message. A missing key that fails at boot costs you five seconds. A missing key that fails at request time costs you an afternoon. And the last line is the important one — I'm writing the actual API call, because that's the checkpoint."
DEMO: Run it. Open `services/openai.js`, compare it side by side with `lib/prisma.js`. Then write the `chat.completions.create` call yourself in the handler.
TRANSITION: "Let's read the client it built — and then check nothing leaked."
-->

---

# The Server Is the Trusted Middleman

```
Browser  ──▶  ApplyIQ Server  ──(secret key)──▶  OpenAI
         ◀──   (JSON result)   ◀────────────────
```

The browser never sees `OPENAI_API_KEY`. The server reads it from the environment and adds it to the outbound request.

```javascript
// services/openai.js
const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
module.exports = openai
```

```javascript
// inside the route — a server-side call to an external API
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are an expert career coach.' },
    { role: 'user',   content: prompt }
  ]
})
const letter = completion.choices[0].message.content
```

> 💡 Same four-part request from Video 4.1 — the OpenAI SDK just builds the `POST`, URL, auth header and JSON body for you.

> ⚠️ Common mistake: putting the key in React or committing `.env` to GitHub. Once a secret is in client code or git history, treat it as leaked — rotate it immediately.

<!--
WHAT TO SAY: "The SDK is doing the exact HTTP request we drew in video one — it just hides the boilerplate. The key lives in process.env on the server. The browser is none the wiser."
DEMO: Open the network tab in devtools during a real generation. Show that the request goes to OUR server, and the OpenAI key appears nowhere.
TIME: 4 min
-->

---

# Three Message Roles — and Choosing a Model

Every modern AI API uses the same three roles in the `messages` array:

- **system** = the AI's job description ("You are a career coach…")
- **user** = what the human is asking for
- **assistant** = the AI's previous replies (for multi-turn chats)

| Model | Quality | Cost / 1K tokens | Best for |
|---|---|---|---|
| GPT-4o | Highest | ~$0.005 | Premium tier |
| GPT-4o-mini | ~95% as good | ~$0.0003 | Default for ApplyIQ |

> 💡 Same `system / user / assistant` pattern works for Claude, Gemini and Mistral. Learn it once, use it everywhere.

> 💡 1,000 cover letters on GPT-4o-mini ≈ $0.30. AI features are absurdly cheap to run — don't let cost scare you off building them.

<span class="pa-badge earned">PA1203 ✅</span>

<!--
WHAT TO SAY: "Three roles: system, user, assistant. That's the whole API surface. And cost? A thousand cover letters costs thirty cents on mini. Less than a packet of chips. Build the feature."
COMMON QUESTION: "Which model for my portfolio project?" — GPT-4o-mini. Cheap, good enough. Only upgrade if you hit a real quality problem.
TIME: 3 min
-->

---

# Checkpoint Check — PA1203

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `services/openai.js` creates the client **once at module load** — not inside a function
- [ ] A missing key throws at boot, with `OPENAI_API_KEY` named in the message
- [ ] `.env.example` was created with **empty** values; `.env` was **not** touched — `git diff` proves it, and no real secret was copied across
- [ ] The key appears in no log line and no response body — `grep -r OPENAI_API_KEY server/src` and read every hit
- [ ] The call you wrote sends a `system` and a `user` message, and reads `choices[0].message.content`

> 🔎 Test it for real: rename the key in `.env` and restart. If the server boots happily and only dies when you hit the route, the guard is in the wrong place. Then generate a letter with DevTools Network open — every request goes to `localhost:3000`, and `sk-` appears nowhere.

<!--
TIME: 1.5 min
ENERGY: Do the grep on camera. Every time.
WHAT TO SAY: "Line four is not optional and it is not paranoia. I want you to run that grep and open every result, because the failure mode here isn't a crash — it's a key sitting in `logs/combined.log`, which you then commit, which someone then scrapes, and now a stranger is running a chatbot on your credit card. The DevTools check is the one to internalise though: open the Network tab, watch the request, and confirm the browser is only ever talking to your own server. That's what 'the server is the trusted middleman' actually looks like."
DEMO: Rename the env var, restart, show the boot failure. Restore it. Run the grep. Open Network and generate.
TRANSITION: "It calls OpenAI — with whatever garbage the user typed. Let's validate before we spend."
-->

---
layout: section
---

<span class="pa-badge">PA1204</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.4

# Adding Actions & Calling Them

#### ApplyIQ · Validating input and building the dynamic prompt that becomes the product

~7 min

<!--
🎥 VIDEO NAME: "M4.4 — Adding Actions & Calling Them (PA1204)"
🎯 OBJECTIVE: By the end the student can add a controller action that validates input with Joi and builds a dynamic prompt from user data before calling the AI.
WHAT TO SAY: "An action is a single endpoint handler — one job, one route. We're adding the cover-letter action: validate the input, build the prompt from the user's real data, call OpenAI."
DEMO: Add the action, send invalid input in Postman, show the 400 Joi error, then send valid input and watch a letter come back.
COMMON QUESTION: "What's an 'action' vs a 'route'?" — The route is the URL+verb mapping; the action is the function that runs. QCTO calls it an action; Express calls it a handler.
TRANSITION: "Our action works but the AI logic is inline. Let's extract it into a reusable service."
TIME: 15s divider
-->

---

# The Prompt — Video 4.4

**You spec it. The AI scaffolds it. You still own PA1204.**

```text
Read server/CLAUDE.md first.

Create server/src/schemas/ai.schema.js exporting coverLetterSchema, in the
same style as server/src/schemas/auth.schema.js:

  jobTitle         string, 2–100,   required
  companyName      string, 2–100,   required
  jobDescription   string, 20–3000, required
  candidateSkills  array of strings, min 1 item, required
  tone             string, one of professional|enthusiastic|formal,
                   default "professional"

Give jobDescription a custom message explaining that a short description
produces a weak letter.

Then add validate(coverLetterSchema) to the POST /cover-letter route —
after the guards, before my handler. Reuse the existing
middleware/validate.js. Do not write a second validator.

Do not modify my handler body and do not write the prompt string.
```

> ✍️ **You write this yourself:** the action, and `buildCoverLetterPrompt()`. PA1204 is "add an action and call it" — and the prompt text *is* the product. Never delegate the thing you're selling.

> ⚠️ **What it usually gets wrong:** writing its own inline validation middleware, which quietly loses `abortEarly: false` — so the user fixes one field, resubmits, and gets told about the next one. Five round trips instead of one.

<!--
TIME: 2 min
ENERGY: Point at the last line hard. This is the module's most important withhold.
WHAT TO SAY: "The schema is boilerplate — five fields and their bounds, the model will nail it. The prompt string is not boilerplate. That paragraph is the entire product; it's the difference between a letter someone sends and a letter someone deletes. If you let the AI write the prompt, you've outsourced the only genuinely creative thing in this feature, and PA1204 is exactly that. Also notice the ordering: validate runs after the guards and before my handler, so a 5-character job description gets a 400 and never reaches OpenAI. That's not tidiness, that's money."
DEMO: Run the prompt for the schema. Then write `buildCoverLetterPrompt` yourself on camera — role, structure, banned cliches.
TRANSITION: "Let's check the ordering, then read the prompt we actually send."
-->

---

# Validate Before You Spend

Every API call costs money, so the action's first job is to reject garbage input **before** it reaches OpenAI.

```javascript
const schema = Joi.object({
  jobTitle:        Joi.string().min(2).max(100).required(),
  companyName:     Joi.string().min(2).max(100).required(),
  jobDescription:  Joi.string().min(20).max(3000).required(),
  candidateSkills: Joi.array().items(Joi.string()).min(1).required(),
  tone:            Joi.string().valid('professional', 'enthusiastic', 'formal')
})
```

| Field | Rule | Why |
|---|---|---|
| jobDescription | min 20 chars | Enough context for a useful letter |
| candidateSkills | array, min 1 | Required to tailor the output |
| tone | enum (3 values) | Controlled, predictable style |

> 💡 Validation isn't just safety — on an AI endpoint it's cost control. No context in = garbage out = a wasted paid call.

> 🔗 QCTO Bridge: ↩ Recall PA0508 — Module 2 (data-annotation validation). QCTO validates with `[Required]`/`[StringLength]` attributes on a model; our Joi schema is the same contract, enforced inside the action.

<!--
WHAT TO SAY: "Min twenty characters on the job description — that's deliberate. Too little context and the AI writes mush, and you paid for it. Joi catches it before the call."
DEMO: POST an empty jobDescription, show the 400 with the field-specific message.
TIME: 3 min
-->

---

# The Prompt Is the Product

The action builds a prompt **dynamically** from the validated user data — every letter is unique because every input is.

```javascript
function buildCoverLetterPrompt({ jobTitle, companyName, jobDescription, candidateSkills, tone }) {
  return `Write a ${tone} cover letter for a ${jobTitle} role at ${companyName}.
Job description: ${jobDescription}
Candidate skills: ${candidateSkills.join(', ')}
Rules: 3 short paragraphs — hook, evidence, close.
Never use cliches like "passionate" or "team player".`
}
```

<div class="columns"><div>

**Bad prompt**

"Write a cover letter." → bland, cookie-cutter output.

</div><div>

**Good prompt**

Role + structure + banned cliches → tailored, professional output.

</div></div>

> 💡 Prompt engineering is a real, paid skill. The quality of the output is capped by the quality of the prompt.

<span class="pa-badge earned">PA1204 ✅</span>

<!--
WHAT TO SAY: "A bad prompt says 'write a cover letter.' A good one assigns a role, dictates structure, and bans the cliches that make AI text obvious. The prompt is code — and it's the difference between a toy and a product."
DEMO: console.log the assembled prompt so students see the exact text sent to OpenAI. Show a lazy vs crafted output side by side.
TIME: 3 min
-->

---

# Checkpoint Check — PA1204

Read the generated code against these. **Every one must be true before we move on.**

- [ ] The schema lives in `schemas/ai.schema.js` and mirrors `auth.schema.js` — `Joi.object`, exported by name
- [ ] The route reads: `authenticateToken` → `requireAuth` → `aiLimiter` → `validate(coverLetterSchema)` → handler
- [ ] It **reused** `middleware/validate.js` — it did not write a second validator
- [ ] Omitting `tone` defaults to `professional`; `tone: "sarcastic"` returns `400`
- [ ] A 5-character `jobDescription` returns `400` **before** any OpenAI call — the logs prove no request went out
- [ ] You `console.log`ged the assembled prompt and read it end to end

> 🔎 Test it for real: send `{}` as the body. You should get back **every** missing field in one response, not just the first one. If you get one at a time, `abortEarly` is wrong.

<!--
TIME: 1.5 min
ENERGY: The 'no spend' check is the satisfying one.
WHAT TO SAY: "Line five is the whole point of validating before you call. Send junk, watch the 400 come back, and watch your server logs stay silent — no OpenAI request, no tokens, no cost. Every rejected request that never reaches the API is money you didn't spend on a letter nobody wanted. And the last line: read the assembled prompt out loud. You'd be amazed how often the string interpolation is subtly wrong and you're sending 'Write a letter for the role of undefined at undefined.'"
DEMO: Send `{}` in Postman — show all five errors at once. Send a 5-char description — 400, and point at the quiet log. Then a real one.
TRANSITION: "It works. But everything lives in the route file. Let's fix that."
-->

---
layout: section
---

<span class="pa-badge">PA1205</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.5

# Creating Services

#### ApplyIQ · Extracting the AI logic into a reusable service so controllers stay thin

~6 min

<!--
🎥 VIDEO NAME: "M4.5 — Creating Services (PA1205)"
🎯 OBJECTIVE: By the end the student can extract business logic into a service module and explain why thin controllers + fat services make code testable and reusable.
WHAT TO SAY: "Right now our prompt-building and OpenAI call live inside the route. That's fine for a demo, terrible for a real app. We extract it into a service — a plain module that does one job and knows nothing about HTTP."
DEMO: Cut the logic out of the route, paste it into services/coverLetter.js, import it back. Route shrinks to a few lines.
COMMON QUESTION: "Why bother — it works already?" — Because a service is testable in isolation and reusable. Tomorrow you call it from a job, a CLI, or another route.
TRANSITION: "Service done. Now let's call this API from the client."
TIME: 15s divider
-->

---

# The Prompt — Video 4.5

**You spec it. The AI scaffolds it. You still own PA1205.**

```text
Read server/CLAUDE.md first.

I have just written server/src/services/coverLetter.js, which exports
generateCoverLetter(data) and returns a string.

Refactor server/src/routes/ai.js to use it:
- require the service
- the handler becomes: call generateCoverLetter(req.body), then respond
  res.json({ coverLetter })
- delete the now-dead inline prompt-building and OpenAI code from the route
- wrap the handler in asyncHandler, the way routes/applications.js does

Constraints: do not change the service file. Do not change the route path,
the guards, or the schema. Do not change the response shape. Behaviour must
be identical — this is a move, not a rewrite.
```

> ✍️ **You write this yourself:** `services/coverLetter.js`. PA1205 is "create a service", so the service is yours end to end — the mechanical rewiring of the route is not.

> ⚠️ **What it usually gets wrong:** passing `req` or `res` into the service "for convenience". The moment a service touches `res`, it's a controller again — and you can't test it without booting Express.

<!--
TIME: 2 min
ENERGY: Refactor rhythm. The constraint block is the lesson.
WHAT TO SAY: "This is the same shape as the refactor prompt back in Module 3, and the same discipline: when you ask for a refactor, you pin everything that isn't the refactor. Path, guards, schema, response shape — all frozen. Because if the model helpfully renames the response key while it's in there, you now can't tell whether your extraction broke something or its redecoration did. A refactor with a moving baseline isn't a refactor, it's a rewrite you didn't agree to."
DEMO: Write `services/coverLetter.js` yourself first — cut and paste from the route. Then run the prompt and diff `routes/ai.js` before and after.
TRANSITION: "Let's look at what a thin route actually reads like."
-->

---

# Thin Controllers, Fat Services

A **service** holds business logic and knows nothing about `req`/`res`. The controller just wires HTTP to the service.

```javascript
// services/coverLetter.js — pure logic, no HTTP
const openai = require('./openai')

async function generateCoverLetter(data) {
  const prompt = buildCoverLetterPrompt(data)
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert career coach.' },
      { role: 'user',   content: prompt }
    ]
  })
  return completion.choices[0].message.content
}
module.exports = { generateCoverLetter }
```

```javascript
// routes/ai.js — controller is now thin
router.post('/cover-letter', requireAuth, rateLimit, validate(schema),
  async (req, res) => {
    const letter = await generateCoverLetter(req.body)
    res.json({ coverLetter: letter })
  })
```

> 💡 The controller's only job is HTTP: read the request, call a service, return a response. All the "how" lives in the service.

> 🔗 QCTO Bridge: This is QCTO's "create a service" checkpoint. In ASP.NET you'd register the service in DI (`builder.Services.AddScoped<ICoverLetterService>()`) and inject it into the controller. Our `require()` import is the lightweight Node equivalent of that injection.

<!--
WHAT TO SAY: "Notice the route is now four lines. All the AI logic lives in the service, which doesn't know what HTTP is. That separation is what makes it testable — in module five we mock the service without touching Express."
DEMO: Show the before/after of the route file shrinking.
TIME: 4 min
-->

---

# One Instance, Shared Everywhere

The `openai` service exports a **single configured instance** — the same pattern as Prisma.

```javascript
// services/openai.js
const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
module.exports = openai   // import this anywhere, one shared client
```

| Service | Created once | Imported by |
|---|---|---|
| `openai` | API client | coverLetter service |
| `prisma` | DB client | every repository |

> 💡 You already know this pattern — it's identical to how you set up Prisma in Module 2. One instance, env-var config, export and reuse.

> ⚠️ Common mistake: calling `new OpenAI()` inside every request handler. That rebuilds the client on every call — create it once at module load and share it.

<span class="pa-badge earned">PA1205 ✅</span>

<!--
WHAT TO SAY: "Three lines is your entire AI service setup, and it's the same shape as Prisma — one instance, env var for the secret, export it. You're not learning a new pattern, you're reusing one you already know."
DEMO: Show .env with the OPENAI_API_KEY placeholder. Remind them: never commit it.
TIME: 2 min
-->

---

# Checkpoint Check — PA1205

Read the refactored code against these. **Every one must be true before we move on.**

- [ ] `services/coverLetter.js` contains no `req`, no `res`, no `next`, no status codes — grep it and confirm
- [ ] The route handler is ~3 lines and is wrapped in `asyncHandler`
- [ ] No `openai.chat.completions.create` left anywhere in `routes/ai.js`
- [ ] The `openai` client is still created **once** in `services/openai.js`, not per call
- [ ] Route path, guards, schema and response shape are all unchanged — `git diff` shows only the move

> 🔎 Test it for real: call `generateCoverLetter({...})` from a plain Node script with Express not running. If you can't, the logic didn't fully leave the route — and that's the whole point of the extraction.

<!--
TIME: 1.5 min
ENERGY: The Node-script test is the memorable one. Do it live.
WHAT TO SAY: "The last line is the real test, and it's worth more than the four above it. Open a scratch file, require the service, call it with a plain object, run `node`. If a cover letter comes back with no server running, you have a genuine service. If it explodes because something's reaching for `req.body`, the extraction is fake — you moved the code but not the dependency. That's the difference between a service and a function you relocated."
DEMO: Grep the service for `res`. Then write a five-line scratch script and run it in the terminal — real letter, no Express.
TRANSITION: "The letter is generated — and then thrown away. Let's fix that."
-->

---
layout: section
---

<span class="text-sm text-gray-400">No new checkpoint · closes a Module 2 loose end</span>

## VIDEO 4.6

# Persisting What the AI Writes

#### ApplyIQ · The `CoverLetter` table has been sitting empty since Module 2 — we finally write to it

~6 min

> 🖥️ **TO THE CODEBASE** — `repositories/applicationRepository.js`, `services/coverLetter.js`, `routes/ai.js`.

<!--
🎥 VIDEO NAME: "M4.6 — Persisting What the AI Writes (no checkpoint)"
🎯 OBJECTIVE: By the end the student can persist a generated artefact through the existing repository and explain why an ownership check must precede a write.
WHAT TO SAY: "Open schema.prisma. There's a CoverLetter model in there — we designed it back in Module 2 with the rest of the data model, and in four videos of generating cover letters we have never written a single row to it. Right now the letter streams to the screen and then it's gone forever. Refresh the page and the user's work is deleted."
DEMO: `npx prisma studio` → open the cover_letters table → completely empty. Say "that's the bug."
COMMON QUESTION: "Why not just save it from the client?" — Because the client can lie about which application it belongs to. Writes get authorised on the server.
TRANSITION: "Two small additions — one repository method, one ownership check."
TIME: 15s divider
-->

---

# The Prompt — Video 4.6

**You spec it. The AI scaffolds it. You own the security check.**

```text
Read server/CLAUDE.md first.

1. Add ONE method to server/src/repositories/applicationRepository.js,
   matching the style of the existing methods exactly:
     saveCoverLetter: (applicationId, body) =>
       prisma.coverLetter.create({ data: { applicationId, body } })

2. Add applicationId to the coverLetterSchema in schemas/ai.schema.js —
   a required string.

3. In routes/ai.js, after generateCoverLetter() returns, call
   repo.saveCoverLetter(...) and include the saved record's id in the
   response as { coverLetter, coverLetterId }.

Do NOT write the ownership check — I am writing that line myself.
Do not change the Prisma schema; the CoverLetter model already exists.
Do not touch services/coverLetter.js.
```

> ✍️ **You write this yourself:** the ownership guard — `const owned = await repo.findOwned(req.body.applicationId, req.user.id)` and the `NotFoundError` if it's missing. Whether user A can write to user B's application is a decision, not boilerplate.

> ⚠️ **What it usually gets wrong:** changing `schema.prisma` and generating a migration you don't need. The table already exists — this is a write, not a schema change. Watch for it and reject it.

<!--
TIME: 2 min
ENERGY: Short video, tight prompt. The withhold is the whole lesson.
WHAT TO SAY: "Notice what I refuse to delegate even in a video with no checkpoint on it. The ownership check is four lines and the model would write it correctly nine times out of ten. But the tenth time it saves the letter without checking, and now anyone who knows an application ID can attach content to a stranger's record. Authorisation decisions get typed by a human who understands the consequence. That's not a QCTO rule, that's a professional one."
DEMO: Run the prompt. Then write the `findOwned` guard yourself, above the generate call.
TRANSITION: "Let's read it and then watch a row appear."
-->

---

# One Method, One Guard, One Row

```javascript
// routes/ai.js — the handler, complete
router.post("/cover-letter", authenticateToken, requireAuth, aiLimiter,
  validate(coverLetterSchema),
  asyncHandler(async (req, res) => {
    // YOU write this: never write to a record you don't own
    const owned = await repo.findOwned(req.body.applicationId, req.user.id);
    if (!owned) throw new NotFoundError("Application not found");

    const coverLetter = await generateCoverLetter(req.body);
    const saved = await repo.saveCoverLetter(owned.id, coverLetter);

    res.json({ coverLetter, coverLetterId: saved.id });
  }));
```

> 💡 `findOwned` filters by `id` **and** `userId` — so a wrong owner returns `null`, and `null` becomes a `404`, not a `403`. We don't confirm the record exists to someone who doesn't own it.

> ↩ **Recall PA0607 (Module 2)** — this is why we built the repository. Persisting the letter took one new named method, and `routes/ai.js` still has no idea Prisma exists.

> 🔗 The payoff is already wired: `findOwned` includes `coverLetters: { take: 1 }`, so `GET /api/applications/:id` now returns the latest letter with no further work.

<!--
TIME: 4 min
ENERGY: Satisfying — a table designed two modules ago finally fills up.
WHAT TO SAY: "Three lines of new logic. The guard runs first, and read what it does when ownership fails — it throws a 404, not a 403. A 403 says 'this exists and you can't have it', which tells an attacker the record is real. A 404 says nothing at all. That's a deliberate choice and it's the same one we made in Module 2. Then we generate, then we save, and here's the bit I love — `findOwned` already pulls in the latest cover letter, because we wrote that include back in Module 2 for a feature that didn't exist yet. It exists now."
DEMO: Generate a letter. Open Prisma Studio — a row. Then `GET /api/applications/:id` in Postman and show the letter riding along in the response with zero new code.
TRANSITION: "The AI feature is complete and durable. Now the awkward part — our client is still using a fake token."
-->

---

# Checkpoint Check — Video 4.6

No QCTO checkpoint here, but the same discipline. **All must be true.**

- [ ] `saveCoverLetter` sits in the **repository**, not in the route or the service
- [ ] The ownership check runs **before** `generateCoverLetter` — you don't pay OpenAI to generate a letter you're about to reject
- [ ] A wrong `applicationId` returns `404`, not `403` and not `500`
- [ ] `schema.prisma` is **unchanged** and no new migration was created — `git status` proves it
- [ ] `services/coverLetter.js` still knows nothing about Prisma or `req`

> 🔎 Test it for real: generate a letter for an application ID belonging to another user (make a second account). You must get a `404` and `cover_letters` must gain **no** row.

<!--
TIME: 1.5 min
ENERGY: The two-account test is worth doing properly on camera.
WHAT TO SAY: "Line two is the one people get backwards, and it costs money. If the ownership check runs after the generate call, you've already paid OpenAI for a letter you're about to throw away — and an attacker can burn your entire budget hitting an endpoint that rejects them at the very end. Check first, spend second. And do the two-account test properly. Make a second user, grab a real application ID from the first, and try to write to it. Four-oh-four and an empty table, or the guard doesn't work."
DEMO: Two accounts in Postman. Cross-write attempt → 404. Show the table gained nothing.
TRANSITION: "Now the token."
-->

---
layout: section
---

<span class="text-sm text-gray-400">No new checkpoint · closes a Module 3 loose end</span>

## VIDEO 4.7

# Real Login, Real Token

#### ApplyIQ · Deleting the `DEV_TOKEN` I hardcoded in Module 3 and wiring the actual login

~7 min

> 🖥️ **TO THE CODEBASE** — `client/src/pages/LoginPage.jsx`, `client/src/lib/api.js`.

<!--
🎥 VIDEO NAME: "M4.7 — Real Login, Real Token (no checkpoint)"
🎯 OBJECTIVE: By the end the student can authenticate against the Module 2 login endpoint from React, persist the token, and remove a development shortcut safely.
WHAT TO SAY: "I owe you an apology and a confession. Open client/src/lib/api.js. There's a constant called DEV_TOKEN with a real JWT pasted into it, and a comment with a date on it. I put that there in Module 3 so we could build twenty-seven videos of UI without stopping to build a login screen first. It was the right call then. It is a disaster if it ships — that token is in your git history, it expires, and every user of your app is currently the same user."
DEMO: Open `lib/api.js`, point at `DEV_TOKEN` and the TEMPORARY comment. Then open `LoginPage.jsx` — 'The login form goes here.' Two promises coming due.
COMMON QUESTION: "Why not just leave it, it works?" — It expires in days, it identifies one hardcoded user, and it's committed. All three are fatal.
TRANSITION: "The endpoint has existed since Module 2 video 16. We just never called it."
TIME: 15s divider
-->

---

# The Prompt — Video 4.7

**You spec it. The AI scaffolds it. You own the token handling.**

```text
Read client/CLAUDE.md first.

CLIENT — replace the stub in client/src/pages/LoginPage.jsx with a real
login form:
- email + password inputs bound to one state object, using our Input and
  Button components from components/ui/
- submit posts to /auth/login via the shared axios instance in lib/api.js
- on a 401, render the server's { error } message above the form
- on success, call the onSuccess(token) callback I will write
- useNavigate from react-router to send the user to "/" after login

Leave the success branch as exactly this:
    // TODO: I store the token and redirect myself

Do NOT touch client/src/lib/api.js — I am deleting DEV_TOKEN by hand.
Do not add a signup form; register already exists and is not in scope.
```

> ✍️ **You write this yourself:** `localStorage.setItem('token', token)` and the deletion of `DEV_TOKEN` from `lib/api.js`. Where a credential lives is a security decision — and deleting the shortcut is the whole point of the video.

> ⚠️ **What it usually gets wrong:** inventing a `/api/auth/login` path on top of the axios `baseURL` that already ends in `/api`, giving you `/api/api/auth/login` and a 404. Also watch for it storing the whole user object as the token.

<!--
TIME: 2 min
ENERGY: Honest. Own the shortcut rather than hiding it.
WHAT TO SAY: "The login endpoint has existed since Module 2, video sixteen. It hashes with bcrypt, it's rate limited, it's timing-attack resistant, and it returns a signed JWT — we built all of that and then never called it from the UI. That's the real lesson of this video, and it's a pattern you'll hit constantly in your career: the backend is finished, the frontend never caught up, and someone leaves a fake token in place to keep moving. It's fine to take that shortcut. It is not fine to forget it. I wrote a dated comment next to mine precisely so it couldn't hide."
DEMO: Run the prompt. Then write the two lines yourself — `localStorage.setItem`, and the delete of `DEV_TOKEN`.
TRANSITION: "Let's read it, then log in as two different people."
-->

---

# The Interceptor Was Ready All Along

```javascript
// client/src/lib/api.js — before
const DEV_TOKEN = "<YOUR_LOCAL_TEST_TOKEN>";        // ← TEMPORARY, delete me
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || DEV_TOKEN;   // ← the fallback
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// after — two deletions, nothing else changes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

> 💡 The interceptor already read `localStorage` first — the hardcoded value was only ever a fallback. Once login writes a real token, deleting `DEV_TOKEN` is a two-line change and every existing page keeps working untouched.

> ⚠️ `localStorage` is readable by any JavaScript on the page, so it's vulnerable to XSS. The stricter alternative is an `httpOnly` cookie — which brings CSRF back, which is exactly the trade-off we worked through in **Module 2, Video 18**. For a token-based SPA API this is the normal choice; know why you made it.

> ↩ **Recall PA1002 / PA1003 (Module 2)** — the login route, the bcrypt compare, and the signed JWT are all already built. This video writes zero server code.

<!--
TIME: 4 min
ENERGY: Clean payoff. Emphasise how little had to change.
WHAT TO SAY: "Look how small this is. The interceptor was always reading localStorage first and only falling back to the hardcoded value, so the moment a real login writes a real token, every page in the app is authenticating properly and I haven't touched a single one of them. That's not luck — that's what a shared axios instance buys you. If each component had called fetch directly, this would be a twelve-file change. And read the warning: localStorage is XSS-readable. We covered the cookie alternative and why it drags CSRF back in Module 2 video eighteen. You're allowed to make this trade-off. You're not allowed to make it accidentally."
DEMO: Delete `DEV_TOKEN`. Hard-refresh with an empty localStorage — everything 401s, which proves the fake token really was load-bearing. Log in. Everything works. Then log in as a second user and show completely different applications.
TRANSITION: "Real auth, real token. Now we can stream."
-->

---

# Checkpoint Check — Video 4.7

No QCTO checkpoint, same discipline. **All must be true.**

- [ ] `DEV_TOKEN` is **gone** from `lib/api.js` — and `grep -r DEV_TOKEN client/src` returns nothing
- [ ] With an empty `localStorage`, the app returns `401`s instead of silently working
- [ ] A wrong password renders the server's message, and does **not** navigate
- [ ] The token is stored under the key `token` — the same key the interceptor reads
- [ ] Two different accounts show two different application lists

> 🔎 Test it for real: log in, then in DevTools → Application → Local Storage, delete the `token` key and refresh. You should land back at a failing state, not a working app. If it still works, something else is still injecting a token.

<!--
TIME: 1.5 min
ENERGY: The empty-localStorage test is the honest one.
WHAT TO SAY: "The second line is the test that actually proves you did this. Clear localStorage and reload — if the app still cheerfully loads applications, then there's another hardcoded token somewhere, or the interceptor still has a fallback, and you haven't finished. I want you to see the app break. A broken app with an empty credential store is correct behaviour, and it's the only way to know the fake one is really gone."
DEMO: Clear localStorage, refresh, show the failure. Log in, show it work. Log in as user two, show different data.
TRANSITION: "Now we've got a real token, we can put it in a real streaming request."
-->

---
layout: section
---

<span class="pa-badge">PA1206</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.8

# Calling the API from the Client

#### ApplyIQ · React calls our endpoint with fetch — and streams the letter word-by-word

~8 min

<!--
🎥 VIDEO NAME: "M4.8 — Calling a Web API from the Client (PA1206)"
🎯 OBJECTIVE: By the end the student can call a web API from the client using fetch, map jQuery.ajax patterns to fetch, and stream an AI response into React state.
WHAT TO SAY: "QCTO references jQuery for calling web APIs because it was the standard for fifteen years. I'll show you jQuery so you recognise it in legacy code — then show why fetch replaced it, and use fetch to stream our cover letter live."
DEMO: Fill the form, click Generate, watch the right panel type the letter character by character.
COMMON QUESTION: "Do I need to learn jQuery?" — Recognise it; don't build new things with it. You'll meet it in old codebases.
TRANSITION: "We can call the API and stream it. Last step — make the whole thing properly RESTful."
TIME: 15s divider
-->

---

# The Prompt — Video 4.8

**You spec it. The AI scaffolds it. You still own PA1206.**

```text
Two files, one prompt.

SERVER — add POST /api/ai/cover-letter/stream to routes/ai.js. Same guards,
same schema, and the same ownership check as /cover-letter. Call the service
with stream: true, set Content-Type: text/event-stream, write each chunk's
delta text to the response as it arrives, and end the response when the
iterator finishes. Accumulate the chunks into a string as you go and call
repo.saveCoverLetter() once at the end — a streamed letter must still land
in the database.

CLIENT — create client/src/pages/CoverLetterPage.jsx and register it at
"/cover-letter" in router.jsx, inside the Layout children.
Build ONLY: the two-column layout, the five form inputs bound to one state
object, the Generate button with its disabled state, and the right-hand
panel that renders {streamedContent}.
Leave the submit handler as exactly this:
    // TODO: I write the fetch + stream reader myself

NOTE the exception: this page calls fetch directly, NOT the axios instance
in lib/api.js, because axios buffers the whole response and kills the
streaming effect. Add that exception to client/CLAUDE.md.
```

> ✍️ **You write this yourself:** the entire `handleSubmit` — `fetch`, `res.body.getReader()`, the `while` loop, `decoder.decode(value)`, and `setStreamedContent(prev => prev + chunk)`. PA1206 is "call a web API from the client". That loop *is* the checkpoint.

> ⚠️ **What it usually gets wrong:** reaching for `lib/api.js` anyway, because `client/CLAUDE.md` says always use axios — which is why the prompt names the exception out loud. And once you drop axios you also drop its interceptor, so `localStorage.getItem('token')` and the `Authorization` header are now your job. That token only exists because of **Video 4.7** — this is where that video pays off.

<!--
TIME: 2.5 min
ENERGY: Biggest prompt of the module — narrate both halves before pasting.
WHAT TO SAY: "Read the note at the bottom, because this is a rule I taught you in Module 3 and I'm now breaking on purpose. `client/CLAUDE.md` says never call fetch directly, always go through the axios instance — and that's right for ninety-nine percent of this app. But axios buffers: it waits for the whole response, then hands it to you. On a streaming endpoint that means you stare at a spinner for eight seconds and then the letter appears all at once. So we make an exception, we say it out loud in the prompt, and — this is the part people skip — we write the exception into the conventions file. An undocumented exception is just a bug waiting for the next person."
DEMO: Run the prompt. Show the generated page shell with the TODO still in it. Then write the reader loop yourself on camera, slowly.
TRANSITION: "Let's watch it stream — and check nothing's buffering."
-->

---

# jQuery.ajax() vs Fetch

QCTO references jQuery AJAX. Here it is beside the modern equivalent — same job, half the code, no library.

<div class="columns"><div>

**jQuery (QCTO reference)**

```javascript
// needs <script src="jquery.min.js">
$.ajax({
  url: '/api/applications',
  method: 'GET',
  headers: { Authorization: 'Bearer ' + token },
  success: function (data) {
    data.forEach(function (app) {
      $('#list').append('<li>' + app.companyName + '</li>')
    })
  },
  error: function (xhr) { alert(xhr.statusText) }
})
```

</div><div>

**Fetch (what we use)**

```javascript
// built into every browser, no library
const res = await fetch('/api/applications', {
  headers: { Authorization: `Bearer ${token}` }
})
const data = await res.json()
// React re-renders from state —
// no manual $().append()
```

</div></div>

| | jQuery.ajax() | Fetch |
|---|---|---|
| Dependency | external lib (~87KB) | built-in |
| Syntax | callbacks | promises / async-await |
| DOM updates | manual `$('#el').append()` | React via state |
| Streaming | ✗ not supported | ✓ ReadableStream |

> 💡 The decisive row is **streaming** — jQuery can't do it. That alone is why our AI endpoint uses fetch.

> 🔗 QCTO Bridge: QCTO's "call a web API from jQuery" checkpoint maps directly to `fetch` (or Axios, which wraps it). Same request — verb, URL, headers, body — different syntax. Know `$.ajax()` for legacy; write `fetch` for new work.

<!--
WHAT TO SAY: "Left: callbacks and manual DOM. Right: async/await, no library, React owns the DOM. The streaming row is the kicker — jQuery literally can't read a stream, and streaming is our whole UX."
COMMON QUESTION: "Should I switch everything to fetch?" — For streaming, yes. For regular REST, Axios is still nice for interceptors and cancellation. Right tool, right job.
TIME: 4 min
-->

---

# Streaming the Letter into React

`stream: true` on the server emits Server-Sent Events; fetch's `ReadableStream` reads each chunk as it arrives.

```
React form submit
  → POST /api/ai/cover-letter/stream
  → Express calls OpenAI with stream:true, pipes SSE chunks
  → fetch ReadableStream reads each chunk
  → setStreamedContent(prev => prev + chunk)
  → React re-renders → text "types itself"
```

```javascript
const res = await fetch('/api/ai/cover-letter/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
             Authorization: `Bearer ${token}` },
  body: JSON.stringify(form)
})
const reader = res.body.getReader()
const decoder = new TextDecoder()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  setStreamedContent(prev => prev + decoder.decode(value))
}
```

| State | Type | Purpose |
|---|---|---|
| streamedContent | string | accumulates AI text |
| generating | boolean | loading indicator |
| completed | boolean | shows Copy button |

> 💡 Each chunk appends to `streamedContent` and React re-renders — that's the ChatGPT "typing" effect, ~30 lines of code.

> ⚠️ Common mistake: using Axios for the stream. Axios buffers the whole response first, so the text arrives all at once — the streaming effect vanishes. Use native fetch.

<span class="pa-badge earned">PA1206 ✅</span>

<!--
WHAT TO SAY: "Follow the data: submit, POST, OpenAI streams, fetch reads chunks, state appends, React re-renders. Six steps and the text types itself. When you see this work for the first time, it hits different."
DEMO: Split-panel UI — form on the left, live streaming text with a blinking cursor on the right, Copy-to-Clipboard on completion. Run it live and let students react.
ENERGY: This is the WOW moment. Let your excitement show.
TIME: 4 min
-->

---

# Checkpoint Check — PA1206

Read the code against these. **Every one must be true before we move on.**

- [ ] The page uses native `fetch`, **not** `api.post` — and you added the exception line to `client/CLAUDE.md`
- [ ] `Authorization: Bearer ${token}` is on the request, read from `localStorage` — axios isn't adding it for you anymore
- [ ] The stream endpoint also saves the finished letter via `saveCoverLetter` (Video 4.6) — streaming to the screen is not the same as persisting
- [ ] The server sets `text/event-stream` and writes per chunk — not one `res.json` at the end
- [ ] `streamedContent`, `generating` and `completed` all exist and actually drive the UI
- [ ] The route is registered **inside** the Layout children, so the page keeps the sidebar
- [ ] The reader loop is yours — `getReader()`, `while`, `decode`, functional `setState`

> 🔎 Test it for real: the text must appear **progressively**. If it lands in one lump, something is buffering — check for axios, and check the server isn't collecting chunks into a string before responding.

<!--
TIME: 1.5 min
ENERGY: Catch the buffering bug on camera if it happens. It usually does.
WHAT TO SAY: "Line two is the one that fails silently for ten minutes. Everything in this app has gone through the axios instance, which quietly attaches your token to every request. The second you switch to raw fetch, that stops, and you get a 401 from an endpoint that worked perfectly five minutes ago — with no obvious reason why. And the test at the bottom is the honest one: if the letter appears all at once, you built a slower version of the endpoint you already had. Progressive text or it didn't work."
DEMO: Generate live. If it lumps, debug it on camera — check axios first, then the server's write loop.
TRANSITION: "It works end to end. Last video: is it actually a REST API, or just a pile of routes?"
-->

---
layout: section
---

<span class="pa-badge">PA1207</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS12</span>

## VIDEO 4.9

# REST Services Done Right

#### ApplyIQ · Status codes, resource URLs and consistent error shapes across every endpoint

~7 min

<!--
🎥 VIDEO NAME: "M4.9 — REST Services Done Right (PA1207)"
🎯 OBJECTIVE: By the end the student can design RESTful endpoints with correct verbs, resource URLs, status codes and a consistent error format, and map each status to a client-side UI action.
WHAT TO SAY: "REST is the convention that makes APIs predictable. Nouns for URLs, verbs for actions, status codes that tell the truth. Get this right and any developer can use your API without reading a manual."
DEMO: Walk the applications resource — GET list, POST create (201), GET one, PATCH, DELETE — showing each status code in Postman.
COMMON QUESTION: "Difference between 401 and 403?" — 401 = who are you (not logged in). 403 = I know you, but you can't do this.
TRANSITION: "That completes Module 4 — let's celebrate what we built."
TIME: 15s divider
-->

---

# The Prompt — Video 4.9

**You spec it. The AI audits it. You still own PA1207.**

```text
Audit only — change nothing.

Read every file in server/src/routes/, the controllers they use, plus
server/src/app.js and server/src/middleware/authenticateToken.js.

Produce one markdown table with a row per endpoint:

  METHOD | path | success status actually returned | failure statuses |
  error body shape

For every single row, cite the file and line number you read it from.
Report what the code ACTUALLY returns, not what REST convention says it
should — if a row already follows convention, say "correct" and move on.

Then list every place our API breaks REST convention: a verb in a URL,
a route that shouldn't be public at all, an inconsistent status code for
the same class of failure, or an error body whose shape differs.

If you cannot find a real line for a claim, write "not found" rather than
guessing. Do not fix anything — I am doing the fixes.
```

> ✍️ **You write this yourself:** every fix — deleting the leftover route, and deciding whether a bad token is a `401` or a `403`. Choosing the status code is PA1207. The audit is just a to-do list.

> ⚠️ **What it usually gets wrong:** reporting the status codes the *convention* says rather than the ones our code actually returns — a confident table describing an API you don't have. Ours already returns `201` and `204` correctly, so any row claiming otherwise is the model pattern-matching a tutorial instead of reading your file. That's exactly why the prompt demands a file and line per row.

<!--
TIME: 2 min
ENERGY: The habit-forming video. Slow, deliberate.
WHAT TO SAY: "This is the prompt shape I want you to leave the module with, and you'll use it for the rest of your career: audit, cite, don't fix. The model is genuinely good at reading twelve files and building a table — that's tedious for you and trivial for it. But an unfalsifiable claim is worthless, so I force every row to point at a line I can open. That one clause turns 'the API looks RESTful' into something I can check in five seconds. And it doesn't touch the code, because deciding what a status code should be is the assessment."
DEMO: Run it. Open three cited lines at random and confirm them. Find one that's wrong — there usually is one — and say so out loud.
TRANSITION: "Now we fix them, and we fix them ourselves."
-->

---

# Resources, Verbs & Status Codes

REST = **nouns in the URL, verbs as HTTP methods**. The status code tells WHAT happened; the body says WHY.

<div class="columns"><div>

```
GET    /api/applications      → list
POST   /api/applications      → create  (201)
GET    /api/applications/:id  → read one
PATCH  /api/applications/:id  → update
DELETE /api/applications/:id  → remove  (204)
```

</div><div>

| Code | Meaning | When ApplyIQ returns it |
|---|---|---|
| 200 | OK | GET / PATCH success |
| 201 | Created | POST success |
| 400 | Bad Request | Joi validation failed |
| 401 | Unauthorized | missing/expired JWT |
| 403 | Forbidden | wrong user (ownership) |
| 404 | Not Found | id doesn't exist |
| 429 | Too Many Requests | AI rate limit hit |
| 500 | Server Error | unhandled exception |

</div></div>

> 💡 A RESTful URL is a noun, never a verb. It's `POST /applications`, never `/createApplication` — the verb is already the HTTP method.

> 🔗 QCTO Bridge: QCTO's "web API to implement REST services" maps to ASP.NET's `[ApiController]` with `[HttpGet]`/`[HttpPost]` attributes and `Ok()`/`Created()`/`NotFound()` results. Our Express routes plus `res.status(201).json(...)` are the same REST contract.

<!--
WHAT TO SAY: "Memorise this table — every API you build uses these codes. 401 is 'no badge', 403 is 'badge, wrong floor', 429 is our AI protection firing. The URL is always a noun; the verb is the method."
TIME: 3 min
-->

---

# Consistent Errors, Mapped to the UI

Every endpoint returns the **same error shape**, so the frontend never has to guess.

```javascript
// 400 validation — array of field errors
{ "errors": [ { "field": "email", "message": "Must be a valid email" } ] }
// 401 auth — single string
{ "error": "Invalid credentials" }
// 500 server — generic, never leak stack traces
{ "error": "Internal Server Error" }
```

```javascript
// client maps each status to a UI action
const res = await fetch('/api/applications', { method: 'POST', /* ... */ })
if (res.ok)               { /* 2xx */ updateUI(await res.json()) }
else if (res.status === 400) setValidationErrors((await res.json()).errors)
else if (res.status === 401) logout()        // token expired → login
else                          setError('Something went wrong')
```

> 💡 Match status → UI action: 400 shows field errors, 401 logs out, 500 shows a generic message. This pattern works for every API call you'll ever write.

> ⚠️ Common mistake: leaking stack traces in 500 responses. That's a security hole — return a generic message and log the detail server-side only.

<span class="pa-badge earned">PA1207 ✅</span>

<!--
WHAT TO SAY: "A professional API answers errors in one predictable shape. Validation errors carry field + message; auth errors a single string; server errors stay generic. The client maps each code to one action. Consistency IS professionalism."
TIME: 3 min
-->

---

# Checkpoint Check — PA1207

Check the audit, then check your fixes. **Every one must be true before we move on.**

- [ ] Every row in the table cites a file and line **you personally opened**
- [ ] It confirmed `POST /api/applications` already returns **201** and `DELETE` already returns **204** — if the audit claims these are broken, it is guessing
- [ ] It found the leftover **`POST /api/test-validate`** route in `app.js` — you delete it live
- [ ] It flagged `authenticateToken` returning **403** for a bad token where every other auth failure returns **401**
- [ ] `400` bodies are `{ errors: [...] }`; every other error is `{ error: "..." }` — one shape each
- [ ] No `500` response leaks a stack trace — read `middleware/errorHandler.js` and confirm

> 🔎 Test it for real: hit every endpoint in Postman and write the status code down yourself. If your number and the audit's number disagree, the audit was guessing — and now you know to check the rest of it.

<!--
TIME: 2 min
ENERGY: Closing discipline. This is the habit that outlives the course.
⚠️ RECORDING NOTE — the status codes are ALREADY correct in the repo (201 on create, 204 on delete). Do not pretend to fix them. The audit coming back clean on those rows IS the lesson: you verified rather than assumed. The two genuine findings are the leftover `/api/test-validate` route and the 401/403 inconsistency — those are what you fix on camera.
WHAT TO SAY: "Line one is the only one that really matters. An AI audit you didn't verify is a rumour, and a rumour you paste into a report is your name on someone else's mistake. Now watch what happens on rows two and three. Two comes back clean — our status codes were already right, we did that properly back in Module 2, and I want you to see an audit find nothing, because that's the normal result and you should not go inventing work to feel productive. Row three is different. There's a route in app.js called slash-api-slash-test-validate that I added in Module 2 to demo the validator, and it has been sitting in our public API ever since. That's the real finding. And row four is the subtle one — a bad token returns 403 while every other auth failure returns 401. Both are defensible in isolation; being inconsistent is not."
DEMO: Run the audit. Open three cited lines at random. Confirm 201/204 are already right. Then delete `/api/test-validate` from `app.js` live, and change `authenticateToken`'s 403 to a 401. Re-run Postman.
TRANSITION: "That's Module 4. Let's look at what you built."
-->

---
layout: cover
---

# Module 4 Complete — ApplyIQ Is Now Intelligent

You built and consumed real web APIs, and shipped a streaming AI cover-letter generator that saves its work.

**Also closed:** the `DEV_TOKEN` shortcut is deleted, `LoginPage` is real, and the `CoverLetter` table designed in Module 2 finally has rows in it.

<span class="pa-badge earned">PA1201 ✅</span>
<span class="pa-badge earned">PA1202 ✅</span>
<span class="pa-badge earned">PA1203 ✅</span>
<span class="pa-badge earned">PA1204 ✅</span>
<span class="pa-badge earned">PA1205 ✅</span>
<span class="pa-badge earned">PA1206 ✅</span>
<span class="pa-badge earned">PA1207 ✅</span>

<div class="progress-bar mt-4"><div class="fill" style="width:100%"></div></div>

**Coming up — Module 5: Testing.** Prove it all works: mock OpenAI, unit-test the service, verify the stream — automatically, every time.

<!--
WHAT TO SAY: "Seven checkpoints, all earned. You can explain a web API, develop one, call OpenAI server-side without leaking a key, validate input, extract services, call from the client with fetch, stream word-by-word, and ship clean REST. Put this on your CV — when a recruiter asks about your AI experience, you have a real answer."
ENERGY: Proud, affirming. They built something genuinely impressive.
TRANSITION: "Next module: testing. How do you test code that calls OpenAI? You don't — you mock it. See you there."
TIME: 1 min
-->
