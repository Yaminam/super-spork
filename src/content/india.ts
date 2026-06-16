/**
 * Pernod Ricard India, corporate content.
 *
 * This is a CORPORATE site, not a brand/consumer site. Brands are presented
 * in a corporate context only: no pricing, no consumption cues, no calls to
 * purchase. Figures below are representative for the redesign and are flagged
 * where they must be confirmed against the company's published disclosures
 * before launch (see [[backend-architecture]], content governance).
 */

export interface IndiaStat {
  value: string;
  label: string;
  note?: string;
}

/** Headline figures, sourced from public records (see [[backend-architecture]]). */
export const INDIA_STATS: IndiaStat[] = [
  { value: "1993", label: "Operating in India since" },
  { value: "30+", label: "Bottling plants across India" },
  { value: "2", label: "Distilleries, Nashik & Behror" },
  { value: "1,400+", label: "Employees in India" }];

export interface CorporateBrand {
  name: string;
  category: "Indian Whisky" | "Scotch Whisky" | "Wine" | "Vodka" | "Gin" | "Other";
  origin: "Made in India" | "International";
  /** Corporate framing only, heritage / role in the portfolio. No consumption cues. */
  note: string;
  /** Detail-page slug, where one exists in [[BRAND_DETAILS]]. */
  slug?: string;
}

/**
 * Portfolio in a corporate context. Ordered to lead the India story first.
 * Copy describes provenance and the brand's place in the business, never
 * taste, price, or invitations to drink (Indian surrogate-advertising safe).
 */
export const INDIA_BRANDS: CorporateBrand[] = [
  { name: "Royal Stag", category: "Indian Whisky", origin: "Made in India", slug: "royal-stag", note: "One of the group's flagship Indian whiskies and a cornerstone of the local portfolio." },
  { name: "Blenders Pride", category: "Indian Whisky", origin: "Made in India", slug: "blenders-pride", note: "A premium Indian whisky positioned at the heart of the prestige segment." },
  { name: "Imperial Blue", category: "Indian Whisky", origin: "Made in India", slug: "imperial", note: "A high-volume Indian whisky brand with broad national distribution." },
  { name: "100 Pipers", category: "Scotch Whisky", origin: "International", slug: "100-pipers", note: "A Scotch whisky brand with significant presence and bottling in India." },
  { name: "Seagram's", category: "Indian Whisky", origin: "Made in India", slug: "seagrams-gin", note: "A heritage label within the locally manufactured portfolio." },
  { name: "Chivas Regal", category: "Scotch Whisky", origin: "International", slug: "chivas", note: "Blended Scotch from the international house, distributed in India." },
  { name: "The Glenlivet", category: "Scotch Whisky", origin: "International", slug: "the-glenlivet", note: "Single malt Scotch, part of the international premium range." },
  { name: "Ballantine's", category: "Scotch Whisky", origin: "International", slug: "ballantines", note: "Blended Scotch whisky from the global portfolio." },
  { name: "Jameson", category: "Other", origin: "International", slug: "jameson", note: "Irish whiskey, one of the group's fastest-growing international brands." },
  { name: "Absolut", category: "Vodka", origin: "International", slug: "absolut", note: "Vodka from Sweden, a global icon within the portfolio." },
  { name: "Beefeater", category: "Gin", origin: "International", slug: "beefeater", note: "London dry gin, part of the international spirits range." },
  { name: "Jacob's Creek", category: "Wine", origin: "International", note: "Australian wine with a long-standing presence in the Indian market." }];

export interface OperationsNode {
  region: string;
  detail: string;
}

/** Manufacturing, supply-chain and agri-sourcing footprint (sourced). */
export const OPERATIONS: OperationsNode[] = [
  { region: "Corporate office, DLF Cyber City, Gurugram, Haryana", detail: "The centre coordinating the India business, its brand houses and functional leadership." },
  { region: "Distillery & winery, Nashik, Maharashtra", detail: "A distillery and the company's own winery in the Nashik wine region of western India." },
  { region: "Distillery, Behror, Rajasthan", detail: "A grain-spirit distillery in northern India, anchoring the whisky portfolio's supply." },
  { region: "Bottling network, 30+ plants nationwide", detail: "More than thirty bottling plants across India bring production close to demand and reduce logistics intensity." },
  { region: "Agri-sourcing & water", detail: "Community farm ponds near plants and water-stewardship work with farming communities support responsible water and soil practices." }];

export interface Leader {
  name: string;
  role: string;
}

