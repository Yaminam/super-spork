"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import Vessel from "./Vessel";
import WebGLGuard from "./WebGLGuard";
import { VesselFallback } from "./Fallbacks";

/** Client-only canvas hosting the Liquid Light vessel, with bloom.
 * Renders only while on-screen (and respects reduced motion) so it never
 * burns the GPU once scrolled past. */
export default function VesselScene() {
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
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = reduce || !onScreen ? "never" : "always";

  return (
    <div ref={wrap} style={{ width: "100%", height: "100%" }}>
      <WebGLGuard fallback={<VesselFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 38 }}
          dpr={[1, 1.5]}
          frameloop={frameloop}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Vessel reduce={reduce} />
            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.32} luminanceSmoothing={0.5} mipmapBlur radius={0.55} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  );
}
