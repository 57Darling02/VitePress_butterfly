import type { App } from "obsidian";

/**
 * Minimal, stable surface over the Git engine we delegate to.
 *
 * The default implementation wraps obsidian-git so the console and
 * repository orchestration never touch obsidian-git internals directly.
 * If we later bundle our own engine, only this file needs a new class.
 */

export interface VaultGitStatus {
	readonly all: readonly unknown[];
	readonly changed: readonly unknown[];
	readonly staged: readonly unknown[];
	readonly conflicted: readonly unknown[];
}

export interface VaultGitBranch {
	readonly current?: string;
	readonly tracking?: string;
	readonly branches: readonly string[];
	readonly remote?: string;
}

interface ObsidianGitManager {
	init(): Promise<void>;
	status(): Promise<VaultGitStatus>;
	commitAll(options: { message: string }): Promise<unknown>;
	pull(): Promise<unknown>;
	push(): Promise<unknown>;
	getUnpushedCommits(): Promise<number>;
	fetch(remote?: string): Promise<unknown>;
	checkout(branch: string, remote?: string): Promise<unknown>;
	setRemote(remote: string, url: string): Promise<void>;
	setConfig(path: string, value: string): Promise<unknown>;
	branchInfo(): Promise<VaultGitBranch>;
	createBranch(name: string): Promise<unknown>;
	updateUpstreamBranch(tracking: string): Promise<unknown>;
	resolveRef?(ref: string): Promise<string>;
	/** simple-git instance exposed by obsidian-git on desktop. */
	git?: {
		revparse(options: string[]): Promise<string>;
		push(remote: string, refspec: string): Promise<unknown>;
	};
}

interface ObsidianGitPlugin {
	gitManager?: ObsidianGitManager;
	localStorage?: {
		setUsername(value: string): unknown;
		setPassword(value: string): unknown;
	};
	init(options?: { fromReload?: boolean }): Promise<void>;
	unloadPlugin?(): void;
}

interface AppWithPluginRegistry extends App {
	plugins?: {
		getPlugin(id: string): unknown;
	};
}

export class ObsidianGitVaultGit {
	private constructor(
		private readonly plugin: ObsidianGitPlugin,
		private manager: ObsidianGitManager | undefined,
	) {}

	static fromApp(app: App): ObsidianGitVaultGit | null {
		const plugin = (app as AppWithPluginRegistry).plugins
			?.getPlugin("obsidian-git") as ObsidianGitPlugin | null | undefined;
		if (!plugin) return null;

		return new ObsidianGitVaultGit(plugin, plugin.gitManager);
	}

	get backend(): "native" | "isomorphic" | "unknown" {
		return this.manager?.git ? "native" : this.manager ? "isomorphic" : "unknown";
	}

	get isReady(): boolean {
		return Boolean(this.manager);
	}

	async ensureReady(): Promise<void> {
		if (!this.plugin.localStorage) {
			throw new Error("obsidian-git 尚未初始化，请先打开一次 Git 插件设置或重启 Obsidian。");
		}

		if (!this.plugin.gitManager) {
			await this.plugin.init({ fromReload: true });
		}
		this.manager = this.plugin.gitManager;
		if (!this.manager) {
			throw new Error("无法初始化 obsidian-git，请重启 Obsidian 后重试。");
		}
	}

	setCredentials(username: string, password: string): void {
		this.plugin.localStorage?.setUsername(username);
		this.plugin.localStorage?.setPassword(password);
	}

	async init(): Promise<void> {
		await this.requireManager().init();
	}

	async status(): Promise<VaultGitStatus> {
		return this.requireManager().status();
	}

	async commitAll(message: string): Promise<void> {
		await this.requireManager().commitAll({ message });
	}

	async pull(): Promise<void> {
		await this.requireManager().pull();
	}

	async getUnpushedCommits(): Promise<number> {
		return this.requireManager().getUnpushedCommits();
	}

	async fetch(remote: string): Promise<void> {
		await this.requireManager().fetch(remote);
	}

	/** Checks out a remote-tracking branch into the working tree. */
	async checkoutRemote(branch: string, remote: string): Promise<void> {
		await this.requireManager().checkout(branch, remote);
	}

	/** Switches to an existing local branch. */
	async checkout(branch: string): Promise<void> {
		await this.requireManager().checkout(branch);
	}

	async pushCurrent(): Promise<void> {
		await this.requireManager().push();
	}

	async push(remote: string, localBranch: string, remoteBranch: string): Promise<void> {
		const manager = this.requireManager();
		if (manager.git) {
			await manager.git.push(remote, `${localBranch}:${remoteBranch}`);
			return;
		}
		await manager.updateUpstreamBranch(`${remote}/${remoteBranch}`);
	}

	async setRemote(remote: string, url: string): Promise<void> {
		await this.requireManager().setRemote(remote, url);
	}

	async setConfig(path: string, value: string): Promise<void> {
		await this.requireManager().setConfig(path, value);
	}

	async branchInfo(): Promise<VaultGitBranch> {
		return this.requireManager().branchInfo();
	}

	async createBranch(name: string): Promise<void> {
		await this.requireManager().createBranch(name);
	}

	async updateUpstreamBranch(tracking: string): Promise<void> {
		await this.requireManager().updateUpstreamBranch(tracking);
	}

	async resolveHead(): Promise<string> {
		const manager = this.requireManager();
		const head = manager.resolveRef
			? await manager.resolveRef("HEAD")
			: manager.git
				? await manager.git.revparse(["--verify", "HEAD"])
				: "";
		const normalized = head.trim();
		if (/^[0-9a-f]{40}$/i.test(normalized)) return normalized;

		throw new Error("无法读取本地 Git 提交，请重启 Obsidian 后重试。");
	}

	async hasCommit(): Promise<boolean> {
		try {
			await this.resolveHead();
			return true;
		} catch {
			return false;
		}
	}

	async reload(): Promise<void> {
		this.plugin.unloadPlugin?.();
		await this.plugin.init({ fromReload: true });
		this.manager = this.plugin.gitManager;
	}

	private requireManager(): ObsidianGitManager {
		if (!this.manager) {
			throw new Error("Git 引擎尚未就绪，请先在第三方插件中启用 Git 插件。");
		}
		return this.manager;
	}
}
