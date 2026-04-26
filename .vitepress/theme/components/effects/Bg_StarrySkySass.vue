<template>
    <div class="bg-space" :class="{ 'is-default': isDefaultBackground }" :style="backgroundStyle">
        <div
            v-if="bg_rainfall"
            v-for="layer in starLayers"
            :key="layer"
            :class="['star-layer', `layer${layer}`]"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLayoutState } from '../../composables/useLayoutState'

const { theme } = useData()
const { isMobile } = useLayoutState()

const starLayers = [2, 3, 4, 5]
const backgroundValue = computed(() => String(theme.value.background || '').trim())
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
const defaultBackgroundStyle = {
    backgroundColor: '#dceef4',
    backgroundImage: [
        'radial-gradient(circle at 22% 78%, rgba(244, 232, 184, 0.58) 0%, rgba(244, 232, 184, 0) 28%)',
        'radial-gradient(circle at 74% 18%, rgba(214, 218, 255, 0.46) 0%, rgba(214, 218, 255, 0) 26%)',
        'radial-gradient(circle at 58% 62%, rgba(153, 224, 218, 0.34) 0%, rgba(153, 224, 218, 0) 34%)',
        'linear-gradient(160deg, #d8edf5 0%, #eaf6f7 45%, #edf5ee 72%, #d5edf1 100%)'
    ].join(', ')
}

const isDefaultBackground = computed(() => !backgroundValue.value)

const backgroundStyle = computed(() => {
    if (isDefaultBackground.value) {
        return defaultBackgroundStyle
    }

    if (hexColorPattern.test(backgroundValue.value)) {
        return {
            backgroundColor: backgroundValue.value
        }
    }

    return {
        backgroundImage: `url(${backgroundValue.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
})

const bg_rainfall = computed(() => theme.value.bg_rainfall && !isMobile.value)
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "sass:string";

.bg-space {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;

    &.is-default {
        &::before,
        &::after {
            content: '';
            position: absolute;
            inset: 0;
        }

        &::before {
            opacity: 0.26;
            background-image:
                linear-gradient(115deg, transparent 18%, rgba(255, 255, 255, 0.52) 46%, transparent 72%),
                radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.42), transparent 34%);
            filter: blur(18px);
        }

        &::after {
            opacity: 0.15;
            background-image:
                repeating-radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.72) 0, rgba(255, 255, 255, 0.72) 1px, transparent 1px, transparent 7px),
                repeating-radial-gradient(circle at 72% 64%, rgba(130, 196, 203, 0.28) 0, rgba(130, 196, 203, 0.28) 1px, transparent 1px, transparent 9px);
            mix-blend-mode: screen;
        }
    }
}

@function getShadows($count) {
    $shadows: '';
    @for $_ from 1 through $count {
        $shadows: '#{$shadows}#{math.random(100)}vw #{math.random(100)}vh #fff,';
    }
    @return string.unquote(string.slice($shadows, 1, -2));
}

$duration: 400s;
$count: 250;

@for $i from 2 through 5 {
    $duration: calc($duration / 2);
    $count: math.floor(calc($count / 2));

    .layer#{$i} {
        $size: #{$i * 1.2}px;
        position: fixed;
        width: $size;
        height: $size;
        border-radius: 50%;
        left: 0;
        top: 0;
        background-color: antiquewhite;
        box-shadow: getShadows($count);
        animation: moveUp $duration linear infinite;

        &::after {
            content: '';
            position: fixed;
            left: 0;
            top: 100vh;
            border-radius: inherit;
            width: inherit;
            height: inherit;
            box-shadow: inherit;
        }
    }
}

@keyframes moveUp {
    to {
        transform: translateY(-100vh);
    }
}
</style>
