import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Project, ContentStatus } from '@/types'
import { ProjectVisual } from '@/components/ProjectVisual'
import {
  Marker,
  PartialNote,
  PlaceholderNote,
  Reveal,
  Scanline,
  Wrap,
} from '@/components/primitives'

/* ============================================================
   CASE STUDY TEMPLATE — section 08
   Eleven fixed sections, rendered from the project object.
   Every project uses this same template; nothing is bespoke.

   A section whose data is empty renders a PlaceholderNote rather
   than disappearing, so an unfinished case study reads as
   unfinished instead of reading as complete.
   ============================================================ */

const Section = ({
  number,
  title,
  children,
  status,
  placeholderCopy,
  empty = false,
}: {
  number: string
  title: string
  children?: React.ReactNode
  status?: ContentStatus
  placeholderCopy?: string
  empty?: boolean
}) => {
  const showPlaceholder = empty || status === 'placeholder'

  return (
    <section
      aria-labelledby={`cs-${number}`}
      className="grid gap-8 border-t border-paper/10 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
    >
      <div className="min-w-0 lg:col-span-3">
        <Reveal variant="fade">
          <p className="meta text-acid">{number}</p>
          <h2
            id={`cs-${number}`}
            className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-tight tracking-display-sm text-paper"
          >
            {title}
          </h2>
        </Reveal>
      </div>

      <div className="min-w-0 lg:col-span-9">
        {showPlaceholder ? (
          <PlaceholderNote>{placeholderCopy}</PlaceholderNote>
        ) : (
          <>
            {children}
            {status === 'partial' ? <PartialNote /> : null}
          </>
        )}
      </div>
    </section>
  )
}

const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="space-y-6">
    {paragraphs.map((p, i) => (
      <Reveal key={i} variant="fade" delay={(Math.min(i, 2)) as 0 | 1 | 2}>
        <p className="max-w-[62ch] font-display text-fluid-lead font-light leading-[1.5] tracking-display-sm text-paper/75">
          {p}
        </p>
      </Reveal>
    ))}
  </div>
)

const LabeledList = ({
  items,
}: {
  items: { label: string; body: string }[]
}) => (
  <dl className="grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2">
    {items.map((item, i) => (
      <div key={item.label} className="bg-void p-7">
        <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
          <dt className="meta text-acid/80">{item.label}</dt>
          <dd className="mt-4 font-ui text-[0.9375rem] leading-relaxed text-paper/60">
            {item.body}
          </dd>
        </Reveal>
      </div>
    ))}
  </dl>
)

