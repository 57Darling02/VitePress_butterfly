import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_REPO = '';
const DEFAULT_BRANCH = 'main';

const POST_REPO = process.env.POST_REPO || DEFAULT_REPO;
const POST_BRANCH = process.env.POST_BRANCH || DEFAULT_BRANCH;
const PRIVATE_PAT = process.env.PERSONAL_ACCESS_TOKEN;

const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');

function ensureLocalPostsFallback(reason) {
  console.warn('-------------------------------------------------------------------');
  console.warn(`[fetch-posts] Fallback to local posts. Reason: ${reason}`);
  console.warn('-------------------------------------------------------------------');

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const hasMarkdown = fs
    .readdirSync(postsDir, { withFileTypes: true })
    .some((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'));

  if (!hasMarkdown) {
    const demoContent = `# Hello World\n\nThis is an auto-generated sample post.\n\n::: tip\nRemote posts fetch was skipped, so local fallback content is used.\n:::`;
    fs.writeFileSync(path.join(postsDir, 'index.md'), demoContent);
  }
}

if (!POST_REPO) {
  ensureLocalPostsFallback('POST_REPO is not configured');
  process.exit(0);
}

console.log('-------------------------------------------------------------------');
console.log(`[Dual Repo Mode] Detected POST_REPO: ${POST_REPO}`);
console.log('Preparing to fetch remote content...');
console.log('-------------------------------------------------------------------');

let repoUrl = POST_REPO;
if (PRIVATE_PAT && POST_REPO.startsWith('https://')) {
  repoUrl = POST_REPO.replace('https://', `https://${PRIVATE_PAT}@`);
}

console.log(`Cleaning ${postsDir}...`);
if (fs.existsSync(postsDir)) {
  try {
    fs.rmSync(postsDir, { recursive: true, force: true });
  } catch {
    console.warn('Failed to clean posts directory. It might be in use.');
  }
}

console.log(`Cloning ${POST_REPO} into local posts directory...`);
try {
  const cmd = `git clone -b "${POST_BRANCH}" "${repoUrl}" "${postsDir}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('Posts fetched successfully.');
} catch {
  ensureLocalPostsFallback('failed to clone remote posts repository');
  process.exit(0);
}