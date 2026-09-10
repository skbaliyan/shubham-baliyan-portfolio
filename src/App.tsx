import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/primitives'
import Home from '@/pages/Home'

/* Route-split everything except the landing page, so the first
   paint carries only what it needs. */
const Work = lazy(() => import('@/pages/Work'))
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'))
const About = lazy(() => import('@/pages/About'))
const Insights = lazy(() => import('@/pages/Insights'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Reset scroll on navigation — but honour an in-page hash. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center pt-nav">
    <p className="meta text-paper/55">Loading</p>
  </div>
)

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-acid focus:px-5 focus:py-3 focus:font-ui focus:text-meta-lg focus:font-bold focus:uppercase focus:tracking-meta focus:text-void"
      >
        Skip to content
      </a>

      <GrainOverlay />
      <Navigation />
      <ScrollToTop />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
