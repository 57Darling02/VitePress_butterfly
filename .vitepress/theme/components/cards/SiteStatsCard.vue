<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../data/posts.data'
import type { PostDate } from '../../types/PostSummary'
import type ThemeConfig from '../../types/ThemeConfig'
import ThemeIcon from '../ThemeIcon.vue'
import { useVisitData } from '../../composables/useVisitData'

const DAY_MS = 86_400_000
const { lang, theme } = useData<ThemeConfig>()
const numberFormatter = computed(() => new Intl.NumberFormat(lang.value || 'zh-CN'))

const toTimestamp = (date: PostDate | undefined) => {
  if (date === undefined) return 0
  const timestamp = date instanceof Date ? date.getTime() : new Date(date).getTime()
  return Number.isFinite(timestamp) ? timestamp : 0
}

const daysSince = (timestamp: number) => timestamp > 0
  ? Math.max(0, Math.floor((Date.now() - timestamp) / DAY_MS))
  : null

const totalWords = posts.reduce((sum, post) => sum + post.textNum, 0)
const latestActivity = Math.max(
  0,
  ...posts.map(post => post.lastUpdated || toTimestamp(post.date)),
)

const formatNumber = (value: number | null) => value === null
  ? '—'
  : numberFormatter.value.format(value)

const { visitData } = useVisitData()

const stats = computed(() => {
  const createdAt = toTimestamp(theme.value.footer?.createdTime)
  const visits = visitData.value?.site_pv ?? null

  return [
    { label: '访问量', icon: 'eye', value: formatNumber(visits) },
    { label: '总字数', icon: 'pen-line', value: formatNumber(totalWords) },
    { label: '运行时长', icon: 'calendar-clock', value: formatNumber(daysSince(createdAt)), suffix: '天' },
    { label: '最后活动', icon: 'activity', value: formatNumber(daysSince(latestActivity)), suffix: '天前' },
  ]
})
</script>

<template>
  <section class="a-card site-stats-card" aria-labelledby="site-stats-title">
    <h2 id="site-stats-title" class="stats-title">站点统计</h2>

    <dl class="stats-list">
      <div v-for="stat in stats" :key="stat.label" class="stats-row">
        <dt class="stats-label">
          <ThemeIcon :name="stat.icon" />
          <span>{{ stat.label }}</span>
        </dt>
        <dd class="stats-value">
          <strong>{{ stat.value }}</strong>
          <span v-if="stat.suffix && stat.value !== '—'">{{ stat.suffix }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.site-stats-card {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 18px 16px 14px;
}

.stats-title {
  position: relative;
  margin: 0 0 10px 0.9rem;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 600;
  line-height: 25px;
}

.stats-title::before {
  position: absolute;
  top: 50%;
  left: -0.72rem;
  width: 0.22rem;
  height: 1rem;
  border-radius: 999px;
  background: var(--vp-c-brand);
  content: '';
  transform: translateY(-50%);
}

.stats-list {
  display: grid;
  gap: 2px;
  margin: 0;
}

.stats-row {
  display: flex;
  min-height: 32px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 12px;
  border-radius: 6px;
}

.stats-label,
.stats-value {
  display: flex;
  align-items: center;
  margin: 0;
}

.stats-label {
  min-width: 0;
  gap: 10px;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
}

.stats-label :deep(.theme-icon) {
  color: var(--vp-c-brand);
  font-size: 1.125rem;
}

.stats-value {
  flex: 0 0 auto;
  gap: 4px;
  color: var(--vp-c-text-1);
}

.stats-value strong {
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
}

.stats-value span {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
