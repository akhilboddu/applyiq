---
theme: default
title: "ApplyIQ — Module 3: Building the React Frontend"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 3: Building the React Frontend

**From API to Interface — One PA, One Video**

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#61DAFB]" />
<div>
<div class="font-semibold">Akhil — Co-founder @ Zaio</div>
<div class="text-sm text-gray-400">27 Videos · 27 PA Checkpoints · Full Stack Complete</div>
</div>
</div>

<!-- Visual: dark background with subtle React atom graphic -->

<style src="./styles/zaio.css"></style>

<!--
WHAT TO SAY: "Welcome to Module 3. The API from Module 2 is running — now we build everything the user actually sees. This module is QCTO's Views, Forms, Look & Feel, and Client-side units, taught the React way. 27 videos, one QCTO checkpoint each, so you can name and find every recording instantly."
ENERGY: High — set the tone. This is the visual payoff of the whole course.
TIME: 1 min title card
TRANSITION: "Here's the full catalogue of what we're building."
-->

---

# Module 3 Map — 27 Videos, 27 Checkpoints

<div class="columns">
<div>

**PS04 · Views (React components)**
- 3.1 PA0401 — Create your first view
- 3.2 PA0404 — Add views to the app
- 3.3 PA0407 — A view that displays data
- 3.4 PA0405 — Add a partial view
- 3.5 PA0406 — Add a view component
- 3.6 PA0402 — HTML & tag helpers
- 3.7 PA0408 — Use tag helpers in a view
- 3.8 PA0403 — Reuse code in views
- 3.9 PA0409 — Reuse markup everywhere

**PS05 · Forms (UI)**
- 3.10 PA0502 — Working with forms
- 3.11 PA0505 — Capture & process input
- 3.12 PA0507 — Display & edit annotations

</div>
<div>

**PS07 · Look & Feel**
- 3.13 PA0701 — Consistent layout + links
- 3.14 PA0702 — Header & footer
- 3.15 PA0703 — CSS, styles & layouts
- 3.16 PA0704 — Interactive HTML elements
- 3.17 PA0705 — Use JS libraries

**PS08 · Client-side**
- 3.18 PA0801 — Apply styles
- 3.19 PA0807 — CSS Flexbox
- 3.20 PA0808 — CSS media queries
- 3.21 PA0802 — Responsive design
- 3.22 PA0810 — Display across screens
- 3.23 PA0806 — Bootstrap framework
- 3.24 PA0809 — CSS pre-processors
- 3.25 PA0803 — Task runners
- 3.26 PA0804 — Bundling & minification
- 3.27 PA0805 — Watcher task

</div>
</div>

<!--
WHAT TO SAY: "Here's the whole catalogue. Left side: Views and Forms — building and reusing React components, then wiring up forms. Right side: Look & Feel and Client-side — layout, styling, responsiveness, and the build tooling. Each row is one video named after its QCTO checkpoint."
ENERGY: Orientation — calm, give them the map.
TIME: 45 sec
TRANSITION: "Before the first component, let's place this module in the bigger build."
-->

---

# Where We Are: Building Back-to-Front

We're building ApplyIQ **back-to-front**, like a real product team:

<div class="text-center text-lg my-4">🧠 brain (M2) ✅ → 👀 face (M3) — building now → 🤖 intelligence (M4) → ✅ trust (M5) → 🚀 polish (M6) → 🌍 ship (M7)</div>

Module 3 is where the backend becomes visible:

- Every page we build calls **an endpoint we already wrote**
- No new backend code — M2's API is the contract, we're the client
- M5 tests **these components**; M6 polishes **these screens**; M7 ships them

> 💡 This is the first module where you see your own work. Everything on screen is powered by the controllers you wrote yourself.

<div class="text-sm opacity-60 mt-4">📍 You are here: M1 (plan + scaffold) ✅ · M2 (backend) ✅ · M3 (frontend) — building now · 49 / 101 checkpoints earned</div>

<!--
TIME: 45s
ENERGY: Zoom out. Give them the arc before the first line of JSX.
WHAT TO SAY: "Quick orientation. We build back-to-front, and the brain is done — Module 2 gave us a real API with a real database behind it. This module is the face. And here's what makes it different from every React tutorial you've watched: we're not faking the data. Every fetch you write hits an endpoint you personally built. When the list renders, those rows came out of your Postgres database, through your controller, through your repository."
TRANSITION: "So what exactly did we leave behind in Module 2? Thirty seconds of recap."
-->

---

# Quick Recap: What We Built in Module 2

The API this module talks to — all of it already running:

<div class="columns-2 mt-2">
<div>

### 🧠 The endpoints
- `GET /api/applications` — list
- `POST /api/applications` — create
- `GET /api/applications/:id` — one
- `PATCH` / `DELETE /api/applications/:id`
- `POST /api/auth/register` · `POST /api/auth/login`

</div>
<div>

### 🛠️ What's behind them
- Middleware pipeline, controllers, routes *(PA0201–PA0309)*
- Prisma models + migrations *(PA0501–PA0605)*
- Repository layer + Joi validation *(PA0607, PA0502)*
- Global error handler, Winston logging, JWT auth *(PA0901–PA1007)*

</div>
</div>

**37 checkpoints, one working backend.** In this module we do not touch `server/` — we consume it.

<!--
TIME: 45s
ENERGY: Fast recap. Do not re-teach — just remind and move.
WHAT TO SAY: "Thirty-second recap so nothing feels like it came from nowhere. We have five application endpoints and two auth endpoints. Behind them: middleware, controllers, Prisma models, a repository layer, Joi validation, a global error handler and JWT auth. That's thirty-seven checkpoints of backend. For the next twenty-seven videos I am not opening the server folder — if something breaks on the API side, it's a bug, not a lesson."
TRANSITION: "Everything we write now lives in one folder. Let's look at it."
-->

---

# Where Everything Lives: The `client/` Folder

```
client/
├── src/
│   ├── main.jsx            # entry — mounts React, provides the router
│   ├── router.jsx          # ← VIDEO 3.2: the route table
│   ├── index.css           # Tailwind entry (@import "tailwindcss")
│   ├── pages/              # ← views: DashboardPage, ApplicationsPage, KanbanPage
│   ├── components/
│   │   ├── ui/             # ← Button, Input, Badge, Card, StatCard
│   │   ├── layout/         # ← Layout, Sidebar, Header, Footer
│   │   └── applications/   # ← ApplicationCard, ApplicationForm, KanbanColumn
│   └── lib/api.js          # axios instance pointed at the M2 API
└── package.json            # react 19 · react-router 7 · tailwind 4 · recharts · axios
```

> ⚠️ **Tailwind 4 note:** there is no `tailwind.config.js` in this project and there shouldn't be. Tailwind 4 is configured from CSS — `@import "tailwindcss"` in `index.css`. If you've used Tailwind 3, this will look wrong. It isn't.

> 💡 Three component folders, one rule: if it mentions the word *application*, it doesn't belong in `ui/`.

<!--
TIME: 1 min
ENERGY: Practical. Point at the tree, name the folders you'll be creating.
WHAT TO SAY: "This is the whole map of what we're about to build. `pages/` holds views — one per route. `components/ui` holds pieces that know nothing about ApplyIQ: buttons, inputs, badges. `components/layout` is the shell — sidebar, header, footer. `components/applications` is the domain stuff. And `lib/api.js` is the axios instance already pointed at our Module 2 server, so every fetch in this module goes through one place."
DEMO: Open the client folder in VS Code and show the current state — mostly empty. Say it: "Almost none of this exists yet. We build it together."
TRANSITION: "One more thing before we build — how we're going to build it has changed."
-->

---

# How We Build From Here: Spec → Prompt → Read → Verify

In Module 2 you typed every line. From here, you **specify, read and verify** — because that's the job now.

<div class="columns-2 mt-2">
<div>

### The four beats, every video
1. **Spec** — say what you need and why
2. **Prompt** — paste the prompt on the slide
3. **Read** — walk the generated code line by line
4. **Check** — tick the checkpoint slide against it

</div>
<div>

### The two rules that make it work
- **Never prompt for the thing the checkpoint is about.** If PA0408 is "bind inputs to state", the AI writes the six fields — *you* write `value` and `onChange`.
- **Give it the rules first.** `client/CLAUDE.md` is read on every prompt. Without it you get Tailwind 3 syntax and invented endpoints.

</div>
</div>

> ⚠️ Generated code that runs is not the same as generated code that's right. Every video ends with a **Checkpoint Check** slide — that's not admin, that's the assessment.

> 💡 You will read more code this module than a student who hand-typed all of it. That's the trade.

<!--
TIME: 2 min
ENERGY: Important framing video. Be direct and a bit uncompromising — students will have opinions about this.
WHAT TO SAY: "Before the first component, I want to be straight with you about how this module works, because it's different from Module 2. There, you typed every line of middleware, and you should have — you cannot understand a request pipeline you've never built. This module is twenty-seven videos of React, and by the fourth component, typing it out teaches you nothing. So we're going to prompt for it. But here's the part that matters: I am not going to let you accept code you haven't read. Every video has two extra slides now — the exact prompt, so you can run what I ran, and a checkpoint check, which is four or five things that must be true before we move on. And there's one rule I'll repeat all module: never prompt for the thing the checkpoint is about. If QCTO is assessing whether you can bind an input to state, the AI does not get to write that line. It builds the scaffolding. You do the assessable part, and then you verify all of it."
DEMO: Open `client/CLAUDE.md` briefly. Show one prompt slide and one checkpoint slide so students know what's coming.
TRANSITION: "First view — and this one I'm typing by hand, because you can't check work whose shape you've never built."
-->

---
layout: section
---

# VIDEO 3.1

## Create Your First View
#### ApplyIQ · The DashboardPage component — our first screen

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — creating `client/src/pages/DashboardPage.jsx`.

<span class="pa-badge">PA0401</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "1. Create Your First View (PA0401)"
🎯 OBJECTIVE: By the end the student can create a React function component that returns JSX and render it as a page.
WHAT TO SAY: "In ASP.NET a view is a .cshtml file. In React, a view is a component — a function that returns JSX. Let's build our very first one: the DashboardPage."
DEMO: In VS Code create pages/DashboardPage.jsx, return a simple JSX heading, render it.
COMMON QUESTION: "Is a component the same as a page?" — "A page IS a component — just a top-level one that fills the screen. Smaller components nest inside it."
TRANSITION: "One view is nice. Next we register it so the app can show it."
TIME: 15s divider
-->

---

# The Prompt — Video 3.1

**You spec it. The AI scaffolds it. You still own PA0401.**

```text
Read client/CLAUDE.md. Confirm back to me, in one line each:
1. which React version and component style this project uses
2. where a page component goes
3. why there is no tailwind.config.js
```

> ✍️ **You write this yourself:** the whole component. Video 1 is hand-typed on purpose — you can't verify code whose shape you've never written.

> ⚠️ **What it usually gets wrong:** nothing yet. This prompt only asks it to read. If it offers to create `tailwind.config.js` here, your conventions file isn't being picked up — fix that before video 2.

<!--
TIME: 2 min
ENERGY: Set the ground rules. This is the contract for the next 26 videos.
WHAT TO SAY: "From here on we're going to build with AI, and I want to be honest about why. Typing out a React component teaches you almost nothing after the third one. Specifying it, reading it, and knowing when it's wrong — that's the actual job now. But an AI that doesn't know your project generates plausible garbage. So the first thing we do is give it the rules. This file, `client/CLAUDE.md`, gets read on every single prompt. Look at what's in it: the exact stack, the folder rules, our API contract, and a list of things it must never do. That last section matters most — 'never create tailwind.config.js' is in there because every model on earth will try, since Tailwind 3 needed one and Tailwind 4 doesn't."
DEMO: Open `client/CLAUDE.md`, scroll it top to bottom. Then run this prompt and read the three answers back. If any answer is wrong, the file isn't being loaded — show how you'd check.
TRANSITION: "It knows the project. This video I still type the component myself — you can't check work whose shape you've never built. From video 2 we start prompting."
-->


---

# A View Is Just a Function That Returns JSX

```jsx
// src/pages/DashboardPage.jsx
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Applications</h1>
      <p className="text-gray-400">Welcome back to ApplyIQ.</p>
    </div>
  );
}
```

> 💡 A React component is a function whose return value is the UI. Call the function, get a view.

> ⚠️ Common mistake: a component **must** return a single root element. Wrap siblings in a `<div>` or a `<>...</>` fragment.

> 🔗 QCTO Bridge: ASP.NET "Create views" means a `Dashboard.cshtml` Razor file under `/Views`. JSX is our Razor — same job (markup + data), but it lives in a `.jsx` function and ships to the browser.

<span class="pa-badge earned">PA0401 ✅</span>

<!--
TIME: 3 min
ENERGY: Hands-on. First line of frontend code in the whole course.
WHAT TO SAY: "A view in React isn't a file the server renders — it's a function. Takes no arguments, returns JSX, and whatever it returns is what the user sees. Create `client/src/pages/DashboardPage.jsx` and type this with me. `export default` so the router can import it in a second. And look at the wrapper `<div>` — that's the rule that trips everyone: a function can only return ONE thing, so two sibling elements need a wrapper, or an empty `<>...</>` fragment."
DEMO: Create the file, type the component, save. Nothing appears in the browser — say that out loud: "Nothing on screen, and that's correct. A view nobody routed to is a function nobody called."
TRANSITION: "So let's call it. Next video we register this view with the router."
-->

---

# Checkpoint Check — PA0401

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `DashboardPage.jsx` is in `src/pages/`, not `src/components/`
- [ ] It's a **function** that returns JSX — not a class, not a `.cshtml` file
- [ ] There's a `export default` so the router can import it
- [ ] Everything is wrapped in **one** root element

> 🔎 Video 1 you typed. So this check is quick — but do it anyway, because the ritual is the whole point.

<!--
TIME: 1 min
ENERGY: Establish the ritual. Slow and deliberate — this is the format for 26 more videos.
WHAT TO SAY: "Every video from here ends with this slide. Four things that must be true for the checkpoint to count. I read them out, we look at the actual code on screen, and we tick them off. This is not busywork — this is the checkpoint. QCTO doesn't ask whether you typed the code. It asks whether you can create a view and know that you did."
DEMO: Put the code and this slide side by side. Read each line, point at the code that satisfies it.
TRANSITION: "PA0401, earned and verified. Next video the AI starts writing — and we start checking harder."
-->


---
layout: section
---

# VIDEO 3.2

## Add Views to the App
#### ApplyIQ · Mapping every URL to a view with React Router

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — creating `client/src/router.jsx` and wiring it into `main.jsx`.

<span class="pa-badge">PA0404</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "2. Add Views to the App (PA0404)"
🎯 OBJECTIVE: By the end the student can register views in a React Router route tree so each URL renders the right component.
WHAT TO SAY: "Creating a view isn't enough — the app needs to know when to show it. In ASP.NET the routing table maps URLs to views. In React, the router does it."
DEMO: Create router config, navigate to /, /applications, /kanban and show each view rendering.
COMMON QUESTION: "Where does the URL come from?" — "React Router reads the browser URL and renders the matching element. No server roundtrip."
TRANSITION: "Now let's make a view actually show real data from the API."
TIME: 15s divider
-->

---

# The Prompt — Video 3.2

**You spec it. The AI scaffolds it. You still own PA0404.**

```text
Create src/router.jsx with createBrowserRouter.

Routes:
- "/" renders <Layout /> with children:
  - index route -> DashboardPage
  - "applications" -> ApplicationsPage
  - "kanban" -> KanbanPage
- "/login" -> LoginPage, NOT inside Layout

Then update src/main.jsx to use <RouterProvider router={router} />.
Import the pages from src/pages/. Assume Layout does not exist yet — leave the import.
```

> ✍️ **You write this yourself:** the route *shape* — which route is `index: true`, and the decision to put `/login` outside the Layout children. That structural call is the checkpoint; the file boilerplate isn't.

> ⚠️ **What it usually gets wrong:** nesting `/login` inside `children` so the login screen inherits the sidebar, and reaching for `<BrowserRouter>` + `<Routes>` (React Router 6 style) instead of `createBrowserRouter`.

<!--
TIME: 2 min
ENERGY: First real prompt. Narrate the spec before you paste it.
WHAT TO SAY: "Notice what I specified and what I didn't. I gave it the route tree — that's the part I have to own, because deciding what nests inside the layout IS the checkpoint. I did not tell it the import syntax, or how RouterProvider works, because that's boilerplate and boilerplate is exactly what you delegate. And read the last line: I told it Layout doesn't exist yet. If you don't say that, it'll helpfully invent a Layout component and now you've got a file you didn't ask for."
DEMO: Paste the prompt, let it generate. Before scrolling, say what you expect to see.
TRANSITION: "Let's read what it gave us."
-->


---

# The Route Tree: Every URL Mapped to a View

```jsx
// src/router.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,            // shared shell (sidebar + header)
    children: [
      { index: true,            element: <DashboardPage /> },
      { path: 'applications',   element: <ApplicationsPage /> },
      { path: 'kanban',         element: <KanbanPage /> },
    ],
  },
  { path: '/login',    element: <LoginPage /> },     // ↩ Recall PA1001 — Module 2
]);
```

| URL | View shown |
|---|---|
| `/` | DashboardPage |
| `/applications` | ApplicationsPage |
| `/kanban` | KanbanPage |

> 💡 The route tree is your app's sitemap in code — one entry per view.

> 🔗 QCTO Bridge: ASP.NET "Add views to the app" + routing table (`MapControllerRoute`) → here `createBrowserRouter` is the routing table, and each `element` is a registered view.

<span class="pa-badge earned">PA0404 ✅</span>

