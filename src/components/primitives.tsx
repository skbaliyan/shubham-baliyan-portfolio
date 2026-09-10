import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { observeReveal } from '@/lib/reveal'

/* ============================================================
   PRIMITIVES
   Reveal, AcidButton, Metadata, SectionHeader, Scanline, Grain,
   and the placeholder marker that keeps section 24 honest.
   ============================================================ */

/* ---------------------------------------------------------------- Reveal */

type RevealProps = {
  children: ReactNode
  /** 'mask' clips and slides from 115% — for single lines of display type.
   *  'fade' lifts and fades — for anything that must not be clipped. */
  variant?: 'mask' | 'fade'
  /** Incremental stagger: 0 | 1 | 2 | 3 -> 0 / 100 / 200 / 300ms */
  delay?: 0 | 1 | 2 | 3 | 4
  as?: ElementType
  className?: string
}

const DELAYS = ['0ms', '100ms', '200ms', '300ms', '400ms'] as const

export const Reveal = ({
  children,
  variant = 'fade',
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => observeReveal(ref.current), [])

  const base = variant === 'mask' ? 'reveal-mask' : 'reveal-fade'

  if (variant === 'mask') {
    return (
      <Tag ref={ref} className={`${base} ${className}`}>
        <span
          className="reveal-inner block"
          style={{ transitionDelay: DELAYS[delay] }}
        >
          {children}
        </span>
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`}
      style={{ transitionDelay: DELAYS[delay] }}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------ AcidButton */

type AcidButtonBaseProps = {
  children: ReactNode
  variant?: 'acid' | 'ghost'
  className?: string
}

const acidClasses = (variant: 'acid' | 'ghost') =>
  [
    'group relative inline-flex items-center justify-center gap-0',
    'font-ui text-meta-lg font-bold uppercase tracking-meta',
    'py-3 pl-8 pr-8 transition-all duration-500 ease-editorial',
    'hover:pr-12 focus-visible:pr-12',
    variant === 'acid'
      ? 'bg-acid text-void hover:bg-paper focus-visible:bg-paper'
      : 'border border-paper/40 text-paper hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid',
  ].join(' ')

const AcidInner = ({ children }: { children: ReactNode }) => (
  <>
    <span className="relative z-10">{children}</span>
    <ArrowRight
      aria-hidden="true"
      strokeWidth={2.5}
      className="pointer-events-none absolute right-4 h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
    />
  </>
)

export const AcidLink = ({
  to,
  children,
  variant = 'acid',
  className = '',
}: AcidButtonBaseProps & { to: string }) => (
  <Link to={to} className={`${acidClasses(variant)} ${className}`}>
    <AcidInner>{children}</AcidInner>
  </Link>
)

export const AcidAnchor = ({
  href,
  children,
  variant = 'acid',
  className = '',
  ...rest
}: AcidButtonBaseProps & ComponentPropsWithoutRef<'a'>) => (
  <a href={href} className={`${acidClasses(variant)} ${className}`} {...rest}>
    <AcidInner>{children}</AcidInner>
  </a>
)

export const AcidButton = ({
  children,
  variant = 'acid',
  className = '',
  ...rest
}: AcidButtonBaseProps & ComponentPropsWithoutRef<'button'>) => (
  <button type="button" className={`${acidClasses(variant)} ${className}`} {...rest}>
    <AcidInner>{children}</AcidInner>
  </button>
)

/* --------------------------------------------------------------- Metadata */

export const Metadata = ({
  label,
  value,
  accent = false,
  className = '',
}: {
  label: string
  value: ReactNode
  accent?: boolean
  className?: string
}) => (
  <div className={className}>
    <dt className="meta text-paper/55">{label}</dt>
    <dd
      className={`mt-2 font-ui text-[0.8125rem] leading-snug tracking-meta-tight ${
        accent ? 'text-acid' : 'text-paper/85'
      }`}
    >
      {value}
    </dd>
  </div>
)

/** The small acid annotation used as an editorial marker, e.g. 002 / SYSTEMS BUILT */
export const Marker = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`meta text-acid ${className}`}>{children}</span>
)

/* ---------------------------------------------------------- SectionHeader */

export const SectionHeader = ({
  marker,
  title,
  lead,
  id,
  className = '',
}: {
  marker: string
  title: string
  lead?: string
  id?: string
  className?: string
}) => (
  <header className={`relative ${className}`}>
    <Reveal variant="fade">
      <Marker>{marker}</Marker>
    </Reveal>
    <Reveal variant="mask" delay={1} className="mt-6">
      <h2
        id={id}
        className="font-display text-fluid-title font-light tracking-display text-paper"
      >
        {title}
      </h2>
    </Reveal>
    {lead ? (
      <Reveal variant="fade" delay={2} className="mt-8 max-w-measure">
        <p className="font-ui text-[0.9375rem] leading-relaxed text-paper/55">{lead}</p>
      </Reveal>
    ) : null}
  </header>
)

/* ------------------------------------------------------------- Scanline */

/** CRT-style vertical light sweep — section 16. Purely decorative. */
export const Scanline = ({ className = '' }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`scanline pointer-events-none absolute inset-0 overflow-hidden ${className}`}
  >
    <div
      className="h-full w-full animate-scanline"
      style={{
        background:
          'linear-gradient(to bottom, transparent, rgba(223, 255, 0, 0.03), transparent)',
      }}
    />
  </div>
)

/* --------------------------------------------------------- Grain + Grid */

export const GrainOverlay = () => (
  <div
    aria-hidden="true"
    className="grain-overlay pointer-events-none fixed inset-0 z-[60]"
  />
)

export const GridField = ({ className = '' }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`grid-field pointer-events-none absolute inset-0 ${className}`}
  />
)

/* ------------------------------------------------------- Content honesty */

/** Section 24. Rendered wherever a block has no verified source behind it.
 *  Loud on purpose — a placeholder must never read as an achievement. */
export const PlaceholderNote = ({ children }: { children?: ReactNode }) => (
  <div className="mt-8 border border-acid/50 bg-acid/[0.04] p-6">
    <p className="meta text-acid">Placeholder — content pending</p>
    <p className="mt-3 max-w-measure font-ui text-[0.875rem] leading-relaxed text-paper/60">
      {children ??
        'This section has not been written yet. Nothing here is a claim, a result, or a finished description of the work.'}
    </p>
  </div>
)

/** Softer marker: the block is grounded in real build notes but not final. */
export const PartialNote = ({ children }: { children?: ReactNode }) => (
  <p className="mt-6 meta text-paper/55">
    {children ?? 'Note. Drawn from build notes — expandable'}
  </p>
)

/* ---------------------------------------------------------------- Rules */

export const Rule = ({ className = '' }: { className?: string }) => (
  <hr className={`border-0 border-t border-paper/10 ${className}`} />
)

/** Standard editorial page gutter. */
export const Wrap = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={`mx-auto w-full max-w-editorial px-5 sm:px-8 lg:px-12 ${className}`}>
    {children}
  </div>
)
