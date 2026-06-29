# Codex Multi-Agent Workflow

## 核心原则

- 每个角色必须使用独立 Codex Session ID。
- 不允许多个角色复用同一个 Session ID。
- Session ID 只用于恢复角色对话上下文。
- 项目事实和协作状态必须以仓库文件为准。
- Git commit 保存真实代码交付。

## 三窗口结构

建议同时打开三个独立 Codex 窗口：

```text
Manager 窗口   -> 管理 Agent
Executor 窗口  -> 执行 Agent
Reviewer 窗口  -> 验收 Agent
```

首次启动时，分别复制以下提示词：

```text
.agent/prompts/manager.md
.agent/prompts/executor.md
.agent/prompts/reviewer.md
```

公开仓库中的 `.agent/sessions.json` 必须保持空模板。真实 Session ID 填入本机忽略文件：

```text
.agent/sessions.local.json
```

`agent-status.js` 会优先读取 `.agent/sessions.local.json`，没有该文件时再读取 `.agent/sessions.json`。不要把真实 Session ID 提交到公开仓库。

## 恢复三个角色会话

```bash
codex resume <MANAGER_SESSION_ID>
codex resume <EXECUTOR_SESSION_ID>
codex resume <REVIEWER_SESSION_ID>
```

本机当前会话 ID 可从 `.agent/sessions.local.json` 查看。公开模板 `.agent/sessions.json` 中不应出现真实 ID。

## 管理窗口

首次：

```text
读取 AGENTS.md、docs/PRD.md、docs/ACCEPTANCE.md 和项目代码。
分析当前状态，创建第一个最小可交付任务。
只创建任务和更新状态，不直接开发业务代码。
```

恢复会话：

```bash
codex resume <MANAGER_SESSION_ID>
```

日常指令：

```text
检查 current-task.json、task-board.md 和最新验收报告。
如果当前任务通过，关闭任务并创建下一个任务。
如果失败，根据问题创建返工任务。
```

## 执行窗口

恢复会话：

```bash
codex resume <EXECUTOR_SESSION_ID>
```

日常指令：

```text
读取当前任务单并执行。
完成后运行测试、提交 Git、写执行报告并更新交接文件。
```

## 验收窗口

恢复会话：

```bash
codex resume <REVIEWER_SESSION_ID>
```

日常指令：

```text
读取任务单、执行报告和目标 commit。
独立运行测试和检查功能。
不要修改业务代码，生成正式验收报告。
```

## Git Worktree 方案

建议结构：

```text
project/              管理工作区
project-executor/     执行工作区
project-reviewer/     验收工作区
```

建议分支：

```text
agent/main
agent/executor
agent/reviewer
```

初始化 worktree：

```bash
node scripts/setup-worktrees.js
```

## GitHub PR Collaboration Flow

GitHub is the remote collaboration gate. Local Git remains the source of actual
code changes, but every implementation task should move through a task branch
and a draft pull request before Manager merges it.

Recommended flow:

```text
Manager creates TASK-XXX
Executor works on agent/TASK-XXX-slug
Executor commits and runs validation
Executor runs npm run agent:github-pr
Reviewer reviews the pushed PR, commit, diff, and reports
Manager merges only after PASS or PASS_WITH_NOTES
```

Executor PR command:

```bash
npm run agent:github-pr
```

Useful variants:

```bash
node scripts/agent-github-pr.js --base main
node scripts/agent-github-pr.js --ready
node scripts/agent-github-pr.js --no-push
```

Rules:

- Do not open PRs from `main` or `master`.
- Do not open PRs with uncommitted local changes.
- Keep one PR aligned with one task ID.
- Use Draft PRs until Reviewer has completed independent validation.
- GitHub Actions must pass before Manager merge.
- Manager, not Executor, decides whether a reviewed PR can be merged.

如果已创建 `package.json` 脚本，也可以运行：

```bash
npm run agent:setup-worktrees
```

三个角色进入不同工作区：

```bash
cd project
codex resume <MANAGER_SESSION_ID>

cd project-executor
codex resume <EXECUTOR_SESSION_ID>

cd project-reviewer
codex resume <REVIEWER_SESSION_ID>
```

## 标准任务闭环

1. Manager 创建任务单。
2. Manager 更新当前任务和交接文件。
3. Executor 同步分支并执行任务。
4. Executor 运行测试、检查 diff、提交 commit。
5. Executor 写执行报告并交接给 Reviewer。
6. Reviewer 获取目标 commit，独立运行测试和检查功能。
7. Reviewer 输出验收报告。
8. Manager 根据 `PASS`、`PASS_WITH_NOTES`、`FAIL` 或 `BLOCKED` 推进状态。

## 返工流程

验收结果为 `FAIL` 时：

1. Reviewer 输出详细问题清单。
2. Reviewer 更新 `.agent/handoffs/reviewer-to-manager.md`。
3. Manager 将原任务状态改为 `FAILED`。
4. Manager 创建返工任务或将状态改为 `REWORK`。
5. 返工任务必须引用原任务编号和问题编号。
6. Executor 只修复报告中确认的问题。
7. Executor 输出新的执行报告。
8. Reviewer 必须重新回归原验收项。
9. 不允许只检查新修改部分而忽略原任务完整功能。

返工任务标题示例：

```text
TASK-001-R1：修复移动端布局与导航高亮问题
```

## 常用命令

```bash
npm run agent:status
npm run agent:create-task -- "任务名称"
npm run agent:validate-task
npm run agent:validate
npm run agent:setup-worktrees
```

直接运行方式：

```bash
node scripts/agent-status.js
node scripts/create-task.js "任务名称"
node scripts/validate-task.js
node scripts/validate-workflow.js
node scripts/setup-worktrees.js
```