const LessonBlock = ({ title, items }: { title: string; items: string[] }) => {
  if (!items.length) return null
  return (
    <div className="border-t border-paper/10 pt-7">
      <p className="meta text-acid/80">{title}</p>
      <ul className="mt-5 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-paper/25" />
            <span className="font-ui text-[0.9375rem] leading-relaxed text-paper/60">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------------- */

export const CaseStudy = ({
  project,
  prev,
  next,
}: {
  project: Project
  prev?: Project
  next?: Project
}) => (
  <article>
    {/* ---------- Masthead ---------- */}
    <header className="relative overflow-hidden border-b border-paper/10">
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <Scanline />

      <Wrap className="relative py-16 sm:py-24">
        <Reveal variant="fade">
          <div className="flex flex-wrap items-center gap-4">
            <Marker>{project.number}</Marker>
            <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
            <span className="meta text-paper/50">{project.category}</span>
          </div>
        </Reveal>

        <Reveal variant="mask" delay={1} className="mt-9">
          <h1 className="font-display text-fluid-display font-light tracking-display text-paper">
            {project.title}
          </h1>
        </Reveal>

        <Reveal variant="fade" delay={2}>
          <p className="mt-8 max-w-[52ch] font-display text-fluid-sub font-light leading-[1.25] tracking-display-sm text-acid">
            {project.tagline}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal variant="fade" delay={2} className="min-w-0 lg:col-span-7">
            <div className="aspect-[16/9] border border-paper/10">
              <ProjectVisual variant={project.thumbnail} className="h-full w-full" />
            </div>
          </Reveal>

          <Reveal variant="fade" delay={3} className="min-w-0 lg:col-span-5">
            <dl className="grid grid-cols-2 gap-px border border-paper/10 bg-paper/10">
              <div className="bg-void p-6">
                <dt className="meta text-paper/55">Year</dt>
                <dd className="mt-3 meta text-paper/85">{project.year}</dd>
              </div>
              <div className="bg-void p-6">
                <dt className="meta text-paper/55">Status</dt>
                <dd className="mt-3 meta text-acid">{project.status}</dd>
              </div>
              <div className="col-span-2 bg-void p-6">
                <dt className="meta text-paper/55">Technologies</dt>
                <dd className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="meta border border-paper/15 px-2.5 py-1.5 text-paper/55"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              {project.links?.length ? (
                <div className="col-span-2 bg-void p-6">
                  <dt className="meta text-paper/55">Links</dt>
                  <dd className="mt-4 space-y-2">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-rule block w-fit meta text-acid transition-opacity duration-500 ease-editorial hover:opacity-70"
                      >
                        {l.label}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>

        {project.contentStatus === 'placeholder' ? (
          <Reveal variant="fade" delay={3}>
            <div className="mt-12 border border-acid/50 bg-acid/[0.04] p-7">
              <p className="meta text-acid">Case study in progress</p>
              <p className="mt-4 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/65">
                This project is in build and its case study has not been written. The
                sections below are placeholders. Nothing on this page is a claimed
                result.
              </p>
            </div>
          </Reveal>
        ) : null}
      </Wrap>
    </header>

    {/* ---------- Body ---------- */}
    <Wrap>
      <Section number="01" title="Overview">
        <Prose paragraphs={project.overview} />
      </Section>

      <Section number="02" title="The Problem">
        <Prose paragraphs={project.problem} />
      </Section>

      <Section number="03" title="Context" empty={!project.context.length}>
        <LabeledList items={project.context} />
      </Section>

      <Section number="04" title="Approach" empty={!project.approach.length}>
        <div className="space-y-10">
          {project.approach.map((a, i) => (
            <Reveal key={a.label} variant="fade" delay={(i % 3) as 0 | 1 | 2}>
              <div className="border-l border-acid/40 pl-6 sm:pl-8">
                <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] font-light leading-tight tracking-display-sm text-paper">
                  {a.label}
                </h3>
                <p className="mt-4 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number="05" title="Process" empty={!project.process.length}>
        <ol className="border-t border-paper/10">
          {project.process.map((step, i) => (
            <li key={step.step} className="border-b border-paper/10">
              <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                <div className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_1.4fr] sm:gap-8">
                  <span className="meta text-acid/70">{step.step}</span>
                  <h3 className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-light leading-tight tracking-display-sm text-paper">
                    {step.title}
                  </h3>
                  <p className="font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        number="06"
        title="AI Layer"
        status={project.aiLayer.status}
        placeholderCopy="The AI layer for this project is not documented yet. Technologies will be listed here only once they are genuinely part of the build."
      >
        <Reveal variant="fade">
          <p className="max-w-[62ch] font-display text-fluid-lead font-light leading-[1.5] tracking-display-sm text-paper/75">
            {project.aiLayer.body}
          </p>
        </Reveal>

        {project.aiLayer.stack.length ? (
          <Reveal variant="fade" delay={1}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {project.aiLayer.stack.map((t) => (
                <li
                  key={t}
                  className="meta border border-acid/40 px-3 py-2 text-acid/90"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {project.aiLayer.uses.length ? (
          <div className="mt-12">
            <LabeledList items={project.aiLayer.uses} />
          </div>
        ) : null}
      </Section>

      <Section
        number="07"
        title="System / Architecture"
        status={project.architecture.status}
        placeholderCopy="No architecture diagram has been drawn for this project yet."
      >
        <Reveal variant="fade">
          <p className="max-w-[62ch] font-display text-fluid-lead font-light leading-[1.5] tracking-display-sm text-paper/75">
            {project.architecture.summary}
          </p>
        </Reveal>

        {project.architecture.nodes.length ? (
          <Reveal variant="fade" delay={1}>
            <ol className="mt-12 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
              {project.architecture.nodes.map((node, i) => (
                <li key={node.id} className="relative bg-void p-6">
                  <div className="flex items-center gap-3">
                    <span className="meta text-acid">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {i < project.architecture.nodes.length - 1 ? (
                      <span aria-hidden="true" className="h-px flex-1 bg-paper/15" />
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-[1.25rem] font-light leading-tight tracking-display-sm text-paper">
                    {node.label}
                  </h3>
                  <p className="mt-3 font-ui text-[0.8125rem] leading-relaxed text-paper/50">
                    {node.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}

        {project.architecture.notes.length ? (
          <ul className="mt-10 space-y-4 border-t border-paper/10 pt-8">
            {project.architecture.notes.map((n, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-acid/60" />
                <span className="font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section
        number="08"
        title="Build"
        empty={!project.build.length}
        placeholderCopy="Build artefacts — interfaces, workflows, decisions and code — have not been documented for this project yet."
      >
        <div className="min-w-0 space-y-px bg-paper/10">
          {project.build.map((artifact, i) => (
            <Reveal key={artifact.title} variant="fade" delay={(i % 3) as 0 | 1 | 2}>
              <div className="bg-void p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="meta border border-paper/20 px-2.5 py-1.5 text-paper/50">
                    {artifact.kind}
                  </span>
                  <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] font-light leading-tight tracking-display-sm text-paper">
                    {artifact.title}
                  </h3>
                </div>

                <p className="mt-5 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                  {artifact.caption}
                </p>

                {artifact.steps?.length ? (
                  <ol className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3">
                    {artifact.steps.map((s, si) => (
                      <li key={s} className="flex items-center gap-3">
                        <span className="meta border border-paper/15 px-3 py-2 text-paper/60">
                          {s}
                        </span>
                        {si < artifact.steps!.length - 1 ? (
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3 w-3 shrink-0 text-acid/60"
                          />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                ) : null}

                {artifact.code ? (
                  <pre className="mt-7 max-w-full overflow-x-auto border border-paper/10 bg-paper/[0.02] p-5 text-[0.8125rem] leading-relaxed text-paper/70">
                    <code className="font-mono">{artifact.code}</code>
                  </pre>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        number="09"
        title="Outcome"
        status={project.outcome.status}
        placeholderCopy="No outcomes are claimed for this project. It has not been measured."
      >
        {project.outcome.items.length ? (
          <dl className="grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2">
            {project.outcome.items.map((item, i) => (
              <div key={item.label} className="bg-void p-7">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  {item.value ? (
                    <p className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-none tracking-display text-acid">
                      {item.value}
                    </p>
                  ) : null}
                  <dt className={`meta text-paper/85 ${item.value ? 'mt-6' : ''}`}>
                    {item.label}
                  </dt>
                  <dd className="mt-4 font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                    {item.body}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        ) : null}

        {project.outcome.note ? (
          <p className="mt-8 max-w-measure border-l border-acid/50 pl-6 font-ui text-[0.875rem] leading-relaxed text-paper/55">
            {project.outcome.note}
          </p>
        ) : null}
      </Section>

      <Section
        number="10"
        title="Lessons"
        status={project.lessons.status}
        empty={
          project.lessons.status === 'placeholder' ||
          ![
            ...project.lessons.worked,
            ...project.lessons.failed,
            ...project.lessons.changed,
            ...project.lessons.learned,
          ].length
        }
        placeholderCopy="Lessons will be written once there is something honest to say. Nothing is being claimed in the meantime."
      >
        <div className="space-y-9">
          <LessonBlock title="What worked" items={project.lessons.worked} />
          <LessonBlock title="What failed" items={project.lessons.failed} />
          <LessonBlock title="What changed" items={project.lessons.changed} />
          <LessonBlock title="What was learned" items={project.lessons.learned} />
        </div>
      </Section>

      <Section number="11" title="Next" empty={!project.nextSteps.length}>
        <ul className="space-y-6">
          {project.nextSteps.map((s, i) => (
            <li key={i}>
              <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex gap-5">
                  <span className="meta shrink-0 pt-1.5 text-acid/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="max-w-measure font-display text-fluid-lead font-light leading-[1.45] tracking-display-sm text-paper/70">
                    {s}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </Wrap>

    {/* ---------- Next system ---------- */}
    <nav
      aria-label="Case study navigation"
      className="relative overflow-hidden border-t border-paper/10"
    >
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <Wrap className="relative py-section">
        <Reveal variant="fade">
          <Marker>Next System</Marker>
        </Reveal>

        {next ? (
          <Reveal variant="mask" delay={1} className="mt-8">
            <Link
              to={`/work/${next.slug}`}
              className="group block font-display text-fluid-display font-light tracking-display text-stroke transition-colors duration-700 ease-editorial hover:text-acid hover:[-webkit-text-stroke:0]"
            >
              {next.title}
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-paper/10 pt-8">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="group inline-flex items-center gap-3 meta text-paper/60 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              Previous — {prev.title}
            </Link>
          ) : null}

          <Link
            to="/work"
            className="link-rule meta text-paper/60 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
          >
            All Work
          </Link>

          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="group inline-flex items-center gap-3 meta text-paper/60 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid sm:ml-auto"
            >
              Next — {next.title}
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              />
            </Link>
          ) : null}
        </div>
      </Wrap>
    </nav>
  </article>
)
