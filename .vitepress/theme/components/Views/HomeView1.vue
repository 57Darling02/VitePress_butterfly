<template>
  <div style="display: flex;width: 100%;flex-direction: column;align-items: center;justify-content: center;">
    <DocView>
      <template #doc-header>
        <div class="firstview">
          <el-text truncated type="success" size="large" class="main-title">
            <h2 class="main-title">{{ mainTitle }}</h2>
          </el-text>
          <h3 class="subtitle multipleStrings"></h3>
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
              layout="prev, pager, next, jumper" @current-change="handleCurrentChange" style="" />
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
    loop: true,
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

.main-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: wheat;
}

.subtitle {
  font-size: 1.5rem;
  min-height: 2em;
  color: antiquewhite;
}
</style>