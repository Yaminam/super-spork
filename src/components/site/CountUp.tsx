"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animates the numeric part of a stat from zero when it scrolls into view, 
 * "1,400+" counts up, "Net zero" stays put. Non-numeric values and
 * reduced-motion render the final value immediately. Splits prefix/number/
 * suffix so units (+, %, lakh, #, Top) are preserved.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  // SSR + initial render show the REAL value (so crawlers/answer engines and
  // no-JS users see correct numbers); the count-up starts once in view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const [, prefix, raw, suffix] = match;
    const hasComma = raw.includes(",");
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const target = parseFloat(raw.replace(/,/g, ""));
    const fmt = (n: number) => {
      const s = decimals ? n.toFixed(decimals) : Math.round(n).toString();
      const grouped = hasComma ? Number(s).toLocaleString("en-IN") : s;
      return `${prefix}${grouped}${suffix}`;
    };
    const duration = 1100;
    let startTs: number | null = null;
    let frame = 0;
    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fmt(target * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
