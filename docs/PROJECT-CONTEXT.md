# Pernod Ricard India — "Liquid Light" — Project Context (Handoff)

Use this as the brief for a fresh build. The CEO wants the home page to feature
**3D bottles** (interactive, "liquid light through glass"). Everything below is
the current working site so you can match its design, content, and standards.

---

## 1. What this is
A corporate website redesign for **Pernod Ricard India** (not a consumer/brand
site — it does **not** sell or promote alcohol; it must comply with Indian
advertising & surrogate guidelines). Audiences: business/financial media, senior
talent, trade partners, regulators. Tone: **confident, understated, premium,
editorial, distinctly Indian without cliché.** Benchmark quality: Awwwards / Apple
/ Hermès / Diageo Global.

Design concept = **"Liquid Light"**: light held in glass. Near-black ground,
champagne/gold as the only warm accent, each spirit keyed to a restrained hue.

---

## 2. Tech stack (match this)
- **Next.js 15** (App Router, RSC, TypeScript strict), **React 19.1**
- **R3F**: `@react-three/fiber ^9`, `@react-three/drei ^10`,
  `@react-three/postprocessing ^3`, `postprocessing ^6`, `three ^0.171`
- **framer-motion ^11**
- **CSS Modules + CSS custom-property design tokens** (no Tailwind here)
- `next/image` for all imagery
- Dev/build runs on **port 3001** (`next dev -p 3001`, `next start -p 3001`)

---

## 3. Design tokens (src/styles/tokens.css) — reuse verbatim
```
--ll-bg #050506   --ll-bg-2 #0a0a0e   --ll-surface #101016
--ll-line rgba(255,255,255,.1)   --ll-line-soft rgba(255,255,255,.06)
--ll-ivory #f5f1e6   --ll-text rgba(245,241,230,.92)
--ll-text-muted rgba(245,241,230,.62)   --ll-text-faint rgba(245,241,230,.56)
--ll-gold #c9a96e   --ll-gold-light #e4d4a8
liquid hues: --ll-amber #c87a2c  --ll-clear #cfe0ea  --ll-rose #e6a6a0
             --ll-green #8fae6a  --ll-copper #b5683a
--ll-serif "Cormorant Garamond", Georgia, serif   (headlines)
--ll-sans  "Inter", system-ui, sans-serif         (body)
--ll-mono  monospace                              (eyebrow index, counts)
fluid type: --ll-text-xs..--ll-text-3xl, --ll-text-hero
--ll-gutter clamp(1.5rem,5vw,6rem)  --ll-max 1440px  --ll-section clamp(3.25rem,6vw,6.5rem)
ease: cubic-bezier(0.16,1,0.3,1)   ease-std: cubic-bezier(0.25,0,0,1)
--ll-dur 600ms  --ll-dur-slow 1000ms   (both → 0ms under prefers-reduced-motion)
--ll-radius 6px
```
Layout primitives in globals.css: `.ll-container`, `.ll-section`, `.ll-eyebrow`
(mono gold index + uppercase label), `.ll-display` (serif 300), `.ll-skip`,
`.ll-grain` (film-grain overlay on body).

---

