"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * The Liquid Light vessel, a slow, breathing decanter of glass and liquid.
 * Physical transmission with dispersion (light splits at the edges), an amber
 * liquid that shifts hue, and a soft caustic glow cast onto the stage below.
 * Motion is barely perceptible. Reduced motion freezes it to a lit still.
 */
const HUES = [
  new THREE.Color("#c87a2c"), // amber whisky
  new THREE.Color("#b5683a"), // copper cognac
  new THREE.Color("#e6a6a0"), // rosé
  new THREE.Color("#8fae6a"), // herbal green
  new THREE.Color("#cfe0ea"), // clear gin
];

export default function Vessel({ reduce = false }: { reduce?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const liquidMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const caustic = useRef<THREE.Mesh>(null);

  // Decanter silhouette (x = radius, y = height), wide shoulder, tapered neck.
  const glassGeo = useMemo(() => {
    const p: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.5),
      new THREE.Vector2(0.62, -1.5),
      new THREE.Vector2(0.78, -1.3),
      new THREE.Vector2(0.86, -0.9),
      new THREE.Vector2(0.84, -0.2),
      new THREE.Vector2(0.7, 0.35),
      new THREE.Vector2(0.4, 0.75),
      new THREE.Vector2(0.22, 1.05),
      new THREE.Vector2(0.2, 1.5),
      new THREE.Vector2(0.26, 1.62),
      new THREE.Vector2(0.26, 1.74),
      new THREE.Vector2(0.21, 1.8),
    ];
    return new THREE.LatheGeometry(p, 128);
  }, []);

  const liquidGeo = useMemo(() => {
    const p: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.44),
      new THREE.Vector2(0.58, -1.44),
      new THREE.Vector2(0.74, -1.25),
      new THREE.Vector2(0.8, -0.6),
      new THREE.Vector2(0.78, -0.05),
      new THREE.Vector2(0.0, -0.05),
    ];
    return new THREE.LatheGeometry(p, 128);
  }, []);

  // Generated radial caustic texture (no asset needed).
  const causticTex = useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,210,150,0.6)");
    g.addColorStop(0.4, "rgba(201,169,110,0.22)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      if (reduce) {
        group.current.rotation.y = 0.5;
        group.current.position.y = 0;
      } else {
        group.current.rotation.y += delta * 0.1;
        group.current.position.y = Math.sin(t * 0.5) * 0.04;
        group.current.rotation.x = state.pointer.y * 0.12;
        group.current.rotation.z = state.pointer.x * 0.06;
      }
    }

    // Liquid hue slowly travels the spectrum of the house.
    if (liquidMat.current) {
      const f = reduce ? 0 : (t * 0.05) % HUES.length;
      const i = Math.floor(f);
      const frac = f - i;
      const a = HUES[i % HUES.length];
      const b = HUES[(i + 1) % HUES.length];
      liquidMat.current.color.copy(a).lerp(b, frac);
      liquidMat.current.attenuationColor.copy(a).lerp(b, frac);
    }

    if (caustic.current && !reduce) {
      const s = 3 + Math.sin(t * 0.7) * 0.15;
      caustic.current.scale.set(s, s, s);
      (caustic.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 + Math.sin(t * 0.9) * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[5, 7, 4]} angle={0.4} penumbra={1} intensity={140} color="#fff3df" />
      <pointLight position={[-5, 1, -3]} intensity={35} color="#6b1535" />
      <pointLight position={[3, -3, 4]} intensity={22} color="#c9a96e" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.4} position={[0, 4, 3]} scale={[7, 5, 1]} color="#f5edd8" />
        <Lightformer form="rect" intensity={1.4} position={[-5, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[5, 6, 1]} color="#9ab4ff" />
        <Lightformer form="circle" intensity={1.8} position={[4, -2, 3]} scale={3.5} color="#e0a258" />
      </Environment>

      {/* caustic light cast on the stage below */}
      <mesh ref={caustic} position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={causticTex}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group ref={group} rotation={[0, 0.5, 0]}>
        {/* liquid */}
        <mesh geometry={liquidGeo}>
          <meshPhysicalMaterial
            ref={liquidMat}
            color="#c87a2c"
            roughness={0.18}
            transmission={0.55}
            thickness={1.4}
            ior={1.34}
            attenuationColor="#8a4516"
            attenuationDistance={0.7}
            emissive="#5a2c0a"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* glass */}
        <mesh geometry={glassGeo}>
          <MeshTransmissionMaterial
            resolution={256}
            samples={6}
            transmission={1}
            thickness={1.6}
            ior={1.5}
            dispersion={4}
            roughness={0.04}
            chromaticAberration={0.05}
            anisotropy={0.2}
            distortion={0.08}
            distortionScale={0.3}
            temporalDistortion={0.03}
            clearcoat={1}
            attenuationColor="#ffffff"
            attenuationDistance={3}
          />
        </mesh>

        {/* stopper */}
        <mesh position={[0, 1.92, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.5}
            ior={1.5}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </group>
    </>
  );
}
