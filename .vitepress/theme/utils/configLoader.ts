import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

let hasSyncedPostsPublic = false;

function sanitizeInlineScriptValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(/<\/script>/gi, '<\\/script>');
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeInlineScriptValue);
  }
  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      output[key] = sanitizeInlineScriptValue(nested);
    }
    return output;
  }
  return value;
}

// Load site config with this priority:
// 1) posts/site_config.yml
// 2) site_config.yml
export function loadSiteConfig() {
  const rootDir = process.cwd();
  const userConfigPath = path.resolve(rootDir, 'posts/site_config.yml');
  const defaultConfigPath = path.resolve(rootDir, 'site_config.yml');

  let config = {};

  try {
    if (fs.existsSync(userConfigPath)) {
      syncPostsPublicAssets(rootDir);
      console.log('[Config Loader] Found user config in posts/site_config.yml');
      const content = fs.readFileSync(userConfigPath, 'utf-8');
      config = yaml.load(content) || {};
    } else if (fs.existsSync(defaultConfigPath)) {
      console.log('[Config Loader] Using default config from site_config.yml');
      const content = fs.readFileSync(defaultConfigPath, 'utf-8');
      config = yaml.load(content) || {};
    } else {
      console.warn('[Config Loader] No site_config.yml found, using empty config.');
    }
  } catch (e) {
    console.error('[Config Loader] Failed to parse configuration file:', e);
  }

  return sanitizeInlineScriptValue(config);
}

function syncPostsPublicAssets(rootDir: string) {
  if (hasSyncedPostsPublic) return;
  hasSyncedPostsPublic = true;

  const sourceDir = path.resolve(rootDir, 'posts/public');
  const targetDir = path.resolve(rootDir, 'public');

  if (!fs.existsSync(sourceDir)) return;

  fs.mkdirSync(targetDir, { recursive: true });
  copyDirectory(sourceDir, targetDir);
  console.log('[Config Loader] Synced posts/public to public');
}

function copyDirectory(sourceDir: string, targetDir: string) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile()) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}
