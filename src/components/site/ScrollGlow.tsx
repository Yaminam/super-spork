"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import styles from "./ScrollGlow.module.css";

/**
 * Ambient "light held in glass", a soft champagne glow that drifts across
 * the page as you scroll, so the dark fields lower down never feel static.
 * Screen-blended at very low opacity so it tints rather than washes out, and
 * sits below the nav. Fully disabled under prefers-reduced-motion.
 */
export default function ScrollGlow() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const y = useTransform(p, [0, 1], ["-10vh", "75vh"]);
  const x = useTransform(p, [0, 0.5, 1], ["10vw", "-12vw", "12vw"]);
  if (reduce) return null;
  return (
    <div className={styles.layer} aria-hidden>
      <motion.div className={styles.glow} style={{ y, x }} />
    </div>
  );
}
