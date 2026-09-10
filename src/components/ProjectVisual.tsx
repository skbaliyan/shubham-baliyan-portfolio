import type { Project } from '@/types'

/* ============================================================
   PROJECT VISUALS
   Generated, not photographed. Every project preview is drawn
   here from primitives, which means: nothing to lazy-load,
   nothing to break, no invented product screenshots (section 24),
   and it stays crisp at any size.
   ============================================================ */

const HAIR = 'rgba(255,255,255,0.16)'
const FILL = 'rgba(255,255,255,0.05)'
const ACID = '#DFFF00'

type Variant = Project['thumbnail']

const Frame = ({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) => (
  <svg
    viewBox="0 0 400 260"
    role="img"
    aria-label={label}
    preserveAspectRatio="xMidYMid meet"
    className="h-full w-full"
  >
    <rect x="0" y="0" width="400" height="260" fill="none" />
    {children}
  </svg>
)

/* 01 — Gate → Fit → Submit: each stage narrower than the last. */
const OsVisual = () => (
  <>
    {[0, 1, 2, 3].map((i) => {
      const inset = i * 26
      const w = 300 - inset * 2
      return (
        <rect
          key={i}
          x={50 + inset}
          y={40 + i * 44}
          width={w}
          height="30"
          fill={i === 1 ? 'rgba(223,255,0,0.12)' : FILL}
          stroke={i === 1 ? ACID : HAIR}
          strokeWidth="1"
        />
      )
    })}
    {[0, 1, 2].map((i) => (
      <line
        key={i}
        x1="200"
        y1={70 + i * 44}
        x2="200"
        y2={84 + i * 44}
        stroke={HAIR}
        strokeWidth="1"
      />
    ))}
  </>
)

/* 02 — Signal chain: collected nodes narrowing to a qualified few. */
const PipelineVisual = () => (
  <>
    {Array.from({ length: 5 }, (_, col) =>
      Array.from({ length: 5 - col }, (_, row) => (
        <rect
          key={`${col}-${row}`}
          x={54 + col * 62}
          y={62 + row * 28 + col * 14}
          width="44"
          height="16"
          fill={col === 4 ? 'rgba(223,255,0,0.16)' : FILL}
          stroke={col === 4 ? ACID : HAIR}
          strokeWidth="1"
        />
      )),
    )}
    <line x1="40" y1="215" x2="360" y2="215" stroke={HAIR} strokeWidth="1" />
    <line x1="330" y1="215" x2="360" y2="215" stroke={ACID} strokeWidth="2" />
  </>
)

/* 03 — Approval gate between preparation and export. */
const CareerVisual = () => (
  <>
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={44 + i * 6}
        y={54 + i * 8}
        width="120"
        height="150"
        fill={FILL}
        stroke={HAIR}
        strokeWidth="1"
      />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <line
        key={i}
        x1="70"
        y1={92 + i * 22}
        x2={150 - (i % 2) * 30}
        y2={92 + i * 22}
        stroke={HAIR}
        strokeWidth="1"
      />
    ))}
    {/* the gate */}
    <line x1="212" y1="34" x2="212" y2="226" stroke={ACID} strokeWidth="2" strokeDasharray="6 8" />
    <rect x="250" y="70" width="110" height="120" fill={FILL} stroke={HAIR} strokeWidth="1" />
    <rect x="250" y="70" width="110" height="18" fill="rgba(223,255,0,0.14)" stroke={ACID} strokeWidth="1" />
  </>
)

/* 04 — Linear chain of specialised tools. */
const WorkflowVisual = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect
          x={38 + i * 84}
          y={104}
          width="60"
          height="52"
          fill={i === 2 ? 'rgba(223,255,0,0.12)' : FILL}
          stroke={i === 2 ? ACID : HAIR}
          strokeWidth="1"
        />
        {i < 3 ? (
          <line
            x1={98 + i * 84}
            y1="130"
            x2={122 + i * 84}
            y2="130"
            stroke={HAIR}
            strokeWidth="1"
          />
        ) : null}
      </g>
    ))}
    <line x1="38" y1="70" x2="362" y2="70" stroke={HAIR} strokeWidth="1" />
    <line x1="38" y1="190" x2="362" y2="190" stroke={HAIR} strokeWidth="1" />
  </>
)

/* 05 — Experiments: many attempts, few promoted. */
const AgentsVisual = () => {
  const pts = [
    [200, 130],
    [122, 84],
    [278, 84],
    [104, 172],
    [296, 172],
    [200, 54],
    [200, 208],
  ] as const
  return (
    <>
      {pts.slice(1).map(([x, y], i) => (
        <line key={i} x1="200" y1="130" x2={x} y2={y} stroke={HAIR} strokeWidth="1" />
      ))}
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 16 : 9}
          fill={i === 0 ? 'rgba(223,255,0,0.14)' : FILL}
          stroke={i === 0 || i === 2 ? ACID : HAIR}
          strokeWidth="1"
        />
      ))}
    </>
  )
}

/* 06 — Learning surface: a field of attempts, one that landed. */
const LabsVisual = () => (
  <>
    {Array.from({ length: 7 }, (_, r) =>
      Array.from({ length: 11 }, (_, c) => {
        const on = r === 3 && c === 7
        return (
          <rect
            key={`${r}-${c}`}
            x={40 + c * 30}
            y={50 + r * 24}
            width="18"
            height="12"
            fill={on ? ACID : FILL}
            stroke={on ? ACID : HAIR}
            strokeWidth="1"
          />
        )
      }),
    )}
  </>
)

const VARIANTS: Record<Variant, () => JSX.Element> = {
  os: OsVisual,
  pipeline: PipelineVisual,
  career: CareerVisual,
  workflow: WorkflowVisual,
  agents: AgentsVisual,
  labs: LabsVisual,
}

const LABELS: Record<Variant, string> = {
  os: 'Diagram: a four-stage screening pipeline, each stage narrower than the one above it.',
  pipeline: 'Diagram: a wide set of collected records narrowing to a small qualified set.',
  career: 'Diagram: a document stack separated from its export by a dashed approval gate.',
  workflow: 'Diagram: four chained tools passing a record left to right.',
  agents: 'Diagram: a central node connected to six experiments, two of them highlighted.',
  labs: 'Diagram: a grid of small attempts with a single filled cell.',
}

export const ProjectVisual = ({
  variant,
  className = '',
}: {
  variant: Variant
  className?: string
}) => {
  const Shape = VARIANTS[variant]
  return (
    <div className={`relative overflow-hidden bg-paper/[0.02] ${className}`}>
      <div className="grid-field absolute inset-0" aria-hidden="true" />
      <div className="relative h-full w-full p-2">
        <Frame label={LABELS[variant]}>
          <Shape />
        </Frame>
      </div>
    </div>
  )
}
