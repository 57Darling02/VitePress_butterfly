<template>
    <div class="footer a-card" :class="{ 'footer-hidden': !showFooter }">
        <el-text style="width: 100%;text-align: center;">
            
            <i v-if="page?.title"><i class="fa-solid fa-location-dot"></i>&nbsp;{{ page?.title}}</i>
            <i v-else>&nbsp;{{ message }}</i>
        </el-text>
        <el-tag size="small" type="success" effect="plain" v-if="copyright" round>
            {{ copyright }}
        </el-tag>
        <el-tag size="default" type="success" effect="plain" v-if="createdTime" round>
            ⚙️&nbsp;博客已运行:{{ isMounted ? formattedTime : '' }}
        </el-tag>
        <el-text style="width: 100%;text-align: center;" size="small"><span id="vercount_container_site_pv" style='display:none'>本站总访问量<span
                    id="vercount_value_site_pv" />次</span></el-text>
    </div>
</template>

<script lang='ts' setup>
import { useData } from 'vitepress'
import { inject, onMounted, onUnmounted, ref } from 'vue'

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
}
</style>