import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import { ProjectVisual } from '@/components/ProjectVisual'
import { Reveal } from '@/components/primitives'

/* ============================================================
   PROJECT CARD — section 07
   An artefact in an archive, not a SaaS card. Alternating
   asymmetry: odd entries lead with the visual, even with the text.
   The whole row is one link; hover state lives on the group.
   ============================================================ */

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project
  index: number
}) => {
  const flipped = index % 2 === 1

  return (
    <Reveal variant="fade" delay={(index % 3) as 0 | 1 | 2}>
      <article className="border-t border-paper/10">
        <Link
          to={`/work/${project.slug}`}
          aria-label={`${project.title} — view case study`}
          className="group grid gap-8 py-10 transition-colors duration-700 ease-editorial hover:bg-paper/[0.02] focus-visible:bg-paper/[0.02] sm:py-14 lg:grid-cols-12 lg:gap-10"
        >
          {/* Number + category rail */}
          <div className="min-w-0 lg:col-span-2">
            <p className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extralight leading-none tracking-display text-paper/45 transition-colors duration-700 ease-editorial group-hover:text-acid">
              {project.number}
            </p>
            <p className="mt-4 meta text-paper/55">{project.category}</p>
          </div>

          {/* Title + description */}
          <div
            className={`min-w-0 lg:col-span-5 ${flipped ? 'lg:order-last' : ''} flex flex-col justify-between gap-6`}
          >
            <div>
              <h3 className="font-display text-[clamp(1.9rem,4.4vw,3.25rem)] font-light leading-[0.95] tracking-display text-paper transition-colors duration-700 ease-editorial group-hover:text-acid">
                {project.title}
              </h3>
              <p className="mt-5 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/55">
                {project.description}
              </p>
            </div>

            <div>
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="meta border border-paper/15 px-2.5 py-1.5 text-paper/55"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-7 inline-flex items-center gap-2 meta text-paper/70 transition-colors duration-500 ease-editorial group-hover:text-acid">
                View Case Study
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="min-w-0 lg:col-span-5">
            <div className="relative aspect-[16/10] border border-paper/10 transition-colors duration-700 ease-editorial group-hover:border-acid/40">
              <ProjectVisual variant={project.thumbnail} className="h-full w-full" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-paper/10 bg-void/70 px-4 py-3 backdrop-blur-sm">
                <span className="meta text-paper/55">{project.year}</span>
                <span className="meta text-acid">{project.status}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  )
}

export const ProjectGrid = ({ projects }: { projects: Project[] }) => (
  <div className="border-b border-paper/10">
    {projects.map((project, i) => (
      <ProjectCard key={project.slug} project={project} index={i} />
    ))}
  </div>
)
