# TASK-001-R1：修复 Session ID 暴露、校验不足与 Git 审计问题

## 基本信息

- 状态：EXECUTED
- 优先级：P0
- 创建时间：2026-06-29T00:00:00.000Z
- 负责人：Executor Agent
- 验收人：Reviewer Agent
- 目标分支：main

## 背景

Reviewer 对 `TASK-001` 给出 `FAIL`，指出三个问题：真实 Codex Session ID 被写入 `.agent/sessions.json`，`validate-workflow.js` 未校验该问题，以及任务当时缺少可审计 Git commit。

## 目标

完成返工，确保公开仓库只保留空 Session ID 模板，本机真实会话 ID 保存在被忽略的本地文件中，并补充校验逻辑与 Git 提交。

## 前置条件

- 已读取 `.agent/reports/TASK-001-review.md`。
- 当前目录已初始化为 Git 仓库。
- GitHub 远端仓库 `bekejieke/Beer-Portfolio` 已创建。

## 工作范围

- 将 `.agent/sessions.json` 恢复为空模板。
- 新增 `.agent/sessions.local.json` 保存本机真实 Session ID，并通过 `.gitignore` 忽略。
- 更新 `agent-status.js`，优先读取本地 sessions 文件。
- 更新 `validate-workflow.js`，禁止 tracked sessions 中出现 UUID 形态的 Codex Session ID。
- 更新 `.agent/WORKFLOW.md` 的会话管理说明。
- 生成返工执行报告。
- 创建可审计 Git commit。

## 非目标

- 不开发业务页面。
- 不改变 Manager、Executor、Reviewer 的职责边界。
- 不推送真实 Session ID。

## 涉及文件

- `.gitignore`
- `.agent/sessions.json`
- `.agent/sessions.local.json`
- `.agent/WORKFLOW.md`
- `scripts/agent-status.js`
- `scripts/validate-workflow.js`
- `.agent/tasks/TASK-001-R1.md`
- `.agent/reports/TASK-001-R1-execution.md`

## 实现要求

- `.agent/sessions.json` 中三个 `sessionId` 必须为空字符串。
- `.agent/sessions.local.json` 必须不进入 Git 跟踪。
- `agent-status.js` 在本机应显示 Session ID 来源为 `.agent/sessions.local.json`。
- `validate-workflow.js` 应检查 tracked sessions 中的真实 UUID 会话 ID。

## 验收标准

- [ ] `.agent/sessions.json` 不包含真实 Session ID。
- [ ] `.agent/sessions.local.json` 被 `.gitignore` 忽略且未被 Git 跟踪。
- [ ] `node scripts/agent-status.js` 能读取本地 sessions 并显示三个角色为 `filled`。
- [ ] `node scripts/validate-workflow.js` 通过。
- [ ] `git status --short --branch` 可用。
- [ ] 存在有效 commit hash。

## 测试要求

- `node scripts/agent-status.js`
- `node scripts/validate-workflow.js`
- `node scripts/validate-task.js .agent/tasks/TASK-001-R1.md`
- `git status --short --branch`
- `git show --stat HEAD`

## 交付物

- 返工代码和文档。
- 返工执行报告。
- Git commit。

## 风险

- 早期本地 commit 曾包含 Session ID，推送前必须重建干净历史或确保远端未收到污染历史。

## 当前状态

EXECUTED