/** As-of date for the leadership list (sourced from public announcements). */
export const LEADERSHIP_AS_OF = "June 2026";

/**
 * Leadership team, Pernod Ricard India, sourced from the company's published
 * appointments. Verify against the latest announcements before launch and add
 * biographies and portraits during the content phase.
 */
export const LEADERSHIP: Leader[] = [
  { name: "Jean Touboul", role: "Managing Director & Chief Executive Officer" },
  { name: "Richa Singh", role: "Chief Financial Officer" },
  { name: "Gagandeep Sethi", role: "SVP, Integrated Operations & Sustainability and Responsibility" },
  { name: "Nitu Bhushan", role: "Chief Human Resources Officer" },
  { name: "Kartik Mohindra", role: "Chief Marketing Officer" },
  { name: "Prasanna Mohile", role: "National Head, Corporate Affairs" }];

export interface GovernancePillar {
  title: string;
  body: string;
}

export const GOVERNANCE: GovernancePillar[] = [
  { title: "Board & oversight", body: "Decisions are made within a clear governance framework, with defined accountability from the leadership team upward to the global group." },
  { title: "Ethics & compliance", body: "A code of conduct, anti-bribery standards and a confidential speak-up channel apply across every function and location." },
  { title: "Responsible marketing", body: "All communication follows the group's marketing code and full compliance with Indian advertising and surrogate guidelines for the alco-bev category." },
  { title: "Risk & transparency", body: "Material risks are reviewed regularly, and disclosures are published so media, partners and regulators can hold the business to account." }];

export interface Faq {
  q: string;
  a: string;
}

/* ------------------------------------------------------------------ *
 * Corporate narrative, §7 Content Direction.
 * Confident, understated, editorial. Distinctly Indian without cliché.
 * ------------------------------------------------------------------ */

/** Opening positioning line for the company. */
export const POSITIONING =
  "We are a maker of premium spirits, an Indian business with a global parent, and a long-term builder of brands, livelihoods and trust.";

export interface ValuePillar {
  title: string;
  body: string;
}

/** What we stand for. */
export const WHAT_WE_STAND_FOR: ValuePillar[] = [
  { title: "Craft", body: "We make things properly. From sourcing to bottling, quality is the only standard we recognise, across Indian-made and international brands alike." },
  { title: "Conviviality", body: "We exist for the moments people share. We market our brands responsibly and ask only that they are enjoyed in good company and good measure." },
  { title: "Responsibility", body: "We hold ourselves to the same standard as our craft: careful with water and soil, fair with people, and honest in how we communicate." },
  { title: "Entrepreneurship", body: "We give our teams the freedom to act like owners. Decentralised by design, accountable by culture." }];

/** How we operate. */
export const HOW_WE_OPERATE: ValuePillar[] = [
  { title: "Made in India, for India", body: "Our largest brands are distilled, blended and bottled here, close to the markets and the communities they serve." },
  { title: "Part of a global house", body: "We bring the standards, scale and learning of the Pernod Ricard group to the Indian market, and Indian craft to the group." },
  { title: "Premium by conviction", body: "We invest behind quality and brand-building for the long term, not short-term volume. Premiumisation is the through-line of our strategy." },
  { title: "Governed for scrutiny", body: "A clear governance framework, a code of conduct and transparent disclosure mean we can be read by media, partners and regulators with confidence." }];

export interface Milestone {
  year: string;
  text: string;
}

/** The India story, told as a timeline. Group lineage, then the India build. */
export const INDIA_STORY: Milestone[] = [
  { year: "1805", text: "The Pernod Ricard lineage begins in France, with houses whose craft still sets our standard today." },
  { year: "1993", text: "Pernod Ricard India is incorporated, betting early on the country's appetite for premium spirits." },
  { year: "2001", text: "The group's acquisition of Seagram brings an Indian whisky portfolio, Royal Stag, Blenders Pride, Imperial Blue and 100 Pipers, into the house." },
  { year: "2010s", text: "Premiumisation accelerates, and local manufacturing scales to more than thirty bottling plants and distilleries at Nashik and Behror." },
  { year: "2021", text: "The 'Good Times from a Good Place' 2030 roadmap drives water stewardship and community action across India." },
  { year: "Today", text: "The second-largest spirits company in India by revenue, manufacturing nationwide and building for the decades ahead." }];

export interface EconomyStat {
  value: string;
  label: string;
}

