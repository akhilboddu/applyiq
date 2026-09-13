---
theme: default
title: "ApplyIQ — Module 1: Product Thinking & Project Setup"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# ApplyIQ

## Build a Real SaaS Product With React & Node.js

Module 1 — Product Thinking & Project Setup

<div class="mt-8 flex items-center gap-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#3D3DFF]" />
<div class="text-sm opacity-60">Zaio Institute of Technology | Instructor: Akhil | zaio.io</div>
</div>

<style src="./styles/zaio.css"></style>

<!-- Visual: Dark background with subtle dot-grid pattern, yellow accent line under heading, blue-purple glow on title -->

<!--
TIME: 15s
ENERGY: High, warm. Welcome them back if they watched the intro, or welcome them fresh.
WHAT TO SAY: "Module 1 — Product Thinking and Project Setup. This is where we stop talking about what we're going to build and actually start building it."
TRANSITION: "Let's jump into Video 1."
-->

---
layout: section
---

# SERIES 1 OF 5

## Think Like a Product Engineer, Not a Tutorial Follower

Duration: 10–12 minutes

<span class="pa-badge">PA0101</span> <span class="pa-badge">PA0102</span> <span class="pa-badge">PA0106</span> <span class="pa-badge">PA0107</span> <span class="pa-badge">PA0108</span>

<!-- Visual: Subtle code/terminal icon in background -->

<!--
TIME: 10s
ENERGY: Focused, setting the agenda.
WHAT TO SAY: "Video 1 — we're going to think like product engineers. By the end of this video, you'll have interrogated the business problem, identified the core needs, and started your project plan. Five QCTO checkpoints in one video."
TRANSITION: "Let's start with the most important question."
-->

---

# Tutorial Projects Won't Get You Hired

Following along to YouTube builds knowledge — but it doesn't demonstrate that you can ship. What hiring managers want to see is that you can take a problem, architect a solution, and build it from start to finish. That is what this course is about.

<div class="columns">
<div class="column">

### Tutorial Project (To-Do List)

A grey, forgettable exercise that every bootcamp graduate has.

</div>
<div class="column">

### Portfolio Product (ApplyIQ)

A real, working SaaS product that makes hiring managers pay attention.

</div>
</div>

> 💡 "By the end of this course, you will have built and deployed a real, working SaaS product."

<!--
TIME: 45s
ENERGY: Direct, slightly provocative. Challenge their assumptions.
WHAT TO SAY: "If you open any bootcamp grad's GitHub right now, you'll find a to-do app, a weather app, and maybe a calculator. Every single one looks the same. Hiring managers scroll past them." Pause. "ApplyIQ is different — it's a full SaaS product with auth, AI, real-time features, and a production deployment. That's what gets you interviews."
COMMON QUESTION: "Can I still use this project if I already have a portfolio?" — "Absolutely. This replaces your weakest project."
TRANSITION: "Let me show you exactly what we're building."
-->

---

# This Is What You're Going to Build

ApplyIQ is a full-stack, AI-powered job application tracker. It is a real product — something you can use yourself while job hunting, and something that will make hiring managers pay attention.

<div class="grid grid-cols-2 gap-4 mt-6">

- 📊 Dashboard & Analytics
- 📋 Kanban Board (drag & drop)
- 🤖 AI Cover Letter Generator
- 📅 Application Activity Timeline
- 👤 Contact Tracker per Application
- 📱 Mobile Responsive Design

</div>

<!-- Visual: Mockup screenshot placeholder of the finished app dashboard -->

<!--
TIME: 30s
ENERGY: Excited, visual. Let the feature list generate curiosity.
WHAT TO SAY: "Dashboard with charts, a Kanban board you can drag and drop, an AI cover letter generator that streams responses in real time, an activity timeline, contact tracking, and it all works on mobile." If you have a screenshot or demo of the finished product, show it briefly here.
DEMO: Show the finished ApplyIQ app if available — even a 5-second screencast of the dashboard. If not available yet, describe what it will look like.
TRANSITION: "But before we build any of this, we need to understand the problem it solves."
-->

---

## <span class="pa-badge">PA0101</span> — Interrogate the Business Problem

# Understand the Problem Before Writing Any Code

Professional engineers invest time understanding the problem before touching a keyboard. Junior developers want to start coding immediately. Senior developers know that this investment saves weeks of building the wrong thing.

> 💡 "What is the pain that users of ApplyIQ are feeling right now, before this product exists?"

<!-- Visual: Icon of a magnifying glass over a document -->

<!--
TIME: 45s
ENERGY: Slow down. This is a mindset shift — planning before coding.
WHAT TO SAY: "This is PA0101 — interrogate the business problem. Before you write a single line of code, you need to understand the pain you're solving. Not what features you want to build — what problem the user has." Ask the audience: "Think about the last time you applied for jobs. How did you track them? A spreadsheet? Your email inbox? Your memory?"
COMMON QUESTION: "Isn't this just for product managers?" — "No. Every developer at a startup does this. And even at big companies, the best engineers understand the business problem, not just the Jira ticket."
TRANSITION: "Let me show you the reality of job hunting."
-->

---

# The Reality of Job Hunting in 2026

Developers apply to 50, 80, sometimes 200 jobs over several months across LinkedIn, Indeed, company websites, and referrals. Most people try to track this in a spreadsheet — but the spreadsheet doesn't remind you to follow up, doesn't measure your response rate, and gets abandoned after two weeks.

- ❌ No single place to track all applications
- ❌ No intelligence or reminders to follow up
- ❌ No help writing tailored cover letters

