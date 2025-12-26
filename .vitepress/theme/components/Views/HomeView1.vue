<template>
  <div style="display: flex;width: 100%;flex-direction: column;align-items: center;justify-content: center;">
    <DocView>
      <template #doc-header>
        <div class="firstview">
          
          <div class="a-card" id="main-title">
            <el-text truncated style="color: var(--vp-c-text);">{{ mainTitle }}</el-text>
            <h3 class="subtitle multipleStrings"></h3>
          </div>
          
          
        </div>
      </template>
      <template #main-content>
        <ClientOnly>
          <!-- <ArticleCard class="a-card" v-for="(post, index) in currentPosts" :post="post" style="margin: 0px 5px 10px;"  /> -->
          <div class="fade-item" v-for="(post, index) in currentPosts" :key="post.link" style="padding: 0px 5px 12px;" :style="{ '--delay': (0.2 + index * 0.05) + 's' }">
            <ArticleCard :post="post" />
          </div>
          <div style="display: flex;justify-content: center;">
            <el-pagination hide-on-single-page :total="posts.length" :current-page="currentPage" :page-size="pageSize" :pager-count="5" 
              layout="prev, pager, next, jumper" @current-change="handleCurrentChange" background/>
          </div>
        </ClientOnly>
      </template>
      <template #sidebar-stay>
        <ProfileCard />
      </template>
    </DocView>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
import TypeIt from 'typeit'
import DocView from './DocView.vue'
import ProfileCard from '../default/ProfileCard.vue'
import ArticleCard from '../default/ArticleCard.vue'
import { data as posts } from '../utils/posts.data.ts'

// 分页状态
const currentPage = ref(1)
const pageSize = ref(theme.value.pageSize || 8)  // 每页最多8条

// 计算当前页显示的帖子
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return posts.slice(start, end)
})

// 分页切换事件
const handleCurrentChange = (val) => {
  currentPage.value = val
}

const mainTitle = ref(theme.value.home.mainTitle || 'VitePress Theme')
const subTitles = ref(theme.value.home.subTitles || ['VitePress Theme'])
let typeitInstance = null
onMounted(() => {
  typeitInstance = new TypeIt('.subtitle', {
    strings: subTitles.value,
    speed: 100,
    breakLines: false,
    lifeLike: true,
    loop: false,
    cursor: {
      autoStart: true,
      animation: { opacity: 0 }
    }
  }).go()
  const firstViewHeight = theme.value?.home?.firstViewHeight || '100'
  document.querySelector('.firstview').style.height = firstViewHeight + 'vh'
})

onUnmounted(() => {
  typeitInstance?.destroy()
})
</script>
<style>
.firstview {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#main-title {
  width: 60%;
  min-width: 300px;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(var(--vp-c-bg-rgb), 0.5);
}

.subtitle {
  font: 1.2em sans-serif;
}
</style>