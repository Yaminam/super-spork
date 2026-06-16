/**
 * Newsroom, corporate communications.
 *
 * Each article carries machine-readable publication dates and a category so
 * NewsArticle schema and freshness signals (§9) can be emitted. Body copy is
 * original corporate summary writing for the redesign; replace with editorial
 * sign-off content before launch. Dates are fixed ISO strings (no runtime
 * Date use) so builds are deterministic.
 */
export interface Article {
  slug: string;
  category: "Results" | "Sustainability" | "People" | "Brands" | "Corporate";
  title: string;
  /** One-line standfirst, used in lists and meta description. */
  excerpt: string;
  datePublished: string; // ISO yyyy-mm-dd
  /** Paragraphs of corporate summary copy. */
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "full-year-performance-update",
    category: "Results",
    title: "Pernod Ricard India reports its full-year performance",
    excerpt: "A summary of the business's annual performance, with continued momentum in the premium portfolio.",
    datePublished: "2026-05-28",
    body: [
      "Pernod Ricard India today shared a summary of its full-year performance, underlining the resilience of its premium-led portfolio and the strength of its Indian and international brands.",
      "The update points to continued investment in local manufacturing, responsible marketing and the talent agenda, in line with the group's long-term value creation strategy.",
      "Detailed figures and supporting disclosures are available in the Investors section of this site."],
  },
  {
    slug: "distillery-water-stewardship-milestone",
    category: "Sustainability",
    title: "A new water-stewardship milestone across Indian operations",
    excerpt: "Progress on the 2030 roadmap, with improved water efficiency at manufacturing and sourcing sites.",
    datePublished: "2026-04-15",
    body: [
      "As part of its 2030 sustainability roadmap, Pernod Ricard India reported progress on water stewardship across its manufacturing and agri-sourcing network.",
      "The work spans efficiency at bottling sites and long-term partnerships with farming communities on responsible soil and water practices.",
      "Sustainability is governed centrally and reported transparently, see the Sustainability & Responsibility section for the full roadmap."],
  },
  {
    slug: "employer-brand-talent-commitment",
    category: "People",
    title: "Strengthening our employer brand and talent commitment",
    excerpt: "New initiatives to attract and develop senior talent across the India business.",
    datePublished: "2026-03-02",
    body: [
      "Pernod Ricard India outlined fresh commitments to its people agenda, from leadership development to an inclusive and safe workplace culture.",
      "The initiatives reinforce the company's ambition to be among the most attractive employers in the Indian premium-goods sector.",
      "Current opportunities and the wider talent proposition are set out in the Careers section."],
  },
  {
    slug: "premiumisation-drives-portfolio-growth",
    category: "Brands",
    title: "Premiumisation continues to drive portfolio growth",
    excerpt: "Demand for prestige Indian whiskies and international brands underlines the company's premium-led strategy.",
    datePublished: "2026-02-18",
    body: [
      "Pernod Ricard India pointed to sustained momentum in its premium portfolio, as Indian consumers continue to trade up across whisky and other categories.",
      "The trend reinforces the company's long-term strategy of investing behind quality and brand-building rather than short-term volume.",
      "The portfolio in a corporate context is set out in the Brands section of this site."],
  },
  {
    slug: "local-manufacturing-investment",
    category: "Corporate",
    title: "Continued investment in local manufacturing",
    excerpt: "Investment across the company's national network of distilleries and bottling plants strengthens resilience and quality.",
    datePublished: "2025-12-05",
    body: [
      "Pernod Ricard India reaffirmed its commitment to local manufacturing, with continued investment across its distilleries and more than thirty bottling plants nationwide.",
      "Producing close to demand supports quality, supply resilience and the regional economies and livelihoods connected to the company's operations.",
      "Details of the manufacturing footprint are available in the Operations section."],
  },
  {
    slug: "responsible-hosting-programme-expansion",
    category: "Corporate",
    title: "Expanding responsible-hosting programmes nationwide",
    excerpt: "Programmes that address the misuse of alcohol reach more communities across India.",
    datePublished: "2026-01-20",
    body: [
      "Pernod Ricard India expanded its responsible-hosting and prevention programmes, extending their reach across more markets in the country.",
      "The programmes form part of the company's commitment to conviviality enjoyed responsibly, and are delivered in line with Indian advertising and surrogate guidelines.",
      "This is a corporate initiative and does not promote the consumption of alcohol."],
  }];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a]));

/** Format an ISO date for display without locale-dependent runtime calls. */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
