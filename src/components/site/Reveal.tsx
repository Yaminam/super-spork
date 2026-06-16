"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  span: motion.span,
} as const;

/** Quiet scroll-reveal: fade + rise, once. (No blur, it could linger on
 * large elements that never cross a high visibility threshold.)
 * `as` lets the animated wrapper BE the semantic element (e.g. a list item),
 * so it can sit directly inside <ul>/<ol> without breaking list semantics. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
