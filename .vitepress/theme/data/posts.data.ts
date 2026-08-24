import {
    cacheAllGitTimestamps,
    createContentLoader,
    getGitTimestamp,
    type ContentData,
} from "vitepress";
import fs from "node:fs";
import path from "node:path";
import type ThemeConfig from "../types/ThemeConfig";
import type { PostDate, PostSummary } from "../types/PostSummary";
import { loadSiteConfig } from "../utils/configLoader";
import { getPostCategory } from "../utils/postCategory";

const theme = loadSiteConfig();

const EXCERPT_LENGTH = 100;
const EXCERPT_SUFFIX = "......";
const excerptCleanupRules: Array<[RegExp, string]> = [
    [/^---[\s\S]*?---/, ""],
    [/```[\s\S]*?```/g, ""],
    [/#+\s+/g, ""],
    [/\[([^\]]+)\]\([^)]+\)/g, "$1"],
    [/(\*\*|__)(.*?)\1/g, "$2"],
];

interface VitePressConfig {
    srcDir: string;
    rewrites: {
        map: Record<string, string | undefined>;
        inv: Record<string, string | undefined>;
    };
}

let gitTimestampCache: Promise<boolean> | undefined;

function normalizeTags(rawTags: unknown): string[] {
    if (Array.isArray(rawTags)) {
        return rawTags
            .flatMap((tag) => normalizeTags(tag))
            .filter(Boolean);
    }

    if (typeof rawTags === "string") {
        return rawTags
            .split(/[,\s]+/)
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    return [];
}

const contentLoaderConfig = {
    includeSrc: true,
    async transform(rawData: ContentData[]): Promise<PostSummary[]> {
        const docPages = rawData.filter((page) => page.frontmatter.layout === "doc");
        const sortMethod = getSortMethod(theme.sortMethod);
        const shouldCalculateLastUpdated = theme.lastUpdated.use || sortMethod === "lastUpdated";
        const useGitTimestamps = shouldCalculateLastUpdated && docPages.length > 0
            ? await prepareGitTimestampCache()
            : false;

        const data = await Promise.all(docPages.map(async (page): Promise<PostSummary> => {
            const sourceFile = getSourceMarkdownPath(page.url).replace(/^\/+/, '');
            const sourcePath = getMarkdownFilePath(sourceFile);
            const plainText = toExcerptText(page.src ?? "").trim();
            const excerpt = `${plainText.substring(0, EXCERPT_LENGTH)}${plainText.length >= 30 ? EXCERPT_SUFFIX : ""}`;

            return {
                title: toText(page.frontmatter.title),
                date: toPostDate(page.frontmatter.date),
                link: getPublicLink(sourceFile),
                excerpt,
                tags: normalizeTags(page.frontmatter.tags),
                category: getPostCategory(sourceFile),
                cover: toText(page.frontmatter.cover),
                sourceFile,
                ...(shouldCalculateLastUpdated
                    ? { lastUpdated: await getLastUpdated(sourcePath, useGitTimestamps) }
                    : {}),
                textNum: countVisibleCharacters(plainText),
            };
        }));

        if (sortMethod === "lastUpdated") {
            data.sort((a, b) => getSortTime(b) - getSortTime(a));
        } else {
            data.sort((a, b) => getDateTimestamp(b.date) - getDateTimestamp(a.date));
        }

        return data;
    }
}
const loader = createContentLoader<PostSummary[]>('posts/**/*.md', contentLoaderConfig)
export const data = await loader.load();
export default loader;

function toExcerptText(src: string) {
    return excerptCleanupRules.reduce(
        (text, [pattern, replacement]) => text.replace(pattern, replacement),
        src,
    );
}

function countVisibleCharacters(text: string) {
    return text.replace(/\s+/g, "").length;
}

function getSortTime(post: PostSummary): number {
    return post.lastUpdated ?? getDateTimestamp(post.date);
}

function getPublicLink(sourceFile: string) {
    const siteConfig = getVitePressConfig();
    const file = sourceFile.replace(/^\/+/, '');
    const publicFile = siteConfig.rewrites.map[file] || file;
    return '/' + publicFile
        .replace(/(^|\/)index\.md$/, '$1')
        .replace(/\.md$/, '');
}

function getSourceMarkdownPath(url: string) {
    const siteConfig = getVitePressConfig();
    const file = urlToMarkdownPath(url);
    return siteConfig.rewrites.inv[file] || file;
}

function urlToMarkdownPath(url: string) {
    return url
        .replace(/(^|\/)$/, "$1index")
        .replace(/(\.html)?$/, ".md");
}

async function prepareGitTimestampCache(): Promise<boolean> {
    if (!gitTimestampCache) {
        const postsDirectory = path.resolve(getVitePressConfig().srcDir, "posts");
        gitTimestampCache = hasGitMetadata(postsDirectory)
            ? cacheAllGitTimestamps(postsDirectory)
                .then(() => true)
                .catch(() => false)
            : Promise.resolve(false);
    }

    return gitTimestampCache;
}

async function getLastUpdated(file: string, useGitTimestamps: boolean): Promise<number> {
    if (useGitTimestamps) {
        try {
            const timestamp = await getGitTimestamp(toVitePressPath(file));
            if (timestamp > 0) return timestamp;
        } catch {
            // A shallow or unavailable Git checkout should not prevent a static build.
        }
    }

    return getModifiedTimestamp(file);
}

function getMarkdownFilePath(sourceFile: string): string {
    return path.join(getVitePressConfig().srcDir, sourceFile);
}

function getModifiedTimestamp(file: string): number {
    try {
        return fs.statSync(file).mtimeMs;
    } catch {
        return 0;
    }
}

function hasGitMetadata(startDirectory: string): boolean {
    let directory = startDirectory;

    while (true) {
        if (fs.existsSync(path.join(directory, ".git"))) return true;

        const parentDirectory = path.dirname(directory);
        if (parentDirectory === directory) return false;
        directory = parentDirectory;
    }
}

function getVitePressConfig(): VitePressConfig {
    const config = (globalThis as typeof globalThis & {
        VITEPRESS_CONFIG?: VitePressConfig;
    }).VITEPRESS_CONFIG;

    if (!config) {
        throw new Error("VitePress content loader requires a resolved site configuration.");
    }

    return config;
}

function getSortMethod(sortMethod: ThemeConfig["sortMethod"]): "date" | "lastUpdated" {
    return sortMethod === "lastUpdated" ? "lastUpdated" : "date";
}

function getDateTimestamp(date: PostDate | undefined): number {
    if (date instanceof Date) {
        return Number.isFinite(date.getTime()) ? date.getTime() : 0;
    }
    if (date === undefined) return 0;

    const timestamp = new Date(date).getTime();
    return Number.isFinite(timestamp) ? timestamp : 0;
}

function toPostDate(value: unknown): PostDate | undefined {
    if (value instanceof Date || typeof value === "string" || typeof value === "number") {
        return value;
    }

    return undefined;
}

function toText(value: unknown): string {
    return value == null ? "" : String(value);
}

function toVitePressPath(file: string): string {
    return file.split(path.sep).join("/");
}
