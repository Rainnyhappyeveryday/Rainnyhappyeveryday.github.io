# wuhan-weekly-notes

一个可移植的 Agent Skill：维护 **条条大路通罗马** 武汉每周记录站。

线上：https://rainnyhappyeveryday.github.io/

它把“每周一跑一遍”的流程固定下来：查哪些页面、怎么筛、数据写到哪里、怎么校验、发布到哪个仓库、最后怎么汇报。Skill 不依赖 DSH；换 Codex、Claude Code、Cursor 或其他能读写文件、运行 git/node、浏览网页的工具都能继续。

## 仓库内容

这个技能放在站点仓库的 `skill/` 目录，不再单独开仓库：

```text
Rainnyhappyeveryday.github.io/
├─ index.html
├─ data/
└─ skill/
   ├─ SKILL.md                 技能主文件
   ├─ references/
   │  ├─ sources.md            每周核查来源清单
   │  ├─ universities.md       83 所武汉普通高校总表
   │  ├─ site-contract.md      页面、数据字段、发布契约
   │  └─ output.md             汇报模板
   └─ scripts/
      ├─ validate.mjs          发布前校验
      └─ check-live.mjs        发布后线上检查
```

## 安装

克隆站点仓库后，把 `skill/` 复制到对应工具的 skills 目录：

```bash
git clone https://github.com/Rainnyhappyeveryday/Rainnyhappyeveryday.github.io.git

# Codex / 通用 Agent Skills
mkdir -p ~/.agents/skills
cp -r Rainnyhappyeveryday.github.io/skill ~/.agents/skills/wuhan-weekly-notes

# Claude Code
mkdir -p ~/.claude/skills
cp -r Rainnyhappyeveryday.github.io/skill ~/.claude/skills/wuhan-weekly-notes

# Cursor
mkdir -p ~/.cursor/skills
cp -r Rainnyhappyeveryday.github.io/skill ~/.cursor/skills/wuhan-weekly-notes
```

项目级安装也可以放到 `<project>/.agents/skills/`。其他工具直接把 `SKILL.md` 作为任务说明加载，并保持 `references/` 与 `scripts/` 在同目录。

## 使用

```bash
git clone https://github.com/Rainnyhappyeveryday/Rainnyhappyeveryday.github.io.git
cd Rainnyhappyeveryday.github.io
```

然后在 Agent 里说：

```text
按 wuhan-weekly-notes 跑本周更新
```

或手动执行关键命令：

```bash
node skill/scripts/validate.mjs .
git add -A && git commit -m "Update weekly notes" && git push
node skill/scripts/check-live.mjs
```

## 定时

- 时区：`Asia/Shanghai`
- 时间：每周一 10:00
- cron：`0 10 * * 1`
- UTC 调度器：`0 2 * * 1`

用 DSH 的 schedule、Codex automation、系统 cron 或 GitHub Actions 都可以；技能本身只描述流程，不绑定调度器。

## 依赖

- Node.js 18+（脚本只使用标准库）
- Git
- GitHub 账号/`gh`（发布用）
- 能访问官网与 GitHub Pages 的网络
- 可选：Chrome/Chromium（桌面 1440、手机 390 截图检查）

## 隐私

站点仓库是 **public**（GitHub Pages 免费用户站需要公开仓库），所以 `skill/` 也会公开。技能里只保留通用的候选人背景，不写学校、姓名、账号或投递记录；来源清单都是公开网页。不要把私人备注写进这个仓库。
