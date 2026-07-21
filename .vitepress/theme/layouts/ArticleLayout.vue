<template>
  <DocView>
    <template #doc-header>
      <PostInfo />
    </template>

    <template #main-content>
      <div v-show="isMounted" class="vp-doc fade-item a-card article-content">
        <slot />
      </div>
      <MarkdownImagePreview v-if="isMounted" />
      <el-skeleton v-if="!isMounted" class="doc-skeleton a-card" animated>
        <template #template>
          <el-skeleton-item variant="h1" class="doc-skeleton-title" />
          <el-skeleton-item variant="p" class="doc-skeleton-summary" />
          <el-skeleton-item variant="p" class="doc-skeleton-summary short" />
          <el-skeleton-item variant="image" class="doc-skeleton-cover" />
          <div class="doc-skeleton-lines">
            <el-skeleton-item v-for="item in 8" :key="item" variant="text" />
          </div>
        </template>
      </el-skeleton>
      <GiscusComments
        v-if="isMounted && shouldLoadGiscus"
        class="fade-item comments-panel a-card"
      />
    </template>

    <template #sidebar-non-stay>
      <ProfileCard class="fade-item profile-sidebar" />
    </template>
    <template #sidebar-stacked>
      <ProfileCard class="fade-item profile-sidebar" />
      <SiteStatsCard class="fade-item stats-sidebar" />
    </template>
    <template #sidebar-stay>
      <Toc class="fade-item a-card page-toc toc-sidebar">
        <template #empty>
          <SiteStatsCard class="fade-item stats-sidebar" />
        </template>
      </Toc>
    </template>
  </DocView>
</template>

<script lang="ts" setup>
import { onContentUpdated, useData } from 'vitepress'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import MarkdownImagePreview from '../components/effects/MarkdownImagePreview.vue'
import PostInfo from '../components/cards/PostInfo.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import SiteStatsCard from '../components/cards/SiteStatsCard.vue'
import Toc from '../components/navigation/Toc.vue'
import type ThemeConfig from '../types/ThemeConfig'
import DocView from './DocView.vue'

const GiscusComments = defineAsyncComponent(() => import('../components/comments/GiscusComments.vue'))
const { theme, frontmatter } = useData<ThemeConfig>()
const isMounted = ref(false)
const shouldLoadGiscus = computed(() => {
  const comments = theme.value.comments

  return Boolean(
    comments?.enabled
    && frontmatter.value.comments !== false
    && comments.repo
    && comments.repoId
    && comments.category
    && comments.categoryId,
  )
})

onMounted(() => {
  isMounted.value = true
})

onContentUpdated(() => {
  isMounted.value = true
})
</script>

<style lang="scss" scoped>
.article-content {
  overflow-x: hidden;
  padding: 38px 30px 20px;
  --delay: 0.1s;
}

.comments-panel {
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 24px 30px;
  --delay: 0.1s;
}

.profile-sidebar {
  --delay: 0.3s;
}

.toc-sidebar {
  width: 100%;
  min-width: 0;
  --delay: 0.5s;
}

.stats-sidebar {
  --delay: 0.6s;
}

.doc-skeleton {
  width: 100%;
  padding: 38px 30px 24px;
  overflow: hidden;
}

.doc-skeleton-title {
  width: min(520px, 80%);
  height: 34px;
}

.doc-skeleton-summary {
  width: 86%;
  height: 20px;
  margin-top: 18px;

  &.short {
    width: 56%;
    margin-top: 12px;
  }
}

.doc-skeleton-cover {
  width: 100%;
  height: clamp(180px, 30vh, 320px);
  margin-top: 24px;
  border-radius: 12px;
}

.doc-skeleton-lines {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;

  .el-skeleton__item {
    height: 18px;

    &:nth-child(2n) {
      width: 92%;
    }

    &:nth-child(3n) {
      width: 74%;
    }
  }
}

.page-toc {
  --toc-padding-y: 36px;
  --toc-max-height: min(65vh, calc(100vh - var(--nav-height) - 40px));
  padding: 18px;
}
</style>
