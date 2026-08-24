import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { isFontAwesomeIcon } from './fontAwesome';

const defaultSiteConfig = {
  site_name: 'VitePress-Butterfly',
  site_description: 'A VitePress blog theme.',
  site_url: '/',
  lang: 'zh-CN',
  author: '',
  background: '',
  bg_rainfall: false,
  home: {
    mainTitle: 'VitePress-Butterfly',
    subTitles: ['Write Markdown, push code, publish automatically.'],
  },
  pageSize: 8,
  sortMethod: 'date',
  lastUpdated: {
    use: true,
  },
  search: {
    provider: 'local',
  },
  avatar: '/image/image.png',
  name: 'VitePress-Butterfly',
  signature: 'Blog',
  introduction: '',
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
    host: 'https://giscus.app',
    repo: '',
    repoId: '',
    category: '',
    categoryId: '',
    mapping: 'title',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'zh-CN',
    loading: 'lazy',
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

  assertNoDeprecatedProfileFields(config);
  normalizeIconReferences(config);
  return sanitizeInlineScriptValue(config);
}

const deprecatedProfileFields = {
  position: 'signature',
  bio: 'introduction',
  border: '',
} as const;

function assertNoDeprecatedProfileFields(config: Record<string, unknown>) {
  for (const [field, replacement] of Object.entries(deprecatedProfileFields)) {
    if (!(field in config)) continue;

    const guidance = replacement
      ? ` Use "${replacement}" instead.`
      : ' Remove it; the profile card border now follows the theme.';
    throw new Error(`[Config Loader] "${field}" has been removed.${guidance}`);
  }
}

function normalizeIconReferences(config: Record<string, unknown>) {
  normalizeIconReferenceList(config.socialLinks, 'socialLinks');
  normalizeIconReferenceList(config.menuItems, 'menuItems', true);
}

function normalizeIconReferenceList(value: unknown, path: string, includeChildren = false) {
  if (!Array.isArray(value)) {
    throw new Error(`[Config Loader] ${path} must be an array.`);
  }

  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (!isPlainObject(item)) {
      throw new Error(`[Config Loader] ${itemPath} must be an object.`);
    }

    normalizeIconReference(item, itemPath);

    if (includeChildren && item.children !== undefined) {
      normalizeIconReferenceList(item.children, `${itemPath}.children`);
    }
  });
}

function normalizeIconReference(value: unknown, path: string) {
  if (!isPlainObject(value)) return;

  const icon = value.icon;
  const iconUrl = value.iconUrl;
  if (icon !== undefined && iconUrl !== undefined) {
    throw new Error(`[Config Loader] ${path} cannot set both icon and iconUrl.`);
  }

  if (iconUrl !== undefined && (typeof iconUrl !== 'string' || !iconUrl.trim())) {
    throw new Error(`[Config Loader] ${path}.iconUrl must be a non-empty SVG or image URL.`);
  }

  if (typeof iconUrl === 'string') {
    value.iconUrl = iconUrl.trim();
  }

  if (icon === undefined) return;
  if (typeof icon !== 'string' || !icon.trim()) {
    throw new Error(`[Config Loader] ${path}.icon must be a non-empty icon name.`);
  }

  const normalizedIcon = icon.trim();
  if (isFontAwesomeIcon(normalizedIcon)) {
    value.icon = normalizedIcon;
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedIcon)) {
    throw new Error(
      `[Config Loader] ${path}.icon must use a lowercase Lucide kebab-case name or a Font Awesome fa-* class.`,
    );
  }

  value.icon = normalizedIcon;
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
