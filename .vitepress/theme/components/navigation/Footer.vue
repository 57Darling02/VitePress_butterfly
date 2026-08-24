<template>
    <div class="footer-reveal-zone" :class="{ 'footer-reveal-zone-hidden': !showFooter }">
        <div class="footer a-card" :class="{ 'footer-hidden': !showFooter }">
            <el-text style="width: 100%; text-align: center;">
                <span v-if="page?.title" class="footer-location">
                    <ThemeIcon name="map-pin" />
                    {{ formattedFilePath }}<template v-if="formattedFilePath">&nbsp;-&nbsp;</template>{{ page.title }}
                </span>
                <span v-else>&nbsp;{{ message }}</span>
            </el-text>

            <el-text v-if="copyright" size="default">
                {{ copyright }}
            </el-text>
        </div>
        <span class="footer-reveal-handle" aria-hidden="true" />
    </div>
</template>

<script lang='ts' setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useLayoutState } from '../../composables/useLayoutState'
import { getPostFolder } from '../../utils/postCategory'
import ThemeIcon from '../ThemeIcon.vue'

const { theme, page } = useData()
const footer = theme.value.footer || {}
const copyright = footer.copyright || ''
const message = footer.message || ''
const { showFooter } = useLayoutState()

const formattedFilePath = computed(() => getPostFolder(page.value?.filePath))
</script>

<style lang="scss" scoped>
$footer-reveal-peek: 8px;

.footer-reveal-zone {
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 100;
    width: 98%;
    max-width: 1190px;
    padding-bottom: 10px;
    transform: translateX(-50%);
    pointer-events: none;
}

.footer-reveal-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 10px;
    pointer-events: auto;
}

.footer {
    display: flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    align-items: center;
    justify-content: center;
    padding: 10px;
    padding-top: 25px;
    position: relative;
    width: 100%;
    transform: translateY(0);
    gap: 8px;
    flex-wrap: wrap;
    pointer-events: auto;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &.footer-hidden {
        transform: translateY(calc(100% + 10px - #{$footer-reveal-peek}));
    }
}

.footer-reveal-zone-hidden:hover .footer {
    transform: translateY(0);
}

.footer-location {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

@media (prefers-reduced-motion: reduce) {
    .footer {
        transition: none;
    }
}
</style>
