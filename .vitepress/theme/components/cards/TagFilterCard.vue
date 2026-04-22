<template>
  <div class="a-card tag-filter-card">
    <div class="card-header">
      <h3 class="title">
        <i class="fa-solid fa-tags"></i> 标签筛选
      </h3>
      <div class="actions" v-if="selectedTags.length > 0">
        <el-button link type="primary" size="small" @click="clearTags">清除</el-button>
      </div>
    </div>
    
    <div class="tags-container">
      <div v-for="tag in allTags" 
           :key="tag" 
           class="tag-item"
           :class="{ 'is-active': selectedTags.includes(tag) }"
           @click="toggleTag(tag)">
        <span class="tag-name">{{ tag }}</span>
        <span class="tag-count" v-if="tagCounts[tag]">{{ tagCounts[tag] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  posts: any[]
  selectedTags: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedTags', tags: string[]): void
}>()

// 统计标签
const allTags = computed(() => {
  const tags = new Set<string>()
  props.posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const tagCounts = computed(() => {
  const counts: Record<string, number> = {}
  props.posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    }
  })
  return counts
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
  margin-top: 15px;
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