> 💡 PA0101 ✅ — "Job seekers lose control of their job search because there is no dedicated, intelligent tool to manage it."

<!--
TIME: 45s
ENERGY: Empathetic, relatable. Many students are job hunting right now.
WHAT TO SAY: "You apply to 50 jobs across LinkedIn, Indeed, company websites. You get some responses, you don't hear back from others. A recruiter emails you and you can't remember which company they're from. Your spreadsheet has 30 rows and you haven't updated it in two weeks." Pause. "That's the problem. No dedicated tool exists to manage this intelligently."
COMMON QUESTION: "Aren't there apps that already do this?" — "Some exist, but they're either too complex, too expensive, or missing AI features. The point is we're building a real solution to a real problem — and learning full-stack development by doing it."
TRANSITION: "Now that we understand the problem, let's translate it into features."
-->

---

## <span class="pa-badge">PA0102</span> — Identify the Set of Business Needs

# What Does the User Actually Need?

Translating the problem into features means asking what a user needs to solve the problem — not listing random ideas. Each need must map directly back to the pain identified in PA0101.

<!-- Visual: Arrow from "Problem" → "Business Needs" -->

<!--
TIME: 20s
ENERGY: Transitional, methodical. Bridge from problem to solution.
WHAT TO SAY: "PA0102 — we take the problem and translate it into specific business needs. Not a feature wishlist — actual needs that map directly to the pain we just identified."
TRANSITION: "Here are the six core needs for ApplyIQ."
-->

---

# ApplyIQ's Core Business Needs

| # | Need | Why It Matters |
|---|------|---------------|
| 1 | Secure user accounts | Job data is personal and private |
| 2 | Add / edit / delete applications | Core CRUD functionality |
| 3 | Visual Kanban pipeline | See every application's status at a glance |
| 4 | Activity log per application | Track every email, interview, and follow-up |
| 5 | Analytics dashboard | Measure response rate and interview conversion |
| 6 | AI cover letter generator | Tailored letters without starting from scratch |

<div class="text-sm opacity-60 mt-8">PA0102 ✅ — Write these in your own words in your course workbook.</div>

<!--
TIME: 60s
ENERGY: Structured, teaching. Walk through the table methodically.
WHAT TO SAY: Walk through each row: "Need 1 — secure accounts. Job data is personal. You don't want someone else seeing where you applied." Continue through each, briefly explaining the 'why'. Emphasize that every need traces back to the problem — "There's no random 'dark mode' or 'social feed' here. Every need solves a specific pain."
DEMO: If using a whiteboard or drawing tool, sketch a quick arrow diagram: Problem on the left, six needs on the right, arrows connecting them.
COMMON QUESTION: "Why only six? What about notifications, settings, etc.?" — "Those are features, not business needs. We'll add features later — needs come first."
TRANSITION: "Now we turn these needs into a formal project plan."
-->

---

## <span class="pa-badge">PA0106</span> · <span class="pa-badge">PA0107</span> — Create the Project Plan

# A Project Plan Is Written Before a Single Line of Code

In a real company, this document is what a tech lead writes and hands to the junior developers. Today, you are writing it for yourself — but in exactly the same way a professional would. Your project plan has four sections.

<div class="grid grid-cols-2 gap-4 mt-6">

1. **Feature List**
2. **UI Wireframes**
3. **Data Structure**
4. **Tech Stack & Architecture**

</div>

<!--
TIME: 30s
ENERGY: Professional, authoritative. You're teaching them how real teams work.
WHAT TO SAY: "In a real company, a tech lead writes this document before any developer touches code. Today you're the tech lead. Your project plan has four sections: feature list, wireframes, data structure, and tech stack." Emphasize that this is not busywork — "This document saves you from rebuilding things three times."
TRANSITION: "Let's start with the feature list."
-->

---

# Section 1 — Feature List: Your Scope Boundary

The feature list defines what version one of the product does. Anything not on this list is out of scope. This discipline is how projects actually get finished.

<div class="columns">
<div class="column">

- User registration & login
- Create, read, update, delete applications
- Kanban board with drag-and-drop
- Application detail view + activity timeline

</div>
<div class="column">

- Contact tracking per application
- Dashboard with analytics & charts
- AI cover letter generator
- Responsive mobile design

</div>
</div>

> 💡 "If it's not on the feature list, it's out of scope for v1."

<!--
TIME: 45s
ENERGY: Disciplined, focused. Teach the concept of scope.
WHAT TO SAY: "This is your scope boundary. Eight features. If a feature is not on this list, it doesn't go into version 1. Period." Read through the features briefly. Then: "This is how projects actually get finished — you draw a line and you ship what's inside it. Feature creep is the number one reason side projects die."
COMMON QUESTION: "What if I want to add more features later?" — "That's v2. Ship v1 first. You can't improve something that doesn't exist yet."
TRANSITION: "Section 2 — wireframes."
-->

---

# Section 2 — UI Wireframes: Communicate Before You Build

You don't need to be a designer. You need to communicate the layout of each screen so anyone reading this document understands what the app looks like. Drawing wireframes forces you to think through the UI before you build it — saving enormous time.

**Five screens to sketch:**

1. Login Page
2. Dashboard
3. Kanban Board
4. Application Detail Page
5. AI Tools Page

<!-- Visual: Simple wireframe sketch placeholder showing a dashboard layout -->

