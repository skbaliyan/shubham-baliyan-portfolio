import { modules } from '@/data/capabilities'
import { Reveal, SectionHeader, Wrap } from '@/components/primitives'

/* ============================================================
   SYSTEM CAPABILITIES — section 09
   Three-column editorial grid. Hover lifts the background to 2%
   white and turns the title acid. Nothing moves far.
   ============================================================ */

export const Capabilities = () => (
  <section aria-labelledby="capabilities-heading" className="relative border-t border-paper/10">
    <Wrap className="py-section">
      <SectionHeader
        id="capabilities-heading"
        marker="003 / System Capabilities"
        title="System Specs"
        lead="Eight modules. Four come from running a recruiting desk, four from building the tools that sit on it. They are listed together because that is how they are actually used."
      />

      <ul className="mt-16 grid gap-px border border-paper/10 bg-paper/10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, i) => (
          <li key={mod.id} className="bg-void">
            <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2} className="h-full">
              <article className="group h-full p-7 transition-colors duration-700 ease-editorial hover:bg-paper/[0.02] sm:p-8">
                <p className="meta text-acid/70">{mod.id}</p>
                <h3 className="mt-6 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-light leading-tight tracking-display-sm text-paper transition-all duration-700 ease-editorial group-hover:translate-x-1 group-hover:text-acid">
                  {mod.title}
                </h3>
                <p className="mt-5 font-ui text-[0.875rem] leading-relaxed text-paper/50">
                  {mod.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Wrap>
  </section>
)
