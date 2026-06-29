# Decisions

## 2026-06-29

- Established a three-role Codex workflow: Manager, Executor, and Reviewer.
- Project facts and collaboration state are stored in repository files, not in Codex conversation memory.
- Codex Session IDs must be filled manually in `.agent/sessions.json`; they must not be hardcoded in source code.
- The first version supports one primary current task at a time. Parallel task expansion is intentionally deferred.
- Git worktree setup is script-assisted but non-destructive. The script refuses to run outside a Git repository.
- TASK-001 execution report exists but no review report exists, so Manager advanced the task only from `EXECUTED` to `REVIEWING`; the task cannot be marked complete until Reviewer produces `PASS` or `PASS_WITH_NOTES`.
- TASK-001 received Reviewer `FAIL`; TASK-001-R1 is the scoped rework task for session ID exposure, workflow validation, and Git auditability.
- As of 2026-06-29T20:54:17+08:00, `TASK-001-R1` has an execution report but no review report, so Manager advanced it only from `EXECUTED` to `REVIEWING`. No business development task may be created until Reviewer returns `PASS` or `PASS_WITH_NOTES`.
- Git is now available at `E:\codex code`; `origin/main` currently points to `1cd4fe9 docs(TASK-001-R1): add repository entrypoint`, superseding the older handoff reference to `27080a2`.
- TASK-001-R1 received Reviewer `PASS_WITH_NOTES`; Manager may treat the workflow foundation as usable while preserving the notes about commit hash bookkeeping.
- GitHub is now the remote collaboration gate: future implementation tasks should use `agent/TASK-XXX-slug` branches, draft PRs, GitHub Actions workflow validation, independent Reviewer checks, and Manager-only merge decisions.
