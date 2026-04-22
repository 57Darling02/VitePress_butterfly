<template>

    <div class="doc-header" style="width: 100%;">
        <slot name="doc-header"/>
    </div>

    <div id="content-container" :style="{ maxWidth: isFocusMode&& (!frontmatter.layout || frontmatter.layout == 'doc') ? 'none' : '1200px' }">

        <!-- 主内容 -->
        <div id="page-wrapper" style="overflow: hidden;padding-top: 20px;">
            <slot name="main-content" />
        </div>

        <!-- 侧边栏 -->
        <div class="sidebar" v-if="showSidebar">
            <!-- 正常模式 -->
            <template v-if="!isFocusMode">
                <slot name="sidebar-non-stay"/>
                <div class="sidebar-stay" :class="{ 'nav-hidden': !showNavbar }">
                    
                    <slot name="sidebar-stay"/>
                </div>
            </template>
            <!-- 专注模式 -->
            <template v-else>
                <div class="sidebar-stay"
                    :class="{ 'nav-hidden': !showNavbar }">
                    <slot name="sidebar-stay"/>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, inject, onMounted } from 'vue'
import { useData } from 'vitepress'
const { theme, page, frontmatter } = useData()
// 获取全局状态和方法
const isFocusMode = inject('isFocusMode')
const showNavbar = inject('showNavbar')
const showSidebar = inject('showSidebar')
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})
</script>
<style lang="scss" scoped>
$hide-offset: var(--nav-height);

#content-container {
    display: flex;
    justify-self: center;
    justify-content: center;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
    position: relative;
    width: 100%;
}

#page-wrapper {
    padding: 0px 5px 0px;
    width: 100%;
    overflow:auto;

}

.sidebar {
    padding: 0px 10px;
    padding-top: 20px;
    // position: static;
    min-width: var(--sidebar-width);
    max-width: var(--sidebar-width);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: visible;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeInUp 1s ease-in-out 0.2s forwards;
}

.sidebar-stay {
    position: sticky;
    top: var(--nav-height);
    max-height: calc(100vh - (var(--nav-height)));
    /* 保留滚动缓冲空间 */
    transition:
        top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s ease;
    will-change: top;
    z-index: 50;
    display: flex;
    flex-direction: column;
    &.nav-hidden {
        top: 0px;
        max-height: 100vh;
    }
}
</style>