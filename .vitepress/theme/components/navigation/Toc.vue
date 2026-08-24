<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  type CSSProperties,
} from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import type ThemeConfig from '../../types/ThemeConfig'
import type { Outline, OutlineLevel } from '../../types/ThemeConfig'
import { anchorNavigatorKey, getAnchorScrollOffset, normalizeHash } from '../../utils/anchor'
import ThemeIcon from '../ThemeIcon.vue'

defineOptions({ inheritAttrs: false })

const { frontmatter, theme } = useData<ThemeConfig>()
const navigateToHash = inject(anchorNavigatorKey)

interface HeaderItem {
  element: HTMLHeadingElement
  label: string
  level: number
  value: string
}

interface TocEntry extends HeaderItem {
  depth: number
}

interface HeaderPosition {
  top: number
  value: string
}

interface ScrollbarInstance {
  $el?: HTMLElement
  wrapRef?: HTMLElement
}

const headers = shallowRef<TocEntry[]>([])
const activeAnchor = ref('')
const visibleAnchors = shallowRef<string[]>([])
const isReady = ref(false)
const scrollContainer = ref<HTMLElement | Window | null>(null)
const scrollTocContainer = ref<ScrollbarInstance>()
const tocContent = ref<HTMLElement | null>(null)
const activeRangeStyle = ref<CSSProperties>({
  height: '0px',
  opacity: '0',
  transform: 'translateY(0)'
})
const visualAnchors = computed(() => {
  return visibleAnchors.value.length
    ? visibleAnchors.value
    : activeAnchor.value ? [activeAnchor.value] : []
})

const ignoreHeaderChildRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/
const MAX_TOC_LEVEL = 5
const TOC_SCROLL_SAFE_INSET = 24

let headerPositions: HeaderPosition[] = []
let headingObserver: IntersectionObserver | undefined
let layoutObserver: ResizeObserver | undefined
let visibleAnchorSet = new Set<string>()
let activeUpdateFrame: number | undefined
let layoutUpdateFrame: number | undefined
let rangeUpdateFrame: number | undefined
let refreshVersion = 0
let tocScrollOffset = getAnchorScrollOffset()

const getScrollContainer = (): HTMLElement | Window | null => {
  if (typeof window === 'undefined') return null

  return document.querySelector<HTMLElement>('.app-scrollbar > .el-scrollbar__wrap') || window
}

const serializeHeader = (element: HTMLHeadingElement): string => {
  let text = ''

  for (const node of element.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as HTMLElement
      if (ignoreHeaderChildRE.test(child.className)) continue
      text += child.textContent ?? ''
    } else if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? ''
    }
  }

  return text.trim()
}

const resolveOutlineRange = (range: Exclude<Outline, false>): [number, number] => {
  const levels: OutlineLevel = (typeof range === 'object' && !Array.isArray(range)
    ? range.level
    : range) || 2

  if (typeof levels === 'number') return [levels, levels]
  return levels === 'deep' ? [2, 6] : levels
}

const buildHeaders = (items: HeaderItem[], minLevel: number, maxLevel: number): TocEntry[] => {
  const ignoredLevels: number[] = []
  const includedItems: HeaderItem[] = []

  for (const item of items) {
    while (ignoredLevels.length && ignoredLevels[ignoredLevels.length - 1] >= item.level) {
      ignoredLevels.pop()
    }

    if (item.element.classList.contains('ignore-header')) {
      ignoredLevels.push(item.level)
      continue
    }

    if (ignoredLevels.length || item.level < minLevel || item.level > maxLevel) continue
    includedItems.push(item)
  }

  if (!includedItems.length) return []

  const baseLevel = Math.min(...includedItems.map(item => item.level))
  return includedItems.map(item => ({
    ...item,
    depth: Math.min(3, Math.max(0, item.level - baseLevel))
  }))
}

