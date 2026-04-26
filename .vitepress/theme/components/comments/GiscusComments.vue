<template>
    <section v-if="shouldShow" class="comments-container">
        <div class="comments-title">评论</div>
        <ClientOnly>
            <Giscus id="comments" :host="giscus.host" :repo="giscus.repo" :repo-id="giscus.repoId"
                :category="giscus.category" :category-id="giscus.categoryId" :mapping="giscus.mapping"
                :term="giscus.term" :theme="giscus.theme" :strict="giscus.strict"
                :reactions-enabled="giscus.reactionsEnabled" :emit-metadata="giscus.emitMetadata"
                :input-position="giscus.inputPosition" :lang="giscus.lang" :loading="giscus.loading" />
            <template #fallback>
                <el-skeleton class="comments-skeleton" :rows="4" animated />
            </template>
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
import Giscus, {
    type AvailableLanguage,
    type BooleanString,
    type GiscusProps,
    type InputPosition,
    type Loading,
    type Mapping,
    type Repo,
    type Theme,
} from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import type ThemeConfig from '../../types/ThemeConfig'

interface DocFrontmatter {
    layout?: string
    comments?: boolean
    commentId?: string
}

const { theme, frontmatter, isDark } = useData<ThemeConfig>()
const comments = computed(() => theme.value.comments)
const page = computed(() => frontmatter.value as DocFrontmatter)

const mappings: Mapping[] = ['url', 'title', 'og:title', 'specific', 'number', 'pathname']
const inputPositions: InputPosition[] = ['top', 'bottom']
const loadingModes: Loading[] = ['lazy', 'eager']

const isRepo = (value: string | undefined): value is Repo => {
    return Boolean(value && /^[^/\s]+\/[^/\s]+$/.test(value))
}

const toBooleanString = (value: string | undefined, fallback: BooleanString): BooleanString => {
    return value === '0' || value === '1' ? value : fallback
}

const toMapping = (value: string | undefined, fallback: Mapping): Mapping => {
    return mappings.includes(value as Mapping) ? value as Mapping : fallback
}

const toInputPosition = (value: string | undefined, fallback: InputPosition): InputPosition => {
    return inputPositions.includes(value as InputPosition) ? value as InputPosition : fallback
}

const toLoading = (value: string | undefined, fallback: Loading): Loading => {
    return loadingModes.includes(value as Loading) ? value as Loading : fallback
}

const giscus = computed<GiscusProps>(() => {
    const config = comments.value
    const mapping = page.value.commentId ? 'specific' : toMapping(config?.mapping, 'title')
    const term = page.value.commentId ? String(page.value.commentId) : config?.term
    const configuredTheme = config?.theme || 'preferred_color_scheme'
    const resolvedTheme = configuredTheme === 'preferred_color_scheme'
        ? (isDark.value ? 'dark' : 'light')
        : configuredTheme

    return {
        host: config?.host || 'https://giscus.app',
        repo: isRepo(config?.repo) ? config.repo : 'giscus/giscus',
        repoId: config?.repoId || '',
        category: config?.category || '',
        categoryId: config?.categoryId || '',
        mapping,
        term,
        strict: toBooleanString(config?.strict, '0'),
        reactionsEnabled: toBooleanString(config?.reactionsEnabled, '1'),
        emitMetadata: toBooleanString(config?.emitMetadata, '0'),
        inputPosition: toInputPosition(config?.inputPosition, 'bottom'),
        theme: resolvedTheme as Theme,
        lang: (config?.lang || 'zh-CN') as AvailableLanguage,
        loading: toLoading(config?.loading, 'lazy'),
    }
})

const hasRequiredConfig = computed(() => {
    const config = comments.value
    return Boolean(isRepo(config?.repo) && config?.repoId && config?.category && config?.categoryId)
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

.comments-skeleton {
    width: 100%;
}
</style>
