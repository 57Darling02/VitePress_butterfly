<template>
    <div class="bg-space" :style="backgroundStyle">
        <div v-if="bg_rainfall" v-for="layer in 5" :class="`layer${layer}`" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLayoutState } from '../../composables/useLayoutState'

const { theme } = useData()
const { isMobile } = useLayoutState()

const backgroundValue = computed(() => String(theme.value.background || '').trim())
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
const defaultBackgroundStyle = {
    backgroundColor: '#d8ecf4',
    backgroundImage: [
        'radial-gradient(circle at 9% 88%, rgba(238, 229, 151, 0.72) 0%, rgba(238, 229, 151, 0) 27%)',
        'radial-gradient(circle at 34% 92%, rgba(156, 220, 218, 0.54) 0%, rgba(156, 220, 218, 0) 31%)',
        'radial-gradient(circle at 81% 83%, rgba(250, 253, 246, 0.9) 0%, rgba(250, 253, 246, 0) 30%)',
        'linear-gradient(180deg, #cfe5ef 0%, #d7edf4 48%, #e4f1ed 72%, #dce9cf 100%)'
    ].join(', ')
}

const backgroundStyle = computed(() => {
    if (!backgroundValue.value) {
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
    background:
        radial-gradient(circle at 9% 88%, rgba(238, 229, 151, 0.72) 0%, rgba(238, 229, 151, 0) 27%),
        radial-gradient(circle at 34% 92%, rgba(156, 220, 218, 0.54) 0%, rgba(156, 220, 218, 0) 31%),
        radial-gradient(circle at 81% 83%, rgba(250, 253, 246, 0.9) 0%, rgba(250, 253, 246, 0) 30%),
        linear-gradient(180deg, #cfe5ef 0%, #d7edf4 48%, #e4f1ed 72%, #dce9cf 100%);
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
