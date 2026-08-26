import { App, Menu, Modal, Notice, Setting, setIcon } from "obsidian";

import type { GitHubRepositoryRef } from "../services/github";
import type { BlogService } from "../services/blog";
import { authenticatedGitHubUrl } from "../services/blog";
import type { DeploymentMonitor, DeploymentSnapshot } from "../services/deployment";
import type { PluginSettings } from "../settings";
import { NewArticleModal, type NewArticleInput } from "./NewArticleModal";
import { SiteConfigModal } from "./SiteConfigModal";
import { StatusModal, type StatusModalMode } from "./StatusModal";

export interface OverviewSectionDeps {
	app: App;
	blog: BlogService;
	monitor: DeploymentMonitor;
	getSettings(): PluginSettings;
	saveSettings(changes: Partial<PluginSettings>): Promise<void>;
	createArticle(input: NewArticleInput): Promise<void>;
	/** Called after persisted state changed so the console re-renders. */
	onChanged(): void;
}

/**
 * The single console panel. The status card owns all configuration entry
 * points (connect / initialize / deployment detail); writing, Git sync and
 * content stats stay as lightweight sections below it.
 */
export class OverviewSection {
	private gitStatusEl?: HTMLElement;

	constructor(private readonly deps: OverviewSectionDeps) {}

	render(container: HTMLElement): void {
		container.empty();
		this.renderStatus(container);
		this.renderWriting(container);
		if (this.deps.blog.isInitialized()) {
			this.renderGitSync(container);
		}
		this.renderContentOverview(container);
	}

	// ------------------------------------------------------------------
	// Status
	// ------------------------------------------------------------------

	private renderStatus(container: HTMLElement): void {
		const snapshot = this.deps.monitor.getSnapshot();
		// The status hero is itself the top-level card; no nested section.
		const hero = container.createDiv({ cls: `vpb-status-hero is-${snapshot.phase}` });

		const top = hero.createDiv({ cls: "vpb-card-header" });
		const title = top.createDiv({ cls: "vpb-status-title" });
		title.createSpan({ cls: "vpb-status-dot" });
		title.createEl("strong", { text: snapshot.title });
		const actions = top.createDiv({ cls: "vpb-card-actions" });

		this.createRefreshButton(actions, "刷新状态", () => this.refreshConsoleStatus());
		const more = this.createIconButton(actions, "更多操作", "more-horizontal");
		more.addEventListener("click", (event) => {
			this.openMoreMenu(event);
		});

		hero.createEl("div", { text: snapshot.detail, cls: "vpb-status-detail" });
		if (snapshot.updatedAt) {
			hero.createEl("div", {
				text: `更新于 ${new Date(snapshot.updatedAt).toLocaleString("zh-CN", {
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				})}`,
				cls: "vpb-status-time",
			});
		}

		const primary = hero.createEl("button", {
			text: this.primaryActionLabel(snapshot.phase),
			cls: "vpb-status-primary",
		});
		primary.addEventListener("click", () => {
			this.openStatusModal(this.primaryActionMode(snapshot.phase));
		});
	}

	private primaryActionLabel(phase: string): string {
		switch (phase) {
			case "disconnected":
				return "连接 GitHub";
			case "uninitialized":
				return "初始化博客";
			case "initializing":
				return "继续初始化";
			default:
				return "查看部署";
		}
	}

	private primaryActionMode(phase: string): StatusModalMode {
		switch (phase) {
			case "disconnected":
				return "connect";
			case "uninitialized":
			case "initializing":
				return "initialize";
			default:
				return "deployment";
		}
	}

	private async refreshConsoleStatus(): Promise<void> {
		await this.deps.monitor.refresh(true);
		this.deps.onChanged();
	}

	private openStatusModal(mode: StatusModalMode): void {
		new StatusModal(
			{
				app: this.deps.app,
				getSettings: this.deps.getSettings,
				saveSettings: this.deps.saveSettings,
				blog: this.deps.blog,
				monitor: this.deps.monitor,
				onChanged: () => this.deps.onChanged(),
			},
			mode,
		).open();
	}

