import { AcidLink, GridField, Marker, Reveal, Scanline, Wrap } from '@/components/primitives'
import { useSeo } from '@/hooks/useSeo'

export default function NotFound() {
  useSeo({
    title: 'Not Found | Shubham Baliyan',
    description: 'That route does not exist.',
    path: '/404',
  })

  return (
    <section className="relative overflow-hidden pt-nav">
      <GridField />
      <Scanline />
      <Wrap className="relative flex min-h-[70vh] flex-col justify-center py-24">
        <Reveal variant="fade">
          <Marker>Error / 404</Marker>
        </Reveal>
        <Reveal variant="mask" delay={1} className="mt-8">
          <h1 className="font-display text-fluid-display font-light tracking-display text-stroke">
            No Signal
          </h1>
        </Reveal>
        <Reveal variant="fade" delay={2}>
          <p className="mt-10 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
            That route does not exist. The archive is the best place to start.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={3}>
          <div className="mt-10 flex flex-wrap gap-4">
            <AcidLink to="/work">View The Archive</AcidLink>
            <AcidLink to="/" variant="ghost">
              Home
            </AcidLink>
          </div>
        </Reveal>
      </Wrap>
    </section>
  )
}
