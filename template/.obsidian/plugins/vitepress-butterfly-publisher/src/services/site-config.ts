import type { App } from "obsidian";
import { parseDocument } from "yaml";

export const SITE_CONFIG_PATH = "site_config.yml";

export interface SocialLink {
	name: string;
	icon: string;
	iconUrl?: string;
	url: string;
}

export interface MenuItem {
	key: string;
	label: string;
	icon?: string;
	link?: string;
	children?: MenuItem[];
}

export interface MusicPlayerConfig {
	enabled: boolean;
	url: string;
	name: string;
	artist: string;
	cover: string;
	autoplay: boolean;
	volume: number;
}

export interface FriendLink {
	Name: string;
	Url: string;
	Avatar: string;
	Desc: string;
}

export interface CommentsConfig {
	enabled: boolean;
	host: string;
	repo: string;
	repoId: string;
	category: string;
	categoryId: string;
	mapping: string;
	strict: string;
	reactionsEnabled: string;
	emitMetadata: string;
	inputPosition: string;
	theme: string;
	lang: string;
	loading: string;
}

export interface SiteConfig {
	site_name: string;
	site_description: string;
	site_url: string;
	lang: string;
	author: string;
	background: string;
	bg_rainfall: boolean;
	home: {
		mainTitle: string;
		subTitles: string[];
	};
	pageSize: number;
	sortMethod: "date" | "lastUpdated";
	lastUpdated: {
		use: boolean;
	};
	avatar: string;
	name: string;
	signature: string;
	introduction: string;
	socialLinks: SocialLink[];
	menuItems: MenuItem[];
	musicPlayer: MusicPlayerConfig;
	friendlink: FriendLink[];
	footer: {
		message: string;
		copyright: string;
		createdTime: string;
	};
	comments: CommentsConfig;
}

export interface SiteConfigSnapshot {
	config: SiteConfig;
	/** Exact source text used as the optimistic-concurrency token. */
	source: string;
}

export class SiteConfigConflictError extends Error {
	constructor() {
		super("site_config.yml 已被其他编辑器修改。请关闭配置窗口后重新打开，避免覆盖外部改动。");
		this.name = "SiteConfigConflictError";
	}
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
	site_name: "VitePress-Butterfly",
	site_description: "这是一个使用 VitePress 构建的博客站点。",
	site_url: "",
	lang: "zh-CN",
	author: "",
	background: "",
	bg_rainfall: false,
	home: {
		mainTitle: "VitePress-Butterfly",
		subTitles: [],
	},
	pageSize: 8,
	sortMethod: "date",
	lastUpdated: {
		use: true,
	},
	avatar: "",
	name: "",
	signature: "",
	introduction: "",
	socialLinks: [],
	menuItems: [],
	musicPlayer: {
		enabled: false,
		url: "",
		name: "",
		artist: "",
		cover: "",
		autoplay: false,
		volume: 0.6,
	},
	friendlink: [],
	footer: {
		message: "",
		copyright: "",
		createdTime: "",
	},
	comments: {
		enabled: false,
		host: "https://giscus.app",
		repo: "",
		repoId: "",
		category: "Announcements",
		categoryId: "",
		mapping: "title",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: "zh-CN",
		loading: "lazy",
	},
};

const MANAGED_KEYS: (keyof SiteConfig)[] = [
	"site_name",
	"site_description",
	"site_url",
	"lang",
	"author",
	"background",
	"bg_rainfall",
	"home",
	"pageSize",
	"sortMethod",
	"lastUpdated",
	"avatar",
	"name",
	"signature",
	"introduction",
	"socialLinks",
	"menuItems",
	"musicPlayer",
	"friendlink",
	"footer",
	"comments",
];

/**
 * Structured gateway for site_config.yml. The modal only works with a typed
 * object; this service keeps the source document for optimistic concurrency
 * and updates only the keys the console owns, leaving theme extension keys
 * untouched.
 */
export class SiteConfigService {
	constructor(private readonly app: App) {}

	async load(): Promise<SiteConfigSnapshot> {
		const adapter = this.app.vault.adapter;
		const source = await adapter.exists(SITE_CONFIG_PATH)
			? await adapter.read(SITE_CONFIG_PATH)
			: "";
		return { config: this.parse(source), source };
	}

