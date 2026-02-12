// import { defineConfig } from 'vitepress'
import ThemeConfig from './theme/ts/ThemeConfig'
import { defineConfigWithTheme } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import mathjax3 from 'markdown-it-mathjax3'
import { loadSiteConfig } from './theme/utils/configLoader'

// 加载配置（不再依赖源码中的 TS 定义，而是直接读取 JSON）
const rawConfig = loadSiteConfig();
// 使用 ThemeConfig 类型断言，确保在编写 config.mts 时有类型提示
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
export default defineConfigWithTheme<ThemeConfig>({
  title: myconfig.site_name || "VitePress-Butterfly",
  description: myconfig.site_description || "VitePress-Butterfly is a VitePress theme inspired by the Butterfly theme.",
  themeConfig: myconfig,
  ignoreDeadLinks: true,
  lastUpdated: true,
  vite: {
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
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
    config: (md) => {
      md.use(mathjax3);
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },

})
