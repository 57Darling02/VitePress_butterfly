import { App, Modal, Notice, Setting, setIcon } from "obsidian";

import type { BlogService } from "../services/blog";
import type { DeploymentMonitor, DeploymentSnapshot } from "../services/deployment";
import type { InitializationRecord, PluginSettings } from "../settings";

export type StatusModalMode = "connect" | "initialize" | "deployment" | "vercel";

export interface StatusModalDeps {
	app: App;
	getSettings(): PluginSettings;
	saveSettings(changes: Partial<PluginSettings>): Promise<void>;
	blog: BlogService;
	monitor: DeploymentMonitor;
	/** Called after any persisted change so the console can re-render. */
	onChanged(): void;
}

type InitPhase = "form" | "confirm" | "running" | "done";

const INIT_STEPS = [
	"文章仓库：创建或连接，写入 BLOG_REPO 与 PAT",
	"博客仓库：从模板创建或仅更新变量",
	"GitHub Pages：切换为 GitHub Actions 构建",
	"触发首次构建",
] as const;

function errorText(error: unknown): string {
	return error instanceof Error && error.message ? error.message : String(error);
}

/**
 * One continuous modal hosts every setup flow the console needs. It replaces
 * the old standalone settings page: connect → initialize → deployment detail
 * are all states of the same modal, and the initialization wizard persists
 * each finished step so an interrupted run can resume where it stopped.
 */
export class StatusModal extends Modal {
	private mode: StatusModalMode;
	private initPhase: InitPhase = "form";
	private busy = false;
	private error: string | null = null;

	private articleInputValue = "";
	private blogInputValue = "";
	private articleOverwrite = false;
	private articleSync: "secrets" | "overwrite" | "remote" = "secrets";
	private articleExists: boolean | null = null;
	private blogExists: boolean | null = null;
	private localGitHasHistory = true;
	private initRecord: InitializationRecord | null = null;
	private stepIndex = 0;

	constructor(private readonly deps: StatusModalDeps, mode: StatusModalMode) {
		super(deps.app);
		this.mode = mode;
	}

	onOpen(): void {
		this.render();
	}

	// ------------------------------------------------------------------
	// Entry point
	// ------------------------------------------------------------------

	private render(): void {
		this.contentEl.empty();
		this.contentEl.addClass("vpb-modal");
		switch (this.mode) {
			case "connect":
				this.renderConnect();
				break;
			case "initialize":
				this.renderInitialize();
				break;
			case "deployment":
				this.renderDeployment();
				break;
			case "vercel":
				this.renderVercel();
				break;
		}
	}

	// ------------------------------------------------------------------
	// Connect GitHub
	// ------------------------------------------------------------------

	private renderConnect(): void {
		this.contentEl.createEl("h3", { text: "连接 GitHub" });
		this.contentEl.createEl("p", {
			cls: "vpb-modal-hint",
			text: "使用具有 repo + workflow 权限的 Tokens (classic)。PAT 只保存在本机设置和 GitHub 加密 secrets 中。",
		});

		let patInput: HTMLInputElement | undefined;
		new Setting(this.contentEl)
			.setName("GitHub PAT")
			.addText((text) => {
				patInput = text.inputEl;
				text.inputEl.type = "password";
				text.inputEl.autocomplete = "off";
				text.inputEl.spellcheck = false;
				text.setPlaceholder("ghp_...");
				text.setValue(this.deps.getSettings().pat);
			});

		this.renderError();
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		footer.createEl("button", { text: "取消", type: "button" })
			.addEventListener("click", () => this.close());
		const connect = footer.createEl("button", { text: "检测并连接", cls: "mod-cta" });
		connect.addEventListener("click", () => {
			void this.runConnect(patInput?.value ?? "");
		});
	}

