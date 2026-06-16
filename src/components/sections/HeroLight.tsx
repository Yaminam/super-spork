"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient hero light: soft golden motes drifting upward like light through
 * liquid, plus a large warm glow that eases toward the cursor. Canvas 2D, ~54
 * sprites, featherweight and smooth. Freezes for reduced motion.
 */
export default function HeroLight() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0.5, y: 0.42, tx: 0.5, ty: 0.42 };

    type Mote = { x: number; y: number; r: number; s: number; o: number; hue: number };
    let motes: Mote[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: 54 }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(8, 46),
        s: rand(0.05, 0.3),
        o: rand(0.04, 0.2),
        hue: rand(36, 54),
      }));
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      const gx = mouse.x * w;
      const gy = mouse.y * h;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
      glow.addColorStop(0, "rgba(201,169,110,0.18)");
      glow.addColorStop(0.5, "rgba(120,72,30,0.06)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        if (!reduce) {
          m.y -= m.s;
          m.x += Math.sin((m.y + t * 0.02) * 0.005) * 0.16;
          if (m.y < -m.r) {
            m.y = h + m.r;
            m.x = rand(0, w);
          }
        }
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
        g.addColorStop(0, `hsla(${m.hue},75%,66%,${m.o})`);
        g.addColorStop(1, "hsla(40,70%,60%,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    function move(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(1, w);
      mouse.ty = (e.clientY - rect.top) / Math.max(1, h);
    }

    resize();
    window.addEventListener("resize", resize);
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", move);
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} aria-hidden style={{ width: "100%", height: "100%", display: "block" }} />;
}
