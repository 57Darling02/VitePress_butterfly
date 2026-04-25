export default interface ThemeConfig {
  // 站点基本配置
  site_name: string;
  site_description: string;
  site_url: string;
  author: string;
  isDark: boolean | null;
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
  position: string;
  bio: string;
  socialLinks: SocialLink[];
  // 页脚
  footer: FooterConfig;
  // 菜单栏
  menuItems: MenuItem[];
  musicPlayer?: MusicPlayerConfig;
  musicTrack?: MusicTrackConfig;
  comments?: CommentsConfig;
  friendlink?: FriendLink[];
}


// 定义子类型
interface HomeConfig {
  mainTitle: string;
  subTitles: string[];
  firstViewHeight: number,
}

interface LastUpdatedConfig {
  use: boolean;
}

interface SearchConfig {
  provider: 'local' | 'algolia';
  options?: Record<string, unknown>;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface FooterConfig {
  message?: string;
  copyright?: string;
  createdTime?: string;
}

interface MenuChildItem {
  key: string;
  label: string;
  icon: string;
  link: string;
}

interface MenuItem {
  label: string;
  icon: string;
  children: MenuChildItem[];
}

interface MusicPlayerConfig {
  enabled: boolean;
  url?: string;
  name?: string;
  artist?: string;
  cover?: string;
  autoplay?: boolean;
  volume?: number;
}

interface MusicTrackConfig {
  url: string;
  name: string;
  artist: string;
  cover: string;
  autoplay?: boolean;
  volume?: number;
}

interface FriendLink {
  Name: string;
  Url: string;
  Avatar: string;
  Desc: string;
}

interface CommentsConfig {
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
