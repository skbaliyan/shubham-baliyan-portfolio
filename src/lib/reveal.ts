/* ============================================================
   REVEAL — section 15

   ONE IntersectionObserver for the entire site. Elements register
   themselves and are unobserved the moment they fire, so the
   observer's working set shrinks as the page is read rather than
   growing with it.
   ============================================================ */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

const getObserver = (): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in-view')
        obs.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  )
  return observer
}

/** Register an element for reveal. Returns a cleanup function. */
export const observeReveal = (el: Element | null): (() => void) => {
  if (!el) return () => {}

  // No observer, or motion is unwelcome: show it immediately and never animate.
  const io = getObserver()
  if (!io || prefersReducedMotion()) {
    el.classList.add('in-view')
    return () => {}
  }

  // Already on screen at mount (above the fold) — reveal on the next frame
  // so the transition still runs from its start state.
  io.observe(el)
  return () => io.unobserve(el)
}
