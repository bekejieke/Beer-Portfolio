# Manager To Executor Handoff

## Current Task ID

TASK-002

## Task File Path

.agent/tasks/TASK-002.md

## Current Status

EXECUTED

## Execution Branch

agent/TASK-002-optimize-github-pr-collaboration-workflow

## Execution Worktree

E:\codex code

## Must Read

- AGENTS.md
- .agent/WORKFLOW.md
- .agent/tasks/TASK-002.md
- .agent/reports/TASK-001-R1-review.md

## Do Not Modify

- Business UI or application features.
- `.agent/sessions.local.json`
- Real Codex Session IDs.

## Test Requirements

- `npm run agent:validate`
- `node scripts/validate-task.js .agent/tasks/TASK-002.md`
- `node scripts/agent-status.js`
- `npm run agent:github-pr -- --no-push`
- `git status --short --branch`
- `git diff --stat`

## Deliverables

- Workflow scripts and docs.
- GitHub PR template and Actions workflow.
- Execution report.
- Commit after validation.
