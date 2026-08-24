export default interface ThemeConfig {
  // 站点基本配置
  site_name: string;
  site_description: string;
  site_url: string;
  lang?: string;
  author: string;
  // 首页配置
  home: HomeConfig;
  background: string;
  bg_rainfall: boolean;
  pageSize: number;
  sortMethod?: "date" | "lastUpdated";
  // 最后更新时间
  lastUpdated: LastUpdatedConfig;
  search?: SearchConfig;
  // 侧边简介卡
  avatar: string;
  name: string;
  signature: string;
  introduction: string;
  socialLinks: SocialLink[];
  // 页脚
  footer: FooterConfig;
  // 菜单栏
  menuItems: MenuItem[];
  musicPlayer?: MusicPlayerConfig;
  musicTrack?: MusicTrackConfig;
  comments?: CommentsConfig;
  friendlink?: FriendLink[];
  outline?: Outline;
}


// 定义子类型
export interface HomeConfig {
  mainTitle: string;
  subTitles: string[];
}

export interface LastUpdatedConfig {
  use: boolean;
  formatOptions?: Intl.DateTimeFormatOptions & {
    forceLocale?: boolean;
  };
}

export interface SearchConfig {
  provider: 'local' | 'algolia';
  options?: Record<string, unknown>;
}

export interface IconReference {
  icon?: string;
  iconUrl?: string;
}

export interface SocialLink extends IconReference {
  name: string;
  url: string;
}

export interface FooterConfig {
  message?: string;
  copyright?: string;
  createdTime?: string;
}

export interface MenuChildItem extends IconReference {
  key: string;
  label: string;
  link: string;
}

export interface MenuItem extends IconReference {
  label: string;
  children?: MenuChildItem[];
  key?: string;
  link?: string;
}

export interface MusicPlayerConfig {
  enabled: boolean;
  url?: string;
  name?: string;
  artist?: string;
  cover?: string;
  autoplay?: boolean;
  volume?: number;
}

export interface MusicTrackConfig {
  url: string;
  name: string;
  artist: string;
  cover: string;
  autoplay?: boolean;
  volume?: number;
}

export interface FriendLink {
  Name: string;
  Url: string;
  Avatar: string;
  Desc: string;
}

export interface CommentsConfig {
  enabled: boolean;
  host?: string;
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  term?: string;
  strict?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  theme?: string;
  lang?: string;
  loading?: string;
}

export type OutlineLevel = number | [number, number] | 'deep';
export type Outline = false | OutlineLevel | { level?: OutlineLevel };
