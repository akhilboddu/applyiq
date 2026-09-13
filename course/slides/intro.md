---
theme: default
title: "ApplyIQ — Course Introduction"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# ApplyIQ

## Build a Real SaaS Product With React & Node.js

<div class="mt-8 flex items-center gap-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#3D3DFF]" />
<div class="text-gray-400 text-lg">Zaio Institute of Technology | Instructor: Akhil</div>
</div>

<div class="mt-12 text-sm text-gray-500">
QCTO PM-09 — Design and Build Web Applications | NQF Level 5 | SAQA 118707
</div>

<style src="./styles/zaio.css"></style>

<!--
TIME: 15s
ENERGY: High, welcoming. This is the first thing students see — set the tone.
WHAT TO SAY: "Welcome to the ApplyIQ course. My name is Akhil, and over the next seven modules, you and I are going to build and deploy a real SaaS product together — from scratch."
TRANSITION: "But first, let me tell you what makes this course different from everything else out there."
-->

---

# This Is Not a Tutorial

Most courses teach you to follow along. Copy this line. Paste that config. Build a to-do app you'll never use.

**This course is different.**

You will build a **real, deployable SaaS product** from scratch — something you can put on your CV, show in interviews, and actually use yourself.

By the end, you won't just know React and Node. You'll have **shipped** React and Node.

> 💡 "Tutorial projects don't get you hired. Shipped products do."

<!--
TIME: 45s
ENERGY: Confident, slightly provocative. You're calling out the status quo.
WHAT TO SAY: Tell them most bootcamp grads have the same to-do app on their GitHub. Emphasize that "shipped" is the keyword — not "built", not "followed along". Shipped means it's live on the internet and someone can use it right now.
COMMON QUESTION: "Is this too advanced for me?" — "If you can write a basic function in JavaScript, you're ready. We start from zero."
TRANSITION: "So how do we actually build in this course? Let me show you the workflow."
-->

---

# How We Build in This Course

## You learn the concepts. AI handles the typing.

We use **AI coding assistants** — not as a shortcut, but as a professional tool. This is how software is built in 2026.

### Your Tools
- **VS Code** — your editor
- **Claude Code** — AI assistant in your terminal
- Alternatives: **Cursor**, **Trae** (free), or any open-source model

### What AI Does
- Scaffolds boilerplate you'd otherwise copy-paste
- Generates repetitive code (CRUD endpoints, form components)
- Catches syntax errors before you run the code

<!--
TIME: 60s
ENERGY: Medium, matter-of-fact. Normalize AI usage — don't oversell it.
WHAT TO SAY: "This is how real companies ship code in 2026. AI handles the mechanical parts — the boilerplate, the repetitive patterns. Your job is to understand what it's writing and make the decisions." Emphasize that any AI tool works — they don't need Claude Code specifically.
DEMO: If recording a video version, briefly show VS Code with a terminal open. Don't demo Claude Code yet — just show the environment.
COMMON QUESTION: "Do I need to pay for Claude Code?" — "No. Cursor and Trae are free. The concepts are identical."
TRANSITION: "But here's what AI can NOT do for you — and this is the important part."
-->

---

# What AI Can't Do For You

- Decide your architecture (MVC? microservices? monolith?)
- Know if the auth flow has a security hole
- Debug why your WebSocket isn't reconnecting
- Pass your QCTO assessment for you

### What This Course Does
- Teaches you **why** things work — not just how to type them
- Every concept is explained before you build it
- You review AI output like a senior developer reviews a junior's code

> 💡 AI makes you 10x faster — but only if you understand what it's writing. Without knowledge, you're just shipping bugs faster.

<!--
TIME: 45s
ENERGY: Slightly serious. This is the "real talk" moment. Lean into it.
WHAT TO SAY: "AI is a multiplier, not a replacement. If you understand zero, 10x zero is still zero." Read through the bullet points and give a quick real-world example — "I've seen people ship login systems with passwords stored in plaintext because they let AI write it and didn't review it."
TRANSITION: "Let me show you the difference between using AI with understanding and using AI without it."
-->

---

# Knowledge Is the Multiplier

AI without understanding = dangerous. AI with understanding = unstoppable.

<div class="columns mt-6">
<div class="bg-[#1e293b] p-6 rounded-lg border border-[#FF5F56]">

