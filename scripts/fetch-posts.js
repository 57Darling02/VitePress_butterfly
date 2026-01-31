import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config defaults from workflow
const DEFAULT_REPO = 'https://github.com/57Darling02/blog-post.git';
const DEFAULT_BRANCH = 'main';

const POST_REPO = process.env.POST_REPO || DEFAULT_REPO;
const POST_BRANCH = process.env.POST_BRANCH || DEFAULT_BRANCH;
const PRIVATE_PAT = process.env.PERSONAL_ACCESS_TOKEN;

const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');

// 1. Prepare URL
let repoUrl = POST_REPO;
if (PRIVATE_PAT && POST_REPO.startsWith('https://')) {
    // Inject token if present
    repoUrl = POST_REPO.replace('https://', `https://${PRIVATE_PAT}@`);
}

// 2. Clean posts directory
console.log(`Cleaning ${postsDir}...`);
if (fs.existsSync(postsDir)) {
    try {
        fs.rmSync(postsDir, { recursive: true, force: true });
    } catch (e) {
        console.warn('Failed to clean posts directory. It might be in use.');
    }
}

// 3. Clone Repository
console.log(`Cloning ${POST_REPO} into posts...`);
try {
    // Clone directly into postsDir
    // We use execSync directly to avoid logging the command with the token
    const cmd = `git clone -b "${POST_BRANCH}" "${repoUrl}" "${postsDir}"`;
    execSync(cmd, { stdio: 'inherit' });
} catch (e) {
    console.error('Failed to clone repository. Check your token or repo access.');
    process.exit(1);
}

console.log('✅ Posts fetched successfully!');
