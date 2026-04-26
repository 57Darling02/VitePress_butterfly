import ThemeConfig from './theme/types/ThemeConfig'
import { defineConfig } from 'vitepress'
import path from 'node:path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadSiteConfig } from './theme/utils/configLoader'

const rawConfig = loadSiteConfig();
const myconfig = rawConfig as ThemeConfig;


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
  vite: {
    publicDir: path.resolve(process.cwd(), '.vitepress/content-public'),
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
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

})