<!--
TIME: 4 min
ENERGY: The payoff moment — URLs start working.
WHAT TO SAY: "This is the routing table, and notice it's just data — an array of objects, no magic. The parent route renders `<Layout />`, and every child renders inside it. `index: true` means 'this is what shows at the parent's own path', so that's our `/`. And watch where `/login` sits — outside the children, at the top level, because the login screen shouldn't have a sidebar wrapped around it."
DEMO: Create `src/router.jsx`, then in `main.jsx` swap `<App />` for `<RouterProvider router={router} />`. Type each URL in the address bar and watch the right view appear. Then click back and forward — no page flash.
TRANSITION: "Our views render, but everything on them is hardcoded text. Time to plug in the API we spent all of Module 2 building."
-->

---

# Checkpoint Check — PA0404

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `createBrowserRouter`, **not** `<BrowserRouter>` + `<Routes>`
- [ ] `/login` is a **top-level** route — not inside `children`
- [ ] The dashboard child uses `index: true`, not `path: "/"`
- [ ] `main.jsx` renders `<RouterProvider router={router} />`
- [ ] It did **not** invent a `Layout.jsx`

> 🔎 Test it for real: type `/kanban` in the address bar, then click back. If the whole page flashes white, routing isn't actually wired.

<!--
TIME: 1.5 min
ENERGY: First time you catch something. Enjoy it.
WHAT TO SAY: "Now we check. Line two is the one that catches people — if `/login` ended up in the children array, the login screen renders inside the app shell with a sidebar for a user who isn't logged in yet. The app still runs. Nothing errors. It's just wrong, and only reading it catches that. This is why we don't just accept and move on."
DEMO: Walk each line against the generated file. If `/login` is nested — and it often is — fix it live and say why.
TRANSITION: "Routes work, but every page is hardcoded text. Time to call our own API."
-->


---
layout: section
---

# VIDEO 3.3

## A View That Displays Data
#### ApplyIQ · Rendering the list of applications from the API

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — building `client/src/pages/ApplicationsPage.jsx` against the Module 2 API.

<span class="pa-badge">PA0407</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "3. A View That Displays Data (PA0407)"
🎯 OBJECTIVE: By the end the student can fetch data and render a list in a view using state and .map().
WHAT TO SAY: "A view that shows static text is boring. Real views display data. We fetch applications from the Module 2 API and map them into cards."
DEMO: useEffect fetch, useState store, .map() render. Show the list populate in the browser.
COMMON QUESTION: "Why does my list not update?" — "State must change via setState. Mutating the array directly won't re-render."
TRANSITION: "That view repeats one card layout. Next we extract it into a partial."
TIME: 15s divider
-->

---

# The Prompt — Video 3.3

**You spec it. The AI scaffolds it. You still own PA0407.**

```text
Create src/pages/ApplicationsPage.jsx.

It should:
- import the shared axios instance from src/lib/api.js
- useState for an applications array
- useEffect that GETs /applications once on mount and stores the result
- render each application in a simple card: company, jobTitle, status, location

Also create src/lib/api.js — an axios instance with baseURL http://localhost:5000/api.

Leave the .map() body as a TODO comment. I'll write that part.
```

> ✍️ **You write this yourself:** the `.map()` and the `key`. Rendering a collection is literally what PA0407 assesses — don't hand that away.

> ⚠️ **What it usually gets wrong:** omitting `key`, or putting the `key` on an inner element instead of the outermost one the map returns. It also loves adding a `.then()` chain instead of `async/await`.

<!--
TIME: 2 min
ENERGY: The full-stack handshake. Make this feel like a milestone.
WHAT TO SAY: "This is where the two halves of the course meet — that `/applications` call hits the controller you wrote in Module 2, running against your Postgres database. Now look at the last line of the prompt: I asked it to leave the `.map()` as a TODO. That's deliberate and it's the rule for the whole module — never prompt for the thing the checkpoint is about. PA0407 is 'display model data in a view'. If the AI writes the map, I haven't demonstrated anything. It builds the plumbing; I render the data."
DEMO: Run the prompt, then write the `.map()` yourself on camera. Start both servers, load `/applications`, show real rows from your own database. Open the Network tab.
TRANSITION: "Read the generated fetch code — there's a detail worth catching."
-->


---

# Fetch State, Then Map It Into the View

```jsx
function ApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications').then(res => setApps(res.data));
  }, []);                                   // run once on mount

  return (
    <div className="grid gap-3">
      {apps.map(app => (
        <div key={app.id} className="p-4 bg-slate-800 rounded-lg">
          <h3 className="font-semibold">{app.company}</h3>
          <p className="text-gray-400">{app.jobTitle}</p>
        </div>
      ))}
    </div>
  );
}
```

> 💡 `{apps.map(...)}` is how a view loops — JSX renders an array of elements directly.

> ⚠️ Common mistake: forgetting the `key` prop. Without a stable `key`, React can't track list items and re-renders break.

> 🔗 QCTO Bridge: ASP.NET "View to display data" uses `@foreach (var app in Model)` in Razor. Our `.map()` is that loop; `app.company` is `@app.Company`.

<span class="pa-badge earned">PA0407 ✅</span>

<!--
TIME: 5 min
ENERGY: This is the full-stack handshake — make it feel like a milestone.
WHAT TO SAY: "This is the moment the two halves of the course meet. That `api.get('/applications')` hits the exact controller we wrote in Module 2. Three pieces: `useState` holds the data, `useEffect` fetches it once when the component mounts — that's what the empty dependency array means — and `.map()` turns the array into JSX. And every item in a `.map()` needs a `key`. React uses it to tell rows apart between renders; leave it off and React will warn you and eventually render the wrong thing in the wrong place."
DEMO: Start the API server, then the Vite dev server. Load `/applications` and show the real rows from Postgres appearing. Then open the Network tab and show the actual request going to `localhost:5000/api/applications`.
TRANSITION: "That card markup is sitting inside a loop. Any time markup lives inside a loop, it's begging to become its own component."
-->

---

# Checkpoint Check — PA0407

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `useEffect` has an **empty dependency array** — otherwise it refetches forever
- [ ] It uses `api` from `lib/api.js`, not raw `axios` or `fetch`
- [ ] `async/await`, not a `.then()` chain
- [ ] **You** wrote the `.map()`, and `key` is on the outermost element
- [ ] Rows on screen match rows in Postgres

> 🔎 Delete the dependency array on purpose and watch the Network tab flood with requests. Put it back. That's the bug you'll ship one day if you don't know this.

<!--
TIME: 2 min
ENERGY: The infinite-loop demo is the highlight of this video. Do it.
WHAT TO SAY: "Check one is the big one. An empty dependency array means 'run this once when the component mounts'. Leave it off entirely and the effect runs after every render — and since the effect sets state, and setting state causes a render, you've built an infinite loop that hammers your own API. Let me show you."
DEMO: Remove `[]`, save, open Network, watch requests pile up. Restore it. Then verify the rows against Postgres or Postman so students see it's genuinely their data.
TRANSITION: "That card markup is trapped inside a loop. Anything inside a loop wants to be its own component."
-->


---
layout: section
---

# VIDEO 3.4

## Add a Partial View
#### ApplyIQ · Extracting the ApplicationCard component

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — extracting `client/src/components/applications/ApplicationCard.jsx`.

<span class="pa-badge">PA0405</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "4. Add a Partial View (PA0405)"
🎯 OBJECTIVE: By the end the student can extract repeated markup into a child component and pass data to it via props.
WHAT TO SAY: "That card markup inside the .map() is a partial view waiting to happen. In ASP.NET you'd make a partial _ApplicationCard.cshtml. In React you make an ApplicationCard component."
DEMO: Cut the card JSX into ApplicationCard.jsx, accept an app prop, render it from the list.
COMMON QUESTION: "What are props?" — "Props are the parameters of a component — like the model you pass to a partial."
TRANSITION: "A partial renders markup. A view component can also hold logic — that's next."
TIME: 15s divider
-->

---

# The Prompt — Video 3.4

**You spec it. The AI scaffolds it. You still own PA0405.**

```text
Here is the card JSX currently inside the .map() in ApplicationsPage.jsx:

<PASTE THE JSX HERE>

Extract it into src/components/applications/ApplicationCard.jsx as a component
that takes a single `app` prop. Then show me the updated .map() in
ApplicationsPage.jsx that uses it.

Do not change any markup or class names.
```

> ✍️ **You write this yourself:** the prop boundary — deciding that the card takes one `app` object rather than eight separate props. And you decide where `key` lands after the extraction.

> ⚠️ **What it usually gets wrong:** moving the `key` inside `ApplicationCard`, which silently breaks list reconciliation. It also likes to 'improve' your Tailwind classes while it's in there — that's why the prompt forbids it.

<!--
TIME: 2 min
ENERGY: Refactor rhythm. The constraint at the end of the prompt is the lesson.
WHAT TO SAY: "A partial view in ASP.NET is a chunk of markup you pull out and reuse. Same idea here. But read the last line of my prompt: 'do not change any markup or class names.' That constraint is doing real work. Left to itself the model will tidy your classes, rename things, restructure the div — and now you can't tell whether the refactor broke something or the redesign did. When you prompt a refactor, pin everything that isn't the refactor."
DEMO: Copy the JSX out of the map, paste into the prompt, generate. Diff the markup — it should be identical.
TRANSITION: "Read it, then check where the key ended up."
-->


---

# A Partial = A Small Component You Pass Data To

<div class="columns">
<div>

**Before — inline markup**
```jsx
{apps.map(app => (
  <div key={app.id} className="p-4 ...">
    <h3>{app.company}</h3>
    <p>{app.jobTitle}</p>
  </div>
))}
```

</div>
<div>

**After — extracted partial**
```jsx
// ApplicationCard.jsx
function ApplicationCard({ app }) {
  return (
    <div className="p-4 ...">
      <h3>{app.company}</h3>
      <p>{app.jobTitle}</p>
    </div>
  );
}
// usage:
{apps.map(app =>
  <ApplicationCard key={app.id} app={app} />)}
```

</div>
</div>

> 💡 Props are how a parent passes data into a partial — same idea as a partial's model.

> 🔗 QCTO Bridge: ASP.NET "Add a partial view" → `@Html.Partial("_ApplicationCard", app)`. Our `<ApplicationCard app={app} />` is exactly that — markup reused with a passed-in model.

<span class="pa-badge earned">PA0405 ✅</span>

<!--
TIME: 4 min
ENERGY: Refactor rhythm — cut, paste, prove nothing broke.
WHAT TO SAY: "Left side is what we just wrote. Right side is the same markup, lifted into its own file. The only new idea is props: `{ app }` is the data the parent hands down. That's it — props are function arguments with a nicer syntax. Notice the `key` stays on the OUTSIDE, on `<ApplicationCard>`, not inside the card — the key belongs to the thing in the list, not to the thing the component renders."
DEMO: Cut the card JSX out of the `.map()`, paste it into `ApplicationCard.jsx`, import it back, save. The page looks pixel-identical — that's the whole point of a refactor.
TRANSITION: "That card only displays what it's given. Next: a component that actually thinks for itself."
-->

---

# Checkpoint Check — PA0405

Read the generated code against these. **Every one must be true before we move on.**

- [ ] The component takes **one** `app` prop, not eight scattered ones
- [ ] `key` is on `<ApplicationCard>` in the parent — **not** inside the card
- [ ] Markup and class names are byte-identical to before
- [ ] The page looks pixel-identical after the refactor

> 🔎 A refactor that changes what's on screen isn't a refactor. If it looks different, something got 'improved' — find it.

<!--
TIME: 1.5 min
ENERGY: The key placement is the trap. Slow down on it.
WHAT TO SAY: "Check two catches the most common AI mistake in this whole module. The key belongs to the item in the list — to `<ApplicationCard>` in the parent's map. If it got moved inside the card component, React can no longer tell rows apart, and the day you add sorting or deletion you'll watch the wrong row disappear. React won't warn you. It'll just be wrong."
DEMO: Look at both files. If the key moved, fix it live and explain the failure it would have caused.
TRANSITION: "That card displays what it's given. Next: a component that thinks for itself."
-->


---
layout: section
---

# VIDEO 3.5

## Add a View Component
#### ApplyIQ · A self-contained StatCard with its own logic

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — building `client/src/components/ui/StatCard.jsx`.

<span class="pa-badge">PA0406</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "5. Add a View Component (PA0406)"
🎯 OBJECTIVE: By the end the student can build a self-contained component that holds its own logic, not just markup.
WHAT TO SAY: "A partial is mostly markup. A view component does work — formats data, computes a trend, decides its own colour. We build a StatCard that takes a number and presents it."
DEMO: Build StatCard that formats value and shows an up/down arrow based on a trend prop.
COMMON QUESTION: "Partial vs view component — what's the real difference?" — "A partial just displays passed data. A view component encapsulates logic too."
TRANSITION: "Now let's connect data to inputs — HTML and tag helpers."
TIME: 15s divider
-->

---

# The Prompt — Video 3.5

**You spec it. The AI scaffolds it. You still own PA0406.**

```text
Create src/components/ui/StatCard.jsx.

Props: label (string), value (number), trend (number, can be negative).

Render: the label, the value formatted with toLocaleString(), and a trend
indicator underneath.

Leave the trend colour and arrow logic as a TODO — I'll write that.
```

> ✍️ **You write this yourself:** the logic: green vs red from the sign of `trend`, and picking the up or down arrow. That decision-making is what separates a *view component* from a dumb card, and it's what PA0406 assesses.

> ⚠️ **What it usually gets wrong:** putting the trend logic inline in the JSX as a nested ternary you can't read. Also watch for it deciding StatCard belongs in `components/applications/` — it doesn't, it knows nothing about applications.

<!--
TIME: 2 min
ENERGY: Draw the distinction hard — students get examined on this.
WHAT TO SAY: "Last video the card displayed what it was handed. This one does work: it formats the number, it decides a colour, it picks an arrow. That's the difference between a partial view and a view component, and QCTO does ask you to tell them apart. So again — I let it write the markup and the formatting, and I keep the logic. The logic IS the checkpoint."
DEMO: Generate, then write the trend logic yourself. Render StatCard four times on the dashboard with different trend values.
TRANSITION: "Let's read what it put where."
-->


---

# A View Component Carries Its Own Logic

```jsx
function StatCard({ label, value, trend }) {
  const positive = trend >= 0;                       // its own decision
  return (
    <div className="p-5 bg-slate-800 rounded-xl">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
      <span className={positive ? 'text-green-400' : 'text-red-400'}>
        {positive ? '▲' : '▼'} {Math.abs(trend)}%
      </span>
    </div>
  );
}
```

> 💡 A view component is reusable AND smart — it encapsulates presentation logic, so callers just pass raw data.

> 🔗 QCTO Bridge: ASP.NET "Add a view component" = a `ViewComponent` class with an `Invoke()` method that runs logic and returns a partial. Our function component IS that — logic + markup in one unit.

<span class="pa-badge earned">PA0406 ✅</span>

<!--
TIME: 4 min
ENERGY: Draw the distinction clearly — this is the slide students get examined on.
WHAT TO SAY: "Here's the difference from the last video. `ApplicationCard` displayed what it was given. `StatCard` does work: it formats the number with `toLocaleString`, it decides green or red from the sign of `trend`, it picks an up or down arrow. The caller passes raw data and stays dumb — all the presentation logic lives in here. That's a view component."
DEMO: Build StatCard, then render it four times on the dashboard with different trend values — show one green with an up arrow, one red with a down arrow, from the same component.
TRANSITION: "Components can display data. Now let's make them capture it — starting with how React binds an input."
-->

---

# Checkpoint Check — PA0406

Read the generated code against these. **Every one must be true before we move on.**

- [ ] It's in `components/ui/` — StatCard knows nothing about job applications
- [ ] `toLocaleString()` on the value, so 1200 renders as 1,200
- [ ] **You** wrote the colour and arrow logic
- [ ] One negative trend and one positive trend render differently on screen

> 🔎 If StatCard landed in `components/applications/`, your conventions file was ignored — check why before video 6.

<!--
TIME: 1.5 min
ENERGY: Folder discipline moment.
WHAT TO SAY: "Check one is a folder question and it matters more than it looks. StatCard takes a label, a number and a trend. It has no idea what a job application is. That makes it a `ui/` component — reusable in any project. The moment you let domain knowledge leak into `ui/`, you've got a component library that only works for one app."
DEMO: Point at the folder. Render four StatCards with different trends and show green-up and red-down from the same component.
TRANSITION: "It's a good component. But right now nobody can see it — let's fix that."
-->


---
layout: section
---

# VIDEO 3.6

## HTML & Tag Helpers
#### ApplyIQ · Binding data to inputs the React way

Duration: ~7 min

> 🎤 **SLIDES ONLY** — concept mapping — ASP.NET tag helpers vs JSX bindings. No code changes.

<span class="pa-badge">PA0402</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "6. HTML & Tag Helpers (PA0402)"
🎯 OBJECTIVE: By the end the student can two-way bind an input to state using value + onChange.
WHAT TO SAY: "QCTO calls them tag helpers. We call them JSX bindings. asp-for binds an input to a model property — in React, value plus onChange does the same job."
DEMO: Controlled input bound to formData.email; type and watch state update live in React DevTools.
COMMON QUESTION: "Will I be tested on ASP.NET syntax?" — "Recognise it and explain the mapping. You write React."
TRANSITION: "We can bind. Next we use those helpers inside a real view."
TIME: 15s divider
-->

---

# Tag Helpers vs JSX: Same Job, Different Syntax

<div class="columns">
<div>

**ASP.NET Tag Helpers**
```html
<form asp-action="Register"
      asp-controller="Auth">
  <input asp-for="Email" />
  <span asp-validation-for="Email"></span>
  <button type="submit">Register</button>
</form>
```

</div>
<div>

