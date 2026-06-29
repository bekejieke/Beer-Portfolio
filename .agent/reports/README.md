# Agent Reports

Execution and review reports live in this directory.

Reports must record real commands, real results, real commit hashes, and any known limitations. Do not invent test results, screenshots, command output, or feature status.

## Execution Report

Path:

```text
.agent/reports/TASK-XXX-execution.md
```

Template:

```markdown
# TASK-XXX 执行报告

## 执行结果

COMPLETED / PARTIAL / BLOCKED

## 任务理解

用自己的话说明本次任务边界。

## 实现内容

列出实际完成内容。

## 修改文件

列出新增、修改和删除的文件。

## 核心实现说明

说明主要技术方案和关键逻辑。

## 执行命令

列出实际运行过的命令。

## 测试结果

逐项记录：

- 命令
- 结果
- 是否通过
- 失败原因

## 异常路径检查

说明检查过哪些错误态、空态或边界情况。

## 已知限制

如实记录暂未解决的问题。

## 风险

说明可能影响后续功能的内容。

## Commit Hash

填写真实 commit hash。

## 给 Reviewer 的检查重点

列出验收时需要重点检查的内容。
```

## Review Report

Path:

```text
.agent/reports/TASK-XXX-review.md
```

Template:

```markdown
# TASK-XXX 验收报告

## 验收结论

PASS / PASS_WITH_NOTES / FAIL / BLOCKED

## 验收环境

- 分支：
- Commit：
- 系统：
- 运行环境：
- 浏览器或设备：

## 验收范围

说明本次验收覆盖内容。

## 验收标准逐项结果

- [x] 已通过
- [ ] 未通过

## Git 差异审查

说明是否存在：

- 无关修改
- 大范围重构
- 硬编码
- 重复代码
- 潜在回归
- 安全或隐私问题

## 自动测试结果

记录实际运行命令和结果。

## 手动测试结果

记录主流程、异常流程和响应式检查结果。

## 问题清单

### REVIEW-001

- 严重级别：
- 问题描述：
- 复现步骤：
- 预期结果：
- 实际结果：
- 相关文件：
- 修复建议：
- 回归测试：

## 风险与备注

记录不阻塞合并但需要关注的问题。

## 是否允许合并

YES / NO
```
