---
theme: default
title: "ApplyIQ — Module 5: Testing — Writing Code You Can Trust"
info: "Zaio Institute of Technology | Instructor: Akhil"
class: text-white
drawings:
  persist: false
css: unocss
---

# Module 5: Testing — Writing Code You Can Trust

Proving Your Code Works. Automatically.

7 Videos · 7 PA Checkpoints

<div class="flex items-center gap-4 mt-4">
<img src="/avatar.png" class="w-14 h-14 rounded-full border-2 border-[#27C93F]" />
<div class="font-semibold">Akhil — Co-founder @ Zaio</div>
</div>

<style src="./styles/zaio.css"></style>

<!--
🎥 VIDEO NAME: "M5.0 — Module 5 Intro"
ENERGY: Serious but motivating. This is the employability pitch.
WHAT TO SAY: "Four modules in, ApplyIQ works. It authenticates, it stores applications, it talks to OpenAI. And not one line of it is proven. Every single time you've checked your work in this course, you did it by hand — clicking through the UI, watching Postman, reading a terminal. That doesn't scale and it doesn't survive a refactor. This module makes the machine do the checking."
TIME: 1 min
-->

---

# Quick Recap: Where ApplyIQ Actually Is

<div class="columns"><div>

### ✅ Built and running

- Express 5 server, **CommonJS** — `require`, never `import`
- `controllers/applications.js` — a **factory** taking a repo
- `repositories/applicationRepository.js` — a **factory** taking `prisma`
- Joi validation via `middleware/validate.js`
- `errorHandler` + `NotFoundError` + `asyncHandler`
- React client — Badge, Button, StatCard, WeeklyChart

</div><div>

### 🔧 What's missing

- **Zero test files.** Anywhere.
- `server/package.json` → `"test": "echo \"Error: no test specified\""`
- Client has **no test tooling at all** — no Vitest, no Testing Library
- No `TEST_DATABASE_URL`
- `DashboardPage` still renders a **hardcoded `STATS` array**

</div></div>

> 💡 `jest` and `supertest` are already in `server/devDependencies` — installed in Module 1, never used. Today they finally run.

<!--
TIME: 2 min
ENERGY: Honest inventory. No shame in zero tests — that's normal for a project at this stage.
WHAT TO SAY: "Let me be straight about where we are. The server is in genuinely good shape — the controller takes a repository, the repository takes prisma, and both of those are factories. That's not an accident, that's two seams I built on purpose back in Module 2, and this module is where they pay off. What we do NOT have is a single test file. Not one, in either folder. The server's test script literally prints an error and exits. And there's a loose end from Module 3 I keep promising to fix — the dashboard still shows four hardcoded numbers. We fix that in video three, with a test."
DEMO: Open `server/package.json`, show the placeholder test script. Then `ls server/src` — no tests folder. Then `client/package.json` — no vitest.
TRANSITION: "Same format as the last two modules. Let's go."
-->

---

# Module 5 Map — 7 Videos, 7 Checkpoints

<div class="columns"><div>

| # | PA | Video |
|---|----|-------|
| 5.1 | PA0901 | Testing Throughout the Lifecycle |
| 5.2 | PA0902 | Testing Small Components (Unit) |
| 5.3 | PA0903 | Testing a Model |
| 5.4 | PA0904 | Testing a Controller with a Fake Repo |

</div><div>

| # | PA | Video |
|---|----|-------|
| 5.5 | PA0905 | Implementing a Repository |
| 5.6 | PA0909 | Running Unit Tests Against Components |
| 5.7 | PA0910 | Handling Exceptions Smoothly |

</div></div>

> 💡 We test bottom-up: components → models → controllers → the repository seam underneath them → the full run → graceful failure.

> 🔗 QCTO Bridge: This is PS09's testing subset (PM-09). Exception-handling *strategy* and *logging* (PA0906/0907/0908/0911) were built in Module 2 — we reference them here, we don't rebuild them.

<!--
TIME: 1 min
WHAT TO SAY: "Seven videos, seven checkpoints, and they climb the pyramid in order. Notice video five — implementing a repository. We already have one; it landed in Module 2. So that video isn't about typing it again, it's about the second seam hiding inside it, and I'll show you what I mean when we get there."
TRANSITION: "One reminder on format, then video one."
-->

---

# Same Format — Now With a Safety Net

<div class="columns"><div>

### The loop, unchanged
1. **Spec** — I say what I want and why
2. **Prompt** — you paste the prompt on the slide
3. **Read** — walk the generated code line by line
4. **Check** — tick the Checkpoint Check slide

</div><div>

### The two rules
- **Never prompt for the thing the checkpoint is about.** PA0902 is "test a small component" — so *you* write the assertion.
- **Give it the rules first.** `server/CLAUDE.md` from Video 4.1 still applies, and it's the reason the AI won't hand you `import` statements.

</div></div>

> ⚠️ New in this module: a test that passes for the wrong reason is worse than no test. It is a green light on a broken feature. The **Read** beat is where you catch that — every single time, ask "would this test fail if I broke the code?"

> 💡 The fastest way to trust a new test: make it fail on purpose. Break the thing, watch it go red, put it back. We do that on camera in almost every video.

<!--
TIME: 1.5 min
ENERGY: Brisk. They know this format — reminder, not re-teach.
WHAT TO SAY: "Same four beats. Spec, prompt, read, check. One new danger, and it's specific to testing: a bad test doesn't crash, it passes. It sits there green and tells you everything's fine while the feature is broken underneath it. So we add a ritual this module — every test we write, we break the code on purpose and watch it go red. If it stays green when the code is broken, the test is a lie and we delete it."
TRANSITION: "Video one — what to test, when, and where the tests actually live."
-->

---
layout: section
---

<span class="pa-badge">PA0901</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.1

# Testing Throughout the Lifecycle

#### ApplyIQ · The mental model — and a test environment that can't touch real data

~7 min

<!--
🎥 VIDEO NAME: "M5.1 — Testing Throughout the Lifecycle (PA0901)"
🎯 OBJECTIVE: By the end the student can explain the testing pyramid, pick the right test level for a given check, and has a working, isolated Jest environment on the server.
WHAT TO SAY: "Most of you have never written a test. That's fine. By the end of this video you'll understand why every professional team runs them on every commit — and you'll have an environment where a test can't destroy your real data."
DEMO: Show `server/package.json` — the placeholder test script. Show `.env` — there's no TEST_DATABASE_URL. That's what we're fixing.
COMMON QUESTION: "Do companies actually test?" — Yes. Every serious team has CI that blocks merging if tests fail. No tests, no merge.
TRANSITION: "Start with the pyramid — the mental model."
TIME: 15s divider
-->

---

# The Prompt — Video 5.1

**You spec it. The AI scaffolds it. You still own PA0901.**

```text
Read server/CLAUDE.md, server/package.json, server/src/app.js and
server/src/lib/prisma.js first.

Set up Jest on the server. This project is CommonJS — no import syntax
anywhere.

1. Create server/jest.config.js — testEnvironment "node", testMatch on
   server/tests/**/*.test.js, and setupFilesAfterEnv pointing at
   server/tests/setup.js
2. Create server/tests/setup.js. It must load environment variables
   BEFORE anything requires src/app.js, because app.js throws at import
   time if CLIENT_URL is missing. Load server/.env.test if present.
3. Create server/.env.test with DATABASE_URL, JWT_SECRET and CLIENT_URL.
   Leave DATABASE_URL's value EMPTY with a comment saying it must point
   at a throwaway database, never the dev one. Do not copy any real
   value out of server/.env.
4. Add the same keys to server/.env.example with empty values.
5. Change the "test" script in server/package.json to "jest --runInBand".

Do not write any test files yet. Do not modify src/.
```