### Without This Course

You prompt: *"Build me a login system"*

AI generates 80 lines. You copy-paste it. It works... until:
- Passwords are stored in plaintext
- No rate limiting on login attempts
- JWT secret is hardcoded in the source
- CSRF vulnerability you've never heard of

**You can't fix what you don't understand.**

</div>
<div class="bg-[#1e293b] p-6 rounded-lg border border-[#27C93F]">

### After This Course

You prompt: *"Build me a login system"*

AI generates 80 lines. You review it:
- "Needs bcrypt with 10+ salt rounds" ✅
- "Add rate limiting — 5 attempts per minute" ✅
- "JWT secret from environment variable" ✅
- "We're using headers not cookies, CSRF safe" ✅

**You're the senior. AI is your junior.**

</div>
</div>

<!--
TIME: 60s
ENERGY: Build from cautionary (left column) to empowering (right column). Start serious, end confident.
WHAT TO SAY: Walk through the red side first — "This is what happens when you use AI without understanding." Pause. Then the green side — "This is what happens after this course. Same AI, same prompt, completely different outcome." Emphasize the tagline: "You're the senior. AI is your junior."
COMMON QUESTION: "Will we actually learn about all those security things?" — "Yes. Module 2 covers every single one of them."
TRANSITION: "Alright, let me show you exactly what we're building."
-->

---

# What You're Going to Build

## ApplyIQ — An AI-Powered Job Application Tracker

The problem: developers apply to 50–200 jobs and lose track. Spreadsheets don't remind you to follow up, don't measure response rates, and get abandoned after two weeks.

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#3D3DFF] font-bold mb-2">📊 Dashboard</div>
Stats, charts, response rates — know where you stand at a glance.
</div>
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#3D3DFF] font-bold mb-2">📋 Kanban Board</div>
Drag-and-drop pipeline: Applied → Screening → Interview → Offer.
</div>
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#3D3DFF] font-bold mb-2">🤖 AI Cover Letters</div>
OpenAI-powered generator that streams text in real-time.
</div>
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#F5C518] font-bold mb-2">📝 Activity Timeline</div>
Every email, interview, and follow-up logged per application.
</div>
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#F5C518] font-bold mb-2">👤 Contact Tracker</div>
Recruiter names, emails, LinkedIn — never forget who you spoke to.
</div>
<div class="bg-[#1e293b] p-4 rounded-lg">
<div class="text-[#F5C518] font-bold mb-2">📱 Mobile Ready</div>
Responsive design that works on every device.
</div>
</div>

<!--
TIME: 60s
ENERGY: Excited, visual. Let the features sell themselves.
WHAT TO SAY: "This is ApplyIQ — and it solves a problem every single one of you has or will have." Briefly touch on each feature card. Emphasize the AI cover letter generator — "This one uses the OpenAI API and streams responses in real time. You'll build that in Module 4." Make the point that this is something they can actually use during their own job search.
DEMO: If you have a finished version of ApplyIQ, show a 10-second screencast or screenshot here. Otherwise, let the cards speak.
TRANSITION: "Now let me walk you through the tech stack — every tool has been chosen deliberately."
-->

---

# The Tech Stack

## Industry-Current. Employer-Relevant. Production-Grade.

<div class="columns mt-6">
<div>

### Frontend
- **React** + **Vite** — UI library + build tool
- **React Router** — Client-side navigation
- **TanStack Query** — Server state management
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Data visualization
- **@dnd-kit** — Drag-and-drop (Kanban)

### AI
- **OpenAI API** — GPT-4o-mini for cover letters
- **Server-Sent Events** — Real-time streaming

</div>
<div>

### Backend
- **Node.js** + **Express** — API server
- **Prisma ORM** — Type-safe database access
- **PostgreSQL** — Production database
- **JWT + bcrypt** — Authentication
- **Socket.io** — Real-time notifications
- **Winston** — Production logging

### DevOps
- **Vercel** — Frontend hosting (CDN)
- **Render** — Backend hosting
- **Railway** — Database hosting
- **GitHub Actions** — CI/CD pipeline

</div>
</div>

