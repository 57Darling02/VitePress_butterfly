<template>
    <section v-if="shouldShow" class="comments-container">
        <div class="comments-title">评论</div>
        <ClientOnly>
            <Giscus id="comments" :host="giscus.host" :repo="giscus.repo" :repo-id="giscus.repoId"
                :category="giscus.category" :category-id="giscus.categoryId" :mapping="giscus.mapping"
                :term="giscus.term" :theme="giscus.theme" :strict="giscus.strict"
                :reactions-enabled="giscus.reactionsEnabled" :emit-metadata="giscus.emitMetadata"
                :input-position="giscus.inputPosition" :lang="giscus.lang" :loading="giscus.loading" />
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import type ThemeConfig from '../../types/ThemeConfig'

interface DocFrontmatter {
    layout?: string
    comments?: boolean
    commentId?: string
}

interface ParsedGiscusConfig {
    host: string
    repo: string
    repoId: string
    category: string
    categoryId: string
    mapping: string
    term?: string
    strict: string
    reactionsEnabled: string
    emitMetadata: string
    inputPosition: string
    theme: string
    lang: string
    loading: string
}

const { theme, frontmatter, isDark } = useData<ThemeConfig>()
const comments = computed(() => theme.value.comments)
const page = computed(() => frontmatter.value as DocFrontmatter)

const giscus = computed<ParsedGiscusConfig>(() => {
    const config = comments.value
    const mapping = page.value.commentId ? 'specific' : (config?.mapping || 'title')
    const term = page.value.commentId ? String(page.value.commentId) : config?.term
    const configuredTheme = config?.theme || 'preferred_color_scheme'
    const resolvedTheme = configuredTheme === 'preferred_color_scheme'
        ? (isDark.value ? 'dark' : 'light')
        : configuredTheme

    return {
        host: config?.host || 'https://giscus.app',
        repo: config?.repo || '',
        repoId: config?.repoId || '',
        category: config?.category || '',
        categoryId: config?.categoryId || '',
        mapping,
        term,
        strict: config?.strict || '0',
        reactionsEnabled: config?.reactionsEnabled || '1',
        emitMetadata: config?.emitMetadata || '0',
        inputPosition: config?.inputPosition || 'bottom',
        theme: resolvedTheme,
        lang: config?.lang || 'zh-CN',
        loading: config?.loading || 'lazy',
    }
})

const hasRequiredConfig = computed(() => {
    return Boolean(giscus.value.repo && giscus.value.repoId && giscus.value.category && giscus.value.categoryId)
})

const shouldShow = computed(() => {
    if (page.value.layout && page.value.layout !== 'doc') return false
    if (page.value.comments === false) return false
    if (!comments.value?.enabled) return false
    return hasRequiredConfig.value
})
</script>

<style lang="scss" scoped>
.comments-container {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
}

.comments-title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
}
</style>
