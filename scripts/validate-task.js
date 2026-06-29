#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const currentTaskPath = path.join(root, ".agent", "current-task.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function sectionHasContent(markdown, heading) {
  const pattern = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`);
  const match = markdown.match(pattern);
  if (!match) return false;
  const content = match[1].trim();
  if (!content) return false;
  const placeholders = [
    "说明为什么需要这个任务。",
    "说明任务完成后应该达到什么结果。",
    "说明任务依赖的文档、代码、接口或其他任务。",
    "列出本任务必须完成的内容。",
    "明确本任务不处理哪些内容。",
    "列出必须执行的命令、测试和页面尺寸。"
  ];
  return !placeholders.includes(content);
}

function hasChecklist(markdown) {
  const match = markdown.match(/## 验收标准\s*\n([\s\S]*?)(?=\n## |\n# |$)/);
  return Boolean(match && /- \[[ xX]\] .+/.test(match[1]));
}

try {
  const taskPath = resolveTaskPath();
  if (!fs.existsSync(taskPath)) {
    console.error(`Task file not found: ${taskPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(taskPath, "utf8");
  const requiredSections = [
    "背景",
    "目标",
    "工作范围",
    "非目标",
    "验收标准",
    "测试要求",
    "交付物",
    "当前状态"
  ];

  const missing = [];
  for (const section of requiredSections) {
    if (!sectionHasContent(markdown, section)) missing.push(section);
  }
  if (!hasChecklist(markdown)) missing.push("验收标准 checklist");

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