	private openMoreMenu(event: MouseEvent): void {
		const menu = new Menu();
		menu.addItem((item) => {
			item.setTitle("重新连接 GitHub")
				.setIcon("plug")
				.onClick(() => this.openStatusModal("connect"));
		});
		menu.addItem((item) => {
			item.setTitle("重新初始化博客")
				.setIcon("refresh-cw")
				.onClick(() => this.openStatusModal("initialize"));
		});
		menu.addItem((item) => {
			item.setTitle("Vercel 部署选项")
				.setIcon("cloud")
				.onClick(() => this.openStatusModal("vercel"));
		});
		menu.addItem((item) => {
			item.setTitle("手动触发构建")
				.setIcon("zap")
				.onClick(() => {
					void this.triggerRebuild();
				});
		});
		menu.addItem((item) => {
			item.setTitle("检查更新")
				.setIcon("download")
				.onClick(() => {
					new UpdateModal(this.deps.app, {
						blog: this.deps.blog,
						monitor: this.deps.monitor,
						blogRepo: this.deps.getSettings().blogRepoName.trim(),
						onChanged: () => this.deps.onChanged(),
					}).open();
				});
		});
		const login = this.deps.getSettings().githubConnection?.login;
		if (login) {
			menu.addSeparator();
			const { repoName, blogRepoName } = this.deps.getSettings();
			if (repoName.trim()) {
				menu.addItem((item) => {
					item.setTitle("打开文章仓库")
						.setIcon("book-open")
						.onClick(() => window.open(`https://github.com/${login}/${repoName.trim()}`, "_blank"));
				});
			}
			if (blogRepoName.trim()) {
				menu.addItem((item) => {
					item.setTitle("打开博客仓库")
						.setIcon("globe")
						.onClick(() => window.open(`https://github.com/${login}/${blogRepoName.trim()}`, "_blank"));
				});
			}
		}
		menu.showAtMouseEvent(event);
	}

	private async triggerRebuild(): Promise<void> {
		try {
			const triggeredAt = await this.deps.blog.triggerDeploy();
			await this.deps.monitor.recordTrigger("手动触发构建", triggeredAt);
			new Notice("已触发博客重新构建。", 4_000);
			this.deps.onChanged();
			void this.deps.monitor.refresh();
		} catch (error) {
			new Notice(`触发构建失败：${error instanceof Error ? error.message : String(error)}`, 8_000);
		}
	}

	// ------------------------------------------------------------------
	// Writing
	// ------------------------------------------------------------------

	private renderWriting(container: HTMLElement): void {
		const section = container.createDiv({ cls: "vpb-section" });
		section.createEl("h3", { text: "写作" });
		const buttons = section.createDiv({ cls: "vpb-button-row" });

		this.actionButton(buttons, "新建文章", async () => {
			new NewArticleModal(this.deps.app, async (input) => {
				await this.deps.createArticle(input);
			}).open();
		});

		this.actionButton(buttons, "配置站点", async () => {
			new SiteConfigModal(this.deps.app, () => this.deps.onChanged()).open();
		});
	}

	// ------------------------------------------------------------------
	// Git sync
	// ------------------------------------------------------------------

	private renderGitSync(container: HTMLElement): void {
		const section = container.createDiv({ cls: "vpb-section" });
		const header = section.createDiv({ cls: "vpb-card-header" });
		header.createEl("h3", { text: "Git 同步" });
		const actions = header.createDiv({ cls: "vpb-card-actions" });
		this.createRefreshButton(actions, "刷新 Git 状态", () => this.refreshGitStatus());

		this.gitStatusEl = section.createDiv({ cls: "vpb-git-status" });
		this.gitStatusEl.setText("正在读取 Git 状态…");

		const buttons = section.createDiv({ cls: "vpb-button-row" });
		this.actionButton(buttons, "拉取", async () => {
			const git = await this.readyGit();
			await git.pull();
			await this.deps.saveSettings({ lastGitSyncAt: Date.now() });
			await this.refreshGitStatus();
		});
		this.actionButton(buttons, "提交并推送", async () => {
			const git = await this.readyGit();
			const status = await git.status();
			if (status.all.length === 0) {
				throw new Error("没有需要提交的内容。");
			}

			const modal = new CommitMessageModal(this.deps.app);
			modal.open();
			const message = await modal.waitForClose();
			if (message === null) {
				return; // Cancelled: do not commit.
			}

			await git.commitAll(message);
			await git.pushCurrent();
			await this.deps.saveSettings({ lastGitSyncAt: Date.now() });
			await this.deps.monitor.recordTrigger(`提交：${message}`);
			await this.refreshGitStatus();
			this.deps.onChanged();
			void this.deps.monitor.refresh();
		});

		void this.refreshGitStatus();
	}

