<template>
  <div class="a-card tag-filter-card">
    <div class="card-header">
      <h3 class="title">
        <ThemeIcon name="tags" /> 标签筛选
      </h3>
      <div class="actions" v-if="selectedTags.length > 0">
        <el-button link type="primary" size="small" @click="clearTags">清除</el-button>
      </div>
    </div>
    
    <div class="tags-container">
      <button v-for="tag in tagSummary.tags"
           :key="tag" 
           class="tag-item"
           :class="{ 'is-active': selectedTags.includes(tag) }"
           type="button"
           :aria-pressed="selectedTags.includes(tag)"
           @click="toggleTag(tag)">
        <span class="tag-name">{{ tag }}</span>
        <span class="tag-count" v-if="tagSummary.counts[tag]">{{ tagSummary.counts[tag] }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostSummary } from '../../types/PostSummary'
import ThemeIcon from '../ThemeIcon.vue'

const props = defineProps<{
  posts: PostSummary[]
  selectedTags: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedTags', tags: string[]): void
}>()

// 一次遍历同时得到去重标签和计数。
const tagSummary = computed(() => {
  const counts = new Map<string, number>()
  props.posts.forEach(post => {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  })
  return {
    tags: Array.from(counts.keys()).sort((a, b) => a.localeCompare(b, 'zh-CN')),
    counts: Object.fromEntries(counts),
  }
})

const toggleTag = (tag: string) => {
  const newTags = [...props.selectedTags]
  const index = newTags.indexOf(tag)
  
  if (index > -1) {
    newTags.splice(index, 1)
  } else {
    newTags.push(tag)
  }
  
  emit('update:selectedTags', newTags)
}

const clearTags = () => {
  emit('update:selectedTags', [])
}
</script>

<style lang="scss" scoped>
.tag-filter-card {
  padding: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: var(--filter-list-max-height, 30vh);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  // Room so the tag chips' outline/hover ring isn't clipped by overflow.
  padding: 2px;
  margin: -2px;
}

.tags-container::-webkit-scrollbar {
  width: 6px;
}

.tags-container::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-text-3) 40%, transparent);
}

@media (max-width: 748px) {
  // On mobile the page scrolls freely; don't trap scrolling inside the card.
  .tags-container {
    max-height: none;
    overflow-y: visible;
  }
}

.tag-item {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  border: 1px solid transparent;
  font: inherit;

  &:focus-visible {
    outline: 2px solid var(--vp-c-brand);
    outline-offset: 2px;
  }

  &:hover {
    color: var(--vp-c-brand);
    background: var(--vp-c-bg);
    border-color: var(--vp-c-brand);
  }

  &.is-active {
    background: var(--vp-c-brand);
    color: white;
    border-color: var(--vp-c-brand);

    .tag-count {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
}

.tag-name {
  margin-right: 6px;
}

.tag-count {
  font-size: 0.8em;
  background: var(--vp-c-bg);
  padding: 0 5px;
  border-radius: 4px;
  color: var(--vp-c-text-3);
  min-width: 16px;
  text-align: center;
}
</style>