	async save(config: SiteConfig, expectedSource: string): Promise<SiteConfigSnapshot> {
		validateSiteConfig(config);

		const adapter = this.app.vault.adapter;
		const current = await adapter.exists(SITE_CONFIG_PATH)
			? await adapter.read(SITE_CONFIG_PATH)
			: "";
		if (current !== expectedSource) {
			throw new SiteConfigConflictError();
		}

		const document = parseDocument(current || "{}", { prettyErrors: true });
		if (document.errors.length > 0) {
			throw new Error(`site_config.yml 格式错误：${document.errors[0].message}`);
		}
		const root = document.toJS();
		if (!isRecord(root)) {
			throw new Error("site_config.yml 根节点必须是 YAML 对象。");
		}
		const existing = root;
		for (const key of MANAGED_KEYS) {
			updateKnownValue(document, [key], existing[key], config[key]);
		}

		const source = document.toString({ lineWidth: 0 });
		await adapter.write(SITE_CONFIG_PATH, source);
		return { config: clone(config), source };
	}

	async listPublicAssets(kind: "image" | "audio" = "image"): Promise<string[]> {
		const files = this.app.vault.getFiles();
		return files
			.filter((file) => file.path.startsWith("public/") && (kind === "image" ? isImage(file.path) : isAudio(file.path)))
			.map((file) => `/${file.path.slice("public/".length)}`)
			.sort((left, right) => left.localeCompare(right));
	}

	private parse(source: string): SiteConfig {
		if (!source.trim()) {
			return clone(DEFAULT_SITE_CONFIG);
		}
		const document = parseDocument(source, { prettyErrors: true });
		if (document.errors.length > 0) {
			throw new Error(`site_config.yml 格式错误：${document.errors[0].message}`);
		}
		const root = document.toJS();
		if (!isRecord(root)) {
			throw new Error("site_config.yml 根节点必须是 YAML 对象。");
		}
		return normalizeSiteConfig(root);
	}
}

function normalizeSiteConfig(raw: Record<string, unknown>): SiteConfig {
	const defaults = DEFAULT_SITE_CONFIG;
	const home = asRecord(raw.home);
	const lastUpdated = asRecord(raw.lastUpdated);
	const music = asRecord(raw.musicPlayer);
	const footer = asRecord(raw.footer);
	const comments = asRecord(raw.comments);

	return {
		site_name: stringValue(raw.site_name, defaults.site_name),
		site_description: stringValue(raw.site_description, defaults.site_description),
		site_url: stringValue(raw.site_url, defaults.site_url),
		lang: stringValue(raw.lang, defaults.lang),
		author: stringValue(raw.author, defaults.author),
		background: stringValue(raw.background, defaults.background),
		bg_rainfall: booleanValue(raw.bg_rainfall, defaults.bg_rainfall),
		home: {
			mainTitle: stringValue(home.mainTitle, defaults.home.mainTitle),
			subTitles: stringList(home.subTitles),
		},
		pageSize: clampInteger(raw.pageSize, defaults.pageSize, 1, 100),
		sortMethod: raw.sortMethod === "lastUpdated" ? "lastUpdated" : "date",
		lastUpdated: {
			use: booleanValue(lastUpdated.use, defaults.lastUpdated.use),
		},
		avatar: stringValue(raw.avatar, defaults.avatar),
		name: stringValue(raw.name, defaults.name),
		signature: stringValue(raw.signature, defaults.signature),
		introduction: stringValue(raw.introduction, defaults.introduction),
		socialLinks: socialLinks(raw.socialLinks),
		menuItems: menuItems(raw.menuItems),
		musicPlayer: {
			enabled: booleanValue(music.enabled, defaults.musicPlayer.enabled),
			url: stringValue(music.url, defaults.musicPlayer.url),
			name: stringValue(music.name, defaults.musicPlayer.name),
			artist: stringValue(music.artist, defaults.musicPlayer.artist),
			cover: stringValue(music.cover, defaults.musicPlayer.cover),
			autoplay: booleanValue(music.autoplay, defaults.musicPlayer.autoplay),
			volume: clampNumber(music.volume, defaults.musicPlayer.volume, 0, 1),
		},
		friendlink: friendLinks(raw.friendlink),
		footer: {
			message: stringValue(footer.message, defaults.footer.message),
			copyright: stringValue(footer.copyright, defaults.footer.copyright),
			createdTime: stringValue(footer.createdTime, defaults.footer.createdTime),
		},
		comments: {
			enabled: booleanValue(comments.enabled, defaults.comments.enabled),
			host: stringValue(comments.host, defaults.comments.host),
			repo: stringValue(comments.repo, defaults.comments.repo),
			repoId: stringValue(comments.repoId, defaults.comments.repoId),
			category: stringValue(comments.category, defaults.comments.category),
			categoryId: stringValue(comments.categoryId, defaults.comments.categoryId),
			mapping: stringValue(comments.mapping, defaults.comments.mapping),
			strict: stringValue(comments.strict, defaults.comments.strict),
			reactionsEnabled: stringValue(comments.reactionsEnabled, defaults.comments.reactionsEnabled),
			emitMetadata: stringValue(comments.emitMetadata, defaults.comments.emitMetadata),
			inputPosition: stringValue(comments.inputPosition, defaults.comments.inputPosition),
			theme: stringValue(comments.theme, defaults.comments.theme),
			lang: stringValue(comments.lang, defaults.comments.lang),
			loading: stringValue(comments.loading, defaults.comments.loading),
		},
	};
}

