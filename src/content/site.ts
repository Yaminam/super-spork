/** Liquid Light, site IA, mirroring pernod-ricard.com/en. */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Our Group", href: "/group" },
  { label: "History", href: "/group/our-history" },
  { label: "Brands", href: "/brands" },
  { label: "Operations", href: "/operations" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Investors", href: "/investors" },
  { label: "Careers", href: "/careers" },
  { label: "Newsroom", href: "/news" },
];

export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "The Company",
    links: [
      { label: "Our Group", href: "/group" },
      { label: "Leadership & Governance", href: "/leadership" },
      { label: "Operations", href: "/operations" },
      { label: "Our History", href: "/group/our-history" },
    ],
  },
  {
    heading: "Engagement",
    links: [
      { label: "Brands", href: "/brands" },
      { label: "Sustainability & Responsibility", href: "/sustainability" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Newsroom", href: "/news" },
      { label: "Contact", href: "/contact" },
      { label: "Documents & Reports", href: "/documents" },
      { label: "Site directory", href: "/directory" },
    ],
  },
];

export const STATS = [
  { value: "1993", label: "In India since" },
  { value: "70+", label: "Countries in the group" },
  { value: "20+", label: "Manufacturing & bottling sites" },
  { value: "Top 2", label: "In Indian premium spirits" },
];
