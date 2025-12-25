<template>
    <div class="links-page">
        <div class="archive-container">
            <div class="filter-section">
                <h3 class="linkss-title">友链</h3>
            </div>

            <!-- 友链列表 -->
            <div class="links">
                <ul>
                    <li v-for="(link, index) in friendlinks" :key="index" class="link-item">
                        <a :href="link.Url" target="_blank" rel="noopener noreferrer">
                            <div class="link-avatar-wrapper">
                                <img :src="link.Avatar" :alt="link.Name" />
                            </div>
                            <span class="sitename">{{ link.Name }}</span>
                            <p class="linkdes">{{ link.Desc }}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()

// 获取友链数据
const friendlinks = computed(() => {
    return theme.value.friendlink || []
})
</script>

<style lang="css" scoped>
/* 基础变量 */
.links-page {
    --link-card-bg: rgba(255, 255, 255, 0.5);
    --link-card-bg-hover: rgba(255, 255, 255, 0.8);
    --link-card-border: 1.5px solid #FFFFFF;
    --link-card-border-radius: 10px;
    --link-card-text: #505050;
    --link-card-shadow: #e8e8e8;
    --link-card-shadow-hover: #e8e8e8;
}

.archive-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.filter-section {
    background: #f8f9fa00;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    height: 500px;
}

/* 标题样式 */
.linkss-title {
    font-size: 30px;
    text-align: center;
    display: block;
    margin: 0;
    letter-spacing: 2px;
    font-weight: bold;
    color: #2c3e50;
}

/* 布局样式 */
.links {
    margin-bottom: 80px;
}

.links ul {
    margin-top: 50px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    cursor: auto;
    padding: 0;
    list-style: none;
}

/* 链接卡片基础样式 */
.links ul li {
    width: 23.1%;
    box-shadow: 0 1px 30px -4px var(--link-card-shadow);
    background: var(--link-card-bg);
    padding: 12px;
    position: relative;
    overflow: hidden;
    border-radius: var(--link-card-border-radius);
    border: var(--link-card-border);
    transition: all 0.3s ease;
}

/* 链接卡片悬停效果 */
.links ul li:hover {
    box-shadow: 0 1px 20px 10px var(--link-card-shadow-hover);
    background: var(--link-card-bg-hover);
}

/* 卡片内部图片样式 */
.link-avatar-wrapper {
    position: relative;
    display: inline-block;
    margin: 3px 3px 0;
}

.links ul li img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.5s ease;
}

.links ul li:hover img {
    transform: rotate(360deg);
}

/* 站点名称样式 */
span.sitename {
    font-size: 20px;
    margin: 8px 8px 0 8px;
    color: var(--link-card-text);
    display: block;
    transition: all 0.4s ease-in-out;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
}

/* 链接描述样式 */
.linkdes {
    font-size: 14px;
    margin: 0 8px;
    text-overflow: ellipsis;
    color: var(--link-card-text);
    overflow: hidden;
    white-space: nowrap;
    line-height: 30px;
    transition: all 0.4s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 1024px) and (min-width: 861px) {
    .links ul li {
        width: 31.7%;
    }
}

@media (max-width: 860px) {
    .links ul li {
        width: 47%;
    }

    .linkss-title {
        font-size: 24px;
    }
}

@media (max-width: 480px) {
    .links ul li {
        width: 100%;
    }
}

/* 深色模式 */
body.dark .links-page {
    --link-card-bg: rgba(40, 40, 40, 0.8);
    --link-card-bg-hover: rgba(60, 60, 60, 0.9);
    --link-card-border: 1.5px solid #444;
    --link-card-text: #e0e0e0;
    --link-card-shadow: rgba(0, 0, 0, 0.3);
    --link-card-shadow-hover: rgba(0, 0, 0, 0.5);
}

body.dark .filter-section {
    background: #2c2c2c;
}

body.dark .linkss-title {
    color: #e0e0e0;
}
</style>