<template>
  <div style="display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center;">
    <DocView>
      <template #doc-header>
        <div ref="firstViewRef" class="firstview">
          <div ref="topProfileRef" class="firstview-profile">
            <ProfileCard class="no-hover-card" style="background-color: transparent;backdrop-filter:none;box-shadow: none;">
              <template #before-social>
                <div class="a-card" id="main-title" style="background-color: rgba(var(--vp-c-bg-rgb), 0.6);backdrop-filter: blur(8px);">
                  <el-text truncated style="color: var(--vp-c-text);">{{ mainTitle }}</el-text>
                  <h3 class="subtitle multipleStrings"></h3>
                </div>
              </template>
            </ProfileCard>
          </div>
          <div class="scroll-hint" :style="{ opacity: scrollHintOpacity }">往下滚动</div>
        </div>
      </template>

      <template #main-content>
        <ClientOnly>
          <div
            v-reveal
            class="post-reveal"
            v-for="post in currentPosts"
            :key="post.link"
            style="padding: 0px 5px 12px;"
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

          <template #fallback>
            <div class="post-skeleton-list">
              <el-skeleton v-for="item in 3" :key="item" class="a-card post-skeleton-card" animated>
                <template #template>
                  <el-skeleton-item variant="h3" class="post-skeleton-title" />
                  <el-skeleton-item variant="text" class="post-skeleton-line" />
                  <el-skeleton-item variant="text" class="post-skeleton-line short" />
                  <div class="post-skeleton-meta">
                    <el-skeleton-item v-for="meta in 3" :key="meta" variant="text" />
                  </div>
                </template>
              </el-skeleton>
            </div>
          </template>
        </ClientOnly>
      </template>

      <template #sidebar-stay>
        <ProfileCard v-show="showSidebarProfile" />
        <TagFilterCard :posts="posts" v-model:selectedTags="selectedTags" />
        <FolderFilterCard :posts="posts" v-model:selectedFolder="selectedFolder" />
      </template>
    </DocView>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useData } from 'vitepress'
import TypeIt from 'typeit'
import DocView from '../layouts/DocView.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import TagFilterCard from '../components/cards/TagFilterCard.vue'
import FolderFilterCard from '../components/cards/FolderFilterCard.vue'
import ArticleCard from '../components/cards/ArticleCard.vue'
import { data as posts } from '../data/posts.data.ts'

const { theme } = useData()

const selectedTags = ref([])
const selectedFolder = ref('')
const currentPage = ref(1)
const pageSize = ref(theme.value.pageSize || 8)

const firstViewRef = ref(null)
const topProfileRef = ref(null)
const showSidebarProfile = ref(false)
const scrollHintOpacity = ref(1)

const mainTitle = ref(theme.value.home.mainTitle || 'VitePress Theme')
const subTitles = ref(theme.value.home.subTitles || ['VitePress Theme'])

let typeitInstance = null
let topProfileObserver = null
let scrollHintRoot = null
let scrollHintFrame = null
let postRevealObservers = []

const POST_REVEAL_VISIBLE_CLASS = 'is-visible'

const filteredPosts = computed(() => {
  return posts.filter((post) => {
    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => post.tags?.includes(tag))
    const matchesFolder =
      !selectedFolder.value ||
      post.category === selectedFolder.value ||
      post.category?.startsWith(`${selectedFolder.value}/`)

    return matchesTags && matchesFolder
  })
})

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

watch([selectedTags, selectedFolder], () => {
  currentPage.value = 1
})

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const getScrollRoot = () => document.querySelector('.el-scrollbar__wrap')

const setupTopProfileObserver = () => {
  if (typeof window === 'undefined') return
  if (!topProfileRef.value) return

  if (!('IntersectionObserver' in window)) {
    showSidebarProfile.value = true
    return
  }

  topProfileObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      showSidebarProfile.value = !entry.isIntersecting
    },
    {
      root: getScrollRoot(),
      threshold: 0,
    }
  )

  topProfileObserver.observe(topProfileRef.value)
}

const getScrollHintTop = () => {
  if (scrollHintRoot && scrollHintRoot !== window) {
    return scrollHintRoot.scrollTop
  }

  return window.scrollY || document.documentElement.scrollTop || 0
}

const updateScrollHintOpacity = () => {
  scrollHintFrame = null
  scrollHintOpacity.value = Math.max(0, 1 - getScrollHintTop() / 120)
}

const handleScrollHintScroll = () => {
  if (scrollHintFrame !== null) return
  scrollHintFrame = window.requestAnimationFrame(updateScrollHintOpacity)
}

const setupScrollHint = () => {
  if (typeof window === 'undefined') return

  scrollHintRoot = getScrollRoot() || window
  updateScrollHintOpacity()
  scrollHintRoot.addEventListener('scroll', handleScrollHintScroll, { passive: true })
}

const cleanupScrollHint = () => {
  scrollHintRoot?.removeEventListener('scroll', handleScrollHintScroll)
  scrollHintRoot = null

  if (scrollHintFrame !== null) {
    window.cancelAnimationFrame(scrollHintFrame)
    scrollHintFrame = null
  }
}

const setPostRevealVisible = (el, visible) => {
  el.classList.toggle(POST_REVEAL_VISIBLE_CLASS, visible)
}

const createPostRevealObserver = (visible, options) =>
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === visible) {
        setPostRevealVisible(entry.target, visible)
      }
    })
  }, options)

const getPostRevealObservers = () => {
  if (postRevealObservers.length) return postRevealObservers

  const root = getScrollRoot()
  postRevealObservers = [
    createPostRevealObserver(true, {
      root,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12,
    }),
    createPostRevealObserver(false, {
      root,
      rootMargin: '96px 0px 96px 0px',
      threshold: 0,
    }),
  ]

  return postRevealObservers
}

const observePostReveal = (el) => {
  getPostRevealObservers().forEach((observer) => observer.observe(el))
}

const vReveal = {
  mounted(el) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setPostRevealVisible(el, true)
      return
    }

    observePostReveal(el)
  },
  unmounted(el) {
    postRevealObservers.forEach((observer) => observer.unobserve(el))
  },
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
  setupScrollHint()
})

onUnmounted(() => {
  typeitInstance?.destroy()
  topProfileObserver?.disconnect()
  topProfileObserver = null
  postRevealObservers.forEach((observer) => observer.disconnect())
  postRevealObservers = []
  cleanupScrollHint()
  
})
</script>

<style>
.firstview {
  position: relative;
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
  box-shadow: none !important;
  border-color: transparent !important;
}

.post-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  will-change: opacity, transform;
}

.post-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .post-reveal {
    transition: none;
    transform: none;
  }
}

.post-skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 5px 12px;
}

.post-skeleton-card {
  padding: 18px;
}

.post-skeleton-title {
  width: min(420px, 74%);
  height: 24px;
}

.post-skeleton-line {
  width: 88%;
  height: 18px;
  margin-top: 14px;
}

.post-skeleton-line.short {
  width: 58%;
  margin-top: 10px;
}

.post-skeleton-meta {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.post-skeleton-meta .el-skeleton__item {
  width: 86px;
  height: 18px;
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: rgba(var(--vp-c-bg-rgb), 0.78);
  color: var(--vp-c-text-1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
  animation: scroll-hint-bounce 1.6s ease-in-out infinite;
  transition: opacity 0.12s linear;
}

@keyframes scroll-hint-bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }

  50% {
    transform: translate(-50%, 6px);
  }
}



</style>
