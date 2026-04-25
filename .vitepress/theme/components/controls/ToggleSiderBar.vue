<template>
    <i :class="[
        'fas',
        sidebarOpen ? 'fa-outdent' : 'fa-sidebar-flip'
    ]" @click="toggleSidebar"></i>
</template>

<script setup lang="ts">
import { useLayoutState } from '../../composables/useLayoutState'

const { sidebarOpen, toggleSidebar } = useLayoutState()
</script>

<style scoped>
.fa-outdent {
    transform: rotate(180deg);
}
</style>
