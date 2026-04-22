<template>
  <div style="display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center;">
    <DocView>
      <template #doc-header>
        <div ref="firstViewRef" class="firstview">
          <div ref="topProfileRef" class="firstview-profile">
            <ProfileCard class="no-hover-card" style="background-color: transparent;backdrop-filter:none;">
              <template #before-social>
                <div class="a-card no-hover-card" id="main-title" style="background-color: rgba(var(--vp-c-bg-rgb), 0.6);backdrop-filter: blur(8px);">
                  <el-text truncated style="color: var(--vp-c-text);">{{ mainTitle }}</el-text>
                  <h3 class="subtitle multipleStrings"></h3>
                </div>
              </template>
            </ProfileCard>
          </div>
        </div>
      </template>

      <template #main-content>
        <ClientOnly>
          <div
            class="fade-item"
            v-for="(post, index) in currentPosts"
            :key="post.link"
            style="padding: 0px 5px 12px;"
            :style="{ '--delay': (0.2 + index * 0.05) + 's' }"
          >
            <ArticleCard :post="post" />
          </div>

          <div style="display: flex; justify-content: center;">
            <el-pagination
              hide-on-single-page
              :total="filteredPosts.length"
              :current-page="currentPage"
              :page-size="pageSize"
              :pager-count="5"
              layout="prev, pager, next, jumper"
              @current-change="handleCurrentChange"
              background
            />
          </div>
        </ClientOnly>
      </template>

      <template #sidebar-stay>
        <ProfileCard v-show="showSidebarProfile" />
        <TagFilterCard :posts="posts" v-model:selectedTags="selectedTags" />
        <MenuCard />
      </template>
    </DocView>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject, watch } from 'vue'
import { useData } from 'vitepress'
import TypeIt from 'typeit'
import DocView from '../layouts/DocView.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import MenuCard from '../components/cards/MenuCard.vue'
import TagFilterCard from '../components/cards/TagFilterCard.vue'
import ArticleCard from '../components/cards/ArticleCard.vue'
import { data as posts } from '../data/posts.data.ts'

const { theme } = useData()
const isFocusMode = inject('isFocusMode')

const selectedTags = ref([])
const currentPage = ref(1)
const pageSize = ref(theme.value.pageSize || 8)

const firstViewRef = ref(null)
const topProfileRef = ref(null)
const showSidebarProfile = ref(false)

const mainTitle = ref(theme.value.home.mainTitle || 'VitePress Theme')
const subTitles = ref(theme.value.home.subTitles || ['VitePress Theme'])

let typeitInstance = null
let topProfileObserver = null
let stopFocusModeWatch = null

const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) {
    return posts
  }
  return posts.filter((post) => {
    if (!post.tags) return false
    return selectedTags.value.some((tag) => post.tags.includes(tag))
  })
})

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

watch(selectedTags, () => {
  currentPage.value = 1
})

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const setupTopProfileObserver = () => {
  if (typeof window === 'undefined') return
  if (!topProfileRef.value) return

  if (!('IntersectionObserver' in window)) {
    showSidebarProfile.value = true
    return
  }

  const scrollRoot = document.querySelector('.el-scrollbar__wrap')

  topProfileObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      showSidebarProfile.value = !entry.isIntersecting
    },
    {
      root: scrollRoot || null,
      threshold: 0,
    }
  )

  topProfileObserver.observe(topProfileRef.value)
}

onMounted(() => {
  typeitInstance = new TypeIt('.subtitle', {
    strings: subTitles.value,
    speed: 100,
    breakLines: false,
    lifeLike: true,
    loop: false,
    cursor: {
      autoStart: true,
      animation: { opacity: 0 },
    },
  }).go()

  const firstViewHeight = theme.value?.home?.firstViewHeight || '60'
  if (firstViewRef.value) {
    firstViewRef.value.style.height = `${firstViewHeight}vh`
  }

  

  setupTopProfileObserver()
})

onUnmounted(() => {
  typeitInstance?.destroy()
  topProfileObserver?.disconnect()
  topProfileObserver = null
  
})
</script>

<style>
.firstview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#main-title {
  width: 100%;
  min-width: 0;
  max-width: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 16px;
}

.subtitle {
  font: 1.2em sans-serif;
}

.firstview-profile {
  width: min(360px, 90vw);
  margin-top: 0;
}

.firstview-profile .no-hover-card:hover {
  transform: none !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05) !important;
  border-color: transparent !important;
}

@media (max-width: 480px) {
  .firstview-profile {
    display: flex;
    justify-content: center;
  }

  .firstview-profile .profile-card {
    margin: 0 auto;
  }
}


</style>