**React JSX (what we use)**
```jsx
<form onSubmit={handleSubmit}>
  <input
    value={formData.email}
    onChange={e => setFormData({
      ...formData, email: e.target.value
    })} />
  {errors.email && <span>{errors.email}</span>}
  <button type="submit">Register</button>
</form>
```

</div>
</div>

| ASP.NET tag helper | React JSX equivalent |
|---|---|
| `asp-for="Email"` | `value={...} onChange={...}` |
| `asp-action` / `asp-controller` | `onSubmit={handleSubmit}` + API call |
| `asp-validation-for` | `{errors.email && <span>...</span>}` |

> 💡 A "controlled input" = state is the single source of truth; the input only reflects it.

> 🔗 QCTO Bridge: ASP.NET "HTML helpers & tag helpers" bind data to elements with server attributes. JSX binds with JavaScript expressions — same competency: connect data to the view.

<span class="pa-badge earned">PA0402 ✅</span>

<!--
TIME: 4 min
ENERGY: Calm and comparative. This is a translation slide, not a build slide.
WHAT TO SAY: "QCTO's wording is 'HTML helpers and tag helpers'. That's the ASP.NET name for connecting data to a form element. Look at the left column: `asp-for=\"Email\"` binds that input to the Email property on the model — the server generates the name, the id, the validation hooks. Now the right column: `value` plus `onChange`. Same competency, different runtime. The state is the single source of truth, the input just reflects it, and every keystroke writes back to state. That's what 'controlled input' means, and it's the phrase to use in the exam."
DEMO: No file changes. Walk the table row by row — `asp-for` → `value`/`onChange`, `asp-action` → `onSubmit`, `asp-validation-for` → conditional error span.
TRANSITION: "That's one input. Next video we wire six of them into a real form."
-->

---
layout: section
---

# VIDEO 3.7

## Use Tag Helpers in a View
#### ApplyIQ · The full ApplicationForm with bound fields

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — building `client/src/components/applications/ApplicationForm.jsx`.

<span class="pa-badge">PA0408</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "7. Use Tag Helpers in a View (PA0408)"
🎯 OBJECTIVE: By the end the student can assemble multiple bound inputs into one working form view.
WHAT TO SAY: "Now we put the helpers to work inside a real view. The ApplicationForm has six fields, each a controlled input, all driven by one formData object."
DEMO: Build ApplicationForm, bind all six fields to one state object, log formData on change.
COMMON QUESTION: "Do I need a useState per field?" — "No — one object with a generic handleChange scales better."
TRANSITION: "Forms repeat markup. Next: reuse code across views."
TIME: 15s divider
-->

---

# The Prompt — Video 3.7

**You spec it. The AI scaffolds it. You still own PA0408.**

```text
Create src/components/applications/ApplicationForm.jsx.

A form with six fields: company, jobTitle, status (select), salary (number),
location, appliedAt (date).

Use a single `form` state object and give every input a `name` attribute
matching its key.

Leave the value/onChange bindings and the handleChange function as TODOs —
I'll write those.
```

> ✍️ **You write this yourself:** `handleChange` with the computed key `[e.target.name]`, and the `value`/`onChange` pair on each input. Binding inputs to state is exactly what PA0408 is; delegating it would be delegating the checkpoint.

> ⚠️ **What it usually gets wrong:** forgetting `name` on one input — usually the `<select>`. With a generic handler that field silently stops working and there is no error message.

<!--
TIME: 2 min
ENERGY: Steady. The `name` attribute becoming load-bearing is the thing to land.
WHAT TO SAY: "Six fields, and I'm writing exactly one handler. But that only works if every input carries a `name` that matches its key in state, which is why I put that requirement in the prompt explicitly — it's the kind of thing a model drops on the select element. And then I keep the binding for myself: `value` plus `onChange` is the entire concept of a controlled input, and it's the checkpoint."
DEMO: Generate the markup, then write `handleChange` on camera. Log `form` on every keystroke so students watch one object fill up.
TRANSITION: "Read the six inputs carefully — count the name attributes."
-->


---

# One State Object, One Generic Handler, Many Bound Inputs

```jsx
function ApplicationForm() {
  const [form, setForm] = useState({ company: '', jobTitle: '', status: 'Applied' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });   // generic binder

  return (
    <form onSubmit={handleSubmit}>
      <input name="company"  value={form.company}  onChange={handleChange} />
      <input name="jobTitle" value={form.jobTitle} onChange={handleChange} />
      <select name="status"  value={form.status}   onChange={handleChange}>
        <option>Applied</option><option>Interview</option><option>Offer</option>
      </select>
    </form>
  );
}
```

> 💡 `[e.target.name]` lets one handler update any field — the input's `name` selects the key.

> ⚠️ Common mistake: forgetting `name` on the input — then the generic handler writes to `undefined` and the field freezes.

> 🔗 QCTO Bridge: ASP.NET "Use HTML/tag helpers in a view" wires many `asp-for` inputs to one model. Our `form` object IS that model; `name` maps each input to a model property.

<span class="pa-badge earned">PA0408 ✅</span>

<!--
TIME: 5 min
ENERGY: Steady build. The generic-handler trick is the thing to land.
WHAT TO SAY: "Six fields, and I'm not writing six handlers. Watch `handleChange`: `[e.target.name]` is a computed key — it reads the `name` attribute off whichever input fired, and uses that as the object key. One handler, any number of fields. Which means the `name` attribute is now load-bearing: forget it on an input and you'll write to a key called `undefined` and that field will look frozen. That's the number-one bug in this video."
DEMO: Build the form, log `form` on every change, and type into each field so students see the one object filling up. Then delete a `name` attribute on purpose, show the field freeze, put it back.
TRANSITION: "Our form works, but look at all these near-identical status spans on the list page. Let's kill that duplication."
-->

---

# Checkpoint Check — PA0408

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **All six** inputs have a `name` — including the `<select>`
- [ ] Each `name` exactly matches its key in the `form` state object
- [ ] **You** wrote `handleChange` with `[e.target.name]` as a computed key
- [ ] Typing in every field updates state — check all six, not just the first

> 🔎 Delete one `name` attribute on purpose. That field freezes, nothing errors, nothing logs. That's why you check all six.

<!--
TIME: 2 min
ENERGY: The frozen-field demo sells this. Do it slowly.
WHAT TO SAY: "Check one says all six, and I mean count them. Here's why: with a generic handler, a missing `name` means `e.target.name` is undefined, so you write to a key called 'undefined' and that input never updates. No error. No console warning. The field just doesn't type. Students lose an hour to this — so let me break it on purpose."
DEMO: Remove `name` from the select, save, try to change it, show it stuck. Put it back.
TRANSITION: "Form captures input. Now let's kill the duplicated status markup on the list page."
-->


---
layout: section
---

# VIDEO 3.8

## Reuse Code in Views
#### ApplyIQ · A Badge component, six statuses, zero duplication

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — building `client/src/components/ui/Badge.jsx`.

<span class="pa-badge">PA0403</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "8. Reuse Code in Views (PA0403)"
🎯 OBJECTIVE: By the end the student can build one reusable component that adapts via props instead of copy-pasting markup.
WHAT TO SAY: "We have six application statuses. Without reuse you'd write six coloured spans. Instead, one Badge component reads the status and looks up its colour."
DEMO: Build Badge, render all six variants, add a new status to the map and watch it appear.
COMMON QUESTION: "Isn't this what Material UI does?" — "Exactly — we're building our own mini version so you understand it."
TRANSITION: "Reuse inside one file is good. Next: reuse the same markup across many locations."
TIME: 15s divider
-->

---

# The Prompt — Video 3.8

**You spec it. The AI scaffolds it. You still own PA0403.**

```text
Create src/components/ui/Badge.jsx.

It takes a `status` prop, one of: saved, applied, screening, interview,
offer, rejected. Each renders a pill with different Tailwind colours.

Leave the status-to-classes lookup object empty — I'll fill it in.
```

> ✍️ **You write this yourself:** the lookup map. Replacing repetition with a data structure is the reusability idea PA0403 assesses; if the model fills the map, you've demonstrated nothing.

> ⚠️ **What it usually gets wrong:** writing a six-branch `if/else` or a chain of ternaries instead of a lookup object. Both work. Only one of them is the lesson.

<!--
TIME: 2 min
ENERGY: Punchy and quick.
WHAT TO SAY: "Watch what I asked for: an empty lookup object. Because if I just say 'make a badge with six statuses', I'll get a six-branch if-else, and it'll work perfectly, and the whole point of the video evaporates. The lesson is that variation belongs in data, not in duplicated markup. So I specify the shape of the solution, not just the outcome."
DEMO: Generate, then fill the map yourself.
TRANSITION: "Read it — and if it gave you an if-else anyway, we're fixing that on camera."
-->


---

# One Component, Six Status Colours, Zero Duplication

```jsx
const statusColors = {
  Applied:   'bg-blue-500/20 text-blue-400',
  Screening: 'bg-yellow-500/20 text-yellow-400',
  Interview: 'bg-purple-500/20 text-purple-400',
  Offer:     'bg-green-500/20 text-green-400',
  Rejected:  'bg-red-500/20 text-red-400',
  Technical: 'bg-indigo-500/20 text-indigo-400',
};

function Badge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
      {status}
    </span>
  );
}
```

> 💡 Drive variation with a lookup map, not copy-paste. New status? One line in the map.

> 🔗 QCTO Bridge: ASP.NET "Reuse code in views" via partials and `@helper` methods. Our reusable function component is the same instinct — write the markup once, call it everywhere.

<span class="pa-badge earned">PA0403 ✅</span>

<!--
TIME: 4 min
ENERGY: Punchy. The lookup-map idea is small and lands fast.
WHAT TO SAY: "Six statuses, six colours. The naive version is six copies of a span with a different class. Instead: one object that maps status to classes, and one component that looks it up. The variation lives in data, not in duplicated markup. Add a seventh status later and you add one line to the map — you don't touch the component at all."
DEMO: Build Badge, render all six statuses in a row, then add a seventh entry to the map and show it render without touching the component.
TRANSITION: "Badge, Button, StatCard — these belong together. Let's give them a home."
-->

---

# Checkpoint Check — PA0403

Read the generated code against these. **Every one must be true before we move on.**

- [ ] The variation lives in a **lookup object**, not in `if`/`else` or ternaries
- [ ] It's in `components/ui/` — a badge is generic
- [ ] **You** wrote the six status-to-class entries
- [ ] Adding a seventh status means adding **one line**, with no change to the component

> 🔎 Actually add a seventh status live. If you have to touch the component body, the abstraction failed.

<!--
TIME: 1.5 min
ENERGY: Prove it with the seventh status.
WHAT TO SAY: "Check four is the real test and it takes ten seconds. If the design is right, a new status is one new line in the map and the component doesn't move. If you find yourself editing JSX to add a colour, you didn't build a lookup — you built a switch statement wearing a costume."
DEMO: Add a seventh entry, render it, show the component file untouched.
TRANSITION: "Before we build one more component — let's make sure the last two are actually on screen."
-->


---
layout: section
---

# VIDEO 3.8b

## Wire It Up: No Orphans on the Dashboard

#### ApplyIQ · Rendering what we built, and proving it works

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — populating `client/src/pages/DashboardPage.jsx` with `StatCard`, deleting the dead `App.jsx`, and testing the form end to end.

<span class="pa-badge earned">PA0406 ✅</span> <span class="pa-badge earned">PA0403 ✅</span> <span class="pa-badge earned">PA0408 ✅</span>

<!--
🎥 VIDEO NAME: "8b. Wire It Up — No Orphans on the Dashboard"
🎯 OBJECTIVE: By the end the student can render every component they have built on a route they can open, and verify a form round-trip survives a browser refresh.
WHAT TO SAY: "Pause. We have built a StatCard, a Badge, an ApplicationCard and a form. If you have had localhost open on the root URL this whole time, you have seen roughly none of it. That is not a bug — that is routing. And it is the single most common way people fool themselves with AI-generated code: it compiles, the import resolves, so you assume it works. Compiling and working are two different claims and only one of them is assessable. So this video we render everything and we prove it."
DEMO: Open `/` → stub. Open `/applications` → form + cards + badges. Then build the dashboard, delete App.jsx, run the five-step form test.
TRANSITION: "Everything is on screen. Now let's organise it."
TIME: 15s divider
-->

---

# The Prompt — Video 3.8b

**You spec it. The AI scaffolds it. You still own the verification.**

```text
Two changes in client/src.

1. Rewrite src/pages/DashboardPage.jsx. It currently returns a two-line
   stub. Import StatCard from ../components/ui/StatCard.jsx and render
   four of them: Applied 1200 trend 12, Screening 38 trend 4,
   Interview 9 trend -6, Offers 2 trend 0. Hardcode these numbers —
   do NOT add a fetch, we wire real data in a later video.
   Leave the grid className as a TODO comment — I'll write it.

2. Delete src/App.jsx and src/App.css. main.jsx renders router.jsx,
   so App.jsx is imported by nothing.

Do not create any other files. Do not add an index.js barrel.
```

> ⚠️ **Two guards in that prompt.** "Hardcode these numbers" stops it inventing a `useEffect` you didn't ask for. "Do not create any other files" stops it adding a `DashboardStats` wrapper you'll have to maintain.

<!--
TIME: 2 min
ENERGY: Brisk. The prompt is short; the guards are the lesson.
WHAT TO SAY: "Look at what I am refusing to let it do. I said hardcode the numbers, because if I don't, it will helpfully add a fetch and a loading state and a useEffect, and now I am reviewing forty lines when I asked for eight. And I said do not create other files, because models love inventing a wrapper component nobody asked for. Every unrequested file is a file you now own. The TODO on the grid className is mine because that class string is PA0802 in video twenty-one — I am not letting it take that."
DEMO: Paste the prompt. Let it run on camera.
TRANSITION: "Let's read what came back."
-->

---

# Read It: The Dashboard Stops Being a Stub

```jsx
// src/pages/DashboardPage.jsx
import StatCard from "../components/ui/StatCard.jsx";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Applications</h1>

      <div className="mt-6 grid gap-4 grid-cols-1">   {/* ← you write this; 3.21 makes it responsive */}
        <StatCard label="Applied"   value={1200} trend={12} />
        <StatCard label="Screening" value={38}   trend={4} />
        <StatCard label="Interview" value={9}    trend={-6} />
        <StatCard label="Offers"    value={2}    trend={0} />
      </div>
    </div>
  );
}
```

> 💡 Four calls, one component. `1200` renders as **1,200** because `StatCard` owns `toLocaleString()`. Interview is **red ▼** because it owns the trend logic. The caller stays dumb — that's what made it a *view component* back in 3.5.

<!--
TIME: 3 min
ENERGY: Satisfying. First time the app looks like a product.
WHAT TO SAY: "Read the prop names against StatCard — label, value, trend. If the AI had written title here it would render undefined and you would get a blank line, not an error. That is why you read. And now watch the payoff: one component, four calls, four different outputs. Twelve hundred came back with a comma. Interview is red because minus six. I did not have to tell you the component works — you can see it works."
DEMO: Save. Open `/`. Four cards appear. Point at the comma in 1,200 and the red arrow on Interview. Flip Interview's trend to +6, watch it go green, flip it back.
COMMON QUESTION: "Why hardcode?" — "Because today's checkpoint is the component, not the fetch. Real data lands in 3.17."
TRANSITION: "Dashboard is live. Now let's prove the form."
-->

---

# Prove the Primitives — Every Variant, On Screen

**Paste this at the bottom of `DashboardPage.jsx`. Look at it. Then delete it.**

```jsx
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";

// TEMP — a throwaway gallery. Delete before you commit.
<div className="mt-10 space-y-4 border-t border-gray-700 pt-6">
  <div className="flex flex-wrap gap-2">
    {["Saved","Applied","Screening","Interview","Offer","Rejected","Technical"]
      .map((s) => <Badge key={s} status={s} />)}
    <Badge status="Banana" />        {/* ← unknown status: no colour, no crash */}
  </div>

  <div className="flex flex-wrap gap-3">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button disabled>Disabled</Button>
    <Button onClick={() => alert("clicked")}>Click me</Button>
  </div>
</div>
```

> 🔎 **What you're looking for:** seven differently-coloured badges, `Banana` rendering plain (that's the `?? ""` fallback working), three differently-coloured buttons, one greyed-out at 50% opacity that won't click, and one that fires.

<!--
TIME: 3 min
ENERGY: Fast and visual. This is the "oh, they're real" moment.
WHAT TO SAY: "You cannot review a component you have never seen. So here is the cheapest trick in frontend work — a throwaway gallery. Render every variant side by side, look at it for ten seconds, delete it. Watch the Banana badge: I passed a status that is not in the lookup object, and it renders as plain text instead of crashing, because we wrote the nullish fallback. That is a design decision you can now defend. And the disabled button — that styling came from a single Tailwind modifier, disabled colon opacity fifty, not from an if statement."
DEMO: Paste the block. Save. Show all seven badges + Banana. Show three button variants. Click the disabled one — nothing. Click the last one — alert. Then delete the block and save.
COMMON QUESTION: "Should I keep this in the app?" — "No. Delete it. In a real team this becomes a Storybook story; for now, ten seconds and it's gone."
TRANSITION: "Primitives work. Now the form."
-->

---

# Test the Form — The Round-Trip That Proves It

**Six inputs, one POST, one card. Do all five on camera.**

<div class="columns-2 mt-2">
<div>

1. **Bind** — type in all six fields, watch `form` update in React DevTools
2. **Select** — choose `Interview`, confirm state changes (selects are the one people forget)
3. **Submit** — click *Add application*. The page must **not** reload
4. **Render** — a new card appears with a **purple Interview badge**
5. **Refresh the browser** — the card is still there

</div>
<div>

### Why step 5 is the whole point
Steps 1–4 pass even if the data never left React state.

