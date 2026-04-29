import fs from 'node:fs/promises'
import path from 'node:path'
import type { HeadConfig, SiteConfig, TransformContext, UserConfig } from 'vitepress'
import type ThemeConfig from '../types/ThemeConfig'

type SeoConfig = Pick<
  UserConfig<ThemeConfig>,
  'lang' | 'title' | 'description' | 'sitemap' | 'transformHead' | 'buildEnd'
>

const defaultTitle = 'VitePress-Butterfly'
const defaultDescription = 'VitePress-Butterfly is a VitePress theme inspired by the Butterfly theme.'

export function createSeoConfig(themeConfig: ThemeConfig): SeoConfig {
  const title = themeConfig.site_name || defaultTitle
  const description = themeConfig.site_description || defaultDescription
  const siteUrl = normalizeSiteUrl(themeConfig.site_url)

  return {
    lang: themeConfig.lang || 'zh-CN',
    title,
    description,
    sitemap: siteUrl
      ? {
          hostname: siteUrl.href,
          transformItems(items) {
            return items.filter((item) => item.url !== 'README').map((item) => {
              const url = item.url || '/'

              return {
                ...item,
                changefreq: url === '/' ? 'weekly' : 'monthly',
                priority: url === '/' ? 1 : url.startsWith('p/') ? 0.8 : 0.6,
              }
            })
          },
        }
      : undefined,
    transformHead: (ctx) => createSeoHead(ctx, themeConfig, title, description, siteUrl),
    buildEnd: (siteConfig) => writeRobotsTxt(siteConfig, siteUrl),
  }
}

function normalizeSiteUrl(value?: string) {
  if (!value || value === '/') return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    if (!url.pathname.endsWith('/')) url.pathname += '/'
    return url
  } catch {
    console.warn(`[SEO] Invalid site_url "${value}". Sitemap, robots.txt and canonical links are disabled.`)
    return null
  }
}

function createSeoHead(
  ctx: TransformContext<ThemeConfig>,
  themeConfig: ThemeConfig,
  siteTitle: string,
  siteDescription: string,
  siteUrl: URL | null,
): HeadConfig[] {
  const frontmatter = ctx.pageData.frontmatter || {}
  const title = ctx.title || frontmatter.title || siteTitle
  const description = frontmatter.description || ctx.description || siteDescription
  const canonicalUrl = resolveCanonicalUrl(ctx.page, siteUrl)
  const head: HeadConfig[] = [
    ['meta', { name: 'author', content: frontmatter.author || themeConfig.author || siteTitle }],
    ['meta', { property: 'og:type', content: frontmatter.layout === 'doc' ? 'article' : 'website' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
  ]

  if (canonicalUrl) {
    head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
    )
  }

  if (frontmatter.noindex || frontmatter.robots === false) {
    head.push(['meta', { name: 'robots', content: 'noindex,nofollow' }])
  }

  return head
}

function resolveCanonicalUrl(page: string, siteUrl: URL | null) {
  if (!siteUrl) return ''

  const pagePath = page
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
    .replace(/^\/+/, '')

  return new URL(pagePath, siteUrl).href
}

async function writeRobotsTxt(siteConfig: SiteConfig<ThemeConfig>, siteUrl: URL | null) {
  if (!siteUrl) {
    console.warn('[SEO] Set site_url to an absolute URL to generate sitemap.xml and robots.txt.')
    return
  }

  const robots = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${new URL('sitemap.xml', siteUrl).href}`,
    `Host: ${siteUrl.hostname}`,
    '',
  ].join('\n')

  await fs.writeFile(path.join(siteConfig.outDir, 'robots.txt'), robots, 'utf-8')
}
