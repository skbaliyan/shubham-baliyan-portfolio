import { useMemo, useState } from 'react'
import { projects, categories } from '@/data/projects'
import { ProjectGrid } from '@/components/ProjectCard'
import { GridField, Marker, Reveal, Scanline, Wrap } from '@/components/primitives'
import { useSeo } from '@/hooks/useSeo'
import { findRoute } from '@/data/routes'

/* ============================================================
   WORK ARCHIVE — section 07 / PHASE 4
   The full archive with category filtering. Filters are real
   buttons in a real group, so keyboard users get the same thing
   mouse users do.
   ============================================================ */

const ALL = 'All'

export default function Work() {
  const [filter, setFilter] = useState<string>(ALL)

  useSeo(findRoute('/work')!)

  const filtered = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const filters = [ALL, ...categories]

  return (
    <>
      <header className="relative overflow-hidden border-b border-paper/10 pt-nav">
        <GridField />
        <Scanline />
        <Wrap className="relative py-20 sm:py-28">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <Marker>002</Marker>
              <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
              <span className="meta text-paper/50">Systems Built</span>
            </div>
          </Reveal>

          <Reveal variant="mask" delay={1} className="mt-10">
            <h1 className="font-display text-fluid-display font-light tracking-display text-paper">
              The Archive
            </h1>
          </Reveal>

          <Reveal variant="fade" delay={2}>
            <p className="mt-10 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
              Everything built so far, shipped or in progress. Each entry opens into a
              full case study. Where a project has not been documented yet, the case
              study says so rather than filling the space.
            </p>
          </Reveal>
        </Wrap>
      </header>

      <Wrap className="py-16 sm:py-20">
        {/* Filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-3"
        >
          {filters.map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`meta border px-4 py-3 transition-colors duration-500 ease-editorial ${
                  active
                    ? 'border-acid bg-acid text-void'
                    : 'border-paper/15 text-paper/55 hover:border-acid/60 hover:text-acid'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>

        <p className="mt-8 meta text-paper/55" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'System' : 'Systems'}
        </p>

        <div className="mt-10">
          <ProjectGrid projects={filtered} />
        </div>
      </Wrap>
    </>
  )
}
