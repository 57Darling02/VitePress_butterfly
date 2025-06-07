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
                    <el-skeleton v-if="!isMounted" :rows="8" animated :class="{ 'a-card': !isFocusMode }"/>
                </template>
                <template #sidebar-non-stay>
                    <div class="fade-item" style="--delay:0.2s"><ProfileCard /></div>
                </template>
                <template #sidebar-stay>
                    <div class="fade-item" style="--delay:0.5s" v-if="!isFocusMode">
                        <Toc class="a-card" style="height: 300px;display: flex;flex-direction: column;padding: 18px;"/>
                    </div>
                    <Toc style="background-color: var(--vp-sidebar-bg-color);" v-else />
                </template>
            </DocView>
        </div>

    </template>
</template>
<script lang='ts' setup>
import { onContentUpdated, useData } from 'vitepress'
import { computed, inject, onMounted, ref } from 'vue'
import DocView from './DocView.vue'
import Toc from '../Toc.vue'
import ProfileCard from '../default/ProfileCard.vue'
import PostInfo from '../default/PostInfo.vue'
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
<style lang="scss" scoped></style>