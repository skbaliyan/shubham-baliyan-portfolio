import { Link } from 'react-router-dom'
import { site, socials } from '@/data/site'
import { PulseDot } from '@/components/Navigation'
import { Wrap } from '@/components/primitives'

/* ============================================================
   FOOTER — section 14
   Minimal, technical, hairline-ruled. Nothing decorative.
   ============================================================ */

const routes = [
  { label: 'Work', to: '/work' },
  { label: 'Case Studies', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const Footer = () => (
  <footer className="relative border-t border-paper/10 bg-void">
    <Wrap className="py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
        {/* Identity */}
        <div>
          <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-none tracking-display text-paper">
            Shubham Baliyan
          </p>
          <p className="mt-5 meta text-acid">Technical Recruiting &times; AI</p>
          <p className="mt-6 max-w-sm font-ui text-[0.875rem] leading-relaxed text-paper/55">
            {site.positioning}
          </p>
        </div>

        {/* Routes */}
        <nav aria-label="Footer">
          <p className="meta text-paper/55">Index</p>
          <ul className="mt-6 space-y-3">
            {routes.map((r) => (
              <li key={r.label}>
                <Link
                  to={r.to}
                  className="link-rule meta text-paper/70 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Elsewhere */}
        <div>
          <p className="meta text-paper/55">Elsewhere</p>
          <ul className="mt-6 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  className="link-rule meta text-paper/70 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Metadata rail */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-paper/10 pt-8">
        <p className="meta text-paper/55">
          &copy; {site.year} Shubham Baliyan
        </p>
        <p className="flex items-center gap-3 meta text-paper/60">
          <PulseDot />
          System Online
        </p>
        <p className="meta text-acid">{site.build}</p>
      </div>
    </Wrap>
  </footer>
)
