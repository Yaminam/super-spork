# Backend Architecture — Pernod Ricard India

> Companion to the front-end build in this repository. This document defines
> what backend is required to take the current Next.js front end from a
> pitch-ready prototype to a production corporate platform, and exactly how
> each piece is delivered. Section numbers in parentheses map to the
> *Website Development Brief: Pernod Ricard India*.

---

## 0. Where we are today (front-end status)

The front end is built and building cleanly (Next.js 15, App Router, RSC, TypeScript strict). It currently reads from **typed content files** in `src/content/*` rather than a live backend. Everything below replaces those static files with managed, governed, API-served content — without changing the front-end components, because they already consume typed data through a thin content layer.

What is already in place and backend-ready:

| Capability | Status | Where |
|---|---|---|
| Schema.org JSON-LD (Organization, WebSite, Person, Brand, FAQPage, NewsArticle, Breadcrumb, WebPage) | ✅ Built | `src/lib/seo/jsonld.tsx` |
| `sitemap.xml`, `robots.txt` (answer-engine crawlers allowed) | ✅ Built | `src/app/sitemap.ts`, `robots.ts` |
| `llms.txt` | ✅ Built | `public/llms.txt` |
| Canonical URLs + per-page metadata | ✅ Built | `layout.tsx` + per-route `metadata` |
| Answer-ready FAQ (server-rendered, schema-backed) | ✅ Built | `src/components/site/Faq.tsx` |
| Age gate + DPDP cookie consent | ✅ Built | `src/components/site/AgeGate.tsx`, `CookieConsent.tsx` |
| Machine-readable article dates/authorship | ✅ Built | `src/content/news.ts`, `news/[slug]` |
| Single source of truth for site identity | ✅ Built | `src/lib/site-config.ts` |

> The single integration seam is `src/content/*`. Today those are `.ts` files;
> in production they become typed adapters that fetch from the CMS at build/
> request time. **No page component needs to change.**

---

## 1. Platform & architecture (§9 — Platform and architecture)

### 1.1 Recommended stack
- **Front end:** Next.js 15 (already built) on **Vercel** (Edge Network, global CDN, ISR).
- **CMS:** **Headless, composable CMS** — recommended **Sanity** (primary) or **Contentful** (enterprise alternative). Justification below.
- **Delivery:** Static + Incremental Static Regeneration (ISR) so pages are CDN-edge-cached but update within seconds of a publish.
- **APIs:** Content API (CMS GraphQL/GROQ) + a thin internal **BFF** (Next.js Route Handlers under `src/app/api/*`) for search, the assistant, and form submissions.

### 1.2 Why headless / composable (vs. monolith)
- **Modular content model** → new sections, microsites and disclosures are added without a redesign (§5, §9).
- **API-first** → the same content serves web, mobile, AI agents and future surfaces (§9).
- **Edit/publish separation** → editorial changes never require a developer deploy.

### 1.3 CMS recommendation — Sanity (primary)
| Requirement (brief) | How Sanity delivers |
|---|---|
| Modular content model, no redesign to extend | Portable Text + schema-as-code; new document types are additive |
| API-first to web/mobile/AI | GROQ + GraphQL APIs, CDN-cached, plus raw JSON export for AI ingestion |
| Role-based publishing, approval workflows | Roles + custom workflow/Scheduled Publishing + document actions |
| In-context preview | Sanity Presentation (live visual preview against Next.js draft mode) |
| Version history | Full document history & rollback built in |
| Localisation-ready | Field-level i18n / document-level locale variants |

> *Contentful* is the alternative when the client mandates a large enterprise
> SaaS with formal SLAs and SSO/SCIM out of the box; the content model and
> front-end adapter are equivalent.

### 1.4 Content model (initial document types)
Derived directly from what the front end already renders:

```
organization        (singleton)  → name, legalName, HQ, parent, sameAs  → Organization schema
page                (singleton)  → group, sustainability, investors, careers, role-society
brand               (collection) → name, category, origin, corporateNote, hero  → Brand schema
leader              (collection) → name, role, bio, photo, order        → Person schema
operationsNode      (collection) → region, detail, geo
article             (collection) → slug, category, title, excerpt, body (Portable Text), datePublished, author  → NewsArticle schema
faq                 (collection) → question, answer, surfaces[]         → FAQPage schema
document            (collection) → title, file (asset), section, year   → reports/PDFs
navigation/footer   (singleton)  → managed menus
legal/compliance    (singleton)  → responsible-drinking copy, cookie text, age-gate text
```

