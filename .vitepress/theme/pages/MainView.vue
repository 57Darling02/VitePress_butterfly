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
                        style="overflow-x: hidden;padding: 38px 30px 20px; --delay:0s" />
                    <el-skeleton v-if="!isMounted" :rows="8" animated :class="{ 'a-card': !isFocusMode }" />
                    <GiscusComments v-if="isMounted" class="fade-item comments-panel" :class="{ 'a-card': !isFocusMode }"
                        style="--delay:0.1s" />
                </template>
                <template #sidebar-non-stay>
                    <div class="fade-item" style="--delay:0.2s"><ProfileCard /></div>
                </template>
                <template #sidebar-stay>
                    <div class="fade-item" style="--delay:0.5s">
                        <Toc class="a-card"
                            :style="{ height: isFocusMode ? '90vh' : '40vh', display: 'flex', flexDirection: 'column', padding: '18px' }" />
                    </div>
                </template>
            </DocView>
        </div>

    </template>
</template>
<script lang='ts' setup>
import { onContentUpdated, useData } from 'vitepress'
import { computed, inject, onMounted, ref } from 'vue'
import DocView from '../layouts/DocView.vue'
import Toc from '../components/navigation/Toc.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import PostInfo from '../components/cards/PostInfo.vue'
import GiscusComments from '../components/comments/GiscusComments.vue'
const data = useData()
const frontmatter = computed(() => data.frontmatter.value)
const isFocusMode = inject('isFocusMode')
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
</style>
