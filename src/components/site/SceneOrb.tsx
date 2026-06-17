"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * A soft, blurred colour glow that parallaxes vertically as its section moves
 * through the viewport — a background depth layer that drifts at a different
 * speed than the copy and the bottle. Decorative only.
 */
export default function SceneOrb({
  color,
  x = "50%",
  size = 72,
  speed = 24,
}: {
  color: string;
  x?: string;
  size?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0vh", "0vh"] : [`${speed}vh`, `${-speed}vh`],
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", y }}
    >
      <div
        style={{
          position: "absolute",
          left: x,
          top: "50%",
          width: `${size}vh`,
          height: `${size}vh`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
          filter: "blur(46px)",
          opacity: 0.72,
        }}
      />
    </motion.div>
  );
}
