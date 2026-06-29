#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const agentDir = path.join(root, ".agent");

function readJson(relativePath, fallback = null) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return { __error: error.message };
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function sessionFilled(value) {
  return Boolean(value && typeof value === "string" && value.trim().length > 0);
}

function nextStep(current, executionExists, reviewExists) {
  if (!current || !current.taskId) {
    return "No active task. Manager should create a READY task with scripts/create-task.js.";
  }
  switch (current.status) {
    case "READY":
      return "Executor should read the task and move it to IN_PROGRESS before implementation.";
    case "IN_PROGRESS":
      return "Executor should finish implementation, run tests, commit, and write the execution report.";
    case "EXECUTED":
      return executionExists
        ? "Reviewer should start independent review and move the task to REVIEWING."
        : "Executor must create the execution report before review.";
    case "REVIEWING":
      return reviewExists
        ? "Manager should read the review report and decide PASS, REWORK, or BLOCKED."
        : "Reviewer should complete the review report.";
    case "FAILED":
      return "Manager should create a rework task or move this task to REWORK with clear issue references.";
    case "REWORK":
      return "Executor should only fix the reviewer-confirmed issues and produce a new execution report.";
    case "PASSED":
      return "Manager may close this task and create the next READY task.";
    case "BLOCKED":
      return "Manager should resolve the blocking condition or request user input.";
    default:
      return "Check current-task.json; status may need correction.";
  }
}

const current = readJson(".agent/current-task.json", {});
const trackedSessions = readJson(".agent/sessions.json", {});
const localSessions = readJson(".agent/sessions.local.json", null);
const sessions = localSessions || trackedSessions;
const executionReport = current && current.executionReport ? current.executionReport : null;
const reviewReport = current && current.reviewReport ? current.reviewReport : null;
const executionExists = executionReport ? exists(executionReport) : false;
const reviewExists = reviewReport ? exists(reviewReport) : false;

if (!fs.existsSync(agentDir)) {
  console.error("Missing .agent directory. Run workflow setup first.");
  process.exit(1);
}

console.log("Agent Workflow Status");
console.log("=====================");
console.log(`Current task: ${current.taskId || "none"}`);
console.log(`Title: ${current.title || "none"}`);
console.log(`Status: ${current.status || "unknown"}`);
console.log(`Owner: ${current.owner || "none"}`);
console.log(`Reviewer: ${current.reviewer || "none"}`);
console.log(`Branch: ${current.branch || "none"}`);
console.log(`Worktree: ${current.worktree || "none"}`);
console.log("");
console.log("Session IDs");
console.log("-----------");
console.log(`source: ${localSessions ? ".agent/sessions.local.json" : ".agent/sessions.json"}`);
for (const role of ["manager", "executor", "reviewer"]) {
  const filled = sessionFilled(sessions && sessions[role] && sessions[role].sessionId);
  console.log(`${role}: ${filled ? "filled" : "missing"}`);
}
console.log("");
console.log("Reports");
console.log("-------");
console.log(`Execution report: ${executionReport || "none"} (${executionExists ? "exists" : "missing"})`);
console.log(`Review report: ${reviewReport || "none"} (${reviewExists ? "exists" : "missing"})`);
console.log("");
console.log("Next step");
console.log("---------");
console.log(nextStep(current, executionExists, reviewExists));
