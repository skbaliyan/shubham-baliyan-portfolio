import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/types'
import { getProject } from '@/data/projects'
import { Reveal } from '@/components/primitives'

/* ============================================================
   ARTICLE CARD — section 12

   A "Read article" affordance appears only when the piece
   actually exists. Everything else shows its real stage, so a
   planned essay never masquerades as a published one.

   The related-project link sits outside the card's own anchor —
   links never nest.
   ============================================================ */

const stageStyles: Record<Article['stage'], string> = {
  PUBLISHED: 'text-acid border-acid/50',
  'IN DRAFT': 'text-paper/60 border-paper/25',
  PLANNED: 'text-paper/55 border-paper/15',
}

const CardBody = ({ article, isLive }: { article: Article; isLive: boolean }) => (
  <>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="meta text-paper/55">{article.date}</span>
      <span aria-hidden="true" className="h-px w-6 bg-paper/20" />
      <span className="meta text-paper/55">{article.category}</span>
      <span className={`meta ml-auto border px-2.5 py-1.5 ${stageStyles[article.stage]}`}>
        {article.stage}
      </span>
    </div>

    <h3
      className={`mt-7 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.05] tracking-display-sm text-paper ${
        isLive ? 'transition-colors duration-700 ease-editorial group-hover:text-acid' : ''
      }`}
    >
      {article.title}
    </h3>

    <p className="mt-5 max-w-measure font-ui text-[0.9375rem] leading-relaxed text-paper/50">
      {article.description}
    </p>

    <p className="mt-8">
      {isLive ? (
        <span className="inline-flex items-center gap-2 meta text-paper/70 transition-colors duration-500 ease-editorial group-hover:text-acid">
          Read Article
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={2}
            className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      ) : (
        <span className="meta text-paper/55">Not published yet</span>
      )}
    </p>
  </>
)

export const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const related = article.relatedProject ? getProject(article.relatedProject) : undefined
  const isLive = Boolean(article.href)

  return (
    <Reveal variant="fade" delay={(index % 3) as 0 | 1 | 2}>
      <article className="border-t border-paper/10 py-10 sm:py-12">
        {isLive ? (
          <a
            href={article.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group block transition-colors duration-700 ease-editorial hover:opacity-90 focus-visible:opacity-90"
          >
            <CardBody article={article} isLive />
          </a>
        ) : (
          <CardBody article={article} isLive={false} />
        )}

        {related ? (
          <p className="mt-5">
            <Link
              to={`/work/${related.slug}`}
              className="link-rule meta text-paper/55 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
            >
              Feeds &rarr; {related.title}
            </Link>
          </p>
        ) : null}
      </article>
    </Reveal>
  )
}
