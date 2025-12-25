import { createContentLoader } from "vitepress";
import theme from "../../../../site_config";
import pMap from "p-map";
import fs from "fs";
import path from "path";
import { spawn } from "cross-spawn";
const contentLoaderConfig = {
    includeSrc: true,
    render: true,
    excerpt: true,
    async transform(rawData) {
        const filteredData = rawData.filter(page => page.frontmatter?.layout);
        const data = await pMap(
            filteredData,
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
                    tags: (page.frontmatter.tags?.split(/[,\s]+/) ?? []).map(tag => tag.trim()),
                    cover: page.frontmatter.cover || '',
                    lastUpdated: lastUpdated as number || new Date(page.frontmatter.date).getTime() || new Date().getTime(),
                    textNum,
                }
                // return { ...item, lastUpdated };
            },
            { concurrency: 64 }
        );
        // Sort the data based on the themeConfig.sortedMethor options
        const sortedMethor: "date" | "lastUpdated" = theme.sortedMethor || 'lastUpdated';
        switch (sortedMethor) {
            case 'lastUpdated':
                data.sort((a, b) => b.lastUpdated - a.lastUpdated);
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

// getLastUpdated function to fetch the last update time of a markdown file
async function getLastUpdated(url) {
    // Access global VITEPRESS_CONFIG
    const siteConfig = globalThis.VITEPRESS_CONFIG;

    let file = url.replace(/(^|\/)$/, "$1index");
    file = file.replace(/(\.html)?$/, ".md");
    file = siteConfig.rewrites.inv[file] || file;
    file = path.join(siteConfig.srcDir, file);

    return new Promise((resolve, reject) => {
        const cwd = path.dirname(file);
        if (!fs.existsSync(cwd)) return resolve(0);
        const fileName = path.basename(file);
        const child = spawn("git", ["log", "-1", '--pretty="%ai"', fileName], {
            cwd,
        });
        let output = "";
        child.stdout.on("data", (data) => (output += String(data)));
        child.on("close", () => resolve(new Date(output).getTime()));
        child.on("error", reject);
    });
}