<!--
TIME: 45s
ENERGY: Relaxed, encouraging. Students often feel intimidated by "design."
WHAT TO SAY: "You don't need to be a designer. Wireframes are boxes and lines. Their purpose is to communicate — if someone reads your project plan, they should understand what each screen looks like." Mention tools: "Use pen and paper, Excalidraw, Figma — whatever you're comfortable with. Boxes and labels are enough."
DEMO: If recording, quickly sketch a rough wireframe on screen — a rectangle for the page, a sidebar, a header, some placeholder boxes. Show that it takes 30 seconds and communicates the layout clearly.
COMMON QUESTION: "Do wireframes need to look good?" — "No. They need to communicate. A box that says 'chart' is a perfectly good wireframe for a chart."
TRANSITION: "Section 3 — the data structure."
-->

---

# Section 3 — Data Structure: Five Core Entities

| Entity | Key Fields |
|--------|-----------|
| User | id, name, email, passwordHash, createdAt |
| Application | id, userId, companyName, jobTitle, status, appliedDate, notes |
| Activity | id, applicationId, type, date, notes |
| Contact | id, applicationId, name, role, email, linkedInUrl |
| CoverLetter | id, applicationId, content, createdAt |

<div class="text-sm opacity-60 mt-8">We will build all of these in the database module. For now, knowing they exist and how they relate is what matters.</div>

<!--
TIME: 60s
ENERGY: Technical but accessible. Don't overwhelm — just introduce the shape.
WHAT TO SAY: "Five entities. User, Application, Activity, Contact, CoverLetter. Each one maps to a table in the database." Walk through the relationships: "A User has many Applications. An Application has many Activities, Contacts, and CoverLetters. That's the entire data model." Emphasize: "You don't need to memorize the fields — we'll build them in Module 2. Right now, just understand the shape."
DEMO: If using a whiteboard, draw five boxes with arrows showing the relationships (User -> Application -> Activity/Contact/CoverLetter).
COMMON QUESTION: "What's passwordHash? Why not just password?" — "Great question — we never store actual passwords. We'll cover this in depth in Module 2's security section."
TRANSITION: "And the final section — tech stack and architecture."
-->

---

# Section 4 — Tech Stack & Architecture

<div class="columns">
<div class="column">

### Frontend

React + Vite · TanStack Query · React Router · Tailwind CSS · Recharts · DnD Kit

### Backend

Node.js + Express · Prisma ORM · PostgreSQL · JWT Auth · bcrypt

</div>
<div class="column">

### AI & Deployment

OpenAI API · Vercel (frontend) · Render (backend) · Railway (database) · GitHub Actions (CI/CD)

</div>
</div>

> 💡 "Know why you chose each tool — interviewers will ask."

<!--
TIME: 45s
ENERGY: Confident, practical. You're justifying professional choices.
WHAT TO SAY: "Every tool here was chosen deliberately. React because it's what companies hire for. Vite because it replaced Create React App. Express because it's the most-used Node framework. PostgreSQL because it's production-grade and free." Don't read every item — pick 4-5 and explain why. End with: "Interviewers will ask you why you chose these tools. 'Because the tutorial used it' is a bad answer. 'Because it solves this specific problem' is a good one."
COMMON QUESTION: "Why not MongoDB?" — "ApplyIQ has relationships — users have applications, applications have activities. Relational databases handle this better than document stores."
TRANSITION: "That's the project plan complete. Let's see what checkpoints we just earned."
-->

---

# Video 1 — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0101** — Interrogated the business problem
- ✅ **PA0102** — Identified business needs
- ✅ **PA0106** — Created a project plan
- ✅ **PA0107** — Documented functionality, UI, structure & data storage

</div>

<div class="text-sm opacity-60 mt-8">Next up: Video 2 — Setting Up Your Development Environment</div>

<!--
TIME: 15s
ENERGY: Satisfied, checkpoint moment. Let them feel the progress.
WHAT TO SAY: "Four checkpoints earned — and we haven't written a single line of code yet. That's the point. Planning is work. Real work." Brief pause. "Video 2 — we set up our development environment."
TRANSITION: Cut to Video 2 section card.
-->

---
layout: section
---

# SERIES 2 OF 5

## Your Professional Development Environment

Duration: 8–10 minutes

<span class="pa-badge">PA0103</span> <span class="pa-badge">PA0104</span> <span class="pa-badge">PA0105</span>

<!--
TIME: 10s
ENERGY: Fresh start energy. New video, new topic.
WHAT TO SAY: "Video 2 — setting up your professional development environment. By the end of this video, you'll have VS Code, Node.js, Git, and an AI coding assistant ready to go."
TRANSITION: "Here's what you need."
-->

---

# Your Dev Environment

<div class="grid grid-cols-2 gap-6">
<div>

### The Essentials
- **VS Code** — your code editor
- **Node.js v20 LTS** + npm
- **Git** + GitHub account

### AI Coding Assistant (pick one)
- **Claude Code** — what I use in this course (terminal-based, works with VS Code)
- **Cursor** — VS Code fork with AI built in
- **Trae** — free and open source
- Or any editor + open-source model

</div>
<div>

### Why AI?
In 2026, writing every line by hand is like doing long division instead of using a calculator. You still need to know what division IS — but the tool handles the mechanical part.

In this course:
- **I explain the concept** (slides + diagrams)
- **We build it together** (you code along with me)
- **AI handles the boilerplate** (scaffolding, repetitive patterns)
- **You make the decisions** (architecture, security, what to keep or change)

</div>
</div>

> 💡 AI doesn't replace what you're learning here. It amplifies it. The concepts are the hard part — the typing is the easy part.

