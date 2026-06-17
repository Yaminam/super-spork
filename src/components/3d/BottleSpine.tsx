"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Bottle, { BottleSpec } from "./Bottle";
import WebGLGuard from "./WebGLGuard";
import { SpineFallback } from "./Fallbacks";

/** Brand-neutral centerpiece: a glass vessel wearing the Pernod Ricard house
 * mark. No product is depicted (corporate site, non-promotional). */
const HOUSE: BottleSpec = {
  slug: "pernod-ricard",
  name: "Pernod Ricard",
  logo: "/images/pernod/00-logo.svg",
  liquid: "#c8812f",
  attenuation: "#5e2f0c",
};

// Tall on purpose: the bottle stands taller than the viewport so scrolling
// travels down it. The pan (group.position.y) goes from "cap framed at the
// top" (scroll 0) to "base framed at the bottom" (scroll 1), and the bottle
// grows from SCALE_TOP to SCALE_BASE so it's biggest as it lands on the base.
// TRAVEL bounds are derived so each end frames correctly at its own scale:
//   top:    halfH - capTop*SCALE_TOP   (halfH≈1.835, capTop≈1.95)
//   bottom: -halfH - base*SCALE_BASE   (base≈-1.56)
// Taller than the viewport so scrolling travels down it: cap framed at the top
// (scroll 0), base framed just above the footer (scroll 1, when the stage
// releases). Derived for SPINE_SCALE:
//   top:    halfH - capTop*S   (halfH≈1.835, capTop≈1.9)
//   bottom: -halfH - base*S    (base≈-1.56)
const SPINE_SCALE = 1.5;
const TRAVEL_TOP = -1.02;
// base reaches down to the last (Contact us) scene, settling just above the
// footer — low enough to align with the content, high enough not to be covered
const TRAVEL_BOTTOM = 1.0;

// scroll sweep: mark starts in the left corner at the top and turns across to
// the right corner by the bottom (±~63°)
const SPIN_SWING = 2.2;

/** Animated rig: scroll pans, grows and rotates the bottle. No auto motion —
 * everything is driven by scroll position and eased so it settles when idle. */
function Spine({
  scrollRef,
  reduce,
}: {
  scrollRef: MutableRefObject<number>;
  reduce: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    if (reduce) {
      // Whole bottle, centered and still.
      g.position.y = -0.2;
      g.scale.setScalar(1.0);
      g.rotation.y = 0;
      return;
    }
    const p = scrollRef.current;
    // track the scroll closely so the descent feels connected, not laggy
    const ty = THREE.MathUtils.lerp(TRAVEL_TOP, TRAVEL_BOTTOM, p);
    g.position.y = THREE.MathUtils.lerp(g.position.y, ty, 0.18);
    // turns with scroll: mark sweeps from the left (top) to the right (bottom)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, (p - 0.5) * SPIN_SWING, 0.18);
  });

  return (
    <group ref={group} scale={reduce ? 1.0 : SPINE_SCALE} position={[0, reduce ? -0.2 : TRAVEL_TOP, 0]}>
      <Bottle spec={HOUSE} />
    </group>
  );
}

/**
 * One large bottle pinned full-height behind the whole home page. Scrolling
 * travels down it, cap to base; content flows around it left and right. Fixed +
 * pointer-events:none so the page stays interactive. A still, whole-bottle view
 * under reduced motion; paused when the tab is hidden.
 */