	private async runConnect(pat: string): Promise<void> {
		if (this.busy) return;
		if (!pat.trim()) {
			this.setError("请输入 GitHub PAT。");
			return;
		}
		this.setBusy(true);
		try {
			await this.deps.saveSettings({ pat: pat.trim() });
			const result = await this.deps.blog.checkPat();
			this.clearError();

			// Auto-fill suggested repository names so the user never has to
			// type them; existing values are kept.
			const changes: Partial<PluginSettings> = {};
			const settings = this.deps.getSettings();
			if (!settings.repoName.trim()) {
				changes.repoName = result.suggestedArticleRepoName;
			}
			if (!settings.blogRepoName.trim()) {
				changes.blogRepoName = result.suggestedBlogRepoName;
			}
			if (Object.keys(changes).length > 0) {
				await this.deps.saveSettings(changes);
			}

			this.deps.onChanged();
			if (this.deps.blog.isInitialized()) {
				this.close();
				return;
			}
			this.mode = "initialize";
			this.initPhase = "form";
			this.render();
		} catch (error) {
			this.setError(errorText(error));
		} finally {
			this.setBusy(false);
		}
	}

	// ------------------------------------------------------------------
	// Initialize wizard
	// ------------------------------------------------------------------

	private renderInitialize(): void {
		if (!this.deps.getSettings().githubConnection) {
			this.mode = "connect";
			this.render();
			return;
		}
		switch (this.initPhase) {
			case "form":
				this.renderInitForm();
				break;
			case "confirm":
				this.renderInitConfirm();
				break;
			case "running":
				this.renderInitRunning();
				break;
			case "done":
				this.renderInitDone();
				break;
		}
	}

	private renderInitForm(): void {
		this.contentEl.createEl("h3", { text: "初始化博客" });
		this.contentEl.createEl("p", {
			cls: "vpb-modal-hint",
			text: "填写仓库名后开始检测。检测只读、可随时重试，不会修改任何仓库。",
		});

		const settings = this.deps.getSettings();
		this.articleInputValue = settings.repoName;
		this.blogInputValue = settings.blogRepoName;

		new Setting(this.contentEl)
			.setName("文章仓库")
			.setDesc("保存文章和站点配置的私密仓库。")
			.addText((text) => {
				text.setPlaceholder("my-blog-wiki");
				text.setValue(this.articleInputValue);
				text.onChange((value) => {
					this.articleInputValue = value.trim();
				});
			});
		new Setting(this.contentEl)
			.setName("博客仓库")
			.setDesc("公开的博客主题仓库；不存在时从官方模板创建。")
			.addText((text) => {
				text.setPlaceholder("yourname.github.io");
				text.setValue(this.blogInputValue);
				text.onChange((value) => {
					this.blogInputValue = value.trim();
				});
			});

		this.renderError();
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		footer.createEl("button", { text: "取消", type: "button" })
			.addEventListener("click", () => this.close());
		const check = footer.createEl("button", { text: "开始检测", cls: "mod-cta" });
		check.addEventListener("click", () => {
			void this.runDetect();
		});
	}

	private async runDetect(): Promise<void> {
		if (this.busy) return;
		if (!this.articleInputValue || !this.blogInputValue) {
			this.setError("请先填写文章仓库名和博客仓库名。");
			return;
		}

		this.setBusy(true);
		try {
			await this.deps.saveSettings({
				repoName: this.articleInputValue,
				blogRepoName: this.blogInputValue,
			});
			const [article, blog, local] = await Promise.all([
				this.deps.blog.checkArticleRepository(),
				this.deps.blog.checkBlogRepository(),
				this.deps.blog.checkLocalArticleGit(),
			]);
			this.articleExists = article.exists;
			this.blogExists = blog.exists;
			this.localGitHasHistory = local.hasHistory;
			this.articleSync = "secrets";
			this.clearError();
			this.initPhase = "confirm";
			this.render();
		} catch (error) {
			this.setError(errorText(error));
		} finally {
			this.setBusy(false);
		}
	}

