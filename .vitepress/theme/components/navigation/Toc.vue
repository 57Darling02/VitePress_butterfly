<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import TocItems from './TocItems.vue'

const { frontmatter, theme } = useData()

interface TocNode {
  children: TocNode[]
  label: string
  value: string
  level: number
}

type HeaderItem = TocNode & {
  element: HTMLHeadingElement
}

type ActiveHeader = {
  element: HTMLHeadingElement
  value: string
}

type HeaderResult = {
  headers: TocNode[]
  activeHeaders: ActiveHeader[]
}

const headers = shallowRef<TocNode[]>([])
const activeHeaders = shallowRef<ActiveHeader[]>([])
const activeAnchor = ref('')
const isReady = ref(false)
const scrollContainer = ref<HTMLElement | Window | null>(null)
const scrollTocContainer = ref()

const ignoreHeaderChildRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/
const tocScrollOffset = 64
let activeUpdateTimer: number | undefined

const getScrollContainer = (): HTMLElement | Window | null => {
  if (typeof window === 'undefined') return null
  return document.querySelector<HTMLElement>('.app-scrollbar > .el-scrollbar__wrap')
    || document.querySelector<HTMLElement>('.el-scrollbar__wrap')
    || window
}

const normalizeAnchor = (anchor: string): string => {
  if (!anchor) return ''
  const hashIndex = anchor.indexOf('#')
  return hashIndex >= 0 ? anchor.slice(hashIndex) : anchor
}

const getAnchorId = (anchor: string): string => {
  const normalized = normalizeAnchor(anchor)
  return normalized ? decodeURIComponent(normalized.slice(1)) : ''
}

const serializeHeader = (el: HTMLHeadingElement): string => {
  let text = ''

  for (const node of el.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as HTMLElement
      if (ignoreHeaderChildRE.test(child.className)) continue
      text += child.textContent
    } else if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent
    }
  }

  return text.trim()
}

