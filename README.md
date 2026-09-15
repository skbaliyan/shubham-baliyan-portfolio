# Shubham Baliyan — Portfolio & Case Studies

Brutalist-editorial portfolio and technical work archive.
Positioning: *Building practical AI-powered systems at the intersection of technical recruiting, automation, and modern AI.*

---

## Stack

| | |
|---|---|
| Framework | **Vite 5 + React 18 + TypeScript** |
| Styling | **Tailwind CSS 3.4** (design tokens in `tailwind.config.ts`) |
| Routing | **React Router 6** |
| Icons | **Lucide** |
| Fonts | **Fraunces** (display) + **Inter** (UI) via Google Fonts |
| Build output | Static — `dist/`, ~90 kB gzip total including React |

### Why Vite and not Next.js

The brief asked for Next.js. This machine runs **Node v18.16.1**; Next 14 needs ≥ 18.17 and Next 15/16 need ≥ 20.9, so Next cannot run here at all. Vite 5 supports Node 18.16 and keeps everything else the brief specified — React, TypeScript, Tailwind, Lucide, the component architecture and the typed content model.

Porting to Next later is mechanical: the `src/data`, `src/types.ts` and `src/components` layers move across untouched; only `src/pages/*` and the router in `src/App.tsx` are replaced by the App Router, and `useSeo` is replaced by `generateMetadata`.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

`npm run typecheck` runs TypeScript with no emit.

### What `build` does

1. `tsc -b` — typecheck.
2. `vite build` — bundle to `dist/`.
3. `node scripts/prerender-meta.mjs` — writes a real HTML file per route (`dist/work/careeros/index.html`, …) with that route's own title, description, canonical and social tags, plus `dist/sitemap.xml`.

Step 3 exists because this is a client-rendered SPA: without it every URL would ship the homepage's `<head>`, and a crawler or a LinkedIn/Slack unfurl on a case study would show the wrong title. The route list comes from `src/data/routes.ts`, which is also what `useSeo` reads at runtime — so the head a crawler sees and the head the browser ends up with cannot drift, and adding a project adds its prerendered page automatically.

> **Note on `npm run preview`:** `vite preview` applies its SPA fallback *before* looking for files on disk, so it shows the homepage title on every route. That is a quirk of the preview server only. Netlify, Vercel and any normal static host serve the matching file first — verified against production file-resolution semantics, where all 11 routes return their own title.

---

## Deploying

The build is a static SPA. Client-side routes need a catch-all rewrite so a deep link like `/work/careeros` resolves.

- **Netlify** — drag `dist/` onto the dashboard, or connect the repo with build `npm run build`, publish directory `dist`. `public/_redirects` already contains the SPA rule.
- **Vercel** — `vercel.json` is included with the rewrite.
- **Anything else** — serve `dist/` with normal static resolution (exact file → `dir/index.html`) and rewrite only unmatched paths to `/index.html`.

The site URL is `https://shubham-baliyan.netlify.app`, set in four places: `index.html` (canonical, Open Graph, JSON-LD), `ORIGIN` in `src/hooks/useSeo.ts`, `ORIGIN` in `scripts/prerender-meta.mjs`, and the `Sitemap:` line in `public/robots.txt`. Moving to a custom domain means changing all four.

Netlify builds with Node 22, pinned in `netlify.toml`. Local development still works on Node 18.

---

## Adding a project

Everything on the site is rendered from typed data. **Adding a project means appending one object to `src/data/projects.ts` — no UI file changes.** The grid, the archive filters, the case study page, the SEO metadata and the prev/next navigation all read from it.

```ts
{
  slug, number, title, category, description, year, status,
  technologies, thumbnail,          // thumbnail keys a generated SVG, not an image file
  contentStatus, tagline,
  overview, problem, context, approach, process,
  aiLayer, architecture, build, outcome, lessons, nextSteps,
  links,
}
```

The full shape is documented in `src/types.ts`.

Other content lives in:

| File | Holds |
|---|---|
| `src/data/site.ts` | name, positioning, build metadata, social links, nav |
| `src/data/projects.ts` | projects + case studies |
| `src/data/capabilities.ts` | capability modules, the creed |
| `src/data/about.ts` | timeline, experience, recruiting record, skill sets |
| `src/data/articles.ts` | insights and their publication stage |
| `src/data/routes.ts` | the URL + metadata manifest (runtime SEO and build-time prerender) |
| `src/data/site.ts` → `resume` | résumé file, filename and format label |

---

## The authenticity rule

The brief forbids fabricated clients, metrics, results or screenshots. That is enforced in the data model rather than left to discipline:

- Every case-study block carries a `ContentStatus` of `documented` | `partial` | `placeholder`.
- `placeholder` renders a visible acid-outlined **"PLACEHOLDER — CONTENT PENDING"** block stating that nothing in it is a claim. It never renders as finished copy, and an unwritten section never silently disappears.
- `partial` renders a quiet "drawn from build notes" annotation.
- `outcome.kind` is `qualitative` wherever nothing has been measured, and `outcome.note` says so in plain language.
- Insights carry a `stage` (`PUBLISHED` / `IN DRAFT` / `PLANNED`). A "Read article" link is rendered **only** when a real `href` exists; everything else shows its stage instead.
- Project previews are SVGs generated in `src/components/ProjectVisual.tsx` — schematic diagrams of each system, not mocked-up product screenshots.

