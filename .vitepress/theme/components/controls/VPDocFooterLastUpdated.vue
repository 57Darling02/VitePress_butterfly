<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { theme, lang } = useData()

const props = defineProps({
    lastUpdated: {
        type: Number,
        default: () => 0
    }
})

const isMounted = ref(false)
const hasValidDate = computed(() => props.lastUpdated && !isNaN(new Date(props.lastUpdated).getTime()))
const date = computed(() => hasValidDate.value ? new Date(props.lastUpdated) : null)
const isoDatetime = computed(() => date.value?.toISOString() ?? '')
const datetime = computed(() => {
    if (!isMounted.value || !date.value) return ''

    return new Intl.DateTimeFormat(
        theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
        theme.value.lastUpdated?.formatOptions ?? {
            dateStyle: 'short',
            timeStyle: 'short'
        }
    ).format(date.value)
})

// Set time after mounting to avoid hydration mismatch from server/client timezones.
onMounted(() => {
    isMounted.value = true
})
</script>

<template>
  <span v-if="theme?.lastUpdated.use && hasValidDate" class="VPLastUpdated">
    <time :datetime="isoDatetime"><i class="fa-solid fa-calendar-lines-pen"></i>&nbsp;&#x4FEE;&#x6539;&#x4E8E;&nbsp;{{ datetime }}</time>
  </span>
</template>

<style scoped>
.VPLastUpdated {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  line-height: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  white-space: nowrap;
}

.VPLastUpdated time {
  display: inline-flex;
  align-items: center;
  line-height: inherit;
}
</style>
