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

const { theme, frontmatter } = useData<ThemeConfig>()
const comments = computed(() => theme.value.comments)
const page = computed(() => frontmatter.value as DocFrontmatter)

const readAttr = (source: string, attr: string) => {
    const escaped = attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escaped}=['"]([^'"]*)['"]`, 'i')
    return source.match(regex)?.[1]
}

const giscus = computed<ParsedGiscusConfig>(() => {
    const script = comments.value?.script || ''
    const src = readAttr(script, 'src')
    let host = 'https://giscus.app'

    if (src) {
        try {
            const url = new URL(src)
            host = `${url.protocol}//${url.host}`
        } catch {
            // Keep default host when pasted src is invalid.
        }
    }

    const mapping = page.value.commentId ? 'specific' : (readAttr(script, 'data-mapping') || 'pathname')
    const term = page.value.commentId ? String(page.value.commentId) : readAttr(script, 'data-term')

    return {
        host,
        repo: readAttr(script, 'data-repo') || '',
        repoId: readAttr(script, 'data-repo-id') || '',
        category: readAttr(script, 'data-category') || '',
        categoryId: readAttr(script, 'data-category-id') || '',
        mapping,
        term,
        strict: readAttr(script, 'data-strict') || '0',
        reactionsEnabled: readAttr(script, 'data-reactions-enabled') || '1',
        emitMetadata: readAttr(script, 'data-emit-metadata') || '0',
        inputPosition: readAttr(script, 'data-input-position') || 'bottom',
        theme: readAttr(script, 'data-theme') || 'preferred_color_scheme',
        lang: readAttr(script, 'data-lang') || 'zh-CN',
        loading: readAttr(script, 'data-loading') || 'lazy',
    }
})

const hasRequiredConfig = computed(() => {
    return Boolean(giscus.value.repo && giscus.value.repoId && giscus.value.category && giscus.value.categoryId)
})

const shouldShow = computed(() => {
    if (page.value.layout && page.value.layout !== 'doc') return false
    if (page.value.comments === false) return false
    if (!comments.value?.enabled) return false
    if (!comments.value?.script) return false
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
