# TASK-001：搭建 Codex 三角色多 Agent 工作流基础设施

## 基本信息

- 状态：REVIEWING
- 优先级：P0
- 创建时间：2026-06-29T00:00:00.000Z
- 负责人：Executor Agent
- 验收人：Reviewer Agent
- 目标分支：agent/executor

## 背景

项目需要一套长期可复用的 Codex 多 Agent 协作基础设施，用于把用户需求转化为可拆分、可执行、可验收、可返工的任务闭环。该基础设施需要明确 Manager、Executor、Reviewer 三个独立角色，并以仓库文件保存项目事实和协作状态。

## 目标

建立一套可在当前项目中直接使用的三角色开发工作流，包括角色提示词、状态文件、任务模板、报告模板、交接文件、校验脚本、worktree 初始化脚本和跨窗口使用说明。

## 前置条件

- 用户已提供完整工作流要求。
- 当前目录为 `E:\codex code`。
- 当前目录尚未初始化为 Git 仓库，因此 worktree 脚本必须安全失败并给出提示。
- 不修改任何业务功能。

## 工作范围

- 创建 `AGENTS.md`。
- 创建 `docs/PRD.md`、`docs/DESIGN.md`、`docs/ACCEPTANCE.md`。
- 创建 `.agent/` 下的项目状态、会话状态、任务看板、决策记录、提示词、任务说明、报告说明和交接文件。
- 创建 `.agent/WORKFLOW.md`，说明三窗口、三会话、worktree、返工和日常命令。
- 创建 `scripts/agent-status.js`、`scripts/create-task.js`、`scripts/validate-task.js`、`scripts/validate-workflow.js`、`scripts/setup-worktrees.js`。
- 创建 `package.json`，提供 `agent:*` 命令入口。
- 创建本任务的执行报告和交接文件。
- 运行可执行校验脚本并记录结果。

## 非目标

- 不开发作品集业务页面。
- 不初始化 Git 仓库。
- 不创建真实 Codex Session ID。
- 不自动推送远程仓库。
- 不自动合并分支。
- 不删除或重置任何用户文件。

## 涉及文件

- `AGENTS.md`
- `docs/PRD.md`
- `docs/DESIGN.md`
- `docs/ACCEPTANCE.md`
- `.agent/**`
- `scripts/*.js`
- `package.json`

## 实现要求

- 角色职责必须清晰分离。
- Codex Session ID 必须留空，由用户手动填入。
- 状态机必须包含 `BACKLOG`、`READY`、`IN_PROGRESS`、`EXECUTED`、`REVIEWING`、`PASSED`、`FAILED`、`REWORK`、`BLOCKED`、`CANCELLED`。
- 任务、执行报告、验收报告必须有结构化模板。
- Worktree 脚本不得执行危险删除、reset、push 或 merge。
- 校验脚本必须能返回非零退出码表示失败。

## 验收标准

- [ ] 必要目录和文件全部存在。
- [ ] 三个角色提示词可直接复制到不同 Codex 窗口使用。
- [ ] `.agent/sessions.json` 不包含硬编码 Session ID 或凭据。
- [ ] `.agent/current-task.json` 能表达单一当前任务状态。
- [ ] 任务、执行报告和验收报告规范完整。
- [ ] `agent-status.js` 能输出当前任务、角色 Session ID 状态、报告状态和下一步建议。
- [ ] `create-task.js` 能创建不覆盖已有任务的新任务。
- [ ] `validate-task.js` 能检查任务单必要内容。
- [ ] `validate-workflow.js` 能检查目录、文件、JSON、状态和潜在敏感信息。
- [ ] `setup-worktrees.js` 在非 Git 仓库中安全失败，在 Git 仓库中按非破坏方式创建分支和 worktree。
- [ ] `.agent/WORKFLOW.md` 说明跨窗口、跨会话、worktree、返工和恢复命令。

## 测试要求

- `node scripts/agent-status.js`
- `node scripts/validate-task.js .agent/tasks/TASK-001.md`
- `node scripts/validate-workflow.js`
- `node scripts/setup-worktrees.js`
- `npm run agent:status`
- `npm run agent:validate-task -- .agent/tasks/TASK-001.md`
- `npm run agent:validate`
- `npm run agent:setup-worktrees`

## 交付物

- 协作基础设施文件。
- 工作流脚本。
- `package.json` 脚本入口。
- 执行报告。
- Git commit：当前目录尚未初始化 Git，暂无法提交。

## 风险

- 当前目录不是 Git 仓库，worktree 创建只能通过脚本安全失败验证，无法实际创建 worktree。
- 当前没有真实三角色 Codex Session ID，需要用户手动填写。
- 当前尚未进入独立 Reviewer 会话，正式验收需要用户打开 Reviewer 窗口后执行。

## 当前状态

REVIEWING