function socialLinks(value: unknown): SocialLink[] {
	if (!Array.isArray(value)) return [];
	return value.map((item) => {
		const entry = asRecord(item);
		return {
			name: stringValue(entry.name, ""),
			icon: stringValue(entry.icon, "link"),
			iconUrl: optionalString(entry.iconUrl),
			url: stringValue(entry.url, ""),
		};
	});
}

function menuItems(value: unknown): MenuItem[] {
	if (!Array.isArray(value)) return [];
	return value.map((item, index) => normalizeMenuItem(item, index));
}

function normalizeMenuItem(value: unknown, index: number): MenuItem {
	const item = asRecord(value);
	const children = menuItems(item.children);
	return {
		key: stringValue(item.key, `menu-${index + 1}`),
		label: stringValue(item.label, "未命名菜单"),
		icon: optionalString(item.icon),
		link: optionalString(item.link),
		children: children.length ? children : undefined,
	};
}

function friendLinks(value: unknown): FriendLink[] {
	if (!Array.isArray(value)) return [];
	return value.map((item) => {
		const entry = asRecord(item);
		return {
			Name: stringValue(entry.Name, ""),
			Url: stringValue(entry.Url, ""),
			Avatar: stringValue(entry.Avatar, ""),
			Desc: stringValue(entry.Desc, ""),
		};
	});
}

function validateSiteConfig(config: SiteConfig): void {
	if (!config.site_name.trim()) {
		throw new Error("站点名称不能为空。");
	}
	if (config.site_url.trim() && !isHttpUrl(config.site_url)) {
		throw new Error("站点域名必须是以 http:// 或 https:// 开头的 URL。");
	}
	if (!Number.isInteger(config.pageSize) || config.pageSize < 1 || config.pageSize > 100) {
		throw new Error("每页文章数必须是 1 到 100 的整数。");
	}
	if (config.musicPlayer.volume < 0 || config.musicPlayer.volume > 1) {
		throw new Error("音乐音量必须在 0 到 1 之间。");
	}
	for (const link of config.socialLinks) {
		if (!link.name.trim() || !link.url.trim()) {
			throw new Error("每条社交链接都需要名称和链接地址。");
		}
		if (!isHttpUrl(link.url)) {
			throw new Error(`社交链接「${link.name}」不是有效 URL。`);
		}
	}
	for (const link of config.friendlink) {
		if (!link.Name.trim() || !link.Url.trim()) {
			throw new Error("每条友链都需要名称和链接地址。");
		}
		if (!isHttpUrl(link.Url)) {
			throw new Error(`友链「${link.Name}」不是有效 URL。`);
		}
	}
	validateMenuItems(config.menuItems, new Set());
	if (config.comments.enabled) {
		const required: [string, string][] = [
			["仓库", config.comments.repo],
			["仓库 ID", config.comments.repoId],
			["分类 ID", config.comments.categoryId],
		];
		for (const [label, value] of required) {
			if (!value.trim()) {
				throw new Error(`启用评论时必须填写 Giscus ${label}。`);
			}
		}
	}
}

