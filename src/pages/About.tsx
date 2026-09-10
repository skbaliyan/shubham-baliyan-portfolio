import { ArrowDown } from 'lucide-react'
import {
  timeline,
  experience,
  recruitingRecord,
  recruitingCapabilities,
  aiCapabilities,
  domains,
  stack,
} from '@/data/about'
import { site } from '@/data/site'
import {
  AcidAnchor,
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
   ABOUT — section 11
   ============================================================ */

const TagList = ({ items, accent = false }: { items: string[]; accent?: boolean }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className={`meta border px-3 py-2 ${
          accent ? 'border-acid/40 text-acid/90' : 'border-paper/15 text-paper/55'
        }`}
      >
        {item}
      </li>
    ))}
  </ul>
)

export default function About() {
  useSeo(findRoute('/about')!)

  return (
    <>
      <header className="relative overflow-hidden border-b border-paper/10 pt-nav">
        <GridField />
        <Scanline />
        <Wrap className="relative py-20 sm:py-28">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <Marker>006</Marker>
              <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
              <span className="meta text-paper/50">Profile</span>
            </div>
          </Reveal>

          <h1
            aria-label="The person behind the system"
            className="mt-10 font-display text-fluid-display font-light tracking-display"
          >
            <Reveal variant="mask">
              <span className="block text-paper">The Person</span>
            </Reveal>
            <Reveal variant="mask" delay={1}>
              <span className="block text-stroke">Behind The System</span>
            </Reveal>
          </h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal variant="fade" delay={2}>
              <p className="max-w-[56ch] font-display text-fluid-sub font-light leading-[1.3] tracking-display-sm text-paper/85">
                Shubham Baliyan. Six-plus years of US technical recruiting and staffing,
                now spent building the tools that do the sourcing and screening.
              </p>
              <p className="mt-8 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                Full-cycle staffing across IT, BFSI and public-sector clients — including
                KPMG, Freddie Mac, Salesforce, Verizon, Yahoo and the Commonwealth of
                Massachusetts — alongside hands-on LLM and automation work. A recruiter
                who builds, rather than a builder guessing at recruiting.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <AcidAnchor
                  href={site.resume.href}
                  download={site.resume.filename}
                >
                  Download Résumé
                </AcidAnchor>
                <span className="meta text-paper/55">{site.resume.format}</span>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={3}>
              <ul className="grid gap-px border border-paper/10 bg-paper/10">
                {site.roles.map((role) => (
                  <li key={role} className="bg-void px-6 py-5">
                    <span className="meta text-paper/80">{role}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Wrap>
      </header>

      {/* ---------- Recruiting record ---------- */}
      <section aria-labelledby="record-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="record-heading"
            marker="007 / Recruiting Record"
            title="The Numbers That Exist"
            lead="These come from the recruiting practice — full-cycle delivery across several years and employers. They are not attributed to any tool on this site, and no product metrics are claimed anywhere else."
          />

          <dl className="mt-16 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {recruitingRecord.map((item, i) => (
              <div key={item.label} className="bg-void p-7">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  <dt className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-light leading-none tracking-display text-acid">
                    {item.value}
                  </dt>
                  <dd className="mt-6">
                    <p className="meta text-paper/85">{item.label}</p>
                    <p className="mt-3 font-ui text-[0.8125rem] leading-relaxed text-paper/55">
                      {item.note}
                    </p>
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* ---------- Evolution timeline ---------- */}
      <section aria-labelledby="timeline-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="timeline-heading"
            marker="008 / Evolution"
            title="Recruiting To Product"
          />

          <ol className="mt-16 border-t border-paper/10">
            {timeline.map((stage, i) => (
              <li key={stage.id} className="border-b border-paper/10">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  <div className="group grid gap-5 py-8 transition-colors duration-700 ease-editorial hover:bg-paper/[0.02] sm:grid-cols-[4rem_1fr_1.3fr] sm:gap-8">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="meta text-acid/70">{stage.id}</span>
                      {i < timeline.length - 1 ? (
                        <ArrowDown
                          aria-hidden="true"
                          className="mt-4 hidden h-3.5 w-3.5 text-paper/45 sm:block"
                        />
                      ) : null}
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.375rem,2.6vw,2rem)] font-light leading-tight tracking-display-sm text-paper transition-colors duration-700 ease-editorial group-hover:text-acid">
                        {stage.label}
                      </h3>
                      <p className="mt-3 meta text-paper/55">{stage.window}</p>
                    </div>
                    <p className="font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                      {stage.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------- Capability sets ---------- */}
      <section aria-labelledby="caps-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="caps-heading"
            marker="009 / Capability Sets"
            title="What The Desk Covers"
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="fade">
              <h3 className="meta text-acid">Recruitment</h3>
              <div className="mt-7">
                <TagList items={recruitingCapabilities} />
              </div>

              <h3 className="mt-12 meta text-acid">Technical Domains</h3>
              <div className="mt-7">
                <TagList items={domains} />
              </div>
            </Reveal>

            <Reveal variant="fade" delay={1}>
              <h3 className="meta text-acid">AI</h3>
              <div className="mt-7">
                <TagList items={aiCapabilities} accent />
              </div>

              <h3 className="mt-12 meta text-acid">Tooling</h3>
              <dl className="mt-7 space-y-6">
                <div>
                  <dt className="meta text-paper/55">ATS</dt>
                  <dd className="mt-3">
                    <TagList items={stack.ats} />
                  </dd>
                </div>
                <div>
                  <dt className="meta text-paper/55">VMS</dt>
                  <dd className="mt-3">
                    <TagList items={stack.vms} />
                  </dd>
                </div>
                <div>
                  <dt className="meta text-paper/55">Sourcing</dt>
                  <dd className="mt-3">
                    <TagList items={stack.sourcing} />
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ---------- Experience ---------- */}
      <section aria-labelledby="exp-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="exp-heading"
            marker="010 / Record"
            title="Experience"
          />

          <ol className="mt-16 border-t border-paper/10">
            {experience.map((role, i) => (
              <li key={`${role.company}-${role.period}`} className="border-b border-paper/10">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  <div className="grid gap-6 py-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
                    <div>
                      <h3 className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-tight tracking-display-sm text-paper">
                        {role.company}
                      </h3>
                      <p className="mt-4 meta text-acid/80">{role.role}</p>
                      <p className="mt-3 meta text-paper/55">{role.period}</p>
                      <p className="mt-3 meta text-paper/55">{role.location}</p>
                      {role.clients ? (
                        <p className="mt-5 font-ui text-[0.8125rem] leading-relaxed text-paper/55">
                          {role.clients}
                        </p>
                      ) : null}
                    </div>

                    <ul className="space-y-4">
                      {role.points.map((p, pi) => (
                        <li key={pi} className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-px w-4 shrink-0 bg-acid/50"
                          />
                          <span className="font-ui text-[0.9375rem] leading-relaxed text-paper/60">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal variant="fade">
            <div className="mt-14 border border-paper/10 p-7">
              <p className="meta text-paper/55">Education</p>
              <p className="mt-5 font-ui text-[0.9375rem] leading-relaxed text-paper/65">
                B.Tech, Computer Science — Uttarakhand Technical University (2019)
              </p>
              <p className="mt-5 meta text-paper/55">Certifications</p>
              <p className="mt-5 font-ui text-[0.9375rem] leading-relaxed text-paper/65">
                Lean Six Sigma — Recruitment (Udemy, 2022) &middot; Human Capital
                Management (Great Learning, 2023) &middot; ChatGPT for Marketing (Great
                Learning, 2024)
              </p>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <CTA />
    </>
  )
}
