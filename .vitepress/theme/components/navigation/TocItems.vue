<script lang="ts" setup>
interface TocNode {
  children: TocNode[]
  label: string
  value: string
  level: number
}

defineProps<{
  activeAnchor: string
  items: TocNode[]
  root?: boolean
}>()

const emit = defineEmits<{
  (event: 'navigate', anchor: string): void
}>()

</script>

<template>
  <ul class="toc-list" :class="{ 'is-root': root }">
    <li v-for="item in items" :key="item.value" class="toc-item">
      <a
        class="toc-link"
        :class="{ 'is-active': item.value === activeAnchor }"
        :href="item.value"
        :title="item.label"
        @click.prevent="emit('navigate', item.value)"
      >
        {{ item.label }}
      </a>

      <TocItems
        v-if="item.children.length"
        :items="item.children"
        :active-anchor="activeAnchor"
        @navigate="emit('navigate', $event)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.toc-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0 0 0 12px;
}

.toc-list.is-root {
  padding-left: 0;
}

.toc-item {
  min-width: 0;
}

.toc-link {
  display: block;
  min-width: 0;
  border-radius: 8px;
  padding: 5px 8px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.35;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.toc-link:hover {
  background-color: rgba(64, 158, 255, 0.08);
  color: var(--vp-c-text-1);
}

.toc-link.is-active {
  background-color: rgba(64, 158, 255, 0.12);
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
