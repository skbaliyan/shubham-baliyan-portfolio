import { projects } from '@/data/projects'

/* ============================================================
   ROUTE MANIFEST
   One source of truth for every URL and its metadata. Used by
   `useSeo` at runtime and by `scripts/prerender-meta.mjs` at
   build time, so the <head> a crawler sees matches the <head>
   the browser ends up with.
   ============================================================ */

export interface RouteMeta {
  path: string
  title: string
  description: string
  changefreq: 'weekly' | 'monthly'
  priority: string
}

export const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Shubham Baliyan | Technical Recruiter, AI Builder & Prompt Engineer',
    description:
      'Portfolio of Shubham Baliyan, a Lead Technical Recruiter and AI Builder focused on technical recruiting, GenAI, AI automation, prompt engineering, and AI-powered systems.',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/work',
    title: 'Work & Case Studies | Shubham Baliyan',
    description:
      'The full archive of systems built by Shubham Baliyan — recruiting operating systems, AI sourcing workflows, career intelligence tooling, agent and RAG experiments.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/about',
    title: 'About | Shubham Baliyan — Technical Recruiter & AI Builder',
    description:
      'Six-plus years in US technical recruiting across software, data, cloud, DevOps and AI/ML — now building AI-powered recruiting systems, workflows and products.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/insights',
    title: 'Signals & Insights | Shubham Baliyan',
    description:
      'Writing on AI, GenAI, AI agents, technical recruiting, automation and the future of work — from a recruiter building the tools.',
    changefreq: 'weekly',
    priority: '0.7',
  },
  {
    path: '/contact',
    title: 'Contact | Shubham Baliyan',
    description:
      'Get in touch with Shubham Baliyan — Lead Technical Recruiter, AI Builder and Prompt Engineer. Available for remote opportunities.',
    changefreq: 'monthly',
    priority: '0.7',
  },
]

export const caseStudyRoutes: RouteMeta[] = projects.map((p) => ({
  path: `/work/${p.slug}`,
  title: `${p.title} — Case Study | Shubham Baliyan`,
  description: `${p.description} Case study covering the problem, approach, AI layer, architecture, outcome and lessons.`,
  changefreq: 'monthly' as const,
  priority: '0.8',
}))

export const allRoutes: RouteMeta[] = [...staticRoutes, ...caseStudyRoutes]

export const findRoute = (path: string): RouteMeta | undefined =>
  allRoutes.find((r) => r.path === path)