<!--
TIME: 60s
ENERGY: Medium, authoritative. You know this stack and you're explaining why each piece is here.
WHAT TO SAY: Don't just read the list. Group them: "On the frontend — React with Vite, which replaced Create React App. On the backend — Express, which is still the most-used Node framework." Highlight that every tool is something employers actually list in job descriptions. Mention that the DevOps section is Module 7 — "By the end, this is live on the internet, not just on localhost."
COMMON QUESTION: "Can I use Next.js instead of Vite?" — "You could, but we're keeping frontend and backend separate deliberately — it teaches you how APIs work. Next.js hides that."
TRANSITION: "Let me show you how these seven modules fit together."
-->

---

# The Course Journey

## 7 Modules. From Idea to Deployed Product.

<!-- Visual: course-roadmap.excalidraw diagram goes here -->

<div class="grid grid-cols-7 gap-2 mt-8 text-center text-xs">
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#F5C518]">
<div class="text-[#F5C518] font-bold text-sm">M1</div>
<div class="mt-1">Product Thinking</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#3D3DFF]">
<div class="text-[#3D3DFF] font-bold text-sm">M2</div>
<div class="mt-1">Backend API</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#61DAFB]">
<div class="text-[#61DAFB] font-bold text-sm">M3</div>
<div class="mt-1">React Frontend</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#8B5CF6]">
<div class="text-[#8B5CF6] font-bold text-sm">M4</div>
<div class="mt-1">AI Integration</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#27C93F]">
<div class="text-[#27C93F] font-bold text-sm">M5</div>
<div class="mt-1">Testing</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#FF5F56]">
<div class="text-[#FF5F56] font-bold text-sm">M6</div>
<div class="mt-1">Performance</div>
</div>
<div class="bg-[#1e293b] p-2 rounded-lg border-t-2 border-[#F5C518]">
<div class="text-[#F5C518] font-bold text-sm">M7</div>
<div class="mt-1">Deployment</div>
</div>
</div>

<div class="mt-4 text-center text-gray-400 text-sm">
Each module builds directly on the last. By Module 7, you have a live product.
</div>

<!--
TIME: 30s
ENERGY: Steady, orienting. This is a map — help them see the full picture.
WHAT TO SAY: "Seven modules. Each one builds on the last. Module 1 is planning — we don't write production code yet. Module 2 is the entire backend. Module 3 is the frontend. Module 4 adds AI. Module 5 proves it works with tests. Module 6 makes it fast. Module 7 puts it on the internet." Point at each box as you mention it.
TRANSITION: "Let me give you a quick preview of each module so you know what's coming."
-->

---

# Module 1 — Product Thinking & Project Setup

**You'll learn to think before you code.**

- Interrogate the business problem (why does ApplyIQ need to exist?)
- Identify the 6 core business needs
- Write a complete project plan: features, wireframes, data model, tech stack
- Plan the MVC architecture and state management strategy
- Set up your professional dev environment (VS Code, Git, Node.js)
- Scaffold the React + Node.js monorepo

<div class="mt-4 text-sm text-gray-400">
5 Videos | 12 Checkpoints | PA0101–PA0205
</div>

> 💡 This is the module that separates engineers from coders. Engineers plan. Coders just start typing.

<!--
TIME: 30s
ENERGY: Grounded, purposeful. Sell the value of planning.
WHAT TO SAY: "Module 1 is where we think before we code. Most beginners skip this — and then they rebuild things three times. We're not doing that." Emphasize that by the end of Module 1, they'll have a project plan, a scaffolded monorepo, and 12 QCTO checkpoints earned before writing real application code.
TRANSITION: "Module 2 is where the real coding starts."
-->

---

# Module 2 — Building the Backend API

**The entire brain of ApplyIQ gets built here.**

- Design 13 RESTful API routes (auth, CRUD, AI, activities, contacts)
- Build the Express middleware pipeline (CORS, auth, logging, error handling)
- Create 5 Prisma database models with relationships
- Implement secure authentication (bcrypt + JWT + timing attack prevention)
- Add authorization (RBAC, resource-based, API keys)
- Write Joi validation schemas for every endpoint
- Build production error handling with Winston structured logging
- Defend against CSRF attacks

<div class="mt-4 text-sm text-gray-400">
7 Videos | 42 Checkpoints | PA0201–PA1207
</div>

> 💡 After this module, your API is fully testable in Postman before you write a single line of frontend code.

