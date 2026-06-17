"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./Intro.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

/**
 * A short cinematic opening: the house mark fades up, a gold line draws, the
 * line "Light, held in glass" settles, then the curtain wipes up to reveal the
 * bottle. Skipped under reduced motion.
 */
export default function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 2300);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.overlay}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: WIPE }}
        >
          <div className={styles.inner}>
            <motion.div
              className={styles.mark}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pernod/00-logo.svg" alt="Pernod Ricard" style={{ width: "100%", height: "auto" }} />
            </motion.div>
            <motion.div
              className={styles.line}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
            />
            <motion.p
              className={styles.tag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: EASE }}
            >
              Light, held in glass
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
