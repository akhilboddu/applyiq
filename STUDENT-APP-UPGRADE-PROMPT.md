# Turn my existing app into a polished, useful product

Work inside the app repository open in this workspace. Inspect it, understand what already works, then implement an upgrade. Do not stop at advice, a mockup or a plan.

## Understand before changing

Read the README, agent instructions, dependencies, routes, data models and main user flows. Identify the audience, the problem the app solves and the most valuable action a user can complete. Infer sensible defaults from the existing app; ask only when a missing answer would materially change the work.

Briefly explain what you found and the upgrade you will implement, then proceed. Preserve the existing stack, working features and user data. Improve this application rather than replacing it with a different product. Use the existing design system if it is authoritative; otherwise develop a coherent visual identity suited to the audience.

## Make it useful

Improve the complete journey: first visit → getting started → useful result → saved progress → next action. Make the primary action obvious. Reduce repeated typing, confusing navigation and unnecessary steps. Make onboarding short and explain unfamiliar concepts where needed.

Wire every visible action to real behaviour. Implement loading, empty, success, validation, failure and retry states. Persist data appropriately, preserve work when requests fail and prevent duplicate submissions. Use real identity and application data. Never disguise mock data or a simulated integration as working functionality.

If the app uses AI, ground outputs in supplied information, show limitations honestly and handle provider failures. Do not invent facts about users or claim capabilities that are not implemented. If it already has payments, preserve their integrity; do not add monetisation just because a product can have a pricing page.

## Make the design memorable

Aim for a professionally art-directed product that users want to explore and return to. A palette swap and rounded cards are not enough.

Choose a clear visual direction appropriate to the app, and define typography, colours, spacing, surfaces, icons and motion. Give the app one recognisable visual or interaction idea, such as an interactive preview, a distinctive timeline or an elegant workspace. Make that idea useful, not decorative clutter.

Redesign the most important screen first, inspect it in the browser, and extend the successful design across the app. Give each screen its own hierarchy rather than repeating one card grid. Use strong typography, deliberate composition, well-written interface copy and thoughtful transitions. Use real product content and appropriately licensed assets.

Avoid default-template styling, inconsistent icons, excessive gradients, meaningless animations, fake testimonials and fabricated statistics. Make mobile as considered as desktop. Keep text readable, focus visible, controls keyboard-accessible, contrast sufficient and reduced motion supported. Engagement must not come at the expense of speed or usability.

## Implement and verify

Reuse sensible components, remove obsolete placeholders and fix defects that block the main journey. Validate input server-side where applicable, enforce record ownership, protect secrets and keep changes maintainable. Add appropriate automated tests using the project's existing test tools.

**Use raw Chrome DevTools Protocol (Chrome CDP) for browser interaction and end-to-end verification—not Playwright, an extension or an unrelated browser session.** Use the configured CDP connection and existing browser profile. Prefer the installed Chrome CDP skill/helper if available. If unavailable, report the exact connection/setup blocker; do not silently switch tools or claim the browser was tested.

Navigate the real app, exercise the critical flows and inspect desktop and mobile layouts. Use disposable test data in local/staging environments. Inspect relevant browser errors and failed requests without exposing credentials. Check forms, navigation, save/reload, error recovery and keyboard use. Capture screenshots and review them visually; code compiling is not visual verification. Never inspect stored browser passwords, cookies or unrelated account data.

Do at least one genuine visual review and refinement pass after the first implementation. Keep fixing visible rough edges and broken flows until the result is coherent and the critical journey passes. Run the relevant lint, tests and production build.

## Finish properly

Deliver the implemented app, not just suggestions. Update setup instructions and example environment-variable names without secrets. Provide the local preview or staging URL when available, relevant screenshots, a concise change summary, verification results and any actual remaining blockers.

Do not buy services, send external messages, run real charges, delete production data or deploy publicly unless that action is already authorised. Prepare an exact handoff for any genuinely blocked step. Do not let an optional integration prevent completion of the rest of the upgrade.
