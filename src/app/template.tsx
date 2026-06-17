"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./template.module.css";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Route transition: re-mounts on every navigation. A gold-edged curtain wipes
 * up to reveal the new page, and its content fades in behind it. Skipped on the
 * home route (the Intro handles that) and under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduce = useReducedMotion();
  const home = path === "/";

  if (reduce) return <>{children}</>;

  return (
    <>
      {!home && (
        <motion.div
          className={styles.sweep}
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "top" }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: home ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: home ? 0 : 0.28, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
