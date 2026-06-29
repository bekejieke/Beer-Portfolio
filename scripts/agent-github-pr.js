#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();
const currentTaskPath = path.join(root, ".agent", "current-task.json");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"]
  }).trim();
}

function tryRun(command, args) {
  try {
    return { ok: true, output: run(command, args) };
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout || ""}${error.stderr || error.message}`.trim()
    };
  }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function requireGitRepo() {
  const result = tryRun("git", ["rev-parse", "--is-inside-work-tree"]);
  if (!result.ok || result.output !== "true") {
    console.error("This directory is not a Git repository.");
    process.exit(1);
  }
}

function requireGh() {
  const result = tryRun("gh", ["--version"]);
  if (!result.ok) {
    console.error("GitHub CLI is not available. Install gh or use the GitHub app connector.");
    process.exit(1);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    base: "main",
    draft: true,
    push: true
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--base") options.base = args[++i];
    else if (arg === "--ready") options.draft = false;
    else if (arg === "--no-push") options.push = false;
    else if (arg === "--title") options.title = args[++i];
    else if (arg === "--body") options.body = args[++i];
    else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }

  return options;
}

function currentBranch() {
  return run("git", ["branch", "--show-current"]);
}

function remoteUrl() {
  const result = tryRun("git", ["remote", "get-url", "origin"]);
  return result.ok ? result.output : "";
}

function statusPorcelain() {
  return run("git", ["status", "--porcelain"]);
}

function currentTask() {
  return readJson(currentTaskPath) || {};
}

function defaultTitle(task, branch) {
  if (task.taskId && task.title) return `${task.taskId}: ${task.title}`;
  if (task.taskId) return `${task.taskId}: ${branch}`;
  return branch;
}

function defaultBody(task, branch) {
  const lines = [
    "## Agent Task",
    "",
    `- Task: ${task.taskId || "unknown"}`,
    `- Branch: ${branch}`,
    `- Execution report: ${task.executionReport || "TBD"}`,
    `- Review report: ${task.reviewReport || "TBD"}`,
    "",
    "## Required Checks",
    "",
    "- [ ] Execution report is complete",
    "- [ ] Workflow validation passes",
    "- [ ] Reviewer has independently checked the diff and tests",
    "- [ ] Manager has approved merge after PASS or PASS_WITH_NOTES"
  ];
  return lines.join("\n");
}

function updateCurrentTaskPr(url) {
  const task = currentTask();
  if (!task.taskId) return;
  task.pullRequest = url;
  task.updatedAt = new Date().toISOString();
  writeJson(currentTaskPath, task);
}

function main() {
  const options = parseArgs();
  requireGitRepo();
  requireGh();

  const branch = currentBranch();
  if (!branch) {
    console.error("Detached HEAD is not supported for agent PR creation.");
    process.exit(1);
  }
  if (branch === options.base || branch === "main" || branch === "master") {
    console.error(`Refusing to open a PR from protected/base branch: ${branch}`);
    process.exit(1);
  }
  if (!remoteUrl()) {
    console.error("Missing origin remote. Create or configure the GitHub repository first.");
    process.exit(1);
  }
  if (statusPorcelain()) {
    console.error("The working tree has uncommitted changes. Commit them before opening a PR.");
    process.exit(1);
  }

  const task = currentTask();
  if (task.taskId && task.branch && task.branch !== branch) {
    console.error(`Current task expects branch ${task.branch}, but the current branch is ${branch}.`);
    process.exit(1);
  }

  if (options.push) {
    run("git", ["push", "-u", "origin", branch], { stdio: "inherit" });
  }

  const existing = tryRun("gh", ["pr", "view", branch, "--json", "url", "--jq", ".url"]);
  if (existing.ok && existing.output) {
    updateCurrentTaskPr(existing.output);
    console.log(`Existing PR: ${existing.output}`);
    return;
  }

  const title = options.title || defaultTitle(task, branch);
  const body = options.body || defaultBody(task, branch);
  const args = ["pr", "create", "--base", options.base, "--head", branch, "--title", title, "--body", body];
  if (options.draft) args.push("--draft");

  const created = tryRun("gh", args);
  if (!created.ok) {
    console.error(created.output);
    process.exit(1);
  }

  updateCurrentTaskPr(created.output);
  console.log(`Created PR: ${created.output}`);
}

main();
