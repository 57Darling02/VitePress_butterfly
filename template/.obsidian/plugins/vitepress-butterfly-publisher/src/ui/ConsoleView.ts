import { ItemView, type App, type WorkspaceLeaf } from "obsidian";

import type { BlogService } from "../services/blog";
import { DeploymentMonitor } from "../services/deployment";
import type { PluginSettings } from "../settings";
import { OverviewSection } from "./OverviewSection";
import type { NewArticleInput } from "./NewArticleModal";

export const CONSOLE_VIEW_TYPE = "vitepress-butterfly-console";

export interface ConsoleDeps {
	app: App;
	blog: BlogService;
	getSettings(): PluginSettings;
	saveSettings(changes: Partial<PluginSettings>): Promise<void>;
	createArticle(input: NewArticleInput): Promise<void>;
}

const DEPLOYMENT_POLL_INTERVAL = 20_000;

/**
 * Single-panel console. It owns the deployment monitor and polling; the
 * status card and modal flows live in OverviewSection / StatusModal.
 */
export class ConsoleView extends ItemView {
	private monitor?: DeploymentMonitor;
	private section?: OverviewSection;
	private pollTimer?: number;

	constructor(
		leaf: WorkspaceLeaf,
		private readonly deps: ConsoleDeps,
	) {
		super(leaf);
	}

	getViewType(): string {
		return CONSOLE_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "VitePress Butterfly";
	}

	getIcon(): string {
		return "rocket";
	}

	async onOpen(): Promise<void> {
		await this.render();
		this.scheduleDeploymentPolling();
	}

	async onClose(): Promise<void> {
		if (this.pollTimer !== undefined) {
			window.clearInterval(this.pollTimer);
			this.pollTimer = undefined;
		}
	}

	// ------------------------------------------------------------------
	// Shell
	// ------------------------------------------------------------------

	private async render(): Promise<void> {
		const container = this.containerEl;
		container.empty();
		container.addClass("vpb-console");

		const header = container.createDiv({ cls: "vpb-console-header" });
		header.createEl("h2", { text: "VitePress Butterfly" });
		header.createEl("p", { text: "写作、配置、发布与部署状态都在这里。", cls: "vpb-muted" });

		const content = container.createDiv({ cls: "vpb-console-content" });
		this.section = new OverviewSection({
			app: this.deps.app,
			blog: this.deps.blog,
			monitor: this.getMonitor(),
			getSettings: this.deps.getSettings,
			saveSettings: this.deps.saveSettings,
			createArticle: this.deps.createArticle,
			onChanged: () => {
				void this.render();
			},
		});
		this.section.render(content);
	}

	// ------------------------------------------------------------------
	// Deployment state
	// ------------------------------------------------------------------

	private getMonitor(): DeploymentMonitor {
		if (!this.monitor) {
			this.monitor = new DeploymentMonitor({
				getSettings: this.deps.getSettings,
				saveSettings: this.deps.saveSettings,
				getBlog: () => this.deps.blog,
			});
		}
		return this.monitor;
	}

	private scheduleDeploymentPolling(): void {
		if (this.pollTimer !== undefined) return;
		this.pollTimer = window.setInterval(() => {
			void this.pollDeployment();
		}, DEPLOYMENT_POLL_INTERVAL);
	}

	private async pollDeployment(): Promise<void> {
		// Local Git status refresh is cheap and runs on the same timer.
		void this.section?.refreshGitStatus();

		const previous = this.getMonitor().getSnapshot().phase;
		const next = await this.getMonitor().refresh();
		if (next.phase !== previous) {
			await this.render();
		}
	}
}
