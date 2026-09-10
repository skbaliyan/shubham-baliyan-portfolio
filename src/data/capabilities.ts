import type { SkillModule, CreedLine } from '@/types'

/* ---------- Section 09 — SYSTEM CAPABILITIES ---------- */

export const modules: SkillModule[] = [
  {
    id: 'MOD.01',
    title: 'Technical Recruiting',
    description:
      'Full-cycle US IT recruiting. W2, C2C, C2H and full-time. Sourcing, technical screening, submissions, offer negotiation and onboarding, run against VMS and ATS process rather than around it.',
  },
  {
    id: 'MOD.02',
    title: 'AI / GenAI',
    description:
      'Applying GPT-4o and Claude to recruiting work: parsing unstructured requirements, structuring candidate evidence, and producing output a recruiter can defend to a hiring manager.',
  },
  {
    id: 'MOD.03',
    title: 'Prompt Engineering',
    description:
      'Prompts constrained to structured output with required rationale fields. Designed so a wrong answer is visible rather than plausible.',
  },
  {
    id: 'MOD.04',
    title: 'AI Automation',
    description:
      'Chained tooling across collection, enrichment, qualification and outreach. Automating translation steps and stopping at the point where judgement or compliance begins.',
  },
  {
    id: 'MOD.05',
    title: 'AI Agents',
    description:
      'Agent and retrieval patterns tested against real recruiting documents, kept only where they beat a fixed pipeline on a real requirement.',
  },
  {
    id: 'MOD.06',
    title: 'Talent Intelligence',
    description:
      'Reading a market before working it: where the skills sit, what a requirement really demands, and which requisitions are fillable as written.',
  },
  {
    id: 'MOD.07',
    title: 'Data / Cloud',
    description:
      'Recruited across Cloud (AWS, Azure), Data Engineering, DevOps, Cybersecurity, Salesforce, AI/ML and Full Stack. Enough depth to screen the work, not just the keywords.',
  },
  {
    id: 'MOD.08',
    title: 'Product Building',
    description:
      'Taking a recruiting problem to a shipped tool: scope, constraints, architecture, the approval gates, and the decision about what to deliberately not automate.',
  },
]

/* ---------- Section 10 — THE CREED ---------- */

export const creed: CreedLine[] = [
  { number: '01', text: 'Build with purpose' },
  { number: '02', text: 'Use AI practically' },
  { number: '03', text: 'Automate the repetitive' },
  { number: '04', text: 'Keep humans in control' },
  { number: '05', text: 'Show the work' },
  { number: '06', text: 'Learn by building' },
  { number: '07', text: 'Question the standard' },
]