<!--
TIME: 30s
ENERGY: Excited but focused. This is the heaviest module — set expectations.
WHAT TO SAY: "This is the biggest module in the course — 7 videos, 42 checkpoints. This is where you build the entire backend. Authentication, authorization, database models, validation, error handling — all of it." Emphasize that the API works standalone — "You can test every endpoint in Postman before we touch React."
TRANSITION: "Once the backend works, Module 3 builds the interface on top of it."
-->

---

# Module 3 — Building the React Frontend

**From API to interface — making it real.**

- Build a reusable component library (Badge, Input, Button, Card)
- Implement React Router with protected routes
- Build the AuthContext for global authentication state
- Create the Dashboard with live charts (Recharts)
- Build the full CRUD page with optimistic updates
- Build the Kanban board with drag-and-drop (@dnd-kit)
- Learn CSS fundamentals, Bootstrap, Sass, media queries, and Tailwind

<div class="mt-4 text-sm text-gray-400">
7 Videos | 40+ Checkpoints | PA0401–PA0810
</div>

> 💡 You'll also learn the technologies QCTO references (Bootstrap, Sass, jQuery) and understand why modern tools replaced them.

<!--
TIME: 30s
ENERGY: Visual, exciting. Students love seeing UI come to life.
WHAT TO SAY: "This is the module where it starts to look like a real app. Dashboard with charts, Kanban board you can drag and drop, a full CRUD interface." Mention the QCTO bridge — "We cover Bootstrap and Sass because QCTO requires it, but I'll also show you why Tailwind replaced them."
TRANSITION: "Module 4 is where it gets really interesting — we add AI."
-->

---

# Module 4 — AI Integration

**Add intelligence to your application.**

- Understand how AI APIs work (OpenAI, Claude, Gemini — same pattern)
- Build a cover letter generator endpoint with rate limiting
- Implement Server-Sent Events for real-time streaming
- Stream AI responses word-by-word to the React frontend
- Handle API responses professionally (status codes, error formats)
- Test AI features without calling the real API (mocking)

<div class="mt-4 text-sm text-gray-400">
4 Videos | 13 Checkpoints | PA0902–PA1207
</div>

> 💡 The same pattern works for any AI provider. Learn it once, use it everywhere.

<!--
TIME: 30s
ENERGY: High curiosity. AI is the hook for many students.
WHAT TO SAY: "This is the module people are most excited about. We connect to the OpenAI API and build a cover letter generator that streams text in real time — word by word, like ChatGPT." Emphasize the pattern: "Once you know how to call one AI API, you can call any of them. OpenAI, Claude, Gemini — same HTTP pattern."
COMMON QUESTION: "Do I need an OpenAI API key?" — "Yes, but it costs pennies. I'll show you how to set a spending limit."
TRANSITION: "Module 5 — we prove everything works."
-->

---

# Module 5 — Testing

**Prove your code works. Automatically.**

- Understand the testing pyramid (unit → integration → E2E)
- Set up Jest (backend) and Vitest (frontend) with separate test databases
- Write unit tests for React components (Badge, Button, Input)
- Write integration tests for API endpoints (Supertest)
- Implement the repository pattern for testable controllers
- Test without a database using dependency injection + fake repositories

<div class="mt-4 text-sm text-gray-400">
2 Videos | 11 Checkpoints | PA0901–PA0911
</div>

> 💡 Companies don't merge code without tests passing. This module makes you hireable.

<!--
TIME: 30s
ENERGY: Professional, serious. Testing is unglamorous but career-defining.
WHAT TO SAY: "I know testing isn't the sexy part. But this is the module that separates juniors from mid-levels. Every company runs tests before merging code. If you can write tests, you're already ahead of 80% of bootcamp grads." Mention the repository pattern — "We refactor our controllers to be testable without a database. This is a real architectural pattern used in production."
TRANSITION: "Module 6 makes everything fast."
-->

---

# Module 6 — Performance & Real-Time

**Make ApplyIQ fast and alive.**

- Implement server-side caching (node-cache, cache-aside pattern, TTL strategy)
- Implement client-side caching (TanStack Query, stale-while-revalidate)
- Build real-time notifications with Socket.io WebSockets
- Push status change events from server to client
- Build the notification bell component

<div class="mt-4 text-sm text-gray-400">
2 Videos | 6 Checkpoints | PA1101–PA1106
</div>

