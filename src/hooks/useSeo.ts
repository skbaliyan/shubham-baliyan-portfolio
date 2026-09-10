import { useEffect } from 'react'

/* ============================================================
   SEO — section 22
   Per-route title, description, canonical and social metadata.
   Case study routes get their own, derived from project data.
   ============================================================ */

const ORIGIN = 'https://shubhambaliyan.com'

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export interface SeoInput {
  title: string
  description: string
  path: string
}

export const useSeo = ({ title, description, path }: SeoInput) => {
  useEffect(() => {
    const url = `${ORIGIN}${path}`

    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setLink('canonical', url)

    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }, [title, description, path])
}