<!--
TIME: 60s
ENERGY: Practical, welcoming. Remove friction — make setup feel easy.
WHAT TO SAY: "Three essentials — VS Code, Node.js, and Git. You probably already have some of these." Then cover the AI assistant choice: "I use Claude Code in this course, but you can use Cursor, Trae, or anything else. The concepts are the same." Walk through the four-point workflow on the right: "I explain it, we build it together, AI handles the boilerplate, you make the decisions."
DEMO: Show VS Code open with a terminal. Show `node --version` and `git --version` running in the terminal. Don't install anything on screen — link to setup guides in the course resources.
COMMON QUESTION: "Can I use a different editor entirely?" — "Yes. The concepts work in any editor. I use VS Code because it has the best ecosystem."
TRANSITION: "Let me show you the VS Code extensions that will make your life easier."
-->

---

# VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| ESLint | Catches code errors before you run the app |
| Prettier | Auto-formats code on save |
| GitLens | Visualises Git history inline |
| Tailwind CSS IntelliSense | Autocomplete for Tailwind classes |
| Prisma | Syntax highlighting for database schema |
| Thunder Client | Test API endpoints without leaving VS Code |

### Claude Code Setup (if using)

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Start it in your project directory
cd applyiq
claude
```

That's it. It reads your codebase and you talk to it in plain English. We'll use it throughout the course.

<!--
TIME: 60s
ENERGY: Hands-on, practical. This is a setup slide — keep it moving.
WHAT TO SAY: Quickly go through each extension: "ESLint catches errors. Prettier formats your code automatically. GitLens shows you who wrote what. Tailwind IntelliSense autocompletes CSS classes. Prisma highlights your database schema. Thunder Client lets you test APIs without leaving VS Code." Then show the Claude Code install: "Two commands. Install it, start it in your project folder, done."
DEMO: Open VS Code. Go to Extensions panel. Show one or two extensions being installed. Then open the terminal, run `claude`, show it starting up. Keep this under 30 seconds — don't do a full Claude Code demo here.
COMMON QUESTION: "Is Thunder Client like Postman?" — "Yes, but it lives inside VS Code. We'll use both throughout the course."
TRANSITION: "Now let's talk architecture — MVC."
-->

---

## <span class="pa-badge">PA0103</span> · <span class="pa-badge">PA0104</span> · <span class="pa-badge">PA0105</span> — Plan the MVC Architecture

# ApplyIQ Is an MVC Application

Model-View-Controller is the architectural pattern that separates concerns in a web application. Even though we are using React and Node rather than a traditional server-rendered MVC framework, the same principles apply — and understanding them is what PA0103 through PA0105 require.

<div class="grid grid-cols-3 gap-4 mt-6">
<div>

### Model

Prisma schema, database entities, business logic

</div>
<div>

### View

React components, pages, UI layer

</div>
<div>

### Controller

Express route handlers, API endpoints

</div>
</div>

<!--
TIME: 60s
ENERGY: Foundational, important. Slow down — this is a core concept.
WHAT TO SAY: "MVC — Model, View, Controller. This is the most important architectural pattern in web development." Walk through each: "Model is your data — Prisma schema, database entities. View is what the user sees — React components. Controller is the logic in between — Express route handlers that receive requests and send responses." Emphasize: "Even though we're not using a traditional MVC framework like ASP.NET or Rails, the pattern is exactly the same."
DEMO: Draw three boxes on screen (or use a prepared diagram): Model, View, Controller with arrows showing the flow — User -> Controller -> Model -> Controller -> View -> User.
COMMON QUESTION: "If React is the View, where does state management fit?" — "Great question — that's the next slide."
TRANSITION: "Let's talk about state management."
-->

---

## <span class="pa-badge">PA0104</span> — State Management Architecture

# State Management: Where Data Lives and How It Flows

Every web application needs a strategy for managing data across components. ApplyIQ uses three layers — each solving a different problem.

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">
<div>

### Server State (TanStack Query)

Cached API responses (applications, user profile, dashboard stats)

```javascript
useQuery({
  queryKey: ['applications'],
  queryFn: api.getApplications
})
```

*"80% of your data comes from the server. TanStack Query manages it automatically."*

</div>
<div>

### Auth State (React Context)

Current user, JWT token, login/logout functions

```javascript
const { user, login, logout }
  = useAuth()
```

*"Global state that every component needs. Context is the right tool."*

</div>
<div>

### Form State (Component State)

Input values, validation errors, submission status

```javascript
const [formData, setFormData]
  = useState({
    company: '',
    position: ''
  })
