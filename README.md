# VitePress-Butterfly Theme

基于 VitePress + Element Plus 的卡片风博客主题。

目标很简单：写 Markdown、推送代码、自动上线。

## 核心模型

本项目只认一个内容工作区：

```text
posts/
```

你可以直接在 `posts/` 写文章，也可以配置外部知识库仓库，让构建时自动把知识库同步到 `posts/`。

规则如下：

- 未配置 `WIKI_URL`：使用当前仓库的 `posts/`，适合快速开始。
- 配置了 `WIKI_URL`：外部知识库是唯一内容源，构建前会覆盖当前 `posts/`。
- `posts/site_config.yml` 是唯一运行时配置文件。
- `site_config.example.yml` 只是配置模板，不参与运行时加载。
- `posts/public/` 放站点资源，例如头像、背景图、封面图。

## 快速开始

安装依赖：

```bash
pnpm install
```

复制配置模板：

```bash
cp site_config.example.yml posts/site_config.yml
```

写一篇文章到 `posts/hello.md`：

```md
---
title: Hello World
date: 2026-01-01
author: Me
layout: doc
---

# Hello World
```

本地预览：

```bash
pnpm dev
```

构建：

```bash
pnpm docs:build
```

## 外部知识库

在 GitHub Actions secrets 中配置：

- `WIKI_URL`：知识库仓库 Git URL，例如 `https://github.com/yourname/your-wiki.git`
- `WIKI_BRANCH`：可选，默认 `main`
- `PAT`：可选，私有仓库需要

配置 `WIKI_URL` 后，构建会自动同步远程知识库。如果同步失败，构建会失败，避免部署旧内容。

知识库推荐结构：

```text
your-wiki/
├── site_config.yml
├── public/
│   ├── image/
│   └── wallpaper/
├── posts-or-notes/
└── attachments/
```

只有包含 `layout: doc` 的 Markdown 会在远程同步模式下保留并发布。

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

## 资源规则

站点自定义资源放在：

```text
posts/public/
```

例如：

```text
posts/public/image/avatar.png
posts/public/wallpaper/1.webp
```

配置中这样引用：

```yaml
avatar: "/image/avatar.png"
background: "/wallpaper/1.webp"
```

构建前会把根目录 `public/` 的主题资源和 `posts/public/` 的站点资源合并到 `.vitepress/content-public/`。这个目录是生成产物，不需要提交。

## 常用命令

```bash
pnpm prepare-content
pnpm dev
pnpm docs:build
pnpm preview
pnpm build
```

## 更新主题

如果你的源码仓库只保留主题代码，所有个性化内容都在 `posts/` 或外部知识库中，那么可以用 `update_theme.sh` 粗暴更新主题：

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
