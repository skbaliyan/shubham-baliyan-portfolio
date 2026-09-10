import type { ExperienceRole, TimelineStage } from '@/types'

/* ============================================================
   ABOUT — section 11
   Roles, dates, clients and figures below are taken from
   Shubham's own record. Nothing here is estimated.
   ============================================================ */

export const timeline: TimelineStage[] = [
  {
    id: '01',
    label: 'Recruiting',
    window: '2020',
    body: 'End-to-end recruitment on US requirements, delivered through Fieldglass, Beeline and IQNavigator inside SLA. Learning the machinery of staffing from the inside.',
  },
  {
    id: '02',
    label: 'Technical Recruiting',
    window: '2022 — 2025',
    body: 'Full-cycle hiring across Cloud, Data Engineering, DevOps, Cybersecurity, Salesforce and Full Stack for direct clients. Screening the work rather than the keywords.',
  },
  {
    id: '03',
    label: 'AI-Assisted Recruiting',
    window: '2024 — 2025',
    body: 'LLM-assisted sourcing and screening applied to live requisitions. Using the models on the desk before building anything with them.',
  },
  {
    id: '04',
    label: 'AI Workflows',
    window: '2025',
    body: 'Chained tooling for enrichment, qualification and compliant outreach. The mechanical steps of sourcing turned into a pipeline.',
  },
  {
    id: '05',
    label: 'AI Systems',
    window: '2026',
    body: 'HireOS and its Gate to Fit to Submit screening model. Systems with stated constraints and explainable output, not scripts.',
  },
  {
    id: '06',
    label: 'AI Product Building',
    window: '2026 — now',
    body: 'TechXcelerate OS as a product surface. Shipped tools, approval gates, and case studies that record what failed as well as what worked.',
  },
]

export const experience: ExperienceRole[] = [
  {
    company: 'TechXcelerate OS',
    role: 'Founder & Product Lead',
    period: 'Jun 2026 — Present',
    location: 'Remote',
    clients: 'Applied-AI recruiting venture',
    points: [
      'Design and ship production recruiting-AI tools that operationalise years of US staffing experience.',
      'Built HireOS, a Gate to Fit to Submit screening engine that hard-gates eligibility before fit-scoring candidates across ten technical and functional roles.',
      'Built an automated sourcing pipeline chaining Apify, Clay, GPT-4o and Smartlead for enrichment, qualification and compliant outreach.',
      'Shipped The Juicer, a LinkedIn profile auditor on a 3P scoring framework, and a React Candidate Pool Finder that generates platform search links and Google X-Ray Boolean strings from a job description.',
    ],
  },
  {
    company: 'Voto Consulting LLC',
    role: 'Senior Technical Recruiter',
    period: 'Nov 2025 — Jun 2026',
    location: 'Jersey City, NJ (Remote)',
    clients: 'Amdocs, AT&T, Johnson & Johnson, JPMC',
    points: [
      'Led full-cycle US IT recruitment for W2, C2C and full-time roles across core IT, Data, Cloud and emerging tech.',
      'Applied LLM-assisted sourcing and screening to accelerate pipeline building for Java/.NET, Data Engineering, Cloud, DevOps and AI/ML roles.',
      'Managed the full candidate lifecycle while maintaining US hiring compliance — I-9, E-Verify, background checks, NDAs.',
    ],
  },
  {
    company: 'eSolutionsFirst',
    role: 'Lead Technical Recruiter — BFSI',
    period: 'Jan 2025 — Nov 2025',
    location: 'Reston, VA (Remote)',
    clients: 'Freddie Mac, KPMG, Blue Cross Blue Shield, CGI (Fannie Mae), Xpanse, Somatus',
    points: [
      'Reduced average time-to-fill by 25% for recurring technical positions by building proactive candidate pipelines.',
      'Led W2 contract hiring for Developers, Analysts, Architects and QA Engineers.',
      'Maintained 100% compliance in candidate documentation, ATS records and client policies.',
    ],
  },
  {
    company: 'GoodDolphin Technologies',
    role: 'Senior US IT Recruiter',
    period: 'Jan 2023 — Jan 2025',
    location: 'Remote',
    clients: 'Yahoo, Verizon Data Services',
    points: [
      'Closed niche IT roles with a 90% offer-to-acceptance rate across Full Stack, DevOps, Cloud, Data Engineering and Cybersecurity.',
      'Achieved a 70% consultant redeployment rate by nurturing long-term consultant relationships across projects.',
      'Reduced time-to-fill by 20% for critical requirements; negotiated complex W2 and C2C contracts.',
    ],
  },
  {
    company: 'BCForward',
    role: 'US IT Recruiter',
    period: 'Feb 2022 — Dec 2022',
    location: 'Indianapolis, IN (Remote)',
    clients: 'Salesforce',
    points: [
      'Ran full-cycle recruitment across Salesforce CRM, Java, Cloud, DevOps, QA, Data Engineering and Full Stack.',
      'Worked extensively in Fieldglass VMS and e-Recruit ATS.',
      'Prepared structured submission summaries to improve shortlist and interview conversion.',
    ],
  },
  {
    company: 'Synchrotech Solutions Inc.',
    role: 'US IT Recruiter',
    period: 'Oct 2020 — Aug 2021',
    location: 'Remote',
    clients: 'Wells Fargo, Vanguard, Cognizant, Mphasis, Hexaware, RSystems, Modis',
    points: [
      'Led end-to-end recruitment for Java Developers, Cloud Architects, Data Analysts and Cybersecurity specialists.',
      'Delivered through Fieldglass, Beeline and IQNavigator within SLA.',
      'Negotiated W2, C2C and 1099 engagements with a strong offer-to-join conversion ratio.',
    ],
  },
]

/** Figures stated by Shubham about his recruiting record.
 *  These belong to the recruiting practice — not to any tool on this site. */
export const recruitingRecord = [
  { value: '90%', label: 'Offer-to-acceptance', note: 'Niche IT roles, GoodDolphin Technologies' },
  { value: '20–25%', label: 'Faster time-to-fill', note: 'Recurring technical positions' },
  { value: '70%', label: 'Consultant redeployment', note: 'Long-term consultant relationships' },
  { value: '100%', label: 'Documentation compliance', note: 'Candidate records, ATS, client policy' },
]

export const recruitingCapabilities = [
  'Candidate sourcing',
  'Technical screening',
  'W2 hiring',
  'C2C',
  'C2H',
  'Full-time hiring',
  'Client coordination',
  'Talent intelligence',
  'End-to-end recruitment',
]

export const aiCapabilities = [
  'Generative AI',
  'Prompt Engineering',
  'AI Agents',
  'RAG',
  'AI Automation',
  'Python',
  'LangChain',
  'LangGraph',
  'FastAPI',
  'Cloud',
]

export const domains = [
  'Software Engineering',
  'Data Engineering',
  'Data Science',
  'Cloud',
  'DevOps',
  'AI/ML',
  'GenAI',
  'Mainframe',
  'SAP',
  'Oracle',
  'PeopleSoft',
]

export const stack = {
  ats: ['Job Diva', 'Ceipal', 'e-Recruit'],
  vms: ['Fieldglass', 'Beeline', 'IQNavigator'],
  sourcing: ['LinkedIn Recruiter', 'Dice', 'Monster', 'CareerBuilder', 'TechFetch'],
}
