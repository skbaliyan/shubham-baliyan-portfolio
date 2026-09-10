import { Navigate, useParams } from 'react-router-dom'
import { getProject, getProjectNeighbours } from '@/data/projects'
import { CaseStudy } from '@/components/CaseStudy'
import { useSeo } from '@/hooks/useSeo'
import { findRoute, staticRoutes } from '@/data/routes'

/* Dynamic case study route — /work/:slug */

export default function CaseStudyPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const { prev, next } = getProjectNeighbours(slug)

  // Same manifest the build-time prerender reads, so the head a crawler
  // gets and the head the client sets are identical.
  useSeo(findRoute(`/work/${slug}`) ?? staticRoutes[1])

  if (!project) return <Navigate to="/work" replace />

  return (
    <div className="pt-nav">
      <CaseStudy project={project} prev={prev} next={next} />
    </div>
  )
}
