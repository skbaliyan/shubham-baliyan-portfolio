import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { observeReveal } from '@/lib/reveal'
import { site } from '@/data/site'

/* ============================================================
   STICKY STATUS BAR — section 05
   70px, void at 80% with backdrop blur, divided by hairlines,
   closed by a 2px acid rule that grows in on entrance.
   On small screens it drops to the essentials — it never scrolls
   sideways.
   ============================================================ */

const cells = [
  { label: 'Release', value: site.release },
  { label: 'Access Protocol', value: 'Open' },
  { label: 'Status', value: 'Online', accent: true },
]

export const StatusBar = () => {
  const ruleRef = useRef<HTMLSpanElement>(null)
  useEffect(() => observeReveal(ruleRef.current), [])

  return (
    <section
      aria-label="System status"
      className="sticky top-nav z-30 border-y border-paper/10 bg-void/80 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-editorial px-5 sm:px-8 lg:px-12">
        <dl className="flex h-bar items-stretch">
          {cells.map((cell, i) => (
            <div
              key={cell.label}
              className={[
                'flex min-w-0 flex-1 flex-col justify-center gap-1.5 pr-4',
                i > 0 ? 'border-l border-paper/10 pl-4 sm:pl-6' : '',
                /* The middle cell is the first thing to go on a narrow screen —
                   below sm there is not room for three cells plus the CTA
                   without truncating every label. */
                i === 1 ? 'hidden sm:flex' : 'flex',
              ].join(' ')}
            >
              <dt className="meta truncate text-paper/55">{cell.label}</dt>
              <dd
                className={`truncate meta ${cell.accent ? 'text-acid' : 'text-paper/90'}`}
              >
                {cell.value}
              </dd>
            </div>
          ))}

          <div className="flex items-center border-l border-paper/10 pl-4 sm:pl-6">
            <Link
              to="/contact"
              className="meta whitespace-nowrap text-acid transition-opacity duration-500 ease-editorial hover:opacity-60 focus-visible:opacity-60"
            >
              Work With Me
            </Link>
          </div>
        </dl>
      </div>

      {/* 2px acid rule, animated open on entrance */}
      <span
        ref={ruleRef}
        aria-hidden="true"
        className="bar-rule absolute inset-x-0 bottom-0 block h-[2px] bg-acid"
      />
    </section>
  )
}
