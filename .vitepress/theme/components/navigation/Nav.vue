<template>
    <div
        id="nav-reveal-zone"
        :class="{ 'nav-reveal-zone-hidden': navPhase === 'hidden' }"
        @mouseenter="handleNavMouseEnter"
        @mouseleave="handleNavMouseLeave"
    >
        <button
            v-if="navPhase === 'hidden'"
            class="nav-reveal-trigger"
            type="button"
            aria-label="显示导航栏"
            @click="revealNavigation"
        />
        <div
            id="nav"
            ref="navRef"
            :class="{ 'nav-compact': isCompact, 'nav-hidden': navPhase === 'hidden', 'nav-toasting': Boolean(activeToast) }"
            :aria-hidden="!isNavInteractive ? 'true' : undefined"
        >
            <transition name="nav-toast-fade">
                <div
                    v-if="activeToast"
                    :key="activeToast.id"
                    class="nav-toast"
                    :class="`nav-toast--${activeToast.type}`"
                    role="status"
                    aria-live="polite"
                >
                    <ThemeIcon
                        :name="activeToast.type === 'success' ? 'circle-check' : 'circle-alert'"
                        :size="NAV_ICON_SIZE"
                        class="nav-toast-icon"
                    />
                    <span class="nav-toast-text">{{ activeToast.message }}</span>
                </div>
            </transition>
            <div id="menu" :inert="menuInert || undefined">
                <a class="menu-fitem" href="/" aria-label="首页" @click="handleLinkClick('/', $event)">
                    <span class="menu-fitem-content">
                        <ThemeIcon name="house" :size="NAV_ICON_SIZE" />
                        <span class="menu-label">首页</span>
                    </span>
                </a>

                <button
                    v-if="shouldShowMusicPlayer"
                    ref="musicTriggerRef"
                    type="button"
                    :class="['menu-fitem', 'menu-fitem-music', { 'menu-fitem-active': musicPanelVisible }]"
                    :aria-expanded="musicPanelVisible"
                    aria-controls="music-player-panel"
                    aria-label="音乐播放器"
                    @mouseenter="openMusicPanel"
                    @mouseleave="scheduleCloseMusicPanel"
                    @click="handleMusicTriggerClick"
                >
                    <span class="menu-fitem-content">
                        <ThemeIcon
                            name="disc-3"
                            :size="NAV_ICON_SIZE"
                            class="music-icon"
                            :class="{ 'music-icon-rotating': isMusicPlaying }"
                        />
                        <span class="menu-label">音乐</span>
                    </span>
                </button>

                <template v-for="item in menuItems" :key="item.label">
                    <button
                        v-if="item.children?.length"
                        type="button"
                        :class="['menu-fitem', 'menu-fitem-menu', { 'menu-fitem-active': menuPanelVisible && activeMenuItem?.label === item.label }]"
                        :aria-expanded="menuPanelVisible && activeMenuItem?.label === item.label"
                        aria-controls="menu-panel"
                        aria-haspopup="menu"
                        :aria-label="item.label"
                        @mouseenter="handleMenuTriggerMouseEnter(item, $event)"
                        @mouseleave="scheduleCloseMenuPanel"
                        @click="handleMenuTriggerClick(item, $event)"
                    >
                        <span class="menu-fitem-content">
                            <ThemeIcon
                                :name="item.icon"
                                :src="item.iconUrl"
                                :size="NAV_ICON_SIZE"
                                class="menu-trigger-icon"
                            />
                            <span class="menu-label">{{ item.label }}</span>
                        </span>
                    </button>
                    <a
                        v-else
                        class="menu-fitem"
                        :href="item.link || undefined"
                        :target="getLinkTarget(item.link)"
                        :rel="getLinkRel(item.link)"
                        :aria-label="item.label"
                        :aria-disabled="!item.link || undefined"
                        @click="handleLinkClick(item.link, $event)"
                    >
                        <span class="menu-fitem-content">
                            <ThemeIcon :name="item.icon" :src="item.iconUrl" :size="NAV_ICON_SIZE" />
                            <span class="menu-label">{{ item.label }}</span>
                        </span>
                    </a>
                </template>

                <VPNavBarSearch class="menu-fitem menu-fitem-search" />
            </div>
        </div>
    </div>

    <el-dropdown ref="menuDropdownRef" :virtual-ref="menuVirtualTriggerRef" :popper-style="popperStyle"
        :disabled="!isNavInteractive"
        :show-arrow="false" :hide-on-click="false" :popper-options="menuPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMenuPanelVisibleChange">
        <template #dropdown>
            <div id="menu-panel" class="menu-panel-shell" @mouseenter="cancelCloseMenuPanel" @mouseleave="scheduleCloseMenuPanel">
                <el-dropdown-menu>
                    <el-dropdown-item v-for="subitem in activeMenuItem?.children || []" :key="subitem.key" class="menu-item"
                        @click="handleMenuClick(subitem, $event)">
                        <ThemeIcon :name="subitem.icon" :src="subitem.iconUrl" />
                        <span class="menu-item-label" :title="subitem.label">{{ subitem.label }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </div>
        </template>
    </el-dropdown>

    <el-dropdown v-if="shouldShowMusicPlayer" ref="musicDropdownRef" :virtual-ref="musicVirtualTriggerRef" :popper-style="popperStyle"
        :disabled="!isNavInteractive"
        :show-arrow="false" :hide-on-click="false" :popper-options="musicPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMusicPanelVisibleChange">
        <template #dropdown>
            <div id="music-player-panel" class="music-player-shell" @mouseenter="cancelCloseMusicPanel" @mouseleave="scheduleCloseMusicPanel">
                <APlayerWidget :url="musicPlayer.url" :name="musicPlayer.name" :artist="musicPlayer.artist"
                    :cover="musicPlayer.cover" :autoplay="musicPlayer.autoplay" :volume="musicPlayer.volume"
                    @playing-change="isMusicPlaying = $event" />
            </div>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownInstance } from 'element-plus'