function validateMenuItems(items: MenuItem[], keys: Set<string>, depth = 0): void {
	// The top level is a single menu container; children hold the real links.
	if (depth === 0 && items.length > 1) {
		throw new Error("导航菜单最上层只能有一个菜单入口。");
	}
	for (const item of items) {
		if (!item.key.trim() || !item.label.trim()) {
			throw new Error("每个导航项都需要 key 和名称。");
		}
		if (keys.has(item.key)) {
			throw new Error(`导航 key「${item.key}」重复。`);
		}
		keys.add(item.key);
		if (item.children?.length) {
			if (depth >= 1) {
				throw new Error("导航菜单只支持两层：顶层菜单和子菜单项。");
			}
			validateMenuItems(item.children, keys, depth + 1);
			continue;
		}
		if (!item.link) {
			throw new Error(`导航「${item.label}」需要填写链接。`);
		}
		if (!isMenuLink(item.link)) {
			throw new Error(`导航「${item.label}」的链接格式无效。`);
		}
	}
}

function asRecord(value: unknown): Record<string, unknown> {
	return value && typeof value === "object" && !Array.isArray(value)
		? value as Record<string, unknown>
		: {};
}

function stringValue(value: unknown, fallback: string): string {
	return typeof value === "string" ? value : fallback;
}

function optionalString(value: unknown): string | undefined {
	return typeof value === "string" && value.trim() ? value : undefined;
}

function booleanValue(value: unknown, fallback: boolean): boolean {
	return typeof value === "boolean" ? value : fallback;
}

function stringList(value: unknown): string[] {
	return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function clampInteger(value: unknown, fallback: number, minimum: number, maximum: number): number {
	const number = typeof value === "number" ? value : Number(value);
	return Number.isInteger(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

function clampNumber(value: unknown, fallback: number, minimum: number, maximum: number): number {
	const number = typeof value === "number" ? value : Number(value);
	return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

function isHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

function isMenuLink(value: string): boolean {
	return value.startsWith("/") || isHttpUrl(value);
}

function isImage(path: string): boolean {
	return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path);
}

function isAudio(path: string): boolean {
	return /\.(aac|flac|m4a|mp3|ogg|wav|webm)$/i.test(path);
}

function updateKnownValue(
	document: ReturnType<typeof parseDocument>,
	path: string[],
	existing: unknown,
	next: unknown,
): void {
	if (isRecord(next)) {
		const source = asRecord(existing);
		for (const [key, value] of Object.entries(next)) {
			updateKnownValue(document, [...path, key], source[key], value);
		}
		return;
	}
	if (Array.isArray(next)) {
		document.setIn(path, mergeArrayExtras(existing, next, path[path.length - 1]));
		return;
	}
	document.setIn(path, clone(next));
}

function mergeArrayExtras(existing: unknown, next: unknown[], key: string): unknown[] {
	const source = Array.isArray(existing) ? sourceRecords(existing) : [];
	const keyed = new Map<string, Record<string, unknown>>();
	for (const item of source) {
		const identity = arrayIdentity(key, item);
		if (identity) keyed.set(identity, item);
	}

	return next.map((item, index) => {
		const identity = isRecord(item) ? arrayIdentity(key, item) : "";
		const previous = identity ? (keyed.get(identity) ?? source[index]) : source[index];
		return mergeExtras(previous, item, key);
	});
}

function sourceRecords(value: unknown[]): Record<string, unknown>[] {
	return value.filter(isRecord);
}

function arrayIdentity(key: string, item: Record<string, unknown>): string {
	if (key === "menuItems" || key === "children") {
		return typeof item.key === "string" ? item.key : "";
	}
	if (key === "socialLinks") {
		return `${typeof item.name === "string" ? item.name : ""}\u0000${typeof item.url === "string" ? item.url : ""}`;
	}
	if (key === "friendlink") {
		return `${typeof item.Name === "string" ? item.Name : ""}\u0000${typeof item.Url === "string" ? item.Url : ""}`;
	}
	return "";
}

function mergeExtras(existing: unknown, next: unknown, key = ""): unknown {
	if (next === undefined) return undefined;
	if (Array.isArray(next)) {
		return mergeArrayExtras(existing, next, key);
	}
	if (isRecord(next)) {
		const result: Record<string, unknown> = { ...asRecord(existing) };
		for (const [field, value] of Object.entries(next)) {
			if (value === undefined) {
				delete result[field];
			} else {
				result[field] = mergeExtras(result[field], value, field);
			}
		}
		return result;
	}
	return clone(next);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function clone<T>(value: T): T {
	if (value === undefined) return value;
	return JSON.parse(JSON.stringify(value)) as T;
}
