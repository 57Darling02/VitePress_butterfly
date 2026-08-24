<template>
  <div class="home-view">
    <DocView>
      <template #doc-header>
        <HeroSurface class="home-hero" appearance="clear">
          <div class="firstview">
            <h1 class="home-title">{{ mainTitle }}</h1>
            <p ref="subtitleRef" class="home-subtitle multipleStrings" aria-live="polite"></p>
          </div>
        </HeroSurface>
      </template>

      <template #main-content>
        <ClientOnly>
          <div
            v-reveal
            class="post-reveal post-card-row"
            v-for="post in currentPosts"
            :key="post.link"
          >
            <ArticleCard :post="post" />
          </div>

          <div class="post-pagination">
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

      <template #sidebar-non-stay>
        <ProfileCard />
      </template>
      <template #sidebar-stay>
        <TagFilterCard :posts="posts" v-model:selectedTags="selectedTags" />
        <FolderFilterCard :posts="posts" v-model:selectedFolder="selectedFolder" />
        <SiteStatsCard />
      </template>
    </DocView>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useData } from 'vitepress'
import DocView from '../layouts/DocView.vue'
import HeroSurface from '../components/HeroSurface.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import SiteStatsCard from '../components/cards/SiteStatsCard.vue'
import TagFilterCard from '../components/cards/TagFilterCard.vue'
import FolderFilterCard from '../components/cards/FolderFilterCard.vue'
import ArticleCard from '../components/cards/ArticleCard.vue'
import { vReveal } from '../utils/reveal'
import { data as posts } from '../data/posts.data.ts'
import type ThemeConfig from '../types/ThemeConfig'

const { theme } = useData<ThemeConfig>()

const selectedTags = ref<string[]>([])
const selectedFolder = ref('')
const currentPage = ref(1)
const pageSize = computed(() => theme.value.pageSize || 8)

const subtitleRef = ref<HTMLElement | null>(null)
const isReducedMotion = ref(false)

const mainTitle = computed(() => theme.value.home.mainTitle || 'VitePress Theme')
const subTitles = computed(() => theme.value.home.subTitles || ['VitePress Theme'])

type TypeItInstance = { destroy: () => void }

let typeitInstance: TypeItInstance | null = null
let typeitLoadId = 0
let motionMediaQuery: MediaQueryList | null = null

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

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const stopTypeIt = () => {
  typeitLoadId += 1
  typeitInstance?.destroy()
  typeitInstance = null
}

const showStaticSubtitle = () => {
  if (subtitleRef.value) {
    subtitleRef.value.textContent = subTitles.value.join(' ')
  }
}

const startTypeIt = async () => {
  if (isReducedMotion.value || !subtitleRef.value) return

  const loadId = ++typeitLoadId
  const { default: TypeIt } = await import('typeit')
  if (loadId !== typeitLoadId || isReducedMotion.value || !subtitleRef.value) return

  subtitleRef.value.textContent = ''
  typeitInstance = new TypeIt(subtitleRef.value, {
    strings: subTitles.value,
    speed: 100,
    breakLines: false,
    lifeLike: true,
    loop: true,
    cursor: {
      autoStart: true,
      animation: { opacity: 0 },
    },
  }).go()
}

const updateMotionPreference = () => {
  isReducedMotion.value = motionMediaQuery?.matches ?? false

  if (isReducedMotion.value) {
    stopTypeIt()
    showStaticSubtitle()
    return
  }

  void startTypeIt()
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMediaQuery.addEventListener('change', updateMotionPreference)
  }

  updateMotionPreference()
})

onUnmounted(() => {
  motionMediaQuery?.removeEventListener('change', updateMotionPreference)
  motionMediaQuery = null
  stopTypeIt()
})
</script>

<style>
.home-view {
  width: 100%;
}

.firstview {
  position: relative;
  display: flex;
  width: 100%;
  min-height: var(--hero-min-height);
  padding: 4rem 1.5rem 4.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home-title {
  max-width: min(900px, 100%);
  margin: 0;
  color: var(--vp-c-text);
  font-size: 2.75rem;
  font-weight: 600;
  line-height: 1.28;
  text-shadow: 0 2px 18px rgb(var(--vp-c-bg-rgb) / 0.58);
  text-wrap: balance;
}

.home-subtitle {
  min-height: 1.5em;
  margin: 1rem 0 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  text-shadow: 0 1px 12px rgb(var(--vp-c-bg-rgb) / 0.58);
}

@media (max-width: 748px) {
  .firstview {
    padding: 2.5rem 1rem 3.75rem;
  }

  .home-title {
    font-size: 1.85rem;
    line-height: 1.35;
  }

  .home-subtitle {
    font-size: 1rem;
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

</style>
