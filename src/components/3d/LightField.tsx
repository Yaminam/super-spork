"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";

/**
 * "Liquid Light", a single fullscreen caustics shader: amber and champagne
 * light flowing through dark liquid. One draw call, no scene re-render, so it is
 * far cheaper than a transmission mesh. Freezes for reduced motion.
 */
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  void main() {
    float t = uTime * 0.12;
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uAspect;
    p *= 3.2;

    // flowing domain warp -> caustic web
    for (int i = 1; i < 6; i++) {
      float fi = float(i);
      p.x += 0.32 / fi * sin(fi * 2.2 * p.y + t * 1.3 + fi);
      p.y += 0.30 / fi * cos(fi * 2.0 * p.x + t * 1.1 + fi);
    }
    float web = 0.5 + 0.5 * sin(p.x + p.y);
    float caustic = pow(web, 2.6);

    // light pools toward upper-centre
    float d = length((uv - vec2(0.5, 0.46)) * vec2(uAspect, 1.0));
    float glow = smoothstep(1.0, 0.0, d);
    float lum = caustic * (0.30 + 0.70 * glow);

    vec3 obsidian = vec3(0.020, 0.021, 0.030);
    vec3 amber = vec3(0.80, 0.46, 0.16);
    vec3 champ = vec3(0.96, 0.86, 0.62);
    vec3 col = mix(obsidian, amber, clamp(lum * 1.25, 0.0, 1.0));
    col = mix(col, champ, clamp(pow(lum, 3.0) * 0.85, 0.0, 1.0));

    // soft vignette
    col *= smoothstep(1.35, 0.2, length((uv - 0.5) * vec2(uAspect, 1.0)));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LightField({ reduce = false }: { reduce?: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAspect: { value: 1 } }),
    []);

  useFrame((state) => {
    if (!mat.current) return;
    if (!reduce) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mat.current.uniforms.uAspect.value = state.size.width / Math.max(1, state.size.height);
  });

  return (
    <ScreenQuad>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </ScreenQuad>
  );
}
