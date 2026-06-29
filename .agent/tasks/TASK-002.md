# TASK-002: Optimize GitHub PR Collaboration Workflow

## Basic Information

- Status: EXECUTED
- Priority: P0
- Created At: 2026-06-29T21:20:00.000+08:00
- Owner: Executor Agent
- Reviewer: Reviewer Agent
- Target Branch: agent/TASK-002-optimize-github-pr-collaboration-workflow
- Pull Request: TBD

## Background

The repository already has a Codex multi-agent workflow and a GitHub remote.
The current process still relies too much on local manual Git operations. The
project needs a clearer task branch, draft PR, CI, and merge-gate workflow so
Manager, Executor, and Reviewer can coordinate without sharing context.

## Goal

Establish GitHub as the remote collaboration gate while keeping local Git as the
source of real code changes. Each implementation task should be traceable from
task file to branch, commit, PR, execution report, review report, and Manager
merge decision.

## Preconditions

- `TASK-001-R1` has Reviewer conclusion `PASS_WITH_NOTES`.
- GitHub repository `bekejieke/Beer-Portfolio` exists.
- Local `gh` CLI is available when the GitHub app connector is not available.

## Scope

- Add a reusable script for creating or reusing GitHub draft PRs from task branches.
- Add GitHub PR template with Manager, Executor, and Reviewer checklists.
- Add GitHub Actions workflow for agent workflow validation.
- Update local task creation so new tasks get stable `agent/TASK-XXX-slug` branches.
- Update status output to show the current PR URL when available.
- Document the GitHub PR collaboration gate in README, AGENTS, and workflow docs.

## Non-Goals

- Do not develop Beer Portfolio business UI.
- Do not auto-merge pull requests.
- Do not push real Codex Session IDs.
- Do not require GitHub MCP if the local `gh` fallback is working.
- Do not create a production deployment workflow in this task.

## Expected Files

- `.github/pull_request_template.md`
- `.github/workflows/agent-validation.yml`
- `.agent/WORKFLOW.md`
- `.agent/project.json`
- `.agent/current-task.json`
- `.agent/task-board.md`
- `.agent/tasks/TASK-002.md`
- `.agent/reports/TASK-002-execution.md`
- `AGENTS.md`
- `README.md`
- `package.json`
- `scripts/agent-github-pr.js`
- `scripts/agent-status.js`
- `scripts/create-task.js`
- `scripts/validate-workflow.js`

## Implementation Requirements

- `scripts/agent-github-pr.js` must refuse to open PRs from `main` or `master`.
- The PR script must require a clean working tree before creating a PR.
- The PR script must push the current branch by default and reuse an existing PR
  when one already exists.
- The PR script must update `.agent/current-task.json` with the PR URL when
  available.
- `create-task.js` must generate valid Markdown and a stable task branch name.
- GitHub Actions must run `validate-workflow.js` and validate the current task
  when one is present.
- Workflow docs must state that Manager merges only after Reviewer returns
  `PASS` or `PASS_WITH_NOTES`.

## Acceptance Criteria

- [ ] `npm run agent:validate` passes.
- [ ] `node scripts/validate-task.js .agent/tasks/TASK-002.md` passes.
- [ ] `node scripts/agent-status.js` shows current task and PR field.
- [ ] `npm run agent:github-pr -- --no-push` refuses to run from `main`.
- [ ] PR template and GitHub Actions workflow exist.
- [ ] No real Codex Session ID is committed.

## Test Requirements

- `npm run agent:validate`
- `node scripts/validate-task.js .agent/tasks/TASK-002.md`
- `node scripts/agent-status.js`
- `npm run agent:github-pr -- --no-push`
- `git status --short --branch`
- `git diff --stat`

## Deliverables

- Workflow scripts
- GitHub PR template
- GitHub Actions validation workflow
- Documentation updates
- Git commit
- Execution report

## Risks

- GitHub Actions only validates workflow files for now; future business code
  build, lint, and test commands must be added after the frontend stack is
  scaffolded.
- Draft PR creation depends on `gh` authentication when the GitHub connector is
  unavailable.

## Current Status

EXECUTED
