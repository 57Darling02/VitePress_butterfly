import type { BlogService } from "./blog";
import type { GitHubWorkflowRun } from "./github";
import type { DeploymentRecord, DeploymentStatus, PluginSettings } from "../settings";

export type ConsolePhase =
	| "disconnected"
	| "uninitialized"
	| "initializing"
	| "ready"
	| "waiting"
	| "building"
	| "success"
	| "failure";

export interface DeploymentSnapshot {
	readonly phase: ConsolePhase;
	readonly title: string;
	readonly detail: string;
	readonly updatedAt?: number;
	readonly runId?: number;
	readonly runUrl?: string;
}

export interface DeploymentMonitorDeps {
	getSettings(): PluginSettings;
	saveSettings(changes: Partial<PluginSettings>): Promise<void>;
	getBlog(): BlogService;
}

const DEPLOY_WORKFLOW_PATH = ".github/workflows/deploy.yml";
const ACTIVE_RUN_STATUSES = new Set(["queued", "pending", "in_progress", "waiting", "requested"]);

/**
 * Owns the single console status shown at the top of the panel. It composes
 * GitHub connection, initialization progress and the tracked Deploy Site
 * workflow run into one small state machine, and persists the last result.
 */
export class DeploymentMonitor {
	constructor(private readonly deps: DeploymentMonitorDeps) {}

	getSnapshot(): DeploymentSnapshot {
		const settings = this.deps.getSettings();

		if (!settings.githubConnection) {
			return {
				phase: "disconnected",
				title: "未连接 GitHub",
				detail: "连接 GitHub 后即可创建并配置文章与博客仓库。",
			};
		}

		const init = settings.initialization;
		if (!init) {
			return {
				phase: "uninitialized",
				title: "未初始化",
				detail: "初始化博客，将自动创建或连接文章与博客仓库并触发首次部署。",
			};
		}
		if (!init.completedAt) {
			const done = [init.articleReady, init.blogReady, init.pagesReady, Boolean(init.deploymentTriggeredAt)]
				.filter(Boolean).length;
			return {
				phase: "initializing",
				title: "初始化未完成",
				detail: init.lastError
					? `上次中断：${init.lastError}`
					: `已完成 ${done}/4 步，点击继续完成剩余步骤。`,
				updatedAt: init.updatedAt,
			};
		}

		const last = settings.lastDeploy;
		if (!last) {
			return {
				phase: "ready",
				title: "已就绪",
				detail: "博客已初始化。提交并推送文章，或点击重新构建。",
			};
		}
		return this.toSnapshot(last);
	}

	/** Records that a rebuild was requested (push or manual dispatch). */
	async recordTrigger(message: string, triggeredAt = Date.now()): Promise<DeploymentSnapshot> {
		const settings = this.deps.getSettings();
		const login = settings.githubConnection?.login ?? "";
		const record: DeploymentRecord = {
			repository: login ? `${login}/${settings.blogRepoName.trim()}` : settings.blogRepoName.trim(),
			workflow: DEPLOY_WORKFLOW_PATH,
			status: "waiting",
			triggeredAt,
			updatedAt: Date.now(),
			message,
		};
		await this.deps.saveSettings({ lastDeploy: record });
		return this.toSnapshot(record);
	}

	/**
	 * Fetches the latest deployment run. Terminal states skip the network
	 * unless `force` is set, so polling only queries GitHub while a build is
	 * actually pending or running.
	 */
	async refresh(force = false): Promise<DeploymentSnapshot> {
		const settings = this.deps.getSettings();
		if (!settings.githubConnection || !this.deps.getBlog().isInitialized()) {
			return this.getSnapshot();
		}

		const last = settings.lastDeploy;
		if (!force && last && last.status !== "waiting" && last.status !== "building") {
			return this.getSnapshot();
		}

		try {
			const runs = await this.deps.getBlog().getDeploymentRuns();
			const since = last?.triggeredAt ?? 0;
			// A dispatch creates its run shortly after the trigger timestamp.
			// While waiting, never fall back to an older run: that would show
			// a stale deployment as the result of the current trigger.
			const run = since > 0
				? (runs.find((candidate) => Date.parse(candidate.createdAt) >= since) ?? null)
				: (runs[0] ?? null);
			if (!run) {
				return this.getSnapshot();
			}

			const record = this.fromWorkflowRun(run, last);
			await this.deps.saveSettings({ lastDeploy: record });
			return this.toSnapshot(record);
		} catch (error) {
			if (last && (last.status === "waiting" || last.status === "building")) {
				return {
					...this.toSnapshot(last),
					detail: `部署状态暂时无法获取：${error instanceof Error ? error.message : String(error)}`,
				};
			}
			return this.getSnapshot();
		}
	}

	private fromWorkflowRun(
		run: GitHubWorkflowRun,
		last: DeploymentRecord | null,
	): DeploymentRecord {
		const settings = this.deps.getSettings();
		const login = settings.githubConnection?.login ?? "";
		const updatedAt = Date.parse(run.updatedAt) || Date.now();
		const base = {
			repository: login ? `${login}/${settings.blogRepoName.trim()}` : settings.blogRepoName.trim(),
			workflow: DEPLOY_WORKFLOW_PATH,
			triggeredAt: last?.triggeredAt ?? updatedAt,
			updatedAt,
			runId: run.id,
			runUrl: run.htmlUrl,
			message: run.name,
		};

		let status: DeploymentStatus;
		if (ACTIVE_RUN_STATUSES.has(run.status)) {
			status = "building";
		} else if (run.status === "completed" && run.conclusion === "success") {
			status = "success";
		} else if (run.status === "completed") {
			status = "failure";
		} else {
			status = "building";
		}
		return { ...base, status };
	}

	private toSnapshot(record: DeploymentRecord): DeploymentSnapshot {
		const common = {
			updatedAt: record.updatedAt,
			runId: record.runId,
			runUrl: record.runUrl,
		};

		switch (record.status) {
			case "waiting":
				return {
					...common,
					phase: "waiting",
					title: "等待构建",
					detail: record.message ? `已请求构建：${record.message}` : "已请求构建，等待 GitHub Actions 开始。",
				};
			case "building":
				return {
					...common,
					phase: "building",
					title: "部署中",
					detail: record.message ? `正在构建：${record.message}` : "GitHub Actions 正在构建站点。",
				};
			case "success":
				return {
					...common,
					phase: "success",
					title: "已部署",
					detail: record.message ? `最近部署成功：${record.message}` : "最近一次部署成功。",
				};
			case "failure":
				return {
					...common,
					phase: "failure",
					title: "部署失败",
					detail: record.message ? `最近部署失败：${record.message}` : "最近一次部署失败，请查看操作记录。",
				};
		}
	}
}
