<template>
  <div class="document-view">
    <div class="doc-header">
      <slot name="doc-header" />
    </div>

    <div class="content-ground">
      <div id="content-container">
        <div id="page-wrapper">
          <slot name="main-content" />
          <div v-if="!showSidebar" class="sidebar-stacked">
            <slot name="sidebar-stacked">
              <slot name="sidebar-non-stay" />
              <slot name="sidebar-stay" />
            </slot>
          </div>
        </div>

        <aside v-if="showSidebar" id="site-sidebar" class="sidebar">
          <slot name="sidebar-non-stay" />
          <div class="sidebar-stay">
            <slot name="sidebar-stay" />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { useLayoutState } from '../composables/useLayoutState'

const { showSidebar } = useLayoutState()
</script>
<style lang="scss" scoped>
.document-view {
    --sidebar-gap: 15px;
    // Max height for the scrollable list inside filter cards (tags / folders),
    // so a long list scrolls internally instead of stretching the sticky column.
    --filter-list-max-height: clamp(140px, 30vh, 360px);
    width: 100%;
    margin-top: calc(-1 * var(--nav-height));
}

.doc-header {
    width: 100%;
}

.content-ground {
    width: 100%;
    background: var(--vp-c-content-ground);
}

#content-container {
    display: flex;
    justify-self: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 0;
    position: relative;
    width: 100%;
    max-width: 1380px;
}

#page-wrapper {
    flex: 1 1 0;
    min-width: 0;
    padding: 20px 5px 0;
}

.sidebar-stacked {
    display: flex;
    flex-direction: column;
    gap: var(--sidebar-gap);
    width: 100%;
    margin-top: var(--sidebar-gap);
}

.sidebar {
    padding: 0px 10px;
    padding-top: 20px;
    // position: static;
    flex: 0 0 var(--sidebar-width);
    min-width: 0;
    max-width: var(--sidebar-width);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: visible;
    display: flex;
    flex-direction: column;
    gap: var(--sidebar-gap);
    animation: fadeInUp 1s ease-in-out 0.2s forwards;
}

.sidebar-stay {
    // No scroll container here: filter cards cap their own list height, so the
    // column stays within the viewport on its own and card shadows aren't clipped.
    position: sticky;
    top: var(--nav-height);
    min-width: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: var(--sidebar-gap);
}
</style>