> 💡 Two-layer caching: server cache reduces database queries, client cache reduces API calls. Your app feels instant.

<!--
TIME: 30s
ENERGY: Technical, precise. Caching and WebSockets are impressive to interviewers.
WHAT TO SAY: "Two things happen in this module. First, we make the app fast with two-layer caching. Second, we make it alive with WebSockets — when something changes on the server, the client updates instantly without refreshing." Mention that Socket.io and caching are common interview topics.
TRANSITION: "And finally — Module 7. We ship it."
-->

---

# Module 7 — Deployment

**Ship it to production. Make it real.**

- Deploy the React frontend to Vercel (100+ global edge locations)
- Deploy the Node.js backend to Render (auto-deploy on push)
- Deploy PostgreSQL to Railway (managed database)
- Upload images to Cloudinary (CDN-optimized)
- Set up CI/CD with GitHub Actions (tests block bad deployments)
- Final production testing checklist

<div class="mt-4 text-sm text-gray-400">
4 Videos | 5 Checkpoints | PA1301–PA1305
</div>

> 💡 By the end of this module, ApplyIQ is live on the internet. Screenshot it. Put it on your CV.

<!--
TIME: 30s
ENERGY: Triumphant. This is the payoff. Let them feel the finish line.
WHAT TO SAY: "This is the module where everything comes together. Your app goes from localhost to a real URL that anyone in the world can visit. Frontend on Vercel, backend on Render, database on Railway, CI/CD on GitHub Actions. Screenshot it. Put it on your CV. Send the link to recruiters."
TRANSITION: "So what do you actually walk away with? Let me break it down."
-->

---

# What You'll Have When You're Done

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

### 🎯 Portfolio Artifacts
- A **live, deployed SaaS product** (not localhost)
- A **clean GitHub repository** with conventional commits
- **Pull requests** demonstrating technical communication
- A **test suite** with >70% coverage
- A **CI/CD pipeline** that blocks broken code

</div>
<div>

### 🧠 Professional Skills
- Full-stack architecture (React + Node + PostgreSQL)
- AI API integration (works for any provider)
- Authentication & authorization (3 approaches)
- Testing strategy (unit + integration)
- Production deployment & DevOps
- **101 QCTO PM-09 checkpoints** across 13 problem sets

</div>
</div>

<div class="mt-8 text-center">

### This isn't a project you built following a tutorial.

### This is a product you **shipped**.

</div>

<!--
TIME: 45s
ENERGY: Confident, closing energy. Make them feel what they'll have.
WHAT TO SAY: Walk through both columns. On the left: "These are things you can show. A live URL, a clean GitHub, real pull requests." On the right: "These are things you can talk about in interviews." Pause on the final line — "This is a product you shipped." Let it land.
TRANSITION: "Now let me explain the QCTO accreditation — what it means and why it matters."
-->

---

# This Course Is QCTO Accredited

## What does that actually mean?

**QCTO** (Quality Council for Trades and Occupations) sets the national standard for what a qualified Software Developer in South Africa must be able to do.

**PM-09** is the practical skills module: "Design and Build Web Applications." It defines **101 checkpoints** across 13 skill areas you must demonstrate.

**You don't pass by writing exams.** You pass by building real software and proving each checkpoint through your work. That's exactly what this course does.

<!--
TIME: 45s
ENERGY: Informative, grounding. Students need to understand this isn't just another course — it counts toward a qualification.
WHAT TO SAY: "QCTO is South Africa's quality council for occupational qualifications. PM-09 is the practical module for web development. It has 101 checkpoints — and you earn them by building, not by writing exams." Emphasize that this is a real NQF Level 5 qualification. For students who don't care about QCTO — "Even if you're not doing the formal qualification, the checkpoints ensure you learn everything a professional developer needs."
COMMON QUESTION: "Do I get a certificate?" — "The QCTO certification is through Zaio's formal programme. This course covers all PM-09 practical checkpoints."
TRANSITION: "Here's a breakdown of all 13 skill areas."
-->

---

# 101 Checkpoints. 13 Skill Areas. All Earned by Building.

