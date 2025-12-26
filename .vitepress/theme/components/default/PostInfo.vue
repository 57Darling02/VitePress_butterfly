<template>
  <div id="article-header" class="a-card">
    <!-- 标题区域 -->
    <div id="header-title">
      <h1>{{ title }}</h1>
    </div>
    <!-- 元信息区域 -->
    <div class="meta-info">
      <!-- 作者信息 -->
      <div class="author-info">
        <i class="fa-solid fa-user">&nbsp;{{ author }}</i>
        <a><i class="fa-solid fa-eye">&nbsp;<span id="busuanzi_value_page_pv">--</span>次</i></a>
      </div>
      <div class="divider"></div>
      <div class="date-info">
        <time :datetime="date"><i class="fa-solid fa-upload">&nbsp;发布于&nbsp;{{ formattedDate }}</i></time>
      </div>
      <div class="divider"></div>
        <VPDocFooterLastUpdated v-if="lastUpdated" :lastUpdated="lastUpdated" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../utils/posts.data.ts'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'

const { frontmatter, theme, page } = useData()

const {
  title = "Untitled Article",
  author = frontmatter.value?.author || theme.value?.author || "Unknown Author",
  date = '',
} = frontmatter.value

const post = posts.find(post => post.path === page.path)
const lastUpdated = post?.lastUpdated
const formattedDate = computed(() => {
  if (!date) return 'Unknown date'
  try {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Invalid date'
  }
})
</script>

<style>
#article-header {
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  animation: fadeInUp 1s ease-in-out 0.2s forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  background-color: rgba(var(--vp-c-bg-rgb), 0.5);
}

#header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

#header-title h1 {
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;

}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.author-info,
.date-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.divider {
  width: 1px;
  height: 1em;
  background: var(--vp-c-divider);
}

.icon {
  color: var(--vp-c-brand);
  font-size: 0.9em;
}

.title-icon {
  font-size: 1.2em;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .article-header {
    padding: 1.5rem;
  }

  #header-title h1 {
    font-size: 1.5rem;
  }

  .meta-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .divider {
    display: none;
  }
}
</style>