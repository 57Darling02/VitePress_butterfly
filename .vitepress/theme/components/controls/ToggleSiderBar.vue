<template>
    <i :class="[
        'fas',
        showSidebar ? 'fa-chevron-right' : 'fa-sidebar-flip'
    ]" @click="toggleSidebar"></i>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
const showSidebar = inject<Ref<boolean>>('showSidebar', ref(true))
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
}
</script>
