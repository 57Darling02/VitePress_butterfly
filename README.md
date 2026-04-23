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

1. 把文章放到仓库根目录 `posts/` 下即可。
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

### 4. 进阶用法：外联知识库（推荐/可选）

你可以把 Markdown 知识库仓库作为外部内容源，快速同步至本项目。

注意：
1. 每次同步外部知识库内容， `posts/` 本地文章会被覆盖。
2. 该功能适配第 3 节的工作流托管。托管方案会在每次构建时自动同步知识库内容。

#### 4.1 关联和同步知识库

在 GitHub 仓库 `Settings -> Secrets and variables -> Actions` 配置Repository secrets：
1. `WIKI_URL`：知识库仓库 Git URL（例如 `https://github.com/yourname/your-wiki.git`）
2. `WIKI_BRANCH`：可选，默认 `main`
3. `PAT`：可选，私有仓库需要
使用托管方案不需要手动同步知识库

#### 4.1.1 本地同步知识库

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

#### 4.2 规则

4.2.1 公开文章
外联知识库并不会全部公开。  
仅当 Markdown 能正确解析 frontmatter，且包含 `layout: doc` 时，该文章会被保留并展示到网站。

4.2.2 配置文件优先级
如果知识库根目录中存在 `site_config.yml`，将被优先使用（忽略本仓库的`site_config.yml`配置）。
因此，推荐将`site_config.yml`复制进知识库根目录中，则可以使用`update_theme.sh`快速更新样式。

#### 4.3 知识库更新后自动同步网站

本仓库工作流监听 `repository_dispatch` 的 `contents-updated` 事件。  
你可以在知识库仓库配置一个触发工作流，在更新后通知博客仓库重建。
需要在触发方仓库（文章/知识库仓库）添加 
1. `BLOG_REPO` secret，值为目标博客仓库全名（`owner/repo`）
2. `PAT` secret。


示例：

```yaml
# Place this workflow in your content/wiki repository (not the blog repo).
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
          token: ${{ secrets.PAT }} # PAT stored in the content/wiki repo
          repository: ${{ secrets.BLOG_REPO }} # e.g. 57Darling02/57Darling02.github.io
          event-type: contents-updated
```


---

## 配置指南

所有定制化内容皆可在posts/下实现，（关联知识库本质就是将知识库同步到posts/中）

### Site Config

`site_config.yml`为配置文件，推荐从根目录获取模板并将其复制到`posts/site_config.yml`或关联知识库的根目录：

#### 1.配置网站标题、作者名称和社交链接。
进入[fontawesome](https://fontawesome.com/search)选取自己喜欢的图标。

```yaml
site_name: "My Awesome Blog"
author: "Your Name"
socialLinks:
  - name: "GitHub"
    icon: "fa-brands fa-github"
    url: "https://github.com/..."
```

#### 2.配置资源

在posts/public 或 知识库根目录/public下放置图片，即可直接使用。

例如：背景图放置在 posts\public\wallpaper\1.webp 或者知识库根目录\public\wallpaper\1.webp
则`site_config.yml`中配置
```yaml
background: "/wallpaper/1.webp"
```
即可调用。

或者使用网络图床资源: 
例如：`site_config.yml`中配置
```yaml
avatar: "https://resource-un4.pages.dev/article/yjtp.webp" 
```
即成功配置头像



### 写文章
#### 1.设置文章属性

```yaml
---
title: My Post Title
date: 2024-03-20
author: Me
layout: doc
cover: /path/to/image.png
---
```
1.1 外联知识库时，`layout: doc`才会被发布
1.2 cover封面不能直接使用文章内部的插图！可以使用public或者网络图片

#### 2.文章内部插图

文章内部插图相对简单，只需要使用相对位置即可。obsidian配置如图：![alt text](public\image\image1.png)


### 更多有趣的文章呈现
好玩又有用的文字展示效果、甚至嵌入自己写的网页或vue组件，
参考 👉[文档](https://vitepress.dev/zh/guide/markdown)

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