import { useData, useRouter } from 'vitepress'
import { VPNavBarSearch } from 'vitepress/theme'
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { MenuChildItem, MenuItem } from '../../types/ThemeConfig'
import type ThemeConfig from '../../types/ThemeConfig'
import { useLayoutState } from '../../composables/useLayoutState'
import { useToast } from '../../composables/useToast'
import ThemeIcon from '../ThemeIcon.vue'

const { theme } = useData<ThemeConfig>()
const router = useRouter()
const { showNavbar, setNavbarVisible } = useLayoutState()
const { activeToast } = useToast()
const menuItems = computed(() => theme.value.menuItems)
const APlayerWidget = defineAsyncComponent(() => import('../player/APlayerWidget.vue'))

type NavPhase = 'expanded' | 'compact' | 'hidden'

const NAV_ICON_SIZE = 18
const COLLAPSE_DURATION = 210
const COMPACT_SETTLE_DURATION = 32
const REVEAL_DURATION = 240

const navRef = ref<HTMLElement | null>(null)
const navPhase = ref<NavPhase>('expanded')
const isCompact = computed(() => navPhase.value !== 'expanded')
const navHovered = ref(false)
const menuDropdownRef = ref<DropdownInstance>()
const menuPanelVisible = ref(false)
const activeMenuItem = ref<MenuItem | null>(null)

const musicDropdownRef = ref<DropdownInstance>()
const musicPanelVisible = ref(false)
const isMusicPlaying = ref(false)
const musicTriggerRef = ref<HTMLElement | null>(null)
const isNavInteractive = computed(() => (
    navPhase.value !== 'hidden'
    || navHovered.value
    || menuPanelVisible.value
    || musicPanelVisible.value
))

// The menu is faded out behind the toast, so keep it out of tab/pointer reach then.
const menuInert = computed(() => !isNavInteractive.value || Boolean(activeToast.value))

