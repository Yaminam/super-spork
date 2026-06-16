import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import { BRAND_BY_SLUG } from "@/content/brands-detail";
import sitemap from "@/content/sitemap.json";
import styles from "./directory.module.css";

export const metadata = {
  title: "Site Directory",
  description: "Every page of the Pernod Ricard site, mapped.",
};

const SECTION_LABELS: Record<string, string> = {
  brands: "Brands",
  brand: "Brands (new)",
  locations: "Locations & Brand Homes",
  media: "Newsroom & Media",
  "our-group": "Our Group",
  investors: "Investors",
  "sustainability-responsibility": "Sustainability & Responsibility",
  careers: "Careers",
  "": "General",
};

interface Entry { path: string; url: string; section: string; label: string; internal?: string }

function pretty(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function build(): { section: string; items: Entry[] }[] {
  const urls: string[] = (sitemap as { urls: string[] }).urls.filter((u) => /\/en(\/|$)/.test(u));
  const groups = new Map<string, Entry[]>();
  for (const url of urls) {
    const path = url.replace(/^https?:\/\/[^/]+/, "");
    const m = path.match(/^\/en\/?([^/?#]+)?(?:\/([^/?#]+))?/);
    const section = m?.[1] ?? "";
    const last = m?.[2] || m?.[1] || "Home";
    const isBrand = (section === "brands" || section === "brand") && m?.[2];
    const internal = isBrand && BRAND_BY_SLUG[m![2]] ? `/brands/${m![2]}` : undefined;
    const entry: Entry = { path, url, section, label: pretty(last), internal };
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section)!.push(entry);
  }
  return [...groups.entries()]
    .map(([section, items]) => ({ section, items: items.sort((a, b) => a.label.localeCompare(b.label)) }))
    .sort((a, b) => b.items.length - a.items.length);
}

export default function DirectoryPage() {
  const groups = build();
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageIntro
        index="08"
        eyebrow="Site Directory"
        title="Every page, mapped."
        lede={`A complete index of the site's ${total} pages. Brands link through to their detail page.`}
      />
      <section className="ll-section">
        <div className="ll-container">
          {groups.map((g) => (
            <details key={g.section} className={styles.group} open={g.items.length <= 40}>
              <summary className={styles.summary}>
                <span>{SECTION_LABELS[g.section] ?? pretty(g.section || "General")}</span>
                <span className={styles.count}>{g.items.length}</span>
              </summary>
              <ul className={styles.list}>
                {g.items.map((e) => (
                  <li key={e.path}>
                    {e.internal ? (
                      <Link href={e.internal} className={styles.link}>{e.label}</Link>
                    ) : (
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className={styles.linkExt}>
                        {e.label} <span aria-hidden>↗</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