> ✍️ **You write this yourself:** the explanation. PA0901 is *describing* the pyramid and where each level belongs in the lifecycle. That's the whiteboard — nothing in this prompt touches it.

> ⚠️ **What it usually gets wrong:** writing `export default` in `jest.config.js`, or putting `require("dotenv")` *after* a `require("../src/app")`. Both are silent — the config just doesn't load, or `app.js` throws `CLIENT_URL is not set` and you'll blame Jest.

<!--
TIME: 3 min
ENERGY: Setting up the workshop before doing any work.
WHAT TO SAY: "Two things in this prompt are doing real work. Instruction two: our app.js has a line at the top that throws if CLIENT_URL isn't set — I put it there in Module 2 on purpose, so we fail loudly instead of mysteriously. That's great in production and it's a trap in tests, because the moment a test file requires app.js, that line runs. So the env has to load first. Instruction three: an empty DATABASE_URL with a comment. I am not letting you paste your real database URL into a test config. Tests delete rows. That's their job."
DEMO: Run the prompt. Open `jest.config.js` and confirm `module.exports`. Open `setup.js` and confirm dotenv loads before anything else.
TRANSITION: "Environment's safe. Now the mental model."
-->

---

# Three Levels of Testing

<div class="columns"><div>

**The Pyramid**

```
      /\      E2E (Playwright)
     /  \     few · slow · costly
    /----\
   /      \   Integration (Supertest)
  /        \  some · medium
 /----------\
/            \ Unit (Jest / Vitest)
\____________/ many · fast · cheap
```

</div><div>

**Read it bottom-up**

- **Unit** — one function or component, no DB
- **Integration** — real HTTP into Express
- **E2E** — a real user clicking the UI

**In ApplyIQ**
- Unit → `toWeeklyData`, `Badge`, the controller
- Integration → `POST /api/auth/register`
- E2E → out of scope this module

</div></div>

> 💡 Write the most unit tests. They're the cheapest to maintain and the fastest to run.

> ⚠️ Common mistake: inverting the pyramid — piling up slow E2E tests and skipping unit tests. The suite becomes flaky, slow, and nobody trusts it.

> 🔗 QCTO Bridge: In ASP.NET this same lifecycle is taught with xUnit/NUnit unit tests plus integration tests via `WebApplicationFactory`. We use Jest/Vitest + Supertest — identical pyramid, different tooling.

<!--
WHAT TO SAY: "Bottom-up. Unit tests are one function with nothing around it — no database, no HTTP. They run in milliseconds so you write hundreds. Integration tests send a real HTTP request into your real Express app, so they're slower and you write fewer. E2E drives a real browser — slowest, most brittle, you write a handful. The mistake I see constantly is the inverted pyramid: a team writes forty end-to-end tests, the suite takes twenty minutes, it fails randomly, and within a month everyone's ignoring it."
DEMO: Draw the pyramid, label each layer with speed and cost, then name the ApplyIQ example for each.
TIME: 3 min
-->

---

# Test Across the Lifecycle, Not Just at the End

<div class="columns"><div>

**Without Tests**

- Bugs reach production
- Nights spent debugging
- Refactors feel scary

</div><div>

**With Tests (in CI)**

- CI blocks bad code at the PR
- Refactor with confidence
- Hireable — interviewers ask

</div></div>

```js
// server/tests/setup.js — env BEFORE anything requires app.js
require("dotenv").config({ path: ".env.test" });

// app.js throws at import time if CLIENT_URL is missing — this
// line is what stops the whole suite dying on the first require.
```

> ⚠️ **Never** point `TEST_DATABASE_URL` at your dev or production database. Tests create fake users and wipe tables. That's not a risk, that's the design.

> 🔗 QCTO Bridge: ASP.NET's CI story is the same — `dotnet test` runs in the pipeline and a red build blocks the merge. Our `npm test` runs in GitHub Actions for the identical gate (we wire that up in Module 7).

<span class="pa-badge earned">PA0901 ✅</span>

<!--
WHAT TO SAY: "Throughout the lifecycle means the tests run on every commit — locally before you push, and again in CI on the pull request. Not as a ceremony at the end of the project. And read that warning, because it's the one that actually bites students: your tests will delete rows. If that URL points at the database you've been demoing with all course, you will lose your data, and you'll lose it on camera."
DEMO: Show `.env.test` with the empty DATABASE_URL and the comment. Show setup.js loading it first.
COMMON QUESTION: "Can I use SQLite for tests instead of Postgres?" — You can, but subtle SQL differences bite you. A throwaway Postgres database matches production exactly.
TIME: 3 min
-->

---

# Checkpoint Check — PA0901

Read the generated files against these. **Every one must be true before we move on.**

- [ ] `server/jest.config.js` uses **`module.exports`**, not `export default`
- [ ] `server/tests/setup.js` loads env **before** anything requires `src/app.js`
- [ ] `server/.env.test` exists with an **empty** `DATABASE_URL` and a warning comment
- [ ] No real secret was copied from `.env` — `git diff` proves it
- [ ] `npm test` runs and reports **"no tests found"** — not a crash, not the old echo
- [ ] You can explain unit vs integration vs E2E, and give an ApplyIQ example of each, without the slide

> 🔎 Test it for real: temporarily blank `CLIENT_URL` in `.env.test` and run `npm test`. If you see `CLIENT_URL is not set`, your setup file is loading too late — fix it now, not in video six.

<!--
TIME: 2 min
ENERGY: First check of the module. The last line is the actual mark.
WHAT TO SAY: "The fifth line is the one people misread. 'No tests found' is a PASS here. We haven't written any yet — what we're proving is that Jest starts, finds its config, loads the environment, and exits cleanly. If it crashes instead, something's wrong with the wiring and you want to know now. And the last line is the assessment. PA0901 is you explaining the lifecycle. No config file earns you that."
DEMO: Run `npm test`, show "no tests found". Then do the CLIENT_URL sabotage from the 🔎 line live and fix it.
TRANSITION: "Environment's ready. Let's write our first actual test — the smallest thing we own."
-->

---
layout: section
---

<span class="pa-badge">PA0902</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.2

# Testing Small Components

#### ApplyIQ · Unit-testing Badge and Button so visual state can't silently break

~7 min

<!--
🎥 VIDEO NAME: "M5.2 — Testing Small Components (PA0902)"
🎯 OBJECTIVE: By the end the student can install and configure Vitest + React Testing Library and write a unit test that renders a component and asserts on its output and behaviour.
WHAT TO SAY: "Base of the pyramid — the smallest thing we own, a single React component. The client has no test tooling at all right now, so this is a real install, and then two real tests."
DEMO: Open `client/package.json` — no vitest, no testing-library. Then open `Badge.jsx` and note it's a DEFAULT export.
COMMON QUESTION: "Do I test every component?" — Test the ones with logic or state. A pure passthrough wrapper rarely needs one.
TRANSITION: "From visual state to interactive behaviour."
TIME: 15s divider
-->