	private async readyGit() {
		const git = this.deps.blog.getGitEngine();
		if (!git) {
			throw new Error("未检测到 obsidian-git，请先在第三方插件中启用 Git 插件。");
		}

		const settings = this.deps.getSettings();
		const login = settings.githubConnection?.login ?? "";
		const pat = settings.pat.trim();
		const repoName = settings.repoName.trim();
		if (!login || !pat) {
			throw new Error("请先在顶部状态卡中连接 GitHub，再使用 Git 同步。");
		}
		if (!repoName) {
			throw new Error("请先完成初始化，再使用 Git 同步。");
		}

		// Bind the PAT to every Git operation before touching the engine:
		// - localStorage credentials feed isomorphic-git's onAuth on mobile and
		//   obsidian-git's askpass handler on desktop;
		// - the authenticated origin URL wins over the system credential
		//   helper on desktop, so Git Credential Manager never pops up.
		git.setCredentials(login, pat);
		await git.ensureReady();
		const repository: GitHubRepositoryRef = { owner: login, name: repoName };
		await git.setRemote("origin", authenticatedGitHubUrl(repository, pat));
		return git;
	}

	/**
	 * Refreshes the local Git status banner. Called on render, on demand, and
	 * periodically by the console poll timer. All operations are local.
	 */
	async refreshGitStatus(): Promise<void> {
		const el = this.gitStatusEl;
		if (!el) return;
		const git = this.deps.blog.getGitEngine();
		if (!git) {
			el.setText("Git 引擎未就绪：请启用 obsidian-git 插件。");
			return;
		}

		try {
			await git.ensureReady();
			const [status, branch, unpushed] = await Promise.all([
				git.status(),
				git.branchInfo(),
				git.getUnpushedCommits().catch(() => 0),
			]);
			el.empty();

			// Prominent banner mirroring the status hero: conflict > changes >
			// unpushed commits > clean.
			const banner = el.createDiv({ cls: "vpb-git-banner" });
			banner.createSpan({ cls: "vpb-status-dot" });
			if (status.conflicted.length > 0) {
				banner.addClass("is-conflict");
				banner.createSpan({ text: `存在 ${status.conflicted.length} 项冲突，请先解决再提交` });
			} else if (status.changed.length > 0) {
				banner.addClass("is-changes");
				banner.createSpan({ text: `有 ${status.changed.length} 项改动待提交` });
			} else if (unpushed > 0) {
				banner.addClass("is-unpushed");
				banner.createSpan({ text: `有 ${unpushed} 个提交待推送` });
			} else {
				banner.addClass("is-clean");
				banner.createSpan({ text: "已同步，工作区干净" });
			}

			const syncAt = this.deps.getSettings().lastGitSyncAt;
			const syncText = syncAt
				? ` · 上次同步 ${new Date(syncAt).toLocaleString("zh-CN", {
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				})}`
				: "";
			el.createEl("div", {
				text: `分支：${branch.current || "未知"} · 后端：${git.backend}${syncText}`,
				cls: "vpb-muted",
			});
		} catch (error) {
			el.setText(`Git 状态读取失败：${error instanceof Error ? error.message : String(error)}`);
		}
	}

	// ------------------------------------------------------------------
	// Content overview
	// ------------------------------------------------------------------

	private renderContentOverview(container: HTMLElement): void {
		const section = container.createDiv({ cls: "vpb-section" });
		section.createEl("h3", { text: "内容概览" });

		const files = this.deps.app.vault.getMarkdownFiles();
		const tags = new Set<string>();
		let articleCount = 0;

		for (const file of files) {
			const frontmatter = this.deps.app.metadataCache.getFileCache(file)?.frontmatter;
			if (frontmatter?.layout === "doc") articleCount += 1;
			if (Array.isArray(frontmatter?.tags)) {
				for (const tag of frontmatter.tags) {
					if (typeof tag === "string") tags.add(tag);
				}
			} else if (typeof frontmatter?.tags === "string") {
				frontmatter.tags.split(/[,\s]+/).filter(Boolean).forEach((tag: string) => tags.add(tag));
			}
		}

		const grid = section.createDiv({ cls: "vpb-stat-grid" });
		this.stat(grid, `${files.length}`, "Markdown 文件");
		this.stat(grid, `${articleCount}`, "已发布文章");
		this.stat(grid, `${tags.size}`, "标签");
	}

	// ------------------------------------------------------------------
	// Helpers
	// ------------------------------------------------------------------

