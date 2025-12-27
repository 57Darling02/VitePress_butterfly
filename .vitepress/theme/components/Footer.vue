<template>
    <div class="footer a-card" :class="{ 'footer-hidden': !showFooter }">
        <el-text style="width: 100%;text-align: center;">

            <i v-if="page?.title"><i class="fa-solid fa-location-dot"></i>{{formattedFilePath}} - {{ page?.title }}</i>
            <i v-else>&nbsp;{{ message }}</i>
        </el-text>
        <el-tag size="small" type="success" effect="plain" v-if="copyright" round>
            {{ copyright }}
        </el-tag>
        <el-tag size="default" type="success" effect="plain" v-if="createdTime" round>
            <span class="gear-icon">⚙️</span>&nbsp;博客已运行:{{ isMounted ? formattedTime : '' }}
        </el-tag>
        <el-text style="width: 100%;text-align: center;" size="small"><span id="vercount_container_site_pv"
                style='display:none'>本站总访问量<span id="vercount_value_site_pv" />次</span></el-text>
    </div>
</template>

<script lang='ts' setup>
import { useData } from 'vitepress'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'

const { theme, page } = useData()
const footer = theme.value.footer || {}
const copyright = footer.copyright || ''
const message = footer.message || ''
const createdTime = footer.createdTime || ''
const showFooter = inject('showFooter', ref(false))
const isMounted = ref(false)
const formattedTime = ref('')

// 格式化时间函数
const formatTime = (diff: number) => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) return `${days}天${hours}时${minutes}分${seconds}秒`
    if (hours > 0) return `${hours}时${minutes}分${seconds}秒`
    if (minutes > 0) return `${minutes}分${seconds}秒`
    return `${seconds}秒`
}
const formattedFilePath = computed(() => {
  if (!page.value?.filePath) return ''
  
  const filePath = page.value.filePath
  // 去除开头的 "posts/"
  let result = filePath.replace(/^posts\//, '')
  // 去除结尾的 "/**.md" 部分
  result = result.replace(/\/[^/]*\.md$/, '')
  return result
})
let intervalId: number | null = null

onMounted(() => {
    const startTime = new Date(createdTime).getTime()
    isMounted.value = true

    // 更新时间的函数
    const updateTime = () => {
        const diff = Date.now() - startTime
        formattedTime.value = formatTime(diff)
    }

    // 立即更新一次
    updateTime()

    // 每秒更新一次
    intervalId = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    align-items: center;
    justify-content: center;
    padding: 10px;
    padding-top: 25px;
    width: 80%;
    position: fixed;
    bottom: 10px;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    gap: 8px;
    flex-wrap: wrap;

    &.footer-hidden {
        transform: translateY(100%) translateX(-50%);
    }

    &:hover {
        transform: translateX(-50%);
    }

    // 齿轮图标旋转动画
    .gear-icon {
        display: inline-block;
        animation: gear-rotate 2s linear infinite;
        transform-origin: center;
    }

    // 旋转动画关键帧
    @keyframes gear-rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    // 可选：添加悬停暂停效果
    .gear-icon:hover {
        animation-play-state: paused;
    }
}
</style>