	private renderInitConfirm(): void {
		this.contentEl.createEl("h3", { text: "确认初始化方案" });
		const settings = this.deps.getSettings();

		const plan = this.contentEl.createDiv({ cls: "vpb-plan" });
		plan.createEl("strong", { text: "文章仓库" });
		plan.createEl("div", {
			text: this.articleExists
				? `已存在 ${settings.repoName}：本地 Git 历史${this.localGitHasHistory ? "正常，只更新连接配置，不修改内容。" : "为空（ZIP 解压场景），需要先确定同步方向。"}`
				: `不存在：将创建私密仓库 ${settings.repoName}，并上传当前 Vault 内容。`,
			cls: "vpb-plan-item",
		});
		if (this.articleExists && this.localGitHasHistory) {
			const label = plan.createEl("label", { cls: "vpb-check-row" });
			label.createEl("input", { attr: { type: "checkbox" } })
				.addEventListener("change", (event) => {
					this.articleOverwrite = (event.target as HTMLInputElement).checked;
					this.articleSync = this.articleOverwrite ? "overwrite" : "secrets";
				});
			label.createEl("span", { text: "使用当前 Vault 内容覆盖 main（危险操作，会替换远端全部内容）" });
		} else if (this.articleExists && !this.localGitHasHistory) {
			const group = plan.createDiv({ cls: "vpb-radio-group" });
			group.createEl("div", { text: "选择同步方向：", cls: "vpb-plan-item" });
			const choices: { value: "remote" | "overwrite"; label: string }[] = [
				{ value: "remote", label: "从远端同步到本地（推荐）：下载远端内容，本地同名文件会被替换，本地独有的文件保留" },
				{ value: "overwrite", label: "以本地内容覆盖远端：本地为准，会替换远端 main 全部内容" },
			];
			for (const choice of choices) {
				const row = group.createEl("label", { cls: "vpb-check-row" });
				const input = row.createEl("input", { attr: { type: "radio", name: "vpb-article-sync" } });
				if (choice.value === "remote") input.checked = true;
				input.addEventListener("change", () => {
					this.articleSync = choice.value;
				});
				row.createEl("span", { text: choice.label });
			}
			this.articleSync = "remote";
		}

		plan.createEl("strong", { text: "博客仓库" });
		plan.createEl("div", {
			text: this.blogExists
				? `已存在 ${settings.blogRepoName}：只更新 WIKI_URL 与 PAT，不修改主题。`
				: `不存在：将从官方模板创建公开仓库 ${settings.blogRepoName}，并配置 Pages 与首次构建。`,
			cls: "vpb-plan-item",
		});

		this.renderError();
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		const back = footer.createEl("button", { text: "返回修改", type: "button" });
		back.addEventListener("click", () => {
			this.initPhase = "form";
			this.render();
		});
		footer.createEl("button", { text: "取消", type: "button" })
			.addEventListener("click", () => this.close());
		const start = footer.createEl("button", { text: "开始初始化", cls: "mod-cta" });
		start.addEventListener("click", () => {
			void this.startInitialization();
		});
	}

	private async startInitialization(): Promise<void> {
		if (this.busy) return;
		const settings = this.deps.getSettings();
		const record: InitializationRecord = {
			articleRepo: settings.repoName.trim(),
			blogRepo: settings.blogRepoName.trim(),
			articleReady: false,
			blogReady: false,
			pagesReady: false,
			updatedAt: Date.now(),
		};
		this.initRecord = record;
		await this.deps.saveSettings({ initialization: record });
		this.deps.onChanged();
		this.initPhase = "running";
		this.stepIndex = 0;
		this.render();
		void this.runAllSteps();
	}

	private renderInitRunning(): void {
		this.contentEl.createEl("h3", { text: "正在初始化" });
		const list = this.contentEl.createDiv({ cls: "vpb-steps" });
		INIT_STEPS.forEach((label, index) => {
			const item = list.createDiv({ cls: "vpb-step" });
			const done = index < this.stepIndex;
			const current = index === this.stepIndex;
			if (done) {
				item.addClass("is-done");
				setIcon(item.createSpan({ cls: "vpb-step-icon" }), "check");
			} else if (current) {
				item.addClass("is-current");
				setIcon(item.createSpan({ cls: "vpb-step-icon" }), "loader-2");
			} else {
				setIcon(item.createSpan({ cls: "vpb-step-icon" }), "circle");
			}
			item.createEl("span", { text: label });
		});
		this.renderError();
		if (this.error) {
			const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
			footer.createEl("button", { text: "取消", type: "button" })
				.addEventListener("click", () => this.close());
			const retry = footer.createEl("button", { text: "重试（从失败步骤继续）", cls: "mod-cta" });
			retry.addEventListener("click", () => {
				this.clearError();
				this.render();
				void this.runAllSteps();
			});
		}
	}

