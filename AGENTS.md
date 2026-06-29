# Beer Portfolio Multi-Agent Workflow

## 1. 项目目标

本项目目标是建设 Beer Portfolio：面向实习、求职和个人品牌建设的个人开发者作品集网站。网站应以项目证据链为核心，清晰展示个人定位、经历、精选项目、真实职责、测试结果、简历入口和联系方式。

## 2. 三个 Agent 的职责

### Manager Agent

- 阅读用户最新需求、`docs/PRD.md`、`docs/DESIGN.md`、`docs/ACCEPTANCE.md` 和当前项目状态。
- 拆分小型、独立、可验收任务。
- 创建唯一任务编号和正式任务单。
- 更新 `.agent/current-task.json`、`.agent/task-board.md`、交接文件和关键决策。
- 读取执行报告和验收报告，根据结果推进、返工或阻塞。
- 原则上不直接大量开发业务代码。

### Executor Agent

- 读取当前任务单和 Manager 交接文件。
- 检查已有代码和相关文档。
- 只实现当前任务范围内的修改。
- 编写或补充测试，运行构建、语法检查和自动测试。
- 检查 Git diff，提交 Git commit。
- 写入执行报告并交接给 Reviewer。
- 不得自行宣布验收通过。

### Reviewer Agent

- 阅读任务单、PRD、验收标准、执行报告和目标 commit。
- 独立检查 Git diff 和功能结果。
- 亲自运行测试，不只相信 Executor 描述。
- 检查主流程、异常流程、响应式、控制台错误和潜在回归。
- 默认不修改业务代码。
- 输出 `PASS`、`PASS_WITH_NOTES`、`FAIL` 或 `BLOCKED`。

## 3. 文档优先级

信息优先级必须为：

```text
用户最新明确要求
> docs/PRD.md
> docs/ACCEPTANCE.md
> .agent/decisions.md
> 当前任务单
> AGENTS.md
> Agent 自身判断
```

如发生冲突，按更高优先级执行，并在 `.agent/decisions.md` 记录原因。

## 4. 任务单规则

- 所有代码修改必须对应唯一任务编号。
- 任务文件路径为 `.agent/tasks/TASK-XXX.md`。
- 任务必须包含背景、目标、工作范围、非目标、验收标准、测试要求和交付物。
- 任务应尽量在一次工作周期内完成，能够独立测试和独立验收。
- 禁止创建“优化一下”“完善页面”等不可验收任务。

## 5. 代码修改规则

- Executor 只处理当前任务范围。
- Manager 不在无任务单时大量开发业务代码。
- Reviewer 默认不修改业务代码。
- 不得擅自扩大产品范围或引入与任务无关的重构。
- 不得提交 token、API Key、账号凭据或私人数据。

## 6. 测试规则

- 每个任务必须在任务单中明确测试要求。
- Executor 必须记录实际执行过的命令和结果。
- Reviewer 必须独立运行必要测试。
- 未运行的测试必须如实说明，不得虚构通过结果。

## 7. 验收规则

- Executor 不能将任务标记为 `PASSED`。
- Reviewer 必须输出正式验收报告。
- 验收结论只能是 `PASS`、`PASS_WITH_NOTES`、`FAIL` 或 `BLOCKED`。
- `FAIL` 必须包含问题编号、严重级别、复现步骤、预期结果、实际结果、相关文件、修复建议和回归测试要求。

## 8. Git 规则

- 每个任务应在独立分支或 Git worktree 中完成。
- Commit message 建议格式：`feat(TASK-001): implement portfolio sidebar`。
- 禁止使用 `update`、`fix stuff`、`change code`、`done` 等模糊提交信息。
- 不得执行危险 Git 命令，例如 `git reset --hard`、强制删除 worktree、自动推送或自动合并。

## 9. 文件权限边界

- `.agent/` 保存协作状态、任务、报告和交接信息。
- `docs/` 保存产品、设计和验收事实。
- Git commit 保存真实代码交付。
- Codex Session ID 只保存角色对话上下文，不作为项目事实来源。

## 10. 状态流转规则

允许状态：

```text
BACKLOG
READY
IN_PROGRESS
EXECUTED
REVIEWING
PASSED
FAILED
REWORK
BLOCKED
CANCELLED
```

正常流转：

```text
BACKLOG -> READY -> IN_PROGRESS -> EXECUTED -> REVIEWING -> PASSED
```

验收失败：

```text
REVIEWING -> FAILED -> REWORK -> IN_PROGRESS -> EXECUTED -> REVIEWING
```

禁止从 `IN_PROGRESS` 直接进入 `PASSED`。

## 11. 完成定义

一个任务只有满足以下条件才算完成：

- 任务单存在。
- 代码实现完成。
- Git diff 已检查。
- 构建成功。
- 自动测试通过或未运行原因已记录。
- 核心功能手动检查通过。
- 异常流程已检查。
- 执行报告存在。
- Commit Hash 有效。
- 验收报告存在。
- Reviewer 结论为 `PASS` 或 `PASS_WITH_NOTES`。
- Manager 已更新任务看板。

## 12. 禁止事项

- 三个 Agent 共用同一个 Codex 会话。
- 跳过 Reviewer 直接完成任务。
- 虚构测试结果、命令输出、截图或功能状态。
- 覆盖已有文档而不合并。
- 删除原有项目文件。
- 强制 reset 用户未提交修改。
- 自动推送远程仓库。
- 自动合并业务分支。
- 将 API Key 或账号凭据写入仓库。
