"use client";

import { useMemo } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export interface BottleSpec {
  /** key (for React keys / a11y) */
  slug: string;
  /** display name */
  name: string;
  /** logo (SVG or PNG) etched onto the front of the glass */
  logo: string;
  /** liquid surface tint */
  liquid: string;
  /** liquid volume attenuation (deeper = darker through the body) */
  attenuation: string;
}

/** Load an SVG/PNG into a transparent canvas texture (TextureLoader can't be
 * relied on for SVG). White artwork is kept white; we tint it via the material. */
function useArtTexture(src: string, w = 1536, h = 768) {
  return useMemo(() => {
    const tex = new THREE.Texture();
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    if (typeof document === "undefined") return tex;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const scale = Math.min(w / img.width, h / img.height) * 0.96;
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      tex.image = c;
      tex.needsUpdate = true;
    };
    img.src = src;
    return tex;
  }, [src, w, h]);
}

/**
 * A realistic, brand-neutral glass bottle wearing the Pernod Ricard house mark
 * etched in gold across the centre of the body. No product is depicted. The
 * mark turns with the bottle, so the spin reads as you scroll.
 */
export default function Bottle({ spec }: { spec: BottleSpec }) {
  // Whisky-bottle silhouette (x = radius, y = height).
  const glassGeo = useMemo(() => {
    const p: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.56),
      new THREE.Vector2(0.34, -1.56),
      new THREE.Vector2(0.46, -1.52),
      new THREE.Vector2(0.52, -1.46),
      new THREE.Vector2(0.53, -1.4),
      new THREE.Vector2(0.53, 0.5),
      new THREE.Vector2(0.52, 0.62),
      new THREE.Vector2(0.48, 0.78),
      new THREE.Vector2(0.4, 0.94),
      new THREE.Vector2(0.28, 1.08),
      new THREE.Vector2(0.2, 1.2),
      new THREE.Vector2(0.18, 1.3),
      new THREE.Vector2(0.18, 1.74),
      new THREE.Vector2(0.205, 1.78),
      new THREE.Vector2(0.205, 1.86),
      new THREE.Vector2(0.17, 1.9),
    ];
    return new THREE.LatheGeometry(p, 160);
  }, []);

  const liquidGeo = useMemo(() => {
    const p: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.48),
      new THREE.Vector2(0.46, -1.48),
      new THREE.Vector2(0.49, -1.4),
      new THREE.Vector2(0.49, 0.62),
      new THREE.Vector2(0.0, 0.62),
    ];
    return new THREE.LatheGeometry(p, 160);
  }, []);

  const art = useArtTexture(spec.logo);

  const labelArc = 1.85; // wider wrap so the bigger mark reads
  const labelStart = -labelArc / 2; // centre the band on +Z (the front face)

  return (
    <group>
      {/* liquid volume — deep, refractive, faint inner glow */}
      <mesh geometry={liquidGeo}>
        <meshPhysicalMaterial
          color={spec.liquid}
          roughness={0.08}
          transmission={0.72}
          thickness={2.2}
          ior={1.38}
          attenuationColor={spec.attenuation}
          attenuationDistance={0.42}
          specularIntensity={1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive={spec.attenuation}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* liquid surface meniscus */}
      <mesh position={[0, 0.61, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.49, 64]} />
        <meshBasicMaterial color={spec.liquid} transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* glass shell — double-pass refraction, dispersion, faint cool tint */}
      <mesh geometry={glassGeo}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          resolution={512}
          samples={12}
          transmission={1}
          thickness={0.9}
          ior={1.5}
          dispersion={2.6}
          roughness={0.018}
          chromaticAberration={0.05}
          anisotropy={0.12}
          distortion={0.03}
          distortionScale={0.18}
          temporalDistortion={0.015}
          clearcoat={1}
          clearcoatRoughness={0.02}
          attenuationColor="#e8f0ea"
          attenuationDistance={4}
        />
      </mesh>

      {/* subtle light patch so the dark mark always has contrast (never
          camouflages against the dark glass), turning with the bottle */}
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.552, 0.552, 0.74, 96, 1, true, labelStart - 0.06, labelArc + 0.12]} />
        <meshStandardMaterial
          color="#efe7d2"
          roughness={0.8}
          metalness={0}
          transparent
          opacity={0.82}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* house mark, dark on the light patch; turns with the bottle so it
          sweeps left -> right as you scroll */}
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.557, 0.557, 0.64, 96, 1, true, labelStart, labelArc]} />
        <meshStandardMaterial
          map={art}
          color="#15100a"
          transparent
          roughness={0.6}
          metalness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* thin gold rules framing the label, top + bottom */}
      {[0.52, -0.18].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.554, 0.554, 0.012, 96, 1, true, labelStart - 0.06, labelArc + 0.12]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.3} metalness={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* screw cap: gold seal ring + knurled grip + domed top */}
      <mesh position={[0, 1.41, 0]}>
        <cylinderGeometry args={[0.216, 0.216, 0.05, 56]} />
        <meshStandardMaterial color="#caa86a" metalness={1} roughness={0.26} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 1.66, 0]}>
        <cylinderGeometry args={[0.214, 0.214, 0.46, 22]} />
        <meshStandardMaterial color="#9d8551" metalness={1} roughness={0.42} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, 1.89, 0]}>
        <sphereGeometry args={[0.214, 44, 22, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#cdb887" metalness={1} roughness={0.24} envMapIntensity={1.4} />
      </mesh>
    </group>
  );
}
