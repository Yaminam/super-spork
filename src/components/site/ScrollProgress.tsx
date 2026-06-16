"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import styles from "./ScrollProgress.module.css";

/** A thin gold line that fills as you read down the page, a quiet sense of
 * journey. Disabled under prefers-reduced-motion. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  if (reduce) return null;
  return <motion.div className={styles.bar} style={{ scaleX }} aria-hidden />;
}
