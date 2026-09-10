import { creed } from '@/data/capabilities'
import { Reveal } from '@/components/primitives'

/* ============================================================
   THE CREED — section 10
   The one inverted section on the site. Full-bleed acid, void
   type. Lines shift 1rem right on hover.
   ============================================================ */

export const Creed = () => (
  <section aria-labelledby="creed-heading" className="relative bg-acid text-void">
    <div className="mx-auto w-full max-w-editorial px-5 py-section sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-baseline justify-between gap-6">
        <Reveal variant="mask">
          <h2
            id="creed-heading"
            className="font-display text-fluid-display font-light tracking-display text-void"
          >
            The Creed
          </h2>
        </Reveal>
        <Reveal variant="fade" delay={1}>
          <p className="font-ui text-meta font-semibold uppercase tracking-meta text-void/70">
            004 / Operating Principles
          </p>
        </Reveal>
      </div>

      <ol className="mt-14 border-t border-void/20 sm:mt-20">
        {creed.map((line, i) => (
          <li key={line.number} className="border-b border-void/20">
            <Reveal variant="fade" delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group flex items-baseline gap-6 py-6 transition-transform duration-700 ease-editorial hover:translate-x-4 sm:gap-10 sm:py-8">
                <span className="shrink-0 font-ui text-meta font-semibold uppercase tracking-meta text-void/70">
                  {line.number}
                </span>
                <span className="font-display text-[clamp(1.75rem,6vw,4.25rem)] font-light leading-[0.98] tracking-display text-void">
                  {line.text}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
