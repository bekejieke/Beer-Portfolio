#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const tasksDir = path.join(root, ".agent", "tasks");
const taskBoardPath = path.join(root, ".agent", "task-board.md");
const currentTaskPath = path.join(root, ".agent", "current-task.json");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function nextTaskId() {
  ensureDir(tasksDir);
  const numbers = fs
    .readdirSync(tasksDir)
    .map((name) => /^TASK-(\d{3})(?:-R\d+)?\.md$/.exec(name))
    .filter(Boolean)
    .map((match) => Number(match[1]));
  const next = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
  return `TASK-${String(next).padStart(3, "0")}`;
}

function taskTemplate(taskId, title, timestamp) {
  return `# ${taskId}：${title}

## 基本信息

- 状态：READY
- 优先级：P1
- 创建时间：${timestamp}
- 负责人：Executor Agent
- 验收人：Reviewer Agent
- 目标分支：agent/executor

## 背景

说明为什么需要这个任务。

## 目标

说明任务完成后应该达到什么结果。

## 前置条件

说明任务依赖的文档、代码、接口或其他任务。

## 工作范围

- 列出本任务必须完成的内容。

## 非目标

- 明确本任务不处理哪些内容。

## 涉及文件

- 列出预计修改的目录和文件。

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
`;
}

function updateTaskBoard(taskId, title) {
  const entry = `- [ ] ${taskId}：${title}（READY）`;
  if (!fs.existsSync(taskBoardPath)) {
    fs.writeFileSync(
      taskBoardPath,
      `# Agent Task Board\n\n## Current Task\n\n${entry}\n\n## Backlog\n\nNo backlog tasks yet.\n`,
      "utf8"
    );
    return;
  }

  let board = fs.readFileSync(taskBoardPath, "utf8");
  if (board.includes(taskId)) return;
  if (board.includes("No backlog tasks yet.")) {
    board = board.replace("No backlog tasks yet.", entry);
  } else if (board.includes("## Backlog")) {
    board = board.replace("## Backlog", `## Backlog\n\n${entry}\n`);
  } else {
    board += `\n## Backlog\n\n${entry}\n`;
  }
  fs.writeFileSync(taskBoardPath, board, "utf8");
}

function maybeSetCurrentTask(taskId, title, timestamp) {
  const current = readJson(currentTaskPath, {
    taskId: null,
    status: "BACKLOG"
  });
  if (current.taskId) return false;
  const next = {
    taskId,
    title,
    status: "READY",
    owner: "Executor Agent",
    reviewer: "Reviewer Agent",
    branch: "agent/executor",
    worktree: "../project-executor",
    executionReport: `.agent/reports/${taskId}-execution.md`,
    reviewReport: `.agent/reports/${taskId}-review.md`,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  writeJson(currentTaskPath, next);
  return true;
}

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: node scripts/create-task.js "任务名称"');
  process.exit(1);
}

ensureDir(tasksDir);
const taskId = nextTaskId();
const timestamp = new Date().toISOString();
const taskPath = path.join(tasksDir, `${taskId}.md`);

if (fs.existsSync(taskPath)) {
  console.error(`Task already exists: ${taskPath}`);
  process.exit(1);
}

fs.writeFileSync(taskPath, taskTemplate(taskId, title, timestamp), "utf8");
updateTaskBoard(taskId, title);
const becameCurrent = maybeSetCurrentTask(taskId, title, timestamp);

console.log(`Created ${path.relative(root, taskPath)}`);
console.log(`Task ID: ${taskId}`);
console.log(`Current task: ${becameCurrent ? "set" : "unchanged; another current task already exists"}`);
console.log("Next: edit the task file so scope, non-goals, acceptance criteria, and tests are concrete.");