### 1.5 The content adapter (the only code change)
Each `src/content/*.ts` file becomes a typed async fetch with the *same return shape*. Example for news:

```ts
// src/content/news.ts (production form)
import { sanity } from "@/lib/cms/client";
export async function getArticles(): Promise<Article[]> {
  return sanity.fetch(`*[_type=="article"]|order(datePublished desc){
    "slug": slug.current, category, title, excerpt, datePublished, body
  }`);
}
```

Pages move from `import { ARTICLES }` to `const ARTICLES = await getArticles()` — trivial because pages are already RSC/async.

### 1.6 Performance & edge (§9)
- ISR with on-publish **webhook → revalidateTag** so edits are live in seconds, globally CDN-cached.
- `next/image` (already used) backed by the CMS image pipeline (AVIF/WebP, responsive `sizes`).
- Targets carried over from the front end: **LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse ≥ 95**.

---

## 2. Search & AI discoverability (§9 — mandatory)

### 2.1 Traditional SEO foundations — **done in front end**
Clean crawlability, semantic HTML, internal linking, `sitemap.xml`, `robots.txt`, Core Web Vitals targets, stable canonical URLs. Backend role: keep the sitemap fresh via the publish webhook (regenerated on ISR revalidation).

### 2.2 Structured data (GEO/AEO) — **builders done, data from CMS**
The JSON-LD builders already emit Organization, Person, Brand, NewsArticle, FAQPage, Breadcrumb, WebPage. In production they receive CMS data instead of static content. **Knowledge-graph/entity definitions** (`@id` anchors) are already wired (`/#organization`, `/#website`).

### 2.3 Answer-ready content & freshness
- FAQ blocks and quotable statements are first-class CMS content types, so editors expand answer coverage without code.
- **Freshness signals:** `datePublished`/`dateModified` come from CMS document timestamps and flow into `NewsArticle` schema + sitemap `lastModified`.
- `llms.txt` is regenerated on build from `site-config` + nav so it never drifts.

### 2.4 Crawler access control
`robots.ts` already names approved AI bots (GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot, Applebot-Extended). Confidential/regulated routes are disallowed there at launch; draft/preview routes are `noindex` via draft mode.

### 2.5 AI citation & brand-visibility tracking (reporting metric)
A scheduled job (Vercel Cron → Route Handler) periodically queries answer engines for category/corporate prompts, logs whether Pernod Ricard India is cited, and writes results to an analytics store (see §6). Reported alongside organic traffic.

---

## 3. AI inside the experience (§9 — optional, with guardrails)

All AI features are **scoped strictly to published corporate content** with hallucination guardrails (brief requirement for a regulated category).

| Feature | Implementation | Guardrail |
|---|---|---|
| **Intelligent site search** (intent) | CMS content indexed into a vector store (e.g. Vercel/Upstash or Algolia); query via `/api/search` Route Handler | Results limited to indexed, published documents |
| **Conversational assistant** (media/talent/partner Q&A) | RAG over the same index, answered by Claude (`claude-opus-4-8` or a smaller tier for cost), served from `/api/assistant` | System prompt forbids consumption promotion, restricts to retrieved sources, cites pages, refuses out-of-scope; never invents figures |
| **Personalised surfacing** (repeat visitors) | Edge cookie segment → re-ordered teasers | Consent-gated (DPDP); no PII |
| **Automated translation / locale** | CMS i18n + machine-translation pipeline with human review queue | Editor sign-off before publish |
| **Editorial AI tools** | Draft assist, summary/standfirst generation in the CMS | Human-in-the-loop; never auto-publishes |

> Guardrail posture: retrieval-only, source-cited, compliance-aware system
> prompts, and a refusal path. No AI feature writes to production without an
> editor approving it.

---

## 4. Security (§9 — Platform and architecture)

| Requirement | How |
|---|---|
| SSO support | CMS + editor tooling behind SSO (Okta/Azure AD / Google Workspace via SAML/OIDC) |
| MFA for editors | Enforced at the IdP for all CMS/admin roles |
| Role-based publishing, audit logs, approval workflows | CMS roles (author → editor → publisher) + immutable change history + scheduled publishing |
| Regular pen-testing | Quarterly third-party penetration tests; remediation SLAs |
| DDoS protection | Vercel/Cloudflare edge WAF + rate limiting on all `/api/*` Route Handlers |
| Vulnerability disclosure readiness | Published `security.txt` + a coordinated disclosure policy and intake |
| Transport & headers | HTTPS-only, HSTS, CSP, `X-Content-Type-Options`, Referrer-Policy via `next.config` headers / middleware |
| Secrets | Platform env vars / secret manager; no secrets in the repo (note: extracted brand assets remain © and stay private — see `NOTICE.md`) |