A refresh wipes state. If the card survives, it went `form → api.post → Express → Prisma → Postgres` and came back.

That's Module 2 and Module 3 shaking hands.

</div>
</div>

> 🔎 **Break it on purpose:** delete `name="location"` from that input. Type in it — the field freezes. No error, no console warning. Put it back. That's PA0408's fourth check earned, not assumed.

<!--
TIME: 4 min
ENERGY: This is the payoff of the whole section. Let the refresh land.
WHAT TO SAY: "Five steps, and the first four lie to you. If I type into the form, hit submit, and a card appears — that could be pure React state. It might never have touched the backend. So step five: refresh the browser. Refresh throws away every piece of React state we have. If that card is still sitting there afterwards, then it went from our form, through axios, to the Express route we wrote in Module 2, through the repository, into Postgres, and came back on load. That refresh is the moment two modules become one application."
DEMO: Fill all six fields. Show React DevTools state updating. Submit. Card appears, no reload. Hard-refresh — card persists. Then delete the location `name` attribute and show the frozen field.
COMMON QUESTION: "Why did my submit reload the page?" — "You lost preventDefault. That is PA0502 in video 3.10 and we go deep on it."
TRANSITION: "Everything renders. Let's check the whole board."
-->

---

# Checkpoint Check — Video 3.8b

Open the browser, not the editor. **Every one must be true before you move on.**

- [ ] **`/`** shows four StatCards — `1,200` has a comma, Interview is **red ▼**
- [ ] The gallery showed **7 coloured badges + an uncoloured `Banana`**, and **3 button variants + one disabled**
- [ ] The gallery block is **deleted** again
- [ ] **`/applications`** shows the form and the cards, each with a coloured Badge
- [ ] Submitting the form adds a card **without a page reload**
- [ ] That card **survives a browser refresh** — it's in Postgres, not just state
- [ ] `src/App.jsx` is **gone**, and the app still runs

> 🔎 The rule from here on: **a component that isn't rendered isn't built — it's a file.** Every video we finish, the thing we made is on a route you can open.

> ⚠️ `lib/api.js` sends a hardcoded `DEV_TOKEN` because `/api/applications` sits behind `authenticateToken`. **If every request 401s, the token expired** — mint a fresh one before recording, or you'll be debugging JWT on camera during a React lesson.

<!--
TIME: 2 min
ENERGY: Firm. This is the rule that stops the whole class shipping invisible code.
WHAT TO SAY: "Five checks and every one of them happens in the browser, not the editor. That is the difference between this module and Module 2. In Module 2 the proof was that you typed it. Here the proof is that you can see it. So hold this rule for the next nineteen videos: a component that is not rendered is not built, it is a file. If we finish a video and the thing we made is not on a route you can open, we are not finished."
DEMO: Walk `/` then `/applications`, tick each box live.
TRANSITION: "Badge, Button, StatCard — these belong together. Let's give them a home."
-->


---
layout: section
---

# VIDEO 3.9

## Reuse Markup Everywhere
#### ApplyIQ · A UI primitives folder — Button, Badge, StatCard

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — creating the `client/src/components/ui/` folder and `Button.jsx`.

<span class="pa-badge">PA0409</span> <span class="text-sm text-gray-400">QCTO PS04 · Views</span>

<!--
🎥 VIDEO NAME: "9. Reuse Markup Everywhere (PA0409)"
🎯 OBJECTIVE: By the end the student can organise shared UI primitives into a components/ui folder used across all views.
WHAT TO SAY: "The deepest reuse is a primitives library. Button, Badge, StatCard — built once in components/ui, imported by every page. This is the bottom of the component pyramid that saves 80% of your styling time."
DEMO: Build Button with variant prop, import it into two different pages.
COMMON QUESTION: "How many folders do I really need?" — "Start with ui, layout, and domain. It scales; refactoring later hurts."
TRANSITION: "Components done. Now we make forms actually capture and process input."
TIME: 15s divider
-->

---

# The Prompt — Video 3.9

**You spec it. The AI scaffolds it. You still own PA0409.**

```text
Create src/components/ui/Button.jsx.

Props: variant ("primary" | "secondary" | "danger"), children, and it should
spread any remaining props onto the <button>.

Use the same lookup-object pattern as Badge.jsx for the variant classes.

Do not put it anywhere except src/components/ui/.
```

> ✍️ **You write this yourself:** the folder decision for every component we've built — which ones are `ui/`, which are `applications/`. Organising the library is the checkpoint, not the Button itself.

> ⚠️ **What it usually gets wrong:** 'helpfully' also creating an `index.js` barrel file you didn't ask for, and spreading props *before* `className` so your variant classes get overwritten by the caller.

<!--
TIME: 2 min
ENERGY: Architectural. Zoom out to the tree.
WHAT TO SAY: "Notice I told it to reuse the pattern from Badge. That's a habit worth building — pointing the model at your own existing code keeps a codebase consistent in a way that generic prompts never will. And the last line is a guard: models love to create barrel files and index exports nobody asked for. Every unrequested file is a file you now have to maintain."
DEMO: Generate Button, then walk the whole `components/` tree and justify each file's folder out loud.
TRANSITION: "Let's check the shape of the library, not just the button."
-->


---

# Build the Bottom of the Pyramid Once

```
src/components/
├── ui/          # Button, Badge, StatCard      ← reused EVERYWHERE
├── layout/      # Layout  (Sidebar 3.13, Header/Footer 3.14)
└── applications/# ApplicationCard, ApplicationForm
```

```jsx
// components/ui/Button.jsx — one Button, many looks
const variantStyles = {
  primary:   'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
  danger:    'bg-red-600 text-white hover:bg-red-500',
};
export default function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
      disabled:opacity-50 ${variantStyles[variant] ?? ''}`} {...props}>
      {children}
    </button>
  );
}
```

> 💡 If you ever style the same button twice, you've missed a reuse opportunity.

> 🔗 QCTO Bridge: ASP.NET "Reuse markup in multiple locations" via shared partials and layout sections. Our `components/ui` folder is the shared-partials library, imported wherever needed.

<span class="pa-badge earned">PA0409 ✅</span>

<!--
TIME: 4 min
ENERGY: Architectural. Zoom out to the folder tree.
WHAT TO SAY: "Three folders and that's the whole system. `ui/` is anything that knows nothing about ApplyIQ — Button, Input, Badge, Card. `layout/` is the shell. `applications/` is domain-specific — a card that knows what a job application is. The test is simple: if the component mentions the word 'application', it doesn't belong in `ui/`. Get this split right now, because moving files later means fixing every import."
DEMO: Create the folder structure, build `Button.jsx` with a `variant` prop, then import the same Button into two different pages to prove it's shared.
TRANSITION: "Components are done — that's the whole Views unit. Let's take stock."
-->

---

# Checkpoint Check — PA0409

Read the generated code against these. **Every one must be true before we move on.**

- [ ] `Button.jsx` is in `ui/`, and so are `Badge.jsx` and `StatCard.jsx`
- [ ] `Layout.jsx` is in `layout/` — Sidebar, Header and Footer join it in 3.13–3.14
- [ ] `ApplicationCard` and `ApplicationForm` are in `applications/`, not `ui/`
- [ ] It did **not** create an `index.js` barrel file you didn't ask for
- [ ] **The Button is on screen** — swap the form's submit to `variant="danger"`, watch it go red, put it back

> 🔎 Run the test out loud on every component: does its name or its props mention an application? Then it's not `ui/`.

<!--
TIME: 2 min
ENERGY: Close the Views unit. Survey the whole tree.
WHAT TO SAY: "This check is about the library, not the button. Nine videos in, you've got maybe eight components — this is the moment the split is cheap to fix. Move a file next module and you're chasing imports across twenty files."
DEMO: Show the full tree. Import Button into two pages to prove it's genuinely shared.
TRANSITION: "That's the Views unit done — let's take stock."
-->


---

# Views & Components — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0401** — Created a view
- ✅ **PA0402** — Used HTML/tag helper equivalents
- ✅ **PA0403** — Reused a component
- ✅ **PA0404** — Added views to the app
- ✅ **PA0405** — Passed data via props

</div>

<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0406** — Built a view component
- ✅ **PA0407** — Displayed model data in a view
- ✅ **PA0408** — Bound inputs to state
- ✅ **PA0409** — Organised a component library

</div>

<div class="text-sm opacity-60 mt-8">58 checkpoints down · Next section: Forms & User Input</div>

<!--
TIME: 20s
ENERGY: Satisfied checkpoint moment. Pause on the badge grid.
WHAT TO SAY: "That's the entire Views unit — nine checkpoints. You can create a view, route to it, break it into reusable components, pass data down with props, and organise the whole thing into a component library. The UI renders real data from our own API. What it can't do yet is send anything back."
TRANSITION: "So next: forms. Capture, validate, submit."
-->

---
layout: section
---

# VIDEO 3.10

## Working With Forms
#### ApplyIQ · Submitting the ApplicationForm to the API

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — wiring `handleSubmit` in `ApplicationForm.jsx` to POST to the API.

<span class="pa-badge">PA0502</span> <span class="text-sm text-gray-400">QCTO PS05 · Forms (UI)</span>

<!--
🎥 VIDEO NAME: "10. Working With Forms (PA0502)"
🎯 OBJECTIVE: By the end the student can handle a form submit, prevent the default reload, and POST to the API.
WHAT TO SAY: "A form's job is to collect data and send it. The key React move: preventDefault so the browser doesn't reload, then POST the state to the API."
DEMO: Wire onSubmit, call api.post('/applications', form), watch the new row appear.
COMMON QUESTION: "Why does my page reload on submit?" — "You forgot e.preventDefault(). HTML forms reload by default."
TRANSITION: "Submitting is half of it. Next: capturing and validating that input."
TIME: 15s divider
-->

---

# The Prompt — Video 3.10

**You spec it. The AI scaffolds it. You still own PA0502.**

```text
In src/components/applications/ApplicationForm.jsx, add an onSubmit handler.

It should POST the form state to /applications using the shared api instance,
then call an onCreated(newRecord) prop so the parent can add the row.

Leave the first line of the handler blank with a TODO comment — I'll write it.
```

> ✍️ **You write this yourself:** `e.preventDefault()`. It's one line, it's the entire difference between an SPA and a 1999 web form, and it's what this checkpoint is about.

> ⚠️ **What it usually gets wrong:** quietly including `preventDefault` anyway despite the TODO, or wrapping the whole thing in a `try/catch` that swallows the error so a failed POST looks like a success.

<!--
TIME: 2 min
ENERGY: Data flows outward now. Second full-stack moment.
WHAT TO SAY: "One line I'm keeping for myself, and it's the smallest one in the file. A form's default behaviour is to serialise itself and reload the page. That was correct in 1999 and it's correct in an ASP.NET post-back. In a single-page app it destroys your state, your router and your session. So `preventDefault` is the whole video, and I'm not letting a model type it for me."
DEMO: Generate, write `preventDefault` yourself, submit a real application, verify it landed in Postgres.
TRANSITION: "Read the handler — and check whether it swallowed the errors."
-->


---

# Handle Submit, Stop the Reload, Send the Data

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();                         // ⬅ stop the full-page reload
  const { data } = await api.post('/applications', form);
  onCreated(data);                            // tell the parent a row was added
};
```

```
User clicks Submit
   └─ e.preventDefault()  → no reload
   └─ api.post(...)        → server saves
   └─ onCreated(newRow)    → UI updates
```

> 💡 In an SPA, the form never navigates — JavaScript owns the submit and the API call.

> ⚠️ Common mistake: leaving off `preventDefault()` — the page reloads, your state resets, and the POST looks like it "did nothing."

> 🔗 QCTO Bridge: ASP.NET "Working with forms" posts to a controller action (`[HttpPost]`). Our `api.post` hits that action; `onSubmit` replaces the form's server post-back.

<span class="pa-badge earned">PA0502 ✅</span>

<!--
TIME: 4 min
ENERGY: Full-stack again — data flows out this time, not in.
WHAT TO SAY: "One line matters more than the rest: `e.preventDefault()`. An HTML form's default behaviour is to serialise itself and reload the page. That was fine in 1999 and in ASP.NET post-backs. In a single-page app it destroys everything you've built — your state, your router, your whole session. So we stop it, and send the data ourselves with `api.post`. Then `onCreated` tells the parent to add the row, so the list updates without a refetch."
DEMO: Wire `onSubmit`, submit a real application, watch the row appear in the list AND check Postgres or Postman to prove it actually persisted. Then comment out `preventDefault` and show the full-page reload wiping everything — put it straight back.
TRANSITION: "We're sending whatever the user typed straight to the server. That's optimistic. Let's check it first."
-->

---

# Checkpoint Check — PA0502

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** wrote `e.preventDefault()` as the first line
- [ ] It POSTs through `api`, not raw `axios`
- [ ] `onCreated` fires so the parent updates without a refetch
- [ ] No `try/catch` that silently swallows a failed request
- [ ] The new row exists in Postgres, not just on screen

> 🔎 Comment out `preventDefault` and submit. The full-page reload wipes everything — that's the bug this line prevents. Put it back.

<!--
TIME: 2 min
ENERGY: The reload demo is unmissable. Do it.
WHAT TO SAY: "Check four is one people miss. Models love a defensive try/catch, and a catch block that just logs means a failed POST looks exactly like a successful one — the form clears, nothing appears, and you have no idea why. If it added one, either surface the error to the user or take it out."
DEMO: Comment out `preventDefault`, submit, watch the page reload and the state vanish. Restore. Then check Postgres for the real row.
TRANSITION: "We're sending whatever the user typed. Let's check it first."
-->


---
layout: section
---

# VIDEO 3.11

## Capture & Process Input
#### ApplyIQ · Client-side validation before the API call

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — adding a `validate()` function and error state to `ApplicationForm.jsx`.

<span class="pa-badge">PA0505</span> <span class="text-sm text-gray-400">QCTO PS05 · Forms (UI)</span>

<!--
🎥 VIDEO NAME: "11. Capture & Process Input (PA0505)"
🎯 OBJECTIVE: By the end the student can validate form input client-side and block submission on errors.
WHAT TO SAY: "Capturing input means validating it. We check required fields and formats before the API call, give instant feedback, and only POST when it's clean."
DEMO: Submit empty form → show inline errors; fix fields → submit succeeds.
COMMON QUESTION: "If I validate on the client, do I still need the server to validate?" — "Always. Client is for speed, server is for security."
TRANSITION: "We process input. Next: display and edit it from data annotations."
TIME: 15s divider
-->

---

# The Prompt — Video 3.11

**You spec it. The AI scaffolds it. You still own PA0505.**

```text
In ApplicationForm.jsx, add an `errors` state object and render each field's
error message underneath its input in red.

Add a validate(data) function that returns an errors object, but leave its
body empty — I'll write the rules.

In handleSubmit, call validate, setErrors, and bail before the API call if
there are any errors.
```

> ✍️ **You write this yourself:** the `validate()` rules themselves — which fields are required, what a valid salary is. Deciding what 'valid' means is the checkpoint; rendering a red `<p>` is not.

> ⚠️ **What it usually gets wrong:** returning on the **first** error instead of collecting all of them, so the user fixes one field at a time. Same mistake `abortEarly: false` fixes on the Joi side in Module 2.

<!--
TIME: 2 min
ENERGY: Hard callback to Module 2. This is deliberately the mirror image.
WHAT TO SAY: "You've written this before. Module 2, video 8 — Joi schemas rejecting bad input on the server, with `abortEarly: false` so you get every error at once, not just the first. Identical pattern here, other side of the wire. And to be absolutely clear: this does not replace the server validation. Client validation is for speed. Server validation is for security, because anyone can open Postman and skip this code entirely."
DEMO: Generate the error rendering, write the rules yourself, submit an empty form and show every error at once.
TRANSITION: "Read it — check whether it bails early."
-->


---

# Validate First, Then Process

```jsx
const validate = (data) => {
  const errors = {};
  if (!data.company)          errors.company  = 'Company is required';
  if (!data.jobTitle)         errors.jobTitle = 'Job title is required';
  if (data.salary && data.salary < 0) errors.salary = 'Salary must be positive';
  return errors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate(form);
  setErrors(errs);
  if (Object.keys(errs).length) return;       // stop — don't hit the API
  await api.post('/applications', form);
};
```

> 💡 Validate, set errors, bail early — only clean input reaches the API.

> ⚠️ Common mistake: trusting client validation alone. A user can bypass it — the server (↩ Recall PA0508 — Module 2) is the real gate.

> 🔗 QCTO Bridge: ASP.NET "Forms — capturing & processing input" uses `ModelState.IsValid` in the action. Our `validate()` + early return is the client-side mirror of that check.

<span class="pa-badge earned">PA0505 ✅</span>

<!--
TIME: 5 min
ENERGY: Call back hard to Module 2 — this is deliberately the mirror image.
WHAT TO SAY: "You've written this before. In Module 2, video 8, we built Joi schemas that rejected bad input on the server. This is the same idea on the client, and the pattern is identical: collect every error, don't stop at the first one, then bail before you do any work. `setErrors` so the UI can render them, then `if (Object.keys(errs).length) return` — that's the guard clause that stops us hitting the API at all. And to be clear: this does NOT replace the server validation. Client validation is for speed — instant feedback, no round trip. Server validation is for security, because anyone can open Postman and skip this code entirely."
DEMO: Submit an empty form — show the errors render inline and the Network tab staying silent, no request fired. Fill it in correctly, submit, watch the request go. Then hit the same endpoint from Postman with bad data and show Joi rejecting it — proving why you need both.
TRANSITION: "Our errors are hardcoded strings. Let's drive labels and rules from one config instead."
-->

---

