# Manager To Executor Handoff

## Current Task ID

TASK-002

## Task File Path

.agent/tasks/TASK-002.md

## Current Status

PASSED

## Execution Branch

agent/TASK-002-optimize-github-pr-collaboration-workflow

## Execution Worktree

E:\codex code

## Must Read

- AGENTS.md
- .agent/WORKFLOW.md
- .agent/tasks/TASK-002.md
- .agent/reports/TASK-001-R1-review.md
- .agent/reports/TASK-002-execution.md
- .agent/reports/TASK-002-review.md, once it exists

## Do Not Modify

- Business UI or application features.
- `.agent/sessions.local.json`
- Real Codex Session IDs.
- TASK-003 business implementation until Manager creates the formal task after TASK-002 review and merge.

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

## Manager Note

TASK-002 received Reviewer `PASS_WITH_NOTES`. Manager is reconciling the PR #1
merge. Executor has no TASK-003 assignment until Manager creates the formal
TASK-003 task file and handoff after the merge.
