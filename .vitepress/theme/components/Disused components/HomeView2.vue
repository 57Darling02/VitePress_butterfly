<template>
    <ClientOnly>
        <div style="display: flex;width: 100%;flex-direction: column;align-items: center;justify-content: center;">
            <div id="content-container" :style="{ maxWidth: isFocusMode ? 'none' : '1200px' }">
                <div id="page-wrapper" class="fade-group"
                    style="display: flex;flex-direction: column;gap: 10px; padding: 0%;">
                    <div class="fade-item" v-for="post in posts" :key="post.link">
                        <ArticleCard :post="post" />
                    </div>
                </div>

                <div class="sidebar" v-if="showSidebar">
                    <slot name="sidebar-non-stay">

                    </slot>
                    <div class="sidebar-stay">
                        <slot name="sidebar-stay">
                            <ProfileCard />
                            <div class="a-card" v-if="false"
                                style="height: 300px;display: flex;flex-direction: column;padding: 18px;">
                                {{ theme.sidebar }}
                            </div>
                        </slot>
                    </div>
                </div>

            </div>
        </div>
    </ClientOnly>
</template>
<script lang='ts' setup>
import { inject } from 'vue';
import { data as posts } from '../../data/posts.data.ts'
import ArticleCard from '../cards/ArticleCard.vue';
import ProfileCard from '../cards/ProfileCard.vue';
import { useData } from 'vitepress'
const { theme, frontmatter, page } = useData()

// 获取全局状态和方法
const isFocusMode = inject('isFocusMode')
const showSidebar = inject('showSidebar') 
</script>
<style lang="scss"></style>
