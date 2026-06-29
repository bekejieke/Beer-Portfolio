# Decisions

## 2026-06-29

- Established a three-role Codex workflow: Manager, Executor, and Reviewer.
- Project facts and collaboration state are stored in repository files, not in Codex conversation memory.
- Codex Session IDs must be filled manually in `.agent/sessions.json`; they must not be hardcoded in source code.
- The first version supports one primary current task at a time. Parallel task expansion is intentionally deferred.
- Git worktree setup is script-assisted but non-destructive. The script refuses to run outside a Git repository.
- TASK-001 execution report exists but no review report exists, so Manager advanced the task only from `EXECUTED` to `REVIEWING`; the task cannot be marked complete until Reviewer produces `PASS` or `PASS_WITH_NOTES`.
