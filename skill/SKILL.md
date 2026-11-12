---
name: wuhan-weekly-notes
description: Maintain the 条条大路通罗马 Wuhan weekly notes site. Use for the Monday 10:00 run or when asked to refresh the site: check the 83-university index and public sources, verify new records, append data/jobs.js, validate, deploy to GitHub Pages, and report additions. Works from any agent that can read files, run git/node, and browse the web.
disable-model-invocation: true
---

# 武汉每周记录 · 维护技能

## 这个技能最终产出什么

不是一个一次性报告，而是一个**持续累加的个人记录站**：

1. `data/jobs.js` 里保留全部历史记录，每周只追加、不删除。
2. `index.html` 是可直接打开、也可线上访问的静态页面。
3. `issues` 里保留每一期的更新记录，形成可回看的时间线。
4. 线上地址固定为 **https://rainnyhappyeveryday.github.io/**，每次更新发布到同一个地址。

页面是中性文案，不出现明显职场字样。对用户汇报时用「机构 / 方向 / 方式 / 记录 / 原文」，不要用「招聘 / 岗位 / 投递 / 面试」。

## 固定事实

| 项目 | 值 |
|---|---|
| 线上地址 | https://rainnyhappyeveryday.github.io/ |
| 唯一仓库（公开） | https://github.com/Rainnyhappyeveryday/Rainnyhappyeveryday.github.io |
| 数据文件 | `data/jobs.js` |
| 高校索引 | `data/universities.js`（83 所） |
| 页面 | `index.html`（B 端管理台：表格 + 筛选 + 详情抽屉 + 收藏/隐藏） |
| 技能位置 | `skill/SKILL.md` |
| 发布方式 | `git add / commit / push`；GitHub Pages 自动构建 |
| 周期 | 每周一 10:00，Asia/Shanghai |
| 更新范围 | 上一个自然周（周一 00:00 — 周日 23:59）新发布的内容 |

候选人画像：国际商务硕士，已毕业，走社会通道；判断相关度时以这个背景为准，但不要把它写进公开页面。

默认本地路径为 `F:\ME\wuhan-jobs`。换机器或换工具时，先克隆站点仓库，把下文命令中的 `PROJECT_ROOT` 换成实际路径。

## 每次运行前

1. 进入项目目录，执行 `git pull`，确保基于最新数据。
2. 读 `data/jobs.js` 的 `meta`、`issues`、`jobs`，记录已有 `announcement_url + position` 用于去重。
3. 读 `data/universities.js`，确认仍是 83 所；如果名单变了，先补名单再跑，不要跳过。
4. 读 `references/sources.md`，按 A → B → C → 搜索补漏的顺序核查。

## 跑哪些页面

### 高校：83 所全量过一遍

以 `data/universities.js` 和 `references/universities.md` 为总表。不是只查几所部属高校。

优先顺序：

1. **公办本科 25 所**：官网人事处/人才招聘/通知公告。
2. **公办专科 27 所**：官网人事处/人才招聘/通知公告。
3. **民办本科 23 所**：官网人事处/招聘栏目；没有独立入口的用 `site:<域名> 2026年11月 招聘` 补查。
4. **民办专科 8 所**：至少查官网「人才招聘 / 通知公告」；没有入口的用搜索补查。

每所学校至少完成一次官网列表或站内搜索；不能因为首页没更新就默认没有。二级单位（学院、实验室、研究中心、附属单位）单独发布的，也要看。

### 事业单位 / 国企 / 科研院所

按 `references/sources.md` 的 B、C 类逐项检查：

- 省属/市属国企总部及武汉子公司
- 高校、职校、事业单位
- 科研院所
- 武汉市人社局、湖北省人社厅、武汉掌上人才、武汉市人事考试院

国企岗位表常是图片或附件，必须下载后核对人数、条件、截止时间，不能凭标题猜。

### 搜索补漏

官网列表打不开、改版、或没入口时，用：

```text
site:<域名> 2026年11月 招聘
"单位名" 2026年11月 社会招聘
武汉 2026年11月 事业单位 硕士
武汉 2026年11月 国企 社会招聘
武汉 2026年11月 高校 管理岗
```

搜索只用于定位，最终链接必须回到官网原文。

## 收录与排除

### 收

- 工作地点在武汉。
- 直接用人单位是高校、职校、事业单位、国企/央企、科研院所。
- 单位内部的方向：学院、实验室、行政办公室、校医院、集团总部/子公司等。
- 面向社会，已毕业的人可以参与；不是只限某一届。
- 原始公告仍在开放，或属于上一周新发布。
- 劳务派遣、合同、校方聘用、企业聘用、长期等都可以收，但必须如实写 `employment`。

### 不收

- 只面向在校生、应届专属、实习/见习、兼职、外包、小时工。
- 学校就业网代其他单位发布、宣讲会、双选会。
- 拟录用公示、面试/笔试/体检/资格审查通知。
- 工作地点不在武汉（总部在武汉但岗位在外地也不收）。
- 已截止超过一周且没有后续批次。
- 聚合站转载；必须找到官网原文。