### Where content currently stands

| Project | Case study |
|---|---|
| TechXcelerate OS | Documented — HireOS Gate→Fit→Submit, The Juicer, Candidate Pool Finder |
| CareerOS | Documented — from the project's own README (phases 0–2 complete) |
| AI Recruitment Workflows | Documented — Apify → Clay → GPT-4o → Smartlead |
| AI Agents / RAG Systems | Partial — experiment log; individual write-ups pending |
| Baliyan Labs | Partial — practice described; individual builds pending |
| **LeadXelerate** | **Placeholder — needs your input.** Only the one-line description is real. |

The figures on the About page (90% offer-to-acceptance, 20–25% faster time-to-fill, 70% redeployment, 100% documentation compliance) come from the recruiting record and are labelled as belonging to the recruiting practice, **not** to any tool on this site.

---

## Interactive pieces

### Particle drift (hero)
`src/components/ParticleField.tsx` — canvas, no library. Stays on-palette: white at 7–19% alpha with ~18% acid particles, sitting *under* the 40px grid so the grid still reads as the top layer. It stops when the hero scrolls off screen, stops when the tab is hidden, and renders one static frame (no `requestAnimationFrame` at all) under `prefers-reduced-motion`.

### Card swap (portfolio preview)
`src/components/CardSwap.tsx` — four cards, front one full size, the rest stacked and offset. Advances every 5.2s; hover or focus expands the front card to reveal its stack.

Auto-advancing carousels are the easiest way to fail an accessibility review, so it is fenced in:

- pauses on hover, on `focus-within`, when the tab is hidden, and when the deck is off screen
- **never starts** under `prefers-reduced-motion` — and the hover-reveal detail is shown permanently instead
- explicit previous / next / pause buttons, plus a numbered button per project
- cards behind the front one are `aria-hidden` with `tabIndex={-1}` links, so keyboard users never land on an invisible link
- an `aria-live` region announces the current card
- the stack reserves its own room via `--swap-offset` (13/20/26px by breakpoint), so the deepest card lands on the container edge instead of off the side of a phone

The full editorial project grid still lives on **`/work`** — the homepage shows the swap deck as a preview and links through to the archive.

### Contact form
`src/components/ContactForm.tsx` — name, email, message. Client-side validation with `aria-invalid`, `aria-describedby`, focus moved to the first bad field, and an `aria-live` status region.

**It is wired for Netlify Forms.** The React form posts url-encoded to `/` with a `form-name` field; a matching static form in `index.html` exists purely so Netlify's build-time crawler can detect it (it cannot see a React-rendered form). A honeypot field catches bots.

It never claims to have sent something it did not. In development it goes straight to the fallback, because a dev server answers `POST /` with 200 and the HTML shell — trusting that status would show "message sent" when nothing was. The fallback hands over a `mailto:` with the message already composed, so nothing the visitor typed is lost. Once deployed to Netlify with form detection on, the real path runs.

If you deploy somewhere without form handling, delete the form section from `src/pages/Contact.tsx` — the direct email / LinkedIn / GitHub routes in the CTA already cover contact on their own.

---

## Accessibility

- Semantic landmarks, one `<h1>` per route, ordered headings.
- Skip-to-content link; visible acid focus ring on every interactive element.
- Split display headings carry `aria-label` so their accessible name reads as a sentence.
- Mobile menu: `aria-expanded`, `aria-controls`, Escape to close, scroll lock.
- Archive filters are real buttons with `aria-pressed` and an `aria-live` result count.
- All body text meets WCAG AA (verified in-browser: 0 failures across every route). Display stroke text sits at 3.66:1, which passes AA for large text.
- Form fields have real labels, `aria-invalid`, `aria-describedby`, focus management and an `aria-live` status.
- `prefers-reduced-motion: reduce` disables scanlines, reveal transitions, the pulsing dot, the chevron, the status-bar rule, the particle animation and the card-swap auto-advance, and forces all revealed content visible.

## Performance

- No animation library. Reveals use **one** shared `IntersectionObserver` that unobserves each element as it fires.
- Route-level code splitting; only the landing page is in the initial bundle.
- Fonts: preconnect + a single stylesheet with `display=swap`, weight ranges only.
- No raster images anywhere — the favicon, OG image and all six project previews are SVG.
- The particle canvas is the only `requestAnimationFrame` loop on the site, and it halts whenever the hero is off screen or the tab is hidden.

## Known constraints

- The OG image is an SVG. Most platforms render it; if a specific one does not, export `public/og.svg` to a 1200×630 PNG and point the meta tags at it.
- **The résumé is served as `.docx`**, copied from `Co_Work/`. No docx→PDF converter was available on this machine. To switch: drop a PDF in `public/` and change `resume.href` / `resume.format` in `src/data/site.ts`. Nothing else needs touching.
- **The résumé contains a phone number.** Publishing it puts that number on a public URL that anyone can fetch. If that is not intended, use a PDF with contact details trimmed.