# Checkpoint Check — PA0505

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** wrote the validation rules
- [ ] `validate` collects **all** errors — it doesn't return on the first one
- [ ] `if (Object.keys(errs).length) return` fires **before** the API call
- [ ] An empty submit shows errors and the Network tab stays **silent**
- [ ] The same bad data still gets rejected by Joi via Postman

> 🔎 The Network tab is the real check. If a request fires on an invalid form, the guard clause is in the wrong place.

<!--
TIME: 2 min
ENERGY: The silent Network tab is the proof. Point at it.
WHAT TO SAY: "Check four is how you actually verify this, not by looking at the code. Submit empty, and watch the Network tab do nothing. If a request goes out, the validation ran but the guard didn't stop anything — which is a real bug I've seen ship. And check five is the one I care about most: hit the same endpoint from Postman with garbage and watch Joi reject it. That's why you need both layers."
DEMO: Empty submit → errors, no request. Fill in → request fires. Then Postman with bad data → 400 from Joi.
TRANSITION: "Our labels are hardcoded. Let's drive them from config instead."
-->


---
layout: section
---

# VIDEO 3.12

## Display & Edit From Annotations
#### ApplyIQ · One form for create AND edit, errors rendered inline

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — refactoring `ApplicationForm.jsx` to render from a `fields` config array.

<span class="pa-badge">PA0507</span> <span class="text-sm text-gray-400">QCTO PS05 · Forms (UI)</span>

<!--
🎥 VIDEO NAME: "12. Display & Edit From Annotations (PA0507)"
🎯 OBJECTIVE: By the end the student can reuse one form for create and edit and render field errors from the model's rules.
WHAT TO SAY: "ASP.NET reads data annotations like [Required] and [Display] to auto-build labels and validation messages. In React we pass the same metadata as a fields config and render labels + errors from it."
DEMO: Open the form pre-filled with an existing record (edit), then blank (create) — same component.
COMMON QUESTION: "Two forms for create and edit?" — "No. One form, initialised with different values."
TRANSITION: "Forms done. Now the look and feel — consistent layout across every view."
TIME: 15s divider
-->

---

# The Prompt — Video 3.12

**You spec it. The AI scaffolds it. You still own PA0507.**

```text
Refactor ApplicationForm.jsx to render its inputs by mapping over a `fields`
config array instead of hardcoding six blocks of JSX.

Each field entry should carry: name, label, type, required.

The component should also accept an `initialValues` prop so the same form
works for create (empty) and edit (pre-filled).

Leave the fields array empty — I'll define it.
```

> ✍️ **You write this yourself:** the `fields` array. That config is this project's answer to ASP.NET data annotations, and defining it is the checkpoint.

> ⚠️ **What it usually gets wrong:** splitting create and edit into two components. If you see `ApplicationEditForm.jsx` appear, reject it — one component, different initial values.

<!--
TIME: 2 min
ENERGY: The 'one form, two jobs' reveal.
WHAT TO SAY: "In ASP.NET, `[Required]` and `[Display(Name=...)]` sit on the model, and tag helpers read them to build labels and messages for free. React has no attributes on a model, so we're explicit: one array describing every field. And notice I asked for `initialValues` in the same breath — because once the form is config-driven, create and edit stop being two components. Blank values means create. Pre-filled means edit."
DEMO: Generate, define the fields array yourself, then open the form blank and pre-filled from a real record.
TRANSITION: "Check that it didn't build you two forms."
-->


---

# Drive Labels & Errors From a Field Config

```jsx
const fields = [
  { name: 'company',  label: 'Company',   required: true },
  { name: 'jobTitle', label: 'Job Title', required: true },
  { name: 'salary',   label: 'Salary',    type: 'number' },
];

<Input
  label={f.label}                    // ← from the "annotation"
  value={form[f.name]}
  onChange={handleChange}
  error={errors[f.name]}             // ← validation message rendered inline
/>
```

> 💡 One `fields` array describes the form's labels and rules — the same config powers create and edit.

> 🔗 QCTO Bridge: ASP.NET "Display & edit data annotations" — `[Required]`, `[Display(Name=...)]`, `asp-validation-for` auto-render labels/errors. Our `fields` config + `error` prop is the hand-rolled equivalent of those annotations.

<span class="pa-badge earned">PA0507 ✅</span>

<!--
TIME: 4 min
ENERGY: The 'one form, two jobs' reveal.
WHAT TO SAY: "In ASP.NET, `[Required]` and `[Display(Name=...)]` sit on the model, and the tag helpers read them to build labels and error messages for free. React has no attributes on a model, so we do it explicitly: one `fields` array that describes each field's label and rules, and we map over it. Same benefit — the form's shape lives in one place. And because the form is driven by config and initial values, the same component handles create AND edit. Blank initial values means create. Pre-filled means edit. One component, not two."
DEMO: Render the form from the config, then open it once blank (create) and once pre-filled from an existing record (edit) — same component both times.
TRANSITION: "Forms are done. Now let's stop every page reinventing its own shell."
-->

---

# Checkpoint Check — PA0507

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** defined the `fields` array
- [ ] The JSX maps over `fields` — there are no six hardcoded blocks left
- [ ] One component handles create **and** edit via `initialValues`
- [ ] It did **not** create a separate edit-form component
- [ ] Adding a seventh field means one new array entry

> 🔎 Open the form twice on camera — once blank, once pre-filled. Same component both times, or the refactor didn't land.

<!--
TIME: 1.5 min
ENERGY: Close the Forms unit.
WHAT TO SAY: "Check four is the one to watch for. Ask for an edit mode and a model will often give you a whole second component — it's a reasonable-looking answer that doubles your maintenance forever. One form, two sets of initial values."
DEMO: Blank form, then pre-filled from an existing record. Point at the single import.
TRANSITION: "Forms are done. Let's stop every page reinventing its own shell."
-->


---

# Forms & User Input — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0502** — Validated user input
- ✅ **PA0505** — Created a form for a model
- ✅ **PA0507** — Handled form submission

</div>

<div class="text-sm opacity-60 mt-8">61 checkpoints down · Next section: Look & Feel</div>

<!--
TIME: 20s
ENERGY: Quick checkpoint beat — this is the shortest unit.
WHAT TO SAY: "Three checkpoints, and the loop is now closed: data comes out of the API, and data goes back in. Validated on the client for speed, validated again on the server for safety — same pattern we wrote in Module 2, mirrored."
TRANSITION: "It all works. Now let's make it not look like a spreadsheet."
-->

---
layout: section
---

# VIDEO 3.13

## Consistent Layout + Link Views
#### ApplyIQ · The Layout shell with an Outlet and nav links

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — rewriting `client/src/components/layout/Layout.jsx` (it exists from 3.2) with `<Outlet />` + a new `Sidebar.jsx`.

<span class="pa-badge">PA0701</span> <span class="text-sm text-gray-400">QCTO PS07 · Look & Feel</span>

<!--
🎥 VIDEO NAME: "13. Consistent Layout + Link Views (PA0701)"
🎯 OBJECTIVE: By the end the student can build a shared Layout with React Router Outlet and navigate between views with Link.
WHAT TO SAY: "Every page should share the same shell. The Layout holds the sidebar and header; only the Outlet swaps when you navigate. Links change the URL without a reload."
DEMO: Build Layout with <Outlet/>, add <Link> nav, click between pages — only the middle changes.
COMMON QUESTION: "Is the Outlet like an iframe?" — "Same idea, far better — shared state, no page loads, smooth."
TRANSITION: "The shell exists. Next, fill its header and footer."
TIME: 15s divider
-->

---

# The Prompt — Video 3.13

**You spec it. The AI scaffolds it. You still own PA0701.**

```text
Rewrite src/components/layout/Layout.jsx and create src/components/layout/Sidebar.jsx.
Layout already exists with an inline top nav from video 3.2 — replace that nav
with the Sidebar component. Do not create a second layout file.

Layout renders the Sidebar on the left and the current child route on the right.
Sidebar has nav items for Dashboard (/), Applications (/applications) and
Kanban (/kanban).

Leave the spot where the child route renders as a TODO comment — I'll write it.
Do not use anchor tags for navigation.
```

> ✍️ **You write this yourself:** `<Outlet />`. It's one import and one element, and it's the entire mechanism that makes a master page work. That's the checkpoint.

> ⚠️ **What it usually gets wrong:** using `<a href>` instead of `<Link>` — which does a full page load and throws away your whole app. That's why the prompt bans it explicitly.

<!--
TIME: 2 min
ENERGY: The app finally looks like an app.
WHAT TO SAY: "Remember the router from video 2 — Layout was the parent, pages were children. This is the component that makes that real. And read the last line of the prompt: 'do not use anchor tags'. That's not style preference. An `<a href>` inside a single-page app does a full browser navigation, tears down React, and reloads everything you've built. Models reach for anchors constantly because that's what HTML nav looks like everywhere else on the internet."
DEMO: Generate, then place `<Outlet />` yourself. Navigate between pages and point at the sidebar not moving.
TRANSITION: "Read the sidebar — count the Links."
-->


---

# One Layout, Zero Duplication

```
┌─────────────────────────────────────────┐
│  Layout                                 │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ Sidebar  │  │  Header              │ │
│  │ <Link/>  │  ├──────────────────────┤ │
│  │ <Link/>  │  │  <Outlet />          │ │
│  │          │  │  (the current view)  │ │
│  └──────────┘  └──────────────────────┘ │
└─────────────────────────────────────────┘
```

```jsx
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1"><Outlet /></main>   {/* Header slots in here in 3.14 */}
    </div>
  );
}
```

> 💡 Only the `<Outlet/>` re-renders on navigation — sidebar and header stay put.

> 🔗 QCTO Bridge: ASP.NET "Consistent layout + link views" = `_Layout.cshtml` with `@RenderBody()` and `asp-action` links. `<Outlet/>` is `@RenderBody()`; `<Link>` is the action link.

<span class="pa-badge earned">PA0701 ✅</span>

<!--
TIME: 5 min
ENERGY: The app finally looks like an app.
WHAT TO SAY: "Remember the router from video 2 — `<Layout />` was the parent, and the pages were children. This is the component that makes that work. `<Outlet />` is the hole where the current child route renders. Everything around the Outlet — sidebar, header — is written once and never re-renders when you navigate. And use `<Link>`, not `<a>`. An anchor tag does a full page load and throws away your entire app; `<Link>` just changes the URL and swaps the Outlet."
DEMO: Build Layout with Sidebar and `<Outlet/>`, click between pages and point at the sidebar staying completely still while the middle swaps. Then change one `<Link>` to an `<a href>` and show the whole page flashing white on click — change it back.
TRANSITION: "The shell exists. Let's fill in the top and the bottom of it."
-->

---

# Checkpoint Check — PA0701

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** placed `<Outlet />`, and the Sidebar sits outside it
- [ ] Navigation uses `<Link to=...>` — **zero** `<a href>` tags
- [ ] Clicking between pages does not flash the page white
- [ ] Layout is in `components/layout/`

> 🔎 Change one `<Link>` to an `<a href>` and click it. The white flash is your whole app being destroyed and rebuilt. Change it back.

<!--
TIME: 2 min
ENERGY: The white-flash demo is the point of this check.
WHAT TO SAY: "Check two, and I want you to see the failure rather than take my word for it. A `Link` changes the URL and swaps what's in the Outlet — nothing else moves. An anchor tag asks the browser for a whole new document."
DEMO: Swap one Link for an anchor, click, show the flash and the sidebar rebuilding. Restore.
TRANSITION: "Shell exists. Let's fill in the top and bottom."
-->


---
layout: section
---

# VIDEO 3.14

## Header & Footer
#### ApplyIQ · Shared chrome that appears on every page

Duration: ~5 min

> 🖥️ **TO THE CODEBASE** — building `Header.jsx` and `Footer.jsx` in `client/src/components/layout/`.

<span class="pa-badge">PA0702</span> <span class="text-sm text-gray-400">QCTO PS07 · Look & Feel</span>

<!--
🎥 VIDEO NAME: "14. Header & Footer (PA0702)"
🎯 OBJECTIVE: By the end the student can build Header and Footer components rendered once in the Layout for every view.
WHAT TO SAY: "Header and footer are written once and live in the Layout — so they show on every page automatically. The header shows the user; the footer shows the brand."
DEMO: Build Header (shows user name via useAuth) and Footer, drop both into Layout.
COMMON QUESTION: "Do I add the header to every page?" — "No — once in Layout. That's the whole point of the shell."
TRANSITION: "Header and footer done. Now the CSS underneath it all."
TIME: 15s divider
-->

---

# The Prompt — Video 3.14

**You spec it. The AI scaffolds it. You still own PA0702.**

```text
Add src/components/layout/Header.jsx and src/components/layout/Footer.jsx,
then place them in Layout.jsx.

Header shows the ApplyIQ name on the left and the logged-in user's name on
the right. Footer shows a copyright line.

The user object may be null before auth resolves — handle that.
Both must sit outside <Outlet /> so they appear on every page.
```

> ✍️ **You write this yourself:** the placement decision — outside `<Outlet/>` so they're global chrome. And check the null-safety yourself; that's the crash this video prevents.

> ⚠️ **What it usually gets wrong:** writing `user.name` without the optional chain despite being told the user can be null. That's a white-screen crash on first load, and it only shows up when auth is slow.

<!--
TIME: 2 min
ENERGY: Quick and satisfying.
WHAT TO SAY: "Two small files, one real idea: anything outside the Outlet is written once and appears on every page forever. And I told it explicitly that user can be null — watch whether it listens, because `user.name` on a null object doesn't render a blank space, it throws and takes down the entire app. One question mark is the difference between a missing name and a white screen."
DEMO: Generate both, drop into Layout, navigate all three pages.
TRANSITION: "Check the null handling — this is the one it gets wrong."
-->


---

# Write the Chrome Once, Show It Everywhere

```jsx
function Header() {
  const { user, logout } = useAuth();        // ↩ Recall PA1001 — Module 2
  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-700">
      <span className="font-semibold">ApplyIQ</span>
      <div>
        <span className="text-gray-400 mr-3">{user?.name}</span>
        <button onClick={logout}>Sign out</button>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="p-4 text-center text-gray-500">© ApplyIQ 2026</footer>;
}
```

> 💡 Anything in the Layout (not the Outlet) is global chrome — define it once.

> 🔗 QCTO Bridge: ASP.NET "Consistent header/footer" lives in `_Layout.cshtml` outside `@RenderBody()`. Our Header/Footer sit in `Layout` outside the `<Outlet/>` — identical pattern.

<span class="pa-badge earned">PA0702 ✅</span>

<!--
TIME: 4 min
ENERGY: Quick and satisfying — small files, immediate visual result.
WHAT TO SAY: "Header and Footer go inside Layout but outside `<Outlet/>`, and that placement is the entire lesson. Anything outside the Outlet is global chrome — write it once, it appears on every page forever. Note `user?.name` with the optional chaining — before login resolves, `user` is null, and `user.name` would crash the whole app. That question mark is the difference between a blank flash and a white screen of death."
DEMO: Build both, drop them into Layout, then navigate across all three pages showing header and footer never move.
TRANSITION: "It's all there, but it's grey. Before we style it, let's make sure the CSS underneath actually makes sense."
-->

---

# Checkpoint Check — PA0702

Read the generated code against these. **Every one must be true before we move on.**

- [ ] Header and Footer are **outside** `<Outlet />` in Layout
- [ ] `user?.name` with the optional chain — not `user.name`
- [ ] Both appear on all three pages without being imported into any page
- [ ] They're in `components/layout/`

> 🔎 Set `user` to null and reload. A blank name is correct. A white screen means the optional chain is missing.

<!--
TIME: 1.5 min
ENERGY: Break it on purpose.
WHAT TO SAY: "Check two is the whole video. Let me show you what missing it costs — I'll set user to null, which is exactly what happens for the first few hundred milliseconds of every real page load while your token is being verified."
DEMO: Force `user = null`, reload, show the crash if the chain is missing. Add `?.`, reload, show the graceful blank.
TRANSITION: "It's all there, but it's grey. Before styling, let's make sure the CSS underneath makes sense."
-->


---
layout: section
---

# VIDEO 3.15

## CSS, Styles & Layouts
#### ApplyIQ · The CSS underneath Tailwind you must understand

Duration: ~8 min

> 🎤 **SLIDES ONLY** — CSS fundamentals in DevTools. No code changes.

<span class="pa-badge">PA0703</span> <span class="text-sm text-gray-400">QCTO PS07 · Look & Feel</span>

<!--
🎥 VIDEO NAME: "15. CSS, Styles & Layouts (PA0703)"
🎯 OBJECTIVE: By the end the student can explain the box model and CSS specificity and use DevTools to debug a layout.
WHAT TO SAY: "Tailwind writes CSS for you, but when a layout breaks you debug raw CSS. Two non-negotiables: the box model and specificity."
DEMO: Open DevTools on a card, show the box model diagram (content/padding/border/margin); toggle a style to show specificity winning.
COMMON QUESTION: "Do I memorise specificity points?" — "No. ID beats class, class beats element, !important beats everything and ruins your life."
TRANSITION: "Static layouts are fine. Next we make elements interactive."
TIME: 15s divider
-->

---

# The Box Model & Specificity Decide Every Layout

**Box model** — every element is a box:
```
Total space = content + padding + border + margin
```
`box-sizing: border-box` folds padding + border into the declared width.

**Specificity** — who wins when rules conflict:

| Selector | Points | Example |
|---|---|---|
| `!important` | 10,000 | Nuclear — avoid |
| inline style | 1,000 | `style="color:red"` |
| `#id` | 100 | `#main` |
| `.class` | 10 | `.card` |
| element | 1 | `p` |

> 💡 When two rules fight, higher specificity wins — this is why Tailwind uses single utility classes: no specificity wars.

