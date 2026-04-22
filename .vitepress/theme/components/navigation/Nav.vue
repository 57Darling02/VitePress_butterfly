<template>
    <div id="nav" :class="{ 'nav-hidden': !showNavbar }">
        <div id="menu">
            <a class="menu-fitem" href="/" @click.prevent="handleHomeClick">
                <span>
                    <i class="fa-solid fa-house"></i>{{ showSidebar ? '首页' : '' }}
                </span>
            </a>

            <a v-for="item in menuItems" :key="item.label"
                :class="['menu-fitem', { 'menu-fitem-active': menuPanelVisible && activeMenuItem?.label === item.label }]"
                @mouseenter="handleMenuTriggerMouseEnter(item, $event)" @mouseleave="scheduleCloseMenuPanel"
                @click.prevent="handleMenuTriggerClick(item, $event)">
                <span>
                    <i :class="item.icon" class="arrow-icon"></i>
                    {{ showSidebar ? item.label : '' }}
                </span>
            </a>

            <a v-if="shouldShowMusicPlayer" ref="musicTriggerRef"
                :class="['menu-fitem', 'menu-fitem-music', { 'menu-fitem-active': musicPanelVisible }]"
                @mouseenter="openMusicPanel" @mouseleave="scheduleCloseMusicPanel" @click.prevent="handleMusicTriggerClick">
                <span>
                    <i class="fa-solid fa-compact-disc music-icon" :class="{ 'music-icon-rotating': isMusicPlaying }"></i>
                    {{ showSidebar ? '音乐' : '' }}
                </span>
            </a>
        </div>
    </div>

    <el-dropdown ref="menuDropdownRef" :virtual-ref="menuVirtualTriggerRef" :popper-style="popperStyle"
        :show-arrow="false" :hide-on-click="false" :popper-options="menuPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMenuPanelVisibleChange">
        <template #dropdown>
            <div class="menu-panel-shell" @mouseenter="cancelCloseMenuPanel" @mouseleave="scheduleCloseMenuPanel">
                <el-dropdown-menu>
                    <el-dropdown-item v-for="subitem in activeMenuItem?.children || []" :key="subitem.key" class="menu-item"
                        @click="handleMenuClick(subitem)">
                        <i :class="subitem.icon"></i>
                        {{ subitem.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </div>
        </template>
    </el-dropdown>

    <el-dropdown v-if="shouldShowMusicPlayer" ref="musicDropdownRef" :virtual-ref="musicVirtualTriggerRef" :popper-style="popperStyle"
        :show-arrow="false" :hide-on-click="false" :popper-options="musicPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMusicPanelVisibleChange">
        <template #dropdown>
            <div class="music-player-shell" @mouseenter="cancelCloseMusicPanel" @mouseleave="scheduleCloseMusicPanel">
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
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import type ThemeConfig from '../../types/ThemeConfig'
import APlayerWidget from '../player/APlayerWidget.vue'

const { theme } = useData<ThemeConfig>()
const router = useRouter()
const showNavbar = inject('showNavbar')
const showSidebar = inject('showSidebar', ref(true))
const menuItems = computed(() => (theme.value.menuItems || []) as any[])

const menuDropdownRef = ref<DropdownInstance>()
const menuPanelVisible = ref(false)
const activeMenuItem = ref<any | null>(null)

const musicDropdownRef = ref<DropdownInstance>()
const musicPanelVisible = ref(false)
const isMusicPlaying = ref(false)
const musicTriggerRef = ref<HTMLElement | null>(null)

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

const isModifiedEvent = (event?: MouseEvent) => {
    if (!event) return false
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

const navigateTo = (link: string, event?: MouseEvent) => {
    if (typeof window === 'undefined') return

    const targetUrl = new URL(link, window.location.href)
    const isInternalLink = targetUrl.origin === window.location.origin
    const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`

    if (isInternalLink && !isModifiedEvent(event)) {
        void router.go(targetPath)
        return
    }

    const targetWindow = isInternalLink ? '_self' : '_blank'
    window.open(targetUrl.toString(), targetWindow, isInternalLink ? undefined : 'noopener,noreferrer')
}

const handleHomeClick = (event: MouseEvent) => {
    navigateTo('/', event)
}

const handleMenuClick = (item: any, event?: MouseEvent) => {
    closeMenuPanel()
    if (item.children?.length) return
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

const openMenuPanel = (item: any, triggerEl: HTMLElement) => {
    if (!item.children?.length) return
    cancelCloseMenuPanel()
    activeMenuItem.value = item
    syncRectFromElement(triggerEl, menuTriggerRect)
    menuDropdownRef.value?.handleOpen()
}

const handleMenuTriggerMouseEnter = (item: any, event: MouseEvent) => {
    openMenuPanel(item, event.currentTarget as HTMLElement)
}

const handleMenuTriggerClick = (item: any, event: MouseEvent) => {
    const triggerEl = event.currentTarget as HTMLElement
    if (!item.children?.length) {
        handleMenuClick(item)
        return
    }

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

onBeforeUnmount(() => {
    cancelCloseMenuPanel()
    cancelCloseMusicPanel()
})
</script>

<style lang="scss" scoped>
$nav-height: var(--nav-height);
$border-radius: 50px;
$transition-time: 0.5s;
$nav-gap: 4px;

#nav {
    height: calc(#{$nav-height} - #{$nav-gap} * 2);
    position: fixed;
    top: $nav-gap;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    opacity: 0.9;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    border-radius: $border-radius;
    background-color: rgba(var(--vp-c-bg-rgb), 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(12px);
    padding: 0 20px;
    display: flex;
    overflow: hidden;
    transition: all $transition-time ease;

    &.nav-hidden {
        transform: translateY(-100%) translateX(-50%);
    }
}

#menu {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    margin: 0 auto;
    transition: all $transition-time ease;

    [class*='el-']:focus-visible {
        outline: none !important;
    }

    .menu-fitem {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        padding: 8px 10px;
        text-decoration: none;
        user-select: none;
    }

    .menu-fitem span {
        position: relative;
        font-size: 1rem;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding-bottom: 3px;
    }

    .menu-fitem span::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 4px;
        border-radius: 999px;
        background: linear-gradient(to right, #3498db, #2980b9);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.25s ease;
        pointer-events: none;
    }

    .menu-fitem:hover span::after,
    .menu-fitem.menu-fitem-active span::after {
        transform: scaleX(1);
    }

    .arrow-icon {
        transition: transform 0.25s ease;
    }

    .menu-fitem.menu-fitem-active .arrow-icon {
        transform: rotate(180deg);
    }

    .menu-fitem-music {
        cursor: pointer;
    }

    .music-icon {
        transform-origin: center;
    }

    .music-icon-rotating {
        animation: music-spin 2s linear infinite;
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
</style>
