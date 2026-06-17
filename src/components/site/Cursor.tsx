"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

/**
 * Wine-glass cursor: a small glass follows the pointer; clicking bursts a
 * splash of wine droplets (gravity + fade). Desktop (fine pointer) only and
 * disabled under reduced motion — the native cursor stays in those cases.
 */
export default function Cursor() {
  const glass = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      if (glass.current) {
        glass.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -55%)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-magnetic], summary, input, label")) {
        glass.current?.classList.add(styles.active);
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-magnetic], summary, input, label")) {
        glass.current?.classList.remove(styles.active);
      }
    };

    // two drops dripping from the tipped lip on click
    const splash = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        const d = document.createElement("div");
        d.className = styles.drop;
        document.body.appendChild(d);
        const size = 3.5 + Math.random() * 2;
        d.style.width = `${size}px`;
        d.style.height = `${size}px`;
        let vx = (Math.random() - 0.4) * 0.7;
        let vy = 0.3; // start at rest, gravity takes over
        // spawn at the tipped lip (just above-right of the pointer)
        let px = e.clientX + 5 + i * 4;
        let py = e.clientY - 11;
        let life = 0;
        const max = 60;
        const tick = () => {
          life += 1;
          vy += 0.32; // gravity
          px += vx;
          py += vy;
          d.style.transform = `translate(${px - size / 2}px, ${py - size / 2}px)`;
          d.style.opacity = String(Math.max(0, 1 - life / max));
          if (life < max) requestAnimationFrame(tick);
          else d.remove();
        };
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", splash);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", splash);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={glass} className={styles.glass} aria-hidden>
      <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* elegant tulip bowl, deep glass */}
        <path d="M5 2 C5 11 7.6 15 11 15 C14.4 15 17 11 17 2 Z" fill="#430e1a" />
        {/* a measured pour of deep burgundy, sitting low */}
        <path d="M6.4 7.2 C7.2 12 9.1 14 11 14 C12.9 14 14.8 12 15.6 7.2 Z" fill="#6e1226" />
        {/* champagne rim */}
        <path d="M5 2 H17" stroke="#d8c79a" strokeWidth="1" strokeLinecap="round" />
        {/* slender stem + refined foot */}
        <line x1="11" y1="15" x2="11" y2="28.5" stroke="#d8c79a" strokeWidth="1.1" />
        <ellipse cx="11" cy="29.5" rx="5" ry="1.4" fill="#d8c79a" />
      </svg>
    </div>
  );
}
