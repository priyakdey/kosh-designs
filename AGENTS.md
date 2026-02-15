# AGENTS.md

## Project Context (Mock-First UI)

This repository is a **mock UI playground** ("Figma in code") built in static HTML.
Do not treat links as real backend/app routes yet.
These mocks are the **design reference baseline** for a future React application.

Target eventual stack (for later migration):
- React + TypeScript
- shadcn/ui
- Tailwind CSS
- TanStack Query

The plan is to take this design language and structure, then convert it into a proper componentized React app (pages, reusable components, state/data layer, etc.).

## Routing Convention (Current Phase)

Use direct `.html` navigation between pages.
Do **not** generate route-style links like `/income` or `/expenses` in this phase.

Examples:
- Use `dashboard.html` instead of `/`
- Use `income.html` instead of `/income`
- Use `expenses.html` instead of `/expenses`

If a destination page does not exist yet, still link to the expected mock file name.
Broken links are acceptable for now.

## Naming Decisions

- Use `Expenses` label in sidebar/navigation (not `Expenditure`).
- Current expenses page file is `expenses.html`.
- `mutual-funds.html` is under `investments/`.
- `fixed-deposits.html` and `stocks.html` are under `investments/`.

## Navigation Scope

- Start navigation from `dashboard.html`.
- Keep `landing.html` out of app-nav rewiring unless explicitly requested.

## Quick Actions / Modals

For now, quick actions should prefer local mock behavior (modals/forms in current page) when requested.
Avoid assuming real app-level route wiring.

## Relative Path Rules

When editing files under `investments/`, use relative links with `../` for root-level pages.
Examples:
- `../dashboard.html`
- `../income.html`
- `../expenses.html`
- `../profile-settings.html`

## Future Migration Note

When migrating to SPA:
- Convert current `.html` links into app routes and secure/protected routes where needed.
- Preserve the current mock design intent as the starting point.
- Refine design where needed for production quality (expected and allowed).

Until then, keep mock fidelity and interaction feel as priority.

## Additional Working Note

Given any instruction, make sure the changes are minimal, and always ask before running any command.
Use `dd/mm/yyyy` as the standard date format throughout the mocks.
