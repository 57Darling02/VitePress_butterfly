<template>
    <div id="nav">
        <!-- 左侧标题部分 -->
        <a  id="title" :class="{ 'nav-hidden': !showNavbar }" href="" @mouseenter="showNavbar = !showNavbar" >
            <el-text style="color: var(--vp-c-text-1);" id="title_text" truncated >{{ page?.title ? page.title :
                theme.site_name }}</el-text>
        </a>

        <!-- 右侧菜单部分 -->
        <div id="menu" :class="{ 'nav-hidden': !showNavbar }">
            <a class="menu-fitem" href="/">
                <span>
                    <i class="fa-solid fa-house"></i>首页
                </span>
            </a>
            <div class="dropitem">
                <el-dropdown v-for="item in menuItems" :key="item.label" popper-class="custom-dropdown">
                    <a class="menu-fitem" style="color: var(--vp-c-text-1);">
                        <span>
                            <i :class="item.icon"></i>
                            {{ item.label }}
                            <i class="fa-solid fa-caret-up arrow-icon" style="padding-top: 4%;"></i>
                        </span>
                    </a>
                    <template #dropdown v-if="item.children?.length">
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="subitem in item.children" :key="subitem.key" class="menu-item"
                                @click="handleMenuClick(subitem)">
                                <i :class="subitem.icon"></i>
                                {{ subitem.label }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useData, useRouter } from 'vitepress'
const { theme, page, frontmatter } = useData()
import { ref, computed, onUnmounted, watch } from 'vue'
import { inject } from 'vue'
// 获取全局状态和方法
const showNavbar = inject('showNavbar')

const { menuItems } = theme.value
const handleMenuClick = (item) => {
    if (item.children?.length) return
    if (item.link) {
        // 生成完整路径
        const basePath = window.location.origin
        const fullPath = item.link.startsWith('/')
            ? `${basePath}${item.link}`
            : item.link
        if (fullPath.startsWith(basePath)) {
            window.open(fullPath, '_self') // 内部在当前标签页打开
        }
        else {
            window.open(fullPath, '_blank') // 外部保持新标签页打开行为
        }
    }
}


</script>

<style lang="scss" scoped>
// 定义变量
$nav-height: var(--nav-height); // 导航栏高度变量
$icon-size: 16px; // 正方形图标尺寸变量
$line-height: 2px; // 线条高度
$line-spacing: 5px; // 线条间距
$animation-duration: 0.3s; // 动画时长

$nav-bg: var(--vp-c-bg-elv);
$border-radius: 50px;
$transition-time: 0.5s;
$hide-offset: 100%;

#nav {
    height: $nav-height;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    opacity: 0.9; // 稍微提高不透明度以增强毛玻璃效果
    border-bottom: 1px solid rgba(255, 255, 255, 0.2); // 半透明白色边框
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1); // 添加柔和阴影增强层次感
    border-radius: $border-radius;
    background-color: rgba(var(--vp-c-bg-rgb), 0.8); // 半透明白色背景
    backdrop-filter: blur(5px); // 毛玻璃效果
    -webkit-backdrop-filter: blur(12px); // Safari 浏览器兼容
    padding: 0 20px; // 调整内边距，让内容有合适的间距
    display: flex;
    overflow: hidden;

    transition: all $transition-time ease;
    min-width: 200px; // 标题的最小宽度
    max-width: 600px; // 菜单+标题的最大宽度
}

#title {
    display: flex;
    align-items: center; // 垂直居中
    font-weight: 700;
    max-width: 200px;
    height: 100%;
    text-decoration: none;
    color: var(--vp-c-text-1);
    transform: translateY(-100%);
    opacity: 0;
    transition: all $transition-time ease;
    margin-right: auto;
    
    
    width: 0;
    min-width: 0;
    &.nav-hidden {
        transform: translateY(0);
        opacity: 1;
        width: auto ;
    }
}

#menu {
    display: flex;
    align-items: center; // 垂直居中
    height: 100%;
    margin-left: auto;
    transition: all $transition-time ease;
    
    width: auto;
    min-width: 0;

    &:not(.nav-hidden) {
        transform: translateY(0);
        opacity: 1;
        width: fit-content ;
    }
    
    &.nav-hidden {
        transform: translateY(-100%);
        opacity: 0;
        width: 0;
        min-width: 0;
        pointer-events: none;
    }

    el-dropdown,
    .menu-group {
        display: flex;
        gap: 12px;
        border: 0px;
    }

    [class*="el-"]:focus-visible {
        outline: none !important;
    }

    .menu-fitem {
        display: flex;
        align-items: center; // 垂直居中
        line-height: 2;
        margin-left: 20px;
        text-decoration: none;
    }

    .menu-fitem span {
        background: linear-gradient(to right, #3498db, #2980b9) no-repeat left bottom;
        background-size: 0 5px;
        transition: background-size 0.3s;
        font-size: 1rem;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .menu-fitem span:hover {
        background-size: 100% 5px;
    }

    .sbbtn {
        display: none;
    }

    .arrow-icon {
        margin-left: 8px;
        transition: transform 0.3s ease;
        display: inline-block;
    }

    .menu-fitem:hover .arrow-icon {
        transform: rotate(180deg);
    }
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
}
</style>