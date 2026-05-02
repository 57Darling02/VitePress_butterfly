# VitePress-Butterfly Theme

基于 VitePress + Element Plus 的卡片风博客主题。

以此致敬我的博客启蒙样式[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)

目标很简单：一键部署上线，轻松更新内容。

workflow一键部署上线，写 Markdown/VUE页面、推送、自动上线。


我的博客:https://57darling02.github.io

博客模板展示:https://vitepress.57d02.cn

## 核心模型

正式使用提醒：本项目采用双仓库模式：

```text
主题仓库：只负责主题、构建、部署
知识库仓库：负责文章、图片、站点配置
```

`Setup Blog` 会自动创建私密知识库，并把知识库同步到主题仓库的 `posts/` 工作区。线上 CI 必须配置 `WIKI_URL`，本地 `posts/` 只用于主题开发。

配置只认知识库里的 `site_config.yml`。主题仓库里的`site_config.example.yml` 只是参考模板。

## 快速开始：线上自动部署

这是推荐用法，不需要在电脑上安装 Node.js、pnpm 或任何本地环境。

### 1. Fork 主题仓库

点击 GitHub 页面右上角 `Fork`，把本仓库复制到你自己的账号下。

推荐建议仓库名设为：
```text
你的用户名.github.io
```
以此作为站点域名。

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
如果 GitHub 提示 Fork 后的 workflow 被禁用，点击允许启用。
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
- 创建知识库后，由知识库工作流通知主题仓库触发第一次部署

> 初始化成功后，`SETUP_PAT` 只在你重新运行 `Setup Blog` 时才需要；如果暂时不用，可以从主题仓库 secrets 里删除。

如果 Pages 自动配置失败，手动进入：

```text
Settings -> Pages
```

把 `Source` 设置为：

```text
GitHub Actions
```

### 4. 写配置、文章和页面
所有可定制的内容(站点配置、首页效果、文章、自定义页面等等)都只需要在知识库中改动！
详情见README：https://github.com/57Darling02/wiki_template/ 
或https://vitepress.57d02.cn/p/d2e9fe6f

简单介绍：
只需要在知识库里维护一下内容
```text
site_config.yml
public/
文章目录/
```
其中public用于非文章专属的资源。

#### 4.1 写文章
```md
---
title: Hello World
date: 2026-01-01
author: Me
layout: doc
---

# Hello World
```
文章需要带 `layout: doc`：
`layout: doc` 会进入首页、归档、标签等文章流。

#### 4.2 写页面
如果希望展示自己的页面，本文也提供VUE完成自己的页面
例如[友链页面](https://vitepress.57d02.cn/FriendLink/)的效果
在知识库中的配置见[模板仓库的FriendLink文件夹](https://github.com/57Darling02/wiki_template/tree/main/FriendLink)

比如我希望xxx/FriendLink创建页面，则只需要在目标链接对应目录下完成页面：

- 写好vue页面于FriendLink/FriendLinkPage.vue
- 在FriendLink/index.md中引入，配置`layout: page`
```md
---
title: FriendLink
layout: page
---

<script setup>
import FriendLinkPage from './FriendLinkPage.vue'
</script>
<ClientOnly>
  <FriendLinkPage />
</ClientOnly>
```

然后在 `site_config.yml` 的 `menuItems` 中手动配置,告知访客入口即可。

短内容可以先使用自定义 layout，例如：

```md
---
layout: shuoshuo
date: 2026-01-01
---

今天也在认真生活。
```

这类内容当前只会被构建保留，不会影响现有文章展示；之后可以再做专门的“说说”页面。

推送知识库后，它会通知主题仓库重新部署。

### 5. 查看网站

部署完成后，在仓库的 `Actions` 页面可以看到构建状态；在 `Settings -> Pages` 可以看到访问地址。

## 可选：接入 Vercel 自动部署

如果要部署的网页不止一个，或者希望使用自己的域名，那么推荐vercel部署。
只需要补充填入这三个 secret：
```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

[Two Ways to Find Vercel ORG_ID and PROJECT_ID (codenote.net)](https://codenote.net/en/posts/how-to-find-vercel-org-project-ids/)
简单来说：
1. 在vercel中配置token
2. 关联github仓库
3. 获取`Project ID` 和`Team ID`
	并将它们分别配置为`VERCEL_TOKEN` `VERCEL_TOKEN`和`VERCEL_ORG_ID`
## 主题更新

在源码仓库中点击更新上游即可


或者使用命令行，打开源码仓库终端执行

```bash
git remote add upstream https://github.com/57Darling02/VitePress_butterfly.git

git fetch upstream && git checkout main && git reset --hard upstream/main && git push origin main --force
```


## 备用：手动配置（可跳过）

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
