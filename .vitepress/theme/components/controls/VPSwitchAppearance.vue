<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import ThemeIcon from '../ThemeIcon.vue'

const APPEARANCE_KEY = 'vitepress-theme-appearance'
const appearanceOptions = [
  { value: 'auto', label: '跟随系统', icon: 'sun-moon' },
  { value: 'light', label: '明亮', icon: 'sun' },
  { value: 'dark', label: '暗色', icon: 'moon' },
] as const

type AppearanceMode = typeof appearanceOptions[number]['value']

const { isDark } = useData()
const appearanceMode = ref<AppearanceMode>('auto')
const currentOption = computed(() => (
  appearanceOptions.find(option => option.value === appearanceMode.value) ?? appearanceOptions[0]
))
const switchTitle = computed(() => `外观：${currentOption.value.label}`)
const popperStyle = {
  border: 'none',
  borderRadius: '18px',
  overflow: 'hidden',
  background: 'transparent',
  boxShadow: 'none',
}

let transitionX = 0
let transitionY = 0

const readAppearance = (): AppearanceMode => {
  const stored = localStorage.getItem(APPEARANCE_KEY)
  return appearanceOptions.some(option => option.value === stored)
    ? stored as AppearanceMode
    : 'auto'
}

const syncAppearance = (event?: StorageEvent) => {
  if (event?.key && event.key !== APPEARANCE_KEY) return
  appearanceMode.value = readAppearance()
}

const writeAppearance = (mode: AppearanceMode) => {
  const oldValue = localStorage.getItem(APPEARANCE_KEY)
  appearanceMode.value = mode
  if (oldValue === mode) return

  localStorage.setItem(APPEARANCE_KEY, mode)
  window.dispatchEvent(new StorageEvent('storage', {
    key: APPEARANCE_KEY,
    oldValue,
    newValue: mode,
    storageArea: localStorage,
  }))
}

const resolvesToDark = (mode: AppearanceMode) => (
  mode === 'dark'
  || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
)

const rememberTransitionOrigin = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  transitionX = event.clientX || rect.left + rect.width / 2
  transitionY = event.clientY || rect.top + rect.height / 2
}

const setAppearance = async (mode: AppearanceMode) => {
  if (mode === appearanceMode.value) return

  const targetDark = resolvesToDark(mode)
  const canTransition = (
    targetDark !== isDark.value
    && 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )

  if (!canTransition) {
    writeAppearance(mode)
    return
  }

  const x = transitionX || innerWidth / 2
  const y = transitionY || innerHeight / 2
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]

  await document.startViewTransition(async () => {
    writeAppearance(mode)
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: targetDark ? [...clipPath].reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${targetDark ? 'old' : 'new'}(root)`,
    },
  )
}

onMounted(() => {
  syncAppearance()
  window.addEventListener('storage', syncAppearance)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', syncAppearance)
})
</script>

<template>
  <el-dropdown
    class="appearance-dropdown"
    trigger="click"
    placement="top-end"
    :popper-style="popperStyle"
    :show-arrow="false"
    @command="setAppearance"
  >
    <button
      class="control-icon-button"
      type="button"
      :title="switchTitle"
      :aria-label="switchTitle"
      @click="rememberTransitionOrigin"
    >
      <ThemeIcon :name="currentOption.icon" />
    </button>

    <template #dropdown>
      <el-dropdown-menu class="appearance-menu">
        <el-dropdown-item
          v-for="option in appearanceOptions"
          :key="option.value"
          :command="option.value"
          :class="['appearance-option', { 'is-active': appearanceMode === option.value }]"
        >
          <ThemeIcon :name="option.icon" />
          <span>{{ option.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.appearance-dropdown,
.control-icon-button {
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  color: inherit;
}

.control-icon-button {
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  line-height: 1;
}

.appearance-menu {
  min-width: 7.5rem;
}

.appearance-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.appearance-option.is-active {
  background: color-mix(in srgb, var(--vp-c-brand) 12%, transparent);
  color: var(--vp-c-brand);
}
</style>