```

*"Temporary data that dies when the form closes. useState is perfect."*

</div>
</div>

<!--
TIME: 90s
ENERGY: Technical, deliberate. This is complex — take your time.
WHAT TO SAY: "Three types of state, three different tools. Don't use one tool for everything." Walk through each column: "Server state — data from your API. TanStack Query handles caching, refetching, and loading states automatically. Auth state — who is logged in. React Context makes this available everywhere. Form state — temporary input values. useState is perfect because the data dies when the form closes."
DEMO: Show the three code snippets. Don't run them — just read through them and explain what each does. "useQuery fetches and caches. useAuth provides the current user. useState holds temporary form data."
COMMON QUESTION: "Why not just use Redux for everything?" — "Next slide covers that."
TRANSITION: "Let me explain why NOT Redux, and bridge this to QCTO."
-->

---

# State Management: Flow & QCTO Bridge

**State flow:** User clicks "Add Application" → Form state captures input → API POST → TanStack Query invalidates cache → Dashboard re-renders with new data

<div class="qcto-bridge mt-6">

**QCTO Bridge:** ASP.NET MVC uses ViewBag/ViewData for per-request state, TempData for cross-request, and Session for persistent state. Our three layers solve the same problems: server state = ViewBag (data from controller), auth state = Session (who is logged in), form state = ViewData (temporary display data).

</div>

> 💡 "Why NOT Redux? ApplyIQ's data is 80% server-derived. TanStack Query handles that. Redux is for complex client-only state (real-time editors, offline-first apps). Don't add complexity you don't need."

<div class="text-sm opacity-60 mt-4">PA0104 ✅ — State management architecture planned</div>

<!--
TIME: 60s
ENERGY: Clarifying, decisive. Students hear about Redux everywhere — address it directly.
WHAT TO SAY: Walk through the state flow first: "User clicks a button, form captures the input, we POST to the API, TanStack Query invalidates the cache, and the dashboard re-renders. That's the entire flow." Then the QCTO bridge: "If your QCTO material mentions ViewBag and TempData, those are ASP.NET's version of the same concept. Server state, auth state, form state — same problems, modern tools." Then address Redux: "You don't need Redux here. 80% of your data comes from the server. TanStack Query handles that better than Redux ever could."
COMMON QUESTION: "Will we use Redux at all in this course?" — "No. And I'll explain why that's the right decision. Most apps don't need it."
TRANSITION: "Now let's look at how the project is structured on disk."
-->

---

# One Repository, Two Applications

ApplyIQ uses a monorepo structure — a single Git repository containing both the frontend (client) and backend (server) as separate sub-projects. This mirrors how many professional teams organise full-stack applications.

```
applyiq/
├── client/          ← React frontend (Vite)
│   ├── src/
│   └── package.json
├── server/          ← Node.js backend (Express)
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   └── package.json
└── package.json     ← Root (runs both with concurrently)
```

<!--
TIME: 45s
ENERGY: Practical, orienting. Help them understand where files live.
WHAT TO SAY: "One repo, two apps. The client folder is the React frontend — built with Vite. The server folder is the Node.js backend — built with Express. The root package.json ties them together with a tool called concurrently, which lets you start both with a single command." Point at each folder in the tree: "You'll spend most of Module 2 in the server folder and most of Module 3 in the client folder."
DEMO: If you have the project scaffolded, open VS Code and show the folder structure in the file explorer sidebar. Expand the client and server folders briefly.
COMMON QUESTION: "Why not separate repos?" — "A monorepo is simpler for a single team. You see both sides in one place. Separate repos make sense when different teams own different services."
TRANSITION: "Let's see what checkpoints we earned in Video 2."
-->

---

# Video 2 — Checkpoints Earned

- ✅ **PA0103** — Planned the MVC web application architecture
- ✅ **PA0104** — Planned overall architecture and state management
- ✅ **PA0105** — Planned models, controllers, and views

<div class="text-sm opacity-60 mt-8">Next up: Video 3 — Git & GitHub Setup</div>

<!--
TIME: 15s
ENERGY: Quick checkpoint. Keep momentum.
WHAT TO SAY: "Three more checkpoints earned. We've planned the MVC architecture, the state management strategy, and how models, controllers, and views map to our tech stack. Seven checkpoints total so far — still no production code."
TRANSITION: "Video 3 — Git and GitHub. Your professional portfolio starts now."
-->

---
layout: section
---

# VIDEO 3 OF 5

## Git & GitHub: Your Professional Portfolio Starts Now

Duration: 8 minutes

<span class="pa-badge">PA0106</span>

<!--
TIME: 10s
ENERGY: Professional, motivating. Git matters for careers.
WHAT TO SAY: "Video 3 — Git and GitHub. This isn't just version control — this is your professional reputation as a developer."
TRANSITION: "Let me explain why."
-->

---

# Your Git History Is Your Professional Reputation

When you work remotely, your teammates cannot see you working. The only window they have into your work is your Git commits and your pull requests. A clean, professional Git workflow communicates that you have done this before — even if it is your first job.

<div class="columns">
<div class="column">

### BAD commits

- "fixed stuff"
- "changes"
- "asdfasdf"

</div>
<div class="column">

### GOOD commits

- `feat: add JWT auth middleware`
- `fix: resolve CORS error`
- `test: add unit tests for routes`

</div>
</div>

<!--
TIME: 45s
ENERGY: Real talk. Show the contrast clearly.
WHAT TO SAY: "When you work remotely — and most of you will — your teammates can't see you working. They can't see you thinking, debugging, or problem-solving. The only thing they see is your Git history." Read the bad commits: "'fixed stuff', 'changes', 'asdfasdf'. I've seen all of these. They tell me nothing." Then the good commits: "'feat: add JWT auth middleware' — I know exactly what changed and why." Emphasize: "Your Git history is your professional reputation. Treat it that way."
COMMON QUESTION: "Does anyone actually read commit messages?" — "Yes. Every code reviewer reads them. Every senior dev reads them. And when something breaks in production at 2am, the first thing you check is the commit log."
TRANSITION: "Let me show you the format we use in this course."
-->

---

# Every Commit in This Course Follows This Format

Conventional Commits is an industry-standard specification for writing commit messages. It makes your history readable, enables automated changelog generation, and signals professionalism to any engineer who reviews your code.

> 💡 `type: short description`

| Type | When to Use |
|------|------------|
| feat | New feature added |
| fix | Bug fixed |
| docs | Documentation updated |
| refactor | Code restructured, no behaviour change |
| test | Tests added or updated |
| chore | Maintenance, dependency updates |

<!--
TIME: 45s
ENERGY: Teaching, structured. This is a reference they'll come back to.
WHAT TO SAY: "Conventional Commits — this is the industry standard. Every commit starts with a type, then a colon, then a short description." Walk through the types: "feat for new features, fix for bug fixes, docs for documentation, refactor when you restructure without changing behavior, test for tests, chore for maintenance." Emphasize: "We use this format for every single commit in the course. By the end, it'll be muscle memory."
DEMO: Open a terminal. Show a quick example: `git commit -m "feat: add user registration endpoint"`. Don't actually run it — just type it and explain the format.
COMMON QUESTION: "What about 'style' or 'perf' types?" — "Those exist too, but these six cover 95% of what you'll need."
TRANSITION: "Video 4 — we start actually scaffolding the project."
-->

---
layout: section
---

# VIDEO 4 OF 5

## Scaffolding the Project: React + Node Monorepo

Duration: 12–15 minutes

<span class="pa-badge">PA0201</span> <span class="pa-badge">PA0203</span> <span class="pa-badge">PA0204</span> <span class="pa-badge">PA0205</span>

<!--
TIME: 10s
ENERGY: Hands-on energy. This is the first code-along.
WHAT TO SAY: "Video 4 — this is where we start coding. Open your terminal. We're scaffolding the React frontend and the Node.js backend."
TRANSITION: "Let's start with the frontend."
-->

---

# Scaffolding the React Frontend with Vite

Vite is the modern build tool that replaces Create React App. It is dramatically faster and is the industry standard for new React projects in 2025. We use it with the React template to get a clean starting point.

```bash
npm create vite@latest client -- --template react
cd client && npm install
npm install react-router-dom axios @tanstack/react-query tailwindcss recharts @dnd-kit/core @dnd-kit/sortable
```

| Package | Role |
|---------|------|
| react-router-dom | Client-side navigation |
| axios | HTTP requests to the API |
| @tanstack/react-query | Server state management |
| tailwindcss | Utility-first CSS framework |
| recharts | Dashboard data charts |
| @dnd-kit | Drag-and-drop Kanban board |

<!--
TIME: 120s
ENERGY: Code-along pace. Type along with students. Pause after each command.
WHAT TO SAY: "First command — npm create vite@latest. This scaffolds a new React project using Vite." Run it. "It creates the client folder with a clean React setup." Then: "cd into client, npm install to get the base dependencies." Then the second npm install: "These are the packages we'll use throughout the course. React Router for navigation, Axios for API calls, TanStack Query for caching, Tailwind for styling, Recharts for dashboard charts, DnD Kit for the Kanban board."
DEMO: Open your terminal. Run each command live. Show the output. After the Vite scaffold, briefly open the folder in VS Code to show the generated structure. Don't spend more than 10 seconds on the file structure — they'll learn it in Module 3.
COMMON QUESTION: "Why Axios instead of fetch?" — "Axios has better defaults — automatic JSON parsing, interceptors for auth headers, and cleaner error handling. But fetch works too."
TRANSITION: "Now the backend."
-->

---

# Scaffolding the Node.js Backend

The backend is a Node.js application using Express as the web framework. Each dependency is chosen deliberately — every package has a specific job in the architecture.

```bash
mkdir server && cd server && npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken prisma @prisma/client express-rate-limit morgan
npm install --save-dev nodemon jest supertest
```

| Package | Role |
|---------|------|
| express | Web framework — handles HTTP requests |
| cors | Allows React frontend to call the API |
| bcryptjs | Hashes passwords securely |
| jsonwebtoken | Creates & verifies JWT auth tokens |
| prisma | ORM for database access |
| morgan | Logs every incoming request |
| express-rate-limit | Protects API from spam/abuse |

<!--
TIME: 120s
ENERGY: Code-along pace. Same rhythm as previous slide.
WHAT TO SAY: "Backend setup — three commands." Walk through each: "mkdir server, cd in, npm init -y to create a package.json. Then we install our production dependencies." Go through 4-5 key packages: "Express is the web framework, cors lets React talk to the API, bcryptjs hashes passwords, jsonwebtoken handles auth tokens, Prisma is our database ORM." Then dev dependencies: "nodemon auto-restarts the server when you save, jest is for testing, supertest lets us test API endpoints without starting the server."
DEMO: Run each command live. Show the package.json after install — briefly scroll through the dependencies section. "Every one of these has a job. No bloat."
COMMON QUESTION: "What's the difference between --save-dev and regular install?" — "Dev dependencies are only needed during development — testing, auto-restart. They don't go to production."
TRANSITION: "Now let's set up the Express application itself."
-->

---

## <span class="pa-badge">PA0203</span> · <span class="pa-badge">PA0204</span> — Configure Middleware & Services

# app.js Is the Heart of Your Backend

This file configures the Express application — setting up the middleware pipeline that every incoming request passes through before reaching a route handler. This is PA0203 (configuring middleware) and PA0204 (configuring services) in practice.

```javascript
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
```

- **cors** → Only accept requests from our React frontend
- **express.json()** → Parse incoming JSON request bodies
- **express.urlencoded()** → Parse form data
- **morgan('dev')** → Log every request for debugging

<!--
TIME: 90s
ENERGY: Technical, deliberate. Each line matters — explain them all.
WHAT TO SAY: "app.js is the heart of your backend. Every single request that hits your server passes through this middleware pipeline." Walk through each line: "cors — we configure which frontend URL is allowed to call our API. Without this, the browser blocks the request. express.json — parses JSON request bodies so you can read req.body. express.urlencoded — same thing for form data. morgan — logs every incoming request to your terminal so you can see what's happening."
DEMO: Open VS Code. Create server/src/app.js. Type or paste the four middleware lines. Show Claude Code: ask it "Create an Express app with CORS and JSON middleware in server/src/app.js" — compare what it generates with what's on the slide. Review the output together: "See? Same four middleware. But now you know WHY each one is there."
COMMON QUESTION: "What does 'middleware' actually mean?" — "It's a function that runs between the request arriving and your route handler running. Think of it as a series of checkpoints every request passes through."
TRANSITION: "One more middleware concept — static files."
-->

---

# The Hotel Front Desk Analogy

Every guest (HTTP request) walks through the front door. Before they get to their room (your route handler), they pass through the **front desk** — and each middleware is a staff member doing a specific job.

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

### The Bouncer — `cors()`

"Are you on the guest list?" Only requests from your React app's URL get in. Everyone else is turned away at the door.

### The Letter Translator — `express.json()`

Guests hand over a sealed envelope (request body). This person opens it and translates raw JSON into something your routes can read. Without them, `req.body` is empty.

</div>
<div>

### The Form Reader — `urlencoded()`

Same job, different format. HTML forms encode data as `name=Akhil&role=engineer`. This person unpacks that.

### The Security Camera — `morgan()`

Records every visitor: who came, when, what they wanted, how long it took. When something breaks at 2am, this is what you check first.

</div>
</div>

> 💡 **Order matters.** Middleware runs top to bottom. Put your routes above `express.json()` and your handler gets an empty `req.body` — like sending guests to their room before the translator opens their letter.

<!--
TIME: 60s
ENERGY: Relatable, visual. Make the abstraction concrete.
WHAT TO SAY: "Think of middleware as a hotel front desk. Every request is a guest walking through the door. Before they get to their room — your route handler — they pass through a series of staff." Walk through each: "CORS is the bouncer — are you on the guest list? express.json is the translator — opens the JSON envelope so your route can read req.body. urlencoded does the same for form data. Morgan is the security camera — logs every request to your terminal." Then emphasize: "Order matters. If you put your routes above express.json, your handler gets an empty req.body. It's like sending guests to their room before the translator opens their letter."
TRANSITION: "One more middleware concept — static files."
-->

---

## <span class="pa-badge">PA0205</span> — Work with Static Files

# Serving Images, CSS, and Public Assets

Even in a SPA, your backend may need to serve static files — images, favicons, downloadable PDFs, or API documentation. Express makes this trivial with one line of middleware.

```javascript
// Serve everything in the 'public' folder
app.use(express.static('public'));

