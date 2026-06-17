/**
 * Brand highlights — factual portfolio reference for the India business, framed
 * for a corporate context (heritage, provenance, age statements only; no
 * consumption messaging, in line with Indian surrogate-advertising norms).
 *
 * Product expressions and dates were sourced from official brand sites,
 * Pernod Ricard corporate pages, Scotchwhisky.com and Wikipedia. Imperial Blue
 * is intentionally excluded (divested to Tilaknagar Industries, Dec 2025).
 */
export interface BrandExpression {
  name: string;
  note: string;
}

export interface BrandHighlight {
  slug: string;
  name: string;
  category: string;
  origin: string;
  since: string;
  line: string;
  logo?: string;
  products: BrandExpression[];
}

export const BRAND_HIGHLIGHTS: BrandHighlight[] = [
  {
    slug: "royal-stag",
    name: "Royal Stag",
    category: "Indian whisky",
    origin: "India",
    since: "1995",
    line: "One of India's largest-selling whisky brands, locally produced since 1995 and part of the portfolio since 2001.",
    logo: "/images/pernod/96-royal-stag-logo-240.png",
    products: [
      { name: "Royal Stag", note: "The core blend of Indian grain spirits and imported Scotch malts." },
      { name: "Royal Stag Barrel Select", note: "A deluxe expression introduced in 2011." },
      { name: "Barrel Select Premier", note: "A premium extension of the Barrel Select line." },
    ],
  },
  {
    slug: "blenders-pride",
    name: "Blenders Pride",
    category: "Indian whisky",
    origin: "India",
    since: "1995",
    line: "A leading Indian premium whisky, blending Indian grain spirits with imported Scotch malts.",
    logo: "/images/pernod/87-blenders-pride_240.png",
    products: [
      { name: "Rare Premium Whisky", note: "The flagship blend." },
      { name: "Reserve Collection", note: "A premium expression matured via a Solera process, introduced 2011." },
      { name: "Select Premium", note: "A further line extension." },
    ],
  },
  {
    slug: "100-pipers",
    name: "100 Pipers",
    category: "Blended Scotch",
    origin: "Scotland · bottled in India",
    since: "1960s",
    line: "A blended Scotch created by Seagram in the 1960s, part of the portfolio since 2001 and locally bottled for India.",
    logo: "/images/pernod/85-100-pipers_240.png",
    products: [
      { name: "100 Pipers Deluxe", note: "The core blended Scotch expression." },
      { name: "8 Years Old", note: "An age-statement expression introduced in 2020." },
      { name: "12 Years Old", note: "A 12-year-old deluxe expression." },
    ],
  },
  {
    slug: "chivas",
    name: "Chivas Regal",
    category: "Blended Scotch",
    origin: "Scotland · Speyside",
    since: "1909",
    line: "A blended Scotch from Chivas Brothers, with roots tracing to an 1801 Aberdeen merchant house.",
    logo: "/images/pernod/38-chivas_logo_blue_240.png",
    products: [
      { name: "Chivas Regal 12", note: "The flagship 12-year-old blend." },
      { name: "Extra 13", note: "A 13-year-old blend with cask-finish variants." },
      { name: "Chivas Regal 18", note: "An 18-year-old blend, launched 1997." },
      { name: "Chivas Regal 25", note: "A 25-year-old blend, reintroduced 2007." },
    ],
  },
  {
    slug: "the-glenlivet",
    name: "The Glenlivet",
    category: "Single malt Scotch",
    origin: "Scotland · Speyside",
    since: "1824",
    line: "A Speyside single malt from a distillery established in 1824, among the first licensed in the region.",
    logo: "/images/pernod/48-the-glenlivet_logo_240.png",
    products: [
      { name: "Founder's Reserve", note: "A no-age-statement single malt at 40% ABV." },
      { name: "12 Year Old", note: "Matured in American and European oak." },
      { name: "15 Year Old", note: "Includes maturation in French oak casks." },
      { name: "18 Year Old", note: "A mature age-statement single malt." },
    ],
  },
  {
    slug: "absolut",
    name: "Absolut",
    category: "Vodka",
    origin: "Sweden · Åhus",
    since: "1979",
    line: "A Swedish vodka produced in Åhus from local winter wheat by continuous distillation; in the group since 2008.",
    logo: "/images/pernod/35-brand-absolut-logo-240px_1.png",
    products: [
      { name: "Absolut Original", note: "The unflavoured, single-source Swedish vodka." },
      { name: "Absolut Citron", note: "A lemon-flavoured expression." },
      { name: "Absolut Vanilia", note: "A vanilla-flavoured expression." },
      { name: "Absolut Raspberri", note: "A raspberry-flavoured expression." },
    ],
  },
  {
    slug: "jameson",
    name: "Jameson",
    category: "Irish whiskey",
    origin: "Ireland · Midleton",
    since: "1780",
    line: "A triple-distilled Irish whiskey founded in Dublin in 1780, today produced at Midleton, County Cork.",
    logo: "/images/pernod/40-brand-jameson-logo-240px.png",
    products: [
      { name: "Jameson Original", note: "The core triple-distilled blend." },
      { name: "Black Barrel", note: "Matured partly in double-charred bourbon barrels." },
      { name: "Caskmates Stout", note: "Finished in craft stout-seasoned casks." },
      { name: "Caskmates IPA", note: "Finished in IPA-seasoned casks." },
    ],
  },
  {
    slug: "ballantines",
    name: "Ballantine's",
    category: "Blended Scotch",
    origin: "Scotland",
    since: "1827",
    line: "A blended Scotch with roots in an 1827 Edinburgh grocery, awarded a royal warrant in 1895.",
    logo: "/images/pernod/36-ballantines_logo_240.png",
    products: [
      { name: "Ballantine's Finest", note: "The flagship blend, first launched in 1910." },
      { name: "12 Year Old", note: "A 12-year age-statement blend." },
      { name: "17 Year Old", note: "Historically the brand's first aged expression." },
      { name: "21 Year Old", note: "A 21-year blend introduced in 1993." },
    ],
  },
  {
    slug: "beefeater",
    name: "Beefeater",
    category: "London dry gin",
    origin: "England · London",
    since: "1863",
    line: "A London dry gin distilled in London from James Burrough's recipe, with distillery heritage dating to 1863.",
    logo: "/images/pernod/37-beefeater-logo_240.png",
    products: [
      { name: "London Dry", note: "The classic, from the original Burrough recipe." },
      { name: "Beefeater 24", note: "A premium gin with 12 botanicals, including teas steeped 24 hours." },
      { name: "Beefeater Pink", note: "The London dry recipe with natural strawberry." },
      { name: "Blood Orange", note: "References an 1876 Burrough orange-gin recipe." },
    ],
  },
  {
    slug: "royal-salute",
    name: "Royal Salute",
    category: "Luxury blended Scotch",
    origin: "Scotland · Strathisla",
    since: "1953",
    line: "A luxury blended Scotch from Chivas Brothers, created in 1953 for the coronation; a minimum of 21 years of age.",
    logo: "/images/pernod/47-brand-royal-salute-logo-240px.png",
    products: [
      { name: "21 Year Old — Signature Blend", note: "The flagship, in a sapphire-blue flagon." },
      { name: "24 Year Old", note: "A 24-year age-statement blend." },
      { name: "38 Year Old — Stone of Destiny", note: "A 38-year prestige blend." },
    ],
  },
];

/** Curated six (three Indian-made, three international icons) for the compact
 *  band reused across inner pages; the full list is used on the Brands page. */
export const FEATURED_HIGHLIGHTS: BrandHighlight[] = [
  "royal-stag",
  "blenders-pride",
  "chivas",
  "the-glenlivet",
  "absolut",
  "jameson",
]
  .map((slug) => BRAND_HIGHLIGHTS.find((b) => b.slug === slug))
  .filter((b): b is BrandHighlight => Boolean(b));
