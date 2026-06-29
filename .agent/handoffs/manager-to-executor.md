# Manager To Executor Handoff

## 当前任务编号

TASK-001

## 任务文件路径

.agent/tasks/TASK-001.md

## 当前状态

EXECUTED

## 执行分支

agent/executor

## 执行工作区

../project-executor

## 必须阅读的文件

- AGENTS.md
- docs/PRD.md
- docs/DESIGN.md
- docs/ACCEPTANCE.md
- .agent/current-task.json
- .agent/tasks/TASK-001.md

## 禁止修改范围

- 不得修改验收报告。
- 不得修改 Reviewer 交接结论。
- 不得处理当前任务单之外的业务功能。
- 不得初始化 Git、删除文件、reset 或推送远程仓库。

## 测试要求

- `node scripts/agent-status.js`
- `node scripts/validate-task.js .agent/tasks/TASK-001.md`
- `node scripts/validate-workflow.js`
- `node scripts/setup-worktrees.js`

## 交付要求

- 完成工作流基础设施文件。
- 运行测试并记录真实结果。
- 检查 Git 状态。
- 写入 `.agent/reports/TASK-001-execution.md`。
- 更新 `.agent/handoffs/executor-to-reviewer.md`。
