# TASK-003: Scaffold Next.js Portfolio App Shell

## Basic Information

- Status: EXECUTED
- Priority: P0
- Created At: 2026-06-29T22:49:02.1558571+08:00
- Owner: Executor Agent
- Reviewer: Reviewer Agent
- Target Branch: agent/TASK-003-scaffold-nextjs-portfolio-app-shell
- Pull Request: To be created by Executor after implementation

## Background

TASK-002 established the GitHub PR collaboration gate and was merged into
`main`. Beer Portfolio now enters the P0 MVP implementation phase. The first
business implementation task should create the smallest usable application
foundation without attempting to finish the full portfolio content or visual
polish.

## Goal

Initialize a Next.js App Router portfolio project shell with TypeScript,
Tailwind CSS, the expected content/data directories, and a responsive homepage
layout foundation matching the product direction: desktop two-column layout
with a left profile/sidebar placeholder and right content section placeholders,
collapsing to one column on mobile.

## Preconditions

- TASK-002 has Reviewer conclusion `PASS_WITH_NOTES`.
- GitHub PR #1 has been merged into `main`.
- Executor works on `agent/TASK-003-scaffold-nextjs-portfolio-app-shell`, not
  directly on `main`.

## Scope

- Initialize or adapt the repository into a Next.js App Router application.
- Use TypeScript and Tailwind CSS.
- Establish base directories:
  - `src/app`
  - `src/components`
  - `src/data`
  - `content/projects`
  - `content/notes`
- Create a homepage shell with:
  - desktop layout at `>=1024px`: left profile/sidebar placeholder and right
    scrolling content area;
  - mobile layout at `<768px`: single-column flow;
  - placeholder sections for about, experience, featured projects, other
    projects, notes, and contact.
- Add initial dark theme tokens aligned with `docs/DESIGN.md`, without full
  visual refinement.
- Add basic metadata for the home page.
- Add a basic `not-found` / 404 placeholder.
- Preserve existing agent workflow scripts and validation behavior.

## Non-Goals

- Do not implement full project detail pages.
- Do not fill real final portfolio copy, project case studies, screenshots, or
  resume assets.
- Do not add an animation system.
- Do not add MDX rendering beyond creating the content directories.
- Do not add a database, CMS, analytics, deployment workflow, or contact form.
- Do not broaden the task into full P0 completion.

## Expected Files

Executor may choose the exact generated file set, but the implementation should
normally touch or add:

- `package.json`
- `next.config.*`
- `tsconfig.json`
- `postcss.config.*`
- `tailwind.config.*`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`
- `src/components/*`
- `src/data/*`
- `content/projects/.gitkeep`
- `content/notes/.gitkeep`
- `.agent/reports/TASK-003-execution.md`

## Implementation Requirements

- Keep the first screen as the portfolio shell itself, not a landing/marketing
  page.
- Use semantic HTML landmarks where practical.
- Use CSS/Tailwind responsive rules so:
  - desktop `>=1024px` uses a two-column layout;
  - mobile `<768px` uses one column;
  - the page has no horizontal overflow.
- Keep visual styling dark, restrained, and content-first.
- Use the design accent color sparingly.
- Add package scripts needed for local development and validation.
- Keep agent scripts working after adding the Next.js stack.
- Do not commit tokens, real Session IDs, API keys, or private data.

## Acceptance Criteria

- [ ] App dependencies install successfully.
- [ ] Local dev server can start.
- [ ] Production build passes.
- [ ] TypeScript and lint/static checks pass, or any unavailable check is
  explicitly justified in the execution report.
- [ ] `npm run agent:validate` still passes.
- [ ] Homepage at desktop width `>=1024px` displays the intended two-column
  shell.
- [ ] Homepage at mobile width `<768px` displays a single-column layout.
- [ ] Homepage has no horizontal overflow in desktop or mobile checks.
- [ ] Basic metadata exists for the app.
- [ ] 404 placeholder exists.
- [ ] No token, real Session ID, API key, or credential is tracked.
- [ ] Executor creates or updates a GitHub PR for TASK-003.
- [ ] Execution report exists at `.agent/reports/TASK-003-execution.md`.

## Test Requirements

- Install dependencies with the selected package manager.
- Run the production build command.
- Run lint/type/static checks available in the scaffold.
- Run `npm run agent:validate`.
- Start the local dev server and manually verify the homepage at desktop and
  mobile viewport widths.
- Check for horizontal overflow.
- Run a tracked secret/session scan similar to previous tasks.
- Record all commands and results in the execution report.

## Deliverables

- Next.js App Router project shell.
- Responsive homepage shell.
- Base theme/global styles.
- Basic metadata and 404 placeholder.
- Required directories and placeholders.
- Passing validation/build evidence.
- Git commit on the TASK-003 branch.
- GitHub draft PR for TASK-003.
- Execution report.

## Risks

- The first scaffold can easily expand into full page design. Keep this task to
  structure, buildability, and responsive shell only.
- Package installation may create large lockfile changes; Executor should use
  the package manager consistently and avoid unrelated dependency additions.

## Current Status

EXECUTED
