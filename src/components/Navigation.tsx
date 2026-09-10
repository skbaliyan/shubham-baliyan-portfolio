import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '@/data/site'

/* ============================================================
   NAVIGATION — section 03
   Fixed, minimal, hairline-bottomed. Acid underline on hover,
   focus and the active route. Collapses to a full-screen menu.
   ============================================================ */

const links = [
  { label: 'Work', to: '/work' },
  { label: 'Case Studies', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

/* "Work" and "Case Studies" both point at the archive; only one
   should read as active, so the duplicate is matched by label. */
const isActive = (pathname: string, to: string, label: string) => {
  if (label === 'Case Studies') return pathname.startsWith('/work/')
  if (to === '/work') return pathname === '/work'
  return pathname === to
}

export const PulseDot = () => (
  <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
  </span>
)

export const Navigation = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close on route change.
  useEffect(() => setOpen(false), [pathname])

  // Lock scroll and wire Escape while the menu is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-void/80 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-nav w-full max-w-editorial items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
        >
          {/* Left — system status */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <PulseDot />
            <span className="meta text-paper/70 transition-colors duration-500 ease-editorial group-hover:text-acid">
              System Online
            </span>
          </Link>

          {/* Right — routes */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                data-active={isActive(pathname, link.to, link.label)}
                className="link-rule meta text-paper/70 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid data-[active=true]:text-acid"
              >
                {link.label}
              </NavLink>
            ))}
            <span
              aria-hidden="true"
              className="meta hidden text-acid/70 xl:inline"
            >
              {site.build}
            </span>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex items-center gap-2 p-2 text-paper md:hidden"
          >
            <span className="meta">{open ? 'Close' : 'Menu'}</span>
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu — deliberate mobile composition, not a squeezed desktop nav */}
      {/* The `hidden` attribute alone would lose to Tailwind's `flex`
          (both set display; the class wins), so the display class itself
          is what toggles. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex-col bg-void pt-nav md:hidden ${
          open ? 'flex' : 'hidden'
        }`}
      >
        <div className="grid-field absolute inset-0" aria-hidden="true" />
        <nav
          aria-label="Mobile"
          className="relative flex flex-1 flex-col justify-between px-5 pb-10 pt-10 sm:px-8"
        >
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.label} className="border-b border-paper/10">
                <NavLink
                  to={link.to}
                  className="flex items-baseline gap-5 py-5 font-display text-[2.25rem] font-light tracking-display-sm text-paper transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
                >
                  <span className="meta text-acid/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-paper/10 pt-6">
            {[
              ['Build', '026'],
              ['System', 'TXB'],
              ['Status', 'Online'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="meta text-paper/55">{k}</dt>
                <dd className="mt-2 meta text-acid">{v}</dd>
              </div>
            ))}
          </dl>
        </nav>
      </div>
    </>
  )
}
