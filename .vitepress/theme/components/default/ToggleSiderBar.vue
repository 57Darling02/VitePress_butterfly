<template>
    <i class="fa-jelly-slash fa-regular fa-sidebar-flip" @click="toggleSidebar"></i>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
const showSidebar = inject<Ref<boolean>>('showSidebar', ref(true))
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
}
</script>