---

# The Prompt — Video 5.2

**You spec it. The AI scaffolds it. You still own PA0902.**

```text
Read client/CLAUDE.md, client/package.json, client/vite.config.js,
client/src/components/ui/Badge.jsx and client/src/components/ui/Button.jsx
first.

Set up component testing on the client:

1. Install as devDependencies: vitest, jsdom, @testing-library/react,
   @testing-library/jest-dom, @testing-library/user-event
2. Add a test block to client/vite.config.js — globals true,
   environment "jsdom", setupFiles "./src/tests/setup.js"
3. Create client/src/tests/setup.js importing @testing-library/jest-dom
4. Add "test": "vitest run" and "test:watch": "vitest" to client scripts
5. Write client/src/tests/Badge.test.jsx. Badge is a DEFAULT export from
   ../components/ui/Badge.jsx. Test that status="Offer" renders text
   "Offer" and that its className contains "green".

Write the Badge test only. Do NOT write a Button test — I am writing
that one myself on camera.
```

> ✍️ **You write this yourself:** the Button test. PA0902 is *writing a unit test for a small component* — so the second test, the behavioural one, is typed live by you.

> ⚠️ **What it usually gets wrong:** importing `{ Badge }` as a named export — it's `export default`. It also invents a `loading` prop on Button because every tutorial Button has one. **Ours does not.** Button takes `variant` and spreads the rest, so the real prop to test is `disabled`.

<!--
TIME: 3 min
ENERGY: First real test of the course. Make the install feel like progress.
WHAT TO SAY: "Read the warning before you run anything. Two traps in this one. Badge is a default export — the model will write curly braces around it out of habit, and you'll get 'Badge is not defined' with a stack trace that doesn't mention the import. And Button: every Button component in every tutorial on the internet has a loading prop. Ours doesn't. I never wrote one. If the AI writes you a loading test it will fail, and the correct fix is to delete the test, not to add the prop — don't let a hallucinated test drag you into building a feature you didn't want."
DEMO: Run the prompt. Watch the install. Open the generated Badge test, check the import line is default. Run `npm test`.
TRANSITION: "That one's generated. Now I write the behavioural one myself."
-->

---

# Unit-Testing Visual State

```jsx
import { render, screen } from "@testing-library/react";
import Badge from "../components/ui/Badge";   // ← default export

it("applies the green class for an Offer status", () => {
  render(<Badge status="Offer" />);
  expect(screen.getByText("Offer").className).toContain("green");
});
```

Our real `Badge.jsx` maps `Offer` → `bg-green-500/20 text-green-400`, and renders `{children ?? status}`.

> 💡 If someone renames a status or breaks the colour map, this fails in CI — before a user ever sees it.

> ⚠️ Common mistake: asserting on the full class string `"bg-green-500/20 text-green-400"`. Tailwind values change; the *semantic* colour doesn't. Assert on `"green"`.

> 🔗 QCTO Bridge: A classic xUnit `[Fact]` / NUnit `[Test]` — Arrange (render), Act (query), Assert. RTL's `render`/`screen` is our Arrange/Act surface.

<!--
WHAT TO SAY: "Three lines that matter. Render the component, find the text, assert on the class. Notice what I'm asserting — the substring 'green', not the whole Tailwind class. If I asserted on the exact string, then the day someone changes 500 to 600 this test goes red for no reason, and a test that cries wolf gets deleted. Assert on what the user perceives: it's green."
DEMO: Run the test green. Then go into Badge.jsx and change the Offer colour to red — watch it fail. Put it back.
TIME: 3 min
-->

---

# Unit-Testing Behaviour — You Type This One

```jsx
import userEvent from "@testing-library/user-event";
import Button from "../components/ui/Button";

it("does not fire onClick when disabled", async () => {
  const handleClick = vi.fn();
  render(<Button disabled onClick={handleClick}>Submit</Button>);

  await userEvent.click(screen.getByRole("button"));

  expect(handleClick).not.toHaveBeenCalled();
});
```

`Button` spreads `...props` onto the `<button>`, so `disabled` reaches the DOM and the browser blocks the click for us.

> 💡 This is the test that stops a double-submit creating two applications.

> ⚠️ Common mistake: forgetting `await` on `userEvent`. The assertion runs before the click resolves and the test passes for the wrong reason — green, and meaningless.

> 🔗 QCTO Bridge: `vi.fn()` is our mock callback — the direct equivalent of Moq's `Mock<Action>()` used to verify a method was (or wasn't) invoked.

<span class="pa-badge earned">PA0902 ✅</span>

<!--
WHAT TO SAY: "This is the one I'm typing, because this is the checkpoint. And I want you to see the await, because that's the bug I'd bet money on you hitting. userEvent.click returns a promise. Forget the await and your expect runs first, before the click has happened — and of course the handler hasn't been called yet, so the test passes. It passes because nothing happened. That's the exact failure mode I warned you about in the intro: green for the wrong reason."
DEMO: Type it live. Run green. Then delete the `disabled` prop from the render call and watch it fail — proving the test has teeth. Then remove the `await` and show it passing for the wrong reason. That second demo is the lesson.
TIME: 3 min
-->

---

# Checkpoint Check — PA0902

- [ ] `Badge` is imported as a **default** export — no curly braces
- [ ] Both tests pass with `npm test` in `client/`
- [ ] The Badge test **fails** when you change the Offer colour in `Badge.jsx`
- [ ] The Button test **fails** when you remove `disabled` from the render call
- [ ] No test mentions a `loading` prop — Button doesn't have one
- [ ] You typed the Button test yourself

> 🔎 Test it for real: remove the `await` from the Button test. It should still pass — that's the trap. Put it back and understand why it mattered.

<!--
TIME: 2 min
WHAT TO SAY: "Lines three and four are the real checkpoint. Anyone can write a test that passes. The question is whether it fails when it should, and the only way to know is to break the code and watch. If you change Badge to red and the test stays green, your test isn't testing anything and you need to find out why before you write fifty more like it."
DEMO: Walk each line. Do both sabotage runs on camera.
TRANSITION: "Components done. Next level up — models."
-->

---
layout: section
---

<span class="pa-badge">PA0903</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.3

# Testing a Model

#### ApplyIQ · Our Joi schema, our pure functions — and finally killing the hardcoded dashboard

~8 min

<!--
🎥 VIDEO NAME: "M5.3 — Testing a Model (PA0903)"
🎯 OBJECTIVE: By the end the student can test a validation schema's rules and extract buried logic into a pure function they can test directly.
WHAT TO SAY: "In ASP.NET a model is a C# class with data-annotation rules. In our stack the model logic is the Joi schema plus the pure functions that derive data from it. We test both — and along the way we finally fix the dashboard I've been apologising for since Module 3."
DEMO: Open `schemas/auth.schema.js` (Joi) and `lib/weekly.js` (pure). Then open DashboardPage and point at the hardcoded STATS array.
COMMON QUESTION: "Isn't validation the library's job?" — Joi enforces; YOUR job is to test that you wired YOUR rules correctly.
TRANSITION: "Models hold logic — but only where we can reach it."
TIME: 15s divider
-->

---

# The Prompt — Video 5.3

**You spec it. The AI scaffolds it. You still own PA0903.**

