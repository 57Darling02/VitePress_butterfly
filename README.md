# VitePress-Butterfly Theme

<p align="center">
  <img src="https://img.shields.io/badge/VitePress-1.6.3-646cff?style=flat-square&logo=vite&logoColor=white" alt="VitePress" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.9.5-409eff?style=flat-square&logo=element-plus&logoColor=white" alt="Element Plus" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

基于 [VitePress](https://vitepress.dev/) + [Element Plus](https://element-plus.org/) 的卡片风博客主题。

目标是简单易用：写 Markdown、推送代码、自动上线。

## 快速开始

将本仓库 Fork 到你自己的 GitHub 仓库后，按下面流程即可开始使用。

### 1. 写文章与基础配置

1. 把文章放到仓库根目录 `posts/` 下即可，本地文章不要求 `layout: doc`。
2. 根目录 `site_config.yml` 用于定制网站效果（站点名称、首页文案、菜单、页脚等）。

### 2. 本地部署（可跳过）

1. 安装 Node.js / npm 环境。
2. 安装依赖：

```bash
npm i
```

3. 本地预览：

```bash
npm run dev
```

4. 本地打包：

```bash
npm run docs:build
```

5. 其他常用命令：

```bash
npm run preview
npm run build
```

### 3. 便捷托管（推荐）

#### 3.1 GitHub Actions 自动构建

仓库已内置工作流。你只需要在 GitHub 仓库 `Settings -> Actions -> General` 中允许 Actions 运行。  
之后每次推送到 `main` 都会触发自动构建和部署。

#### 3.2 GitHub Pages 上线

在 GitHub 仓库 `Settings -> Pages` 中，将 Source 设置为 `GitHub Actions`。

#### 3.3 Vercel 上线

1. 在 Vercel 导入并绑定该仓库。
2. 在 GitHub 仓库 `Settings -> Secrets and variables -> Actions` 配置：
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TOKEN`

### 4. 进阶用法：外联知识库（可选）

你可以把 Markdown 知识库仓库作为外部内容源接入本项目。

注意：
1. 该功能依赖第 3 节的工作流托管。
2. 启用外联知识库后，本仓库 `posts/` 本地文章会被忽略，构建内容来自外联仓库。

#### 4.1 关联知识库

在 GitHub 仓库 `Settings -> Secrets and variables -> Actions` 配置Repository secrets：
1. `WIKI_URL`：知识库仓库 Git URL（例如 `https://github.com/yourname/your-wiki.git`）
2. `WIKI_BRANCH`：可选，默认 `main`
3. `PAT`：可选，私有仓库需要

#### 4.1.1 开发者本地测试关联脚本

Windows PowerShell:

```powershell
$env:WIKI_URL="https://github.com/yourname/your-wiki.git"
$env:WIKI_BRANCH="main"
$env:PAT="ghp_xxx" # 私有仓库时需要
npm run fetch-posts
```

macOS / Linux:

```bash
export WIKI_URL="https://github.com/yourname/your-wiki.git"
export WIKI_BRANCH="main"
export PAT="ghp_xxx" # 私有仓库时需要
npm run fetch-posts
```

#### 4.2 公开文章规则

外联知识库并不会全部公开。  
仅当 Markdown 能正确解析 frontmatter，且包含 `layout: doc` 时，该文章会被保留并展示到网站。

#### 4.3 知识库更新后自动同步网站

本仓库工作流监听 `repository_dispatch` 的 `contents-updated` 事件。  
你可以在知识库仓库配置一个触发工作流，在更新后通知博客仓库重建。

示例：

```yaml
name: Trigger Blog Rebuild

on:
  push:
    branches: [main]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Dispatch event to blog repo
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PAT }}
          repository: yourname/your-blog-repo
          event-type: contents-updated
```

---

## 配置指南

### Site Config

编辑根目录 `site_config.yml`：

```yaml
site_name: "My Awesome Blog"
author: "Your Name"
socialLinks:
  - name: "GitHub"
    icon: "fa-brands fa-github"
    url: "https://github.com/..."
```

### Post Frontmatter（推荐）

虽然本地模式不强制 `layout: doc`，但建议为文章补充 frontmatter，获得更完整的展示效果：

```yaml
---
title: My Post Title
date: 2024-03-20
author: Me
layout: doc
cover: /path/to/image.png
---
```

### Project Structure

```text
VitePress-Butterfly/
├── .vitepress/        # Theme core
├── posts/             # Markdown content
├── public/            # Static assets
├── scripts/           # Build scripts
├── site_config.yml    # Site config
└── package.json
```

## License

[MIT](LICENSE) © 2024-present 57Darling02
