#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const currentTaskPath = path.join(root, ".agent", "current-task.json");

const sectionGroups = [
  { name: "background", headings: ["背景", "鑳屾櫙", "Background"] },
  { name: "goal", headings: ["目标", "鐩爣", "Goal"] },
  { name: "scope", headings: ["工作范围", "宸ヤ綔鑼冨洿", "Scope"] },
  { name: "non-goals", headings: ["非目标", "闈炵洰鏍?", "Non-Goals"] },
  { name: "acceptance criteria", headings: ["验收标准", "楠屾敹鏍囧噯", "Acceptance Criteria"] },
  { name: "test requirements", headings: ["测试要求", "娴嬭瘯瑕佹眰", "Test Requirements"] },
  { name: "deliverables", headings: ["交付物", "浜や粯鐗?", "Deliverables"] },
  { name: "current status", headings: ["当前状态", "褰撳墠鐘舵€?", "Current Status"] }
];

const placeholders = new Set([
  "说明为什么需要这个任务。",
  "说明任务完成后应该达到什么结果。",
  "说明任务依赖的文档、代码、接口或其他任务。",
  "列出本任务必须完成的内容。",
  "明确本任务不处理哪些内容。",
  "列出必须执行的命令、测试和页面尺寸。",
  "Explain why this task is needed.",
  "Explain the concrete outcome expected after this task is complete.",
  "List required documents, code, interfaces, or previous tasks.",
  "- List the required work for this task.",
  "- Clearly state what this task will not handle.",
  "List required commands, tests, and viewport checks."
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveTaskPath() {
  const arg = process.argv[2];
  if (arg) return path.resolve(root, arg);
  if (!fs.existsSync(currentTaskPath)) {
    throw new Error("Missing .agent/current-task.json and no task file argument was provided.");
  }
  const current = readJson(currentTaskPath);
  if (!current.taskId) {
    throw new Error("No current task. Pass a task file path explicitly.");
  }
  return path.join(root, ".agent", "tasks", `${current.taskId}.md`);
}

function getSection(markdown, heading) {
  const pattern = new RegExp(`## ${escapeRegExp(heading)}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`);
  const match = markdown.match(pattern);
  return match ? match[1].trim() : null;
}

function sectionHasContent(markdown, headings) {
  for (const heading of headings) {
    const content = getSection(markdown, heading);
    if (!content) continue;
    if (placeholders.has(content)) return false;
    return true;
  }
  return false;
}

function hasChecklist(markdown) {
  const group = sectionGroups.find((item) => item.name === "acceptance criteria");
  for (const heading of group.headings) {
    const content = getSection(markdown, heading);
    if (content && /- \[[ xX]\] .+/.test(content)) return true;
  }
  return false;
}

try {
  const taskPath = resolveTaskPath();
  if (!fs.existsSync(taskPath)) {
    console.error(`Task file not found: ${taskPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(taskPath, "utf8");
  const missing = [];
  for (const group of sectionGroups) {
    if (!sectionHasContent(markdown, group.headings)) missing.push(group.name);
  }
  if (!hasChecklist(markdown)) missing.push("acceptance criteria checklist");

  if (missing.length > 0) {
    console.error(`Task validation failed: ${path.relative(root, taskPath)}`);
    for (const item of missing) console.error(`- Missing or placeholder content: ${item}`);
    process.exit(1);
  }

  console.log(`Task validation passed: ${path.relative(root, taskPath)}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
