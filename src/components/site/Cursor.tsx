"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

/**
 * Glass-of-liquor cursor: a small amber liquor glass follows the pointer (with
 * a precise hit dot), grows over interactive elements, and bursts a splash of
 * golden drops on click. Desktop (fine pointer) only; disabled under reduced
 * motion (native cursor stays).
 */
export default function Cursor() {
  const glass = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (glass.current) glass.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic], summary, input, label")) {
        glass.current?.classList.add(styles.active);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic], summary, input, label")) {
        glass.current?.classList.remove(styles.active);
      }
    };
    const splash = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        const d = document.createElement("div");
        d.className = styles.drop;
        document.body.appendChild(d);
        const size = 3.5 + Math.random() * 3;
        d.style.width = `${size}px`;
        d.style.height = `${size}px`;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed - 2;
        let px = e.clientX;
        let py = e.clientY;
        let life = 0;
        const max = 56;
        const tick = () => {
          life += 1;
          vy += 0.32;
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
    <>
      <div ref={dot} className={styles.dot} aria-hidden />
      <div ref={glass} className={styles.glass} aria-hidden>
        <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* glass */}
          <path d="M5 2 C5 11 7.6 15 11 15 C14.4 15 17 11 17 2 Z" fill="#3a2a12" />
          {/* amber liquor, sitting low */}
          <path d="M6.4 7.4 C7.2 12 9.1 14 11 14 C12.9 14 14.8 12 15.6 7.4 Z" fill="#c8812f" />
          {/* champagne rim */}
          <path d="M5 2 H17" stroke="#e9d9b0" strokeWidth="1" strokeLinecap="round" />
          {/* stem + foot */}
          <line x1="11" y1="15" x2="11" y2="28.5" stroke="#e9d9b0" strokeWidth="1.1" />
          <ellipse cx="11" cy="29.5" rx="5" ry="1.4" fill="#e9d9b0" />
        </svg>
      </div>
    </>
  );
}
