import type { ReactNode } from "react";
import Link from "next/link";
import BottleSpine from "@/components/3d/BottleSpineMount";
import Intro from "@/components/site/Intro";
import Hero from "@/components/sections/Hero";
import EdgeReveal from "@/components/site/EdgeReveal";
import SceneOrb from "@/components/site/SceneOrb";
import CountUp from "@/components/site/CountUp";
import { BrandWall, OperationsSection, HeritageTimeline, ClosingCta } from "@/components/sections/HomeSections";
import { STATS } from "@/content/site";
import { WHAT_WE_STAND_FOR } from "@/content/india";
import styles from "./Home.module.css";

const PRINCIPLES = WHAT_WE_STAND_FOR.slice(0, 3);

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
    <>
      <Intro />

      {/* Hero journey: the bottle is the pinned signature, cap -> base, with a
          few editorial chapters flowing around it. */}
      <div className={styles.stage} data-spine-stage>
        <div className={styles.spineSticky}>
          <BottleSpine />
        </div>

        <div className={styles.flow}>
          <Hero />

          {/* The seal */}
          <section className="ll-section">
            <div className={`${styles.col} ${styles.colRight}`}>
              <SceneOrb color="rgba(200,122,44,0.5)" x="22%" />
              <EdgeReveal side="right" className={`${styles.colInner} ${styles.aAmber}`}>
                <Chapter index="02" anatomy="the seal">The house</Chapter>
                <p className={`ll-display ${styles.statement}`}>
                  A maker of premium spirits, building brands, livelihoods and trust in India.
                </p>
              </EdgeReveal>
            </div>
          </section>

          {/* The neck — key figures */}
          <section className="ll-section">
            <div className={`${styles.col} ${styles.colLeft}`}>
              <SceneOrb color="rgba(207,224,234,0.4)" x="78%" />
              <EdgeReveal side="left" className={`${styles.colInner} ${styles.aClear}`}>
                <Chapter index="03" anatomy="the neck">By the numbers</Chapter>
                <ul className={styles.figureList}>
                  {STATS.map((st) => (
                    <li className={styles.figure} key={st.label}>
                      <CountUp value={st.value} className={styles.figureVal} />
                      <span className={styles.figureLabel}>{st.label}</span>
                    </li>
                  ))}
                </ul>
              </EdgeReveal>
            </div>
          </section>

          {/* The shoulder — what we stand for */}
          <section className="ll-section">
            <div className={`${styles.col} ${styles.colRight}`}>
              <SceneOrb color="rgba(230,166,160,0.45)" x="22%" />
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

          {/* The body — sustainability (last chapter; bottle lands on its base) */}
          <section className="ll-section">
            <div className={`${styles.col} ${styles.colLeft}`}>
              <SceneOrb color="rgba(143,174,106,0.45)" x="78%" />
              <EdgeReveal side="left" className={`${styles.colInner} ${styles.aGreen}`}>
                <Chapter index="05" anatomy="the base">Sustainability</Chapter>
                <h2 className={styles.panelTitle}>Good times from a good place.</h2>
                <Link href="/sustainability" className={styles.cta}>Our 2030 roadmap <span aria-hidden>→</span></Link>
              </EdgeReveal>
            </div>
          </section>
        </div>
      </div>

      {/* Self-standing content sections — the bottle has released; these inform
          investors, media and talent. */}
      <BrandWall />
      <OperationsSection />
      <HeritageTimeline />
      <ClosingCta />
    </>
  );
}