	private async runAllSteps(): Promise<void> {
		if (this.busy) return;
		this.setBusy(true);
		const record = this.initRecord;
		if (!record) {
			this.setBusy(false);
			return;
		}

		try {
			for (let index = 0; index < INIT_STEPS.length; index += 1) {
				if (this.stepIndex !== index) {
					continue;
				}
				const ok = await this.runStep(index, record);
				if (!ok) {
					return;
				}
				this.stepIndex = index + 1;
				this.render();
			}
			record.completedAt = Date.now();
			record.updatedAt = Date.now();
			record.lastError = undefined;
			await this.deps.saveSettings({ initialization: record });
			this.initPhase = "done";
			this.render();
			this.deps.onChanged();
		} finally {
			this.setBusy(false);
		}
	}

	/**
	 * Executes one wizard step and persists its completion immediately, so a
	 * crash or network failure never requires redoing finished work.
	 */
	private async runStep(index: number, record: InitializationRecord): Promise<boolean> {
		try {
			switch (index) {
				case 0:
					if (!record.articleReady) {
						// Fresh vaults lack the template files; create them before
						// the local commit so they are uploaded with the vault.
						await this.deps.blog.ensureTemplateFiles();
						const check = await this.deps.blog.checkArticleRepository();
						if (check.exists) {
							if (this.articleSync === "overwrite") {
								await this.deps.blog.configureArticleRepository();
							} else if (this.articleSync === "remote") {
								await this.deps.blog.syncArticleFromRemote();
							} else {
								await this.deps.blog.configureArticleSecretsOnly();
							}
						} else {
							await this.deps.blog.createArticleRepository();
						}
						record.articleReady = true;
					}
					break;
				case 1:
					if (!record.blogReady) {
						const check = await this.deps.blog.checkBlogRepository();
						if (check.exists) {
							await this.deps.blog.configureBlogSecretsOnly();
						} else {
							await this.deps.blog.createBlogRepository();
						}
						record.blogReady = true;
					}
					break;
				case 2:
					if (!record.pagesReady) {
						await this.deps.blog.ensurePagesConfigured();
						record.pagesReady = true;
					}
					break;
				case 3:
					if (!record.deploymentTriggeredAt) {
						const triggeredAt = await this.deps.blog.triggerDeploy();
						record.deploymentTriggeredAt = triggeredAt;
						await this.deps.monitor.recordTrigger("首次部署", triggeredAt);
					}
					break;
			}
			record.updatedAt = Date.now();
			record.lastError = undefined;
			await this.deps.saveSettings({ initialization: record });
			this.deps.onChanged();
			return true;
		} catch (error) {
			record.updatedAt = Date.now();
			record.lastError = errorText(error);
			await this.deps.saveSettings({ initialization: record });
			this.setError(errorText(error));
			this.deps.onChanged();
			this.render();
			return false;
		}
	}

	private renderInitDone(): void {
		this.contentEl.createEl("h3", { text: "初始化完成" });
		this.contentEl.createEl("p", {
			cls: "vpb-modal-hint",
			text: "博客已就绪。之后写文章后点击控制台的「提交并推送」，站点会自动重新构建。",
		});
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		const done = footer.createEl("button", { text: "完成", cls: "mod-cta" });
		done.addEventListener("click", () => this.close());
	}

	// ------------------------------------------------------------------
	// Deployment detail
	// ------------------------------------------------------------------

