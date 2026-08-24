# VitePress-Butterfly Theme

基于 VitePress + Element Plus 的卡片风博客主题，采用双仓库模型：

- **博客仓库（本仓库）**：只负责主题、构建与部署。
- **知识库仓库**：只负责 `site_config.yml`、Markdown 和 `public/` 静态资源。

线上 CI 需要博客仓库配置 `WIKI_URL`、`PAT` 两个 secrets；知识库 Push 后通过 `repository_dispatch` 触发博客重建。

## 推荐：用 Obsidian 快速部署

普通用户不需要安装 Node.js 或 pnpm，直接使用知识库模板：

1. 下载或克隆 [vitepress-butterfly-wiki](https://github.com/57Darling02/vitepress-butterfly-wiki)，用 Obsidian 作为 Vault 打开。
2. 在 Obsidian 中关闭受限模式，启用内置的 `obsidian-git` 和 `VitePress Butterfly` 插件。
3. 创建一个 **Tokens (classic)** PAT，勾选 `repo` 和 `workflow`。
4. 点击左侧 Ribbon 的火箭图标打开控制台，进入「仓库设置」：
   - 输入 PAT 并检测连通性；
   - 检测/创建文章仓库；
   - 检测/创建博客仓库。
5. 插件会自动完成：创建仓库、写入 `WIKI_URL/PAT` 等 secrets、配置 GitHub Pages、触发首次部署。之后切换到「控制台」标签即可日常写作与发布。

后续在知识库中写文章，打开控制台点击“提交并推送”即可自动上线；Git 引擎由 obsidian-git 提供。

完整流程、重试策略和常见问题见 [知识库 README](https://github.com/57Darling02/vitepress-butterfly-wiki)。

## 内容约定

站点配置只读取知识库根目录的 `site_config.yml`；本仓库的 `site_config.example.yml` 只是参考模板。静态资源放在知识库 `public/`，例如 `public/avatar.png` 对应 `/avatar.png`。

### 文章

```md
---
title: Hello World
date: 2026-01-01
author: Me
cover: ./cover.webp
layout: doc
---

# Hello World
```

- `layout: doc` 进入首页文章流、标签与目录筛选。
- `cover` 支持文章相对路径、`public/` 根路径和 `https://` 外链。
- 不带 `layout: doc` 的文件不会进入文章流。

### 独立页面

`layout: page` 复用主题的页面框架（信息区 + 正文卡片 + 个人资料侧栏），不显示文章日期、目录和评论。示例：

```md
---
title: 友链
layout: page
---

<script setup>
import FriendLinkPage from './FriendLinkPage.vue'
</script>

<FriendLinkPage />
```

导航入口需要在 `site_config.yml` 的 `menuItems` 中配置。图标支持 Lucide kebab-case 名称和 `fa-*` Font Awesome 类名；品牌资源也可以使用 `iconUrl`。

## 可选：Vercel 部署

需要在博客仓库补充 `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID` 三个 secrets；不配置时 GitHub Pages 会正常部署。

## 本地开发（可选）

```bash
pnpm install
pnpm dev
```

构建与预览：

```bash
pnpm docs:build
pnpm preview
```

需要同步私密知识库时，在博客仓库根目录创建不会提交的 `.env.local`：

```text
WIKI_URL=https://github.com/yourname/your-private-wiki.git
PAT=ghp_xxx
```

之后运行 `pnpm dev` 会先同步知识库，再启动 VitePress。

## 更新主题

使用 Obsidian 插件创建博客仓库时，主题不会自动升级。需要更新时可参考：

```bash
git remote add upstream https://github.com/57Darling02/VitePress_butterfly.git
git fetch upstream && git checkout main && git reset --hard upstream/main && git push origin main --force
```

> 该命令会丢弃博客仓库的本地自定义修改，使用前请确认无需保留。

## License

[MIT](https://opensource.org/licenses/MIT) © 2024-present 57Darling02