## 4. Non-negotiable standards
- **WCAG 2.2 AA — currently 0 axe violations.** Keep it: real `<ul>/<li>` lists
  (the `Reveal` component takes an `as="li"` prop so it can BE the list item),
  AA contrast (that's why faint text is .56, not lower).
- **prefers-reduced-motion** respected on every animation (tokens zero durations;
  JS components check `useReducedMotion()` / matchMedia).
- **No em dashes** in copy — use commas. (House rule.)
- **WebGL must never blank the page** — wrap every Canvas in `WebGLGuard` with a
  CSS fallback (feature-detect + error boundary).
- Lighthouse: a11y/best-practices/SEO = 100. **Performance is ~55–72** (the gap;
  heavy hero imagery + animation). 3D will add cost — budget for it (dynamic
  import, low DPR, pause offscreen, Suspense, reduced-motion off).

---

## 5. Sitemap / routes (App Router)
```
/                         home (hero + manifesto + stats + marquee + values +
                          spirit families + featured brands + brand homes +
                          newsroom teaser + sustainability + FAQ)
/group                    who we are / what we stand for / how we operate / stats / explore
/group/our-history        scroll-driven illuminated timeline (in navbar)
/group/our-role-society   community / responsibility / water / ethics
/leadership               team (Person schema) + governance + FAQ
/operations               manufacturing / supply chain / agri-sourcing + FAQ
/brands                   corporate brand cards (clickable) + full brand wall
/brands/[slug]            per-brand detail (66 brands)
/sustainability           "Good Times from a Good Place" 2030 roadmap + FAQ
/investors                equity story + stats + reports (PDFs) + statement + FAQ
/careers                  employer pillars + functions + FAQ
/news, /news/[slug]       newsroom (6 articles, NewsArticle schema)
/contact                  audience-routed entry points (media/investors/talent/...)
/documents, /directory    reports index, full site index
sitemap.ts→/sitemap.xml, robots.ts→/robots.txt, public/llms.txt
```
Nav order: Our Group · History · Brands · Operations · Sustainability · Investors · Careers · Newsroom

---

## 6. Content & data (src/content/*) — single source of truth
- **site.ts** — `NAV`, `FOOTER_COLUMNS`, `STATS`
- **india.ts** — the corporate narrative: `INDIA_STATS`, `INDIA_BRANDS`
  (corporate framing + `slug`), `OPERATIONS`, `LEADERSHIP` (+`LEADERSHIP_AS_OF`),
  `GOVERNANCE`, `POSITIONING`, `WHAT_WE_STAND_FOR`, `HOW_WE_OPERATE`,
  `INDIA_STORY`, `ECONOMY_CONTRIBUTION`, `EMPLOYER_PILLARS`, `CAREER_AREAS`,
  `CONTACT_CHANNELS`, `INVESTOR_HIGHLIGHTS`, `SUSTAINABILITY_PILLARS/STATS/PROGRAMMES`,
  `CORPORATE_FAQS`, `OPERATIONS_FAQS`, `CAREERS_FAQS`, `INVESTOR_FAQS`
- **news.ts** — `ARTICLES` (6), `ARTICLE_BY_SLUG`, `formatDate`
- **brands-detail.ts** — `BRAND_DETAILS` (66; slug/name/category/hero/bottle/
  products[]/blocks[]), `BRAND_BY_SLUG`
- **pernod-portfolio.ts** — `PORTFOLIO` (brand name → logo)
- **pages.ts** — `PAGES` (extracted corporate copy/imagery for group, sustainability,
  investors, careers, group-history, group-role-society)
- **documents.ts** — `DOCUMENTS` (20 report PDFs in /public/documents)

### Real, sourced facts (keep these)
- Pernod Ricard India; HQ **Building 8C, DLF Cyber City, Gurugram, Haryana 122002**;
  in India **since 1993**; **second-largest** spirits company in India by revenue;
  **30+** bottling plants; distilleries at **Nashik** (+ winery) & **Behror**;
  ~**1,400** employees. Email domain **@pernod-ricard.com**.
- **Leadership:** Jean Touboul (MD & CEO), Richa Singh (CFO), Gagandeep Sethi
  (SVP Integrated Operations & S&R), Nitu Bhushan (CHRO), Kartik Mohindra (CMO),
  Prasanna Mohile (National Head, Corporate Affairs).
- **Made-in-India brands:** Royal Stag, Blenders Pride, Imperial Blue, Seagram's.
  **International:** Chivas Regal, The Glenlivet, Ballantine's, 100 Pipers,
  Jameson, Absolut, Beefeater, Jacob's Creek.
- **Sustainability:** "Good Times from a Good Place" 2030 roadmap; 4 pillars
  (Nurturing Terroir, Valuing People, Circular Making, Responsible Hosting);
  5 lakh+ people reached across 13 states + 3 UTs.

---

## 7. Components (src/components)
**site/**: Nav, Footer, PageIntro (two-column header, eyebrow+title / lede),
Reveal (fade+rise scroll-reveal, `as` prop), Faq (native `<details>`, emits
FAQPage schema), ReportCard, ContentPage, AgeGate, CookieConsent, **ScrollProgress**
(gold top bar), **ScrollGlow** (ambient drifting champagne glow), **CountUp**
(stat numbers animate in view), **Marquee** (kinetic word bands).
**sections/**: Hero, HeroLight (golden-bokeh canvas), BrandSpotlight.
**seo/jsonld.tsx**: Organization, WebSite, Person, Brand, NewsArticle, FAQPage,
Breadcrumb, WebPage builders + `<JsonLd>`.

---

## 8. The home hero TODAY (what you'll change for 3D bottles)
`src/components/sections/Hero.tsx` renders: `<HeroLight/>` (2D golden-bokeh
canvas) + `<BrandSpotlight/>` + headline **"Light, held in glass."** + sub copy +
CTAs ("Explore the brands" → /brands, "Our story" → /group/our-history) +
"Pour" scroll cue.

### 3D infra ALREADY in place to build on (src/components/3d/)
- **VesselScene.tsx** — the pattern to copy: client-only `<Canvas>` (camera,
  `dpr={[1,1.5]}`, **`frameloop` pauses when offscreen or reduced-motion via
  IntersectionObserver + matchMedia**), `EffectComposer` + `Bloom`, wrapped in
  **`WebGLGuard`** with a `VesselFallback`.
- **Vessel.tsx** — a glass form using **`MeshTransmissionMaterial`** (Drei) for
  dispersion/refraction — the right material for bottles.
- **WebGLGuard.tsx** + **Fallbacks.tsx** — resilience + CSS fallback.
- **LightField / LightFieldScene** — ambient light scene.

### For the CEO's "3D bottles on home"
- Reuse the **VesselScene → WebGLGuard → Canvas → Suspense → Bloom** pattern.
- Model bottles as **GLB models** (load with Drei `useGLTF`, put files in
  `/public/models/`) OR build lathe/cylinder geometry; use
  `MeshTransmissionMaterial` for the glass and a tinted volume for the liquid
  (amber whisky, clear gin, etc. — map to the `--ll-amber/clear/...` hues).
- Bottle/product **photography already exists** at
  `/public/images/brands/<slug>/` (e.g. `absolut/01-absolut_vodka_700ml_front…jpg`)
  — useful as labels/textures or as the 2D fallback.
- Keep it on-brand: slow, confident motion; gold rim-light; dark ground;
  optional scroll-linked rotation or a row of bottles that parallax.
- **Performance discipline:** `dynamic(() => import(...), { ssr:false })`,
  low DPR, lazy/Suspense, pause offscreen, and a static image fallback for
  reduced-motion / no-WebGL. Don't regress the (already tight) perf budget.

---

## 9. Commands & tooling
- Node is winget-installed; prepend to PATH if needed:
  `C:\Users\tshre\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_*\node-v24.16.0-win-x64`
- `npm run dev -- -H 0.0.0.0` (3001) · `npm run build` · `npm start` · `npm run typecheck`
- Audits live in the sibling `pernod-ricard-web/scripts/`: `a11y-audit.mjs`
  (Playwright + axe-core) and `lighthouse-audit.mjs`. Playwright Chromium at
  `C:\Users\tshre\AppData\Local\ms-playwright\chromium-1223\chrome-win64\chrome.exe`.

## 10. Repos & rights
- GitHub: `Yaminam/reimagined-succotash` (yamina) and
  `Garage-Collective-AI/Pernod-Ricard` (origin). **Keep private.**
- Extracted brand logos, photography, and report PDFs are **© Pernod Ricard /
  brand owners** — design-comp only; replace with licensed assets before any
  public/production use (see NOTICE.md files).

## 11. Recommendation for the new folder
Fastest path: **copy the `liquid-light` project** as the base, then rebuild only
`src/components/sections/Hero.tsx` (+ a new `BottlesScene` in `components/3d/`)
for the 3D bottles. You inherit all tokens, pages, content, schema, a11y, and the
WebGLGuard pattern, and only the hero changes.