```text
Read server/src/schemas/auth.schema.js, client/src/lib/weekly.js and
client/src/pages/DashboardPage.jsx first.

Two jobs.

JOB 1 — server/tests/authSchema.test.js
Test the Joi registerSchema. This is Joi, NOT Zod: call
schema.validate(value, { abortEarly: false }) and read error.details,
where each detail has .path and .message. Cover:
 - a valid email + password (8+ chars, one uppercase, one number) passes
 - a missing email fails
 - a 7-character password fails
 - abortEarly:false returns MORE THAN ONE error when both are bad

JOB 2 — client/src/lib/stats.js
DashboardPage currently renders a hardcoded STATS array. Extract a pure
function calculateStats(applications) into a new file client/src/lib/stats.js.
It returns { total, active, interviews, offers } where active excludes
status "Rejected". Guard against an empty array. Export it named.
Then wire DashboardPage to use it instead of the hardcoded array.

Do NOT write tests for calculateStats — I write those myself on camera.
```

> ✍️ **You write this yourself:** the `calculateStats` tests. PA0903 is *testing a model*, so the input→output tests — including the empty-array edge case — are typed live by you.

> ⚠️ **What it usually gets wrong:** writing Zod. Every testing tutorial online uses `safeParse` and `result.error.issues`. **We use Joi** — `validate()` and `error.details`. If you see `safeParse` in the output, the model ignored the file and you should reject the whole thing.

<!--
TIME: 3 min
ENERGY: This video closes a loose end. Lean into that.
WHAT TO SAY: "Job two is the one I care about. Since Module 3 that dashboard has shown one thousand two hundred applications, and you have about four. I hardcoded it to keep the UI moving and I told you we'd come back. This is coming back — and notice how we're coming back. We're not just fixing it, we're extracting it into a pure function first, because a number buried inside JSX cannot be tested and a pure function can. Testing didn't just verify our code here, it improved the architecture. That's the actual argument for testing and it's the one nobody makes to you."
DEMO: Run the prompt. Check the schema test uses `validate`/`details`, not `safeParse`/`issues`. Open the new DashboardPage and show STATS is gone.
TRANSITION: "Now the tests it didn't write."
-->

---

# Test the Model's Validation Rules

```js
const { registerSchema } = require("../src/schemas/auth.schema");

it("rejects a password with no uppercase letter", () => {
  const { error } = registerSchema.validate(
    { email: "a@b.com", password: "lowercase1" },
    { abortEarly: false }
  );
  expect(error).toBeDefined();
  expect(error.details[0].path).toContain("password");
});

it("reports BOTH failures at once", () => {
  const { error } = registerSchema.validate(
    { email: "not-an-email", password: "short" },
    { abortEarly: false }
  );
  expect(error.details.length).toBeGreaterThan(1);
});
```

> 💡 You're not testing Joi — you're testing that **your** rules match **your** business requirements.

> ⚠️ `abortEarly: false` is the whole reason the second test exists. Our `middleware/validate.js` passes it so the user fixes every field in one round trip instead of five. If someone deletes that option, this test catches it.

> 🔗 QCTO Bridge: This is exactly testing ASP.NET data annotations (`[Required]`, `[StringLength]`). Our Joi schema is the model; `validate` is the validator we assert against.

<!--
WHAT TO SAY: "The second test is the interesting one and it's testing a decision, not a rule. Back in Module 2 I passed abortEarly false into Joi so that a user submitting a bad form gets told about every problem at once instead of one at a time. That's a UX decision living in a config object, which means it's exactly the kind of thing that gets deleted by accident in a refactor six months from now. This test makes that decision permanent."
DEMO: Run both. Then go into validate.js, delete `abortEarly: false`, and watch the second test go red.
TIME: 3 min
-->

---

# Extract Pure Logic to Make It Testable

<div class="columns"><div>

**Before — hardcoded in the page**

```jsx
const STATS = [
  { label: "Applied", value: 1200 },
  { label: "Screening", value: 38 },
  // ...fiction, since Module 3
];
```

**After — a pure function**

```js
// client/src/lib/stats.js
export function calculateStats(apps) {
  const total = apps.length;
  const active = apps.filter(
    a => a.status !== "Rejected").length;
  const offers = apps.filter(
    a => a.status === "Offer").length;
  return { total, active, offers };
}
```

</div><div>

**You type these**

```js
it("handles an empty list", () => {
  expect(calculateStats([])).toEqual({
    total: 0, active: 0, offers: 0,
  });
});

it("excludes rejected from active", () => {
  const apps = [
    { status: "Applied" },
    { status: "Rejected" },
  ];
  expect(calculateStats(apps).active)
    .toBe(1);
});
```

</div></div>

> 💡 Testing forces pure functions — same input, same output, no side effects. The architecture improves as a side effect of wanting to test it.

> ⚠️ The empty-array case is not a nicety. A brand-new user has zero applications, so `[]` is the **first** thing your dashboard ever renders. Any `offers / total` in there divides by zero.

<span class="pa-badge earned">PA0903 ✅</span>

<!--
WHAT TO SAY: "The empty list test is the one I want you to internalise, because it is not a hypothetical. Think about who hits that code path first: a brand new user who has just signed up and has zero applications. The very first render of their dashboard passes an empty array into this function. If you ever compute a response rate as offers divided by total, that's a divide by zero on the happiest day of your user's life. Edge cases aren't exotic — they're usually just 'nothing has happened yet'."
DEMO: Type both tests live. Run green. Then start the app with a fresh user and show the dashboard rendering real zeroes instead of 1200.
TIME: 3 min
-->

---

# Checkpoint Check — PA0903

- [ ] The schema test uses **Joi** — `validate()` and `error.details`, never `safeParse`
- [ ] Deleting `abortEarly: false` from `validate.js` makes a test go **red**
- [ ] `client/src/lib/stats.js` exists and `calculateStats` is **pure** — no fetch, no state, no `Date.now()`
- [ ] `DashboardPage` no longer contains a hardcoded `STATS` array
- [ ] The empty-array test passes and you wrote it yourself
- [ ] The dashboard shows **real** numbers in the browser — go look

> 🔎 Test it for real: log in as a brand-new user with zero applications. The dashboard must render zeroes, not `NaN`, not `1200`.

<!--
TIME: 2 min
ENERGY: Satisfying. A three-module-old lie just got deleted.
WHAT TO SAY: "Last line, and I want you to actually do it rather than trust the green terminal. Open the browser. That dashboard has been lying to you since Module 3 and today it stops. Seeing a real four where a fake twelve hundred used to be is worth more to you right now than any passing test."
DEMO: Walk each line. Open the browser and show real numbers.
TRANSITION: "Components, models — next, the controller. And this is where Module 2 pays off."
-->

---
layout: section
---

<span class="pa-badge">PA0904</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.4

# Testing a Controller with a Fake Repository

#### ApplyIQ · Testing controller logic in milliseconds — no database required

~8 min

<!--
🎥 VIDEO NAME: "M5.4 — Testing a Controller with a Fake Repository (PA0904)"
🎯 OBJECTIVE: By the end the student can inject a fake repository into our controller factory and unit-test controller behaviour with zero database access.
WHAT TO SAY: "Remember dependency injection from Module 2? This is the payoff, and it's the best moment in this module. Our controller doesn't import Prisma. It doesn't import the repository. It RECEIVES one. Which means in a test, we hand it a fake."
DEMO: Open `controllers/applications.js` and point at `const createApplicationController = (repo) => ({...})`. That argument is the entire trick.
COMMON QUESTION: "Why not just use a test database?" — We do, for integration tests in 5.6. Unit tests must be instant and dependency-free.
TRANSITION: "This is the lightbulb — DI from Module 2 finally pays off."
TIME: 15s divider
-->

