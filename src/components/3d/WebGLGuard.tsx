"use client";

import React, { useEffect, useState } from "react";

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

class Boundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(e: unknown) {
    console.warn("[Liquid Light] WebGL scene failed; showing fallback.", e);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Render a WebGL scene only when a context is available; else a graceful fallback. */
export default function WebGLGuard({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => setOk(hasWebGL()), []);
  if (!ok) return <>{fallback}</>;
  return <Boundary fallback={fallback}>{children}</Boundary>;
}
