import { CTA } from '@/components/CTA'
import { ContactForm } from '@/components/ContactForm'
import {
  GridField,
  Marker,
  Reveal,
  Scanline,
  SectionHeader,
  Wrap,
} from '@/components/primitives'
import { useSeo } from '@/hooks/useSeo'
import { findRoute } from '@/data/routes'

/* ============================================================
   CONTACT — section 13
   No form. Three routes to a person, and the terms of engagement.
   ============================================================ */

const openTo = [
  {
    label: 'Roles',
    body: 'Lead / Senior Technical Recruiter, recruiting operations, and talent-intelligence roles — remote or India-based.',
  },
  {
    label: 'Building',
    body: 'Recruiting-AI product work: screening engines, sourcing automation, prompt and workflow design.',
  },
  {
    label: 'Collaborations',
    body: 'Staffing teams that want their sourcing and screening workflows built rather than bought.',
  },
]

export default function Contact() {
  useSeo(findRoute('/contact')!)

  return (
    <>
      <header className="relative overflow-hidden border-b border-paper/10 pt-nav">
        <GridField />
        <Scanline />
        <Wrap className="relative py-20 sm:py-28">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <Marker>014</Marker>
              <span aria-hidden="true" className="h-px w-8 bg-acid/40" />
              <span className="meta text-paper/50">Contact</span>
            </div>
          </Reveal>

          <Reveal variant="mask" delay={1} className="mt-10">
            <h1 className="font-display text-fluid-display font-light tracking-display text-paper">
              Start A Conversation
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-3">
            {openTo.map((item, i) => (
              <div key={item.label} className="bg-void p-7">
                <Reveal variant="fade" delay={(i % 3) as 0 | 1 | 2}>
                  <p className="meta text-acid/80">Open to — {item.label}</p>
                  <p className="mt-5 font-ui text-[0.9375rem] leading-relaxed text-paper/60">
                    {item.body}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </Wrap>
      </header>

      <section aria-labelledby="form-heading" className="border-b border-paper/10">
        <Wrap className="py-section">
          <SectionHeader
            id="form-heading"
            marker="015 / Message"
            title="Send Something Over"
            lead="Three fields. No newsletter, no qualification questions. If you would rather not use a form, the email address is right below."
          />
          <div className="mt-16">
            <ContactForm />
          </div>
        </Wrap>
      </section>

      <CTA />
    </>
  )
}
