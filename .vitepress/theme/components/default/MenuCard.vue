<template>
  <div class="a-card menu-card">
    <div class="menu-list">
      <div v-for="item in menuItems" :key="item.label" class="menu-group">
        <!-- 顶级菜单项 -->
        <a class="menu-link" @click="handleMenuClick(item)" :class="{ 'has-children': item.children?.length }">
          <i :class="item.icon" class="menu-icon"></i>
          <span class="menu-text">{{ item.label }}</span>
          <i v-if="item.children?.length" class="fa-solid fa-chevron-right arrow-icon" :class="{ 'is-active': expandedKeys.includes(item.label) }"></i>
        </a>
        
        <!-- 子菜单 -->
        <div v-if="item.children?.length" class="submenu" :class="{ 'is-expanded': expandedKeys.includes(item.label) }">
          <a v-for="subitem in item.children" 
             :key="subitem.key" 
             class="submenu-link"
             @click.stop="handleSubMenuClick(subitem)">
            <i :class="subitem.icon" class="submenu-icon"></i>
            <span>{{ subitem.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const { theme } = useData()
const { menuItems } = theme.value

// 展开状态管理
const expandedKeys = ref<string[]>([])

// 初始化时默认展开第一个有子菜单的项目
onMounted(() => {
  for (const item of menuItems) {
    if (item.children?.length) {
      expandedKeys.value.push(item.label)
      break
    }
  }
})

const handleMenuClick = (item: any) => {
  if (item.children?.length) {
    // 切换展开状态
    const index = expandedKeys.value.indexOf(item.label)
    if (index > -1) {
      expandedKeys.value.splice(index, 1)
    } else {
      expandedKeys.value.push(item.label)
    }
  } else if (item.link) {
    // 只有没有子菜单时才处理跳转
    navigate(item.link)
  }
}

const handleSubMenuClick = (item: any) => {
  if (item.link) {
    navigate(item.link)
  }
}

const navigate = (link: string) => {
  const basePath = window.location.origin
  const fullPath = link.startsWith('/')
    ? `${basePath}${link}`
    : link
    
  if (fullPath.startsWith(basePath)) {
    window.open(fullPath, '_self')
  } else {
    window.open(fullPath, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.menu-card {
  padding: 15px;
  margin-top: 15px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-group {
  display: flex;
  flex-direction: column;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-brand);
    transform: translateX(5px);
  }
}

.menu-icon {
  width: 24px;
  text-align: center;
  margin-right: 12px;
  font-size: 1.1em;
}

.menu-text {
  flex: 1;
  font-weight: 500;
}

.arrow-icon {
  font-size: 0.8em;
  opacity: 0.5;
  transition: transform 0.3s;
  
  &.is-active {
    transform: rotate(90deg);
    opacity: 1;
  }
}

/* 子菜单样式 */
.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  margin-left: 20px;
  border-left: 2px solid var(--vp-c-divider);
  
  &.is-expanded {
    max-height: 500px; /* 足够展示子菜单的高度 */
    transition: max-height 0.5s ease-in;
  }
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin: 5px 0 5px 10px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--vp-c-brand);
    background: var(--vp-c-bg-alt);
  }
}

.submenu-icon {
  margin-right: 10px;
  width: 16px;
  text-align: center;
}
</style>
