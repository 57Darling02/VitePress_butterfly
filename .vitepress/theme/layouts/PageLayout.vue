<template>
  <DocView>
    <template #doc-header>
      <PageInfo />
    </template>

    <template #main-content>
      <div class="vp-doc fade-item a-card page-content">
        <slot />
      </div>
      <MarkdownImagePreview />
    </template>

    <template #sidebar-stay>
      <ProfileCard class="fade-item profile-sidebar" />
      <SiteStatsCard class="fade-item stats-sidebar" />
    </template>
  </DocView>
</template>

<script lang="ts" setup>
import PageInfo from '../components/cards/PageInfo.vue'
import ProfileCard from '../components/cards/ProfileCard.vue'
import SiteStatsCard from '../components/cards/SiteStatsCard.vue'
import MarkdownImagePreview from '../components/effects/MarkdownImagePreview.vue'
import DocView from './DocView.vue'
</script>

<style lang="scss" scoped>
.page-content {
  overflow-x: hidden;
  padding: 38px 30px 20px;
  --delay: 0.1s;
}

.profile-sidebar {
  --delay: 0.3s;
}

.stats-sidebar {
  --delay: 0.5s;
}

@media (max-width: 748px) {
  .page-content {
    padding: 28px 20px 16px;
  }
}
</style>
