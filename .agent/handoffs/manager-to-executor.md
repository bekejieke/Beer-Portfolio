# Manager To Executor Handoff

## Current Task ID

TASK-003

## Task File Path

.agent/tasks/TASK-003.md

## Current Status

READY

## Execution Branch

agent/TASK-003-scaffold-nextjs-portfolio-app-shell

## Execution Worktree

E:\codex code

## Product Direction

Beer Portfolio is entering P0 MVP implementation. The site is a content-first
developer portfolio for internship, job search, and personal branding. It
should emphasize AI product practice, WeChat miniprograms, web development,
product design, testing evidence, resume access, and contact paths. Keep the
visual direction dark, restrained, and evidence-oriented; do not copy any
reference site.

## Must Read

- AGENTS.md
- .agent/WORKFLOW.md
- docs/PRD.md
- docs/DESIGN.md
- docs/ACCEPTANCE.md
- .agent/current-task.json
- .agent/task-board.md
- .agent/tasks/TASK-003.md
- .agent/reports/TASK-002-review.md

## Do Not Modify

- Work outside TASK-003 scope.
- `.agent/sessions.local.json`
- Real Codex Session IDs.
- Full project detail pages, animation system, CMS, analytics, deployment, or
  final portfolio content.
- `main` directly.

## Test Requirements

- Install dependencies with the selected package manager.
- Run the production build command.
- Run lint/type/static checks available in the scaffold.
- Run `npm run agent:validate`.
- Start the local dev server and manually verify desktop and mobile layouts.
- Check for horizontal overflow.
- Run a tracked secret/session scan.

## Deliverables

- Next.js App Router project shell.
- Responsive homepage shell.
- Base theme/global styles.
- Basic metadata and 404 placeholder.
- Required directories and placeholders.
- Git commit on `agent/TASK-003-scaffold-nextjs-portfolio-app-shell`.
- GitHub draft PR for TASK-003.
- `.agent/reports/TASK-003-execution.md`.

## Manager Note

TASK-002 received Reviewer `PASS_WITH_NOTES` and PR #1 was merged into `main`.
TASK-003 is now the first P0 business implementation task. Keep it deliberately
small: scaffold, responsive shell, validation, and PR handoff only.
