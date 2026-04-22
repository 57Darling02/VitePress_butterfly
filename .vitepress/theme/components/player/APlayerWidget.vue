<template>
    <div class="aplayer-wrapper">
        <div ref="containerRef"></div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import 'aplayer/dist/APlayer.min.css'

const props = withDefaults(
    defineProps<{
        url: string
        name: string
        artist: string
        cover: string
        autoplay?: boolean
        volume?: number
    }>(),
    {
        autoplay: true,
        volume: 0.6,
    },
)

const emit = defineEmits<{
    (e: 'playing-change', playing: boolean): void
}>()

type APlayerInstance = {
    on: (event: string, callback: () => void) => void
    destroy: () => void
}

const containerRef = ref<HTMLElement | null>(null)
let player: APlayerInstance | null = null

const createPlayer = async () => {
    if (typeof window === 'undefined' || !containerRef.value) return

    const { default: APlayer } = await import('aplayer')
    player?.destroy()

    player = new APlayer({
        container: containerRef.value,
        autoplay: props.autoplay,
        preload: 'metadata',
        mutex: true,
        volume: props.volume,
        audio: [
            {
                name: props.name,
                artist: props.artist,
                cover: props.cover,
                url: props.url,
            },
        ],
    }) as unknown as APlayerInstance

    player.on('play', () => emit('playing-change', true))
    player.on('pause', () => emit('playing-change', false))
    player.on('ended', () => emit('playing-change', false))
}

watch(
    () => [props.url, props.name, props.artist, props.cover, props.autoplay, props.volume],
    () => {
        void createPlayer()
    },
)

onMounted(() => {
    void createPlayer()
})

onBeforeUnmount(() => {
    player?.destroy()
    player = null
})
</script>

<style lang="scss" scoped>
.aplayer-wrapper {
    width: 100%;
    min-height: 100%;
    border-radius: inherit;
    overflow: hidden;
    background: var(--vp-c-bg);
}

.aplayer-wrapper :deep(.aplayer) {
    margin: 0;
    width: 100%;
    border-radius: inherit;
    background: var(--vp-c-bg);
    box-shadow: none;
}

.aplayer-wrapper :deep(.aplayer .aplayer-body) {
    background: var(--vp-c-bg);
}
</style>
