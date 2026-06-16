"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * First panel of the home page. The bottle itself is the fixed full-height
 * spine (BottleSpine, mounted once in the page); this is the editorial intro
 * that sits to its left.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.content}>
        <motion.p
          className="ll-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <span>01</span> Créateurs de convivialité, since 1805
        </motion.p>

        <h1 id="hero-heading" className={`ll-display ${styles.headline}`}>
          <Word delay={0.6}>Light,</Word>{" "}
          <Word delay={0.85}>held</Word>{" "}
          <Word delay={1.1}>in</Word>{" "}
          <Word delay={1.35} accent>
            glass.
          </Word>
        </h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7, ease: EASE }}
        >
          A maker of premium spirits in India, seen through the light its craft holds.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0, ease: EASE }}
        >
          <Link href="/brands" className={styles.ctaPrimary}>Explore the brands</Link>
          <Link href="/group/our-history" className={styles.ctaGhost}>Our story <span aria-hidden>→</span></Link>
        </motion.div>
      </div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: EASE }}
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