---

# The Prompt — Video 5.4

**You spec it. The AI scaffolds it. You still own PA0904.**

```text
Read server/src/controllers/applications.js and
server/src/repositories/applicationRepository.js first, and match the
REAL method names exactly — do not invent any.

Create server/tests/applicationsController.test.js.

Build a fakeRepo object literal with the same method names the real
repository exposes. Note carefully:
 - the controller's actions are list, create, getOne, update, remove
   (there is NO getAll)
 - the repo's read methods are findByUser(userId) and findOwned(id, userId)
   (there is NO findAll and NO findById)
 - controller.create also calls repo.logActivity, so fakeRepo MUST
   stub logActivity or the test throws TypeError

Write ONE test: controller.list calls res.json with the applications
that fakeRepo.findByUser returns. Use a fake req of { user: { id: "u1" } }
and a fake res of { json: jest.fn() }.

Stop there. I am writing the create and getOne tests myself.
```

> ✍️ **You write this yourself:** the `create` test (asserting `201` *and* that `logActivity` was called) and the `getOne` test. PA0904 is *testing a controller* — so the interesting assertions are yours.

> ⚠️ **What it usually gets wrong:** `controller.getAll` and `repo.findAll`. Those names are in every Express tutorial ever written and in **none** of our files. If the test can't find the method it fails instantly, which is the good outcome — the bad one is it silently stubs a method the controller never calls and passes anyway.

<!--
TIME: 3 min
ENERGY: Slow down here. This is the conceptual peak of the module.
WHAT TO SAY: "Read the prompt carefully because I've loaded it with the exact mistakes I expect. getAll and findAll — those are the names everybody's muscle memory reaches for, and they're not ours. Ours are list and findByUser. And the third bullet is the subtle one: our create action doesn't just create, it also logs an activity. So if your fake repo only stubs create, the controller will call logActivity on undefined and blow up with a TypeError that has nothing to do with what you were testing. A fake has to be faithful to the whole contract, not just the part you were thinking about."
DEMO: Run the prompt. Put the real repository and the fake side by side and read the method names against each other.
TRANSITION: "Let's look at why this works at all."
-->

---

# Real vs Fake Repository — Same Shape

<div class="columns"><div>

**Real (production)**

```js
const applicationRepository = (prisma) => ({
  findByUser: (userId) =>
    prisma.application.findMany({
      where: { userId },
    }),
  create: (data) =>
    prisma.application.create({ data }),
  logActivity: (id, type, note) =>
    prisma.activity.create({ ... }),
});
```

</div><div>

**Fake (testing)**

```js
const fakeRepo = {
  findByUser: (userId) =>
    Promise.resolve([
      { id: "a1", userId,
        companyName: "Test Corp",
        status: "Applied" },
    ]),
  create: (data) =>
    Promise.resolve({ id: "a99", ...data }),
  logActivity: jest.fn(),
};
```

</div></div>

> 💡 Same method names, same return shapes, both async. The controller cannot tell the difference — **that** is the whole trick.

> ⚠️ Miss `logActivity` off the fake and `controller.create` throws `TypeError: repo.logActivity is not a function`. The fake must honour the whole contract.

> 🔗 QCTO Bridge: This is the .NET `Moq` story exactly. There you'd write `mock.Setup(r => r.FindByUser(1)).Returns(...)` against an `IRepository`. Our plain object **is** the mock — JavaScript doesn't need a mocking framework to fake an interface.

<!--
WHAT TO SAY: "Two objects, identical shape. On the left findByUser opens a TCP connection to Postgres, runs SQL, and comes back in maybe fifteen milliseconds. On the right it resolves a hardcoded array in about a microsecond. Because both honour the same contract, the controller behaves identically against either one. That's what dependency injection bought us in Module 2, and if it felt abstract then, this is the concrete payoff."
DEMO: Put them side by side, highlight the matching names. Then deliberately delete logActivity from the fake and run — show the TypeError.
ENERGY: Slow down. Let the DI connection land.
TIME: 4 min
-->

---

# Inject the Fake, Assert the Behaviour

```js
const { createApplicationController } = require("../src/controllers/applications");

describe("applications controller", () => {
  const controller = createApplicationController(fakeRepo); // ← inject

  it("returns the user's applications as JSON", async () => {
    const req = { user: { id: "u1" } };
    const res = { json: jest.fn() };

    await controller.list(req, res);      // ← list, not getAll

    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ companyName: "Test Corp" }),
    ]);
  });
});
```

> 💡 Fake `req`, fake `res`, no HTTP, no database. Milliseconds — and it tests **only** the controller's logic.

> ⚠️ Common mistake: reaching through to the database to "make it realistic". That's an integration test, and it belongs in Video 5.6. Here the fake repo is what keeps the unit isolated.

> 🔗 QCTO Bridge: Identical to an ASP.NET controller unit test — construct the controller with a mocked `IRepository`, invoke the action, assert on the `IActionResult`.

<span class="pa-badge earned">PA0904 ✅</span>

<!--
WHAT TO SAY: "Look at what req and res are here. req is an object with one property, because list only ever touches req.user.id. res is an object with one jest.fn on it, because list only ever calls res.json. There's no Express in this test. There's no server running. We're calling a plain JavaScript function with two plain objects and checking what it did with them — and that is all a controller has ever been."
DEMO: Run it, point out the sub-second time in the Jest output. Then write the create test live: assert status 201 AND that logActivity was called.
TIME: 3 min
-->

---

# Checkpoint Check — PA0904

- [ ] The test calls `controller.list` — **not** `getAll`
- [ ] `fakeRepo` uses `findByUser` / `findOwned` — **not** `findAll` / `findById`
- [ ] `fakeRepo.logActivity` is stubbed, and your `create` test asserts it was **called**
- [ ] The `create` test asserts `res.status` was called with **201**
- [ ] The whole file runs in well under a second — no DB connection anywhere
- [ ] You wrote the `create` and `getOne` tests yourself

> 🔎 Test it for real: comment out the `await repo.logActivity(...)` line in the real controller. Your create test must go red. If it stays green, you asserted on the wrong thing.

<!--
TIME: 2 min
WHAT TO SAY: "The 🔎 line is the one that separates a test from a decoration. Our create action logs an activity — that's a real behaviour, a user can see it in their timeline. So a test of create that doesn't check the log happened is only testing half the action. Comment that line out in the real controller. If your test doesn't notice, then the day somebody deletes that line for real, nothing will notice either."
DEMO: Do the sabotage live.
TRANSITION: "The fake worked because of a seam. Next video — the seam itself, and the second one hiding inside it."
-->

---
layout: section
---

<span class="pa-badge">PA0905</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.5

# Implementing a Repository

#### ApplyIQ · The seam that made 5.4 possible — and the second seam hiding inside it

~7 min

