import { JsonLd, faqSchema } from "@/lib/seo/jsonld";
import type { Faq } from "@/content/india";
import Reveal from "./Reveal";
import styles from "./Faq.module.css";

/**
 * Answer-ready FAQ (§9 GEO/AEO). Server-rendered with native <details> so it
 * works without JS and is keyboard/screen-reader friendly, and emits FAQPage
 * structured data so answer engines can quote it directly.
 */
export default function Faq({
  items,
  title = "Frequently asked questions",
  eyebrow = "Answers",
  index = "·",
  emitSchema = true,
}: {
  items: Faq[];
  title?: string;
  eyebrow?: string;
  index?: string;
  emitSchema?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section className={`ll-section ${styles.sec}`} aria-labelledby="faq-title">
      {emitSchema && <JsonLd id="ld-faq" data={faqSchema(items)} />}
      <div className="ll-container">
        <Reveal>
          <p className="ll-eyebrow">
            <span>{index}</span> {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="faq-title" className={`ll-display ${styles.title}`}>{title}</h2>
        </Reveal>
        <div className={styles.list}>
          {items.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 0.04}>
              <details className={styles.item}>
                <summary className={styles.q}>
                  <span>{f.q}</span>
                  <span className={styles.icon} aria-hidden>+</span>
                </summary>
                <p className={styles.a}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
