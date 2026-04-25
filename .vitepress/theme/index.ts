// https://vitepress.dev/guide/custom-theme
import { inBrowser, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Layout from './layouts/AppLayout.vue'
import './css/style.css'
import '../static/fontawesome/css/all.min.css'
import useVisitData from './composables/useVisitData'
import { createLayoutState, layoutStateKey } from './composables/useLayoutState'

export default {
  
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注入全局变量
     if (inBrowser) {
      // 路由加载完成，在加载页面组件后（在更新页面组件之前）调用。
      router.onAfterPageLoad = (to: string) => {
        // 调用统计访问接口hooks
        useVisitData()
      }
    }
    app.provide(layoutStateKey, createLayoutState())
  }
} satisfies Theme
