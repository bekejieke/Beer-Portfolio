#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();
const parent = path.dirname(root);
const projectName = path.basename(root);
const executorWorktree = path.join(parent, `${projectName}-executor`);
const reviewerWorktree = path.join(parent, `${projectName}-reviewer`);

function runGit(args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"]
  }).trim();
}

function isGitRepo() {
  try {
    return runGit(["rev-parse", "--is-inside-work-tree"]) === "true";
  } catch {
    return false;
  }
}

function hasUncommittedChanges() {
  const status = runGit(["status", "--porcelain"]);
  return status.length > 0;
}

function branchExists(branch) {
  try {
    runGit(["rev-parse", "--verify", branch]);
    return true;
  } catch {
    return false;
  }
}

function createBranchIfMissing(branch, startPoint) {
  if (branchExists(branch)) {
    console.log(`Branch exists: ${branch}`);
    return;
  }
  const args = startPoint ? ["branch", branch, startPoint] : ["branch", branch];
  runGit(args);
  console.log(`Created branch: ${branch}`);
}

function worktreeExists(targetPath) {
  return fs.existsSync(targetPath);
}

function addWorktree(targetPath, branch) {
  if (worktreeExists(targetPath)) {
    console.log(`Worktree path already exists, skipping: ${targetPath}`);
    return;
  }
  runGit(["worktree", "add", targetPath, branch], { stdio: "inherit" });
  console.log(`Created worktree: ${targetPath} -> ${branch}`);
}

function main() {
  if (!isGitRepo()) {
    console.error("This directory is not a Git repository.");
    console.error("Initialize Git or run this script from the repository root. No changes were made.");
    process.exit(1);
  }

  if (hasUncommittedChanges()) {
    console.error("The current worktree has uncommitted changes.");
    console.error("Commit or stash them before creating worktrees. No changes were made.");
    process.exit(1);
  }

  const currentBranch = runGit(["branch", "--show-current"]) || "HEAD";
  console.log(`Current branch: ${currentBranch}`);

  createBranchIfMissing("agent/main", currentBranch);
  createBranchIfMissing("agent/executor", "agent/main");
  createBranchIfMissing("agent/reviewer", "agent/main");

  addWorktree(executorWorktree, "agent/executor");
  addWorktree(reviewerWorktree, "agent/reviewer");

  console.log("");
  console.log("Next steps");
  console.log("----------");
  console.log(`Manager:  cd "${root}" && codex resume <MANAGER_SESSION_ID>`);
  console.log(`Executor: cd "${executorWorktree}" && codex resume <EXECUTOR_SESSION_ID>`);
  console.log(`Reviewer: cd "${reviewerWorktree}" && codex resume <REVIEWER_SESSION_ID>`);
  console.log("");
  console.log("This script does not delete, reset, push, or merge anything.");
}

main();
