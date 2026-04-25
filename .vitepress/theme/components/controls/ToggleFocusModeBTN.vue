<template>
    <i class="fa-solid fa-eye" @click="toggleFocusMode" :class="{'fa-eye-slash': !isFocusMode}"></i>

</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useLayoutState } from '../../composables/useLayoutState'

const { isFocusMode, toggleFocusMode } = useLayoutState()

const syncNoMotionClass = (enabled: boolean) => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('no-motion', enabled)
}

watch(isFocusMode, (enabled) => {
    syncNoMotionClass(enabled)
}, { immediate: true })

onUnmounted(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.remove('no-motion')
})
</script>

<style>
html.no-motion,
html.no-motion body {
    scroll-behavior: auto !important;
}

html.no-motion *,
html.no-motion *::before,
html.no-motion *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    
}

html.no-motion::view-transition-old(root),
html.no-motion::view-transition-new(root) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
}
</style>
