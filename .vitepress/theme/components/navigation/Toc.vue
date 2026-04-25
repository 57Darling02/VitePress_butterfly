<script lang="ts" setup>
import { ElTree } from 'element-plus'
import { onContentUpdated, useData } from 'vitepress'
import { nextTick, onMounted, ref, shallowRef } from 'vue'
const { frontmatter, theme } = useData()
const treeRef = ref<InstanceType<typeof ElTree>>()

const treeProps = {
  children: 'children',
  label: 'label',
  value: 'value'
}

const scrollContainer = ref<HTMLElement | Window | null>()
const scrollTocContainer = ref()

// 获取滚动容器
const getScrollContainer = (): HTMLElement | Window | null => {
  if (typeof window === 'undefined') return null
  return document.querySelector('.el-scrollbar__wrap') || window
}

interface TocNode {
  children: TocNode[]
  label: string
  value: string
  level: number
}

type HeaderItem = TocNode & {
  element: HTMLHeadingElement
}

type HeaderResult = {
  headers: TocNode[]
  pathMap: Map<string, string[]>
}

const headers = shallowRef<TocNode[]>([])
const anchorPathMap = shallowRef(new Map<string, string[]>())
const activeAnchor = ref('')
const ignoreHeaderChildRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/

const normalizeAnchor = (anchor: string): string => {
  if (!anchor) return ''
  const hashIndex = anchor.indexOf('#')
  return hashIndex >= 0 ? anchor.slice(hashIndex) : anchor
}

const serializeHeader = (el: HTMLHeadingElement): string => {
  let text = ''

  for (const node of el.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as HTMLElement
      if (ignoreHeaderChildRE.test(child.className)) continue
      text += child.textContent
    } else if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent
    }
  }

  return text.trim()
}

const syncExpandedToCurrent = (anchor: string): void => {
  const key = normalizeAnchor(anchor)
  if (!key) return

  const currentPath = anchorPathMap.value.get(key) ?? []
  const expandedKeys = new Set(currentPath)
  const treeStore = (treeRef.value as any)?.store
  const nodesMap = treeStore?.nodesMap
  if (!nodesMap) return

  Object.values(nodesMap).forEach((node: any) => {
    if (!node?.data?.children?.length) return
    node.expanded = expandedKeys.has(node.key)
  })
}

