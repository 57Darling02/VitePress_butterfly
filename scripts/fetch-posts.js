import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WIKI_URL = process.env.WIKI_URL || '';
const WIKI_BRANCH = process.env.WIKI_BRANCH || 'main';
const PAT = process.env.PAT || '';

const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');
const SKIP_DIRS = new Set(['.git', 'node_modules']);

main();

function main() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  if (WIKI_URL) {
    fetchRemotePosts();
    const result = sanitizeMarkdownPosts(postsDir);
    console.log(
      `[fetch-posts] markdown scanned: ${result.scanned}, kept: ${result.kept}, removed: ${result.removed}`
    );
    if (result.keptFiles.length > 0) {
      console.log('[fetch-posts] kept markdown files:');
      for (const file of result.keptFiles) {
        console.log(`  - ${file}`);
      }
    } else {
      console.log('[fetch-posts] kept markdown files: (none)');
    }
    return;
  }

  console.log('[fetch-posts] WIKI_URL not configured. Keep local posts as-is.');
}

function fetchRemotePosts() {
  console.log('-------------------------------------------------------------------');
  console.log(`[fetch-posts] Fetching from ${WIKI_URL} (${WIKI_BRANCH})`);
  console.log('-------------------------------------------------------------------');

  let repoUrl = WIKI_URL;
  if (PAT && WIKI_URL.startsWith('https://')) {
    repoUrl = WIKI_URL.replace('https://', `https://${PAT}@`);
  }

  console.log(`[fetch-posts] Cleaning ${postsDir}`);
  try {
    fs.rmSync(postsDir, { recursive: true, force: true });
    fs.mkdirSync(postsDir, { recursive: true });
  } catch (error) {
    throw new Error(`[fetch-posts] Failed to clean posts directory: ${String(error)}`);
  }

  const cmd = `git clone -b "${WIKI_BRANCH}" "${repoUrl}" "${postsDir}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('[fetch-posts] Clone completed.');
}

function sanitizeMarkdownPosts(directory) {
  const files = listMarkdownFiles(directory);
  let kept = 0;
  let removed = 0;
  const keptFiles = [];

  for (const file of files) {
    if (shouldKeepMarkdown(file)) {
      kept += 1;
      const relativePath = path.relative(directory, file).split(path.sep).join('/');
      keptFiles.push(relativePath);
      continue;
    }

    fs.rmSync(file, { force: true });
    removed += 1;
  }

  return {
    scanned: files.length,
    kept,
    removed,
    keptFiles,
  };
}

function listMarkdownFiles(directory) {
  const markdownFiles = [];
  walk(directory, markdownFiles);
  return markdownFiles;
}

function walk(directory, markdownFiles) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(fullPath, markdownFiles);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  }
}

function shouldKeepMarkdown(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = parseFrontmatter(source);
  if (!frontmatter) return false;

  return frontmatter.layout === 'doc';
}

function parseFrontmatter(markdownSource) {
  const match = markdownSource.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;

  try {
    const parsed = yaml.load(match[1]);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