export default function BottleSpine() {
  const [reduce, setReduce] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const scroll = useRef(0);
  const backdrop = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    // pause the canvas once the bottle stage scrolls out of view (lower
    // sections) so the heavy glass stops rendering when it's not visible
    let io: IntersectionObserver | undefined;
    if (wrap.current) {
      io = new IntersectionObserver(
        ([e]) => setOnScreen(e.isIntersecting),
        { threshold: 0.01 },
      );
      io.observe(wrap.current);
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Map progress to the pinned stage, not the whole document, so the
        // bottle reaches its base exactly as the stage releases (and the
        // footer scrolls up). progress 0 = stage top at viewport top;
        // progress 1 = stage bottom at viewport bottom (sticky lets go).
        const stage = document.querySelector<HTMLElement>("[data-spine-stage]");
        if (stage) {
          const range = stage.offsetHeight - window.innerHeight;
          const scrolled = -stage.getBoundingClientRect().top;
          scroll.current = range > 0 ? Math.min(1, Math.max(0, scrolled / range)) : 0;
        } else {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          scroll.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        }
        // spirit-hue wash: the studio glow travels amber -> copper -> gold ->
        // steel -> green as you descend (cheap DOM style set, no re-render)
        if (backdrop.current) {
          const stops = [
            [201, 150, 86], [176, 95, 55], [201, 169, 110], [128, 150, 182], [120, 152, 96],
          ];
          const f = scroll.current * (stops.length - 1);
          const i = Math.min(Math.floor(f), stops.length - 2);
          const t = f - i;
          const a = stops[i], b = stops[i + 1];
          const r = Math.round(a[0] + (b[0] - a[0]) * t);
          const g = Math.round(a[1] + (b[1] - a[1]) * t);
          const bl = Math.round(a[2] + (b[2] - a[2]) * t);
          backdrop.current.style.background =
            `radial-gradient(42% 62% at 50% 46%, rgba(${r},${g},${bl},0.5), rgba(${Math.round(r * 0.55)},${Math.round(g * 0.45)},${Math.round(bl * 0.4)},0.2) 44%, rgba(8,7,9,0) 68%),` +
            ` radial-gradient(70% 40% at 50% 50%, rgba(150,120,200,0.1), transparent 60%)`;
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // render only when the bottle is actually visible, awake, and motion is on
  const frameloop = hidden || !onScreen || reduce ? "never" : "always";

  return (
    <div ref={wrap} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* studio backdrop: a warm glow column the bottle stands in, so it never
       * floats in a flat void (the look award bottle sites share) */}
      <div
        ref={backdrop}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(42% 62% at 50% 46%, rgba(201,150,86,0.5), rgba(110,68,34,0.2) 44%, rgba(8,7,9,0) 68%), radial-gradient(70% 40% at 50% 50%, rgba(150,120,200,0.1), transparent 60%)",
        }}
      />
      <WebGLGuard fallback={<SpineFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 32 }}
          dpr={[1, 1.5]}
          frameloop={frameloop}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight position={[5, 9, 6]} angle={0.5} penumbra={1} intensity={120} color="#fff3df" />
            {/* warm key from front-left, cool rim from back-right */}
            <pointLight position={[-6, 1, -3]} intensity={28} color="#7a1c3a" />
            <pointLight position={[5, -2, 5]} intensity={20} color="#c9a96e" />
            <pointLight position={[0, 2, -6]} intensity={34} color="#cfe0ff" />

            <Environment resolution={256}>
              {/* tall narrow softbox -> a soft vertical highlight on the glass */}
              <Lightformer form="rect" intensity={2.4} position={[1.2, 0, 5]} scale={[0.7, 12, 1]} color="#fff6e6" />
              <Lightformer form="rect" intensity={1.6} position={[-2.4, 1, 4]} scale={[0.4, 10, 1]} color="#dfe7ff" />
              <Lightformer form="rect" intensity={1.6} position={[0, 7, 5]} scale={[9, 5, 1]} color="#f7efda" />
              <Lightformer form="rect" intensity={1.1} position={[-6, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[6, 12, 1]} color="#aebfe0" />
              <Lightformer form="rect" intensity={1.1} position={[6, 0, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 12, 1]} color="#f0c98a" />
              <Lightformer form="circle" intensity={1.4} position={[0, -5, 4]} scale={5} color="#e0a258" />
            </Environment>

            <Spine scrollRef={scroll} reduce={reduce} />

            {/* ambient gold light motes drifting at depth (premium parallax) */}
            <Sparkles count={55} scale={[9, 13, 6]} size={5} speed={0.4} noise={0.5} color="#e8d6a0" opacity={0.85} />
            <Sparkles count={18} scale={[6, 11, 4]} size={9} speed={0.28} noise={0.3} color="#fff1d6" opacity={0.6} />

            <EffectComposer multisampling={0}>
              <Bloom intensity={0.3} luminanceThreshold={0.8} luminanceSmoothing={0.7} mipmapBlur radius={0.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </WebGLGuard>

      {/* edge vignette: darkens left/right where copy floats, keeps the centre
       * bright, and frames the bottle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,5,6,0.74) 0%, rgba(5,5,6,0) 30%, rgba(5,5,6,0) 70%, rgba(5,5,6,0.74) 100%)",
        }}
      />
    </div>
  );
}
