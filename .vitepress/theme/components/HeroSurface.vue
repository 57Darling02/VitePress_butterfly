<template>
  <div
    class="hero-surface"
    :class="[`is-${appearance}`, { 'has-default-background': isDefaultBackground }]"
  >
    <div class="hero-surface-media" :style="backgroundStyle" aria-hidden="true">
      <img
        v-if="imageSource"
        :key="imageSource.src"
        class="hero-surface-image"
        :src="imageSource.src"
        alt=""
        @error="handleImageError"
      />

      <template v-if="showRainfall">
        <div
          v-for="layer in starLayers"
          :key="layer"
          :class="['hero-surface-star-layer', `layer${layer}`]"
          aria-hidden="true"
        />
      </template>

      <svg
        class="hero-surface-waves"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            :id="waveId"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352Z"
          />
        </defs>
        <g class="hero-surface-wave-parallax">
          <use class="hero-surface-wave-layer wave-far" :href="`#${waveId}`" x="48" y="0" />
          <use class="hero-surface-wave-layer wave-back" :href="`#${waveId}`" x="48" y="3" />
          <use class="hero-surface-wave-layer wave-middle" :href="`#${waveId}`" x="48" y="5" />
          <g class="hero-surface-wave-front-scale">
            <use class="hero-surface-wave-layer wave-front" :href="`#${waveId}`" x="48" y="7" />
          </g>
        </g>
      </svg>
    </div>

    <div class="hero-surface-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import { useLayoutState } from '../composables/useLayoutState'
import type ThemeConfig from '../types/ThemeConfig'

type Appearance = 'blurred' | 'clear'
type ImageSource = { src: string; kind: 'cover' | 'background' }

const props = withDefaults(defineProps<{
  cover?: string
  appearance?: Appearance
}>(), {
  cover: '',
  appearance: 'blurred',
})

const { theme } = useData<ThemeConfig>()
const { isMobile } = useLayoutState()
const waveId = `hero-surface-wave-${useId()}`
const coverFailed = ref(false)
const backgroundFailed = ref(false)
const starLayers = [2, 3, 4, 5]
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

const normalizedCover = computed(() => props.cover.trim())
const themeBackground = computed(() => String(theme.value.background || '').trim())
const themeBackgroundColor = computed(() => {
  return hexColorPattern.test(themeBackground.value) ? themeBackground.value : ''
})
const themeBackgroundImage = computed(() => {
  return themeBackgroundColor.value ? '' : themeBackground.value
})
const imageSource = computed<ImageSource | undefined>(() => {
  if (normalizedCover.value && !coverFailed.value) {
    return { src: normalizedCover.value, kind: 'cover' }
  }

  if (themeBackgroundImage.value && !backgroundFailed.value) {
    return { src: themeBackgroundImage.value, kind: 'background' }
  }
})
const isDefaultBackground = computed(() => !imageSource.value && !themeBackgroundColor.value)
const backgroundStyle = computed(() => ({
  backgroundColor: themeBackgroundColor.value || 'var(--hero-ground)',
}))
// Stars drift on both light and dark themes; mobile and reduced-motion skip them.
const showRainfall = computed(() => theme.value.bg_rainfall && !isMobile.value)

function handleImageError() {
  if (imageSource.value?.kind === 'cover') {
    coverFailed.value = true
  } else {
    backgroundFailed.value = true
  }
}

watch(normalizedCover, () => {
  coverFailed.value = false
})

watch(themeBackground, () => {
  backgroundFailed.value = false
})
</script>

<style lang="scss" scoped>
@use "sass:list";
@use "sass:math";

.hero-surface {
  --hero-min-height: max(24rem, 65vh);
  --hero-ground: var(--vp-c-content-ground);
  --hero-star-color: antiquewhite;
  --hero-wave-far: color-mix(in srgb, var(--hero-ground) 84%, var(--vp-c-brand) 16%);
  --hero-wave-back: color-mix(in srgb, var(--hero-ground) 92%, var(--vp-c-brand) 8%);
  --hero-wave-middle: color-mix(in srgb, var(--hero-ground) 96%, var(--vp-c-brand) 4%);

  position: relative;
  isolation: isolate;
  display: grid;
  align-items: end;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--hero-min-height);
  overflow: hidden;
  color: var(--vp-c-text);
}

.hero-surface-media {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-surface.has-default-background .hero-surface-media {
  background-image:
    linear-gradient(120deg, rgb(255 255 255 / 0.24), transparent 48%),
    linear-gradient(155deg, #d4e8ef 0%, #accad0 52%, #7eabb2 100%);
}

.hero-surface-media::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  content: '';
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--hero-ground) 2%, transparent),
    color-mix(in srgb, var(--hero-ground) 56%, transparent) 56%,
    color-mix(in srgb, var(--hero-ground) 90%, transparent)
  );
}

.hero-surface-image {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
}

.hero-surface.is-blurred .hero-surface-media {
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.hero-surface.is-blurred .hero-surface-image {
  inset: -1.5rem;
  width: calc(100% + 3rem);
  height: calc(100% + 3rem);
  filter: blur(18px) saturate(1.08) brightness(0.72);
  transform: scale(1.03);
}

.hero-surface.is-clear .hero-surface-media::after {
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--hero-ground) 26%, transparent),
    color-mix(in srgb, var(--hero-ground) 62%, transparent) 56%,
    color-mix(in srgb, var(--hero-ground) 92%, transparent)
  );
}