	private stat(container: HTMLElement, value: string, label: string): void {
		const item = container.createDiv({ cls: "vpb-stat" });
		item.createEl("strong", { text: value });
		item.createEl("span", { text: label });
	}

	private createIconButton(
		container: HTMLElement,
		label: string,
		icon: string,
	): HTMLButtonElement {
		const button = container.createEl("button", {
			cls: "vpb-icon-button",
			attr: { "aria-label": label },
		});
		setIcon(button, icon);
		return button;
	}

	private createRefreshButton(
		container: HTMLElement,
		label: string,
		action: () => Promise<void>,
	): void {
		const button = this.createIconButton(container, label, "refresh-cw");
		button.addEventListener("click", () => {
			void this.runRefresh(button, label, action);
		});
	}

	private async runRefresh(
		button: HTMLButtonElement,
		label: string,
		action: () => Promise<void>,
	): Promise<void> {
		if (button.disabled) return;

		button.disabled = true;
		button.setAttribute("aria-busy", "true");
		button.classList.add("is-pending");
		setIcon(button, "loader-2");
		try {
			await action();
		} catch (error) {
			new Notice(`${label}失败：${error instanceof Error ? error.message : String(error)}`);
		} finally {
			button.disabled = false;
			button.removeAttribute("aria-busy");
			button.classList.remove("is-pending");
			setIcon(button, "refresh-cw");
		}
	}

	private actionButton(container: HTMLElement, label: string, action: () => Promise<void>): void {
		const button = container.createEl("button", { text: label, cls: "mod-cta" });
		button.addEventListener("click", () => {
			void this.run(button, action);
		});
	}

	private async run(button: HTMLButtonElement, action: () => Promise<void>): Promise<void> {
		if (button.disabled) return;

		const label = button.textContent ?? "";
		this.setButtonPending(button, true);
		try {
			await action();
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			new Notice(`VitePress Butterfly：${message}`, 8_000);
		} finally {
			button.textContent = label;
			this.setButtonPending(button, false);
		}
	}

	/**
	 * Uniform pending indicator: a spinning loader icon prepended to the
	 * label, keeping the button width stable. No "…" text mutations.
	 */
	private setButtonPending(button: HTMLButtonElement, pending: boolean): void {
		button.disabled = pending;
		button.classList.toggle("is-pending", pending);
		const existing = button.querySelector(".vpb-btn-loader");
		if (pending && !existing) {
			const loader = button.createSpan({ cls: "vpb-btn-loader" });
			button.insertBefore(loader, button.firstChild);
			setIcon(loader, "loader-2");
		} else if (!pending && existing) {
			existing.remove();
		}
	}
}

/**
 * Unified update panel: checks plugin and blog theme updates in parallel,
 * then offers per-item update actions.
 */
class UpdateModal extends Modal {
	private checking = true;
	private plugin: { latest: boolean; current: string; latestVersion: string } | null = null;
	private error: string | null = null;
	private updating: "plugin" | "theme" | null = null;

	constructor(
		app: App,
		private readonly deps: {
			blog: BlogService;
			monitor: DeploymentMonitor;
			blogRepo: string;
			onChanged(): void;
		},
	) {
		super(app);
	}

	onOpen(): void {
		this.render();
		void this.check();
	}

	onClose(): void {
		this.contentEl.empty();
	}

	private async check(): Promise<void> {
		this.checking = true;
		this.error = null;
		this.render();
		try {
			this.plugin = await this.deps.blog.checkPluginUpdate();
		} catch (error) {
			this.error = error instanceof Error ? error.message : String(error);
		} finally {
			this.checking = false;
			this.render();
		}
	}