const getHeaders = (range: any): HeaderResult => {
  if (range === false) {
    return { headers: [], activeHeaders: [] }
  }

  const headerData = Array.from(
    document.querySelectorAll<HTMLHeadingElement>('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
  )
    .filter(el => el.id && el.hasChildNodes())
    .map<HeaderItem>(el => ({
      label: serializeHeader(el),
      value: `#${el.id}`,
      level: Number(el.tagName[1]),
      element: el,
      children: []
    }))

  return resolveHeaders(headerData, range)
}

const resolveHeaders = (headerItems: HeaderItem[], range: any): HeaderResult => {
  const levelsRange = (typeof range === 'object' && !Array.isArray(range)
    ? range.level
    : range) || 2

  const [high, low] = typeof levelsRange === 'number'
    ? [levelsRange, levelsRange]
    : levelsRange === 'deep'
      ? [2, 6]
      : levelsRange

  return buildTree(headerItems, high, low)
}

const buildTree = (data: HeaderItem[], min: number, max: number): HeaderResult => {
  const result: TocNode[] = []
  const activeItems: ActiveHeader[] = []
  const stack: Array<{
    ignored: boolean
    level: number
    node: TocNode
  }> = []

  data.forEach(item => {
    const node: TocNode = {
      label: item.label,
      value: item.value,
      level: item.level,
      children: []
    }
    let parent = stack[stack.length - 1]

    while (parent && parent.level >= item.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    const ignored = item.element.classList.contains('ignore-header') || Boolean(parent?.ignored)

    if (ignored) {
      stack.push({ ignored: true, level: item.level, node })
      return
    }

    if (item.level > max || item.level < min) return

    if (parent) {
      parent.node.children.push(node)
    } else {
      result.push(node)
    }

    activeItems.push({ element: item.element, value: item.value })
    stack.push({ ignored: false, level: item.level, node })
  })

  return { headers: result, activeHeaders: activeItems }
}

const refreshHeaders = (): void => {
  const result = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep')
  headers.value = result.headers
  activeHeaders.value = result.activeHeaders
  isReady.value = true
}

const getTocScrollWrap = (): HTMLElement | null => {
  return scrollTocContainer.value?.wrapRef
    || scrollTocContainer.value?.$el?.querySelector?.('.el-scrollbar__wrap')
    || null
}

const getContainerScrollTop = (container: HTMLElement | Window): number => {
  return container === window ? window.scrollY : container.scrollTop
}

const getContainerHeight = (container: HTMLElement | Window): number => {
  return container === window ? window.innerHeight : container.clientHeight
}

const getContainerScrollHeight = (container: HTMLElement | Window): number => {
  return container === window ? document.documentElement.scrollHeight : container.scrollHeight
}

const getHeaderTop = (element: HTMLElement, container: HTMLElement | Window): number => {
  if (container === window) {
    return element.getBoundingClientRect().top + window.scrollY
  }

  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return elementRect.top - containerRect.top + container.scrollTop
}

const setActiveAnchor = (anchor: string, scrollToc = true): void => {
  const normalized = normalizeAnchor(anchor)
  if (activeAnchor.value === normalized) return

  activeAnchor.value = normalized
  if (scrollToc) {
    nextTick(() => move2current_anchor(false))
  }
}

const updateActiveAnchor = (): void => {
  if (typeof window === 'undefined') return

  const container = scrollContainer.value || window
  const items = activeHeaders.value
  if (!items.length) {
    setActiveAnchor('', false)
    return
  }

  const scrollTop = getContainerScrollTop(container)
  const scrollHeight = getContainerScrollHeight(container)
  const viewportHeight = getContainerHeight(container)
  const isBottom = Math.abs(scrollTop + viewportHeight - scrollHeight) < 2

  if (scrollTop < 1) {
    setActiveAnchor('', false)
    return
  }

  if (isBottom) {
    setActiveAnchor(items[items.length - 1].value)
    return
  }

  const threshold = scrollTop + tocScrollOffset + 4
  let current = ''

  for (const item of items) {
    if (getHeaderTop(item.element, container) > threshold) break
    current = item.value
  }

  setActiveAnchor(current)
}

const scheduleActiveUpdate = (): void => {
  if (typeof window === 'undefined' || activeUpdateTimer !== undefined) return

  activeUpdateTimer = window.setTimeout(() => {
    activeUpdateTimer = undefined
    updateActiveAnchor()
  }, 100)
}

const scrollToAnchor = (anchor: string, smooth = true): void => {
  if (typeof window === 'undefined') return

  const target = document.getElementById(getAnchorId(anchor))
  const container = scrollContainer.value || window
  if (!target) return

  const top = getHeaderTop(target, container) - tocScrollOffset
  container.scrollTo({
    top,
    behavior: smooth ? 'smooth' : 'auto'
  })
}

const clearLocationHash = (): void => {
  if (typeof window === 'undefined' || !window.location.hash) return

  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`
  )
}

const handleNavigate = (anchor: string): void => {
  const normalized = normalizeAnchor(anchor)
  if (!normalized) return

  clearLocationHash()
  setActiveAnchor(normalized)
  scrollToAnchor(normalized)
}

const move2current_anchor = (smooth = true): void => {
  const current = activeAnchor.value || normalizeAnchor(window.location.hash)
  if (!current) return

  const tocScrollWrap = getTocScrollWrap()
  const nodeEl = Array.from(tocScrollWrap?.querySelectorAll<HTMLElement>('.toc-link') ?? [])
    .find(link => link.getAttribute('href') === current)
  if (!tocScrollWrap || !nodeEl) return

  const containerRect = tocScrollWrap.getBoundingClientRect()
  const nodeRect = nodeEl.getBoundingClientRect()
  const nodeTop = nodeRect.top - containerRect.top + tocScrollWrap.scrollTop
  const nodeBottom = nodeRect.bottom - containerRect.top + tocScrollWrap.scrollTop
  const isVisible = (
    nodeTop >= tocScrollWrap.scrollTop &&
    nodeBottom <= tocScrollWrap.scrollTop + containerRect.height
  )

  if (!isVisible) {
    tocScrollWrap.scrollTo({
      top: Math.max(0, nodeTop - containerRect.height / 2),
      behavior: smooth ? 'smooth' : 'auto'
    })
  }
}

const syncAfterRender = (): void => {
  nextTick(() => {
    const currentHash = typeof window === 'undefined' ? '' : normalizeAnchor(window.location.hash)
    if (currentHash && document.getElementById(getAnchorId(currentHash))) {
      setActiveAnchor(currentHash, false)
      nextTick(() => move2current_anchor(false))
      return
    }

    updateActiveAnchor()
  })
}

const addScrollListener = (): void => {
  if (typeof window === 'undefined') return

  const container = scrollContainer.value || window
  container.addEventListener('scroll', scheduleActiveUpdate, { passive: true })
}

const removeScrollListener = (): void => {
  if (typeof window === 'undefined') return

  if (activeUpdateTimer !== undefined) {
    window.clearTimeout(activeUpdateTimer)
    activeUpdateTimer = undefined
  }

  const container = scrollContainer.value || window
  container.removeEventListener('scroll', scheduleActiveUpdate)
}

onMounted(() => {
  scrollContainer.value = getScrollContainer()
  refreshHeaders()
  addScrollListener()
  syncAfterRender()
})

onContentUpdated(() => {
  refreshHeaders()
  syncAfterRender()
})

onBeforeUnmount(() => {
  removeScrollListener()
})
</script>

<template>
  <nav class="toc" aria-labelledby="toc-title">
    <div class="toc-header">
      <span id="toc-title" class="toc-title">大纲</span>
      <el-button
        class="toc-locate"
        text
        circle
        size="small"
        :disabled="!activeAnchor"
        title="定位当前标题"
        @click="move2current_anchor()"
      >
        <i class="fa-solid fa-crosshairs" aria-hidden="true" />
      </el-button>
    </div>

    <el-scrollbar
      v-if="headers.length"
      ref="scrollTocContainer"
      class="toc-scroll"
      max-height="calc(var(--toc-max-height, 40vh) - var(--toc-header-space, 33px) - var(--toc-padding-y, 0px))"
    >
      <TocItems
        :items="headers"
        :active-anchor="activeAnchor"
        root
        @navigate="handleNavigate"
      />
    </el-scrollbar>
    <el-skeleton v-else-if="!isReady" class="toc-skeleton" :rows="6" animated />
  </nav>
</template>

<style lang="scss" scoped>
.toc {
  min-height: 0;
  max-height: var(--toc-max-height, 40vh);
  --toc-header-space: 33px;
  --toc-padding-y: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 25px;
  flex: 0 0 25px;
  margin-bottom: 8px;
}

.toc-title {
  font-weight: 600;
}

.toc-locate {
  flex: 0 0 auto;
  background-color: transparent;
}

.toc-scroll {
  height: auto;
  min-height: 0;
  flex: 0 1 auto;
}

.toc-skeleton {
  padding: 8px;
}
</style>