<!--
🎥 VIDEO NAME: "M5.5 — Implementing a Repository (PA0905)"
🎯 OBJECTIVE: By the end the student can explain and implement the repository seam, and can test the repository itself by faking Prisma.
⚠️ RECORDING NOTE — the repository ALREADY EXISTS. It was built in Module 2 (PA0607) and it is a FACTORY: applicationRepository(prisma). Do not pretend to build it from scratch. The honest lesson is that it's a factory, which means there are TWO injection points stacked — the controller takes a repo, and the repo takes prisma. That second one is what this video is really about.
WHAT TO SAY: "In 5.4 we used a repository. We didn't build one, because we already had one — it landed in Module 2. What I never pointed out is that it's a factory too."
DEMO: Open applicationRepository.js. Point at `(prisma) =>`. That's a second seam.
COMMON QUESTION: "Didn't we do this in Module 2?" — Yes, PA0607 introduced it for separation of concerns. Here it earns its keep for testability.
TRANSITION: "Two seams stacked. Let's use the lower one."
TIME: 15s divider
-->

---

# The Prompt — Video 5.5

**You spec it. The AI scaffolds it. You still own PA0905.**

```text
Read server/src/repositories/applicationRepository.js and
server/src/routes/applications.js first.

Note the repository is a FACTORY: applicationRepository(prisma) returns
an object. It already exists — do not rewrite it.

Create server/tests/applicationRepository.test.js that tests the
repository itself by passing in a FAKE prisma client.

The fake prisma needs the shape the repository actually reaches for:
  { application: { findMany, findFirst, create, update, delete },
    activity:    { create },
    coverLetter: { create } }
Use jest.fn() for each.

Write ONE test: findByUser("u1") calls prisma.application.findMany with
exactly { where: { userId: "u1" } }.

Stop there. I am writing the findOwned test myself — it is the
interesting one because of the nested includes.
```

> ✍️ **You write this yourself:** the `findOwned` test. PA0905 is *implementing a repository* — so proving the ownership filter (`where: { id, userId }`) and the nested `include` is yours.

> ⚠️ **What it usually gets wrong:** rewriting the repository as a plain object that imports `prisma` directly at the top of the file. That would **destroy** the seam — and every test in 5.4 and 5.5 with it. If you see `require("../lib/prisma")` appear inside the repository, reject it.

<!--
TIME: 3 min
ENERGY: This is a "look closer at what you already built" video.
WHAT TO SAY: "The warning on this slide is the most destructive mistake in the module. The AI looks at our repository, sees it takes prisma as an argument, decides that's needlessly indirect, and helpfully rewrites it to just import prisma at the top. It'll look tidier. And it will quietly delete the only reason any of this is testable. That indirection isn't clutter, it's the seam — and this is exactly why you read the diff instead of trusting the output."
DEMO: Run the prompt. Confirm the repository file is untouched — `git status` should show only the new test file.
TRANSITION: "Let's see both seams at once."
-->

---

# Two Seams, Stacked

```js
// repositories/applicationRepository.js — takes prisma  ← seam 2
const applicationRepository = (prisma) => ({
  findByUser: (userId) => prisma.application.findMany({ where: { userId } }),
  findOwned:  (id, userId) => prisma.application.findFirst({
    where: { id, userId },                    // ← ownership, not just id
    include: { activities: true, contacts: true, coverLetters: true },
  }),
});

// controllers/applications.js — takes a repo            ← seam 1
const createApplicationController = (repo) => ({ ... });

// routes/applications.js — production wiring, both seams closed
const repo = applicationRepository(prisma);
const controller = createApplicationController(repo);
```

> 💡 Seam 1 lets you fake the **repository** (Video 5.4). Seam 2 lets you fake **Prisma itself** (this video). Same technique, one layer down.

> ⚠️ `findOwned` filters on `{ id, userId }` — **not** just `id`. That single extra key is what stops User A reading User B's application. It is a security control, and it deserves a test.

> 🔗 QCTO Bridge: This is `IRepository` + constructor injection in ASP.NET. Production registers the EF Core implementation in the DI container; tests pass a Moq mock. Our factory argument **is** that injection point.

<!--
WHAT TO SAY: "Read those three files as one picture. The controller takes a repo. The repo takes prisma. And routes dot js is the only file in the entire project where those two seams get closed with real implementations — one line each. Everywhere else, they're open, which means everywhere else, they're testable. And look at findOwned: the where clause has id AND userId. If it only had id, then anyone who guessed a cuid could read anyone's application. That's not a preference, that's the authorisation check, and it's hiding in a where clause — which is exactly the kind of line that gets 'simplified' by someone who doesn't know what it's for."
DEMO: Open all three files. Trace the wiring. Then write the findOwned test live, asserting userId is in the where clause.
TIME: 4 min
-->

---

# Checkpoint Check — PA0905

- [ ] `applicationRepository.js` is **unchanged** — `git status` shows only a new test file
- [ ] It still takes `prisma` as a factory argument; it does **not** require prisma itself
- [ ] The fake prisma uses `jest.fn()` so you can assert on the **arguments**
- [ ] Your `findOwned` test asserts `userId` is in the `where` clause
- [ ] You can point at the two seams and say which video uses which
- [ ] You wrote the `findOwned` test yourself

> 🔎 Test it for real: delete `userId` from `findOwned`'s where clause. Your test must go red. That test is now guarding a security boundary — treat it that way.

<!--
TIME: 2 min
ENERGY: This is the most important sabotage in the module. Do it slowly.
WHAT TO SAY: "Do this one on camera with me. Take userId out of that where clause. The app still runs. Every other test still passes. Nothing looks wrong. And ApplyIQ now lets any logged-in user read any other user's applications by guessing an ID. One test catches it. That's the answer to 'why do we write tests' — not because bugs are annoying, but because some bugs are silent and expensive."
DEMO: Do the sabotage. Show the red. Put it back.
TRANSITION: "We've got tests at every level. Time to run them all."
-->

---
layout: section
---

<span class="pa-badge">PA0909</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.6

# Running Unit Tests Against Components

#### ApplyIQ · One command, the whole suite, and integration tests over real HTTP

~8 min

<!--
🎥 VIDEO NAME: "M5.6 — Running Unit Tests Against Components (PA0909)"
🎯 OBJECTIVE: By the end the student can run the full suite in both workspaces, read coverage output, and write an integration test that sends real HTTP into the Express app.
WHAT TO SAY: "We've written tests across the pyramid. Now we run them all with one command per workspace, add integration tests over real HTTP with Supertest, and read coverage."
DEMO: Run npm test in server/, then in client/. Two suites, two runners.
COMMON QUESTION: "Why two runners?" — The server is CommonJS on Node, the client is ESM in a fake browser. Jest and Vitest each suit one. Same concepts, same assertions.
TRANSITION: "Wire it into CI and the green becomes the gate — that's Module 7."
TIME: 15s divider
-->

---

# The Prompt — Video 5.6

**You spec it. The AI scaffolds it. You still own PA0909.**

```text
Read server/src/app.js, server/src/routes/auth.js and
server/src/controllers/auth.js first.

Create server/tests/auth.integration.test.js using supertest
(already in devDependencies).

CRITICAL — app.js exports with `module.exports = app`, so import it as
  const app = require("../src/app");
NOT as a named import. And app.js THROWS at require-time if CLIENT_URL
is missing, so tests/setup.js must already have loaded .env.test.

Assert what our code ACTUALLY does — read the controller, do not assume:
 - POST /api/auth/register with a valid body returns 201 and a body of
   { id, email, name }. It does NOT return a token. Do not assert a token.
 - POST /api/auth/login with those credentials returns 200 and a body
   containing a token.
 - POST /api/auth/register with an email that already exists returns 409.

Add a coverage threshold to jest.config.js: global lines 70.
```

