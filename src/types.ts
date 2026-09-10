/* ============================================================
   CONTENT ARCHITECTURE — section 25
   Every page is rendered from these shapes. Adding a project
   means adding one object to src/data/projects.ts. No UI edits.
   ============================================================ */

/** How much verified source material exists behind a block of copy.
 *  `placeholder` is rendered with a visible marker — never dressed up
 *  as a finished claim (authenticity rule, section 24). */
export type ContentStatus = 'documented' | 'partial' | 'placeholder'

export type ProjectStatus = 'LIVE' | 'IN BUILD' | 'PROTOTYPE' | 'ONGOING' | 'RESEARCH'

export interface Labeled {
  label: string
  body: string
}

export interface ProcessStep {
  step: string
  title: string
  body: string
}

export interface ArchitectureNode {
  id: string
  label: string
  detail: string
}

export interface Architecture {
  summary: string
  /** Ordered stages of the system, rendered as a flow diagram. */
  nodes: ArchitectureNode[]
  /** Notes on how the stages relate — constraints, guarantees, boundaries. */
  notes: string[]
  status: ContentStatus
}

export interface AiLayer {
  body: string
  /** Only technologies genuinely used on this project (section 08). */
  stack: string[]
  uses: Labeled[]
  status: ContentStatus
}

export interface OutcomeItem {
  label: string
  /** Present only where a real figure exists. Absent = qualitative. */
  value?: string
  body: string
}

export interface Outcome {
  kind: 'quantified' | 'qualitative'
  items: OutcomeItem[]
  status: ContentStatus
  /** Shown verbatim when metrics are deliberately not claimed. */
  note?: string
}

export interface Lessons {
  worked: string[]
  failed: string[]
  changed: string[]
  learned: string[]
  status: ContentStatus
}

export interface BuildArtifact {
  kind: 'code' | 'workflow' | 'decision' | 'interface'
  title: string
  caption: string
  /** Verbatim source, shown in a mono block. Only real snippets. */
  code?: string
  language?: string
  /** Ordered UI / workflow states, described rather than mocked up. */
  steps?: string[]
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  /* --- index card --- */
  slug: string
  number: string
  title: string
  category: string
  description: string
  year: string
  status: ProjectStatus
  technologies: string[]
  /** Key for the generated SVG preview — no bitmap thumbnails, nothing to break. */
  thumbnail: 'os' | 'pipeline' | 'career' | 'workflow' | 'agents' | 'labs'
  /* --- case study --- */
  contentStatus: ContentStatus
  tagline: string
  overview: string[]
  problem: string[]
  context: Labeled[]
  approach: Labeled[]
  process: ProcessStep[]
  aiLayer: AiLayer
  architecture: Architecture
  build: BuildArtifact[]
  outcome: Outcome
  lessons: Lessons
  nextSteps: string[]
  links?: ProjectLink[]
}

export interface SkillModule {
  id: string
  title: string
  description: string
}

export interface Article {
  slug: string
  date: string
  category: string
  title: string
  description: string
  /** Where this sits in the LinkedIn → insight → project → case study chain. */
  stage: 'PUBLISHED' | 'IN DRAFT' | 'PLANNED'
  /** Set only when a real destination exists. */
  href?: string
  /** Project this insight feeds into, if any. */
  relatedProject?: string
}

export interface TimelineStage {
  id: string
  label: string
  window: string
  body: string
}

export interface ExperienceRole {
  company: string
  role: string
  period: string
  location: string
  clients?: string
  points: string[]
}

export interface CreedLine {
  number: string
  text: string
}

export interface SocialLink {
  label: string
  href: string
  handle: string
}
