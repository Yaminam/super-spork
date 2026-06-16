import Image from "next/image";
import Reveal from "./Reveal";
import type { PageContent } from "@/content/pages";
import styles from "./ContentPage.module.css";

/**
 * Renders an extracted corporate page: lit hero, stats, and an editorial flow
 * of the page's own headings, lead copy and imagery. Links back to the source.
 */
export default function ContentPage({ page, index }: { page: PageContent; index: string }) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        {page.hero ? (
          <Image className={styles.heroImg} src={page.hero} alt={page.title} fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal>
            <p className="ll-eyebrow"><span>{index}</span> Pernod Ricard</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className={`ll-display ${styles.title}`}>{page.title}</h1>
          </Reveal>
          {page.description && (
            <Reveal delay={0.1}>
              <p className={styles.lede}>{page.description}</p>
            </Reveal>
          )}
        </div>
      </header>

      {page.stats.length > 0 && (
        <section className={styles.statsBand}>
          <div className={`ll-container ${styles.statsRow}`}>
            {page.stats.map((s, i) => (
              <Reveal key={`${s.label}-${i}`} delay={i * 0.05}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className={`ll-section ${styles.flow}`}>
        <div className="ll-container">
          {page.blocks.map((b, i) => {
            if (b.t === "img") {
              return (
                <Reveal key={i} className={styles.figure}>
                  <Image src={b.v} alt={b.alt || ""} fill sizes="(max-width: 900px) 100vw, 900px" />
                </Reveal>
              );
            }
            if (b.t === "h") {
              return (
                <Reveal key={i}>
                  <h2 className={b.level <= 2 ? styles.h2 : styles.h3}>{b.v}</h2>
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <p className={styles.body}>{b.v}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </article>
  );
}
