"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO } from "@/content/pernod-portfolio";
import styles from "./BrandSpotlight.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A slow spotlight on the right of the hero that cycles through all brands,
 * one lit at a time. Decorative (the full index lives at /brands); pauses for
 * reduced motion on the first brand.
 */
export default function BrandSpotlight() {
  const brands = PORTFOLIO;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % brands.length), 2200);
    return () => clearInterval(id);
  }, [brands.length]);

  const b = brands[i];

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={b.name}
            className={styles.card}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className={styles.glow} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt="" className={styles.logo} />
            <span className={styles.name}>{b.name}</span>
            <span className={styles.cat}>{b.category}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
