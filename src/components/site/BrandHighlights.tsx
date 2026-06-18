"use client";

import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { BRAND_HIGHLIGHTS, type BrandHighlight } from "@/content/brand-highlights";
import styles from "./BrandHighlights.module.css";

const WINDOW = 6;

/** Deterministic rotating window of brands keyed off the route, so each page
 *  surfaces a different mix of the full portfolio (wraps around the list). */
function rotateForPath(path: string): BrandHighlight[] {
  let h = 0;
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
  const n = BRAND_HIGHLIGHTS.length;
  const start = h % n;
  return Array.from({ length: Math.min(WINDOW, n) }, (_, i) => BRAND_HIGHLIGHTS[(start + i) % n]);
}

/**
 * "Brands in focus" — a corporate portfolio band that surfaces each brand's real
 * product expressions (factual heritage/age-statement framing only). Pass an
 * explicit `items` set to pin the brands; otherwise it rotates per route so the
 * band differs from page to page.
 */
export default function BrandHighlights({
  eyebrow = "Brands in focus",
  title = "Flagship expressions across the portfolio.",
  intro,
  items,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: BrandHighlight[];
}) {
  const pathname = usePathname();
  const resolved = items ?? rotateForPath(pathname || "/");
  return (
    <section className={`ll-section ${styles.sec}`}>
      <div className="ll-container">
        <Reveal><p className="ll-eyebrow"><span>·</span> {eyebrow}</p></Reveal>
        <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>{title}</h2></Reveal>
        {intro && <Reveal delay={0.1}><p className={styles.intro}>{intro}</p></Reveal>}
        <ul className={styles.grid}>
          {resolved.map((b, i) => (
            <Reveal as="li" key={b.slug} className={styles.card} delay={(i % 2) * 0.06}>
              <div className={styles.cardHead}>
                {b.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={styles.logo} src={b.logo} alt={b.name} loading="lazy" />
                ) : (
                  <h3 className={styles.name}>{b.name}</h3>
                )}
                <span className={styles.since}>Since {b.since}</span>
                <span className={styles.meta}>{b.category} · {b.origin}</span>
              </div>
              <ul className={styles.products}>
                {b.products.map((p) => (
                  <li key={p.name} className={styles.product}>{p.name}</li>
                ))}
              </ul>
              {b.serve && (
                <p className={styles.serve}>
                  <span className={styles.serveLabel}>Best served</span>
                  {b.serve}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