## 每条必须核对

- 单位、二级单位/部门
- 方向名称
- 人数（数字 + 展示文案）
- 发布日、开始日、截止日/时间；招满即止写 `rolling: true`
- 学历、专业、经历、年龄、政治面貌
- 用工方式
- 工作地点
- 官网原文链接
- 相关度 A/B/C 及理由

日期未知写 `未注明`，不要猜。图片表要下载/看图核对。

## 去重

按 `announcement_url + position` 去重。同一公告多个方向拆成多行，共用 `group_id`；`group_positions` 放同批其他方向。更新已有记录时只补字段，不重复追加。

## 写入数据

字段完整定义见 `references/site-contract.md`。最低要求：

```js
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
```

每次运行还要：

- 在 `jobs` 末尾追加，不删除旧对象。
- 在 `issues` 末尾追加本期记录：`id, label, date, period, added, recommended, note`。
- 更新 `meta.issue`、`meta.issue_label`、`meta.generated_at`、`meta.period_start`、`meta.period_end`、`meta.next_update`。
- 没有新增也要追加 `added: 0`，`note` 写「本周无新增」，不要编造。
- `sources` 有新来源才追加，不删除旧来源。

## 校验

在本仓库根目录运行：

```bash
node skill/scripts/validate.mjs .
```

技能单独安装到其他目录时：

```bash
node <SKILL_DIR>/scripts/validate.mjs .
```

技能里的 `scripts/validate.mjs` 检查：

- 83 所高校、数据可解析
- jobs id 唯一
- 必填字段和日期格式
- `announcement_url + position` 不重复
- issues 与 meta 对齐
- 页面静态文案不含禁用词

再检查脚本语法和页面：

```bash
node --check tmp/app.js   # 从 index.html 最后一个 <script> 提取
```

桌面 1440、手机 390 各看一次截图；重点看表格是否溢出、抽屉能否打开、收藏/隐藏是否还在、筛选是否可用。

## 发布

仓库根目录就是发布目录，没有第二个仓库、没有 `dist/`：

```bash
git add -A
git commit -m "Update weekly notes"
git push origin main
```

GitHub Pages 会自动从根目录构建。发布后检查：

```bash
node <SKILL_DIR>/scripts/check-live.mjs
```

再打开线上地址，确认：

- HTTP 200，标题为「条条大路通罗马」
- 新记录出现在表格和手机卡片
- 详情抽屉能打开，右上角「查看原文」能跳转
- 收藏/隐藏、筛选、分页正常

GitHub Pages 构建通常需要 30–60 秒。若还是旧页面，查仓库的 Pages build 状态，等构建完成再刷新。

## 汇报格式

在聊天里给一张**本期新增**表：

| 机构 | 方向 | 方式 | 开始 | 人数 | 原文 |
|---|---|---|---|---|---|

再说明：

- 新增多少条、可看多少条
- 最近截止的 2–3 条
- 83 所高校本期有几所有记录
- 线上地址：https://rainnyhappyeveryday.github.io/

回复里不要出现「招聘 / 岗位 / 求职 / 投递 / 面试」等字样；统一用「记录 / 方向 / 机构 / 原文」。没有新增就直说，并给仍开放的存量提示。

## 失败处理

- 官网 403/打不开：换 `site:` 搜索，或换该单位另一个栏目；仍拿不到就在汇报里说明未核验，不编造。
- 图片表：下载附件看图；看不清就标「未注明」，不要猜人数。
- 微信公众号有验证码：以官网转载、人社局转载为准；找不到原文就不收。
- 本周没有新增：追加 `added: 0`，页面照常发布。
- 部署失败：先看 `git status` 和远端权限；站点仓库必须是公开的，Pages 才能构建。
- 线上 404：确认发布仓库根目录有 `index.html`，Pages 构建完成。

## 切换工具

这个技能不依赖 DSH 专有接口。任何能读文件、跑 `git`/`node`、能浏览网页的 Agent 都可以执行。

安装方式：

- Codex / 通用 Agent Skills：复制整个目录到 `~/.agents/skills/wuhan-weekly-notes` 或项目的 `.agents/skills/`
- Claude Code：复制到 `~/.claude/skills/wuhan-weekly-notes`
- Cursor：复制到 `~/.cursor/skills/wuhan-weekly-notes`
- 其他工具：把 `SKILL.md` 作为系统提示/任务说明加载，并把 `references/` 放在同目录

定时：

```cron
0 10 * * 1
```

时区 Asia/Shanghai；如果调度器用 UTC，则写 `0 2 * * 1`。

## 完成标准

- [ ] 83 所高校都过了一遍，或明确记录未核验原因
- [ ] 新记录已追加，旧记录未删除
- [ ] issues/meta 已更新
- [ ] `node skill/scripts/validate.mjs .` 通过
- [ ] 桌面和手机截图都检查过
- [ ] 已发布到同一个线上地址
- [ ] 汇报表格没有职场字样
