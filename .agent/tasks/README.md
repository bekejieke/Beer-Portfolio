# Task Files

Task files live in this directory and use the format:

```text
.agent/tasks/TASK-XXX.md
```

Create a task with:

```bash
node scripts/create-task.js "任务名称"
```

Each task must be small, scoped, independently testable, and independently reviewable.

## Template

```markdown
# TASK-XXX：任务名称

## 基本信息

- 状态：
- 优先级：
- 创建时间：
- 负责人：
- 验收人：
- 目标分支：

## 背景

说明为什么需要这个任务。

## 目标

说明任务完成后应该达到什么结果。

## 前置条件

说明任务依赖的文档、代码、接口或其他任务。

## 工作范围

列出本任务必须完成的内容。

## 非目标

明确本任务不处理哪些内容。

## 涉及文件

列出预计修改的目录和文件。

## 实现要求

写出明确的技术、功能和设计要求。

## 验收标准

- [ ] 条件一
- [ ] 条件二
- [ ] 条件三

## 测试要求

列出必须执行的命令、测试和页面尺寸。

## 交付物

- 源代码
- 测试
- Git commit
- 执行报告

## 风险

记录潜在风险、兼容问题或边界情况。

## 当前状态

READY
```
