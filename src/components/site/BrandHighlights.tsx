import Reveal from "./Reveal";
import { FEATURED_HIGHLIGHTS, type BrandHighlight } from "@/content/brand-highlights";
import styles from "./BrandHighlights.module.css";

/**
 * "Brands in focus" — a corporate portfolio band that surfaces each brand's real
 * product expressions (factual heritage/age-statement framing only). Reusable:
 * pass a curated `items` subset and custom copy per page.
 */
export default function BrandHighlights({
  eyebrow = "Brands in focus",
  title = "Flagship expressions across the portfolio.",
  intro,
  items = FEATURED_HIGHLIGHTS,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: BrandHighlight[];
}) {
  return (
    <section className={`ll-section ${styles.sec}`}>
      <div className="ll-container">
        <Reveal><p className="ll-eyebrow"><span>·</span> {eyebrow}</p></Reveal>
        <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>{title}</h2></Reveal>
        {intro && <Reveal delay={0.1}><p className={styles.intro}>{intro}</p></Reveal>}
        <ul className={styles.grid}>
          {items.map((b, i) => (
            <Reveal as="li" key={b.slug} className={styles.card} delay={(i % 2) * 0.06}>
              <div className={styles.cardHead}>
                {b.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={styles.logo} src={b.logo} alt={b.name} loading="lazy" />
                ) : (
                  <h3 className={styles.name}>{b.name}</h3>
                )}
                <span className={styles.since}>Since {b.since}</span>
                <span className={styles.meta}>{b.name} · {b.category} · {b.origin}</span>
              </div>
              <p className={styles.line}>{b.line}</p>
              <ul className={styles.products}>
                {b.products.map((p) => (
                  <li key={p.name} className={styles.product}>
                    <span className={styles.pName}>{p.name}</span>
                    <span className={styles.pNote}>{p.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
