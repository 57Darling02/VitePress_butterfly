import { Notice, Plugin, TFile } from "obsidian";

import { DEFAULT_SETTINGS, PluginSettings } from "./settings";
import { BlogService } from "./services/blog";
import { ConsoleView, CONSOLE_VIEW_TYPE } from "./ui/ConsoleView";
import { NewArticleModal, type NewArticleInput } from "./ui/NewArticleModal";
import { SiteConfigModal } from "./ui/SiteConfigModal";

export default class VitePressButterflyPublisher extends Plugin {
	settings!: PluginSettings;
	private blog!: BlogService;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.blog = new BlogService({
			app: this.app,
			getSettings: () => this.settings,
			saveSettings: async (changes) => {
				this.settings = { ...this.settings, ...changes };
				await this.saveData(this.settings);
			},
			pluginVersion: this.manifest.version,
		});

		this.registerView(
			CONSOLE_VIEW_TYPE,
			(leaf) => new ConsoleView(leaf, {
				app: this.app,
				blog: this.blog,
				getSettings: () => this.settings,
				saveSettings: (changes) => this.updateSettings(changes),
				createArticle: (input) => this.createArticle(input),
			}),
		);

		this.addRibbonIcon("rocket", "打开 VitePress Butterfly 控制台", () => {
			void this.openConsole();
		});
		this.addCommand({
			id: "open-console",
			name: "打开博客控制台",
			callback: () => this.openConsole(),
		});
		this.addCommand({
			id: "trigger-deploy",
			name: "触发博客重建",
			callback: () => this.runWithFeedback("触发部署", () => this.blog.triggerDeploy()),
		});
		this.addCommand({
			id: "new-article",
			name: "新建博客文章",
			callback: () => {
				new NewArticleModal(this.app, async (input) => {
					await this.createArticle(input);
				}).open();
			},
		});
		this.addCommand({
			id: "configure-site",
			name: "配置站点",
			callback: () => {
				new SiteConfigModal(this.app, () => undefined).open();
			},
		});
	}

	async openConsole(): Promise<void> {
		const existing = this.app.workspace.getLeavesOfType(CONSOLE_VIEW_TYPE)[0];
		if (existing) {
			await this.app.workspace.revealLeaf(existing);
			return;
		}

		// Prefer the right sidebar on desktop; fall back to the active pane
		// on mobile where sidebar leaves do not exist.
		const leaf = this.app.workspace.getRightLeaf(false) ?? this.app.workspace.getLeaf(false);
		await leaf.setViewState({ type: CONSOLE_VIEW_TYPE, active: true });
		await this.app.workspace.revealLeaf(leaf);
	}

	onunload(): void {
		// Nothing to clean up.
	}

	async loadSettings(): Promise<void> {
		const saved = (await this.loadData()) as Partial<PluginSettings> | null;
		this.settings = {
			...DEFAULT_SETTINGS,
			pat: saved?.pat ?? "",
			repoName: saved?.repoName ?? "",
			blogRepoName: saved?.blogRepoName ?? "",
			pendingArticleRepo: saved?.pendingArticleRepo ?? "",
			pendingBlogRepo: saved?.pendingBlogRepo ?? "",
			vercelToken: saved?.vercelToken ?? "",
			vercelOrgId: saved?.vercelOrgId ?? "",
			vercelProjectId: saved?.vercelProjectId ?? "",
			githubConnection: saved?.githubConnection ?? null,
			initialization: saved?.initialization ?? null,
			lastDeploy: saved?.lastDeploy ?? null,
			lastGitSyncAt: saved?.lastGitSyncAt ?? null,
		};
	}

	async updateSettings(changes: Partial<PluginSettings>): Promise<void> {
		let merged = { ...this.settings, ...changes };

		// A different PAT invalidates the persisted connection, initialization
		// and deployment record: repository secrets still hold the old token.
		if (
			changes.pat !== undefined
			&& changes.pat.trim() !== this.settings.pat.trim()
		) {
			this.blog.invalidatePat();
			merged = {
				...merged,
				githubConnection: null,
				initialization: null,
				lastDeploy: null,
			};
		}

		this.settings = merged;
		await this.saveData(this.settings);
	}

	private async createArticle(input: NewArticleInput): Promise<void> {
		const safeTitle = input.title.trim();
		const safeName = sanitizePathSegment(safeTitle);
		if (!safeName) {
			throw new Error("无法从标题生成文件名。");
		}

		const folder = (input.directory ?? "")
			.split("/")
			.map(sanitizePathSegment)
			.filter((segment) => segment && segment !== "." && segment !== "..")
			.join("/");
		const path = folder ? `${folder}/${safeName}.md` : `${safeName}.md`;
		if (this.app.vault.getFileByPath(path)) {
			throw new Error(`文件已存在：${path}`);
		}

		// JSON 字符串是合法的 YAML double-quoted scalar，标题中的冒号、
		// 引号和井号不会破坏 frontmatter。
		const lines = [
			"---",
			`title: ${JSON.stringify(safeTitle)}`,
			`date: ${new Date().toISOString().slice(0, 10)}`,
			"layout: doc",
		];
		const author = input.author?.trim();
		if (author) lines.push(`author: ${JSON.stringify(author)}`);
		const cover = input.cover?.trim();
		if (cover) lines.push(`cover: ${JSON.stringify(cover)}`);
		if (input.tags?.length) {
			lines.push("tags:");
			for (const tag of input.tags) {
				lines.push(`  - ${JSON.stringify(tag)}`);
			}
		}
		const description = input.description?.trim();
		if (description) lines.push(`description: ${JSON.stringify(description)}`);
		lines.push("---", "", `# ${safeTitle}`, "");

		if (folder) {
			await this.app.vault.createFolder(folder).catch(() => undefined);
		}
		const file = await this.app.vault.create(path, lines.join("\n"));
		this.app.workspace.getLeaf(false).openFile(file as TFile);
	}

	private async runWithFeedback(name: string, action: () => Promise<unknown>): Promise<void> {
		try {
			await action();
		} catch (error) {
			new Notice(`${name}失败：${error instanceof Error ? error.message : String(error)}`);
		}
	}
}

function sanitizePathSegment(value: string): string {
	return value
		.trim()
		.replace(/[\\/:*?"<>|#^[\]]/g, "-")
		.replace(/\s+/g, "-")
		.replace(/^-+|-+$/g, "");
}
