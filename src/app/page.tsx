import type { ReactNode } from "react";
import Link from "next/link";
import BottleSpine from "@/components/3d/BottleSpineMount";
import Hero from "@/components/sections/Hero";
import EdgeReveal from "@/components/site/EdgeReveal";
import CountUp from "@/components/site/CountUp";
import { STATS } from "@/content/site";
import { BRAND_DETAILS } from "@/content/brands-detail";
import { POSITIONING, WHAT_WE_STAND_FOR } from "@/content/india";
import styles from "./Home.module.css";

const PRINCIPLES = WHAT_WE_STAND_FOR.slice(0, 3);

const FLAGSHIPS = [
  "Royal Stag",
  "Blenders Pride",
  "Chivas Regal",
  "The Glenlivet",
  "Absolut",
  "Jameson",
];

/** A small index that names where you are on the bottle as you scroll down. */
function Chapter({ index, anatomy, children }: { index: string; anatomy: string; children: ReactNode }) {
  return (
    <p className={styles.chapterMark}>
      <span>{index}</span>
      <span>{children}</span>
      <span className={styles.anatomy} aria-hidden>· {anatomy}</span>
    </p>
  );
}

export default function HomePage() {
  return (
    <div className={styles.stage} data-spine-stage>
      <div className={styles.spineSticky}>
        <BottleSpine />
      </div>

      <div className={styles.flow}>
        <Hero />

        {/* The seal */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colRight}`}>
            <EdgeReveal side="right" className={`${styles.colInner} ${styles.aAmber}`}>
              <Chapter index="02" anatomy="the seal">The house</Chapter>
              <p className={`ll-display ${styles.statement}`}>{POSITIONING}</p>
            </EdgeReveal>
          </div>
        </section>

        {/* The neck — key figures */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colLeft}`}>
            <EdgeReveal side="left" className={`${styles.colInner} ${styles.aClear}`}>
              <Chapter index="03" anatomy="the neck">By the numbers</Chapter>
              <ul className={styles.figureList}>
                {STATS.map((s) => (
                  <li className={styles.figure} key={s.label}>
                    <CountUp value={s.value} className={styles.figureVal} />
                    <span className={styles.figureLabel}>{s.label}</span>
                  </li>
                ))}
              </ul>
            </EdgeReveal>
          </div>
        </section>

        {/* The shoulder — what we stand for */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colRight}`}>
            <EdgeReveal side="right" className={`${styles.colInner} ${styles.aRose}`}>
              <Chapter index="04" anatomy="the shoulder">Conviviality</Chapter>
              <h2 className={`${styles.panelTitle} ${styles.italic}`}>Créateurs de convivialité.</h2>
              <ul className={styles.principleList}>
                {PRINCIPLES.map((v, i) => (
                  <li className={styles.principle} key={v.title}>
                    <span className={styles.principleNo}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.principleName}>{v.title}</span>
                  </li>
                ))}
              </ul>
            </EdgeReveal>
          </div>
        </section>

        {/* The label — flagship brands */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colLeft}`}>
            <EdgeReveal side="left" className={`${styles.colInner} ${styles.aCopper}`}>
              <Chapter index="05" anatomy="the label">The brands</Chapter>
              <h2 className={styles.panelTitle}>Many houses, one light.</h2>
              <ul className={styles.brandList}>
                {FLAGSHIPS.map((name) => (
                  <li className={styles.brandItem} key={name}>
                    <span className={styles.brandName}>{name}</span>
                  </li>
                ))}
              </ul>
              <Link href="/brands" className={styles.cta}>All {BRAND_DETAILS.length}+ brands <span aria-hidden>→</span></Link>
            </EdgeReveal>
          </div>
        </section>

        {/* The body — sustainability */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colRight}`}>
            <EdgeReveal side="right" className={`${styles.colInner} ${styles.aGreen}`}>
              <Chapter index="06" anatomy="the body">Sustainability</Chapter>
              <h2 className={styles.panelTitle}>Good times from a good place.</h2>
              <Link href="/sustainability" className={styles.cta}>Our 2030 roadmap <span aria-hidden>→</span></Link>
            </EdgeReveal>
          </div>
        </section>

        {/* The base — closing */}
        <section className="ll-section">
          <div className={`${styles.col} ${styles.colLeft}`}>
            <EdgeReveal side="left" className={`${styles.colInner} ${styles.aAmber}`}>
              <Chapter index="07" anatomy="the base">Get in touch</Chapter>
              <h2 className={styles.panelTitle}>Let’s raise a glass.</h2>
              <p className={styles.panelLede}>
                Media, investors, partners and talent, all welcome.
              </p>
              <Link href="/contact" className={styles.cta}>Contact us <span aria-hidden>→</span></Link>
            </EdgeReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
