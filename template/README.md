# VitePress-Butterfly 文章仓库模板

这是 [VitePress-Butterfly](https://github.com/57Darling02/VitePress_butterfly) 的文章仓库模板，也是整个博客的使用入口。仓库已内置 VitePress Butterfly 控制台插件和 obsidian-git；桌面端与移动端都可以完成首次配置和日常发布。

## 双仓库模型

```text
文章仓库（私密）＝ Markdown、图片和 site_config.yml，日常只维护这里
博客仓库（公开）＝ 主题源码、构建工作流和 GitHub Pages，通常不用手动修改
```

两个仓库通过 GitHub Actions secrets 连接：

| 仓库 | secrets |
|---|---|
| 文章仓库 | `BLOG_REPO`、`PAT` |
| 博客仓库 | `WIKI_URL`、`PAT` |

文章仓库 Push 后，内置的 `trigger.yml` 会通知博客仓库重新构建。构建会拉取本仓库的最新内容。

## 快速开始

### 1. 获取并打开 Vault

任选一种方式：

- **第一次使用（推荐）**：下载本仓库 ZIP，解压后用 Obsidian 打开；插件会在配置文章仓库时自动初始化本地 Git
- **已经有文章仓库**：`git clone` 后用 Obsidian 打开，或直接下载仓库 ZIP 解压打开——向导检测到远端已有仓库且本地没有 Git 历史时，会让你选择同步方向：「从远端同步到本地」（推荐，下载远端内容）或「以本地内容覆盖远端」

进入 `设置 → 第三方插件`，关闭受限模式并启用内置的：

- VitePress Butterfly
- Obsidian Git

### 2. 准备 PAT

在 GitHub 创建 **Tokens (classic)**：

```text
GitHub → Settings → Developer settings
→ Personal access tokens → Tokens (classic)
```

勾选：

- `repo`
- `workflow`

建议创建一个专用于博客的 PAT。PAT 只显示一次，请妥善保存。

### 3. 连接并初始化

点击 Obsidian 左侧 Ribbon 的火箭图标打开 **VitePress Butterfly 控制台**。顶部状态卡会引导你完成全部配置：

1. **连接 GitHub**：输入 PAT，点击「检测并连接」；成功后自动进入初始化向导
2. **初始化博客**：填写文章仓库与博客仓库名（自动建议），确认方案后一键执行：创建/连接仓库、写入 secrets、配置 Pages 并触发首次构建
3. 初始化完成后，状态卡显示「已就绪」；之后每次提交并推送，站点都会自动重新构建

仓库策略：

- 文章仓库不存在时创建为**私密仓库**，并上传当前 Vault 内容；已存在时默认只更新连接配置，不碰内容（可勾选覆盖，会替换远端 `main`）
- 博客仓库不存在时从官方模板创建**公开仓库**；已存在时只更新变量，不修改主题
- 初始化按步骤持久化，中途关闭或网络失败后，状态卡会显示「初始化未完成」，继续即可从失败步骤恢复

仓库名一旦修改，检测结果自动作废，需要重新检测。插件直接复用 obsidian-git 的 Git 引擎。

## 博客控制台

点击 Obsidian 左侧 Ribbon 的火箭图标，或运行命令 **打开博客控制台**。控制台是单一面板，由顶部状态卡驱动：

- **状态**：未连接 GitHub / 未初始化 / 初始化未完成 / 已就绪 / 等待构建 / 部署中 / 已部署 / 部署失败。点击主按钮进入对应流程：连接、初始化、继续初始化或查看部署；右侧菜单可重新连接、重新初始化、配置 Vercel、手动触发构建、打开两个仓库
- **写作**：新建文章、配置站点（表单式后台）
- **Git 同步**：刷新状态、拉取、提交并推送（初始化完成后显示，底层使用 obsidian-git）
- **内容概览**：Markdown 数量、已发布文章、标签数和 `site_config.yml` 状态

部署中会自动轮询 GitHub Actions 的 `Deploy Site` 工作流；已部署/失败等终态不再请求 GitHub。部署详情弹窗提供 Actions 链接与重新构建入口。

Vercel 部署选项在状态卡的更多菜单中：Token、Org ID、Project ID 三项都填写后，下次初始化或重新构建时会一并写入 `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`；留空则跳过，不影响 GitHub Pages。

## 日常写作与发布

首次配置后，打开 **VitePress Butterfly 控制台**：

1. 在 Obsidian 中编写 Markdown
2. 点击控制台的 **提交并推送**
3. 文章仓库的 `trigger.yml` 自动通知博客仓库构建

也可以继续使用 obsidian-git 的 Commit / Push / Pull；控制台中的 Git 操作底层复用的就是 obsidian-git。多设备切换前先点击 **拉取**。

控制台中的 **触发构建** 只用于手动重新构建博客，一般无需点击。

## 双插件分工

| 插件 | 职责 |
|---|---|
| VitePress Butterfly | PAT 验证、仓库初始化、控制台、站点配置入口、发布与构建触发 |
| obsidian-git | Git 引擎：Commit / Push / Pull、冲突处理和本地版本历史 |

VitePress Butterfly 会把 GitHub 用户名和 PAT 写入 obsidian-git 的本地凭据；这些数据不会提交到文章仓库。`.gitignore` 已过滤所有插件的 `data.json`。

## 写文章

每篇文章是一个 Markdown 文件，frontmatter 示例：

```md
---
title: Hello World
date: 2026-01-01
author: Me
layout: doc
---

# Hello World
```

- `layout: doc`：普通博客文章，会进入首页文章流、标签与目录筛选
- `layout: page`：自定义页面
- `layout: shuoshuo`：短内容
- 不带 layout 的 Markdown 不会进入文章流，例如本 README
- 图片支持相对路径、`public/` 根路径和外链

也可以在命令面板运行 **新建博客文章**，自动生成 frontmatter。

## 站点配置

点击控制台的 **配置站点**（或运行命令 **配置站点**），会打开表单式后台，分六个分区编辑 `site_config.yml`：

- **基础**：站点名称、描述、域名、语言、作者、每页文章数、排序方式
- **首页**：背景、雨滴效果、主标题与副标题
- **资料**：头像、名称、签名、简介、社交链接
- **导航**：树状菜单编辑器，支持二级菜单、增删与排序
- **媒体**：音乐播放器、页脚
- **社区**：友链列表、Giscus 评论

后台只修改它管理的字段；主题新增的未知字段会原样保留。弹窗右上角可随时打开原始 `site_config.yml`。保存后发布由「提交并推送」完成。

- `public/`：头像、背景图等公共静态资源
- `用法拓展/`：更多写作与配置示例

## 安全说明

- 文章仓库默认创建为私密仓库
- 博客仓库创建为公开仓库，以便 GitHub Pages 部署
- PAT 保存在本机插件设置、obsidian-git 本地凭据以及 GitHub 加密 secrets 中
- `.obsidian/plugins/*/data.json` 已加入 `.gitignore`，PAT 不会被提交
- 建议使用专用 PAT；泄露后可随时在 GitHub 吊销

## 为什么这套流程更容易重试

所有按钮都可以安全重复点击：

- 仓库检测是只读请求，可无限重试；仓库名修改后需重新检测
- 仓库存在检测和 secrets 写入都是幂等操作
- 主题使用一次 Template API 创建，不再逐文件复制，显著减少网络请求
- 新建文章仓库前会先完成本地 Git 准备，避免本地错误在 GitHub 留下空仓库
- 如果远端创建成功但响应中断，插件会记录未完成状态；重新点击同一个按钮会继续完成上传或配置
- 初始化早期的 Push 或 dispatch 遇到另一仓库尚未就绪时会成功跳过；最后一次有效触发才会构建
- Pages 或首次构建触发失败只会显示警告，不会把已成功创建和配置的仓库判定为失败
- 每次 GitHub 请求最长等待 15 秒，超时后按钮会恢复，可直接重试

## 常见问题

### PAT 修改后为什么状态回到「未连接 GitHub」？

连接状态与 PAT 绑定。修改 PAT 后，旧的连接、初始化和部署记录都会失效（仓库 secrets 中仍是旧 token），需要重新连接并按向导补全配置；向导检测到仓库已存在时只更新 secrets，不会覆盖内容。

### 网络中断后要删除仓库重来吗？

不需要。直接重新点击刚才的配置按钮。文章仓库会继续上传或覆盖当前 `main`，博客仓库会继续完成 secrets、Pages 和构建配置。初始化中较早的构建可能成功跳过，最后一次有效触发会部署。

### 已有仓库会被覆盖吗？

文章仓库已存在时默认只更新环境变量；只有勾选【覆盖】后，才会以当前 Vault 内容 force push 覆盖 `main`。博客仓库已存在时仍只更新 `WIKI_URL` 和 `PAT`，不会修改内容。

### 不想要某个仓库了怎么办？

插件不提供删除功能（避免误删）。请到 GitHub 网页打开仓库 `Settings → Danger Zone → Delete this repository` 删除；删除后回到插件重新检测即可。

### 博客仓库创建后 Pages 没有开启怎么办？

进入博客仓库：

```text
Settings → Pages → Source → GitHub Actions
```

然后回到插件点击 **触发构建**。

### 如何更新主题？

已有博客仓库由用户自行维护，插件不会自动覆盖主题。若希望重新使用最新模板，最简单的方式是删除旧博客仓库，再点击 **配置博客仓库** 重新从模板创建。操作前请确认仓库中没有需要保留的自定义内容。

### 插件源码在哪里？

位于：

```text
.obsidian/plugins/vitepress-butterfly-publisher/
```

构建命令：

```bash
cd .obsidian/plugins/vitepress-butterfly-publisher
pnpm install
pnpm build
```

---
updated: 1787759561
