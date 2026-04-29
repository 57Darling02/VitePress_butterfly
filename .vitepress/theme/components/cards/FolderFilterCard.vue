<template>
  <div class="a-card folder-filter-card">
    <div class="card-header">
      <h3 class="title">
        <i class="fa-solid fa-folder-tree"></i> 目录筛选
        <span class="title-count">{{ posts.length }}</span>
      </h3>
      <div class="actions" v-if="selectedFolder">
        <el-button link type="primary" size="small" @click="selectFolder('')">清除</el-button>
      </div>
    </div>

    <div class="folder-tree">
      <button
        v-for="node in visibleFolders"
        :key="node.path"
        class="folder-row"
        :class="{ 'is-active': node.path === selectedFolder }"
        :style="{ paddingLeft: `${8 + node.level * 14}px` }"
        type="button"
        @click="selectFolder(node.path)"
      >
        <span
          class="folder-toggle"
          :class="{ 'is-hidden': node.children.length === 0 }"
          @click.stop="toggleFolder(node.path)"
        >
          <i :class="isExpanded(node.path) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
        </span>
        <i :class="getFolderIcon(node)"></i>
        <span class="folder-name">{{ node.label }}</span>
        <span class="folder-count">{{ node.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { DEFAULT_POST_CATEGORY } from '../../utils/postCategory'

type FolderNode = {
  children: FolderNode[]
  count: number
  label: string
  level: number
  path: string
}

const props = defineProps<{
  posts: any[]
  selectedFolder: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedFolder', folder: string): void
}>()

const expandedFolders = ref(new Set<string>())

const createNode = (label: string, path: string, level: number): FolderNode => ({
  children: [],
  count: 0,
  label,
  level,
  path
})

const getChild = (parent: FolderNode, label: string, path: string): FolderNode => {
  let child = parent.children.find((node) => node.path === path)
  if (!child) {
    child = createNode(label, path, parent.level + 1)
    parent.children.push(child)
  }
  return child
}

const sortTree = (node: FolderNode): FolderNode => {
  node.children = node.children
    .map(sortTree)
    .sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'))
  return node
}

const folderTree = computed(() => {
  const root = createNode('', '', -1)
  root.count = props.posts.length

  props.posts.forEach((post) => {
    const category = post.category || DEFAULT_POST_CATEGORY

    if (category === DEFAULT_POST_CATEGORY) {
      const child = getChild(root, '未分类', DEFAULT_POST_CATEGORY)
      child.count += 1
      return
    }

    let current = root
    let currentPath = ''

    category.split('/').filter(Boolean).forEach((segment: string) => {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment
      current = getChild(current, segment, currentPath)
      current.count += 1
    })
  })

  return sortTree(root)
})

const visibleFolders = computed(() => {
  const rows: FolderNode[] = []

  const visit = (node: FolderNode) => {
    rows.push(node)
    if (expandedFolders.value.has(node.path)) {
      node.children.forEach(visit)
    }
  }

  folderTree.value.children.forEach(visit)
  return rows
})

const isExpanded = (path: string) => expandedFolders.value.has(path)

const toggleFolder = (path: string) => {
  const next = new Set(expandedFolders.value)
  if (next.has(path)) {
    next.delete(path)
  } else {
    next.add(path)
  }
  expandedFolders.value = next
}

const selectFolder = (folder: string) => {
  emit('update:selectedFolder', folder)
}

const expandAncestors = (folder: string) => {
  const next = new Set(expandedFolders.value)

  let currentPath = ''
  folder.split('/').filter(Boolean).forEach((segment) => {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment
    next.add(currentPath)
  })

  expandedFolders.value = next
}

const getFolderIcon = (node: FolderNode) => {
  if (node.path === DEFAULT_POST_CATEGORY) return 'fa-solid fa-file-lines'
  return isExpanded(node.path) ? 'fa-solid fa-folder-open' : 'fa-solid fa-folder'
}

watch(() => props.selectedFolder, expandAncestors, { immediate: true })
</script>

<style lang="scss" scoped>
.folder-filter-card {
  padding: 15px;
  margin-top: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-count {
  min-width: 18px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  font-size: 0.8em;
  line-height: 1.4;
  padding: 0 5px;
  text-align: center;
}

.folder-tree {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.folder-row {
  width: 100%;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: grid;
  grid-template-columns: 18px 18px minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  text-align: left;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: var(--vp-c-text-1);
    background: rgba(64, 158, 255, 0.08);
  }

  &.is-active {
    color: var(--vp-c-text-1);
    background: rgba(64, 158, 255, 0.12);
    border-color: rgba(64, 158, 255, 0.3);
    font-weight: 600;
  }
}

.folder-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  font-size: 11px;

  &:hover {
    background: rgba(64, 158, 255, 0.12);
  }

  &.is-hidden {
    visibility: hidden;
  }
}

.folder-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.folder-count {
  min-width: 18px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  font-size: 0.8em;
  line-height: 1.4;
  padding: 0 5px;
  text-align: center;
}
</style>
