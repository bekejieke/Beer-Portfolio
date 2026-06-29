#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const allowedStatuses = new Set([
  "BACKLOG",
  "READY",
  "IN_PROGRESS",
  "EXECUTED",
  "REVIEWING",
  "PASSED",
  "FAILED",
  "REWORK",
  "BLOCKED",
  "CANCELLED"
]);

const requiredDirs = [
  ".agent",
  ".agent/prompts",
  ".agent/tasks",
  ".agent/reports",
  ".agent/handoffs",
  "docs",
  "scripts"
];

const requiredFiles = [
  "AGENTS.md",
  "docs/PRD.md",
  "docs/DESIGN.md",
  "docs/ACCEPTANCE.md",
  ".agent/project.json",
  ".agent/sessions.json",
  ".agent/current-task.json",
  ".agent/task-board.md",
  ".agent/decisions.md",
  ".agent/prompts/manager.md",
  ".agent/prompts/executor.md",
  ".agent/prompts/reviewer.md",
  ".agent/tasks/README.md",
  ".agent/reports/README.md",
  ".agent/handoffs/manager-to-executor.md",
  ".agent/handoffs/executor-to-reviewer.md",
  ".agent/handoffs/reviewer-to-manager.md",
  ".agent/WORKFLOW.md",
  "scripts/agent-status.js",
  "scripts/create-task.js",
  "scripts/validate-task.js",
  "scripts/validate-workflow.js",
  "scripts/setup-worktrees.js"
];

function readJson(relativePath, errors) {
  const filePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`${relativePath} is not valid JSON: ${error.message}`);
    return null;
  }
}

function looksSensitive(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  const patterns = [
    /sk-[A-Za-z0-9_-]{16,}/,
    /ghp_[A-Za-z0-9_]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /AIza[0-9A-Za-z_-]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
    /password\s*[:=]\s*\S+/i,
    /api[_-]?key\s*[:=]\s*\S+/i
  ];
  return patterns.some((pattern) => pattern.test(trimmed));
}

function looksLikeCodexSessionId(value) {
  if (typeof value !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.trim());
}

function scanSensitive(object, prefix, errors) {
  if (!object || typeof object !== "object") return;
  for (const [key, value] of Object.entries(object)) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      scanSensitive(value, nextPrefix, errors);
    } else if (looksSensitive(value)) {
      errors.push(`Potential secret in sessions config at ${nextPrefix}`);
    } else if (nextPrefix.endsWith(".sessionId") && looksLikeCodexSessionId(value)) {
      errors.push(`Tracked sessions config contains a concrete Codex Session ID at ${nextPrefix}. Put real IDs in ignored .agent/sessions.local.json instead.`);
    }
  }
}

const errors = [];

for (const dir of requiredDirs) {
  if (!fs.existsSync(path.join(root, dir)) || !fs.statSync(path.join(root, dir)).isDirectory()) {
    errors.push(`Missing directory: ${dir}`);
  }
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing file: ${file}`);
  }
}

const project = readJson(".agent/project.json", errors);
const sessions = readJson(".agent/sessions.json", errors);
const current = readJson(".agent/current-task.json", errors);

if (current) {
  if (!allowedStatuses.has(current.status)) {
    errors.push(`Invalid current task status: ${current.status}`);
  }
  if (current.taskId) {
    const taskPath = path.join(root, ".agent", "tasks", `${current.taskId}.md`);
    if (!fs.existsSync(taskPath)) {
      errors.push(`Current task file does not exist: .agent/tasks/${current.taskId}.md`);
    }
  }
  if (current.executionReport && !current.executionReport.startsWith(".agent/reports/")) {
    errors.push("executionReport must be under .agent/reports/");
  }
  if (current.reviewReport && !current.reviewReport.startsWith(".agent/reports/")) {
    errors.push("reviewReport must be under .agent/reports/");
  }
}

if (project && Array.isArray(project.statusValues)) {
  for (const status of project.statusValues) {
    if (!allowedStatuses.has(status)) errors.push(`project.json contains unknown status: ${status}`);
  }
}

if (sessions) {
  for (const role of ["manager", "executor", "reviewer"]) {
    if (!sessions[role]) errors.push(`sessions.json missing role: ${role}`);
  }
  scanSensitive(sessions, "sessions", errors);
}

if (errors.length > 0) {
  console.error("Workflow validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Workflow validation passed.");