// 获取页面标题
const getHeaders = (range: any): HeaderResult => {
  if (range === false) {
    return { headers: [], pathMap: new Map() }
  }
  
  const headerElements = Array.from(
    document.querySelectorAll<HTMLHeadingElement>('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
  )
  
  const headerData = headerElements
    .filter(el => el.id && el.hasChildNodes())
    .map<HeaderItem>(el => ({
      label: serializeHeader(el),
      value: `#${el.id}`,
      level: Number(el.tagName[1]),
      element: el,
      children: []
    }))

  return resolveHeaders(headerData, range)
}

// 解析标题范围
const resolveHeaders = (headers: HeaderItem[], range: any): HeaderResult => {
  const levelsRange = (typeof range === 'object' && !Array.isArray(range)
    ? range.level
    : range) || 2
  
  const [high, low] = typeof levelsRange === 'number'
    ? [levelsRange, levelsRange]
    : levelsRange === 'deep'
      ? [2, 6]
      : levelsRange
  
  return buildTree(headers, high, low)
}

// 构建树形结构
const buildTree = (data: HeaderItem[], min: number, max: number): HeaderResult => {
  const result: TocNode[] = []
  const pathMap = new Map<string, string[]>()
  const stack: Array<{
    ignored: boolean
    level: number
    node: TocNode
    path: string[]
  }> = []
  
  data.forEach(item => {
    const node: TocNode = {
      label: item.label,
      value: item.value,
      level: item.level,
      children: []
    }
    let parent = stack[stack.length - 1]
    
    while (parent && parent.level >= item.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    const ignored = item.element.classList.contains('ignore-header') || Boolean(parent?.ignored)
    
    if (ignored) {
      stack.push({
        ignored: true,
        level: item.level,
        node,
        path: parent?.path ?? []
      })
      return
    }
    
    if (item.level > max || item.level < min) return
    
    if (parent) {
      parent.node.children.push(node)
    } else {
      result.push(node)
    }

    const currentPath = [...(parent?.path ?? []), node.value]
    pathMap.set(node.value, currentPath)
    
    stack.push({
      ignored: false,
      level: item.level,
      node,
      path: currentPath
    })
  })
  
  return { headers: result, pathMap }
}

const refreshHeaders = (): void => {
  const result = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep')
  headers.value = result.headers
  anchorPathMap.value = result.pathMap
}

// 锚点变化处理
const anchor_change = (e: string): void => {
  if (typeof window === 'undefined') return
  
  const currentAnchor = normalizeAnchor(e)
  if (!currentAnchor || currentAnchor === activeAnchor.value) return
  activeAnchor.value = currentAnchor

  treeRef.value?.setCurrentKey(currentAnchor)
  syncExpandedToCurrent(currentAnchor)
  
  nextTick(() => {
    window.history.replaceState(null, '', currentAnchor)
    move2current_anchor()
  })
}

// 滚动到当前锚点
const move2current_anchor = (): void => {
  if (!treeRef.value?.getCurrentKey() || !scrollTocContainer.value) return
  
  const nodeEl = treeRef.value.$el.querySelector(`.el-anchor__link.is-active`)
  if (!nodeEl) return
  
  const tocScrollWrap = scrollTocContainer.value.$el.querySelector('.el-scrollbar__wrap')
  if (!tocScrollWrap) return
  
  const containerRect = tocScrollWrap.getBoundingClientRect()
  const nodeRect = nodeEl.getBoundingClientRect()
  
  const nodeTopRelative = nodeRect.top - containerRect.top + tocScrollWrap.scrollTop
  const nodeBottomRelative = nodeRect.bottom - containerRect.top + tocScrollWrap.scrollTop
  
  const isVisible = (
    nodeTopRelative >= tocScrollWrap.scrollTop &&
    nodeBottomRelative <= tocScrollWrap.scrollTop + containerRect.height
  )
  
  if (!isVisible) {
    const targetPosition = nodeTopRelative - (containerRect.height / 2)
    tocScrollWrap.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

// 生命周期钩子
onMounted(() => {
  scrollContainer.value = getScrollContainer()
  refreshHeaders()
  nextTick(() => {
    const currentHash = typeof window === 'undefined' ? '' : normalizeAnchor(window.location.hash)
    if (!currentHash) return
    activeAnchor.value = currentHash
    treeRef.value?.setCurrentKey(currentHash)
    syncExpandedToCurrent(currentHash)
  })
})

// 监听内容更新
onContentUpdated(() => {
  refreshHeaders()
  nextTick(() => {
    const currentHash = typeof window === 'undefined' ? '' : normalizeAnchor(window.location.hash)
    if (!currentHash) return
    activeAnchor.value = currentHash
    treeRef.value?.setCurrentKey(currentHash)
    syncExpandedToCurrent(currentHash)
  })
})
</script>

<template>
  <div style="min-height: 0; height: 100%; display: flex; flex-direction: column;">
    <span class="toc-title" style="font-weight: 600; height: 25px;">
      &nbsp;大纲
      &nbsp;&nbsp;
      <el-button style="background-color: transparent;" round
        type="default"
        size="small"
        @click="move2current_anchor"
      >
      🎯
      </el-button>
    </span>

    <el-anchor
      v-if="headers.length"
      :container="scrollContainer"
      :offset="45"
      direction="vertical"
      style="background-color: transparent; min-height: 0; flex: 1; display: flex; flex-direction: column;"
      :marker="false"
      :select-scroll-top="true"
      @change="anchor_change"
    >
      <el-scrollbar style="flex: 1; min-height: 0;" ref="scrollTocContainer">
        <el-tree
          ref="treeRef"
          style="max-width: 300px; background-color: transparent;"
          :data="headers"
          :props="treeProps"
          :expand-on-click-node="false"
          :highlight-current="true"
          :indent="12"
          :check-on-click-leaf="false"
          node-key="value"
          :auto-expand-parent="false"
          :render-after-expand="false"
        >
          <template #default="{ data }">
            <el-anchor-link
              v-if="data.value && data.label"
              :href="data.value"
              :title="data.label"
            />
          </template>
        </el-tree>
      </el-scrollbar>
    </el-anchor>
  </div>
</template>

<style lang="scss">
.el-anchor__list {
  flex: 1;
  display: flex;
  overflow: hidden;
}
/* 为el-tree节点添加圆角样式 */
.el-tree {
  .el-tree-node {
    border-radius: 8px;
    margin: 2px 0;
    
    .el-tree-node__content {
      border-radius: 8px;
      padding: 4px 0;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(64, 158, 255, 0.08);
        border-radius: 8px;
      }
    }
    
    &.is-current {
      > .el-tree-node__content {
        background-color: rgba(64, 158, 255, 0.12);
        border-radius: 8px;
      }
    }
  }
  
  /* 为锚点链接添加圆角 */
  .el-anchor-link {
    .el-anchor-link__title {
      border-radius: 8px;
      padding: 0 8px;
      transition: all 0.2s ease;
    }
    
    &.is-active {
      .el-anchor-link__title {
        background-color: rgba(64, 158, 255, 0.12);
        border-radius: 8px;
      }
    }
    
    &:hover .el-anchor-link__title {
      background-color: rgba(64, 158, 255, 0.08);
      border-radius: 8px;
    }
  }
}
</style>
