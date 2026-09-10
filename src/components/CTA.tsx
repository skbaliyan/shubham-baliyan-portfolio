import { socials } from '@/data/site'
import {
  AcidAnchor,
  AcidLink,
  Marker,
  Reveal,
  Scanline,
  Wrap,
} from '@/components/primitives'
import { PulseDot } from '@/components/Navigation'

/* ============================================================
   CONTACT / CTA — section 13
   Stroke display type over two massive concentric circles.
   No form. Three ways to reach a person, and nothing else.
   ============================================================ */

const Circles = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <svg
      viewBox="0 0 900 900"
      className="h-[min(150vw,1100px)] w-[min(150vw,1100px)] opacity-70"
      fill="none"
    >
      <circle cx="450" cy="450" r="300" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      <circle cx="450" cy="450" r="440" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    </svg>
  </div>
)

export const CTA = () => (
  <section
    aria-labelledby="cta-heading"
    className="relative overflow-hidden border-t border-paper/10"
  >
    <Circles />
    <Scanline />

    <Wrap className="relative py-section">
      <Reveal variant="fade">
        <Marker>005 / Start a conversation</Marker>
      </Reveal>

      <h2
        id="cta-heading"
        aria-label="Let's build something useful."
        className="mt-10 font-display font-light tracking-display text-fluid-display"
      >
        <Reveal variant="mask">
          <span className="block text-paper">Let&rsquo;s build</span>
        </Reveal>
        <Reveal variant="mask" delay={1}>
          <span className="block text-stroke">something useful.</span>
        </Reveal>
      </h2>

      <Reveal variant="fade" delay={2}>
        <p className="mt-10 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
          Open to roles and collaborations across technical recruiting, recruiting
          operations, and applied AI — building the systems as readily as running the
          desk. The quickest route is email.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={3}>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <AcidLink to="/contact">Let&rsquo;s Talk</AcidLink>
          <AcidAnchor
            href={socials[1].href}
            variant="ghost"
            target="_blank"
            rel="noreferrer noopener"
          >
            View LinkedIn
          </AcidAnchor>
        </div>
      </Reveal>

      {/* Direct routes */}
      <Reveal variant="fade" delay={3}>
        <dl className="mt-16 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-3">
          {socials.map((s) => (
            <div key={s.label} className="bg-void p-6">
              <dt className="meta text-paper/55">{s.label}</dt>
              <dd className="mt-3">
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  className="link-rule break-words font-ui text-[0.8125rem] tracking-meta-tight text-paper/80 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
                >
                  {s.handle}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal variant="fade" delay={3}>
        <p className="mt-10 flex items-center gap-3 meta text-paper/60">
          <PulseDot />
          Available for remote opportunities
        </p>
      </Reveal>
    </Wrap>
  </section>
)
