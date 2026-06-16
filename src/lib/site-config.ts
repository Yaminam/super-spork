/**
 * Single source of truth for site-wide identity, used by metadata,
 * JSON-LD, sitemap and robots. Swap SITE_URL for the production domain
 * at launch; everything canonical-aware reads from here.
 */
export const SITE_URL = "https://www.pernod-ricard-india.com";

export const SITE_NAME = "Pernod Ricard India";

export const SITE_LEGAL_NAME = "Pernod Ricard India Private Limited";

export const SITE_TAGLINE = "Créateurs de convivialité";

export const SITE_DESCRIPTION =
  "Pernod Ricard India is one of the country's largest premium spirits companies, a portfolio of leading Indian and international brands across whisky, wine and other categories, part of the Pernod Ricard global group present in more than 70 countries.";

/** Real corporate email domain (per the company's published contacts). */
export const EMAIL_DOMAIN = "pernod-ricard.com";

/** Corporate footprint, used for Organization schema and contact surfaces. */
export const ORG = {
  foundingYear: 1993, // Pernod Ricard India incorporated 1993 (CIN U74899DL1993PTC055062)
  parentFoundingYear: 1805,
  headquarters: {
    street: "Building 8C, DLF Cyber City, DLF Phase 2",
    locality: "Gurugram",
    region: "Haryana",
    postalCode: "122002",
    country: "IN",
  },
  parent: {
    name: "Pernod Ricard SA",
    url: "https://www.pernod-ricard.com",
  },
  sameAs: [
    "https://in.linkedin.com/company/pernodricardindia",
    "https://www.pernod-ricard.com/en/locations/india"],
} as const;

export const absoluteUrl = (path = "/") =>
  new URL(path, SITE_URL).toString();