:global(html:not(.dark)) .hero-surface.has-default-background {
  --hero-wave-far: #5f8d9c;
  --hero-wave-back: #79a1aa;
  --hero-wave-middle: #a7c4c4;
}

:global(html:not(.dark)) .hero-surface.has-default-background .hero-surface-media::after {
  background: linear-gradient(
    to bottom,
    rgb(255 255 255 / 0.08),
    color-mix(in srgb, var(--hero-ground) 4%, transparent) 58%,
    color-mix(in srgb, var(--hero-ground) 6%, transparent)
  );
}

.hero-surface-content {
  position: relative;
  z-index: 1;
  align-self: stretch;
  display: grid;
  align-items: end;
  min-width: 0;
}

.hero-surface-waves {
  --front-wave-scale-x: 1.8;

  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.75rem;
}

.hero-surface-wave-layer {
  transform-box: fill-box;
  will-change: transform;
}

.hero-surface-wave-front-scale {
  transform-box: view-box;
  transform-origin: center;
  transform: scaleX(var(--front-wave-scale-x));
}

.wave-far {
  fill: var(--hero-wave-far);
  fill-opacity: 0.74;
  animation: hero-wave-flow 4s cubic-bezier(0.55, 0.5, 0.45, 0.5) -2s infinite;
}

.wave-back {
  fill: var(--hero-wave-back);
  fill-opacity: 0.52;
  animation: hero-wave-flow 6s cubic-bezier(0.55, 0.5, 0.45, 0.5) -3s infinite;
}

.wave-middle {
  fill: var(--hero-wave-middle);
  fill-opacity: 0.26;
  animation: hero-wave-flow 8s cubic-bezier(0.55, 0.5, 0.45, 0.5) -4s infinite;
}

.wave-front {
  fill: var(--hero-ground);
  animation: hero-wave-flow 9s cubic-bezier(0.55, 0.5, 0.45, 0.5) -5s infinite;
}

:global(.dark) .hero-surface {
  --hero-star-color: rgb(255 255 255 / 0.72);
  --hero-wave-far: color-mix(in srgb, var(--hero-ground) 74%, var(--vp-c-brand) 26%);
  --hero-wave-back: color-mix(in srgb, var(--hero-ground) 82%, var(--vp-c-brand) 18%);
  --hero-wave-middle: color-mix(in srgb, var(--hero-ground) 92%, var(--vp-c-brand) 8%);
}

:global(.dark) .hero-surface.has-default-background .hero-surface-media {
  background-image:
    linear-gradient(120deg, rgb(94 167 145 / 0.14), transparent 48%),
    linear-gradient(155deg, #172b2a 0%, #1b2b32 46%, #2a2936 74%, var(--hero-ground) 100%);
}

@function getStarShadows($count, $seed, $blur: 0px) {
  $shadows: ();

  @for $index from 1 through $count {
    // Integer vw/vh offsets keep the shadow list compact; box-shadow cannot
    // take percentages, and sub-percent precision is invisible at these sizes.
    $x: math.round(math.div(($index * $index * 37 + $index * 61 + $seed * 17) % 10000, 100)) * 1vw;
    $y: math.round(math.div(($index * $index * 71 + $index * 19 + $seed * 29) % 10000, 100)) * 1vh;
    // currentColor keeps a single shadow set valid for both themes.
    $shadows: list.append($shadows, #{$x} #{$y} #{$blur} currentColor, comma);
  }

  @return $shadows;
}

$duration: 480s;
// The loop halves the count on its first pass, so this base yields 150 dots
// on layer2 (the densest layer); the other layers keep the 50% ratio.
$count: 300;

@for $i from 2 through 5 {
  $duration: math.div($duration, 2);
  $count: math.floor(math.div($count, 2));
  $seed: $i * 97;
  $blur: ($i - 2) * 0.4px;

  .hero-surface-star-layer.layer#{$i} {
    $size: $i * 1.2px;

    position: absolute;
    top: 0;
    left: 0;
    width: $size;
    height: $size;
    border-radius: 50%;
    color: var(--hero-star-color);
    background-color: currentColor;
    box-shadow: getStarShadows($count, $seed, $blur);
    animation: hero-stars-rise $duration linear infinite;

    // Wider viewports get more dots so the field keeps a constant density
    // instead of thinning out. Every tier reuses the same seed, so extra
    // dots extend the original pattern rather than replacing it.
    @media (min-width: 1280px) {
      box-shadow: getStarShadows(math.round($count * 1.33), $seed, $blur);
    }

    @media (min-width: 1680px) {
      box-shadow: getStarShadows(math.round($count * 2.27), $seed, $blur);
    }

    @media (min-width: 2200px) {
      box-shadow: getStarShadows(math.round($count * 4), $seed, $blur);
    }

    &::after {
      // The duplicate sits one viewport below, so the -100vh travel loops seamlessly.
      position: absolute;
      top: 100vh;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      content: '';
      box-shadow: inherit;
    }
  }
}

@keyframes hero-wave-flow {
  from {
    transform: translate3d(-90px, 0, 0);
  }

  to {
    transform: translate3d(85px, 0, 0);
  }
}

@keyframes hero-stars-rise {
  to {
    transform: translateY(-100vh);
  }
}

@media (max-width: 748px) {
  .hero-surface {
    --hero-min-height: clamp(17rem, 65svh, 28rem);

    min-height: var(--hero-min-height);
    align-items: center;
  }

  .hero-surface-content {
    align-items: center;
  }

  .hero-surface-star-layer {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-surface-star-layer {
    display: none;
  }

  .hero-surface-wave-layer {
    animation: none;
  }
}
</style>