const menuTriggerRect = ref(
    DOMRect.fromRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }),
)
const menuVirtualTriggerRef = ref({
    getBoundingClientRect: () => menuTriggerRect.value,
})

const musicTriggerRect = ref(
    DOMRect.fromRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }),
)
const musicVirtualTriggerRef = ref({
    getBoundingClientRect: () => musicTriggerRect.value,
})

const popperStyle = {
    border: 'none',
    borderRadius: '18px',
    overflow: 'hidden',
    background: 'transparent',
    boxShadow: 'none',
}

const menuPopperOptions = {
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
}
const musicPopperOptions = {
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
}

let menuCloseTimer: ReturnType<typeof setTimeout> | null = null
let musicCloseTimer: ReturnType<typeof setTimeout> | null = null
let navPhaseTimer: ReturnType<typeof setTimeout> | null = null
let navPhaseTimerTarget: Extract<NavPhase, 'expanded' | 'hidden'> | null = null
let navMotionVersion = 0
let motionMediaQuery: MediaQueryList | null = null

const prefersReducedMotion = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

const clearNavPhaseTimer = () => {
    if (navPhaseTimer) {
        clearTimeout(navPhaseTimer)
        navPhaseTimer = null
    }
    navPhaseTimerTarget = null
}

const syncNavPhase = (visible: boolean) => {
    const previousPhase = navPhase.value
    const pendingTarget = navPhaseTimerTarget
    clearNavPhaseTimer()
    const version = ++navMotionVersion

    if (prefersReducedMotion()) {
        navPhase.value = visible ? 'expanded' : 'hidden'
        return
    }

    if (!visible) {
        if (previousPhase === 'hidden') return
        if (pendingTarget === 'expanded') {
            navPhase.value = 'hidden'
            return
        }

        navPhase.value = 'compact'
        navPhaseTimerTarget = 'hidden'
        navPhaseTimer = setTimeout(() => {
            navPhaseTimer = null
            navPhaseTimerTarget = null
            if (version === navMotionVersion && !showNavbar.value) {
                navPhase.value = 'hidden'
            }
        }, COLLAPSE_DURATION + COMPACT_SETTLE_DURATION)
        return
    }

    const wasHidden = previousPhase === 'hidden'
    navPhase.value = 'compact'
    if (!wasHidden) {
        navPhase.value = 'expanded'
        return
    }

    navPhaseTimerTarget = 'expanded'
    navPhaseTimer = setTimeout(() => {
        navPhaseTimer = null
        navPhaseTimerTarget = null
        if (version === navMotionVersion && showNavbar.value) {
            navPhase.value = 'expanded'
        }
    }, REVEAL_DURATION + COMPACT_SETTLE_DURATION)
}

const measureLabelWidths = async () => {
    await nextTick()
    const nav = navRef.value
    if (!nav) return

    nav.querySelectorAll<HTMLElement>('.menu-label').forEach((label) => {
        label.style.setProperty('--label-width', `${label.scrollWidth}px`)
    })
}

const defaultMusicPlayer = {
    name: 'Music',
    artist: '',
    cover: '',
    autoplay: true,
    volume: 0.6,
}
const normalizeVolume = (value?: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return defaultMusicPlayer.volume
    return Math.min(Math.max(value, 0), 1)
}

const rawMusicPlayerConfig = computed(() => {
    if (theme.value.musicPlayer) return theme.value.musicPlayer
    if (!theme.value.musicTrack) return null
    return {
        enabled: true,
        ...theme.value.musicTrack,
    }
})

const musicPlayer = computed(() => {
    const config = rawMusicPlayerConfig.value
    return {
        enabled: Boolean(config?.enabled),
        url: config?.url?.trim() || '',
        name: config?.name?.trim() || defaultMusicPlayer.name,
        artist: config?.artist?.trim() || defaultMusicPlayer.artist,
        cover: config?.cover?.trim() || defaultMusicPlayer.cover,
        autoplay: typeof config?.autoplay === 'boolean' ? config.autoplay : defaultMusicPlayer.autoplay,
        volume: normalizeVolume(config?.volume),
    }
})
const shouldShowMusicPlayer = computed(() => musicPlayer.value.enabled && Boolean(musicPlayer.value.url))

