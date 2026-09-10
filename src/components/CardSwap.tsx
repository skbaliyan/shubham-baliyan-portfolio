import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { Project } from '@/types'
import { ProjectVisual } from '@/components/ProjectVisual'

/* ============================================================
   CARD SWAP — portfolio preview

   A deck of artefacts rather than a SaaS carousel. Four cards
   visible: the front one full size, the rest stacked behind and
   offset. The deck advances on a timer; the front card lifts
   and reveals its stack + case-study affordance on hover/focus.

   Auto-advance is the one genuinely risky thing in this design,
   so it is fenced in:
     - pauses on hover, on focus-within, and when the tab or the
       section is not visible
     - never starts under prefers-reduced-motion
     - has explicit prev / next / pause controls
     - cards that are not in front are removed from the tab order
       so keyboard users never land on an invisible link
   ============================================================ */

const VISIBLE = 4
const INTERVAL = 5200

/** Depth styling for the nth card behind the front one.
 *  Offset comes from --swap-offset so it can shrink on small screens, and
 *  each card is inset from the right by the full stack depth so the deepest
 *  one lands on the container edge rather than past it. */
const layer = (depth: number) => {
  const d = `calc(var(--swap-offset) * ${depth})`
  const scale = 1 - depth * 0.05
  return {
    right: `calc(var(--swap-offset) * ${VISIBLE - 1})`,
    transform: `translate3d(${d}, calc(${d} * 0.62), 0) scale(${scale})`,
    opacity: depth === 0 ? 1 : Math.max(0, 0.5 - (depth - 1) * 0.16),
    zIndex: VISIBLE - depth,
  }
}

export const CardSwap = ({ projects }: { projects: Project[] }) => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const regionRef = useRef<HTMLDivElement>(null)

  const count = projects.length

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  /* Motion preference */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* Only run while the deck is actually on screen */
  useEffect(() => {
    const el = regionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Tab visibility */
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* The timer itself */
  const active = !paused && !userPaused && !reduced && onScreen
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => go(1), INTERVAL)
    return () => window.clearInterval(id)
  }, [active, go])

  const current = projects[index]

  return (
    <div
      ref={regionRef}
      role="group"
      aria-label="Featured projects"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
    >
      {/* The deck. Height is reserved so the stack never shifts the page. */}
      <div className="card-deck relative h-[32rem] sm:h-[32rem] lg:h-[34rem]">
        {projects.map((project, i) => {
          // depth 0 = front; only VISIBLE cards are rendered at all
          const depth = (i - index + count) % count
          if (depth >= VISIBLE) return null
          const isFront = depth === 0

          return (
            <article
              key={project.slug}
              aria-hidden={!isFront}
              style={{
                ...layer(depth),
                transition: reduced
                  ? 'none'
                  : 'transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 900ms cubic-bezier(0.16,1,0.3,1)',
              }}
              className={`group absolute inset-y-0 left-0 flex flex-col border bg-void ${
                isFront
                  ? 'border-paper/25 hover:border-acid/50 focus-within:border-acid/50'
                  : 'border-paper/10'
              }`}
            >
              {/* Card head — number, category, status */}
              <div className="flex items-center justify-between gap-4 border-b border-paper/10 px-5 py-4 sm:px-7">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="meta text-acid">{project.number}</span>
                  <span aria-hidden="true" className="h-px w-6 shrink-0 bg-acid/40" />
                  <span className="meta truncate text-paper/55">{project.category}</span>
                </div>
                <span className="meta shrink-0 text-paper/55">{project.status}</span>
              </div>

              {/* Thumbnail */}
              <div className="relative min-h-0 flex-1 border-b border-paper/10">
                <ProjectVisual variant={project.thumbnail} className="h-full w-full" />
              </div>

              {/* Body */}
              <div className="px-5 py-6 sm:px-7">
                <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-light leading-[1] tracking-display text-paper transition-colors duration-700 ease-editorial group-hover:text-acid group-focus-within:text-acid">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-measure font-ui text-[0.875rem] leading-relaxed text-paper/55">
                  {project.description}
                </p>

                {/* Detail revealed on hover / focus. Height-animated so the
                    card expands rather than covering what is under it. */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-editorial group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <ul className="flex flex-wrap gap-2 pt-5">
                      {project.technologies.slice(0, 5).map((t) => (
                        <li
                          key={t}
                          className="meta border border-paper/15 px-2.5 py-1.5 text-paper/55"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/work/${project.slug}`}
                  tabIndex={isFront ? 0 : -1}
                  className="mt-6 inline-flex items-center gap-2 meta text-paper/70 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
                >
                  View Case Study
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-paper/10 pt-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-500 ease-editorial hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-500 ease-editorial hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
              className="ml-1 flex h-10 w-10 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-500 ease-editorial hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid"
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>

        {/* Direct access to each card */}
        <ol className="flex flex-wrap items-center gap-2">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === index}
                className={`meta border px-2.5 py-2 transition-colors duration-500 ease-editorial ${
                  i === index
                    ? 'border-acid bg-acid text-void'
                    : 'border-paper/15 text-paper/55 hover:border-acid/60 hover:text-acid'
                }`}
              >
                {p.number}
              </button>
            </li>
          ))}
        </ol>

        <p aria-live="polite" className="meta ml-auto text-paper/55">
          {current.number} / {String(count).padStart(2, '0')} — {current.title}
        </p>
      </div>
    </div>
  )
}