// Directory structure:
// server/
//   public/
//     favicon.ico
//     robots.txt
//     docs/
//       api-spec.html
```

> 💡 "In ApplyIQ, Cloudinary handles images in production — but express.static() is essential for simpler apps. One line of code, zero configuration."

<div class="text-sm opacity-60 mt-4">PA0205 ✅</div>

<!--
TIME: 45s
ENERGY: Quick, practical. This is a short concept — don't over-explain.
WHAT TO SAY: "One line of middleware — express.static('public'). Any file you put in the public folder is now accessible via URL. Favicon, robots.txt, PDF downloads — all served automatically." Then the context note: "In ApplyIQ, we'll use Cloudinary for images in production, but express.static is essential knowledge for simpler apps."
DEMO: Create a server/public folder. Drop a test image in it. Start the server and visit localhost:3000/test-image.png in the browser. "See? One line, no configuration."
COMMON QUESTION: "Should I put my React app in the public folder?" — "No. React has its own build process. Static files are for things like images, PDFs, and favicons."
TRANSITION: "Let's see what we earned."
-->

---

# The Public Noticeboard Analogy

Static file serving is like the **noticeboard in a hotel lobby**. You don't need to ask the front desk for directions to the pool — there's a map pinned to the board. Anyone can walk up and read it.

<div class="columns">
<div class="column">

### Without `express.static()`

Every file needs its own route handler. You'd have to write code for every image, every PDF, every favicon. It's like hiring a concierge to hand-deliver every brochure individually.

</div>
<div class="column">

### With `express.static('public')`

Drop a file in the `public/` folder, it's instantly accessible by URL. No routes, no handlers, no config. Pin it to the board, anyone can see it.

</div>
</div>

> 💡 **The key difference:** Static files are served directly — no JavaScript runs. Your API routes run code, make database queries, check auth. Static files just hand over the file as-is.

<!--
TIME: 30s
ENERGY: Quick, reinforcing. The analogy should click immediately.
WHAT TO SAY: "Think of it as the noticeboard in a hotel lobby. You don't need to ask the front desk for a pool map — it's just pinned to the board. express.static works the same way. Drop a file in the public folder, it's available by URL. No route handler needed." Then: "The key difference — static files are served directly. No code runs. Your API routes do work — query the database, check auth, process data. Static files just hand over the file."
TRANSITION: "Let's see what checkpoints we earned."
-->

---

# Video 4 — Checkpoints Earned

<div class="grid grid-cols-2 gap-4 mt-6">

- ✅ **PA0201** — Used existing middleware (cors, express.json, morgan)
- ✅ **PA0203** — Configured middleware pipeline in app.js
- ✅ **PA0204** — Configured services via dotenv and Express
- ✅ **PA0205** — Worked with request parsing middleware

</div>

<div class="text-sm opacity-60 mt-8">Next up: Video 5 — Git Branching Strategy</div>

<!--
TIME: 15s
ENERGY: Quick checkpoint. Keep momentum high.
WHAT TO SAY: "Four more checkpoints. We used existing middleware, configured the middleware pipeline, set up services, and worked with static files. Eleven total checkpoints earned now."
TRANSITION: "Last video of Module 1 — Git branching. This is how professional teams ship code."
-->

---
layout: section
---

# VIDEO 5 OF 5

## Git Branching: How Professional Teams Ship Code

Duration: 10 minutes

<span class="pa-badge">PA0106</span> <span class="pa-badge">PA0901</span>

<!--
TIME: 10s
ENERGY: Professional, final-video energy. Strong close incoming.
WHAT TO SAY: "Video 5 — the final video of Module 1. Git branching. This is how real teams ship code without breaking production."
TRANSITION: "Here's the model we use."
-->

---

# Every Professional Team Uses This Branching Model

The three-branch strategy separates production code, development work, and individual features into distinct branches. This prevents broken code from reaching users and makes collaboration clean and traceable.

<div class="grid grid-cols-3 gap-4 mt-6">
<div>

### main

Production. Live URL always reflects this. Nothing pushed directly here. Ever.

</div>
<div>

### dev

Development/staging. All features merge here before going to main.

</div>
<div>

### feature/xxx

One branch per feature. Created from dev, merged back into dev when complete.

</div>
</div>

**Flow:** `feature/xxx` → `dev` → `main`

<!--
TIME: 60s
ENERGY: Clear, definitive. Rules-based. No ambiguity.
WHAT TO SAY: "Three branches. Main is production — the live URL always reflects what's on main. Nobody pushes directly to main. Ever." Pause for emphasis. "Dev is your staging area — all features merge here first. Feature branches are where you do actual work — one branch per feature." Draw the flow: "Feature branch into dev. Dev into main. That's it."
DEMO: Open terminal. Run: `git branch dev`, `git checkout -b feature/project-setup`. Show the branch list with `git branch`. "See? Three branches. Main, dev, and our first feature branch."
COMMON QUESTION: "What about 'develop' vs 'dev'?" — "Same thing. I use 'dev' because it's shorter. Pick one and be consistent."
TRANSITION: "Now let's talk about pull requests — the most important communication tool in your Git workflow."
-->

---

# Pull Requests Are Your Professional Communication Channel

A pull request is not just a code merge — it is a written record of what you built and why. When a hiring manager reviews your GitHub profile, well-written PRs demonstrate that you can communicate technical decisions clearly.

> 💡 "This PR sets up the initial monorepo structure for ApplyIQ. Includes React frontend scaffolded with Vite, Node/Express backend, concurrently configuration for running both simultaneously, and environment variable structure."

**Flow:** Create branch → Build feature → Push branch → Open PR → Review → Merge to dev

<!--
TIME: 60s
ENERGY: Professional, career-focused. PRs are how you get hired.
WHAT TO SAY: "A pull request is not a code merge. It's a written record of what you built and why." Read the example PR description. "This tells a reviewer exactly what changed and why. When a hiring manager sees this on your GitHub, they think 'this person knows how to communicate.'" Walk through the flow: "Create a branch, build the feature, push, open a PR, get a review, merge to dev."
DEMO: Open GitHub in the browser. If you have a sample PR, show it. If not, show the "New Pull Request" button and the description field. "The description is the most important part. Write it like you're explaining the work to a colleague who wasn't there."
COMMON QUESTION: "What if I'm working alone?" — "Write PRs anyway. It builds the habit and makes your GitHub profile look professional. Hiring managers check this."
TRANSITION: "That's Module 1. Let's see all the checkpoints we earned."
-->

---

# Module 1 Complete — All Checkpoints Earned

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">
<div>

- ✅ **PA0101** — Interrogated the business problem
- ✅ **PA0102** — Identified business needs
- ✅ **PA0103** — Planned the MVC architecture
- ✅ **PA0104** — Planned architecture & state management

</div>
<div>

- ✅ **PA0105** — Planned models, controllers, and views
- ✅ **PA0106** — Created a detailed project plan
- ✅ **PA0107** — Documented functionality, UI, structure & data storage
- ✅ **PA0108** — Wrote a detailed and accurate project plan

</div>
<div>

- ✅ **PA0201** — Used existing middleware
- ✅ **PA0203** — Configured middleware
- ✅ **PA0204** — Configured services
- ✅ **PA0205** — Worked with request parsing middleware

</div>
</div>

> 💡 **12 Checkpoints Earned in Module 1**

<div class="text-sm opacity-60 mt-4">Module 2: Building the Full Backend API →</div>

<!--
TIME: 30s
ENERGY: Triumphant, proud. They did it. Celebrate the progress.
WHAT TO SAY: "Module 1 — complete. Twelve checkpoints earned. You planned the product, set up your environment, scaffolded both applications, and learned professional Git workflows." Pause. "And notice — the planning checkpoints are just as important as the coding ones. QCTO knows that engineers plan before they build."
TRANSITION: "Let me give you a preview of Module 2."
-->

---

# Module 2 — The Full Backend API

In Module 2 we build the complete REST API. By the end of it, you will have a fully working backend with authentication, database connectivity, and all CRUD endpoints — tested and verified in Postman.

<div class="grid grid-cols-2 gap-4 mt-6">

- 🔧 Build all Express route controllers
- 🗄️ Set up PostgreSQL with Prisma ORM
- 🔐 Implement JWT authentication
- 🧪 Test every endpoint with Postman

</div>

**PM-09 Checkpoints:** PA0201 · PA0202 · PA0206 · PA0207 · PA0208 · PA0301–PA0309 · PA0501–PA0508 · PA0601–PA0608

<div class="mt-8 text-center text-xl font-bold">See you in Module 2</div>

<!--
TIME: 30s
ENERGY: Forward-looking, exciting. Tease what's coming. End strong.
WHAT TO SAY: "Module 2 is the big one. We build the entire backend API — authentication, database models, CRUD endpoints, validation, error handling. By the end of Module 2, you can test every endpoint in Postman before we write a single line of React." End with energy: "See you in Module 2. Let's build."
TRANSITION: End of Module 1. Cut.
-->
