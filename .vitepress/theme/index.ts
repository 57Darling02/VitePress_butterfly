// https://vitepress.dev/guide/custom-theme
import { inBrowser, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/image-viewer/style/css'
import Layout from './layouts/AppLayout.vue'
import './css/style.css'
import { trackVisit } from './composables/useVisitData'
import { createLayoutState, layoutStateKey } from './composables/useLayoutState'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      router.onAfterRouteChange = () => {
        trackVisit()
      }
    }
    app.provide(layoutStateKey, createLayoutState())
  }
} satisfies Theme