	private renderDeployment(): void {
		this.contentEl.createEl("h3", { text: "部署详情" });
		const snapshot = this.deps.monitor.getSnapshot();
		this.renderSnapshot(snapshot);
		this.renderError();

		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		const refresh = footer.createEl("button", { text: "刷新状态" });
		refresh.addEventListener("click", () => {
			void this.refreshDeployment();
		});
		if (snapshot.runUrl) {
			const view = footer.createEl("button", { text: "在 GitHub 查看" });
			view.addEventListener("click", () => {
				window.open(snapshot.runUrl, "_blank");
			});
		}
		const rebuild = footer.createEl("button", {
			text: snapshot.phase === "failure" ? "重试构建" : "重新构建",
			// Only failures deserve the prominent CTA; otherwise a plain button
			// avoids accidental rebuilds.
			cls: snapshot.phase === "failure" ? "mod-cta" : "",
		});
		rebuild.addEventListener("click", () => {
			void this.rebuild();
		});
		footer.createEl("button", { text: "关闭", type: "button" })
			.addEventListener("click", () => this.close());
	}

	private renderSnapshot(snapshot: DeploymentSnapshot): void {
		const box = this.contentEl.createDiv({ cls: "vpb-deploy-detail" });
		box.createEl("strong", { text: snapshot.title });
		box.createEl("div", { text: snapshot.detail, cls: "vpb-muted" });
		if (snapshot.updatedAt) {
			box.createEl("div", {
				text: `更新于 ${new Date(snapshot.updatedAt).toLocaleString("zh-CN")}`,
				cls: "vpb-muted",
			});
		}
	}

	private async refreshDeployment(): Promise<void> {
		if (this.busy) return;
		this.setBusy(true);
		try {
			await this.deps.monitor.refresh(true);
			this.deps.onChanged();
			this.render();
		} catch (error) {
			this.setError(errorText(error));
		} finally {
			this.setBusy(false);
		}
	}

	private async rebuild(): Promise<void> {
		if (this.busy) return;
		this.setBusy(true);
		try {
			const triggeredAt = await this.deps.blog.triggerDeploy();
			await this.deps.monitor.recordTrigger("手动触发构建", triggeredAt);
			this.clearError();
			this.deps.onChanged();
			this.render();
		} catch (error) {
			this.setError(errorText(error));
		} finally {
			this.setBusy(false);
		}
	}

	// ------------------------------------------------------------------
	// Vercel options
	// ------------------------------------------------------------------

	private renderVercel(): void {
		this.contentEl.createEl("h3", { text: "Vercel 部署选项" });
		this.contentEl.createEl("p", {
			cls: "vpb-modal-hint",
			text: "三项都填写后，下次初始化或重新构建时会写入 VERCEL_* secrets；留空则跳过 Vercel。",
		});

		const fields: { key: "vercelToken" | "vercelOrgId" | "vercelProjectId"; name: string; placeholder: string }[] = [
			{ key: "vercelToken", name: "Vercel Token", placeholder: "vercel_token" },
			{ key: "vercelOrgId", name: "Vercel Org ID", placeholder: "team_xxx" },
			{ key: "vercelProjectId", name: "Vercel Project ID", placeholder: "prj_xxx" },
		];
		for (const field of fields) {
			new Setting(this.contentEl)
				.setName(field.name)
				.addText((text) => {
					text.inputEl.type = "password";
					text.inputEl.autocomplete = "off";
					text.inputEl.spellcheck = false;
					text.setPlaceholder(field.placeholder);
					text.setValue(this.deps.getSettings()[field.key]);
					text.onChange((value) => {
						void this.deps.saveSettings({ [field.key]: value.trim() } as Partial<PluginSettings>)
							.catch((error: unknown) => {
								new Notice(errorText(error));
							});
					});
				});
		}
		this.renderError();
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		const done = footer.createEl("button", { text: "完成", cls: "mod-cta" });
		done.addEventListener("click", () => this.close());
	}

	// ------------------------------------------------------------------
	// Helpers
	// ------------------------------------------------------------------

	private setError(message: string): void {
		this.error = message;
		this.renderError();
	}

	private clearError(): void {
		this.error = null;
	}

	private renderError(): void {
		const existing = this.contentEl.querySelector(".vpb-modal-error");
		existing?.remove();
		if (!this.error) return;
		this.contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
	}

	private setBusy(busy: boolean): void {
		this.busy = busy;
		this.contentEl.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
			// Keep the cancel/close escape hatch available during long runs.
			if (button.textContent === "取消" || button.textContent === "关闭") return;
			button.disabled = busy;
		});
	}
}
