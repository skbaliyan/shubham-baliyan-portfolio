import { ArrowRight } from 'lucide-react'
import { articles, insightTopics, contentChain } from '@/data/articles'
import { ArticleCard } from '@/components/ArticleCard'
import {
  GridField,
  Marker,
  Reveal,
  Scanline,
  SectionHeader,
  Wrap,
} from '@/components/primitives'
import { CTA } from '@/components/CTA'
import { useSeo } from '@/hooks/useSeo'
import { findRoute } from '@/data/routes'

/* ============================================================
   SIGNALS / INSIGHTS — section 12
   ============================================================ */

export default function Insights() {
  useSeo(findRoute('/insights')!)

  return (
    <>
      <header className="relative overflow-hidden border-b border-paper/10 pt-nav">
        <GridField />
        <Scanline />
        <Wrap className="relative py-20 sm:py-28">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <Marker>011</Marker>
              <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
              <span className="meta text-paper/50">Publication</span>
            </div>
          </Reveal>

          <h1
            aria-label="Signals and insights"
            className="mt-10 font-display text-fluid-display font-light tracking-display"
          >
            <Reveal variant="mask">
              <span className="block text-paper">Signals</span>
            </Reveal>
            <Reveal variant="mask" delay={1}>
              <span className="block text-stroke">Insights</span>
            </Reveal>
          </h1>

          <Reveal variant="fade" delay={2}>
            <p className="mt-10 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
              Notes from the desk and from the build. Each entry shows its real stage —
              published, drafting, or planned — so nothing here reads as finished before
              it is.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={3}>
            <ul className="mt-12 flex flex-wrap gap-2">
              {insightTopics.map((t) => (
                <li
                  key={t}
                  className="meta border border-paper/15 px-3 py-2 text-paper/55"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
      </header>

      {/* ---------- The chain ---------- */}
      <section aria-labelledby="chain-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="chain-heading"
            marker="012 / Content Architecture"
            title="How An Idea Travels"
            lead="Most observations stop at the first stage, and that is the correct outcome. The ones that survive end up as a case study with the failures included."
          />

          <ol className="mt-16 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {contentChain.map((node, i) => (
              <li key={node.id} className="bg-void p-7">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  <div className="flex items-center gap-3">
                    <span className="meta text-acid">{node.id}</span>
                    {i < contentChain.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3 w-3 text-paper/45"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-6 font-display text-[1.375rem] font-light leading-tight tracking-display-sm text-paper">
                    {node.label}
                  </h3>
                  <p className="mt-4 font-ui text-[0.8125rem] leading-relaxed text-paper/50">
                    {node.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------- Entries ---------- */}
      <section aria-labelledby="entries-heading">
        <Wrap className="py-section">
          <SectionHeader
            id="entries-heading"
            marker="013 / Entries"
            title="Written & Planned"
          />

          <div className="mt-16 border-b border-paper/10">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </Wrap>
      </section>

      <CTA />
    </>
  )
}
