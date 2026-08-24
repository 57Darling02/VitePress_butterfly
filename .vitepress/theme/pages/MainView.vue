<template>
  <Content v-if="layout === 'home'" />
  <ArticleLayout v-else-if="isArticlePage">
    <Content />
  </ArticleLayout>
  <PageLayout v-else-if="layout === 'page'">
    <Content />
  </PageLayout>
  <Content v-else />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Content, useData } from 'vitepress'
import ArticleLayout from '../layouts/ArticleLayout.vue'
import PageLayout from '../layouts/PageLayout.vue'
import type ThemeConfig from '../types/ThemeConfig'
import { getPageLayout, isArticleLayout } from '../utils/pageLayout'

const { frontmatter } = useData<ThemeConfig>()
const layout = computed(() => getPageLayout(frontmatter.value.layout))
const isArticlePage = computed(() => isArticleLayout(frontmatter.value.layout))
</script>
