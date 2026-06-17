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

    // wine splash on click
    const splash = (e: MouseEvent) => {
      const n = 14;
      for (let i = 0; i < n; i++) {
        const d = document.createElement("div");
        d.className = styles.drop;
        document.body.appendChild(d);
        const size = 4 + Math.random() * 6;
        d.style.width = `${size}px`;
        d.style.height = `${size}px`;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed - 3.5; // burst upward first
        let px = e.clientX;
        let py = e.clientY - 6;
        let life = 0;
        const max = 42;
        const tick = () => {
          life += 1;
          vy += 0.42; // gravity
          px += vx;
          py += vy;
          d.style.transform = `translate(${px - size / 2}px, ${py - size / 2}px)`;
          d.style.opacity = String(Math.max(0, 1 - life / max));
          if (life < max) requestAnimationFrame(tick);
          else d.remove();
        };
        requestAnimationFrame(tick);
      }
      // a quick squash on the glass
      if (glass.current) {
        glass.current.animate(
          [{ transform: glass.current.style.transform + " scale(0.8)" }, { transform: glass.current.style.transform + " scale(1)" }],
          { duration: 220, easing: "ease-out" },
        );
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
      <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* bowl + wine */}
        <path d="M4.5 2 H21.5 C21.5 11.5 17.5 16 13 16 C8.5 16 4.5 11.5 4.5 2 Z" fill="#7c1228" />
        <path d="M6 6 H20 C19.2 12 16.2 14.4 13 14.4 C9.8 14.4 6.8 12 6 6 Z" fill="#a8243f" />
        {/* rim */}
        <path d="M4.5 2 H21.5" stroke="#e9d9b0" strokeWidth="1.4" strokeLinecap="round" />
        {/* stem + foot */}
        <line x1="13" y1="16" x2="13" y2="30" stroke="#e9d9b0" strokeWidth="1.5" />
        <ellipse cx="13" cy="31" rx="6.5" ry="1.8" fill="#e9d9b0" />
      </svg>
    </div>
  );
}
