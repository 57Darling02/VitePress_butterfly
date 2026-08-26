export type DeploymentStatus = "waiting" | "building" | "success" | "failure";

/** A successful live PAT check. The PAT itself remains in the local setting. */
export interface GitHubConnection {
	login: string;
	verifiedAt: number;
}

/**
 * Completed initializer steps are persisted independently so a failed or
 * interrupted flow resumes from its first unfinished operation.
 */
export interface InitializationRecord {
	articleRepo: string;
	blogRepo: string;
	articleReady: boolean;
	blogReady: boolean;
	pagesReady: boolean;
	deploymentTriggeredAt?: number;
	completedAt?: number;
	updatedAt: number;
	lastError?: string;
}

/** A deployment record is scoped to one repository and one workflow. */
export interface DeploymentRecord {
	repository: string;
	workflow: string;
	status: DeploymentStatus;
	triggeredAt: number;
	updatedAt: number;
	message?: string;
	runId?: number;
	runUrl?: string;
}

export interface PluginSettings {
	pat: string;
	/** Private article repository name. */
	repoName: string;
	/** Public blog repository name. */
	blogRepoName: string;
	/** Retry marker for a repository created by this plugin but not fully uploaded. */
	pendingArticleRepo: string;
	/** Retry marker for a generated blog repository not fully configured yet. */
	pendingBlogRepo: string;
	/** Optional Vercel deployment secrets; all three are required to enable. */
	vercelToken: string;
	vercelOrgId: string;
	vercelProjectId: string;
	githubConnection: GitHubConnection | null;
	initialization: InitializationRecord | null;
	/** Last known result for the tracked Deploy Site workflow. */
	lastDeploy: DeploymentRecord | null;
	/** Timestamp of the most recent pull / commit-and-push from the console. */
	lastGitSyncAt: number | null;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	pat: "",
	repoName: "",
	blogRepoName: "",
	pendingArticleRepo: "",
	pendingBlogRepo: "",
	vercelToken: "",
	vercelOrgId: "",
	vercelProjectId: "",
	githubConnection: null,
	initialization: null,
	lastDeploy: null,
	lastGitSyncAt: null,
};
