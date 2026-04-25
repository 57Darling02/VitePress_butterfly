<template>
  <ElImageViewer
    v-if="visible && imageUrls.length"
    :url-list="imageUrls"
    :initial-index="initialIndex"
    :hide-on-click-modal="true"
    :teleported="true"
    :show-progress="imageUrls.length > 1"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
import { ElImageViewer } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const imageUrls = ref<string[]>([])
const initialIndex = ref(0)

function handleClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  const img = target.closest<HTMLImageElement>('.vp-doc img:not([data-no-preview])')
  if (!img || img.closest('a')) return

  const doc = img.closest('.vp-doc')
  if (!doc) return

  const images = Array.from(doc.querySelectorAll<HTMLImageElement>('img:not([data-no-preview])'))
    .filter((item) => !item.closest('a') && (item.currentSrc || item.src))

  initialIndex.value = images.indexOf(img)
  if (initialIndex.value < 0) return

  event.preventDefault()
  imageUrls.value = images.map((item) => item.currentSrc || item.src)
  visible.value = true
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>
