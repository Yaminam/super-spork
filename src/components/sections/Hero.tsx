"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "@/components/site/Magnetic";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * First panel of the home page. Its reveal is timed to begin as the intro
 * curtain lifts (~2.3s), so the headline appears with the bottle rather than
 * animating unseen behind the overlay. Instant under reduced motion.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const B = reduce ? 0 : 2.3; // begin as the intro curtain wipes away

  return (
    <section className={styles.hero} aria-labelledby="hero-heading" data-snap>
      <div className={styles.content}>
        <motion.p
          className="ll-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: B, ease: EASE }}
        >
          <span>01</span> Créateurs de convivialité, since 1805
        </motion.p>

        <h1 id="hero-heading" className={`ll-display ${styles.headline}`}>
          <Word delay={B + 0.25}>Light,</Word>{" "}
          <Word delay={B + 0.45}>held</Word>{" "}
          <Word delay={B + 0.65}>in</Word>{" "}
          <Word delay={B + 0.85} accent>
            glass.
          </Word>
        </h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: B + 1.1, ease: EASE }}
        >
          A maker of premium spirits in India, seen through the light its craft holds.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: B + 1.35, ease: EASE }}
        >
          <Magnetic><Link href="/brands" className={styles.ctaPrimary}>Explore our brands</Link></Magnetic>
          <Magnetic><Link href="/group/our-history" className={styles.ctaGhost}>Our story <span aria-hidden>→</span></Link></Magnetic>
        </motion.div>
      </div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: B + 1.6, ease: EASE }}
        aria-hidden
      >
        <span>Pour</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}

function Word({ children, delay, accent }: { children: string; delay: number; accent?: boolean }) {
  return (
    <span className={styles.wordWrap}>
      <motion.span
        className={accent ? `${styles.word} ${styles.accent}` : styles.word}
        initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
