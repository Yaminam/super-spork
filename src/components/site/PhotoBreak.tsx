"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./PhotoBreak.module.css";

/**
 * A full-bleed brand image that parallaxes as you scroll past, with an optional
 * eyebrow + caption. Used as a cinematic break between content sections.
 */
export default function PhotoBreak({
  src,
  caption,
  eyebrow,
  alt = "",
}: {
  src: string;
  caption?: string;
  eyebrow?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className={styles.break}>
      <motion.div className={styles.media} style={{ y }}>
        <Image src={src} alt={alt} fill sizes="100vw" className={styles.img} />
      </motion.div>
      <div className={styles.shade} />
      {caption && (
        <div className={`ll-container ${styles.capWrap}`}>
          <p className={styles.caption}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}
