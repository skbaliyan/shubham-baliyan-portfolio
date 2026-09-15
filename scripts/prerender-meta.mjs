/* ============================================================
   BUILD STEP — per-route <head> + sitemap

   This is a client-rendered SPA, so without this step every URL
   would ship the same <title> and description and a crawler (or
   a LinkedIn / Slack link unfurl) would see the homepage's
   metadata on a case study.

   Here we emit a real HTML file per route — dist/work/careeros/
   index.html and so on — identical to dist/index.html except for
   the title, description, canonical and social tags. The app
   still boots and takes over client-side; only the head a
   crawler reads without running JS is different.

   The route list is imported from src/data/routes.ts (via
   esbuild) so it stays in step with the project data. Adding a
   project adds its page here automatically.
   ============================================================ */

import { build } from 'esbuild'
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const DIST = join(ROOT, 'dist')
const ORIGIN = 'https://shubham-baliyan.netlify.app'

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Transpile the TS route manifest to a temp ESM bundle and import it. */
async function loadRoutes() {
  const tmp = join(ROOT, 'node_modules', '.cache', 'routes.manifest.mjs')
  await mkdir(dirname(tmp), { recursive: true })
  await build({
    entryPoints: [join(ROOT, 'src/data/routes.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tmp,
    logLevel: 'silent',
    alias: { '@': resolve(ROOT, 'src') },
  })
  const mod = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`)
  await rm(tmp, { force: true })
  return mod.allRoutes
}

/** Replace a tag's content/href in the shipped index.html. */
const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`prerender-meta: expected tag not found -> ${pattern}`)
  }
  return html.replace(pattern, replacement)
}

function renderHead(template, route) {
  const url = `${ORIGIN}${route.path === '/' ? '/' : route.path}`
  const title = escapeHtml(route.title)
  const desc = escapeHtml(route.description)

  let html = template
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  html = setTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/?>/,
    `<meta name="description" content="${desc}" />`,
  )
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(
    html,
    /<meta property="og:title"[\s\S]*?\/?>/,
    `<meta property="og:title" content="${title}" />`,
  )
  html = setTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/?>/,
    `<meta property="og:description" content="${desc}" />`,
  )
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(
    html,
    /<meta name="twitter:title"[\s\S]*?\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  )
  html = setTag(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/?>/,
    `<meta name="twitter:description" content="${desc}" />`,
  )
  return html
}

const sitemap = (routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8')
  const routes = await loadRoutes()

  let written = 0
  for (const route of routes) {
    const html = renderHead(template, route)
    if (route.path === '/') {
      await writeFile(join(DIST, 'index.html'), html, 'utf8')
    } else {
      const dir = join(DIST, route.path)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, 'index.html'), html, 'utf8')
    }
    written += 1
  }

  await writeFile(join(DIST, 'sitemap.xml'), sitemap(routes), 'utf8')
  console.log(`prerender-meta: ${written} routes + sitemap.xml`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
