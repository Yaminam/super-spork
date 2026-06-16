"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Global smooth scroll (Lenis). Drives the native window scroll, so scroll-
 * linked components (the bottle spine, ScrollProgress) keep working. Disabled
 * under prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.14, smoothWheel: true, wheelMultiplier: 1, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
