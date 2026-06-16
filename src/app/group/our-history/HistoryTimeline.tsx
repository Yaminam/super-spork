"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import styles from "./history.module.css";

export interface Milestone {
  year: string;
  title: string;
  text: string;
  img?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const itemV = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const dotV = {
  hidden: { scale: 0.3, opacity: 0.25 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/**
 * A scroll-driven, illuminated timeline: a central rail that a gold beam
 * fills as you read down, with a glowing node lighting up at each milestone
 * and cards alternating left/right. Reduced-motion shows it fully lit and
 * static.
 */
export default function HistoryTimeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={styles.track}>
      <span className={styles.rail} aria-hidden />
      <motion.span
        className={styles.railFill}
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      <ol className={styles.timeline}>
        {items.map((m, i) => (
          <motion.li
            key={m.year + i}
            className={`${styles.beat} ${i % 2 === 0 ? styles.left : styles.right}`}
            variants={reduce ? undefined : itemV}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.45 }}
          >
            <motion.span className={styles.node} aria-hidden variants={reduce ? undefined : dotV} />
            <div className={styles.card}>
              <span className={styles.year}>{m.year}</span>
              <h2 className={styles.beatTitle}>{m.title}</h2>
              <p className={styles.beatText}>{m.text}</p>
              {m.img && (
                <span className={styles.beatImg}>
                  <Image src={m.img} alt={m.title} fill sizes="(max-width: 900px) 100vw, 460px" />
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
