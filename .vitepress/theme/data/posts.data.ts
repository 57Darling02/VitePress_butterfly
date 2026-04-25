import { createContentLoader } from "vitepress";
import { loadSiteConfig } from "../utils/configLoader";
import pMap from "p-map";

const theme = loadSiteConfig() as any;
import fs from "fs";
import path from "path";
import { spawn } from "cross-spawn";

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
    render: true,
    excerpt: true,
    async transform(rawData: any[]) {
        const data = await pMap(
            rawData,
            async (page: any) => {
                const lastUpdated = await getLastUpdated(page.url);
                let excerpt = page.excerpt
                let textNum = 0
                if (true) {
                    const plainText = page.src
                        .replace(/^---[\s\S]*?---/, '')
                        .replace(/(```[\s\S]*?```|#+\s+|\[.*?\]\(.*?\))/g, '')
                        .substring(0, 100)
                    excerpt = plainText + (plainText.length >= 30 ? '......' : '')
                    excerpt = excerpt.trim()
                    textNum = page.src.length
                }
                return {
                    title: page.frontmatter.title,
                    date: page.frontmatter.date,
                    link: page.url,
                    excerpt: excerpt,
                    tags: normalizeTags(page.frontmatter?.tags),
                    cover: page.frontmatter.cover || '',
                    lastUpdated,
                    textNum,
                }
                // return { ...item, lastUpdated };
            },
            { concurrency: 64 }
        );
        const sortMethod: "date" | "lastUpdated" = theme.sortMethod || 'lastUpdated';
        switch (sortMethod) {
            case 'lastUpdated':
                data.sort((a, b) => getSortTime(b) - getSortTime(a));
                break;
            case 'date':
            default:
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
        }
        return data;
    }
}
const loader = createContentLoader('posts/**/*.md', contentLoaderConfig)
export const data = await loader.load();
export default loader;
// export default createContentLoader('posts/**/*.md', contentLoaderConfig)

function getSortTime(post: any): number {
    return post.lastUpdated || new Date(post.date).getTime() || 0;
}

// getLastUpdated function to fetch the last update time of a markdown file
async function getLastUpdated(url: string) {
    // Access global VITEPRESS_CONFIG
    const siteConfig = (globalThis as any).VITEPRESS_CONFIG;

    let file = url.replace(/(^|\/)$/, "$1index");
    file = file.replace(/(\.html)?$/, ".md");
    file = siteConfig.rewrites.inv[file] || file;
    file = path.join(siteConfig.srcDir, file);

    return new Promise((resolve, reject) => {
        const cwd = path.dirname(file);
        if (!fs.existsSync(cwd)) return resolve(0);
        const fileName = path.basename(file);
        const child = spawn("git", ["log", "-1", "--pretty=%ai", "--", fileName], {
            cwd,
        });
        let output = "";
        child.stdout.on("data", (data) => (output += String(data)));
        child.on("close", () => {
            const time = new Date(output.trim()).getTime();
            resolve(Number.isFinite(time) ? time : 0);
        });
        child.on("error", reject);
    });
}
