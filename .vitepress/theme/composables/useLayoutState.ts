import {
  computed,
  inject,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'

const MOBILE_QUERY = '(max-width: 748px)'

export type LayoutState = {
  isFocusMode: Ref<boolean>
  showNavbar: Ref<boolean>
  showFooter: Ref<boolean>
  isMobile: Ref<boolean>
  sidebarOpen: Ref<boolean>
  canShowSidebar: ComputedRef<boolean>
  showSidebar: ComputedRef<boolean>
  navCompact: ComputedRef<boolean>
  setNavbarVisible: (visible: boolean) => void
  setFooterVisible: (visible: boolean) => void
  toggleFocusMode: () => void
  toggleSidebar: () => void
}

export const layoutStateKey = Symbol('layoutState') as InjectionKey<LayoutState>

export function createLayoutState(): LayoutState {
  const isFocusMode = ref(false)
  const showNavbar = ref(true)
  const showFooter = ref(false)
  const isMobile = ref(false)
  const sidebarOpen = ref(true)

  if (typeof window !== 'undefined') {
    const media = window.matchMedia(MOBILE_QUERY)
    const syncMobile = () => {
      isMobile.value = media.matches
    }

    syncMobile()
    media.addEventListener('change', syncMobile)
  }

  const canShowSidebar = computed(() => !isMobile.value)
  const showSidebar = computed(() => canShowSidebar.value && sidebarOpen.value)
  const navCompact = computed(() => isMobile.value)

  return {
    isFocusMode,
    showNavbar,
    showFooter,
    isMobile,
    sidebarOpen,
    canShowSidebar,
    showSidebar,
    navCompact,
    setNavbarVisible: (visible) => {
      showNavbar.value = visible
    },
    setFooterVisible: (visible) => {
      showFooter.value = visible
    },
    toggleFocusMode: () => {
      isFocusMode.value = !isFocusMode.value
    },
    toggleSidebar: () => {
      sidebarOpen.value = !sidebarOpen.value
    },
  }
}

export function useLayoutState() {
  const layoutState = inject(layoutStateKey)
  if (!layoutState) {
    throw new Error('layoutState is not provided')
  }

  return layoutState
}