/** Our footprint in the Indian economy, institutional maturity at a glance. */
export const ECONOMY_CONTRIBUTION: EconomyStat[] = [
  { value: "30+", label: "Bottling plants across India" },
  { value: "1,400+", label: "Employees, with many more livelihoods supported" },
  { value: "5 lakh+", label: "People reached by community programmes" },
  { value: "13 states", label: "And 3 union territories reached" }];

/** Employer brand pillars, strengthen talent attraction (§3). */
export const EMPLOYER_PILLARS: ValuePillar[] = [
  { title: "Ownership from day one", body: "A decentralised culture where you are trusted to lead, decide and shape the business early." },
  { title: "Brands worth building", body: "Some of India's best-known spirits brands and global icons, to grow with real investment behind them." },
  { title: "Grow without limits", body: "Mobility across functions, markets and the wider Pernod Ricard group, with development that travels with you." },
  { title: "A workplace that cares", body: "Inclusive, safe and fair by commitment, with wellbeing and belonging treated as seriously as performance." }];

export interface CareerArea {
  name: string;
  text: string;
}

export const CAREER_AREAS: CareerArea[] = [
  { name: "Marketing & Brand", text: "Build and steward premium Indian and international brands in one of the world's most dynamic markets." },
  { name: "Operations & Supply", text: "Run distillation, blending, bottling and logistics across our national manufacturing network." },
  { name: "Sales & Commercial", text: "Bring our portfolio to market responsibly, partnering with trade across the country." },
  { name: "Technology & Data", text: "Engineer the platforms and insight behind a modern, premium spirits business." },
  { name: "Finance & Strategy", text: "Steward value and shape long-term direction in a regulated, fast-moving category." },
  { name: "People & Culture", text: "Attract, grow and care for the people who make the business what it is." }];

export interface ContactChannel {
  audience: string;
  detail: string;
  action: string;
}

/** The right entry points for every audience (§4, §7). India-based. */
export const CONTACT_CHANNELS: ContactChannel[] = [
  { audience: "Media & press", detail: "Statements, interviews and corporate communications for business and financial media.", action: "media@pernod-ricard.com" },
  { audience: "Investors & analysts", detail: "Disclosures, reports and financial communications for the group's stakeholders.", action: "See Investors" },
  { audience: "Talent & careers", detail: "Opportunities for mid- to senior professionals across functions and locations.", action: "See Careers" },
  { audience: "Trade & partners", detail: "Distributors, suppliers and commercial partners who work with our brands.", action: "partnerships@pernod-ricard.com" },
  { audience: "Policy & regulators", detail: "Public-policy, governance and regulatory engagement for the alco-bev category.", action: "corporate.affairs@pernod-ricard.com" },
  { audience: "General enquiries", detail: "Our corporate office, Building 8C, DLF Cyber City.", action: "Gurugram, Haryana 122002, India" }];

/** Investor-facing highlights, framed for credibility, not promotion. */
export const INVESTOR_HIGHLIGHTS: ValuePillar[] = [
  { title: "Premiumisation strategy", body: "Long-term value creation built on premium brands, disciplined investment and a mix that trades up over time." },
  { title: "Local manufacturing scale", body: "A national production and sourcing footprint that supports resilience and cost discipline." },
  { title: "Governance & transparency", body: "Clear oversight and regular disclosure, so performance and risk can be assessed with confidence." }];

/* ------------------------------------------------------------------ *
 * Sustainability & Responsibility, India (sourced).
 * "Good Times from a Good Place" 2030 roadmap, four pillars, plus the
 * India-specific programmes and reach.
 * ------------------------------------------------------------------ */

export interface SustainabilityPillar {
  no: string;
  name: string;
  text: string;
}

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  { no: "01", name: "Nurturing Terroir", text: "Protecting water, soil and biodiversity through regenerative agriculture and water stewardship with the farming communities we source from." },
  { no: "02", name: "Valuing People", text: "Inclusive, safe and fair workplaces, and thriving communities, through education, livelihoods and women's empowerment programmes across India." },
  { no: "03", name: "Circular Making", text: "Eco-designed, reusable and recyclable packaging, and a clear path to lower-carbon, more efficient manufacturing." },
  { no: "04", name: "Responsible Hosting", text: "Programmes that address the misuse of alcohol and make moderation part of conviviality, in line with Indian advertising and surrogate guidelines." }];

export const SUSTAINABILITY_STATS: IndiaStat[] = [
  { value: "5 lakh+", label: "People reached by community programmes" },
  { value: "13 states", label: "And 3 union territories" },
  { value: "2030", label: "Water-balanced in high-risk watersheds" },
  { value: "100%", label: "Reusable, recyclable or compostable packaging goal" }];

