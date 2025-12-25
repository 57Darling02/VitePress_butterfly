<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useData } from 'vitepress'
const { theme, lang } = useData()
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
const props = defineProps({
    post: {
        type: Object,
        default: () => ({
            title: 'Untitled Article',
            author: 'Anonymous',
            date: '',
            link: '#',
            tags: [],
            categories: [],
            excerpt: '',
            cover: '',
            lastUpdated: '',
            textNum: 0
        })
    },
    mini: {
        type: Boolean,
        default: false
    }
})
const formattedDate = computed(() => {
    if (!props.post.date) return ''
    try {
        return new Date(props.post.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    } catch {
        return 'Invalid date'
    }
})




</script>

<template>
    <div class="a-card">
        <a class="article-card" :href="props.post.link.replace('.html', '')">
            <el-image v-if="props.post.cover && !props.mini" class="article-cover" :src="props.post.cover"
                :alt="props.post.title" fit="cover" lazy />
            <article>
                <h1 class="article-title">
                    {{ props.post.title ?? 'Untitled Article' }}
                </h1>
                <p v-if="props.post.excerpt && !props.mini" class="article-descrption">
                    {{ props.post.excerpt }}
                </p>
                <div class="article-info" data-allow-mismatch>
                    <el-space wrap class="tag-group">
                        <p v-if="formattedDate" class="article-words"><i class="fa-solid fa-upload">&nbsp;发布于&nbsp;{{
                                formattedDate }}</i>
                        </p>
                        <VPDocFooterLastUpdated :lastUpdated="props.post.lastUpdated" />
                        <i class="fa-solid fa-pen">&nbsp;{{ props.post.textNum }}字</i>
                        <el-tag v-for="(tag, index) in props.post.tags" :key="index" size="default" type="info"
                            effect="plain"
                            style="display: flex;justify-content: center;background-color: var(--vp-c-bg-soft);" round>
                            <i class="fa-solid fa-tag"></i>{{ tag }}
                        </el-tag>
                    </el-space>
                </div>
            </article>
        </a>
    </div>
</template>

<style lang="scss" scoped>
* {
    font-weight: 550;
}

.article-card {
    container-type: inline-size;
    position: relative;
    margin: 1rem 0;
    border-radius: 0.8rem;
    color: var(--vp-c-text);


    >article {
        display: grid;
        gap: 0.5rem;
        padding: 1rem;
    }
}

.article-info {
    display: flex;
    gap: 0.5em clamp(1em, 5%, 1.5em);
    font-size: 0.8em;
    flex-wrap: wrap;
    color: var(--vp-c-text-2);

    &:empty {
        display: none;
    }

    .use-updated {
        order: -1;
    }
}

.article-title {
    font-size: 1.2em;
    font-weight: 750;
    color: var(--vp-c-text);
}

.article-descrption {
    font-size: 0.9em;
    color: var(--vp-c-text-2);
}

.article-category {
    color: var(--vp-cg-color);
}

.article-cover {
    position: absolute;
    opacity: 0.8;
    top: 0;
    right: 0;
    width: min(320px, 50%);
    height: 100%;
    margin: 0;
    mask: linear-gradient(to right, transparent, #fff 50%);
    transition: all 0.2s;
    object-fit: cover;
    border-radius: 12px;

    :hover>& {
        opacity: 1;
    }

    &+article {
        position: relative;
        width: 60%;
        text-shadow: 0 0 0.5rem var(--ld-bg-card), 0 0 1rem var(--ld-bg-card);
    }

    @mixin cover-narrow {
        position: initial;
        width: 100%;
        height: auto;
        max-width: none;
        max-height: 256px;
        aspect-ratio: 2.4;
        margin-bottom: -10%;
        mask: linear-gradient(#fff 50%, transparent);

        &+article {
            width: auto;
        }
    }

    @media (max-width: 748px) {
        @include cover-narrow;
    }

    @container (max-width: 748px) {
        @include cover-narrow;
    }

}
</style>
