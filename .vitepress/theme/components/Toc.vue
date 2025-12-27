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

// 目录数据
interface Node {
  children: Node[]
  label: string
  value: string
  level: number
}

const headers = shallowRef<Node[]>([])

// 获取页面标题
const getHeaders = (range: any): Node[] => {
  if (range === false) {
    return []
  }
  
  const headerElements = Array.from(
    document.querySelectorAll<HTMLHeadingElement>('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
  )
  
  const headerData = headerElements
    .filter(el => el.id && el.hasChildNodes())
    .map(el => ({
      label: el.textContent?.trim() || '',
      value: `#${el.id}`,
      level: Number(el.tagName[1]),
      children: []
    }))

  return resolveHeaders(headerData, range)
}

// 解析标题范围
const resolveHeaders = (headers: Node[], range: any): Node[] => {
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
const buildTree = (data: Node[], min: number, max: number): Node[] => {
  const result: Node[] = []
  const stack: Node[] = []
  
  data.forEach(item => {
    const node: Node = item
    let parent = stack[stack.length - 1]
    
    while (parent && parent.level >= node.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }
    
    if (node.level > max || node.level < min) return
    
    if (parent) {
      parent.children.push(node)
    } else {
      result.push(node)
    }
    
    stack.push(node)
  })
  
  return result
}

// 锚点变化处理
const anchor_change = (e: string): void => {
  if (typeof window === 'undefined') return
  
  treeRef.value?.setCurrentKey(e)
  
  nextTick(() => {
    window.history.replaceState(null, '', e)
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
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep')
})

// 监听内容更新
onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep')
})
</script>

<template>
  <div style="min-height: 0; height: 100%; display: flex; flex-direction: column;">
    <span class="toc-title" style="font-weight: 600; height: 25px;">
      <i class="fa-solid fa-compass">&nbsp;目录导航</i>
      &nbsp;&nbsp;
      <el-button class="fa-solid fa-location-dot" style="background-color: transparent;"
        type="default"
        size="small"
        @click="move2current_anchor"
      >
      </el-button>
    </span>

    <el-anchor
      v-if="headers.length"
      :container="scrollContainer"
      :offset="45"
      direction="vertical"
      style="background-color: transparent; min-height: 0; height: 100%; display: flex; flex-direction: column;"
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