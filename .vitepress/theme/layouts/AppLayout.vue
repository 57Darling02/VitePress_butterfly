<template>
    <Loading v-if="!isMounted" />
    <Bg_StarrySkySass v-if="!isFocusMode && !isDark" />
    <el-scrollbar height="100vh" ref="scrollbarRef" @scroll="handleScroll" wrap-style="max-width:100vw;" noresize>
        <el-header height="var(--nav-height)">
            <ClientOnly>
                <Nav />
            </ClientOnly>
        </el-header>
        <NotFound v-if="page.isNotFound" />
        <MainView v-else />

        <el-footer style="height: 200px;">
            <Footer />
        </el-footer>


    </el-scrollbar>
    <div id="control">
        <transition name="el-fade-in">
            <div class="social-item" @click="handleBackToTopClick" v-show="showNavbar && lastScrollY > 100">
                <i class="fa-solid fa-chevron-up"></i>
            </div>
        </transition>
        <transition name="el-fade-in">
            <Toc class="a-card" v-if="!showSidebar && page.frontmatter.layout === 'doc'" v-show="controlVisible"
                style="height: 40vh;width: 300px;;display: flex;flex-direction: column;padding: 18px;" />
        </transition>


        <div id="control-column">

            <transition name="el-fade-in">
                <div class="social-item" v-if="canShowSidebar" v-show="controlVisible || showSidebar">
                    <ToggleSiderBar />
                </div>
            </transition>

            <transition name="el-fade-in">
                <div class="social-item" v-show="controlVisible">
                    <ToggleFocusModeBTN />
                </div>
            </transition>

            <transition name="el-fade-in">
                <div class="social-item" v-show="controlVisible">
                    <VPSwitchAppearance />
                </div>
            </transition>
            <div class="social-item">
                <VPNavBarHamburger :active="controlVisible" @click="controlVisible = !controlVisible" />
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, onContentUpdated } from 'vitepress'
const { theme, page, frontmatter, isDark } = useData()
import Nav from '../components/navigation/Nav.vue'
import Footer from '../components/navigation/Footer.vue'
import MainView from '../pages/MainView.vue'
import NotFound from '../pages/NotFound.vue'
import Loading from '../components/effects/Loading.vue'
import Toc from '../components/navigation/Toc.vue'

import Bg_StarrySkySass from '../components/effects/Bg_StarrySkySass.vue'
import { useLayoutState } from '../composables/useLayoutState'

const {
    isFocusMode,
    showNavbar,
    showSidebar,
    canShowSidebar,
    setNavbarVisible,
    setFooterVisible,
} = useLayoutState()

// 获取全局控件
const isMounted = ref(false)
const scrollbarRef = ref()
const contentContainer = ref()
isDark.value = theme.value.isDark || isDark.value

import VPNavBarHamburger from '../components/controls/VPNavBarHamburger.vue'
const controlVisible = ref(false)
import VPSwitchAppearance from '../components/controls/VPSwitchAppearance.vue'
import ToggleFocusModeBTN from '../components/controls/ToggleFocusModeBTN.vue'
import ToggleSiderBar from '../components/controls/ToggleSiderBar.vue'

function throttle<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let lastRun = 0
    return (...args: Parameters<T>) => {
        const now = Date.now()
        if (now - lastRun < delay) return
        lastRun = now
        fn(...args)
    }
}



// 实现导航栏滚动的隐藏和显示
const lastScrollY = ref(0)
const scrollingDown = ref(false)
const checkPageHeight = () => {
    if (!isMounted.value) return
    const docHeight = contentContainer.value?.scrollHeight || 0
    const winHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    if (docHeight <= winHeight) setFooterVisible(true)
}
const handleScroll = throttle(({ scrollTop }: { scrollTop: number }) => {
    if (!isMounted.value) return // 挂载前不处理
    const currentY = scrollTop
    const windowHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    scrollingDown.value = currentY > lastScrollY.value

    if (typeof window !== 'undefined' && currentY < 150 && (frontmatter.value.layout === 'doc' || frontmatter.value.layout === undefined) && window !== undefined) {
        setNavbarVisible(true)
    } else if (scrollingDown.value) {
        setNavbarVisible(false)
    } else {
        setNavbarVisible(true)
    }
    const documentHeight = contentContainer.value?.scrollHeight || 0

    if (currentY + windowHeight >= documentHeight - 100) {
        setNavbarVisible(true)
        setFooterVisible(true)
    } else {
        setFooterVisible(false)
    }
    lastScrollY.value = currentY
}, 150)

// 控制栏
const backToTop = (smooth = true) => {
    scrollbarRef.value?.wrapRef?.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}

const handleBackToTopClick = () => {
    backToTop()
}

const scrollToHash = (smooth = false) => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    const target = document.getElementById(id)
    const wrap = scrollbarRef.value?.wrapRef
    if (!target || !wrap) return

    const targetRect = target.getBoundingClientRect()
    const wrapRect = wrap.getBoundingClientRect()
    const navOffset = showNavbar.value ? 64 : 16
    const top = targetRect.top - wrapRect.top + wrap.scrollTop - navOffset

    wrap.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
}

const scrollToHashAfterRender = (smooth = false) => {
    nextTick(() => {
        requestAnimationFrame(() => scrollToHash(smooth))
    })
}

const handleHashChange = () => {
    scrollToHashAfterRender(true)
}

onContentUpdated(() => {
    const hasHash = typeof window !== 'undefined' && Boolean(window.location.hash)
    if (!hasHash) {
        backToTop(false)
    } else {
        scrollToHashAfterRender(false)
    }
    checkPageHeight()
})

// 挂载处理
onMounted(() => {
    if (typeof window === 'undefined') return
    contentContainer.value = scrollbarRef.value?.wrapRef?.querySelector('.el-scrollbar__view')
    const initialScrollTop = scrollbarRef.value?.wrapRef?.scrollTop || 0
    setNavbarVisible(initialScrollTop < 100)
    window.addEventListener('hashchange', handleHashChange)
    setTimeout(() => {
        isMounted.value = true
        scrollToHash(false)
        checkPageHeight()
    }, 800)
})

onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('hashchange', handleHashChange)
})

</script>
<style lang="scss">
#control {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: var(--z-fixed-control);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;

    #control-column {
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-end;
    }

}
</style>
