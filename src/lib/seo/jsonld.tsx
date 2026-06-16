/**
 * Schema.org / JSON-LD building blocks (§9, mandatory).
 *
 * Every builder returns a plain object; <JsonLd> serialises it into a
 * <script type="application/ld+json"> tag. These render inside RSC, so the
 * structured data is in the initial HTML, visible to crawlers and to
 * answer engines (ChatGPT, Gemini, Perplexity, Claude, Google AI Overviews).
 */
import { SITE_URL, SITE_NAME, SITE_LEGAL_NAME, SITE_DESCRIPTION, ORG, absoluteUrl } from "@/lib/site-config";
import type { Faq, Leader } from "@/content/india";

type Json = Record<string, unknown>;

export function JsonLd({ data, id }: { data: Json | Json[]; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // Content is built from our own static data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "Corporation",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  foundingDate: String(ORG.foundingYear),
  logo: absoluteUrl("/images/pernod/icons/favicon.png"),
  parentOrganization: {
    "@type": "Corporation",
    name: ORG.parent.name,
    url: ORG.parent.url,
    foundingDate: String(ORG.parentFoundingYear),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG.headquarters.street,
    addressLocality: ORG.headquarters.locality,
    addressRegion: ORG.headquarters.region,
    postalCode: ORG.headquarters.postalCode,
    addressCountry: ORG.headquarters.country,
  },
  sameAs: ORG.sameAs,
});

export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": absoluteUrl("/#organization") },
  inLanguage: "en-IN",
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  })),
});

export const faqSchema = (faqs: Faq[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const leadershipSchema = (leaders: Leader[]): Json => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Leadership team",
  itemListElement: leaders.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: l.name,
      jobTitle: l.role,
      worksFor: { "@id": absoluteUrl("/#organization") },
    },
  })),
});

export const articleSchema = (a: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  category?: string;
}): Json => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: a.headline,
  description: a.description,
  articleSection: a.category,
  datePublished: a.datePublished,
  dateModified: a.datePublished,
  mainEntityOfPage: absoluteUrl(a.path),
  author: { "@type": "Organization", name: SITE_NAME, "@id": absoluteUrl("/#organization") },
  publisher: { "@id": absoluteUrl("/#organization") },
});

export const brandsSchema = (brands: { name: string; note: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pernod Ricard India brand portfolio",
  itemListElement: brands.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Brand",
      name: b.name,
      description: b.note,
      manufacturer: { "@id": absoluteUrl("/#organization") },
    },
  })),
});

export const webPageSchema = (p: { name: string; description: string; path: string }): Json => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: p.name,
  description: p.description,
  url: absoluteUrl(p.path),
  isPartOf: { "@id": absoluteUrl("/#website") },
  inLanguage: "en-IN",
});