	private render(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h3", { text: "检查更新" });

		if (this.checking) {
			const loading = contentEl.createDiv({ cls: "vpb-config-loading" });
			const icon = loading.createSpan();
			setIcon(icon, "loader-2");
			loading.createSpan({ text: "正在检查插件与主题更新…" });
			return;
		}

		if (this.error) {
			contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
			const footer = contentEl.createDiv({ cls: "modal-button-container" });
			footer.createEl("button", { text: "重试" })
				.addEventListener("click", () => {
					void this.check();
				});
			footer.createEl("button", { text: "关闭" })
				.addEventListener("click", () => this.close());
			return;
		}

		// Plugin section
		const pluginSection = contentEl.createDiv({ cls: "vpb-update-item" });
		pluginSection.createEl("strong", { text: "插件" });
		if (this.plugin?.latest) {
			pluginSection.createEl("div", { text: `已是最新版本（v${this.plugin.current}）。`, cls: "vpb-update-ok" });
		} else {
			pluginSection.createEl("div", {
				text: `检测到新版本：v${this.plugin?.current ?? "?"} → v${this.plugin?.latestVersion ?? "?"}（从模板仓库下载，本机设置不受影响）。`,
				cls: "vpb-modal-hint",
			});
			const update = pluginSection.createEl("button", { text: "更新插件", cls: "mod-cta" });
			update.addEventListener("click", () => {
				void this.doUpdatePlugin(update);
			});
		}

		// Theme section: the simplest reliable update is deleting the blog
		// repository and recreating it from the theme template.
		const themeSection = contentEl.createDiv({ cls: "vpb-update-item" });
		themeSection.createEl("strong", { text: "博客主题" });
		themeSection.createEl("div", {
			text: `将把博客仓库 ${this.deps.blogRepo} 钉定到最新主题版本：更新 .github/workflows/deploy.yml 中的主题 commit（博客仓库的唯一文件），推送后自动触发构建。无需删除或重建仓库。`,
			cls: "vpb-modal-hint",
		});
		const update = themeSection.createEl("button", { text: "更新主题（重建博客）", cls: "mod-cta" });
		update.addEventListener("click", () => {
			void this.doUpdateTheme(update);
		});

		const footer = contentEl.createDiv({ cls: "modal-button-container" });
		footer.createEl("button", { text: "关闭", cls: "mod-cta" })
			.addEventListener("click", () => this.close());
	}

	private async doUpdatePlugin(button: HTMLButtonElement): Promise<void> {
		if (this.updating) return;
		this.updating = "plugin";
		this.setPending(button);
		try {
			await this.deps.blog.updatePlugin();
			new Notice("插件已更新，请重载插件（设置 → 第三方插件 → 关闭再启用）生效。", 8_000);
			this.close();
		} catch (error) {
			this.error = error instanceof Error ? error.message : String(error);
			this.render();
		} finally {
			this.updating = null;
		}
	}

	private async doUpdateTheme(button: HTMLButtonElement): Promise<void> {
		if (this.updating) return;
		this.updating = "theme";
		this.setPending(button);
		try {
			const result = await this.deps.blog.updateTheme();
			await this.deps.monitor.recordTrigger(`更新主题（${result.themeSha.slice(0, 7)}）`);
			this.deps.onChanged();
			new Notice("博客仓库已重建，正在构建最新主题。", 6_000);
			this.close();
		} catch (error) {
			this.error = error instanceof Error ? error.message : String(error);
			this.render();
		} finally {
			this.updating = null;
		}
	}

	private setPending(button: HTMLButtonElement): void {
		button.disabled = true;
		button.classList.add("is-pending");
		const loader = button.createSpan({ cls: "vpb-btn-loader" });
		button.insertBefore(loader, button.firstChild);
		setIcon(loader, "loader-2");
	}
}


/**
 * Commit message dialog that resolves to `null` when cancelled, so closing
 * the dialog never silently publishes a commit.
 */
class CommitMessageModal extends Modal {
	private message = "";
	private resolve: ((message: string | null) => void) | null = null;

	waitForClose(): Promise<string | null> {
		return new Promise((resolve) => {
			this.resolve = resolve;
		});
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h3", { text: "提交并发布" });

		new Setting(contentEl)
			.setName("提交说明")
			.setDesc("这段文字会作为 Git commit message；留空使用默认值。")
			.addText((text) => {
				text.setPlaceholder("Update blog content");
				text.inputEl.addEventListener("input", () => {
					this.message = text.getValue();
				});
				window.setTimeout(() => text.inputEl.focus(), 0);
			});

		const footer = contentEl.createDiv({ cls: "modal-button-container" });
		footer.createEl("button", { text: "取消" })
			.addEventListener("click", () => {
				this.settle(null);
				this.close();
			});
		footer.createEl("button", { text: "提交并推送", cls: "mod-cta" })
			.addEventListener("click", () => {
				this.settle(this.message.trim() || "Update blog content");
				this.close();
			});
	}

	onClose(): void {
		this.settle(null);
		this.contentEl.empty();
	}

	private settle(message: string | null): void {
		this.resolve?.(message);
		this.resolve = null;
	}
}
