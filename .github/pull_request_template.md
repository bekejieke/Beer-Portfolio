## Agent Task

- Task ID:
- Task file:
- Execution report:
- Review report:
- Source branch:

## Scope

- [ ] This PR only changes files allowed by the task.
- [ ] No unrelated refactor or product scope expansion is included.
- [ ] No secrets, real Codex Session IDs, tokens, or credentials are committed.

## Executor Checklist

- [ ] Git diff reviewed locally.
- [ ] Required validation commands were run and recorded in the execution report.
- [ ] Known limitations and risks are documented.
- [ ] Commit message includes the task ID.

## Reviewer Checklist

- [ ] Reviewer checked the target commit and Git diff independently.
- [ ] Reviewer ran required validation commands independently.
- [ ] Reviewer wrote `.agent/reports/TASK-XXX-review.md`.
- [ ] Reviewer conclusion is PASS or PASS_WITH_NOTES before Manager merge.

## Manager Merge Gate

- [ ] Current task status is REVIEWING or PASSED.
- [ ] Review report allows merge.
- [ ] Task board and handoff files are updated.
