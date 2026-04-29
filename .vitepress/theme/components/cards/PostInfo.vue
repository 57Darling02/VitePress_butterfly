<template>
  <div class="article-header a-card" :class="{ 'is-mobile': isMobile }">
    <div class="header-title">
      <h1>{{ title }}</h1>
    </div>

    <div class="meta-info">
      <span class="meta-item">
        <i class="fa-solid fa-user" />
        <span>{{ author }}</span>
      </span>
      <span class="divider" />
      <a class="meta-item">
        <i class="fa-solid fa-eye" />
        <span><span id="busuanzi_value_page_pv">--</span>次</span>
      </a>
      <span class="divider" />
      <time class="meta-item" :datetime="date">
        <i class="fa-solid fa-upload" />
        <span>发布于&nbsp;{{ formattedDate }}</span>
      </time>
      <span v-if="lastUpdated" class="divider" />
      <VPDocFooterLastUpdated v-if="lastUpdated" class="meta-item" :lastUpdated="lastUpdated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { useLayoutState } from '../../composables/useLayoutState'
import { data as posts } from '../../data/posts.data.ts'
import VPDocFooterLastUpdated from '../controls/VPDocFooterLastUpdated.vue'

const { frontmatter, theme, page, lang } = useData()
const { isMobile } = useLayoutState()
const isMounted = ref(false)

const title = computed(() => frontmatter.value.title ?? 'Untitled Article')
const author = computed(() => frontmatter.value.author ?? theme.value.author ?? 'Unknown Author')
const date = computed(() => frontmatter.value.date ?? '')
const currentPath = computed(() => normalizePagePath(page.value.path))
const post = computed(() => posts.find(post => normalizePagePath(post.link) === currentPath.value))
const lastUpdated = computed(() => post.value?.lastUpdated ?? (page.value as any).lastUpdated)

function normalizePagePath(path = '') {
  return path.replace(/\.html$/, '')
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
.article-header {
  --post-info-side-gap: 20px;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: min(100%, max-content);
  max-width: min(80%, calc(100% - var(--post-info-side-gap) * 2));
  margin: 0 auto;
  border-radius: 18px;
  background-color: rgba(var(--vp-c-bg-rgb), 0.5);
}

.header-title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.header-title h1 {
  margin: 0;
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;
}

.meta-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  white-space: nowrap;
}

.meta-item i,
.meta-item :deep(i) {
  color: var(--vp-c-brand);
  font-size: 0.95em;
  line-height: 1;
}

.divider {
  flex: 0 0 auto;
  width: 1px;
  height: 1em;
  background: var(--vp-c-divider);
}

.article-header.is-mobile {
  width: calc(100% - var(--post-info-side-gap) * 2);
  max-width: none;
  padding: 1.5rem;
}

.article-header.is-mobile .header-title h1 {
  font-size: 1.5rem;
}

.article-header.is-mobile .meta-info {
  flex-direction: column;
  align-items: flex-start;
}

.article-header.is-mobile .divider {
  display: none;
}
</style>
