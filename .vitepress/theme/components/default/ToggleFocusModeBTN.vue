<template>
    <i class="fa-solid fa-eye" @click="toggleFocusMode" :class="{'fa-eye-slash': !isFocusMode}"></i>

</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
const isFocusMode = inject<Ref<boolean>>('isFocusMode', ref(false))
const toggleFocusMode = () => {
    isFocusMode.value = !isFocusMode.value
}
</script>
