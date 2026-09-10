import { ChevronDown } from 'lucide-react'
import { site } from '@/data/site'
import { ParticleField } from '@/components/ParticleField'
import {
  AcidLink,
  GridField,
  Marker,
  Metadata,
  Reveal,
  Scanline,
  Wrap,
} from '@/components/primitives'

/* ============================================================
   HERO — section 04
   Massive Fraunces, one acid phrase, a technical metadata block,
   and a scanline. Everything scales with clamp(); nothing here
   is allowed to produce horizontal scroll.
   ============================================================ */

export const Hero = () => (
  <section
    aria-labelledby="hero-heading"
    className="relative overflow-hidden pt-nav"
  >
    {/* Order matters: particles sit under the grid so the 40px module
        still reads as the top layer of the composition. */}
    <ParticleField />
    <GridField />
    <Scanline />

    <Wrap className="relative pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-32">
      {/* Editorial identifier */}
      <Reveal variant="fade">
        <div className="flex items-center gap-4">
          <Marker>001</Marker>
          <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
          <span className="meta text-paper/50">Shubham Baliyan</span>
        </div>
      </Reveal>

      {/* Headline */}
      <h1
        id="hero-heading"
        aria-label="Build the future of recruiting"
        className="mt-10 font-display font-light tracking-display text-fluid-hero sm:mt-12"
      >
        <Reveal variant="mask" delay={0}>
          <span className="block text-paper">Build</span>
        </Reveal>
        <Reveal variant="mask" delay={1}>
          <span className="block text-acid">The Future</span>
        </Reveal>
        <Reveal variant="mask" delay={2}>
          <span className="block text-stroke">Of Recruiting</span>
        </Reveal>
      </h1>

      {/* Supporting line + copy + CTAs */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Reveal variant="fade" delay={1}>
            <p className="meta text-paper/55">AI &times; Recruiting &times; Automation</p>
          </Reveal>

          <Reveal variant="fade" delay={2}>
            <p className="mt-8 max-w-measure font-display text-fluid-lead font-light tracking-display-sm text-paper/80">
              6+ years in US technical recruiting. Now building AI-powered systems,
              workflows, and products for the future of work.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <AcidLink to="/work">View My Work</AcidLink>
              <AcidLink to="/contact" variant="ghost">
                Let&rsquo;s Talk
              </AcidLink>
            </div>
          </Reveal>
        </div>

        {/* Technical metadata block */}
        <Reveal variant="fade" delay={2}>
          <dl className="grid grid-cols-1 gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:mt-2">
            <div className="bg-void p-6">
              <Metadata label="Role" value="Lead Technical Recruiter" />
            </div>
            <div className="bg-void p-6">
              <Metadata label="Base" value={site.base} />
            </div>
            <div className="bg-void p-6">
              <Metadata
                label="Focus"
                value="AI • GenAI • Automation • Talent Intelligence"
              />
            </div>
            <div className="bg-void p-6">
              <Metadata label="Status" value={site.availability} accent />
            </div>
          </dl>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="mt-16 flex justify-end sm:mt-20">
        <Reveal variant="fade" delay={3}>
          <p className="flex items-center gap-3 meta text-paper/55">
            Scroll to explore
            <ChevronDown
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-chevron text-acid"
            />
          </p>
        </Reveal>
      </div>
    </Wrap>
  </section>
)
