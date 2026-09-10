import type { Article } from '@/types'

/* ============================================================
   SIGNALS / INSIGHTS — section 12

   AUTHENTICITY (section 24): nothing here is presented as a
   published essay unless it actually exists. Each entry carries
   an explicit `stage`, and a "Read article" link is rendered
   only when `href` is set. Entries without an href render their
   stage instead — planned work, labelled as planned work.

   The chain this section is built around:
   LINKEDIN POST -> INSIGHT -> PROJECT -> CASE STUDY
   ============================================================ */

export const articles: Article[] = [
  {
    slug: 'ai-in-recruitment-series',
    date: 'AUG 2026',
    category: 'AI / Technical Recruiting',
    title: 'AI in Recruitment — the LinkedIn series',
    description:
      'An ongoing public series on where AI actually helps a recruiting desk and where it quietly makes things worse. Published on LinkedIn; the long-form insights behind each post are being written.',
    stage: 'PUBLISHED',
    href: 'https://www.linkedin.com/in/shubham-baliyan-techx/recent-activity/all/',
    relatedProject: 'baliyan-labs',
  },
  {
    slug: 'gates-before-scores',
    date: 'SCHEDULED',
    category: 'AI Agents / Technical Recruiting',
    title: 'Gates before scores: why compliance should never be a weight',
    description:
      'The design argument behind HireOS. What breaks when work authorisation is treated as one factor among many, and what changes once eligibility is a hard boolean that runs first.',
    stage: 'IN DRAFT',
    relatedProject: 'techxcelerate-os',
  },
  {
    slug: 'the-tool-that-cannot-write',
    date: 'SCHEDULED',
    category: 'GenAI / Building With AI',
    title: 'The tool that cannot write a sentence',
    description:
      'CareerOS removes prose generation entirely rather than constraining it. A note on the difference between a rule stated in a prompt and a rule enforced by the absence of a code path.',
    stage: 'IN DRAFT',
    relatedProject: 'careeros',
  },
  {
    slug: 'translation-vs-evaluation',
    date: 'SCHEDULED',
    category: 'Automation / Future of Work',
    title: 'Translation is automatable. Evaluation is not.',
    description:
      'The line I use to decide what a recruiting workflow is allowed to do on its own — and why a sourcing pipeline should be judged by the list it refuses to send to.',
    stage: 'PLANNED',
    relatedProject: 'ai-recruitment-workflows',
  },
  {
    slug: 'rag-on-recruiting-documents',
    date: 'SCHEDULED',
    category: 'AI / Data',
    title: 'RAG on documents that are trying to sell you something',
    description:
      'Resumes and job descriptions are marketing documents. Notes on what that does to retrieval quality, and which agent patterns survive it.',
    stage: 'PLANNED',
    relatedProject: 'ai-agents-rag-systems',
  },
  {
    slug: 'recruiter-to-builder',
    date: 'SCHEDULED',
    category: 'Career / Future of Work',
    title: 'From working the desk to building the desk',
    description:
      'What transfers from six years of US technical recruiting into building recruiting software, and what turns out to be a liability.',
    stage: 'PLANNED',
    relatedProject: 'baliyan-labs',
  },
]

export const insightTopics = [
  'AI',
  'GenAI',
  'AI Agents',
  'Technical Recruiting',
  'Automation',
  'Data',
  'Cloud',
  'Career',
  'Future of Work',
  'Building with AI',
]

export const contentChain = [
  { id: '01', label: 'LinkedIn post', body: 'A short public observation from the recruiting desk.' },
  { id: '02', label: 'Insight', body: 'The longer written version, with the reasoning included.' },
  { id: '03', label: 'Project', body: 'Something built to test whether the insight holds.' },
  { id: '04', label: 'Case study', body: 'The full write-up on this site — failures included.' },
]