> 🔗 QCTO Bridge: ASP.NET "CSS, styles & layouts" links a `site.css` in `_Layout` and reasons about the cascade. Same CSS engine — we just author it as Tailwind utilities instead of a stylesheet.

<span class="pa-badge earned">PA0703 ✅</span>

<!--
TIME: 5 min
ENERGY: Slow down. This is the video that fixes a year of CSS confusion.
WHAT TO SAY: "Two things explain almost every CSS bug you'll ever have. First, the box model: the space an element takes is content plus padding plus border plus margin. Set a width of 300 and add 20 of padding and you get 340 — unless `box-sizing: border-box`, which folds padding and border INTO the 300. Tailwind sets that globally, which is why our widths behave. Second, specificity: when two rules fight, the more specific one wins, and here's the scoreboard. And this is exactly why Tailwind works — every utility is a single class, so everything scores 10, and the last one in the stylesheet wins. No specificity wars, ever."
DEMO: Open DevTools on an application card. Show the box model diagram in the Computed panel. Then add a competing rule in the Styles panel and show one striking the other out.
TRANSITION: "Static layout is solid. Now let's make things respond to a click."
-->

---
layout: section
---

# VIDEO 3.16

## Interactive HTML Elements
#### ApplyIQ · A modal, hover states, and a dropdown

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — adding the modal + hover states to the applications page.

<span class="pa-badge">PA0704</span> <span class="text-sm text-gray-400">QCTO PS07 · Look & Feel</span>

<!--
🎥 VIDEO NAME: "16. Interactive HTML Elements (PA0704)"
🎯 OBJECTIVE: By the end the student can build interactive UI (modal open/close, hover, focus) driven by state and events.
WHAT TO SAY: "Interactivity in React = state + events. A modal is just a boolean. Hover and focus are CSS pseudo-states Tailwind exposes. Let's wire the Add Application modal."
DEMO: Build modal toggled by isOpen state; show hover:bg and focus:ring on the trigger button.
COMMON QUESTION: "Do I need a library for a modal?" — "No — conditional render on a boolean is enough."
TRANSITION: "We can build interactions by hand. Next: pull in JS libraries to do the heavy ones."
TIME: 15s divider
-->

---

# The Prompt — Video 3.16

**You spec it. The AI scaffolds it. You still own PA0704.**

```text
On the applications page, add a modal that opens when you click "New
Application" and closes on the X button or the backdrop.

Also add hover and focus-visible states to the buttons.

Use an isOpen boolean in state and conditional rendering — no modal library,
no direct DOM manipulation.

Leave the conditional render as a TODO — I'll write it.
```

> ✍️ **You write this yourself:** `{isOpen && (...)}`. Describing UI as a function of state instead of imperatively showing and hiding it is the whole React thesis, and it's this checkpoint.

> ⚠️ **What it usually gets wrong:** reaching for `document.getElementById` and `.classList.add('hidden')`, or suggesting a modal package. Both are jQuery habits and both fight React's render cycle.

<!--
TIME: 2 min
ENERGY: Fun one — things move.
WHAT TO SAY: "The constraint in this prompt is the lesson. Left alone, a model will offer you a modal library, or worse, `document.getElementById` and a classList toggle. That's imperative — you're reaching into the DOM and changing it. React will overwrite you on the next render and you'll spend an afternoon confused. Declarative means you describe what should be on screen for a given state and let React make the DOM match."
DEMO: Generate the modal markup and hover states, then write the conditional render yourself.
TRANSITION: "Check that no DOM was harmed in the making of this modal."
-->


---

# Interactivity = State + Events

```jsx
function AddApplication() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-2"
        onClick={() => setIsOpen(true)}>
        + Add Application
      </button>

      {isOpen && (                                  // modal = a boolean
        <div className="fixed inset-0 bg-black/50 grid place-items-center">
          <div className="bg-slate-800 p-6 rounded-xl">
            <ApplicationForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
```

> 💡 `hover:` and `focus:` are CSS pseudo-classes; the modal is pure conditional rendering on state.

> 🔗 QCTO Bridge: ASP.NET "Interactive HTML elements" leaned on jQuery to toggle DOM. React replaces that with state-driven conditional rendering — declarative instead of imperative.

<span class="pa-badge earned">PA0704 ✅</span>

<!--
TIME: 5 min
ENERGY: Fun one — things move on screen.
WHAT TO SAY: "Two kinds of interactivity here, and it's worth naming both. `hover:` and `focus:` are pure CSS — no JavaScript, no state, the browser handles it. Then the modal: `{isOpen && (...)}` — a boolean and a conditional render, and that's the entire implementation. No modal library, no jQuery `.show()`, no manual DOM manipulation. You describe what should be on screen for a given state, and React makes the DOM match. Declarative instead of imperative — that's the whole React thesis in one line."
DEMO: Build the button with hover and focus rings, then the modal. Open it, close it. Show `isOpen` flipping in React DevTools so students see the state driving the DOM.
TRANSITION: "We can hand-build interactions. Some things you shouldn't hand-build — like charts."
-->

---

# Checkpoint Check — PA0704

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** wrote `{isOpen && (...)}`
- [ ] **Zero** `document.getElementById` / `querySelector` / `classList` calls
- [ ] No modal package was installed
- [ ] Hover and focus states are `hover:` / `focus-visible:` utilities — no JS
- [ ] The modal closes on both the X and the backdrop

> 🔎 Open React DevTools and flip `isOpen` by hand. The modal should appear and disappear without you touching the page.

<!--
TIME: 2 min
ENERGY: DevTools state-flip is the money shot.
WHAT TO SAY: "Check two, and search the file for it — 'document.'. If there's a single hit, we rewrite it, because that's the pattern that makes React apps unmaintainable. And here's the proof the declarative version works."
DEMO: `Cmd+F` for `document.` in the file. Then open React DevTools, toggle `isOpen` manually, watch the modal obey.
TRANSITION: "We can hand-build interactions. Some things you shouldn't — like charts."
-->


---
layout: section
---

# VIDEO 3.17

## Use JS Libraries
#### ApplyIQ · Recharts for the dashboard charts

Duration: ~7 min

> 🖥️ **TO THE CODEBASE** — `npm install recharts` and building the dashboard chart.

<span class="pa-badge">PA0705</span> <span class="text-sm text-gray-400">QCTO PS07 · Look & Feel</span>

<!--
🎥 VIDEO NAME: "17. Use JS Libraries (PA0705)"
🎯 OBJECTIVE: By the end the student can install and use a third-party React library (Recharts) to render a chart.
WHAT TO SAY: "Don't reinvent charts. QCTO wants you using JS libraries — the old way was jQuery plugins, the React way is npm packages like Recharts. Install, import, compose."
DEMO: npm install recharts, render a BarChart of applications per week with live API data.
COMMON QUESTION: "jQuery or a React library?" — "In React, use React-native libraries. jQuery fights the virtual DOM."
TRANSITION: "Charts look great. Now the client-side styling unit — applying styles."
TIME: 15s divider
-->

---

# The Prompt — Video 3.17

**You spec it. The AI scaffolds it. You still own PA0705.**

```text
Add a bar chart to the dashboard using recharts (already installed).

It shows the number of applications per week for the last 6 weeks.

Compose it from ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip and Bar.

Leave the function that turns the applications array into chart data as a
TODO — I'll write that.
```

> ✍️ **You write this yourself:** the data transform — grouping applications into weekly buckets. That's the real work; wiring a charting library is reading its docs.

> ⚠️ **What it usually gets wrong:** installing a different charting library, or hardcoding sample data and forgetting to connect it to your real applications array. You end up demoing a chart of numbers that don't exist.

<!--
TIME: 2 min
ENERGY: Instant gratification — a chart appears.
WHAT TO SAY: "QCTO's checkpoint is 'use a JavaScript library'. In the ASP.NET era that meant a script tag for jQuery UI. Here it's a package that ships you components — and look at how you build the chart: you compose it out of `<Bar>`, `<XAxis>`, `<Tooltip>`. That's the mark of a well-built React library. What I'm keeping is the data transform, because turning your records into chart-shaped data is the part that's actually about your app."
DEMO: `npm install recharts` — call out that it resolves instantly because it's already in package.json. Generate, then write the transform.
TRANSITION: "Check that it's charting your data and not made-up data."
-->


---

# Install, Import, Compose

```bash
npm install recharts
```

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function WeeklyChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="week" /><YAxis /><Tooltip />
      <Bar dataKey="count" fill="#6366F1" />
    </BarChart>
  );
}
```

> 💡 A good library exposes composable components — you assemble a chart from `<Bar>`, `<XAxis>`, etc.

> ⚠️ Common mistake: reaching for jQuery plugins in React. They manipulate the DOM directly and clash with React's render cycle. Use React-native libraries.

> 🔗 QCTO Bridge: ASP.NET "Use libraries (JS/jQuery)" pulled in jQuery UI / DataTables via `<script>` tags. We `npm install` React components instead — same goal, modern delivery.

<span class="pa-badge earned">PA0705 ✅</span>

<!--
TIME: 5 min
ENERGY: Instant-gratification video — a chart appears.
WHAT TO SAY: "Nobody hand-draws SVG charts. QCTO's checkpoint is 'use JavaScript libraries' — in the ASP.NET era that meant a `<script>` tag for jQuery UI or DataTables. In React it means `npm install`, and the library ships you components. Look at how you build the chart: you compose it from `<Bar>`, `<XAxis>`, `<Tooltip>`. That's the sign of a well-built React library. And the rule to remember: never reach for a jQuery plugin in React. It reaches into the DOM directly, React overwrites it on the next render, and you'll lose an afternoon."
DEMO: `npm install recharts` (note: it's already in `package.json`, so show it resolving instantly), import, render a BarChart of applications per week using real API data.
TRANSITION: "That's Look and Feel done. Next unit is client-side — starting with how we've been styling all along."
-->

---

# Checkpoint Check — PA0705

Read the generated code against these. **Every one must be true before we move on.**

- [ ] It uses **recharts** — no other charting library was installed
- [ ] The chart is composed from recharts components, not a config object
- [ ] **You** wrote the applications → chart-data transform
- [ ] The bars reflect **real** records — no hardcoded sample array
- [ ] `ResponsiveContainer` wraps it so it resizes

> 🔎 Add a real application through the form, reload, and watch the chart change. If it doesn't move, you're rendering placeholder data.

<!--
TIME: 2 min
ENERGY: The add-a-record-watch-it-move demo proves it's real.
WHAT TO SAY: "Check four is the one that catches the most convincing failure in this module. A model will happily generate a beautiful chart backed by a hardcoded array of sample numbers, because that always renders and never errors. It looks completely finished. So prove it."
DEMO: Search the file for a hardcoded array. Then add an application through the form and watch the chart update.
TRANSITION: "Look and Feel done. Next unit — client-side, starting with how we've been styling all along."
-->


---

# Look & Feel — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0701** — Created a layout/master page
- ✅ **PA0702** — Added header & footer
- ✅ **PA0703** — Applied CSS fundamentals

</div>

<div class="grid grid-cols-2 gap-4 mt-2">

- ✅ **PA0704** — Added interactive elements
- ✅ **PA0705** — Used a JavaScript library

</div>

<div class="text-sm opacity-60 mt-8">66 checkpoints down · Next section: Client-Side Development</div>

<!--
TIME: 20s
ENERGY: Checkpoint pride — the app finally looks like a product.
WHAT TO SAY: "Five checkpoints. There's a real shell around the app now — layout, header, footer — the CSS underneath makes sense to you, things respond to clicks, and there's a chart on the dashboard. This is the point where you'd screenshot it for a portfolio."
TRANSITION: "Last unit — client-side development. Styling systems, responsiveness, and the build tooling that's been running under you all module."
-->

---
layout: section
---

# VIDEO 3.18

## Apply Styles
#### ApplyIQ · Tailwind utility classes on every element

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — styling components with Tailwind utilities across `client/src/`.

<span class="pa-badge">PA0801</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "18. Apply Styles (PA0801)"
🎯 OBJECTIVE: By the end the student can apply styles using Tailwind utility classes and explain the utility-first approach.
WHAT TO SAY: "Applying styles in React = utility classes in className. Instead of writing a stylesheet, you compose tiny single-purpose classes right on the element."
DEMO: Style a plain div into a card live by stacking p-6, bg-slate-800, rounded-xl, shadow.
COMMON QUESTION: "Isn't inline styling bad?" — "Utilities aren't inline styles — they're reusable, responsive, and purged. Different beast."
TRANSITION: "Styles applied. Next, the layout engine: Flexbox."
TIME: 15s divider
-->

---

# The Prompt — Video 3.18

**You spec it. The AI scaffolds it. You still own PA0801.**

```text
Restyle src/components/applications/ApplicationCard.jsx with Tailwind utilities.

Dark theme, rounded corners, subtle border, hover elevation, comfortable
spacing.

