<template>
    <template v-if="frontmatter.layout === 'home'">
        <content />
    </template>
    <template v-else-if="frontmatter.layout === 'page'">
        <content />
    </template>
    <template v-else>
        <div style="display: flex;flex-direction: column;align-items: center;">
            <DocView>
                <template #doc-header>
                    <PostInfo />
                </template>
                <template #main-content>
                    <content v-show="isMounted" class="vp-doc fade-item" :class="{ 'a-card': !isFocusMode }"
                        style="overflow-x: hidden;padding: 38px 30px 20px; --delay:0.1s" />
                    <MarkdownImagePreview v-if="isMounted" />
                    <el-skeleton v-if="!isMounted" class="doc-skeleton" animated :class="{ 'a-card': !isFocusMode }">
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
                    <GiscusComments v-if="isMounted" class="fade-item comments-panel" :class="{ 'a-card': !isFocusMode }"
                        style="--delay:0.1s" />
                </template>
                <template #sidebar-non-stay>
                    <div class="fade-item" style="--delay:0.3s"><ProfileCard /></div>
                </template>
                <template #mobile-sidebar>
                    <div class="fade-item" style="--delay:0.3s"><ProfileCard /></div>
                </template>
                <template #sidebar-stay>
                    <div class="fade-item" style="--delay:0.5s">
                        <Toc
                            class="a-card page-toc"
                            :style="{
                                '--toc-max-height': isFocusMode
                                    ? 'calc(100vh - var(--nav-height) - 40px)'
                                    : 'min(40vh, calc(100vh - var(--nav-height) - 40px))'
                            }"
                        />
                    </div>
                </template>
            </DocView>
        </div>

    </template>
</template>
<script lang='ts' setup>
import { onContentUpdated, useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import DocView from '../layouts/DocView.vue'
import Toc from '../components/navigation/Toc.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import PostInfo from '../components/cards/PostInfo.vue'
import GiscusComments from '../components/comments/GiscusComments.vue'
import MarkdownImagePreview from '../components/effects/MarkdownImagePreview.vue'
import { useLayoutState } from '../composables/useLayoutState'
const data = useData()
const frontmatter = computed(() => data.frontmatter.value)
const { isFocusMode } = useLayoutState()
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})
onContentUpdated(() => {
    isMounted.value = true
})


</script>
<style lang="scss" scoped>
.comments-panel {
    margin-top: 12px;
    width: 100%;
    box-sizing: border-box;
    padding: 24px 30px;
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
    padding: 18px;
}
</style>
