import { Link } from 'react-router-dom'
import { Hero } from '@/components/Hero'
import { StatusBar } from '@/components/StatusBar'
import { Intro } from '@/components/Intro'
import { Capabilities } from '@/components/Capabilities'
import { Creed } from '@/components/Creed'
import { CTA } from '@/components/CTA'
import { CardSwap } from '@/components/CardSwap'
import { SectionHeader, Wrap } from '@/components/primitives'
import { projects } from '@/data/projects'
import { useSeo } from '@/hooks/useSeo'
import { findRoute } from '@/data/routes'

export default function Home() {
  useSeo(findRoute('/')!)

  return (
    <>
      <Hero />
      <StatusBar />
      <Intro />

      <section
        id="work"
        aria-labelledby="work-heading"
        className="relative border-t border-paper/10"
      >
        <Wrap className="py-section">
          <SectionHeader
            id="work-heading"
            marker="002 / Systems Built"
            title="Selected Work"
            lead="Six systems, in the order they were built. Each one has a full case study: the problem, the approach, the architecture, what failed, and what would be built next."
          />
          <div className="mt-16 sm:mt-20">
            <CardSwap projects={projects} />
          </div>
          <p className="mt-10">
            <Link
              to="/work"
              className="link-rule meta text-paper/60 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
            >
              View the full archive
            </Link>
          </p>
        </Wrap>
      </section>

      <Capabilities />
      <Creed />
      <CTA />
    </>
  )
}