Constraints: utility classes only, no inline style objects, no arbitrary
values like w-[347px], and remember this is Tailwind 4 — no config file.
```

> ✍️ **You write this yourself:** nothing new — this is the audit video. Your job is to catch the three things the constraints forbid, because a model will break at least one of them.

> ⚠️ **What it usually gets wrong:** arbitrary values (`bg-[#1a1a1a]`, `p-[13px]`) instead of scale values, and Tailwind 3 idioms that no longer apply. Occasionally it'll still try to write you a config file.

<!--
TIME: 2 min
ENERGY: Name the thing they've been doing all module.
WHAT TO SAY: "Eighteen videos in, let's name it: utility-first means you compose a design from single-purpose classes on the element, instead of authoring a stylesheet full of component classes. And the objection is always 'isn't that just inline styles?' No — inline styles can't do hover, can't do breakpoints, can't be purged. Utilities do all three. This video is a bit different: I'm not withholding any code. Instead the prompt has three constraints, and your job is to check whether it respected them."
DEMO: Take the plain card, run the prompt, and read the class list out loud utility by utility.
TRANSITION: "Now audit it against the constraints."
-->


---

# Utility-First: Style on the Element

```jsx
// from this...
<div>Google — Software Engineer</div>

// ...to this, no stylesheet touched
<div className="p-6 bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition">
  Google — Software Engineer
</div>
```

| Utility | CSS it writes |
|---|---|
| `p-6` | `padding: 1.5rem` |
| `bg-slate-800` | `background: #1e293b` |
| `rounded-xl` | `border-radius: 0.75rem` |

> 💡 Each class does exactly one thing — you compose a design from primitives instead of authoring CSS files.

> 🔗 QCTO Bridge: ASP.NET "Apply styles" linked a CSS class onto an element (`class="card"`). Tailwind's `className` does the same — the difference is one class per property vs one class per component.

<span class="pa-badge earned">PA0801 ✅</span>

<!--
TIME: 4 min
ENERGY: Name the thing they've been doing all module.
WHAT TO SAY: "We've been doing this for seventeen videos — now let's name it. Utility-first means you compose a design out of single-purpose classes on the element, instead of authoring a stylesheet with component classes in it. And the objection is always the same: isn't that just inline styles? No. Inline styles can't do hover, can't do breakpoints, can't be reused, and can't be purged. Utilities do all four. Also worth knowing: this is Tailwind 4, so there's no `tailwind.config.js` — configuration lives in your CSS file now, via `@import \"tailwindcss\"`."
DEMO: Take a plain unstyled `<div>` and stack utilities on it live — `p-6`, then `bg-slate-800`, then `rounded-xl`, then `shadow-lg` — narrating each one as the card assembles itself.
TRANSITION: "Utilities style one element. Layout is about arranging many — Flexbox next."
-->

---

# Checkpoint Check — PA0801

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **Zero** `style={{ }}` objects
- [ ] **Zero** arbitrary values like `p-[13px]` or `bg-[#1a1a1a]` — scale values only
- [ ] No `tailwind.config.js` was created
- [ ] Hover states use `hover:` utilities
- [ ] Nothing was added to `index.css`

> 🔎 Search the file for `[` and for `style=`. Two searches, ten seconds, and they catch the two ways this goes wrong.

<!--
TIME: 2 min
ENERGY: Audit mode. Make the searches a habit.
WHAT TO SAY: "This is the check I want you to actually internalise, because it's two keystrokes. Search for a square bracket — that finds every arbitrary value. Search for `style=` — that finds every inline object. If a design genuinely needs an arbitrary value, fine, but it should be a decision you made, not a default the model reached for because it didn't know your spacing scale."
DEMO: Run both searches live. Fix whatever turns up.
TRANSITION: "Utilities style one element. Layout is about arranging many."
-->


---
layout: section
---

# VIDEO 3.19

## CSS Flexbox
#### ApplyIQ · The Kanban board's horizontal column layout

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — building the Kanban board layout in `client/src/pages/KanbanPage.jsx`.

<span class="pa-badge">PA0807</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "19. CSS Flexbox (PA0807)"
🎯 OBJECTIVE: By the end the student can lay out elements in one dimension with Flexbox (flex, gap, justify, align).
WHAT TO SAY: "Flexbox is one-dimensional layout — a row OR a column. The Kanban board is a flex row of columns. flex, gap, and alignment do all the work."
DEMO: Build the Kanban row with flex gap-4, each column min-w, overflow-x-auto to scroll.
COMMON QUESTION: "Flexbox or Grid?" — "Flexbox = one direction. Grid = two. Kanban is a row, so flex."
TRANSITION: "Flexbox is one axis. Media queries make it adapt to screens — next."
TIME: 15s divider
-->

---

# The Prompt — Video 3.19

**You spec it. The AI scaffolds it. You still own PA0807.**

```text
Create src/pages/KanbanPage.jsx — a Kanban board with one column per
application status.

The board is a horizontal flex row of columns; each column is a vertical flex
column of ApplicationCards.

It must scroll horizontally rather than squashing when there isn't room.

Leave the two flex container className strings as TODOs — I'll write them.
```

> ✍️ **You write this yourself:** the flex classes themselves. `flex`, `flex-col`, `gap-4`, `overflow-x-auto` — knowing which container gets which is the checkpoint.

> ⚠️ **What it usually gets wrong:** using `space-x-4` instead of `gap-4` (leaks at the edges), and forgetting `flex-shrink-0` on the columns so they crush instead of scrolling.

<!--
TIME: 2 min
ENERGY: Visual and structural.
WHAT TO SAY: "Flexbox is one-dimensional — a row or a column, never both at once. Kanban is the perfect example because it's both, nested: the board is a flex row of columns, each column is a flex column of cards. So I'm keeping the class strings, because knowing which container gets `flex-col` is the entire competency."
DEMO: Generate the structure, write the flex classes yourself.
TRANSITION: "Check the spacing utility it reached for."
-->


---

# Flexbox = One-Dimensional Layout

```jsx
<div className="flex gap-4 overflow-x-auto">     {/* a ROW of columns */}
  {statuses.map(status => (
    <div key={status} className="min-w-[280px] flex flex-col gap-3">
      {/* a COLUMN of cards */}
    </div>
  ))}
</div>
```

| Tailwind | CSS |
|---|---|
| `flex` | `display: flex` |
| `gap-4` | `gap: 1rem` |
| `justify-between` | `justify-content: space-between` |
| `items-center` | `align-items: center` |

> 💡 Flexbox handles one axis at a time — switch axis with `flex-row` vs `flex-col`.

> 🔗 QCTO Bridge: QCTO "CSS Flexbox" expects raw `display:flex; justify-content; align-items`. Tailwind's `flex`, `justify-*`, `items-*` map one-to-one to those properties.

<span class="pa-badge earned">PA0807 ✅</span>

<!--
TIME: 4 min
ENERGY: Visual and structural.
WHAT TO SAY: "Flexbox is one-dimensional — you get a row or a column, not both. The Kanban board is the perfect example because it's both, nested: the board is a flex ROW of columns, and each column is a flex COLUMN of cards. `flex` plus `flex-col` and you've got it. `gap-4` for spacing between items — never margins for this, gap doesn't leak at the edges. And `overflow-x-auto` so that when you have eight status columns the board scrolls sideways instead of crushing them."
DEMO: Build the flex row, add the columns, add cards. Then narrow the window and show it scrolling horizontally instead of squashing.
TRANSITION: "That layout is fixed. Let's see the mechanism that lets it change by screen size."
-->

---

# Checkpoint Check — PA0807

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** wrote both flex container class strings
- [ ] `gap-4` for spacing, **not** `space-x-4` or margins on children
- [ ] `overflow-x-auto` on the board so it scrolls instead of crushing
- [ ] Columns have `flex-shrink-0` so they hold their width
- [ ] Narrowing the window scrolls the board — it doesn't squash the columns

> 🔎 Drag the window narrow. Scrolling is correct; columns getting thinner and thinner is not.

<!--
TIME: 2 min
ENERGY: The resize is the test.
WHAT TO SAY: "Check two is small and worth knowing. `gap` puts space between items and nothing on the outside. `space-x` adds margins to children, which leaks at the edges and breaks the moment you wrap. Gap is the modern answer and it's what you should reach for every time."
DEMO: Narrow the window and show it scrolling. Then remove `flex-shrink-0` and show the columns crushing.
TRANSITION: "That layout is fixed. Let's see the mechanism that lets it change by screen size."
-->


---
layout: section
---

# VIDEO 3.20

## CSS Media Queries
#### ApplyIQ · What Tailwind breakpoints compile to

Duration: ~6 min

> 🎤 **SLIDES ONLY** — reading compiled CSS in DevTools. No code changes.

<span class="pa-badge">PA0808</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "20. CSS Media Queries (PA0808)"
🎯 OBJECTIVE: By the end the student can read and write a CSS media query and explain Tailwind's breakpoint prefixes.
WHAT TO SAY: "Tailwind's sm: lg: prefixes are media queries in disguise. Write one by hand once, then let Tailwind do it. Here's exactly what it compiles to."
DEMO: Show compiled CSS in DevTools — the @media rules behind grid-cols-1 sm:grid-cols-2 lg:grid-cols-4.
COMMON QUESTION: "Mobile-first means what?" — "Base styles target the smallest screen; prefixes add overrides as screens grow."
TRANSITION: "Media queries are the mechanism. Responsive design is the discipline — next."
TIME: 15s divider
-->

---

# Tailwind Breakpoints Are Media Queries

```css
/* what grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 compiles to */
.card-grid { grid-template-columns: 1fr; }              /* mobile default */

@media (min-width: 640px)  { .card-grid { grid-template-columns: repeat(2,1fr);} }
@media (min-width: 1024px) { .card-grid { grid-template-columns: repeat(4,1fr);} }
```

| Prefix | Min width | Device |
|---|---|---|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |

> 💡 Mobile-first: write the base for the smallest screen, then layer breakpoints upward.

> 🔗 QCTO Bridge: QCTO "CSS media queries" wants `@media (min-width: ...)`. Each Tailwind prefix is literally one of those blocks — know the syntax, then let the tool generate it.

<span class="pa-badge earned">PA0808 ✅</span>

<!--
TIME: 4 min
ENERGY: Lifting the hood. Short and clarifying.
WHAT TO SAY: "You've been writing `sm:` and `lg:` without knowing what they are. They're media queries — that's all. Here's the exact CSS Tailwind generates for `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`: a base rule with no query, then two `@media (min-width)` blocks. Note the direction: min-width, not max-width. That's mobile-first. Your base styles target the smallest screen, and each breakpoint layers an override on top as the screen grows. QCTO will ask you to write a media query by hand — so know this syntax cold, then let the tool generate it."
DEMO: Open DevTools, find the compiled stylesheet, and show the actual `@media` blocks behind the classes on the stat-card grid.
TRANSITION: "That's the mechanism. Next, the discipline of actually using it."
-->

---
layout: section
---

# VIDEO 3.21

## Responsive Design
#### ApplyIQ · The stat-card grid that reflows by screen

Duration: ~6 min

> 🖥️ **TO THE CODEBASE** — making the dashboard stat grid responsive.

<span class="pa-badge">PA0802</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "21. Responsive Design (PA0802)"
🎯 OBJECTIVE: By the end the student can build a responsive grid that reflows columns across breakpoints.
WHAT TO SAY: "Responsive design = one layout that adapts. The dashboard's stat cards are 1 column on mobile, 2 on tablet, 4 on desktop — three classes, zero hand-written media queries."
DEMO: Resize the browser on the StatCard grid; show it snap 1 → 2 → 4 columns.
COMMON QUESTION: "Do I design desktop or mobile first?" — "Mobile first. It's simpler to add than to strip away."
TRANSITION: "It reflows. But does it actually LOOK right on every screen? Next."
TIME: 15s divider
-->

---

# The Prompt — Video 3.21

**You spec it. The AI scaffolds it. You still own PA0802.**

```text
Make the dashboard stat-card grid responsive: one column on mobile, two on
small screens, four on large.

Mobile-first — the base class is the smallest screen, and each breakpoint
layers on top.

Leave the grid className as a TODO — I'll write it.
```

> ✍️ **You write this yourself:** the responsive class string. Choosing the breakpoints and writing them mobile-first is exactly what PA0802 assesses.

> ⚠️ **What it usually gets wrong:** writing it desktop-first — a wide base with `sm:` overrides shrinking it down. It runs, it looks right on your laptop, and it's backwards.

<!--
TIME: 2 min
ENERGY: The resize demo does the teaching.
WHAT TO SAY: "Three classes and this layout works on every screen on earth. And the direction matters more than the numbers: base class is mobile, each breakpoint layers on as the screen grows. Build the other way round and you're constantly stripping complexity out for small screens, which is much harder than adding it in. I'm writing this one myself because it's three classes and it's the entire checkpoint."
DEMO: Write the class string yourself, then drag the window slowly narrow to wide. Do it twice.
TRANSITION: "Check the direction it went."
-->


---

# One Grid, Three Layouts

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard title="Total"     value={stats.total} />
  <StatCard title="Active"    value={stats.active} />
  <StatCard title="Interviews" value={stats.interviews} />
  <StatCard title="Response"  value={stats.responseRate} />
</div>
```

| Screen | Columns | Breakpoint |
|---|---|---|
| Mobile | 1 | default |
| Tablet | 2 | `sm:` |
| Desktop | 4 | `lg:` |

> 💡 Responsive design is one component description that produces the right layout at every width.

> 🔗 QCTO Bridge: ASP.NET "Responsive design" usually meant Bootstrap's `col-sm-*` grid. `grid-cols-1 sm:grid-cols-2` is the same responsive grid, expressed as utilities.

<span class="pa-badge earned">PA0802 ✅</span>

<!--
TIME: 4 min
ENERGY: The resize demo does the teaching — let it.
WHAT TO SAY: "Three classes and the layout adapts to every screen on earth. `grid-cols-1` is the base — mobile. `sm:grid-cols-2` kicks in at 640. `lg:grid-cols-4` at 1024. Zero hand-written media queries, and it reads top to bottom as small, medium, large. And always build mobile-first: it is far easier to add complexity as screens grow than to strip it away as they shrink."
DEMO: Put the classes on the stat grid, then drag the browser window slowly from narrow to wide and let students watch it snap 1 → 2 → 4. Do it twice.
TRANSITION: "It reflows. But reflowing and looking right are two different things — let's actually check."
-->

---

# Checkpoint Check — PA0802

Read the generated code against these. **Every one must be true before we move on.**

- [ ] **You** wrote the grid class string
- [ ] Base class is the **smallest** screen — `grid-cols-1`, unprefixed
- [ ] Breakpoints layer upward: `sm:grid-cols-2 lg:grid-cols-4`
- [ ] **No** hand-written `@media` query anywhere
- [ ] Dragging the window snaps 1 → 2 → 4

> 🔎 Read the class string left to right. It should get bigger, not smaller. If `lg:` is undoing something, it's desktop-first.

<!--
TIME: 1.5 min
ENERGY: Slow resize, twice.
WHAT TO SAY: "Check two and three are one idea: read the classes left to right and the layout should grow. If you see a wide base with a `sm:` prefix making it narrower, that's desktop-first thinking and it'll fight you for the rest of the project."
DEMO: Drag narrow to wide slowly. Twice.
TRANSITION: "It reflows. Reflowing and looking right are different things — let's check."
-->


---
layout: section
---

# VIDEO 3.22

## Correct Display Across Screens
#### ApplyIQ · Testing ApplyIQ from phone to monitor

Duration: ~5 min

> 🖥️ **TO THE CODEBASE** — fixing overflow and truncation issues found in DevTools device mode.

<span class="pa-badge">PA0810</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "22. Correct Display Across Screens (PA0810)"
🎯 OBJECTIVE: By the end the student can verify and fix a layout across device sizes using DevTools device mode.
WHAT TO SAY: "Reflowing isn't the same as looking right. We test ApplyIQ in DevTools device mode — iPhone, iPad, desktop — and fix overflow, tap targets, and truncation."
DEMO: Open DevTools device toolbar, cycle iPhone SE / iPad / desktop, fix a card overflowing on small screens.
COMMON QUESTION: "Which devices do I test?" — "One small phone, one tablet, one desktop covers 90%."
TRANSITION: "Our own styling is solid. Now the framework you'll meet in the wild — Bootstrap."
TIME: 15s divider
-->

---

# The Prompt — Video 3.22

**You spec it. The AI scaffolds it. You still own PA0810.**

```text
These elements break at 375px wide:

<DESCRIBE WHAT YOU ACTUALLY SEE BREAKING>

Fix them with Tailwind utilities only. Do not change the desktop layout.

Likely tools: truncate for long text, overflow-x-auto for wide containers,
min-w-0 on flex children that refuse to shrink.
```

> ✍️ **You write this yourself:** the diagnosis. Finding what's broken in device mode is the checkpoint — the fix is three utilities you now know.

> ⚠️ **What it usually gets wrong:** changing the desktop layout while fixing mobile, which is why that constraint is in the prompt. Always re-check desktop after a mobile fix.

<!--
TIME: 2 min
ENERGY: QA mindset. You find the bug, the AI applies the fix.
WHAT TO SAY: "This prompt is different — I can't write it until I've looked. The whole video is: open device mode, find what's genuinely broken, describe it precisely, then let it apply the fix. That's the honest division of labour. And read the constraint: don't change the desktop layout. Left alone, a model will refactor your grid to solve a mobile problem and quietly break the view you spent five videos on."
DEMO: Open DevTools device toolbar at iPhone SE. Find something real. Type the description into the prompt live.
TRANSITION: "Apply it, then check desktop didn't move."
-->


---

# Verify on Real Sizes, Not Just Your Laptop

```
DevTools → device toolbar (Ctrl/Cmd + Shift + M)

iPhone SE (375px)   → 1 column, full-width cards, tap targets ≥ 44px
iPad     (768px)    → 2 columns, sidebar collapses to icons
Desktop  (1440px)   → 4 columns, sidebar expanded
```

Common fixes:
- `overflow-x-auto` so wide tables/boards scroll instead of breaking the page
- `truncate` so long company names don't blow out a card
- `min-w-0` on flex children so they're allowed to shrink

> 💡 "Responsive" only counts once you've actually looked at it on small, medium, and large.

> 🔗 QCTO Bridge: ASP.NET "Correct display across screens" = testing the Bootstrap grid on devices. Same QA discipline — we use DevTools device mode to confirm our Tailwind layout holds.

<span class="pa-badge earned">PA0810 ✅</span>

<!--
TIME: 4 min
ENERGY: QA mindset. Break it on purpose, then fix it.
WHAT TO SAY: "Reflowing isn't the same as looking right. So we test properly: DevTools device toolbar, and three sizes — one small phone, one tablet, one desktop. That covers about ninety percent of real traffic. And here are the three fixes you'll reach for over and over: `overflow-x-auto` so a wide board scrolls instead of breaking the page, `truncate` so a long company name doesn't blow the card out, and `min-w-0` on flex children — that last one is obscure but critical, because flex items refuse to shrink below their content size until you tell them they're allowed to."
DEMO: Open device mode, switch to iPhone SE, find something genuinely broken, fix it live with `truncate`, switch back to desktop and confirm nothing regressed.
TRANSITION: "Our own styling holds up. Now the framework you'll walk into on your first job."
-->

---

# Checkpoint Check — PA0810

Read the generated code against these. **Every one must be true before we move on.**

- [ ] Tested at **three** widths: small phone, tablet, desktop
- [ ] Long company names `truncate` instead of blowing out the card
- [ ] The Kanban board scrolls at 375px instead of breaking the page
- [ ] Fixes are utilities only — no new CSS file, no inline styles
- [ ] **Desktop is unchanged** — go back and look

> 🔎 The last check is the one people skip. Every mobile fix is a chance to break desktop. Always look twice.

<!--
TIME: 2 min
ENERGY: Check desktop last, deliberately.
WHAT TO SAY: "Check five, and I want to make a habit of it. You fix mobile, you're pleased with yourself, you ship, and someone opens it on a 27-inch monitor and the cards are stretched across the whole screen. Fix mobile, then always go back to desktop and look."
DEMO: Fix at 375, switch to desktop, confirm nothing moved. Then tablet.
TRANSITION: "Our styling holds up. Now the framework you'll walk into on your first job."
-->


---
layout: section
---

# VIDEO 3.23

## The Bootstrap Framework
#### ApplyIQ · Recognising Bootstrap you'll meet on the job

Duration: ~7 min

> 🎤 **SLIDES ONLY** — reading Bootstrap. No code changes.

<span class="pa-badge">PA0806</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "23. The Bootstrap Framework (PA0806)"
🎯 OBJECTIVE: By the end the student can read Bootstrap's 12-column grid and components and contrast it with Tailwind.
WHAT TO SAY: "Over 25% of websites use Bootstrap. You'll meet it on freelance gigs, legacy apps, and in interviews. Learn to read its 12-column grid and pre-built components — even though we build with Tailwind."
DEMO: Show a Bootstrap grid (col-md-4 + col-md-8) and a card, contrast with our Tailwind equivalents.
COMMON QUESTION: "Bootstrap or Tailwind?" — "Tailwind for new React. Bootstrap to work in what already exists. Know both."
TRANSITION: "That's the component framework. Next, the language layer companies still use — Sass."
TIME: 15s divider
-->

---

# Bootstrap: 12-Column Grid + Pre-Built Components

```html
<div class="container">
  <div class="row">
    <div class="col-md-4">Sidebar (4/12)</div>
    <div class="col-md-8">Main content (8/12)</div>
  </div>
</div>
```

| | Bootstrap | Tailwind (ours) |
|---|---|---|
| Approach | Pre-built components | Utility classes |
| Bundle | ~230KB | purged ~10KB |
| With React | jQuery conflicts | native fit in JSX |
| Curve | Low | Medium |

> 💡 Columns in a `row` must add up to 12 — `col-md-4 + col-md-8 = 12`.

> ⚠️ Common mistake: dropping raw Bootstrap JS (modals, dropdowns) into React — it needs jQuery and fights the virtual DOM. Use `react-bootstrap` if you must.

> 🔗 QCTO Bridge: QCTO "Bootstrap framework" is the literal checkpoint. We honour it by reading Bootstrap fluently while building in Tailwind — the responsive-grid concept transfers directly.

<span class="pa-badge earned">PA0806 ✅</span>

<!--
TIME: 5 min
ENERGY: Career-context video. Be honest about why this is here.
WHAT TO SAY: "We're not building with Bootstrap and I'm not going to pretend otherwise. But a quarter of the web runs on it, and you will absolutely open a legacy repo or take a freelance job and find it. So learn to READ it. The whole system is a 12-column grid: `container`, then `row`, then columns whose numbers add to 12 — `col-md-4` plus `col-md-8`. That's the same responsive-grid idea as our `sm:grid-cols-2`, expressed as pre-built classes instead of utilities. One trap: don't drop Bootstrap's JavaScript components into React. They need jQuery and they manipulate the DOM behind React's back. If you must, use `react-bootstrap`."
DEMO: Show the Bootstrap grid markup side by side with the Tailwind equivalent from our dashboard. Read the comparison table across.
TRANSITION: "That's the component framework. Next, the CSS language layer you'll meet in the same repos — Sass."
-->

---
layout: section
---

# VIDEO 3.24

## CSS Pre-Processors
#### ApplyIQ · Reading Sass in legacy codebases

Duration: ~6 min

> 🎤 **SLIDES ONLY** — reading Sass. No code changes.

<span class="pa-badge">PA0809</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "24. CSS Pre-Processors (PA0809)"
🎯 OBJECTIVE: By the end the student can read Sass variables, nesting, and mixins and explain why modern CSS/Tailwind replaced them.
WHAT TO SAY: "Sass added variables, nesting, and mixins before plain CSS had them. Companies with pre-2020 codebases still use it — learn to read it even though Tailwind removes the need."
DEMO: Walk a .scss file: $variables, nesting, a respond-to mixin.
COMMON QUESTION: "Do companies still use Sass?" — "Plenty — larger, older codebases. You'll encounter it."
TRANSITION: "Sass needs compiling. That's a build step — enter task runners."
TIME: 15s divider
-->

---

# Sass: Variables, Nesting, Mixins

```scss
$primary: #3D3DFF;

.sidebar {
  width: 280px;
  .nav-item {                          // nesting
    &:hover  { background: rgba(white, 0.1); }
    &.active { border-left: 3px solid $primary; }
  }
}

@mixin respond-to($bp) {               // mixin = reusable chunk
  @media (min-width: $bp) { @content; }
}
.card-grid { @include respond-to(768px) { grid-template-columns: repeat(2,1fr); } }
```

> 💡 Sass is CSS with superpowers — but modern CSS now has variables/nesting natively, and Tailwind sidesteps it entirely.

> 🔗 QCTO Bridge: QCTO "CSS pre-processors" names Sass/LESS directly. Recognising `$vars`, `&` nesting, and `@mixin` satisfies the checkpoint; Tailwind is our modern replacement.

<span class="pa-badge earned">PA0809 ✅</span>

<!--
TIME: 4 min
ENERGY: Historical context, delivered briskly.
WHAT TO SAY: "Sass existed because plain CSS had no variables, no nesting, no reusable chunks. Three things to recognise: `$primary` is a variable, the `&` is nesting — `&:hover` compiles to `.nav-item:hover`, and `@mixin` with `@include` is a reusable block of rules. Why does this matter now? Because plain CSS got variables and nesting natively, and Tailwind removes most of the need entirely. But every codebase written before about 2020 is full of `.scss` files, so read it fluently even if you never write it."
DEMO: Walk the `.scss` sample line by line, and for each feature say what it compiles down to.
TRANSITION: "Sass has to be compiled into CSS. Something has to run that compile step — that's a task runner."
-->

---
layout: section
---

# VIDEO 3.25

## Task Runners
#### ApplyIQ · From Gulp pipelines to Vite's zero-config

Duration: ~6 min

> 🎤 **SLIDES ONLY** — build-tooling history. No code changes.

<span class="pa-badge">PA0803</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "25. Task Runners (PA0803)"
🎯 OBJECTIVE: By the end the student can explain what a task runner does and how Vite replaces a hand-written Gulp pipeline.
WHAT TO SAY: "A task runner automates build steps — compile Sass, add prefixes, minify. Gulp made you script that pipeline. Vite does it with zero config. Know the history, use the modern tool."
DEMO: Show a Gulp build task, then `npm run dev` with Vite doing it all automatically.
COMMON QUESTION: "Do I need Gulp?" — "No, for new projects. Recognise it in older repos."
TRANSITION: "Vite's build does two big jobs we should name: bundling and minification."
TIME: 15s divider
-->

---

# Gulp Scripted It; Vite Automates It

```javascript
// the old way — a Gulp task you wrote and maintained
gulp.task('build', () =>
  gulp.src('src/**/*.scss')
    .pipe(sass()).pipe(autoprefixer()).pipe(minify())
    .pipe(gulp.dest('dist')));
```

**Timeline:**
- 2013 — Gulp / Grunt: hand-written task scripts
- 2016 — Webpack: powerful, 200-line configs
- 2021 — Vite: zero config, instant dev server

> 💡 A task runner is just "automate the repetitive build steps" — Vite is the modern, config-free answer.

> 🔗 QCTO Bridge: QCTO "Task runners" expects Gulp/Grunt. Vite is our task runner — `npm run dev` and `npm run build` trigger the same pipeline Gulp used to script by hand.

<span class="pa-badge earned">PA0803 ✅</span>

<!--
TIME: 4 min
ENERGY: Story-telling. Three dates, one arc.
WHAT TO SAY: "A task runner automates the repetitive build steps — compile the Sass, add vendor prefixes, minify, copy to a folder. In 2013 you wrote that pipeline yourself in Gulp, and you maintained it. By 2016 Webpack could do more but wanted a two-hundred-line config. Then Vite: zero config, instant dev server. Here's the point — you are already using a task runner. `npm run dev` and `npm run build` in our project ARE the pipeline. QCTO names Gulp; Vite is the modern answer to the same checkpoint."
DEMO: Show the Gulp task on the slide, then open our `client/package.json` and point at the two scripts that replaced all of it.
TRANSITION: "Vite's build does two named jobs worth understanding — bundling and minification."
-->

---
layout: section
---

# VIDEO 3.26

## Bundling & Minification
#### ApplyIQ · Shipping a small, fast production build

Duration: ~5 min

> 🖥️ **TO THE CODEBASE** — running `npm run build` and inspecting `client/dist/`.

<span class="pa-badge">PA0804</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "26. Bundling & Minification (PA0804)"
🎯 OBJECTIVE: By the end the student can explain bundling, tree-shaking, and minification and run a production build.
WHAT TO SAY: "Bundling combines many files into a few optimized chunks; minification strips whitespace and shortens names. Vite does both on `npm run build`. Smaller bundle = faster load."
DEMO: Run npm run build, open dist/, show the hashed, minified chunks and their tiny size.
COMMON QUESTION: "Why combine files at all?" — "Fewer requests and tree-shaking drop unused code — pages load faster."
TRANSITION: "One build job left to make explicit — the watcher that rebuilds as you type."
TIME: 15s divider
-->

---

# The Prompt — Video 3.26

**You spec it. The AI scaffolds it. You still own PA0804.**

```text
I just ran `npm run build`. Here is the output:

<PASTE THE REAL TERMINAL OUTPUT>

Explain what each line means, and identify which files are the JS bundle, the
CSS bundle, and what the hash in the filenames is for.

Do not tell me anything you can't see in that output.
```

> ✍️ **You write this yourself:** the verification. This video is about reading a real build, so the AI explains and **you fact-check it against `dist/`**.

> ⚠️ **What it usually gets wrong:** confidently describing files that aren't in your output, or quoting generic Vite documentation numbers instead of yours. That last line of the prompt is there to make that visible.

<!--
TIME: 2 min
ENERGY: Concrete — real numbers on screen.
WHAT TO SAY: "This one flips the format. There's no code to generate — I've run the build, and I'm asking it to explain my actual output. Look at the last line: 'don't tell me anything you can't see in that output.' That instruction matters everywhere, but especially here, because a model will happily explain a build it's imagining rather than the one on your screen. Every claim it makes, we check against `dist/`."
DEMO: Run `npm run build` on camera. Paste the real output into the prompt. Then `ls client/dist/assets` and check each claim.
TRANSITION: "Now let's verify what it told us."
-->


---

# Bundle, Tree-Shake, Minify

```bash
npm run build       # Vite produces dist/
```

What you get, automatically:
- ✓ **Bundling** — many modules → a few optimized chunks
- ✓ **Tree-shaking** — unused exports dropped
- ✓ **Minification** — whitespace/comments removed, names shortened
- ✓ **Hashing** — `index-a8f3.js` for cache-busting

```
src/ (dozens of .jsx)  →  dist/index-a8f3.js  (one small minified chunk)
```

> 💡 Bundling reduces requests; minification + tree-shaking reduce bytes — together they cut load time.

> 🔗 QCTO Bridge: QCTO "Bundling & minification" was Webpack/Gulp territory. Vite's `build` does both — the deliverable (a small, hashed, minified bundle) is identical.

<span class="pa-badge earned">PA0804 ✅</span>

<!--
TIME: 4 min
ENERGY: Concrete — real numbers on screen.
WHAT TO SAY: "Four things happen when you run build, and they're each worth naming. Bundling: dozens of modules become a handful of chunks, so the browser makes fewer requests. Tree-shaking: anything you imported but never used gets dropped. Minification: whitespace and comments gone, variable names shortened to single letters. And hashing: the filename gets a content hash so browsers cache it forever but pick up new versions instantly. You don't configure any of it — you just need to be able to explain all four."
DEMO: Run `npm run build` on camera, then `ls client/dist/assets` and read the actual file sizes out loud. Open the minified JS and show the unreadable single-letter output.
TRANSITION: "One last piece of the build story — the thing that's been rebuilding as you type all module."
-->

---

# Checkpoint Check — PA0804

Read the generated code against these. **Every one must be true before we move on.**

- [ ] Every file it names actually exists in `client/dist/assets`
- [ ] The sizes it quotes match your real output
- [ ] It explains **bundling**, **tree-shaking**, **minification** and **hashing**
- [ ] It didn't invent a file or a number that isn't in your paste

> 🔎 Open the minified JS. Single-letter variable names, no whitespace — that's minification, and now you've seen it rather than been told about it.

<!--
TIME: 2 min
ENERGY: Fact-check live. This is the most transferable skill in the module.
WHAT TO SAY: "This check is the most useful habit in this whole course, and it has nothing to do with React. When a model explains something concrete — your build, your logs, your error — go and look. Not because it's usually wrong, but because the times it is wrong, it sounds exactly the same as when it's right."
DEMO: `ls dist/assets`, compare against every filename and size it claimed. Then open the minified JS and scroll.
TRANSITION: "One last piece — the thing that's been rebuilding as you type all module."
-->


---
layout: section
---

# VIDEO 3.27

## Watcher Task
#### ApplyIQ · Hot Module Replacement while you code

Duration: ~5 min

> 🖥️ **TO THE CODEBASE** — running `npm run dev` and demonstrating HMR.

<span class="pa-badge">PA0805</span> <span class="text-sm text-gray-400">QCTO PS08 · Client-side</span>

<!--
🎥 VIDEO NAME: "27. Watcher Task (PA0805)"
🎯 OBJECTIVE: By the end the student can run the dev watcher and explain Hot Module Replacement.
WHAT TO SAY: "The watcher re-runs your build the instant a file changes. Vite goes further — Hot Module Replacement swaps just the changed module without a full reload, keeping your app state. This is the feedback loop that makes development fast."
DEMO: Run npm run dev, edit a component, show the browser update instantly without losing form state.
COMMON QUESTION: "Why doesn't my page fully reload?" — "That's HMR — it patches the module in place. Faster, keeps state."
TRANSITION: "That's all 27 checkpoints — let's celebrate the module."
TIME: 15s divider
-->

---

# The Prompt — Video 3.27

**You spec it. The AI scaffolds it. You still own PA0805.**

```text
Explain the difference between a Gulp watch task and Vite's Hot Module
Replacement, specifically: what happens to the state of a half-filled form
when a file changes.

Then tell me which one this project uses and how you know — point at a real
file in this repo.
```

> ✍️ **You write this yourself:** the demo. You half-fill the form and prove HMR preserves state — the AI's explanation is the claim, your screen is the evidence.

> ⚠️ **What it usually gets wrong:** claiming this project uses webpack, or citing a config file that doesn't exist. The 'point at a real file' clause makes that immediately checkable.

<!--
TIME: 2 min
ENERGY: Close the module on the tool they've used unknowingly for 27 videos.
WHAT TO SAY: "Last checkpoint, and the pattern is the same as last video: it explains, we verify. But watch the second half of the prompt — 'point at a real file in this repo'. That single clause turns an unfalsifiable explanation into a claim you can check in five seconds, and it's the best habit I can leave you with. Never accept an explanation of your project that doesn't reference your project."
DEMO: Run the prompt, then open the file it named. If it named `webpack.config.js`, that file doesn't exist — say so out loud.
TRANSITION: "Now let's prove the HMR claim ourselves."
-->


---

# Save the File, See It Instantly

```bash
npm run dev        # Vite dev server: watch + HMR
```

```
edit ApplicationCard.jsx
   └─ Vite detects the change (watcher)
   └─ rebuilds ONLY that module
   └─ patches it in the browser (HMR) — no full reload, state preserved
```

| Old watcher (Gulp `watch`) | Vite dev server |
|---|---|
| Recompiles, full page reload | Patches one module, keeps state |
| Seconds | Milliseconds |

> 💡 A watcher closes the feedback loop; HMR makes that loop near-instant and stateful.

> 🔗 QCTO Bridge: QCTO "Watcher task" meant Gulp's `gulp.watch()` recompiling on save. Vite's dev server is that watcher — plus HMR, which Gulp never had.

<span class="pa-badge earned">PA0805 ✅</span>

<!--
TIME: 4 min
ENERGY: Close the module out with the tool they've been using unknowingly.
WHAT TO SAY: "You've had this running since video one. A watcher notices a file changed and rebuilds. Gulp's watcher rebuilt and then reloaded the whole page — which meant you lost whatever you'd typed into the form. Vite does Hot Module Replacement: it rebuilds only the module that changed and patches it into the running app. No reload, and your state survives. That's why development feels fast now, and it's the last of the twenty-seven checkpoints."
DEMO: Half-fill the application form, then edit the card component's styling and save. The style changes and the form keeps every character you typed. Do it twice — that's the whole demo.
TRANSITION: "That's twenty-seven for twenty-seven. Let's put the whole module up on one screen."
-->

---

# Checkpoint Check — PA0805

Read the generated code against these. **Every one must be true before we move on.**

- [ ] The file it pointed at **actually exists** — check it
- [ ] It correctly identifies **Vite**, not webpack or Gulp
- [ ] It explains that HMR patches the changed module rather than reloading
- [ ] Your demo confirms it: form state survives a save
- [ ] That's 27 of 27

> 🔎 Half-fill the form, edit a component's styling, save. If your typing survives, that's HMR — you just proved the explanation instead of trusting it.

<!--
TIME: 2 min
ENERGY: Final checkpoint of the module. Land it.
WHAT TO SAY: "Check four is the one that closes out twenty-seven videos of doing this properly. It told us state survives. We don't take that. We fill the form, we change a file, and we watch. And that's the whole method: specify it, read it, check it. You didn't type less code than a student who hand-wrote all of this — you read more of it, and you know exactly why every line is there."
DEMO: Half-fill the application form, edit the card's styling, save. Style changes, typed text survives. Do it twice.
TRANSITION: "Twenty-seven for twenty-seven. Let's put the whole module on one screen."
-->


---
layout: cover
---

# Module 3 Complete 🎉

**The React Frontend Is Live**

27 Videos · 27 QCTO Checkpoints · Views · Forms · Look & Feel · Client-side

**PS04 Views:**
<span class="pa-badge earned">PA0401 ✅</span> <span class="pa-badge earned">PA0402 ✅</span> <span class="pa-badge earned">PA0403 ✅</span> <span class="pa-badge earned">PA0404 ✅</span> <span class="pa-badge earned">PA0405 ✅</span> <span class="pa-badge earned">PA0406 ✅</span> <span class="pa-badge earned">PA0407 ✅</span> <span class="pa-badge earned">PA0408 ✅</span> <span class="pa-badge earned">PA0409 ✅</span>

**PS05 Forms:**
<span class="pa-badge earned">PA0502 ✅</span> <span class="pa-badge earned">PA0505 ✅</span> <span class="pa-badge earned">PA0507 ✅</span>

**PS07 Look & Feel:**
<span class="pa-badge earned">PA0701 ✅</span> <span class="pa-badge earned">PA0702 ✅</span> <span class="pa-badge earned">PA0703 ✅</span> <span class="pa-badge earned">PA0704 ✅</span> <span class="pa-badge earned">PA0705 ✅</span>

**PS08 Client-side:**
<span class="pa-badge earned">PA0801 ✅</span> <span class="pa-badge earned">PA0802 ✅</span> <span class="pa-badge earned">PA0803 ✅</span> <span class="pa-badge earned">PA0804 ✅</span> <span class="pa-badge earned">PA0805 ✅</span> <span class="pa-badge earned">PA0806 ✅</span> <span class="pa-badge earned">PA0807 ✅</span> <span class="pa-badge earned">PA0808 ✅</span> <span class="pa-badge earned">PA0809 ✅</span> <span class="pa-badge earned">PA0810 ✅</span>

<div class="text-sm opacity-60 mt-6">All 27 checkpoints earned · 76 / 101 across the course · The frontend is complete</div>

Next Mission: **Module 4 — Web APIs & AI Integration**

<!--
WHAT TO SAY: "27 videos, 27 QCTO checkpoints — every Views, Forms, Look & Feel, and Client-side competency, taught the React way. You've built and reused components, wired forms, made it responsive, and understood the build tooling underneath. The interface is real and portfolio-ready."
ENERGY: Full pride. Pause after the badge list.
TRANSITION: "Next module — we make ApplyIQ intelligent with web APIs and AI. Go take a break, you earned it."
TIME: 1 min
-->
