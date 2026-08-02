import type { ObjectDirective } from 'vue'

/**
 * Scroll-reveal directive for card lists.
 *
 * - Reveals each element once when it enters the scroll container.
 * - Staggers elements revealed in the same batch, ordered by their vertical
 *   position, for a cascading effect.
 * - Falls back to showing everything immediately when IntersectionObserver
 *   is unavailable or the user prefers reduced motion.
 */

const VISIBLE_CLASS = 'is-visible'
const STAGGER_STEP_MS = 60
const STAGGER_CSS_VAR = '--reveal-delay'
const SCROLL_ROOT_SELECTOR = '.el-scrollbar__wrap'
const OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12,
}

let observer: IntersectionObserver | null = null

const reveal = (el: HTMLElement) => {
    el.classList.add(VISIBLE_CLASS)
    observer?.unobserve(el)
}

const getObserver = () => {
    if (observer) return observer

    observer = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((entry, index) => {
                const el = entry.target as HTMLElement
                if (index > 0) {
                    el.style.setProperty(STAGGER_CSS_VAR, `${index * STAGGER_STEP_MS}ms`)
                }
                reveal(el)
            })
    }, {
        ...OBSERVER_OPTIONS,
        // Falls back to the viewport when the scroll container is absent.
        root: document.querySelector<HTMLElement>(SCROLL_ROOT_SELECTOR),
    })

    return observer
}

const prefersReducedMotion = () =>
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vReveal: ObjectDirective<HTMLElement> = {
    mounted(el) {
        if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
            reveal(el)
            return
        }
        getObserver().observe(el)
    },
    unmounted(el) {
        observer?.unobserve(el)
    },
}
