"use client";

import { useEffect } from "react";
import styles from "./Cursor.module.css";

/**
 * Keeps the native cursor (reliable, precise clicking) and adds a wine-drop
 * splash on click. Desktop (fine pointer) only and skipped under reduced
 * motion. No floating cursor element, so clicks always land where you point.
 */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

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

    window.addEventListener("mousedown", splash);
    return () => window.removeEventListener("mousedown", splash);
  }, []);

  return null;
}
