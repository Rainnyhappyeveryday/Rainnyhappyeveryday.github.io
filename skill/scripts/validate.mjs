#!/usr/bin/env node
/**
 * Validate the weekly notes project before publishing.
 * Usage: node scripts/validate.mjs [PROJECT_ROOT]
 * No dependencies. Node 18+.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(process.argv[2] || process.cwd());
const errors = [];
const warnings = [];

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }
function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    fail("缺少文件：" + rel);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}
function loadWindow(rel) {
  const code = read(rel);
  if (!code) return {};
  const context = vm.createContext({ window: {}, console });
  try {
    new vm.Script(code, { filename: rel }).runInContext(context);
    return context.window;
  } catch (error) {
    fail(rel + " 无法解析：" + error.message);
    return {};
  }
}
function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value + "T00:00:00").getTime());
}
function isHttp(value) {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

const universityWindow = loadWindow("data/universities.js");
const jobsWindow = loadWindow("data/jobs.js");
const universities = universityWindow.WH_UNIVERSITIES;
const data = jobsWindow.WH_JOBS;

if (!universities || !Array.isArray(universities.list)) {
  fail("data/universities.js 缺少 WH_UNIVERSITIES.list");
} else if (universities.list.length !== 83) {
  fail("高校索引应为 83 所，实际 " + universities.list.length + " 所");
}

if (!data || !Array.isArray(data.jobs)) {
  fail("data/jobs.js 缺少 WH_JOBS.jobs");
} else {
  const ids = new Set();
  const pairs = new Set();
  const required = [
    "id", "unit", "unit_detail", "type", "type_detail", "channel",
    "position", "headcount", "headcount_label", "publish_date", "start_date",
    "deadline", "deadline_time", "location", "employment", "education",
    "experience", "major", "age", "party", "fit", "fit_label", "fit_reason",
    "summary", "source", "source_url", "announcement_url"
  ];

  data.jobs.forEach((job, index) => {
    const label = "jobs[" + index + "] " + (job && job.id ? job.id : "(no id)");
    required.forEach((key) => {
      if (job[key] === undefined || job[key] === null || job[key] === "") {
        fail(label + " 缺少字段 " + key);
      }
    });
    if (ids.has(job.id)) fail(label + " id 重复");
    ids.add(job.id);

    if (!isDate(job.publish_date)) fail(label + " publish_date 不是 YYYY-MM-DD");
    if (!isDate(job.start_date)) fail(label + " start_date 不是 YYYY-MM-DD");
    if (job.rolling) {
      if (job.deadline !== "招满即止") fail(label + " rolling=true 时 deadline 应为“招满即止”");
    } else if (!isDate(job.deadline)) {
      fail(label + " deadline 不是 YYYY-MM-DD，也不是招满即止");
    }
    if (typeof job.headcount !== "number" || Number.isNaN(job.headcount)) {
      fail(label + " headcount 必须是数字");
    }
    if (!["A", "B", "C"].includes(job.fit)) fail(label + " fit 必须是 A/B/C");
    if (!["长期", "企业聘用", "合同", "派遣", "未注明"].includes(job.employment)) {
      fail(label + " employment 取值不在约定范围");
    }
    if (!isHttp(job.announcement_url)) fail(label + " announcement_url 不是 http(s) 链接");
    if (job.source_url && !isHttp(job.source_url)) fail(label + " source_url 不是 http(s) 链接");
    if (!Array.isArray(job.tags)) fail(label + " tags 必须是数组");

    const key = String(job.announcement_url) + "||" + String(job.position);
    if (pairs.has(key)) fail(label + " 同一原文 + 方向重复");
    pairs.add(key);
  });

  if (!Array.isArray(data.issues) || data.issues.length === 0) {
    fail("WH_JOBS.issues 不能为空");
  } else {
    const last = data.issues[data.issues.length - 1];
    if (typeof last.added !== "number") fail("最后一期 issues.added 必须是数字");
    if (data.meta && Number(data.meta.issue) !== Number(last.id)) {
      fail("meta.issue=" + data.meta.issue + " 与最后一期 id=" + last.id + " 不一致");
    }
  }
  if (data.meta) {
    ["generated_at", "period_start", "period_end", "next_update"].forEach((key) => {
      if (!isDate(data.meta[key])) fail("meta." + key + " 不是 YYYY-MM-DD");
    });
  } else {
    fail("WH_JOBS.meta 缺失");
  }
}

const html = read("index.html");
if (html) {
  const banned = ["招聘", "岗位", "求职", "投递", "面试", "报名", "编制", "就业"];
  banned.forEach((word) => {
    if (html.includes(word)) fail("index.html 仍包含可见文案禁用词：" + word);
  });
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!scripts.length) fail("index.html 没有内联脚本");
  else {
    try { new vm.Script(scripts[scripts.length - 1], { filename: "index-inline.js" }); }
    catch (error) { fail("index.html 最后一个脚本语法错误：" + error.message); }
  }
  ["data-tab", "data-fav", "drawer-link", "toast"].forEach((token) => {
    if (!html.includes(token)) warn("index.html 未找到预期标记：" + token);
  });
}

if (warnings.length) {
  console.log("Warnings:");
  warnings.forEach((message) => console.log("  - " + message));
}
if (errors.length) {
  console.error("FAILED (" + errors.length + "):");
  errors.forEach((message) => console.error("  - " + message));
  process.exit(1);
}
console.log("OK");
console.log("高校：" + (universities ? universities.list.length : "?") + " 所");
console.log("记录：" + (data && data.jobs ? data.jobs.length : "?") + " 条");
console.log("期数：" + (data && data.meta ? data.meta.issue : "?"));
