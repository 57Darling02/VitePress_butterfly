<template>
    <Bg_StarrySkySass v-if="!isFocusMode && !isDark" />
    <el-scrollbar class="app-scrollbar" height="100vh" ref="scrollbarRef" @scroll="handleScroll" noresize>
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
            <Toc class="a-card" v-if="showFloatingToc" v-show="controlVisible"
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
                <div class="social-item" v-show="controlVisible" @click="handleCopyLinkClick">
                    <i class="fa-solid fa-link"></i>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useData, onContentUpdated } from 'vitepress'
const { theme, page, frontmatter, isDark } = useData()
import Nav from '../components/navigation/Nav.vue'
import Footer from '../components/navigation/Footer.vue'
import MainView from '../pages/MainView.vue'
import NotFound from '../pages/NotFound.vue'
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
    startMobileListener,
} = useLayoutState()

const isDocLayout = computed(() => frontmatter.value.layout === 'doc' || frontmatter.value.layout === undefined)
const showFloatingToc = computed(() => isDocLayout.value && !showSidebar.value)

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
    let timer: ReturnType<typeof setTimeout> | null = null
    let lastArgs: Parameters<T> | null = null

    const run = () => {
        lastRun = Date.now()
        timer = null
        if (!lastArgs) return
        fn(...lastArgs)
        lastArgs = null
    }

    return (...args: Parameters<T>) => {
        lastArgs = args
        const now = Date.now()
        const remaining = delay - (now - lastRun)
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            run()
            return
        }
        if (!timer) {
            timer = setTimeout(run, remaining)
        }
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

    if (typeof window !== 'undefined' && currentY < 150 && isDocLayout.value) {
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

const handleCopyLinkClick = async () => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.hash = ''

    await navigator.clipboard.writeText(url.toString())
    ElMessage({
        message: '当前页面链接已复制',
        type: 'success',
    })
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

const removeFirstPaintLoading = () => {
    const loading = document.getElementById('first-paint-loading')
    if (!loading) return

    loading.classList.add('is-leaving')
    window.setTimeout(() => loading.remove(), 180)
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
    startMobileListener()
    contentContainer.value = scrollbarRef.value?.wrapRef?.querySelector('.el-scrollbar__view')
    const initialScrollTop = scrollbarRef.value?.wrapRef?.scrollTop || 0
    setNavbarVisible(initialScrollTop < 100)
    window.addEventListener('hashchange', handleHashChange)
    setTimeout(() => {
        isMounted.value = true
        removeFirstPaintLoading()
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
.app-scrollbar {
    width: 100%;
    max-width: 100vw;

    .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .el-scrollbar__view {
        min-width: 0;
        max-width: 100%;
    }
}

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