---

## 5. Compliance & data (§9 + India alco-bev rules)

| Requirement | How |
|---|---|
| **Corporate, not consumer** | Brands presented in corporate context only — no pricing, no purchase, no consumption cues (enforced in content model + editorial guidelines) |
| **Indian advertising & surrogate guidelines** | Age gate (built), responsible-drinking messaging site-wide (built), legal copy managed in CMS so compliance can edit without a deploy |
| **DPDP Act** | Consent-first cookie banner (built); analytics/marketing tags fire only after explicit opt-in via the tag manager |
| Data residency & retention | Documented residency (India region where required), retention schedule, and editor access policy |
| Cookie/consent enforcement | Stored consent gates GTM/analytics loading; consent log retained for audit |

---

## 6. Analytics, tag management & reporting (§5)
- **GA4** + **Vercel Analytics / Web Vitals** (CWV in the field).
- **Tag management** via GTM, **consent-gated** by the DPDP banner.
- **AI citation tracking** (see §2.5) reported as a standard metric alongside organic traffic.
- Dashboards for the three success measures (§10): benchmark mentions, qualified senior-talent inbound, organic discovery on corporate/governance/ESG queries.

---

## 7. Editor experience (§9)
- **No-developer editing** for routine updates (CMS).
- **In-context preview** (Sanity Presentation / Contentful preview against Next.js draft mode).
- **Scheduled publishing** and **version history / rollback** native to the CMS.
- **Localisation-ready** content model even though launch is English-first.

---

## 8. Hosting recommendation (§5)
- **Vercel** for the Next.js front end: edge network, global CDN, ISR, preview deployments per branch, image optimisation, Web Application Firewall.
- **CMS** as managed SaaS (Sanity/Contentful) — no infra to run.
- **CDN** for media (CMS asset pipeline) + India edge POPs for fast delivery to local users.
- **CI/CD:** GitHub → Vercel preview on PR, protected `main`/`develop` (matches repo Git workflow), Lighthouse + axe checks in CI as quality gates.

---

## 9. Build sequence (how we get there)

1. **Stand up the CMS** and model the document types in §1.4 (mirrors current `src/content` shapes).
2. **Migrate content** from `src/content/*.ts` into the CMS (the typed shapes make this 1:1).
3. **Swap the content layer** — turn each `content/*` file into a CMS fetch adapter; pages are untouched.
4. **Wire ISR + publish webhooks** for fresh, edge-cached delivery and live sitemap/`llms.txt`.
5. **Index content** into the vector store; ship `/api/search` then the guard-railed `/api/assistant`.
6. **Harden** — SSO/MFA, headers/CSP, WAF, consent-gated tags, pen-test.
7. **Instrument** — GA4, Web Vitals, AI-citation tracking, success dashboards.
8. **Localisation** scaffolding ahead of additional locales.

---

## 10. Summary — backend needed vs. already covered

| Brief area | Front end (this repo) | Backend to build |
|---|---|---|
| SEO foundations, schema, sitemap, robots, llms.txt, canonical | ✅ Done | Keep fresh via publish webhook |
| Answer-ready content / FAQ / freshness | ✅ Components done | Move to CMS content types |
| Age gate / responsible drinking / DPDP consent | ✅ Done | Wire consent → tag manager; manage copy in CMS |
| Modular content, no-redesign extension | ✅ Typed content layer | Headless CMS + content model |
| API-first to web/mobile/AI | ✅ JSON-LD + clean routes | CMS APIs + BFF Route Handlers |
| Intelligent search / assistant | — | Vector index + RAG with guardrails |
| Role-based publishing, preview, versioning, scheduling | — | CMS configuration |
| SSO/MFA, audit, pen-test, DDoS, vuln disclosure | — | Platform + IdP + WAF |
| Analytics, tag mgmt, AI-citation tracking | partial (Web Vitals targets) | GA4 + GTM + cron jobs |
| Hosting, CDN, CI/CD | ✅ Build green on Next.js | Vercel + CMS SaaS + CI gates |
