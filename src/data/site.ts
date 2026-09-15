import type { SocialLink } from '@/types'

export const site = {
  name: 'Shubham Baliyan',
  roles: [
    'Lead Technical Recruiter',
    'AI Builder',
    'Prompt Engineer',
    'Technical Content Writer',
  ],
  positioning:
    'Building practical AI-powered systems at the intersection of technical recruiting, automation, and modern AI.',
  build: 'BUILD. 026',
  system: 'SYSTEM. TXB',
  release: 'PORTFOLIO.01',
  base: 'India / Remote',
  availability: 'AVAILABLE FOR OPPORTUNITIES',
  /* Swap this to a PDF when you have one: drop the file in `public/` and
     change href + format. Nothing else needs to change. */
  resume: {
    href: '/Shubham-Baliyan-Resume.docx',
    filename: 'Shubham-Baliyan-Resume.docx',
    format: 'DOCX',
  },
  email: 'baliyanshubham100@gmail.com',
  year: 2026,
} as const

export const socials: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:baliyanshubham100@gmail.com',
    handle: 'baliyanshubham100@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shubham-baliyan-techx',
    handle: '/in/shubham-baliyan-techx',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/skbaliyan',
    handle: '/skbaliyan',
  },
]

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Case Studies', href: '/work#case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const
