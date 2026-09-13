# ApplyIQ — Client Conventions

This file is read automatically by Claude Code / Cursor on every prompt in this folder.
Its job is to make generated code **predictable enough to record on camera**.

## Stack — do not substitute

- React **19** — function components only. No class components.
- React Router **7** — `createBrowserRouter` + `<RouterProvider>`. Never `<BrowserRouter>` + `<Routes>`.
- Tailwind CSS **4** — configured from CSS, not JS.
  - **There is no `tailwind.config.js` and you must never create one.**
  - Config lives in `src/index.css` via `@import "tailwindcss";`
  - Theme values go in `@theme { ... }` in that same file.
- Vite **8** — `npm run dev` / `npm run build`.
- axios — always via the shared instance in `src/lib/api.js`. Never call `axios` or `fetch` directly in a component.
  - **The one exception: streaming endpoints.** `CoverLetterPage.jsx` calls `fetch`
    directly for `POST /api/ai/cover-letter/stream`, because axios buffers the whole
    response before resolving — the text would arrive in one lump and the typing
    effect would be lost. Streaming needs `res.body.getReader()`, which axios does
    not expose. Every non-streaming call still goes through `lib/api.js`.
- recharts for charts. Never Chart.js, never D3, never a jQuery plugin.

## Folder rules

```
src/
├── main.jsx                # mounts React + RouterProvider
├── router.jsx              # the route table
├── index.css               # @import "tailwindcss"
├── lib/api.js              # the axios instance
├── pages/                  # one per route: DashboardPage, ApplicationsPage, KanbanPage
└── components/
    ├── ui/                 # knows NOTHING about ApplyIQ: Button, Input, Badge, Card, StatCard
    ├── layout/             # Layout, Sidebar, Header, Footer
    └── applications/       # domain: ApplicationCard, ApplicationForm, KanbanColumn
```

**The test:** if a component mentions the word *application*, it does not belong in `ui/`.

## Code style

- `export default function ComponentName()` — named function, default export.
- Props destructured in the signature: `function ApplicationCard({ app, onEdit })`.
- Tailwind utility classes only. **No inline `style={{}}`.** No `.css` files besides `index.css`.
  - **The one exception: drag transforms.** `KanbanPage.jsx` sets an inline
    `transform` on a dragging card, because @dnd-kit reports the offset as
    runtime pixel values (`transform.x` / `transform.y`) that no utility class
    can express. Everything else on that page is still utilities.
- No arbitrary values (`w-[347px]`) unless there is genuinely no scale value that fits.
- Every `.map()` renders a `key` on the outermost element it returns.
- `async/await`, never `.then()` chains.
- No TypeScript. This project is plain `.jsx`.

## The backend contract — do not invent endpoints

The API is already built and is **not** modified in this module. It runs on
**`http://localhost:3000`**, so the axios baseURL is `http://localhost:3000/api`.
(Not 5000 — macOS AirPlay owns port 5000.) Available routes:

```
GET    /api/applications
POST   /api/applications
GET    /api/applications/:id
PATCH  /api/applications/:id
DELETE /api/applications/:id
POST   /api/auth/register
POST   /api/auth/login
```

An application record looks like:

```js
{ id, companyName, role, status, salary, location, appliedDate, userId }
```

`salary` is a nullable integer and `location` a nullable string. `GET /api/applications/:id`
also includes the `activities`, `contacts`, and `coverLetters` relations — the list route
does not.

`status` is one of: `Saved`, `Applied`, `Screening`, `Interview`, `Offer`, `Rejected`
— **capitalised**, matching the Prisma default of `"Applied"`.

If a component needs data that isn't in that shape, **say so — do not add a backend route.**

## What you must not do

- Do not create `tailwind.config.js`, `postcss.config.js`, or any `.css` file other than `index.css`.
- Do not add dependencies. Everything needed is already in `package.json`.
  - One approved exception: `@tanstack/react-query-devtools`, a **devDependency**
    mounted in `main.jsx`. It inspects the React Query cache during development
    and is stripped from the production build, so it adds nothing to the bundle.
- Do not touch anything in `../server/`.
- Do not add comments explaining what React is. Assume the reader knows the language.
- Do not write tests unless asked — testing is Module 5.

## Output format

Return **complete files**, with the file path as the first line in a comment. No prose before or after unless I asked a question.
