<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { useData } from 'vitepress'
const { theme, page, lang } = useData()

const props = defineProps({
    lastUpdated: {
        type: Number,
        default: () => 0
    }
})



const hasValidDate = props.lastUpdated && !isNaN(new Date(props.lastUpdated).getTime())
const date = hasValidDate ? new Date(props.lastUpdated!) : new Date()
const isoDatetime = hasValidDate ? date.toISOString() : ''
const datetime = ref('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
    watchEffect(() => {
        datetime.value = new Intl.DateTimeFormat(
            theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
            theme.value.lastUpdated?.formatOptions ?? {
                dateStyle: 'short',
                timeStyle: 'short'
            }
        ).format(date)
    })
})
</script>

<template>
  <a v-if="theme?.lastUpdated.use">
    <time :datetime="isoDatetime"><i class="fa-solid fa-calendar-lines-pen">&nbsp;{{ theme.lastUpdated?.text || '修改于' }}&nbsp;{{ datetime }}</i></time>
  </a>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
