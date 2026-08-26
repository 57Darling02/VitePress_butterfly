import { Notice, TFolder, type App } from "obsidian";

export const SITE_CONFIG_PATH = "site_config.yml";
export const PUBLIC_DIR = "public";
export const TRIGGER_WORKFLOW_PATH = ".github/workflows/trigger.yml";

/**
 * The content-repository workflow that dispatches a rebuild to the blog
 * repository after every push. Without it a freshly initialized vault would
 * never trigger deployments.
 */
const TRIGGER_WORKFLOW_YAML = `# Place this workflow in your content/wiki repository (not the blog repo).
name: Trigger Blog Rebuild

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Check blog repository is ready
        id: check
        env:
          PAT: \${{ secrets.PAT }}
          BLOG_REPO: \${{ secrets.BLOG_REPO }}
        run: |
          if [ -z "$PAT" ] || [ -z "$BLOG_REPO" ]; then
            echo "::notice::尚未完成博客配置，本次推送不触发构建。"
            exit 0
          fi

          if [[ ! "$BLOG_REPO" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
            echo "::warning::BLOG_REPO 格式无效，本次推送不触发构建。"
            exit 0
          fi

          status="$(curl --silent --show-error --connect-timeout 5 --max-time 15 \\
            --output /dev/null --write-out '%{http_code}' \\
            --header 'Accept: application/vnd.github+json' \\
            --header "Authorization: Bearer $PAT" \\
            --header 'X-GitHub-Api-Version: 2022-11-28' \\
            "https://api.github.com/repos/$BLOG_REPO" || true)"
          if [ "$status" != "200" ]; then
            if [ "$status" = "404" ]; then
              echo "::notice::博客仓库尚未就绪，本次推送不触发构建。"
            else
              echo "::warning::无法验证博客仓库（HTTP \${status:-network error}），请检查 PAT 权限或网络。"
            fi
            exit 0
          fi

          echo "ready=true" >> "$GITHUB_OUTPUT"

      - name: Dispatch event to blog repo
        if: steps.check.outputs.ready == 'true'
        env:
          PAT: \${{ secrets.PAT }}
          BLOG_REPO: \${{ secrets.BLOG_REPO }}
        run: |
          status="$(curl --silent --show-error --connect-timeout 5 --max-time 15 \\
            --output /dev/null --write-out '%{http_code}' \\
            --request POST \\
            --header 'Accept: application/vnd.github+json' \\
            --header "Authorization: Bearer $PAT" \\
            --header 'Content-Type: application/json' \\
            --header 'X-GitHub-Api-Version: 2022-11-28' \\
            --data '{"event_type":"contents-updated"}' \\
            "https://api.github.com/repos/$BLOG_REPO/dispatches" || true)"

          if [ "$status" != "204" ]; then
            echo "::error::触发博客重建失败（HTTP \${status:-network error}），请检查 PAT 权限或网络。"
            exit 1
          fi
`;

function defaultSiteConfigYaml(siteName: string): string {
	const safeName = JSON.stringify(siteName);
	return `# Site information
site_name: ${safeName}
site_description: "这是一个使用 VitePress 构建的博客站点。"
site_url: ""
lang: "zh-CN"
author: ""

# Visual experience
# Leave background empty for the built-in adaptive gradient, or use a HEX color or public asset path.
background: ""
bg_rainfall: false

# Home page
home:
  mainTitle: ${safeName}
  subTitles:
    - "写 Markdown"
    - "推送文章"
    - "自动上线"

# Post list
# sortMethod: "date" or "lastUpdated".
pageSize: 8
sortMethod: "date"

# Last updated display
lastUpdated:
  use: true

# Profile card
avatar: ""
name: ""
signature: ""
introduction: ""
socialLinks: []

# Navbar menu
# link uses site paths such as "/FriendLink/" or external URLs such as "https://example.com".
menuItems: []

# Navigation music player
# volume range: 0 ~ 1.
musicPlayer:
  enabled: false
  url: ""
  name: ""
  artist: ""
  cover: ""
  autoplay: false
  volume: 0.6

# Friend links page
friendlink: []

# Footer
footer:
  message: "Hello World!"
  copyright: "Powered by VitePress-Butterfly"
  createdTime: ""

# Comments powered by giscus.
# Fill these values from https://giscus.app.
comments:
  enabled: false
  host: "https://giscus.app"
  repo: ""
  repoId: ""
  category: "Announcements"
  categoryId: ""
  mapping: "title"
  strict: "0"
  reactionsEnabled: "1"
  emitMetadata: "0"
  inputPosition: "top"
  theme: "preferred_color_scheme"
  lang: "zh-CN"
  loading: "lazy"
`;
}

/**
 * Creates the files every content repository needs so a fresh vault can run
 * the full initialize → publish flow: site_config.yml, the public/ asset
 * directory and the push-trigger workflow. Idempotent: existing files are
 * never overwritten.
 */
export async function ensureTemplateFiles(app: App): Promise<string[]> {
	const vault = app.vault;
	const adapter = vault.adapter;
	const created: string[] = [];

	// adapter.exists checks the real filesystem. vault.getAbstractFileByPath
	// only sees cached files, so retries after an interrupted init would
	// otherwise hit "File already exists" on files git left behind.
	if (!(await adapter.exists(SITE_CONFIG_PATH))) {
		const siteName = vault.getName().trim() || "My Blog";
		await vault.create(SITE_CONFIG_PATH, defaultSiteConfigYaml(siteName));
		created.push(SITE_CONFIG_PATH);
	}

	if (!(await adapter.exists(`${PUBLIC_DIR}/.gitkeep`))) {
		if (!(await adapter.exists(PUBLIC_DIR))) {
			await vault.createFolder(PUBLIC_DIR).catch(() => undefined);
		}
		await vault.create(`${PUBLIC_DIR}/.gitkeep`, "");
		created.push(`${PUBLIC_DIR}/.gitkeep`);
	}

	const workflowDir = ".github/workflows";
	if (!(await adapter.exists(TRIGGER_WORKFLOW_PATH))) {
		if (!(await adapter.exists(workflowDir))) {
			await vault.createFolder(workflowDir).catch(() => undefined);
		}
		await vault.create(TRIGGER_WORKFLOW_PATH, TRIGGER_WORKFLOW_YAML);
		created.push(TRIGGER_WORKFLOW_PATH);
	}

	if (created.length > 0) {
		new Notice(`已创建模板文件：${created.join("、")}`, 6_000);
	}
	return created;
}
