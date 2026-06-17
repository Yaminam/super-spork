"use client";

import { useRef } from "react";

/**
 * Magnetic hover: the wrapped element subtly pulls toward the cursor while
 * hovered, then springs back. Skipped where hover/fine-pointer isn't available.
 */
export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: "inline-block", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
