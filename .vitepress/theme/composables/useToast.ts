import { readonly, ref, type DeepReadonly, type Ref } from 'vue'

export type ToastType = 'success' | 'error'

export type Toast = {
  id: number
  message: string
  type: ToastType
}

// How long a toast stays before auto-dismissing.
const TOAST_DURATION = 1000

// Single source of truth for the currently shown toast, shared across the app.
// The nav island subscribes to this and morphs to display it.
const activeToast = ref<Toast | null>(null)

let dismissTimer: ReturnType<typeof setTimeout> | null = null
let nextId = 0

function clearDismissTimer() {
  if (dismissTimer !== null) {
    clearTimeout(dismissTimer)
    dismissTimer = null
  }
}

// Show a toast. A new call replaces any current one and restarts the timer.
export function notify(message: string, type: ToastType = 'success') {
  if (typeof window === 'undefined') return

  clearDismissTimer()
  activeToast.value = { id: ++nextId, message, type }

  dismissTimer = setTimeout(() => {
    dismissTimer = null
    activeToast.value = null
  }, TOAST_DURATION)
}

// Composable for components: exposes the active toast read-only.
export function useToast(): { activeToast: DeepReadonly<Ref<Toast | null>> } {
  return { activeToast: readonly(activeToast) }
}
