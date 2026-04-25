import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const postsDir = path.join(rootDir, 'posts');
const postsPublicDir = path.join(postsDir, 'public');
const themePublicDir = path.join(rootDir, 'public');
const generatedPublicDir = path.join(rootDir, '.vitepress', 'content-public');
const tempCloneDir = path.join(rootDir, '.vitepress', 'content-source');
const envLocalPath = path.join(rootDir, '.env.local');
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const LOG_PREFIX = '[prepare-content]';

main();

function main() {
  try {
    loadEnvLocal();

    const wikiUrl = readEnv('WIKI_URL');
    const wikiBranch = readEnv('WIKI_BRANCH') || 'main';
    const pat = readEnv('PAT');

    ensureDirectory(postsDir);

    if (wikiUrl) {
      replacePostsFromRemote(wikiUrl, wikiBranch, pat);
      const result = sanitizeRemoteMarkdownPosts(postsDir);
      printSanitizeResult(result);
    } else {
      if (process.env.CI === 'true') {
        throw new Error('WIKI_URL is required in CI. Run Setup Blog or configure WIKI_URL/WIKI_BRANCH/PAT repository secrets.');
      }
      console.log(`${LOG_PREFIX} WIKI_URL is not configured. Using local posts/ for local development only.`);
    }

    ensureGitkeep();
    preparePublicAssets();
    warnIfSiteConfigMissing();
  } catch (error) {
    console.error(`${LOG_PREFIX} Failed.`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

function loadEnvLocal() {
  if (!fs.existsSync(envLocalPath)) return;

  const source = fs.readFileSync(envLocalPath, 'utf-8');
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    process.env[key] = stripEnvQuotes(rawValue.trim());
  }
}

function stripEnvQuotes(value) {
  const quote = value[0];
  if ((quote === '"' || quote === "'") && value[value.length - 1] === quote) {
    return value.slice(1, -1);
  }
  return value;
}

function readEnv(key) {
  return process.env[key]?.trim() || '';
}

function replacePostsFromRemote(wikiUrl, wikiBranch, pat) {
  const safeUrl = maskSecretInUrl(wikiUrl);
  console.log(`${LOG_PREFIX} WIKI_URL configured. Remote content is the source of truth.`);
  console.log(`${LOG_PREFIX} Cloning ${safeUrl} (${wikiBranch})`);

  removeDirectory(tempCloneDir);

  const cloneArgs = [
    'clone',
    '--depth',
    '1',
    '--branch',
    wikiBranch,
    buildAuthenticatedUrl(wikiUrl, pat),
    tempCloneDir,
  ];

  const result = spawnSync('git', cloneArgs, {
    cwd: rootDir,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`git clone exited with code ${result.status}.`);
  }

  removeDirectory(postsDir);
  try {
    fs.renameSync(tempCloneDir, postsDir);
  } catch (error) {
    console.warn(`${LOG_PREFIX} Rename failed. Falling back to directory copy.`);
    ensureDirectory(postsDir);
    copyDirectory(tempCloneDir, postsDir);
    removeDirectory(tempCloneDir);
  }
  removeDirectory(path.join(postsDir, '.git'));
  console.log(`${LOG_PREFIX} Remote content synced into posts/.`);
}

function buildAuthenticatedUrl(wikiUrl, pat) {
  if (!pat || !wikiUrl.startsWith('https://')) return wikiUrl;

  const url = new URL(wikiUrl);
  url.username = 'x-access-token';
  url.password = pat;
  return url.toString();
}

function maskSecretInUrl(wikiUrl) {
  try {
    const url = new URL(wikiUrl);
    if (url.username || url.password) {
      url.username = '***';
      url.password = '***';
    }
    return url.toString();
  } catch {
    return wikiUrl;
  }
}

function sanitizeRemoteMarkdownPosts(directory) {
  const files = listMarkdownFiles(directory);
  let kept = 0;
  let removed = 0;
  const keptFiles = [];

  for (const file of files) {
    if (shouldKeepMarkdown(file)) {
      kept += 1;
      keptFiles.push(toPosixPath(path.relative(directory, file)));
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

function printSanitizeResult(result) {
  console.log(
    `${LOG_PREFIX} Markdown scanned: ${result.scanned}, kept: ${result.kept}, removed: ${result.removed}.`,
  );

  if (result.keptFiles.length === 0) {
    console.log(`${LOG_PREFIX} Kept markdown files: (none)`);
    return;
  }

  console.log(`${LOG_PREFIX} Kept markdown files:`);
  for (const file of result.keptFiles) {
    console.log(`  - ${file}`);
  }
}

function listMarkdownFiles(directory) {
  const markdownFiles = [];
  if (!fs.existsSync(directory)) return markdownFiles;
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
  return frontmatter?.layout === 'doc';
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

function preparePublicAssets() {
  removeDirectory(generatedPublicDir);
  ensureDirectory(generatedPublicDir);

  if (fs.existsSync(themePublicDir)) {
    copyDirectory(themePublicDir, generatedPublicDir);
  }

  if (fs.existsSync(postsPublicDir)) {
    copyDirectory(postsPublicDir, generatedPublicDir);
    console.log(`${LOG_PREFIX} posts/public merged into .vitepress/content-public/.`);
  }
}

function copyDirectory(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      ensureDirectory(targetPath);
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile()) {
      ensureDirectory(path.dirname(targetPath));
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function warnIfSiteConfigMissing() {
  const configPath = path.join(postsDir, 'site_config.yml');
  if (!fs.existsSync(configPath)) {
    console.warn(`${LOG_PREFIX} posts/site_config.yml not found. Built-in theme defaults will be used.`);
  }
}

function ensureGitkeep() {
  ensureDirectory(postsDir);
  const gitkeepPath = path.join(postsDir, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function removeDirectory(directory) {
  fs.rmSync(directory, { recursive: true, force: true });
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}