> ✍️ **You write this yourself:** reading the coverage report and deciding what the uncovered lines mean. PA0909 is *running the suite against components* — the interpretation is the assessable part.

> ⚠️ **What it usually gets wrong:** asserting `res.body.token` on **register**. Every auth tutorial returns a token on signup; **ours doesn't** — it returns the user and makes you log in. If the AI asserts a token there, it pattern-matched a tutorial instead of reading `controllers/auth.js`.

<!--
TIME: 3 min
ENERGY: Momentum. This is where it all comes together.
WHAT TO SAY: "Two landmines in this prompt and I've defused both in advance. First, the require line — app.js uses module.exports, so there are no curly braces. Get that wrong and you'll get 'app is not a function' which tells you nothing. Second, and this is the one I actually care about: register does not return a token in our app. Go read the controller, I'll wait — it returns id, email and name, and then you log in separately. But every tutorial on the internet returns a token on signup, so the model will confidently assert one. That test will fail, and you'll waste twenty minutes wondering what's broken in your register endpoint. Nothing is. The test was wrong."
DEMO: Run the prompt. Open controllers/auth.js beside the generated test and read the register response shape against the assertion.
TRANSITION: "Let's run everything."
-->

---

# Integration Tests Over Real HTTP

```js
const request = require("supertest");
const app = require("../src/app");        // ← module.exports, no braces

it("registers a user and returns 201 with no token", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ email: "new@test.com", password: "Password1", name: "New" });

  expect(res.status).toBe(201);
  expect(res.body).toEqual(
    expect.objectContaining({ email: "new@test.com" })
  );
  expect(res.body.token).toBeUndefined();   // ← ours returns the USER
});
```

> 💡 Supertest sends a real HTTP request into your Express app — the full middleware pipeline runs. No browser, no running server, no Postman.

> ⚠️ Common mistake: integration tests that don't reset the DB. The second run hits "Email already registered" and returns 409. That's why `setup.js` wipes tables between runs.

> 🔗 QCTO Bridge: This is ASP.NET's `WebApplicationFactory<Program>` + `HttpClient` integration test — boot the app in-process and assert on real responses. Supertest's `request(app)` **is** that in-process client.

<!--
WHAT TO SAY: "Notice the last assertion — I'm asserting a token is NOT there. That feels strange to write, but it's documenting a real design decision: we don't auto-login people on signup. And notice what this test exercises that the unit tests didn't. This request goes through cors, through express.json, through morgan, through requestLogger, into the router, through validate, into the controller, and back out through errorHandler if anything throws. Every unit test in this module tested one box. This tests the wiring between all of them."
DEMO: Run it. Then run it a SECOND time without wiping the DB to show the 409 — that failure IS the lesson about test isolation.
TIME: 4 min
-->

---

# Configure the Runners, Run Everything

<div class="columns"><div>

**Server — Jest**

```json
"scripts": {
  "test": "jest --runInBand",
  "test:cov": "jest --coverage"
}
```
```js
// jest.config.js
coverageThreshold: {
  global: { lines: 70 },
},
```

</div><div>

**Client — Vitest**

```js
// vite.config.js
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./src/tests/setup.js",
},
```

</div></div>

> 💡 `--runInBand` runs tests serially so they don't fight over the shared test database. `jsdom` is a fake browser, so React renders with no real Chrome.

> ⚠️ A coverage threshold is a floor, not a goal. 100% coverage of trivial getters proves nothing; 70% that includes every error path proves a lot.

> 🔗 QCTO Bridge: `npm test` is our `dotnet test`. The coverage threshold is the equivalent of a Coverlet gate failing the build below target.

<span class="pa-badge earned">PA0909 ✅</span>

<!--
WHAT TO SAY: "Two runners because we have two very different environments — the server is CommonJS running on Node, the client is ESM running in a fake browser. Jest suits one, Vitest suits the other, and the assertions look almost identical either way. And on coverage: it's a floor, not a target. I've seen codebases at ninety percent coverage where every test asserts that a getter returns the thing you just set. Seventy percent that covers your error paths is worth far more."
DEMO: Run `npm run test:cov` in server, read the table aloud, point at an uncovered line and ask whether it matters.
ENERGY: Celebratory — momentum builds with each green line.
TIME: 3 min
-->

---

# Checkpoint Check — PA0909

- [ ] `const app = require("../src/app")` — no curly braces
- [ ] The register test asserts **201** and does **not** assert a token
- [ ] The login test is where the token assertion lives
- [ ] `npm test` is green in **both** `server/` and `client/`
- [ ] `npm run test:cov` prints a coverage table and you can read it aloud
- [ ] You can name one uncovered line and say whether it's worth covering

> 🔎 Test it for real: run the suite twice in a row. If the second run fails on a 409, your cleanup isn't running — fix it now, because Module 7 runs this in CI where every run is a first run.

<!--
TIME: 2 min
WHAT TO SAY: "Run it twice. I mean it. A test suite that only passes on a clean database is a suite that will fail in CI on somebody else's machine at seven in the evening the day you're trying to ship. Test isolation isn't a nicety, it's the difference between a suite people trust and a suite people start skipping."
DEMO: Run twice on camera.
TRANSITION: "Everything's green on the happy path. Now let's prove we fail properly."
-->

---
layout: section
---

<span class="pa-badge">PA0910</span> <span class="text-sm text-gray-400">QCTO PM-09 · PS09</span>

## VIDEO 5.7

# Handling Exceptions Smoothly

#### ApplyIQ · Proving the app fails with a clean 404 — and finding one place it doesn't

~8 min

<!--
🎥 VIDEO NAME: "M5.7 — Handling Exceptions Smoothly (PA0910)"
🎯 OBJECTIVE: By the end the student can test the error path end to end and can recognise a missing guard that only a test reveals.
⚠️ RECORDING NOTE — there is a REAL finding in this video. routes/applications.js mounts NO validate() middleware, unlike routes/auth.js. So POST /api/applications with a valid token and an empty body does NOT return 400 — it reaches Prisma and blows up as a 500. Do not fake this. Write the test expecting 400, watch it fail with 500, and fix it on camera by adding a Joi schema + validate(). That failure is the most valuable thirty seconds in the module.
WHAT TO SAY: "An app that crashes is failing. An app that returns a clean 404 is succeeding at handling failure. We test that the error path is as correct as the happy one — and we're going to find a place where ours isn't."
DEMO: Show getOne throwing NotFoundError, and errorHandler turning it into a 404 body.
COMMON QUESTION: "Where's the error middleware itself?" — Built in Module 2 (PA0906/0907). Here we prove it behaves.
TRANSITION: "Wrap the module."
TIME: 15s divider
-->

---

# The Prompt — Video 5.7

**You spec it. The AI scaffolds it. You still own PA0910.**

