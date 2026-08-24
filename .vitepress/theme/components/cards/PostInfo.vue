<template>
  <HeroSurface class="article-header" :cover="cover">
    <header class="article-header-content">
      <div class="header-title">
        <h1>{{ title }}</h1>
      </div>

      <div class="meta-info">
        <span class="meta-item">
          <ThemeIcon name="user" />
          <span>{{ author }}</span>
        </span>
        <span class="divider" />
        <span class="meta-item">
          <ThemeIcon name="eye" />
          <span>{{ pageViewsText }}次</span>
        </span>
        <span class="divider" />
        <time class="meta-item" :datetime="date">
          <ThemeIcon name="upload" />
          <span>发布于&nbsp;{{ formattedDate }}</span>
        </time>
        <span v-if="lastUpdated" class="divider" />
        <VPDocFooterLastUpdated v-if="lastUpdated" class="meta-item" :lastUpdated="lastUpdated" />
      </div>
    </header>
  </HeroSurface>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../data/posts.data.ts'
import VPDocFooterLastUpdated from '../controls/VPDocFooterLastUpdated.vue'
import ThemeIcon from '../ThemeIcon.vue'
import HeroSurface from '../HeroSurface.vue'
import type ThemeConfig from '../../types/ThemeConfig'
import { useVisitData } from '../../composables/useVisitData'
import { resolvePostCover } from 'virtual:post-covers'

const { frontmatter, theme, page, lang } = useData<ThemeConfig>()
const { visitData } = useVisitData()
const isMounted = ref(false)

const toText = (value: unknown, fallback = '') => value == null ? fallback : String(value)
const title = computed(() => toText(frontmatter.value.title, 'Untitled Article'))
const author = computed(() => toText(frontmatter.value.author, theme.value.author || 'Unknown Author'))
const date = computed(() => toText(frontmatter.value.date))
const currentPath = computed(() => normalizeRoute(page.value.relativePath))
const post = computed(() => posts.find(post => normalizeRoute(post.link) === currentPath.value))
const cover = computed(() => (
  resolvePostCover(
    post.value?.sourceFile || page.value.filePath,
    post.value?.cover || toText(frontmatter.value.cover).trim(),
  )
))
const pageViewsText = computed(() => {
  const value = visitData.value?.page_pv
  if (!isMounted.value || value === undefined) return '--'

  return new Intl.NumberFormat(lang.value || 'zh-CN').format(value)
})
const pageLastUpdated = computed(() => {
  const value = (page.value as unknown as Record<string, unknown>).lastUpdated
  return typeof value === 'number' ? value : undefined
})
const lastUpdated = computed(() => post.value?.lastUpdated ?? pageLastUpdated.value)

function normalizeRoute(path = '') {
  const normalized = String(path)
    .replace(/[?#].*$/, '')
    .replace(/^\/+/, '')
    .replace(/\.(?:html|md)$/, '')
    .replace(/(^|\/)index$/, '$1')

  return normalized ? `/${normalized}` : '/'
}

const formattedDate = computed(() => {
  if (!isMounted.value) return ''
  if (!date.value) return 'Unknown date'
  try {
    return new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    ).format(new Date(date.value))
  } catch {
    return 'Invalid date'
  }
})

onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped>
.article-header-content {
  width: min(calc(100% - 3rem), 900px);
  margin: 0 auto;
  padding: 4rem 0 4.5rem;
  animation: article-header-enter 440ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.header-title {
  margin: 0;
}

.header-title h1 {
  margin: 0;
  font-size: 2.75rem;
  font-weight: 600;
  line-height: 1.28;
  text-wrap: balance;
  text-shadow: 0 1px 18px rgba(var(--vp-c-bg-rgb), 0.35);
}

.meta-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-top: 1.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  text-shadow: 0 1px 12px rgba(var(--vp-c-bg-rgb), 0.45);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  white-space: nowrap;
}

.meta-item :deep(.theme-icon) {
  color: var(--vp-c-brand);
  font-size: 0.95em;
  line-height: 1;
}

.divider {
  flex: 0 0 auto;
  width: 1px;
  height: 1em;
  background: color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
}

@keyframes article-header-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 748px) {
  .article-header-content {
    width: calc(100% - 2rem);
    padding: 2.5rem 0 3.75rem;
  }

  .header-title h1 {
    font-size: 1.85rem;
    line-height: 1.35;
  }

  .meta-info {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
    margin-top: 1.2rem;
  }

  .divider {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-header-content {
    animation: none;
  }
}
</style>
