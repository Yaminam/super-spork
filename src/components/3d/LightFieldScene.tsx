"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import LightField from "./LightField";
import WebGLGuard from "./WebGLGuard";

const FALLBACK = (
  <div
    aria-hidden
    style={{
      width: "100%",
      height: "100%",
      background:
        "radial-gradient(70% 60% at 50% 42%, rgba(200,120,44,0.25), transparent 60%), radial-gradient(120% 100% at 50% 40%, #0c0c12 0%, #050506 72%)",
    }}
  />
);

/** Lightweight fullscreen caustics hero. Renders only while on-screen. */
export default function LightFieldScene() {
  const [reduce, setReduce] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ width: "100%", height: "100%" }}>
      <WebGLGuard fallback={FALLBACK}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={reduce || !onScreen ? "never" : "always"}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <LightField reduce={reduce} />
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  );
}
