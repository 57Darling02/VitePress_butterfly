# VitePress-Butterfly Theme

基于 VitePress + Element Plus 的卡片风博客主题。

目标很简单：写 Markdown、推送代码、自动上线。

我的博客:https://57darling02.github.io

博客模板展示:https://vitepress.57d02.cn


## 核心模型

正式使用时，本项目采用双仓库模式：

```text
主题仓库：只负责主题、构建、部署
知识库仓库：负责文章、图片、站点配置
```

`Setup Blog` 会自动创建私密知识库，并把知识库同步到主题仓库的 `posts/` 工作区。线上 CI 必须配置 `WIKI_URL`，本地 `posts/` 只用于主题开发兜底。

配置只认知识库里的 `site_config.yml`。`site_config.example.yml` 只是主题仓库里的参考模板。

## 快速开始：线上自动部署

这是推荐用法，不需要在电脑上安装 Node.js、pnpm 或任何本地环境。

### 1. Fork 主题仓库

点击 GitHub 页面右上角 `Fork`，把本仓库复制到你自己的账号下。

如果你想使用 GitHub Pages 的默认个人站点域名，建议仓库名设为：

```text
你的用户名.github.io
```

如果 GitHub 提示 Fork 后的 workflow 被禁用，点击允许启用。

### 2. 创建初始化 Token

创建一个 GitHub PAT，用来让初始化工作流帮你创建知识库、配置 secrets、触发部署。

```text
GitHub 头像 -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
```

推荐勾选：

```text
repo
workflow
```

复制生成的 token。它只显示一次。

回到你的主题仓库，添加 secret：

```text
Settings -> Secrets and variables -> Actions -> New repository secret
```

名称填：

```text
SETUP_PAT
```

值粘贴刚刚生成的 token。

### 3. 运行自动初始化

```text
Actions -> Setup Blog -> Run workflow
```

填写：

- `wiki_repo_name`：你的知识库仓库名，例如 `my-blog-wiki`
- `wiki_branch`：默认 `main`

运行后，它会自动：

- 使用 [57Darling02/wiki_template](https://github.com/57Darling02/wiki_template) 创建你的知识库仓库
- 知识库仓库固定创建为私密仓库
- 给主题仓库配置 `WIKI_URL`、`WIKI_BRANCH`、`PAT`
- 给知识库仓库配置 `BLOG_REPO` 和 `PAT`
- 尝试把 GitHub Pages 设置为 `GitHub Actions`
- 触发第一次部署

> 初始化成功后，`SETUP_PAT` 只在你重新运行 `Setup Blog` 时才需要；如果暂时不用，可以从主题仓库 secrets 里删除。

如果 Pages 自动配置失败，手动进入：

```text
Settings -> Pages
```

把 `Source` 设置为：

```text
GitHub Actions
```

### 4. 写配置和文章

详情见：https://vitepress.57d02.cn/posts/README


你只需要在知识库里维护：
```text
site_config.yml
public/
文章目录/
附件目录/
```

文章需要带 `layout: doc`：

```md
---
title: Hello World
date: 2026-01-01
author: Me
layout: doc
---

# Hello World
```

推送知识库后，它会通知主题仓库重新部署。

### 5. 查看网站

部署完成后，在仓库的 `Actions` 页面可以看到构建状态；在 `Settings -> Pages` 可以看到访问地址。



## 备用：手动配置

如果自动初始化失败，可以手动用 [57Darling02/wiki_template](https://github.com/57Darling02/wiki_template) 创建私密知识库，然后在主题仓库配置 `WIKI_URL`、`WIKI_BRANCH`、`PAT` 三个 Actions secrets。

知识库自动触发主题仓库重建需要在知识库里配置 `BLOG_REPO` 和 `PAT`，并添加 `repository_dispatch` workflow。正常用户优先使用 `Setup Blog`，不需要手动做这些。

## 本地开发（可跳过）

只有当你想本地预览或开发主题时，才需要这一节。

安装依赖：

```bash
pnpm install
```

本地预览：

```bash
pnpm dev
```

构建：

```bash
pnpm docs:build
```

## 私密知识库本地开发

在源码仓库根目录创建 `.env.local`：

```text
WIKI_URL=https://github.com/yourname/your-private-wiki.git
WIKI_BRANCH=main
PAT=ghp_xxx
```

`.env.local` 不会提交。之后直接运行：

```bash
pnpm dev
```

脚本会先同步知识库，再启动 VitePress。



## 常用命令

```bash
pnpm prepare-content
pnpm dev
pnpm docs:build
pnpm preview
```

## 更新主题

如果你的个性化内容都在知识库中，那么可以用 `update_theme.sh` 粗暴更新主题仓库：

```bash
bash update_theme.sh
```

它会从上游主题仓库重置源码仓库。执行前请确认你的自定义内容不在源码文件里。

## 项目结构

```text
VitePress-Butterfly/
├── .vitepress/              # Theme core
├── scripts/
│   └── prepare-content.js   # Content preparation
├── posts/                   # Content workspace
├── public/                  # Theme public assets
├── site_config.example.yml  # Config template
├── package.json
└── update_theme.sh
```

## License

[MIT](LICENSE) © 2024-present 57Darling02