export interface SustainabilityProgramme {
  title: string;
  text: string;
}

export const SUSTAINABILITY_PROGRAMMES: SustainabilityProgramme[] = [
  { title: "Water stewardship", text: "Community farm ponds and watershed projects near our plants help secure year-round water for agriculture, working towards being water-balanced in India's high-risk watersheds by 2030." },
  { title: "Agriculture & livelihoods", text: "Programmes with farming communities improve incomes and resilience while supporting responsible soil and water practices in our supply chain." },
  { title: "Responsible drinking", text: "Awareness and prevention programmes, delivered responsibly and in full compliance with Indian advertising and surrogate guidelines for the category." }];

/** Answer-ready Q&A, feeds FAQPage schema and GEO/AEO visibility. */
export const CORPORATE_FAQS: Faq[] = [
  {
    q: "What is Pernod Ricard India?",
    a: "Pernod Ricard India is the second-largest spirits company in India by revenue, operating a portfolio of leading Indian and international brands across whisky, wine and other categories. Incorporated in 1993, it is a fully owned subsidiary of the Pernod Ricard group, present in more than 70 countries.",
  },
  {
    q: "Where is Pernod Ricard India headquartered?",
    a: "Pernod Ricard India is headquartered at DLF Cyber City, Gurugram, Haryana, with more than thirty bottling plants nationwide and distilleries at Nashik (Maharashtra) and Behror (Rajasthan).",
  },
  {
    q: "Who leads Pernod Ricard India?",
    a: "Pernod Ricard India is led by Managing Director & CEO Jean Touboul, with a leadership team spanning finance, operations and sustainability, human resources, marketing and corporate affairs.",
  },
  {
    q: "Is this a website where I can buy alcohol?",
    a: "No. This is a corporate website. It does not sell, promote or encourage the consumption of alcohol, and it complies with Indian advertising and surrogate guidelines for the category.",
  },
  {
    q: "What brands does Pernod Ricard India operate?",
    a: "The portfolio includes locally made brands such as Royal Stag, Blenders Pride, Imperial Blue and Seagram's, alongside international brands including Chivas Regal, The Glenlivet, Ballantine's, Jameson, Absolut and Jacob's Creek.",
  },
  {
    q: "How does Pernod Ricard India approach sustainability and responsibility?",
    a: "The business follows the group's 2030 sustainability roadmap, covering terroir and water, people and communities, circular packaging, and responsible hosting, and runs programmes that address the misuse of alcohol.",
  },
  {
    q: "How can media, talent or partners get in touch?",
    a: "Dedicated entry points for media, prospective talent, trade partners and investors are available through the Contact and Newsroom sections of this site.",
  }];

/** Operations-specific Q&A (answer-ready, GEO/AEO). */
export const OPERATIONS_FAQS: Faq[] = [
  { q: "Where does Pernod Ricard India manufacture?", a: "Production spans more than thirty bottling plants across India, with distilleries at Nashik (Maharashtra) and Behror (Rajasthan), and the company's own winery at Nashik." },
  { q: "How does the company approach responsible sourcing?", a: "Through long-term relationships with farming communities for grain and grapes, alongside water-stewardship work such as community farm ponds near its plants." },
  { q: "Why manufacture locally?", a: "Producing close to demand strengthens quality control and supply resilience, reduces logistics intensity, and supports regional economies and livelihoods." }];

/** Careers-specific Q&A. */
export const CAREERS_FAQS: Faq[] = [
  { q: "Why build a career at Pernod Ricard India?", a: "A decentralised culture trusts you to lead early, you work on leading Indian and international brands, and you can grow across functions, markets and the wider Pernod Ricard group." },
  { q: "What kind of roles are available?", a: "Opportunities span marketing and brand, operations and supply, sales and commercial, technology and data, finance and strategy, and people and culture." },
  { q: "Does the company support inclusion and wellbeing?", a: "Yes. Inclusive, safe and fair workplaces are a stated commitment, with wellbeing and belonging treated as seriously as performance." }];

/** Investor-specific Q&A. */
export const INVESTOR_FAQS: Faq[] = [
  { q: "What is the company's value-creation strategy?", a: "Long-term value built on premiumisation: investing behind premium brands and a mix that trades up over time, supported by the scale of local manufacturing." },
  { q: "Where can I find reports and disclosures?", a: "Reports, results and financial communications are published in the Investors and Documents sections of this site." },
  { q: "How is the business governed?", a: "Within a clear governance framework with defined accountability, a code of conduct, responsible-marketing standards and regular, transparent disclosure." }];
