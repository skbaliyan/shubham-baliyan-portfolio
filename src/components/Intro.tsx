import { Reveal, Wrap } from '@/components/primitives'

/* ============================================================
   EDITORIAL INTRODUCTION — section 06
   Sticky title on the left, large Fraunces body on the right.
   Acid is reserved for the words the paragraph actually turns on.
   ============================================================ */

const Key = ({ children }: { children: React.ReactNode }) => (
  <em className="not-italic text-acid">{children}</em>
)

export const Intro = () => (
  <section aria-labelledby="intro-heading" className="relative border-t border-paper/10">
    <Wrap className="py-section">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Sticky left column */}
        <div className="lg:sticky lg:top-[calc(theme(spacing.nav)+theme(spacing.bar)+3rem)] lg:self-start">
          <Reveal variant="mask">
            <h2
              id="intro-heading"
              aria-label="From recruiting to building"
              className="font-display text-fluid-title font-light tracking-display text-paper"
            >
              From Recruiting
            </h2>
          </Reveal>
          <Reveal variant="mask" delay={1}>
            <h2
              aria-hidden="true"
              className="font-display text-fluid-title font-light tracking-display text-stroke"
            >
              To Building
            </h2>
          </Reveal>

          <Reveal variant="fade" delay={2}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-paper/10 pt-8">
              {[
                ['Exp.', '06+'],
                ['Domain.', 'US Tech'],
                ['Mode.', 'AI-First'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="meta text-paper/55">{k}</dt>
                  <dd className="mt-2 meta text-acid">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Body */}
        <div className="max-w-[60ch]">
          <Reveal variant="fade">
            <p className="font-display text-fluid-sub font-light leading-[1.28] tracking-display-sm text-paper/90">
              I spent six years filling US technical roles — Cloud, Data Engineering,
              DevOps, Cybersecurity, Salesforce, AI/ML — for clients including{' '}
              <Key>KPMG, Freddie Mac, Salesforce, Verizon and Yahoo</Key>.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={1}>
            <p className="mt-10 font-display text-fluid-lead font-light leading-[1.45] tracking-display-sm text-paper/65">
              Recruiting taught me exactly where the work is mechanical and where it is
              judgement. Boolean strings, record handoffs, eligibility checks and
              submission summaries are translation. Deciding who to put in front of a
              hiring manager is not.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={2}>
            <p className="mt-8 font-display text-fluid-lead font-light leading-[1.45] tracking-display-sm text-paper/65">
              So I started building the translation layer. First{' '}
              <Key>prompts and workflows</Key> on my own desk, then chained{' '}
              <Key>automation</Key> across sourcing and outreach, then systems with
              stated constraints — a screening engine that hard-gates eligibility
              before it scores anything, and a resume tool that{' '}
              <Key>cannot write a sentence</Key> because generation was removed rather
              than restricted.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={3}>
            <p className="mt-8 font-display text-fluid-lead font-light leading-[1.45] tracking-display-sm text-paper/65">
              The through-line is not the models. It is that a recruiter has to be able
              to explain a decision to a candidate and defend a shortlist to a client.
              Anything a system can&rsquo;t explain, it shouldn&rsquo;t decide.
            </p>
          </Reveal>
        </div>
      </div>
    </Wrap>
  </section>
)