```text
Read server/src/controllers/applications.js,
server/src/middleware/errorHandler.js, server/src/errors/NotFoundError.js
and server/src/routes/applications.js first.

Create server/tests/errors.test.js.

Important: controller.getOne does NOT call res.status(404). It THROWS
NotFoundError, and asyncHandler forwards that to errorHandler, which
turns it into the response. So:

1. UNIT: give the controller a fakeRepo whose findOwned resolves null,
   and assert controller.getOne REJECTS with NotFoundError.
   Use await expect(...).rejects.toThrow(NotFoundError).
2. INTEGRATION: GET /api/applications/does-not-exist with a valid token
   returns 404 and a body of { error: "Application not found" }.
3. INTEGRATION: GET /api/applications with NO Authorization header
   returns 401 — the guard runs before anything else.

Do NOT write the invalid-body test. I write that one on camera because
I expect it to fail.
```

> ✍️ **You write this yourself:** the invalid-body test — and the fix it forces. PA0910 is *handling exceptions smoothly*, and the assessable moment is you finding a gap and closing it.

> ⚠️ **What it usually gets wrong:** asserting `res.status` was called with 404 in the unit test. That's how most controllers work; **ours throws instead**, so that assertion fails against perfectly correct code. Read `getOne` before you believe any test about it.

<!--
TIME: 3 min
ENERGY: Set up the trap deliberately. The next slide springs it.
WHAT TO SAY: "Instruction one is a genuine fork in the road. There are two ways to write a 404 in Express: the controller calls res.status 404 itself, or the controller throws and a central error handler shapes the response. We chose the second one back in Module 2 — that's what NotFoundError and errorHandler are for. Most tutorials choose the first. So the model will write you a test asserting res.status was called with 404, that test will fail, and the code it's testing is completely correct. Read the controller before you believe the test."
DEMO: Run the prompt. Open getOne, point at `throw new NotFoundError(...)`. Trace it through asyncHandler into errorHandler.
TRANSITION: "Now the one I said I'd write myself."
-->

---

# The Test That Fails — and What It Found

```js
it("returns 400 when the body is invalid", async () => {
  const res = await request(app)
    .post("/api/applications")
    .set("Authorization", `Bearer ${token}`)
    .send({});                               // no companyName, no role

  expect(res.status).toBe(400);
});
```

```
● returns 400 when the body is invalid
  expected 400, received 500
```

**Why:** `routes/auth.js` mounts `validate(registerSchema)`. `routes/applications.js` mounts **nothing**. The empty body sails past the guard, reaches Prisma, and a missing required column becomes an unhandled 500.

> 💡 This is what tests are actually for. The feature "worked" for four modules because you only ever sent good data.

> ⚠️ A 500 here is a real bug: it leaks nothing (our `errorHandler` hides the stack — good) but it tells the user "server broke" when the truth is "you forgot a field."

<!--
TIME: 4 min
ENERGY: This is the payoff moment of the whole module. Do not rush it.
WHAT TO SAY: "There it is. I wrote a test asserting that a bad request gets a 400, and it came back 500. Now — I want to be really clear that I did not plan this as a teaching device. This is a genuine gap in the code we've been building together, and I found it the same way you'd find it: by writing a test for a path I'd never manually clicked. Four modules. Every single time I created an application I filled the form in properly, because I'm the one who built the form. The one thing I never did was submit rubbish. And the moment a test did it, the gap fell straight out."
DEMO: Write the test live, run it, let the red sit on screen for a beat before explaining.
TRANSITION: "So let's fix it."
-->

---

# Fix It — Then Watch the Test Go Green

```js
// server/src/schemas/application.schema.js   ← new
const Joi = require("joi");

const createApplicationSchema = Joi.object({
  companyName: Joi.string().required(),
  role:        Joi.string().required(),
  status:      Joi.string().valid(...["Saved","Applied","Screening",
                 "Interview","Technical","Offer","Rejected"]),
  salary:      Joi.number().integer().optional(),
  location:    Joi.string().optional(),
});
```

```js
// server/src/routes/applications.js
router.post("/", validate(createApplicationSchema), auditAction,
  asyncHandler(controller.create));
```

> 💡 `validate` was written in Module 2 and has been sitting there unused on this route ever since. We didn't build anything new — we finished wiring something we already had.

> ⚠️ Order matters: `validate` goes **before** the controller, and after `authenticateToken` (already mounted with `router.use`). Put it after the controller and it never runs.

<span class="pa-badge earned">PA0910 ✅</span>

<!--
WHAT TO SAY: "And look at the fix — I didn't write any new machinery. validate dot js has existed since Module 2. The Joi schema is six lines. All I did was wire a guard onto a route that never got one, and the reason it never got one is that nothing ever forced me to think about the unhappy path. The test forced me. Run it now — green. And that green means something, because I watched it be red thirty seconds ago."
DEMO: Create the schema, wire the route, re-run. Green. Then re-run the whole suite to confirm nothing else broke.
TIME: 4 min
-->

---

# Checkpoint Check — PA0910

- [ ] The unit test uses `rejects.toThrow(NotFoundError)` — not `res.status(404)`
- [ ] The 404 integration test asserts the body is `{ error: "Application not found" }`
- [ ] The no-token test returns **401**, proving the guard runs first
- [ ] You saw the invalid-body test fail with **500** before you fixed it
- [ ] `schemas/application.schema.js` exists and `validate()` is mounted on `POST /`
- [ ] The full suite is green in both workspaces after the fix

> 🔎 Test it for real: remove `validate(...)` from the route again. The 400 test must go back to 500. Put it back. You now have a test standing guard over a gap that existed for four modules.

<!--
TIME: 2 min
ENERGY: Proud. They just did real engineering.
WHAT TO SAY: "Line four is the one I'd put on the wall. You saw it fail. Anybody can add a Joi schema — that's ten minutes of typing. What you did today was find out you needed one, and you found out because you wrote a test for a path you'd never walked. That's the skill. The schema is the easy part."
DEMO: Walk each line. Do the final sabotage-and-restore.
TRANSITION: "That's the module."
-->

---
layout: cover
---

# Module 5 Complete — Your Code Is Now Provably Correct

7 videos · 7 checkpoints · one green command

<div class="columns"><div>

**Earned**

<span class="pa-badge earned">PA0901 ✅</span>
<span class="pa-badge earned">PA0902 ✅</span>
<span class="pa-badge earned">PA0903 ✅</span>
<span class="pa-badge earned">PA0904 ✅</span>

</div><div>

&nbsp;

<span class="pa-badge earned">PA0905 ✅</span>
<span class="pa-badge earned">PA0909 ✅</span>
<span class="pa-badge earned">PA0910 ✅</span>

</div></div>

<div class="progress-bar"><div class="fill" style="width:100%"></div></div>

### We also closed two real gaps

- `DashboardPage` no longer lies — real stats, from a tested pure function
- `POST /api/applications` now validates — a bug a test found, not a human

> 💡 You can unit-test components and models, test a controller with a fake repository, test the repository itself with a fake Prisma, run the full suite with coverage, and prove graceful failure — the entire testing pyramid.

**Coming up — Module 6: Performance & Real-Time** — server-side caching, state management with TanStack Query, and Socket.IO notifications.

<!--
🎥 VIDEO NAME: "M5.8 — End of Module 5!"
WHAT TO SAY: "Seven checkpoints, and two bugs that were sitting in our codebase for four modules until something automated went looking. That's the honest pitch for testing — not that it proves your code works, but that it tells you the truth about code you were sure about. Module 6: we make it fast, and we make it live."
ENERGY: Proud, affirming. They levelled up.
TIME: 1 min
-->
