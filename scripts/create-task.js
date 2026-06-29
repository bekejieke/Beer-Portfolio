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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
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

function taskTemplate(taskId, title, timestamp, branchName) {
  return `# ${taskId}: ${title}

## Basic Information

- Status: READY
- Priority: P1
- Created At: ${timestamp}
- Owner: Executor Agent
- Reviewer: Reviewer Agent
- Target Branch: ${branchName}
- Pull Request: TBD

## Background

Explain why this task is needed.

## Goal

Explain the concrete outcome expected after this task is complete.

## Preconditions

List required documents, code, interfaces, or previous tasks.

## Scope

- List the required work for this task.

## Non-Goals

- Clearly state what this task will not handle.

## Expected Files

- List expected directories and files to modify.

## Implementation Requirements

Write clear technical, functional, and design requirements.

## Acceptance Criteria

- [ ] Criterion one
- [ ] Criterion two
- [ ] Criterion three

## Test Requirements

List required commands, tests, and viewport checks.

## Deliverables

- Source code or workflow files
- Tests or validation commands
- Git commit
- Execution report
- GitHub PR link, unless the task is documentation-only and Manager explicitly waives it

## Risks

Record potential risks, compatibility issues, or edge cases.

## Current Status

READY
`;
}

function updateTaskBoard(taskId, title) {
  const entry = `- [ ] ${taskId}: ${title} (READY)`;
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

function maybeSetCurrentTask(taskId, title, timestamp, branchName) {
  const current = readJson(currentTaskPath, {
    taskId: null,
    status: "BACKLOG"
  });
  if (current.taskId && !["PASSED", "CANCELLED"].includes(current.status)) return false;
  const next = {
    taskId,
    title,
    status: "READY",
    owner: "Executor Agent",
    reviewer: "Reviewer Agent",
    branch: branchName,
    worktree: "../project-executor",
    pullRequest: null,
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
  console.error('Usage: node scripts/create-task.js "Task title"');
  process.exit(1);
}

ensureDir(tasksDir);
const taskId = nextTaskId();
const timestamp = new Date().toISOString();
const branchName = `agent/${taskId}-${slugify(title) || "task"}`;
const taskPath = path.join(tasksDir, `${taskId}.md`);

if (fs.existsSync(taskPath)) {
  console.error(`Task already exists: ${taskPath}`);
  process.exit(1);
}

fs.writeFileSync(taskPath, taskTemplate(taskId, title, timestamp, branchName), "utf8");
updateTaskBoard(taskId, title);
const becameCurrent = maybeSetCurrentTask(taskId, title, timestamp, branchName);

console.log(`Created ${path.relative(root, taskPath)}`);
console.log(`Task ID: ${taskId}`);
console.log(`Target branch: ${branchName}`);
console.log(`Current task: ${becameCurrent ? "set" : "unchanged; another current task is still active"}`);
console.log("Next: edit the task file so scope, non-goals, acceptance criteria, and tests are concrete.");
