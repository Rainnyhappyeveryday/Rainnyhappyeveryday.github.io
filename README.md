# 条条大路通罗马

**线上地址：https://rainnyhappyeveryday.github.io/**

一个持续累加的武汉公开信息记录站，配套一个可移植的每周维护技能。

站点和技能在**同一个仓库**里：页面在根目录，技能在 `skill/`，没有第二个发布仓库。

## 文件结构

```text
.
├─ index.html                      页面（HTML + CSS + JS 单文件）
├─ data/
│  ├─ jobs.js                      全部记录 + 期数 + 来源，只追加
│  └─ universities.js              83 所武汉普通高校索引
├─ skill/
│  ├─ SKILL.md                     每周维护流程
│  ├─ references/                  来源清单、高校总表、数据契约、汇报模板
│  └─ scripts/                     发布前校验、发布后线上检查
└─ README.md
```

页面不依赖服务器、外部字体或第三方脚本。

## 页面

- 左侧导航：记录 / 高校索引 / 说明
- KPI：可看记录 / 全部记录 / 仍开放 / 高校索引
- 视图：全部 / 收藏 / 已隐藏
- 筛选：搜索、类型、来源、方式、开始日期、结束日期、排序
- 表格：机构、方向、类型、方式、开始、人数、截止、相关、收藏、操作
- 详情抽屉：条件、概况、相关判断、同批方向、「查看原文」
- 手机端：隐藏侧栏，KPI 两列，筛选折叠，表格变卡片
- 收藏 / 隐藏：存在当前浏览器 localStorage，不跨设备同步

## 数据

`window.WH_JOBS` 包含：

- `meta`：期数、数据截止日、周期、下次更新
- `issues`：每期更新记录
- `sources`：来源
- `jobs`：记录数组

字段与取值约定见 [`skill/references/site-contract.md`](skill/references/site-contract.md)。

核心约定：

- 日期统一 `YYYY-MM-DD`；未知写 `未注明`。
- 历史记录只追加，不删除。
- 同一原文的多个方向拆行，共用 `group_id`。
- 原文链接必须是官网，不用聚合站。
- 相关度 A / B / C；C 默认隐藏，可在「显示暂存」里打开。

## 每周维护

流程、核查页面、筛选口径、写入字段、校验和发布步骤都在：

**[`skill/SKILL.md`](skill/SKILL.md)**

快速校验：

```bash
node skill/scripts/validate.mjs .
node skill/scripts/check-live.mjs
```

发布就是一次普通提交，GitHub Pages 会自动从根目录构建：

```bash
git add -A
git commit -m "Update weekly notes"
git push origin main
```

## 隐私

仓库是 public（GitHub Pages 免费用户站需要公开仓库）。技能只保留通用背景，不写学校、姓名、账号或私人备注；来源都是公开网页。收藏和隐藏只保存在浏览器本地，不进入仓库。
