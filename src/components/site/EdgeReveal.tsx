"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scene entrance: the panel slides in from its own edge (left columns from the
 * left, right columns from the right) and fades up as it enters the viewport.
 * Honors reduced motion (fades only, no travel).
 */
export default function EdgeReveal({
  children,
  side = "left",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = reduce ? 0 : side === "left" ? -72 : 72;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
