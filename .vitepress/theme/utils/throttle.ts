// Trailing-edge throttle: runs `fn` at most once per `delay` ms, always firing
// once more with the latest args after a burst settles.
export function throttle<TArgs extends unknown[]>(fn: (...args: TArgs) => void, delay: number) {
  let lastRun = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: TArgs | null = null

  const run = () => {
    lastRun = Date.now()
    timer = null
    if (!lastArgs) return
    fn(...lastArgs)
    lastArgs = null
  }

  return (...args: TArgs) => {
    lastArgs = args
    const now = Date.now()
    const remaining = delay - (now - lastRun)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      run()
      return
    }
    if (!timer) {
      timer = setTimeout(run, remaining)
    }
  }
}
