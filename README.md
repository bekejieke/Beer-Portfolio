# Beer Portfolio

Beer Portfolio is a personal developer portfolio project for internship, job-search, and personal brand building. The product direction is a restrained, content-first portfolio that presents AI product practice, WeChat mini program work, project responsibilities, technical decisions, testing evidence, resume access, and contact paths.

## Current Phase

This repository currently contains the collaboration foundation for a Codex multi-agent workflow. Business implementation should start only after the workflow foundation passes Reviewer validation.

## Product Documents

- [PRD](docs/PRD.md)
- [Design Direction](docs/DESIGN.md)
- [Acceptance Criteria](docs/ACCEPTANCE.md)

## Agent Workflow

- [Agent Rules](AGENTS.md)
- [Workflow Guide](.agent/WORKFLOW.md)
- [Manager Prompt](.agent/prompts/manager.md)
- [Executor Prompt](.agent/prompts/executor.md)
- [Reviewer Prompt](.agent/prompts/reviewer.md)

## Local Commands

```bash
npm run agent:status
npm run agent:create-task -- "任务名称"
npm run agent:validate-task -- .agent/tasks/TASK-001-R1.md
npm run agent:validate
npm run agent:setup-worktrees
npm run agent:github-pr
```

## Session ID Policy

The public `.agent/sessions.json` file must remain an empty template. Real Codex Session IDs belong in local-only `.agent/sessions.local.json`, which is ignored by Git.

## GitHub Collaboration

The optimized workflow uses local Git for real changes and GitHub for PR review,
CI, and merge gates.

```text
Manager -> creates TASK-XXX
Executor -> works on agent/TASK-XXX-slug and commits
Executor -> runs npm run agent:github-pr
Reviewer -> independently validates the PR, commit, diff, and reports
Manager -> merges only after PASS or PASS_WITH_NOTES
```

Every implementation task should have one task branch and one draft PR unless
Manager explicitly records a documentation-only exception.
