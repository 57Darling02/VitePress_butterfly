import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const defaultSiteConfig = {
  site_name: 'VitePress-Butterfly',
  site_description: 'A VitePress blog theme.',
  site_url: '/',
  author: '',
  isDark: null,
  background: '#FDF8F2',
  bg_rainfall: false,
  home: {
    mainTitle: 'VitePress-Butterfly',
    subTitles: ['Write Markdown, push code, publish automatically.'],
    firstViewHeight: 60,
  },
  pageSize: 8,
  sortedMethor: 'date',
  lastUpdated: {
    use: true,
    text: '',
  },
  avatar: '/image/image.png',
  name: 'VitePress-Butterfly',
  position: 'Blog',
  bio: '',
  socialLinks: [],
  footer: {
    message: '',
    copyright: 'Powered by VitePress-Butterfly',
    createdTime: '',
  },
  menuItems: [],
  musicPlayer: {
    enabled: false,
  },
  comments: {
    enabled: false,
  },
  friendlink: [],
};

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

export function loadSiteConfig() {
  const rootDir = process.cwd();
  const configPath = path.resolve(rootDir, 'posts/site_config.yml');

  let config = defaultSiteConfig;

  if (fs.existsSync(configPath)) {
    console.log('[Config Loader] Using posts/site_config.yml');
    const content = fs.readFileSync(configPath, 'utf-8');
    const userConfig = yaml.load(content) || {};
    if (!isPlainObject(userConfig)) {
      throw new Error('[Config Loader] posts/site_config.yml must contain a YAML object.');
    }
    config = deepMerge(defaultSiteConfig, userConfig);
  } else {
    console.warn('[Config Loader] posts/site_config.yml not found. Using built-in defaults.');
  }

  return sanitizeInlineScriptValue(config);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override as T;
  }

  const output: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    output[key] = deepMerge(output[key], value);
  }

  return output as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
