import type ThemeConfig from './theme/types/ThemeConfig'
import { defineConfig, type HeadConfig } from 'vitepress'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadSiteConfig } from './theme/utils/configLoader'
import { injectFirstPaintLoading } from './theme/utils/firstPaintLoading'
import { createSeoConfig } from './theme/utils/seo'
import { fontAwesomeStylesheet, hasFontAwesomeIcons } from './theme/utils/fontAwesome'
import { createThemeIconPlugin } from './theme/utils/themeIconPlugin'
import { createPostCoverPlugin } from './theme/utils/postCoverPlugin'

const myconfig = loadSiteConfig();
const fontAwesomeHead: HeadConfig[] = hasFontAwesomeIcons(myconfig)
  ? [['link', {
      rel: 'stylesheet',
      href: fontAwesomeStylesheet.href,
      integrity: fontAwesomeStylesheet.integrity,
      crossorigin: 'anonymous',
    }]]
  : []
const rewriteTargets = new Map<string, string>();
const postsDir = path.resolve(process.cwd(), 'posts')
const frontmatterLayoutCache = new Map<string, { mtimeMs: number; size: number; layout: string }>()

function rewritePostPath(id: string) {
  if (!id.startsWith('posts/') || !id.endsWith('.md')) return id

  return registerRewriteTarget(id, getPostRewriteTarget(id))
}

function getPostRewriteTarget(id: string) {
  const layout = getMarkdownLayout(id)
  return layout && layout !== 'doc'
    ? getStandalonePageTarget(id)
    : `p/${shortHash(id)}.md`
}

function registerRewriteTarget(id: string, target: string) {
  const owner = rewriteTargets.get(target)
  if (owner && owner !== id) {
    throw new Error(`[Route Rewrite] "${target}" is used by both "${owner}" and "${id}".`)
  }
  rewriteTargets.set(target, id)

  return target
}

function shortHash(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 8)
}

function getStandalonePageTarget(id: string) {
  return id.replace(/^posts\//, '')
}

function getMarkdownLayout(id: string) {
  const filePath = path.resolve(process.cwd(), id)
  const stat = fs.statSync(filePath, { throwIfNoEntry: false })
  if (!stat?.isFile()) return ''

  const cached = frontmatterLayoutCache.get(id)
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    return cached.layout
  }

  const source = fs.readFileSync(filePath, 'utf-8')
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  const layout = match
    ? parseLayout(match[1])
    : ''
  frontmatterLayoutCache.set(id, { mtimeMs: stat.mtimeMs, size: stat.size, layout })

  return layout
}

function parseLayout(frontmatterSource: string) {
  const frontmatter = yaml.load(frontmatterSource)
  return frontmatter && typeof frontmatter === 'object' && !Array.isArray(frontmatter)
    ? String((frontmatter as Record<string, unknown>).layout || '').trim()
    : ''
}

function resolvePostLink(href: string, sourceFile: string) {
  const suffixStart = href.search(/[?#]/)
  const hrefPath = suffixStart === -1 ? href : href.slice(0, suffixStart)
  if (!hrefPath || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(hrefPath)) return

  const decodedPath = decodeLinkPath(hrefPath)
  const targetPath = hrefPath.startsWith('/')
    ? path.resolve(postsDir, decodedPath.slice(1))
    : path.resolve(path.dirname(sourceFile), decodedPath)
  const markdownPath = findMarkdownTarget(targetPath)
  if (!markdownPath) return

  const relativePath = path.relative(postsDir, markdownPath)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return

  const id = `posts/${relativePath.split(path.sep).join('/')}`
  const target = getPostRewriteTarget(id)
  const route = target.replace(/(?:^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return `/${route}${href.slice(hrefPath.length)}`
}

function decodeLinkPath(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function findMarkdownTarget(filePath: string) {
  const candidates = filePath.endsWith('.md')
    ? [filePath]
    : [`${filePath}.md`, path.join(filePath, 'index.md')]

  return candidates.find(candidate => {
    try {
      return fs.statSync(candidate).isFile()
    } catch {
      return false
    }
  })
}

export default defineConfig<ThemeConfig>({
  ...createSeoConfig(myconfig),
  themeConfig: myconfig,
  head: fontAwesomeHead,
  appearance: true,
  cleanUrls: true,
  ignoreDeadLinks: false,
  // The theme data loader owns timestamp caching so it can fall back to mtime
  // when a deployment has no Git metadata.
  lastUpdated: false,
  rewrites: rewritePostPath,
  vite: {
    publicDir: path.resolve(process.cwd(), '.vitepress/content-public'),
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
      createThemeIconPlugin(myconfig),
      createPostCoverPlugin(),
      {
        name: 'first-paint-loading-dev',
        apply: 'serve',
        transformIndexHtml: injectFirstPaintLoading,
      },
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      }),
    ]
  },
  markdown: {
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
    config(md) {
      md.core.ruler.after('inline', 'rewrite-post-links', state => {
        const sourceFile = state.env.realPath
        if (typeof sourceFile !== 'string') return

        for (const token of state.tokens) {
          for (const child of token.children ?? []) {
            if (child.type !== 'link_open') continue

            const href = child.attrGet('href')
            const target = href && resolvePostLink(href, sourceFile)
            if (target) child.attrSet('href', target)
          }
        }
      })
    }
  },
  transformHtml(code) {
    return injectFirstPaintLoading(code)
  },

})
