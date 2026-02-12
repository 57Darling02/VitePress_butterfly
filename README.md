# VitePress-Butterfly Theme

<p align="center">
  <img src="https://img.shields.io/badge/VitePress-1.6.3-646cff?style=flat-square&logo=vite&logoColor=white" alt="VitePress" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.9.5-409eff?style=flat-square&logo=element-plus&logoColor=white" alt="Element Plus" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

A card-style blog theme based on [VitePress](https://vitepress.dev/) and [Element Plus](https://element-plus.org/), inspired by the Butterfly theme. It supports both **Single Repository** (easiest to start) and **Dual Repository** (content separation) modes.

Turn your Obsidian notes into a **dynamic blog** effortlessly!

## ✨ Features

- **Zero Config Start**: Just fork and write. No complex setup required for basic usage.
- **Obsidian Friendly**: Seamless workflow for Obsidian users.
- **Dual Modes**: 
  - 📂 **Single Repo**: Simple and direct. Code and posts in one place.
  - 🔗 **Dual Repo**: Advanced separation. Keep your source code public and posts private.
- **Static Optimization**: Powered by Vite for blazing fast loading times.
- **GitHub Actions**: Automated deployment workflow included.

## 🚀 Quick Start (Single Repo Mode)

**Recommended for most users.**

1.  **Fork this repository** to your GitHub account.
2.  **Rename** the repository to `[your-username].github.io` (optional, for default Pages URL).
3.  **Clone** to your local machine:
    ```bash
    git clone https://github.com/your-username/VitePress-Butterfly.git
    cd VitePress-Butterfly
    ```
4.  **Install Dependencies**:
    ```bash
    pnpm install
    ```
5.  **Start Writing**:
    Create your Markdown files in the `posts/` directory.
    ```bash
    # Example: Create a new post
    echo "# My First Post" > posts/hello-world.md
    ```
6.  **Run Dev Server**:
    ```bash
    pnpm dev
    ```
    Visit `http://localhost:5173` to see your blog.

7.  **Deploy**:
    Push your changes to GitHub. The included GitHub Actions workflow will automatically build and deploy your site.
    *(Note: Ensure GitHub Pages source is set to "GitHub Actions" in your repository settings)*

---

## 🛠 Advanced Usage (Dual Repo Mode)

**For users who want to keep their Markdown source private or separate.**

In this mode, this repository serves as the "Engine", and another repository serves as the "Content".

### 1. Setup Content Repo
Create a new repository (e.g., `blog-posts`) and put your Markdown files there.

### 2. Configure Engine Repo
In your "Engine" repository (this one), go to **Settings > Secrets and variables > Actions** and add:

| Name | Description | Example |
|------|-------------|---------|
| `POST_REPO` | URL of your content repository | `https://github.com/username/blog-posts.git` |
| `POST_BRANCH` | (Optional) Branch to fetch | `main` |
| `PERSONAL_ACCESS_TOKEN` | (Required if private) GitHub PAT | `ghp_xxxxxx` |

### 3. Setup Auto-Trigger (Optional)
To automatically rebuild your site when you push new posts to the **Content Repo**, you need to set up a workflow in your `blog-posts` repository.

1.  In your **Content Repo**, create `.github/workflows/trigger.yml`.
2.  Copy the content from `posts/.github/workflows/trigger.yml` (found in this repo) or use the template below:
    ```yaml
    name: Trigger Main Blog Repo Build

    on:
      push:
        branches: [main]

    jobs:
      trigger:
        runs-on: ubuntu-latest
        steps:
          - name: Trigger main repo build
            uses: peter-evans/repository-dispatch@v3
            with:
              token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
              repository: username/VitePress-Butterfly  # Replace with your Engine Repo
              event-type: blog-post-updated
    ```
3.  Add `PERSONAL_ACCESS_TOKEN` to your **Content Repo's** Secrets.

### 4. Local Development
To fetch remote posts locally, set the environment variables before running the fetch script:
```bash
# Windows (PowerShell)
$env:POST_REPO="https://github.com/username/blog-posts.git"; pnpm fetch-posts

# Mac/Linux
export POST_REPO="https://github.com/username/blog-posts.git" && pnpm fetch-posts
```

## ⚙️ Configuration

### Site Config
Edit `site_config.yml` in the root directory to customize your blog:

```yaml
site_name: "My Awesome Blog"
author: "Your Name"
socialLinks:
  - name: 'GitHub'
    icon: 'fa-brands fa-github'
    url: 'https://github.com/...'
# ... see file for more options
```

### Post Frontmatter
Add these fields to the top of your Markdown files:

```yaml
---
title: My Post Title
date: 2024-03-20
author: Me
layout: doc   # Required to show up in the blog list
cover: /path/to/image.png # Optional
---
```

## 📂 Project Structure

```text
VitePress-Butterfly/
├── .vitepress/          # Theme Core (avoid editing unless necessary)
├── posts/               # Your Content (Markdown files go here)
├── public/              # Static assets (images, favicon)
├── scripts/             # Build scripts
├── site_config.yml      # Main configuration file
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT](LICENSE) © 2024-present 57Darling02
