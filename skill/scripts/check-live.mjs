#!/usr/bin/env node
/**
 * Check the published site after deploy.
 * Usage: node scripts/check-live.mjs [URL]
 */
const url = process.argv[2] || "https://rainnyhappyeveryday.github.io/";
const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
const html = await res.text();
const title = (html.match(/<title>(.*?)<\/title>/s) || [])[1] || "";
const checks = {
  status: res.status === 200,
  title: title.includes("条条大路通罗马"),
  table: html.includes("记录列表"),
  drawer: html.includes("drawer-link"),
  tabs: html.includes('data-tab="fav"'),
  noBanned: !/(招聘|岗位|求职|投递|面试|报名|编制|就业)/.test(html)
};
const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([key]) => key);
console.log("URL:", url);
console.log("Status:", res.status);
console.log("Title:", title);
if (failed.length) {
  console.error("FAILED:", failed.join(", "));
  process.exit(1);
}
console.log("OK");
