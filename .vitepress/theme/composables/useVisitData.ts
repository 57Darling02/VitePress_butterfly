import { readonly, ref, type DeepReadonly, type Ref } from 'vue'

const visitDataApiUrl = 'https://events.vercount.one/api/v2/log'
const visitDataCacheKey = 'visitorCountData'
const visitDataTimeout = 5_000
const visitorCookieMaxAge = 60 * 60 * 24 * 365
const counterIds = ['site_pv', 'page_pv', 'site_uv'] as const

type CounterId = typeof counterIds[number]
export type CounterData = Record<CounterId, number>

// Single source of truth for visit counts, shared across every component that
// reads it. Seeded from cache so a number shows before the network responds.
const visitData = ref<CounterData | null>(readCachedCounterData())

let activeRequest: AbortController | undefined
let lastTrackedUrl = ''

// Called on every route change (from the theme's router hook). Fetches the
// latest counts and writes them into the shared ref; components react on their own.
export function trackVisit() {
  if (typeof window === 'undefined') return

  const url = getCurrentPageUrl()
  if (!url || url === lastTrackedUrl) return

  lastTrackedUrl = url
  activeRequest?.abort()

  const controller = new AbortController()
  activeRequest = controller
  void loadVisitData(url, controller)
}

// Composable for components: exposes the reactive counts read-only.
export function useVisitData(): { visitData: DeepReadonly<Ref<CounterData | null>> } {
  return { visitData: readonly(visitData) }
}

async function loadVisitData(url: string, controller: AbortController) {
  const timeoutId = window.setTimeout(() => controller.abort(), visitDataTimeout)
  const isNewVisitor = !hasVisitorCookie()

  try {
    const response = await fetch(visitDataApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, isNewUv: isNewVisitor }),
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = normalizeCounterData(await response.json())
    if (!data) throw new Error('Invalid counter response')
    if (activeRequest !== controller) return

    if (isNewVisitor) setVisitorCookie()
    writeCachedCounterData(data)
    visitData.value = data
  } catch (error) {
    // On failure keep whatever the cache-seeded ref already holds.
    if (activeRequest === controller && !isAbortError(error)) {
      visitData.value ??= readCachedCounterData()
    }
  } finally {
    window.clearTimeout(timeoutId)
    if (activeRequest === controller) activeRequest = undefined
  }
}

function getCurrentPageUrl() {
  const url = new URL(window.location.href)
  url.hash = ''
  url.search = ''
  return url.toString()
}

function getVisitorCookieName() {
  return `vercount_uv_${window.location.host.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

function hasVisitorCookie() {
  return document.cookie.split('; ').some((entry) => entry === `${getVisitorCookieName()}=1`)
}

function setVisitorCookie() {
  document.cookie = `${getVisitorCookieName()}=1; path=/; max-age=${visitorCookieMaxAge}; samesite=lax`
}

function normalizeCounterData(value: unknown): CounterData | null {
  const response = isRecord(value) && isRecord(value.data) ? value.data : value
  if (!isRecord(response)) return null

  return Object.fromEntries(counterIds.map((id) => [id, toCounterNumber(response[id])])) as CounterData
}

function toCounterNumber(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function writeCachedCounterData(data: CounterData) {
  try {
    localStorage.setItem(visitDataCacheKey, JSON.stringify(data))
  } catch {
    // Storage can be unavailable in privacy-focused browser contexts.
  }
}

function readCachedCounterData(): CounterData | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(visitDataCacheKey)
    return cached ? normalizeCounterData(JSON.parse(cached)) : null
  } catch {
    return null
  }
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}