<div class="grid grid-cols-4 gap-2 text-xs">
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#F5C518] font-bold">PS01</span> <span class="text-gray-400">Planning · 8 · M1</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#3D3DFF] font-bold">PS02</span> <span class="text-gray-400">Middleware · 8 · M1–2</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#3D3DFF] font-bold">PS03</span> <span class="text-gray-400">Controllers · 9 · M2</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#61DAFB] font-bold">PS04</span> <span class="text-gray-400">Views · 9 · M3</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#3D3DFF] font-bold">PS05</span> <span class="text-gray-400">Models · 8 · M2–3</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#3D3DFF] font-bold">PS06</span> <span class="text-gray-400">Database · 8 · M2</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#61DAFB] font-bold">PS07</span> <span class="text-gray-400">Look & Feel · 5 · M3</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#61DAFB] font-bold">PS08</span> <span class="text-gray-400">Client-Side · 10 · M3</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#27C93F] font-bold">PS09</span> <span class="text-gray-400">Testing · 11 · M2,5</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#FF5F56] font-bold">PS10</span> <span class="text-gray-400">Security · 7 · M2–3</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#8B5CF6] font-bold">PS11</span> <span class="text-gray-400">Performance · 6 · M6</span></div>
<div class="bg-[#1e293b] p-2 rounded"><span class="text-[#8B5CF6] font-bold">PS12</span> <span class="text-gray-400">Web APIs · 7 · M2,4</span></div>
<div class="bg-[#1e293b] p-2 rounded col-span-4 text-center"><span class="text-[#F5C518] font-bold">PS13</span> <span class="text-gray-400">Deployment · 5 · M7</span></div>
</div>

<!--
TIME: 30s
ENERGY: Quick, reference-style. Don't read every box — give the big picture.
WHAT TO SAY: "13 skill areas, 101 checkpoints. Planning, middleware, controllers, views, models, database, look and feel, client-side scripting, testing, security, performance, web APIs, and deployment. Every single one is earned by building ApplyIQ — not by answering multiple choice questions." Point at the grid generally, don't read each cell.
TRANSITION: "Now, one important thing about the technology choices."
-->

---

# A Note on Technology

## QCTO PM-09 Was Written for ASP.NET MVC. We Teach React & Node.

**Why?** Because React and Node.js are what companies hire for in 2026. The QCTO competencies are **patterns**, not frameworks.

| QCTO Term | What We Teach | Same Competency? |
|---|---|---|
| Razor Templates | JSX Components | ✅ Both render UI from data |
| Entity Framework | Prisma ORM | ✅ Both map objects to databases |
| Action Filters | Express Middleware | ✅ Both intercept requests |
| ASP.NET Identity | JWT + bcrypt | ✅ Both authenticate users |
| Tag Helpers | JSX Props + Events | ✅ Both bind data to views |
| SQL Server | PostgreSQL | ✅ Both are relational databases |
| jQuery | Fetch API / Axios | ✅ Both call APIs from the browser |
| Bootstrap | Tailwind CSS | ✅ Both style web applications |

Throughout the course, we'll show you **both** — the QCTO-referenced technology and the modern equivalent. You'll understand the pattern, not just the framework.

> 💡 MVC is a pattern, not a technology. Learn the pattern. Use any framework.

<!--
TIME: 60s
ENERGY: Thoughtful, educational. This is important context for students worried about QCTO alignment.
WHAT TO SAY: "QCTO was written with ASP.NET in mind. We teach React and Node. But here's the thing — the competencies are the same. Razor templates and JSX both render UI from data. Entity Framework and Prisma both map objects to databases." Walk through 3-4 rows of the table, not all 8. End with: "MVC is a pattern, not a technology. Learn the pattern, use any framework."
COMMON QUESTION: "Will I be at a disadvantage if the assessment expects ASP.NET?" — "No. We teach both sides throughout the course. You'll know the QCTO terms AND the modern equivalents."
TRANSITION: "Alright. Enough talking. Let's start building."
-->

---
layout: cover
---

# Ready?

## Module 1 starts now.

<div class="mt-8 text-gray-400">
Open your laptop. Open VS Code. Let's build something real.
</div>

<!--
TIME: 10s
ENERGY: High, punchy. End on a call to action. Smile at the camera.
WHAT TO SAY: "Open your laptop. Open VS Code. Module 1 starts right now. Let's build something real."
TRANSITION: Cut to Module 1, Video 1.
-->
