import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------------------------------------------------
// Configuration Defaults (Local Mode)
// ----------------------------------------------------------------------
const DEFAULT_REPO = ''; // Empty string indicates local mode
const DEFAULT_BRANCH = 'main';

// ----------------------------------------------------------------------
// Environment Variables
// ----------------------------------------------------------------------
const POST_REPO = process.env.POST_REPO || DEFAULT_REPO;
const POST_BRANCH = process.env.POST_BRANCH || DEFAULT_BRANCH;
const PRIVATE_PAT = process.env.PERSONAL_ACCESS_TOKEN;

const rootDir = path.resolve(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');

// ----------------------------------------------------------------------
// Mode Detection: Single Repo (Local) vs Dual Repo (Remote)
// ----------------------------------------------------------------------
if (!POST_REPO) {
    console.log('-------------------------------------------------------------------');
    console.log('🚀 [Single Repo Mode] No POST_REPO environment variable detected.');
    console.log('📂 Using local "posts" directory as content source.');
    console.log('💡 To enable Dual Repo Mode (separate source & content), configure POST_REPO.');
    console.log('-------------------------------------------------------------------');
    
    // Ensure posts directory exists
    if (!fs.existsSync(postsDir)) {
        console.log('⚠️ Local "posts" directory missing. Creating empty directory...');
        fs.mkdirSync(postsDir);
        // Create a sample post to prevent build errors
        const demoContent = `# Hello World\n\nThis is an auto-generated sample post.\n\n::: tip\nYou are currently in Single Repo Mode.\n:::`;
        fs.writeFileSync(path.join(postsDir, 'index.md'), demoContent);
    }
    
    process.exit(0); // Exit normally, skipping remote fetch logic
}

console.log('-------------------------------------------------------------------');
console.log(`🚀 [Dual Repo Mode] Detected POST_REPO: ${POST_REPO}`);
console.log('📥 Preparing to fetch remote content...');
console.log('-------------------------------------------------------------------');

// 1. Prepare Repository URL
let repoUrl = POST_REPO;
if (PRIVATE_PAT && POST_REPO.startsWith('https://')) {
    // Inject Personal Access Token for private repositories
    repoUrl = POST_REPO.replace('https://', `https://${PRIVATE_PAT}@`);
}

// 2. Clean Local Posts Directory
console.log(`Cleaning ${postsDir}...`);
if (fs.existsSync(postsDir)) {
    try {
        fs.rmSync(postsDir, { recursive: true, force: true });
    } catch (e) {
        console.warn('⚠️ Failed to clean posts directory. It might be in use.');
    }
}

// 3. Clone Remote Repository
console.log(`Cloning ${POST_REPO} into local posts directory...`);
try {
    // Clone directly into postsDir
    // Using execSync directly to avoid logging the command with the token
    const cmd = `git clone -b "${POST_BRANCH}" "${repoUrl}" "${postsDir}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('✅ Posts fetched successfully!');
} catch (e) {
    console.error('❌ Failed to clone repository. Please check your token or repo access permissions.');
    process.exit(1);
}