const getHeaders = (outline: Outline): TocEntry[] => {
  if (outline === false) return []

  const items = Array.from(
    document.querySelectorAll<HTMLHeadingElement>('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
  )
    .filter(element => element.id && element.hasChildNodes())
    .map<HeaderItem>(element => ({
      element,
      label: serializeHeader(element),
      level: Number(element.tagName[1]),
      value: `#${element.id}`
    }))

  const [minLevel, maxLevel] = resolveOutlineRange(outline)
  return buildHeaders(items, minLevel, Math.min(maxLevel, MAX_TOC_LEVEL))
}

const getTocScrollWrap = (): HTMLElement | null => {
  return scrollTocContainer.value?.wrapRef
    || scrollTocContainer.value?.$el?.querySelector<HTMLElement>('.el-scrollbar__wrap')
    || null
}

const getContainerScrollTop = (container: HTMLElement | Window): number => {
  return container === window ? window.scrollY : container.scrollTop
}

const getHeaderTop = (element: HTMLElement, container: HTMLElement | Window): number => {
  if (container === window) return element.getBoundingClientRect().top + window.scrollY

  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return elementRect.top - containerRect.top + container.scrollTop
}

const reducedMotion = (): boolean => {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

const scrollBehavior = (smooth: boolean): ScrollBehavior => {
  return smooth && !reducedMotion() ? 'smooth' : 'auto'
}

const getTocLink = (anchor: string): HTMLAnchorElement | undefined => {
  return Array.from(tocContent.value?.querySelectorAll<HTMLAnchorElement>('.toc-link') ?? [])
    .find(link => link.getAttribute('href') === anchor)
}

const scheduleRangeUpdate = (): void => {
  if (typeof window === 'undefined' || rangeUpdateFrame !== undefined) return

  rangeUpdateFrame = window.requestAnimationFrame(() => {
    rangeUpdateFrame = undefined
    updateActiveRange()
  })
}

const setActiveRangeHidden = (): void => {
  activeRangeStyle.value = {
    height: '0px',
    opacity: '0',
    transform: 'translateY(0)'
  }
}

const updateActiveRange = (): void => {
  const content = tocContent.value
  if (!content?.clientWidth) return

  const getRangeLinks = (anchors: string[]): HTMLAnchorElement[] => {
    return anchors.map(getTocLink).filter((link): link is HTMLAnchorElement => Boolean(link))
  }

  const links = getRangeLinks(visualAnchors.value)

  if (!links.length) {
    setActiveRangeHidden()
    return
  }

  const firstLink = links[0]
  const lastLink = links[links.length - 1]
  const top = firstLink.offsetTop
  const height = lastLink.offsetTop + lastLink.offsetHeight - top

  activeRangeStyle.value = {
    height: `${height}px`,
    opacity: '1',
    transform: `translateY(${top}px)`
  }
}

const moveToCurrentAnchor = (smooth = true): void => {
  const current = activeAnchor.value || normalizeHash(window.location.hash)
  if (!current) return

  const tocScrollWrap = getTocScrollWrap()
  const link = getTocLink(current)
  if (!tocScrollWrap || !link) return

  const containerRect = tocScrollWrap.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()
  const viewportHeight = tocScrollWrap.clientHeight
  if (!viewportHeight) return

  const linkTop = linkRect.top - containerRect.top + tocScrollWrap.scrollTop
  const linkBottom = linkRect.bottom - containerRect.top + tocScrollWrap.scrollTop
  const centerOffset = Math.max(0, (viewportHeight - linkRect.height) / 2)
  const safeInset = Math.min(TOC_SCROLL_SAFE_INSET, centerOffset)
  const isComfortablyVisible = (
    linkTop >= tocScrollWrap.scrollTop + safeInset
    && linkBottom <= tocScrollWrap.scrollTop + viewportHeight - safeInset
  )

  if (!isComfortablyVisible) {
    tocScrollWrap.scrollTo({
      top: Math.max(0, linkTop - centerOffset),
      behavior: scrollBehavior(smooth)
    })
  }
}

const setActiveAnchor = (anchor: string, scrollToc = true): void => {
  const normalized = normalizeHash(anchor)
  if (activeAnchor.value === normalized) return

  activeAnchor.value = normalized
  scheduleRangeUpdate()
  if (scrollToc) nextTick(() => moveToCurrentAnchor(false))
}

const cacheHeaderPositions = (): void => {
  const container = scrollContainer.value
  if (!container) return

  headerPositions = headers.value
    .map(({ element, value }) => ({ value, top: getHeaderTop(element, container) }))
    .sort((first, second) => first.top - second.top)
}

const findActiveAnchor = (): string => {
  const container = scrollContainer.value
  if (!container || !headerPositions.length || getContainerScrollTop(container) < 1) return ''

  const threshold = getContainerScrollTop(container) + tocScrollOffset + 4
  let low = 0
  let high = headerPositions.length - 1
  let result = ''

  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    const item = headerPositions[middle]

    if (item.top <= threshold) {
      result = item.value
      low = middle + 1
    } else {
      high = middle - 1
    }
  }

  return result
}

const updateActiveAnchor = (scrollToc = true): void => {
  setActiveAnchor(findActiveAnchor(), scrollToc)
}

const scheduleActiveUpdate = (): void => {
  if (typeof window === 'undefined' || activeUpdateFrame !== undefined) return

  activeUpdateFrame = window.requestAnimationFrame(() => {
    activeUpdateFrame = undefined
    updateActiveAnchor()
  })
}

const scheduleLayoutUpdate = (): void => {
  if (typeof window === 'undefined' || layoutUpdateFrame !== undefined) return

  layoutUpdateFrame = window.requestAnimationFrame(() => {
    layoutUpdateFrame = undefined
    cacheHeaderPositions()
    updateActiveAnchor(false)
    updateActiveRange()
  })
}

const handleHeadingIntersection = (entries: IntersectionObserverEntry[]): void => {
  for (const entry of entries) {
    const anchor = `#${(entry.target as HTMLHeadingElement).id}`
    if (entry.isIntersecting) visibleAnchorSet.add(anchor)
    else visibleAnchorSet.delete(anchor)
  }

  visibleAnchors.value = headers.value
    .filter(({ value }) => visibleAnchorSet.has(value))
    .map(({ value }) => value)
  scheduleRangeUpdate()
}

const observeHeadings = (): void => {
  if (!headers.value.length || !('IntersectionObserver' in window)) return

  const container = scrollContainer.value
  headingObserver = new IntersectionObserver(handleHeadingIntersection, {
    root: container instanceof HTMLElement ? container : null,
    rootMargin: `-${tocScrollOffset}px 0px 0px`,
    threshold: 0
  })

  headers.value.forEach(({ element }) => headingObserver?.observe(element))
}

const observeLayout = (): void => {
  if (!('ResizeObserver' in window)) return

  layoutObserver = new ResizeObserver(scheduleLayoutUpdate)
  const article = document.querySelector<HTMLElement>('.vp-doc')
  const container = scrollContainer.value

  if (article) layoutObserver.observe(article)
  if (container instanceof HTMLElement) layoutObserver.observe(container)
  if (tocContent.value) layoutObserver.observe(tocContent.value)
}

const disconnectObservers = (): void => {
  headingObserver?.disconnect()
  layoutObserver?.disconnect()
  headingObserver = undefined
  layoutObserver = undefined
}

const refreshHeaders = (): void => {
  if (typeof window === 'undefined') return

  const version = ++refreshVersion
  disconnectObservers()
  tocScrollOffset = getAnchorScrollOffset()
  const outline = (frontmatter.value.outline ?? theme.value.outline ?? 'deep') as Outline
  headers.value = getHeaders(outline)
  headerPositions = []
  visibleAnchorSet = new Set()
  visibleAnchors.value = []
  activeAnchor.value = ''
  setActiveRangeHidden()
  isReady.value = true

  nextTick(() => {
    if (version !== refreshVersion) return

    cacheHeaderPositions()
    observeHeadings()
    observeLayout()

    const hash = normalizeHash(window.location.hash)
    const hasHashTarget = headers.value.some(({ value }) => value === hash)
    updateActiveAnchor(false)
    if (hasHashTarget) setActiveAnchor(hash, false)
    scheduleRangeUpdate()
  })
}

const syncLocationHash = (): void => {
  const anchor = normalizeHash(window.location.hash)
  setActiveAnchor(
    headers.value.some(({ value }) => value === anchor) ? anchor : '',
    false,
  )
}

const isModifiedClick = (event: MouseEvent): boolean => (
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
)

const handleAnchorClick = (anchor: string, event: MouseEvent): void => {
  const normalized = normalizeHash(anchor)
  if (!normalized || !navigateToHash || isModifiedClick(event)) return

  // An explicit target lets this handler own same-page hash navigation.
  event.preventDefault()
  setActiveAnchor(normalized)
  navigateToHash(normalized)
}

const addScrollListener = (): void => {
  scrollContainer.value?.addEventListener('scroll', scheduleActiveUpdate, { passive: true })
}

const removeScrollListener = (): void => {
  scrollContainer.value?.removeEventListener('scroll', scheduleActiveUpdate)
}

onMounted(() => {
  scrollContainer.value = getScrollContainer()
  addScrollListener()
  window.addEventListener('hashchange', syncLocationHash)
  refreshHeaders()
})

onContentUpdated(() => {
  refreshHeaders()
})

onBeforeUnmount(() => {
  refreshVersion += 1
  disconnectObservers()
  removeScrollListener()
  window.removeEventListener('hashchange', syncLocationHash)

  if (activeUpdateFrame !== undefined) window.cancelAnimationFrame(activeUpdateFrame)
  if (layoutUpdateFrame !== undefined) window.cancelAnimationFrame(layoutUpdateFrame)
  if (rangeUpdateFrame !== undefined) window.cancelAnimationFrame(rangeUpdateFrame)
})
</script>

<template>
  <nav
    v-if="!isReady || headers.length"
    v-bind="$attrs"
    class="toc"
    :class="{ 'has-active-range': visualAnchors.length > 0 }"
    aria-labelledby="toc-title"
  >
    <div class="toc-header">
      <span id="toc-title" class="toc-title">目录</span>
      <el-button
        class="toc-locate"
        text
        circle
        size="small"
        :disabled="!activeAnchor"
        title="定位当前标题"
        aria-label="定位当前标题"
        @click="moveToCurrentAnchor()"
      >
        <ThemeIcon name="crosshair" />
      </el-button>
    </div>

    <el-scrollbar
      v-if="headers.length"
      ref="scrollTocContainer"
      class="toc-scroll"
      max-height="calc(var(--toc-max-height, 40vh) - var(--toc-header-space, 33px) - var(--toc-padding-y, 0px))"
    >
      <div ref="tocContent" class="toc-content">
        <span class="toc-active-range" :style="activeRangeStyle" aria-hidden="true" />
        <ul class="toc-list" aria-label="文章目录">
          <li
            v-for="item in headers"
            :key="item.value"
            class="toc-item"
            :class="`toc-depth-${item.depth}`"
          >
            <a
              class="toc-link"
              :class="{ 'is-visible': visualAnchors.includes(item.value) }"
              :aria-current="item.value === activeAnchor ? 'location' : undefined"
              :href="item.value"
              target="_self"
              :title="item.label"
              @click="handleAnchorClick(item.value, $event)"
            >
              <span class="toc-marker" aria-hidden="true" />
              <span class="toc-label">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </el-scrollbar>
    <el-skeleton v-else-if="!isReady" class="toc-skeleton" :rows="6" animated />
  </nav>
  <slot v-else name="empty" />
</template>

<style lang="scss" scoped>
.toc {
  --toc-header-space: 33px;
  --toc-hover-bg: color-mix(in srgb, var(--vp-c-brand) 8%, transparent);
  --toc-marker-muted: color-mix(in srgb, var(--vp-c-brand) 30%, var(--vp-c-divider));
  --toc-range-bg: color-mix(in srgb, var(--vp-c-brand) 12%, transparent);
  --toc-muted-opacity: 1;
  --toc-muted-blur: 0px;

  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: var(--toc-max-height, 40vh);
  overflow: hidden;
}

.toc.has-active-range {
  --toc-muted-opacity: 0.42;
  --toc-muted-blur: 0.6px;
}

.toc.has-active-range:hover,
.toc.has-active-range:focus-within {
  --toc-muted-opacity: 1;
  --toc-muted-blur: 0px;
}

:global(.dark) .toc {
  --toc-hover-bg: color-mix(in srgb, var(--vp-c-brand) 13%, transparent);
  --toc-marker-muted: color-mix(in srgb, var(--vp-c-brand) 42%, var(--vp-c-divider));
  --toc-range-bg: color-mix(in srgb, var(--vp-c-brand) 18%, transparent);
}

.toc-header {
  display: flex;
  flex: 0 0 25px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 25px;
  margin-bottom: 8px;
}

.toc-title {
  position: relative;
  margin-left: 0.9rem;
  font-weight: 600;
}

.toc-title::before {
  position: absolute;
  top: 50%;
  left: -0.72rem;
  width: 0.22rem;
  height: 1rem;
  border-radius: 999px;
  background: var(--vp-c-brand);
  content: '';
  transform: translateY(-50%);
}

.toc-locate {
  flex: 0 0 auto;
  background-color: transparent;
}

.toc-scroll {
  flex: 0 1 auto;
  min-height: 0;
}

.toc-content {
  position: relative;
  min-width: 0;
  padding: 2px 0;
}

.toc-active-range {
  position: absolute;
  z-index: 0;
  inset: 0 auto auto 0;
  width: 100%;
  border-radius: 9px;
  background: var(--toc-range-bg);
  box-shadow: 0 6px 18px -15px color-mix(in srgb, var(--vp-c-brand) 58%, transparent);
  pointer-events: none;
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.14s ease;
}

.toc-list {
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  gap: 3px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: toc-index;
}

.toc-item {
  min-width: 0;
}

.toc-item.toc-depth-0 {
  counter-increment: toc-index;
}

.toc-link {
  position: relative;
  display: block;
  min-width: 0;
  min-height: 2.2rem;
  padding: 0.48rem 0.62rem;
  border-radius: 9px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  text-decoration: none;
  transition:
    background-color 0.16s ease,
    color 0.16s ease,
    filter 0.18s ease,
    opacity 0.18s ease,
    transform 0.16s ease;
}

.toc-link:not(.is-visible) {
  filter: blur(var(--toc-muted-blur));
  opacity: var(--toc-muted-opacity);
}

.toc-link:hover {
  background: var(--toc-hover-bg);
  color: var(--vp-c-text-1);
  transform: translateX(1px);
}

.toc-link:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.toc-link.is-visible {
  color: var(--vp-c-text-1);
}

.toc-marker {
  position: absolute;
  top: 50%;
  left: 0.62rem;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: var(--toc-marker-muted);
  transform: translateY(-50%);
  transition: background-color 0.16s ease;
}

.toc-item:not(.toc-depth-0) .toc-link.is-visible .toc-marker {
  background: var(--vp-c-brand);
}

.toc-depth-0 .toc-link {
  padding-left: 2.52rem;
  font-weight: 500;
}

.toc-depth-0 .toc-marker {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 0.5rem;
  background: var(--toc-marker-muted);
  color: var(--vp-c-bg);
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;
}

.toc-depth-0 .toc-marker::before {
  content: counter(toc-index);
}

.toc-depth-1 .toc-link {
  padding-left: 3.06rem;
}

.toc-depth-1 .toc-marker {
  left: 2.15rem;
}

.toc-depth-2 .toc-link {
  padding-left: 3.6rem;
}

.toc-depth-2 .toc-marker {
  left: 2.69rem;
}

.toc-depth-3 .toc-link {
  padding-left: 4.14rem;
}

.toc-depth-3 .toc-marker {
  left: 3.23rem;
}

.toc-label {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-skeleton {
  padding: 8px;
}

@media (max-width: 748px) {
  .toc.has-active-range {
    --toc-muted-opacity: 1;
    --toc-muted-blur: 0px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toc-active-range,
  .toc-link {
    transition: none;
  }
}
</style>
