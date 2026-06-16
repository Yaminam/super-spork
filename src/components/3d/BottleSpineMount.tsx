"use client";

import dynamic from "next/dynamic";

// Client-only, code-split mount for the fixed bottle spine, so the heavy 3D
// bundle never blocks first paint and never runs on the server.
const BottleSpine = dynamic(() => import("./BottleSpine"), { ssr: false });

export default function BottleSpineMount() {
  return <BottleSpine />;
}
