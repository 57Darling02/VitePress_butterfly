import ThemeConfig from './theme/types/ThemeConfig'
import { defineConfig } from 'vitepress'
import { createHash } from 'node:crypto'
import path from 'node:path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadSiteConfig } from './theme/utils/configLoader'
import { injectFirstPaintLoading } from './theme/utils/firstPaintLoading'

const rawConfig = loadSiteConfig();
const myconfig = rawConfig as ThemeConfig;
const postRewriteTargets = new Map<string, string>();

function rewritePostPath(id: string) {
  if (!id.startsWith('posts/') || !id.endsWith('.md')) return id

  const target = `p/${shortHash(id)}.md`
  const owner = postRewriteTargets.get(target)
  if (owner && owner !== id) {
    throw new Error(`[Post Link] "${target}" is used by both "${owner}" and "${id}".`)
  }
  postRewriteTargets.set(target, id)

  return target
}

function shortHash(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 8)
}


const customElements = [
  'mjx-container',
  'mjx-assistive-mml',
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
];
export default defineConfig<ThemeConfig>({
  title: myconfig.site_name || "VitePress-Butterfly",
  description: myconfig.site_description || "VitePress-Butterfly is a VitePress theme inspired by the Butterfly theme.",
  themeConfig: myconfig,
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  rewrites: rewritePostPath,
  vite: {
    publicDir: path.resolve(process.cwd(), '.vitepress/content-public'),
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
      {
        name: 'first-paint-loading-dev',
        apply: 'serve',
        transformIndexHtml: injectFirstPaintLoading,
      },
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      }
    }
  },
  markdown: {
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  transformHtml(code) {
    return injectFirstPaintLoading(code)
  },

})
