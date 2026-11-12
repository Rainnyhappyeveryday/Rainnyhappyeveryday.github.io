# 站点与数据契约

## 文件

```text
PROJECT_ROOT/
├─ index.html           单文件页面（HTML + CSS + JS）
├─ data/
│  ├─ jobs.js           全部记录 + 期数 + 来源；只追加
│  └─ universities.js   83 所武汉普通高校索引
├─ skill/               维护技能（SKILL.md、references、scripts）
└─ README.md            项目说明
```

页面不依赖服务器、外部字体或第三方脚本。打开 `index.html` 即可使用。

## 页面结构（B 端管理台）

- 左侧导航：记录 / 高校索引 / 说明
- 顶部栏：面包屑、日期、打印、头像
- KPI：可看记录 / 全部记录 / 仍开放 / 高校索引
- 视图标签：全部 / 收藏 / 已隐藏
- 筛选：搜索、类型、来源、方式、开始日期、结束日期、排序
- 表格列：机构、方向、类型、方式、开始、人数、截止、相关、收藏、操作
- 操作：查看（右侧抽屉）、原文（新标签）、隐藏/恢复
- 手机：隐藏侧栏，KPI 两列，筛选折叠，表格换卡片
- 详情抽屉：条件、概况、相关判断、同批方向、右上角「查看原文」
- 收藏/隐藏：localStorage 键为 `ttdltlm.favorites.v1`、`ttdltlm.hidden.v1`

隐藏记录不会出现在「全部」和「收藏」；「已隐藏」里可以恢复。收藏/隐藏只存在当前浏览器，不跨设备同步。

## `window.WH_JOBS`

```js
{
  meta: {
    issue: 1,
    issue_label: "第 01 期 · 试刊",
    generated_at: "2026-11-12",
    period_start: "2026-10-13",
    period_end: "2026-11-12",
    next_update: "2026-11-16"
  },
  issues: [
    { id, label, date, period, added, recommended, note }
  ],
  sources: [
    { name, channel, url }
  ],
  jobs: [
    {
      id, unit, unit_detail,
      type, type_detail, channel,
      position, headcount, headcount_label,
      publish_date, start_date, deadline, deadline_time,
      rolling, location, employment,
      education, experience, major, age, party,
      fit, fit_label, fit_reason, summary,
      tags, source, source_url, announcement_url,
      group_id, group_total, group_note, group_positions
    }
  ]
}
```

## 取值约定

- 日期：`YYYY-MM-DD`；未知写 `未注明`。
- `type`：`高校` / `职校` / `国央企` / `事业单位` / `科研院所`。
- `employment`：`长期` / `企业聘用` / `合同` / `派遣` / `未注明`。
- `fit`：`A`（先看）/ `B`（可看）/ `C`（暂存）；页面默认隐藏 C。
- `headcount` 数字；展示用 `headcount_label`。
- `rolling: true` 表示招满即止；`deadline` 写 `招满即止`。
- `announcement_url` 必须是官网原文，不是聚合站或首页。
- 同一公告多个方向拆行，共用 `group_id`；`group_positions` 放同批武汉方向摘要。
- 历史记录不删除；截止后仍保留，由页面判断是否仍开放。

## 发布

- 唯一仓库：`Rainnyhappyeveryday/Rainnyhappyeveryday.github.io`（公开）
- 线上：https://rainnyhappyeveryday.github.io/
- 仓库根目录就是发布目录；没有第二个仓库、没有 `dist/`。
- GitHub Pages 从根目录构建；根目录必须有 `index.html`、`data/jobs.js`、`data/universities.js`。

## 文案边界

页面可见文案避免：招聘、岗位、求职、投递、面试、报名、编制、就业。统一用：机构、方向、记录、方式、原文、可看、暂存。
