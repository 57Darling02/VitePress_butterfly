import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

/**
 * 加载站点配置
 * 策略：优先加载 posts/site_config.yml，如果不存在则加载根目录的 site_config.yml
 */
export function loadSiteConfig() {
  const rootDir = process.cwd();
  
  // 路径定义
  const userConfigPath = path.resolve(rootDir, 'posts/site_config.yml');
  const defaultConfigPath = path.resolve(rootDir, 'site_config.yml');

  let config = {};

  try {
    // 1. 尝试加载用户自定义配置 (posts/site_config.yml)
    if (fs.existsSync(userConfigPath)) {
      console.log('✨ [Config Loader] Found user config in posts/site_config.yml');
      const content = fs.readFileSync(userConfigPath, 'utf-8');
      config = yaml.load(content) || {};
    } 
    // 2. 回退到默认配置 (site_config.yml)
    else if (fs.existsSync(defaultConfigPath)) {
      console.log('ℹ️ [Config Loader] Using default config from site_config.yml');
      const content = fs.readFileSync(defaultConfigPath, 'utf-8');
      config = yaml.load(content) || {};
    } else {
      console.warn('⚠️ [Config Loader] No site_config.yml found! Using empty config.');
    }
  } catch (e) {
    console.error('❌ [Config Loader] Failed to parse configuration file:', e);
  }

  return config;
}
