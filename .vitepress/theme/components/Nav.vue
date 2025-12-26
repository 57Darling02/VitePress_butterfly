<template>
    <div id="nav" :class="{ 'nav-hidden': !showNavbar }">
        <div id="menu" >
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
import { useData } from 'vitepress'
const { theme} = useData()
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
    background-color: rgba(var(--vp-c-bg-rgb), 0.5); // 半透明白色背景
    backdrop-filter: blur(5px); // 毛玻璃效果
    -webkit-backdrop-filter: blur(12px); // Safari 浏览器兼容
    padding: 0 20px; // 调整内边距，让内容有合适的间距
    display: flex;
    overflow: hidden;
    transition: all $transition-time ease;
    &.nav-hidden {
        transform: translateY(-100%) translateX(-50%);
    }
}


#menu {
    display: flex;
    align-items: center; // 垂直居中
    height: 100%;
    margin-left: auto;
    transition: all $transition-time ease;
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
@media (max-width: 768px) {
    #nav {
        padding: 0 15px; // 减少内边距
        max-width: 95%; // 限制最大宽度
        min-width: auto; // 移除最小宽度限制
    }
    
    #menu {
        gap: 8px; // 减少间距
        flex-wrap: nowrap; // 禁止换行
        overflow-x: auto; // 允许水平滚动
        overflow-y: hidden; // 隐藏垂直滚动
        -webkit-overflow-scrolling: touch; // iOS平滑滚动
        
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
        }
        
        .dropitem {
            display: flex;
            gap: 8px;
            flex-wrap: nowrap;
        }
        
        .menu-fitem {
            margin-left: 10px; // 减少左边距
            flex-shrink: 0; // 禁止收缩，保持内容完整
            
            span {
                font-size: 0.9rem; // 稍微减小字体大小
                padding: 4px 8px; // 增加内边距便于点击
            }
        }
        
        // 确保el-dropdown在移动端保持水平
        .el-dropdown {
            flex-shrink: 0;
            white-space: nowrap;
        }
    }
}

// 超小屏幕适配
@media (max-width: 480px) {
    #menu {
        gap: 6px;
        
        .dropitem {
            gap: 6px;
        }
        
        .menu-fitem {
            margin-left: 8px;
            
            span {
                font-size: 0.85rem;
                padding: 3px 6px;
            }
        }
    }
}
.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
}
</style>