const handleMotionPreferenceChange = () => {
    syncNavPhase(showNavbar.value)
}

const handleNavMouseEnter = () => {
    navHovered.value = true
}

const handleNavMouseLeave = () => {
    navHovered.value = false
}

const revealNavigation = () => {
    setNavbarVisible(true)
}

const isModifiedEvent = (event?: MouseEvent) => {
    if (!event) return false
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

const getUrl = (link: string) => new URL(
    link,
    typeof window === 'undefined' ? 'http://localhost' : window.location.href,
)

const isInternalLink = (link: string) => {
    const currentOrigin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
    return getUrl(link).origin === currentOrigin
}

const getLinkTarget = (link?: string) => link && !isInternalLink(link) ? '_blank' : undefined
const getLinkRel = (link?: string) => link && !isInternalLink(link) ? 'noopener noreferrer' : undefined

const navigateTo = (link: string, event?: MouseEvent) => {
    if (typeof window === 'undefined') return

    const targetUrl = getUrl(link)
    const internal = isInternalLink(link)
    const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`

    if (internal && !isModifiedEvent(event)) {
        void router.go(targetPath)
        return
    }

    const targetWindow = internal ? '_self' : '_blank'
    window.open(targetUrl.toString(), targetWindow, internal ? undefined : 'noopener,noreferrer')
}

const handleLinkClick = (link: string | undefined, event: MouseEvent) => {
    if (!link) {
        event.preventDefault()
        return
    }

    if (!isInternalLink(link) || isModifiedEvent(event)) return

    event.preventDefault()
    void router.go(`${getUrl(link).pathname}${getUrl(link).search}${getUrl(link).hash}`)
}

const handleMenuClick = (item: MenuChildItem, event?: MouseEvent) => {
    closeMenuPanel()
    if (!item.link) return

    navigateTo(item.link, event)
}

const syncRectFromElement = (
    element: HTMLElement | null | undefined,
    targetRect: typeof menuTriggerRect,
) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    targetRect.value = DOMRect.fromRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
    })
}

const cancelCloseMenuPanel = () => {
    if (!menuCloseTimer) return
    clearTimeout(menuCloseTimer)
    menuCloseTimer = null
}

const closeMenuPanel = () => {
    cancelCloseMenuPanel()
    menuDropdownRef.value?.handleClose()
}

const scheduleCloseMenuPanel = () => {
    cancelCloseMenuPanel()
    menuCloseTimer = setTimeout(closeMenuPanel, 140)
}

const openMenuPanel = (item: MenuItem, triggerEl: HTMLElement) => {
    if (!item.children?.length) return
    cancelCloseMenuPanel()
    activeMenuItem.value = item
    syncRectFromElement(triggerEl, menuTriggerRect)
    menuDropdownRef.value?.handleOpen()
}

const handleMenuTriggerMouseEnter = (item: MenuItem, event: MouseEvent) => {
    openMenuPanel(item, event.currentTarget as HTMLElement)
}

const handleMenuTriggerClick = (item: MenuItem, event: MouseEvent) => {
    const triggerEl = event.currentTarget as HTMLElement
    const isSameTrigger = activeMenuItem.value?.label === item.label
    if (menuPanelVisible.value && isSameTrigger) {
        closeMenuPanel()
        return
    }

    openMenuPanel(item, triggerEl)
}

const onMenuPanelVisibleChange = (visible: boolean) => {
    menuPanelVisible.value = visible
    if (!visible) activeMenuItem.value = null
}

const cancelCloseMusicPanel = () => {
    if (!musicCloseTimer) return
    clearTimeout(musicCloseTimer)
    musicCloseTimer = null
}

const closeMusicPanel = () => {
    cancelCloseMusicPanel()
    musicDropdownRef.value?.handleClose()
}

const blurNavFocus = () => {
    const activeElement = document.activeElement
    const focusOwners = [
        navRef.value,
        document.getElementById('menu-panel'),
        document.getElementById('music-player-panel'),
    ]

    if (activeElement instanceof HTMLElement && focusOwners.some((owner) => owner?.contains(activeElement))) {
        activeElement.blur()
    }
}

const scheduleCloseMusicPanel = () => {
    cancelCloseMusicPanel()
    musicCloseTimer = setTimeout(closeMusicPanel, 140)
}

const openMusicPanel = () => {
    cancelCloseMusicPanel()
    syncRectFromElement(musicTriggerRef.value, musicTriggerRect)
    musicDropdownRef.value?.handleOpen()
}

const handleMusicTriggerClick = () => {
    syncRectFromElement(musicTriggerRef.value, musicTriggerRect)
    if (musicPanelVisible.value) {
        closeMusicPanel()
        return
    }
    openMusicPanel()
}

const onMusicPanelVisibleChange = (visible: boolean) => {
    musicPanelVisible.value = visible
}

watch(showNavbar, (visible) => {
    if (!visible) {
        closeMenuPanel()
        closeMusicPanel()
        blurNavFocus()
    }
    syncNavPhase(visible)
}, {
    immediate: true,
    flush: 'sync',
})

watch([menuItems, shouldShowMusicPlayer], () => {
    void measureLabelWidths()
})

// A new toast reveals the island (via nav's existing public entry) so a scrolled-away
// island pops out to show it. navPhase's own logic is untouched.
watch(() => activeToast.value?.id, (id) => {
    if (id !== undefined && !showNavbar.value) setNavbarVisible(true)
})

onMounted(() => {
    void measureLabelWidths()

    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMediaQuery.addEventListener('change', handleMotionPreferenceChange)
    if ('fonts' in document) {
        void document.fonts.ready.then(measureLabelWidths)
    }
})

onBeforeUnmount(() => {
    clearNavPhaseTimer()
    motionMediaQuery?.removeEventListener('change', handleMotionPreferenceChange)
    motionMediaQuery = null
    cancelCloseMenuPanel()
    cancelCloseMusicPanel()
})
</script>

<style lang="scss" scoped>
$nav-height: var(--nav-height);
$border-radius: 50px;
$nav-gap: 4px;
$nav-reveal-peek: 8px;
$nav-collapse-duration: 210ms;
$nav-transform-duration: 240ms;

#nav-reveal-zone {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: var(--z-fixed-control);
    display: flex;
    align-items: flex-start;
    width: max-content;
    max-width: 100vw;
    height: $nav-height;
    transform: translateX(-50%);

    &.nav-reveal-zone-hidden {
        height: $nav-reveal-peek;
    }
}

#menu,
.nav-toast {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    border-radius: $border-radius;
    background-color: rgba(var(--vp-c-bg-rgb), 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(12px);
}

#nav {
    --nav-search-compact-size: 35px;

    height: calc(#{$nav-height} - #{$nav-gap} * 2);
    position: relative;
    top: $nav-gap;
    transform: translateY(0);
    z-index: 1;
    opacity: 0.9;
    display: flex;
    transition: transform $nav-transform-duration cubic-bezier(0.16, 1, 0.3, 1);

    &.nav-hidden {
        transform: translateY(calc(-100% - #{$nav-gap} + #{$nav-reveal-peek}));
        transition-duration: $nav-transform-duration;
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    }
}

.nav-reveal-trigger {
    position: absolute;
    z-index: 2;
    inset: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid var(--vp-c-brand);
        outline-offset: -2px;
    }
}

@media (hover: hover) and (pointer: fine) {
    #nav-reveal-zone.nav-reveal-zone-hidden:hover #nav.nav-hidden {
        transform: translateY(0);
        transition-duration: 180ms;
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
}

/* Keep the menu as an animation anchor while the content-sized toast surface takes over. */
#nav.nav-toasting #menu {
    opacity: 0;
}

.nav-toast {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: max-content;
    max-inline-size: calc(100vw - 16px);
    block-size: 100%;
    padding: 0 20px;
    transform: translateX(-50%);
    gap: 8px;
    min-inline-size: 0;
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
}

.nav-toast-icon {
    flex: 0 0 auto;
}

.nav-toast--success .nav-toast-icon {
    color: var(--vp-c-brand);
}

.nav-toast--error .nav-toast-icon {
    color: var(--vp-c-red-1);
}

.nav-toast-text {
    flex: 0 1 auto;
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}

.nav-toast-fade-enter-active,
.nav-toast-fade-leave-active {
    transition: opacity 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-toast-fade-enter-from,
.nav-toast-fade-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px) scale(0.98);
}

#menu {
    --nav-item-active-bg: color-mix(in srgb, var(--vp-c-brand) 12%, transparent);

    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    margin: 0 auto;
    min-inline-size: 0;
    padding: 0 20px;
    overflow: hidden;
    transition: opacity 160ms ease-out;

    .menu-fitem {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        isolation: isolate;
        line-height: 1;
        padding: 8px 10px;
        border: 0;
        border-radius: 0.625rem;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        text-decoration: none;
        user-select: none;
        transition: color 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .menu-fitem:not(.menu-fitem-search)::before {
        position: absolute;
        z-index: 0;
        inset: 3px 2px;
        border-radius: inherit;
        background: var(--nav-item-active-bg);
        content: '';
        opacity: 0;
        pointer-events: none;
        transition: opacity 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .menu-fitem:focus-visible,
    .menu-fitem.menu-fitem-active {
        color: var(--vp-c-brand);
    }

    .menu-fitem:focus-visible {
        outline: 2px solid var(--vp-c-brand);
        outline-offset: 2px;
    }

    .menu-fitem:not(.menu-fitem-search):is(:focus-visible, .menu-fitem-active)::before {
        opacity: 1;
    }

    .menu-fitem-content {
        position: relative;
        z-index: 1;
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: gap $nav-collapse-duration cubic-bezier(0.16, 1, 0.3, 1);
    }

    .menu-label {
        box-sizing: border-box;
        display: inline-block;
        min-width: 0;
        width: var(--label-width);
        overflow: hidden;
        opacity: 1;
        white-space: nowrap;
        transition:
            width $nav-collapse-duration cubic-bezier(0.16, 1, 0.3, 1),
            opacity 120ms ease-out 60ms;
    }

    .menu-trigger-icon {
        transform-origin: center;
        transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .menu-fitem.menu-fitem-active .menu-trigger-icon {
        transform: rotate(180deg);
    }

    .menu-fitem-music {
        cursor: pointer;
    }

    .menu-fitem-menu {
        order: 1;
    }

    .music-icon {
        transform-origin: center;
    }

    .music-icon-rotating {
        animation: music-spin 2s linear infinite;
    }

    .menu-fitem-search {
        align-self: center;
        flex: 0 1 auto;
        inline-size: clamp(8.5rem, 13vw, 12.5rem);
        min-inline-size: 0;
        padding: 0;
        transition: inline-size $nav-collapse-duration cubic-bezier(0.16, 1, 0.3, 1);

        :deep(.VPNavBarSearchButton) {
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            inline-size: 100%;
            block-size: var(--nav-search-compact-size);
            min-inline-size: 0;
            overflow: hidden;
            padding: 0 10px;
            border: 1px solid color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
            border-radius: 0.625rem;
            background: color-mix(in srgb, var(--vp-c-bg-alt) 72%, transparent);
            color: var(--vp-c-text-2);
            cursor: pointer;
            font: inherit;
            font-size: 0.875rem;
            line-height: 1;
            transition:
                background-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
                border-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
                color 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
                padding $nav-collapse-duration cubic-bezier(0.4, 0, 1, 1),
                border-radius $nav-collapse-duration cubic-bezier(0.4, 0, 1, 1);
        }

        :deep(.VPNavBarSearchButton .text) {
            display: block;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        :deep(.VPNavBarSearchButton .vpi-search) {
            flex: 0 0 auto;
            margin: 0;
            font-size: 18px;
        }

        :deep(.VPNavBarSearchButton:focus-visible) {
            background-color: var(--nav-item-active-bg);
            color: var(--vp-c-brand);
            outline: 2px solid var(--vp-c-brand);
            outline-offset: 2px;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    #menu .menu-fitem:not(.menu-fitem-search):hover {
        color: var(--vp-c-brand);
    }

    #menu .menu-fitem:not(.menu-fitem-search):hover::before {
        opacity: 1;
    }

    #menu .menu-fitem-search :deep(.VPNavBarSearchButton:hover) {
        background-color: var(--nav-item-active-bg);
        color: var(--vp-c-brand);
    }
}

#nav.nav-compact {
    #menu .menu-fitem-content {
        gap: 0;
        transition: gap $nav-collapse-duration cubic-bezier(0.4, 0, 1, 1);
    }

    #menu .menu-label {
        width: 0;
        opacity: 0;
        transition:
            width $nav-collapse-duration cubic-bezier(0.4, 0, 1, 1),
            opacity 80ms ease-in;
    }

    #menu .menu-fitem-search {
        inline-size: var(--nav-search-compact-size);

        :deep(.VPNavBarSearchButton) {
            justify-content: center;
            gap: 0;
            padding: 0;
        }

        :deep(.VPNavBarSearchButton .text),
        :deep(.VPNavBarSearchButton .keys) {
            display: none;
        }
    }
}

@keyframes music-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.music-player-shell {

    padding: 0;
    border-radius: 18px;
    overflow: hidden;
    background: var(--vp-c-bg);
}

.menu-panel-shell {
    inline-size: min(13.5rem, calc(100vw - 2rem));
}

.menu-panel-shell :deep(.menu-item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.menu-item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
    #nav,
    #nav.nav-hidden,
    #nav.nav-hidden:hover,
    #menu,
    #menu .menu-fitem,
    #menu .menu-fitem::before,
    #menu .menu-fitem-content,
    #menu .menu-label,
    #menu .menu-trigger-icon,
    #menu .menu-fitem-search :deep(.VPNavBarSearchButton),
    #menu .menu-fitem-search :deep(.VPNavBarSearchButton .text),
    #nav.nav-compact #menu .menu-fitem-content,
    #nav.nav-compact #menu .menu-label,
    .nav-toast-fade-enter-active,
    .nav-toast-fade-leave-active {
        transition: none;
    }
}

@media (max-width: 748px) {
    .menu-panel-shell {
        inline-size: min(125px, calc(100vw - 2rem));
    }

    #nav {
        max-inline-size: calc(100vw - 16px);
    }

    #nav #menu .menu-fitem-content {
        gap: 0;
    }

    #nav #menu .menu-fitem-search :deep(.VPNavBarSearchButton) {
        position: relative;
    }

    #nav #menu .menu-fitem-search :deep(.VPNavBarSearchButton .text) {
        display: block;
        position: absolute;
        inset-inline: 36px 10px;
    }

    #nav.nav-compact #menu .menu-fitem-search :deep(.VPNavBarSearchButton .text) {
        opacity: 0;
        transition: opacity 80ms ease-in;
    }

    #nav:not(.nav-compact) #menu .menu-fitem-search :deep(.VPNavBarSearchButton .text) {
        opacity: 1;
        transition: opacity 120ms ease-out 120ms;
    }

    #nav #menu .menu-label {
        width: 0;
        opacity: 0;
    }
}
</style>
