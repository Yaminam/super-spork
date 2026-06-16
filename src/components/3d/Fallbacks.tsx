"use client";

import Image from "next/image";
import styles from "./Fallbacks.module.css";

/** Real flagship packshots, shown when WebGL is unavailable. */
const FALLBACK_BOTTLES = [
  { src: "/images/brands/royal-stag/01-750ml_eye_front_bottle-png.jpg", alt: "Royal Stag" },
  { src: "/images/brands/absolut/01-absolut_vodka_700ml_front_standard_trans.jpg", alt: "Absolut" },
  { src: "/images/brands/chivas/01-packshot_-_chivas-png.jpg", alt: "Chivas Regal" },
];

/** Brand-neutral fallback for the full-height bottle spine: a warm glow and the
 * house mark, no product depicted. */
export function SpineFallback() {
  return (
    <div className={styles.spine} aria-hidden>
      <div className={styles.spineGlow} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/pernod/00-logo.svg" alt="" className={styles.spineMark} />
    </div>
  );
}

export function BottlesFallback() {
  return (
    <div className={styles.row} aria-hidden>
      <div className={styles.rowGlow} />
      {FALLBACK_BOTTLES.map((b) => (
        <div key={b.alt} className={styles.shot}>
          <Image
            src={b.src}
            alt={b.alt}
            width={220}
            height={620}
            className={styles.shotImg}
            sizes="(max-width: 640px) 30vw, 220px"
          />
        </div>
      ))}
    </div>
  );
}

/** Pure-CSS lit vessel, shown when WebGL is unavailable. */
export function VesselFallback() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.glow} />
      <div className={styles.vessel}>
        <span className={styles.stopper} />
        <span className={styles.neck} />
        <span className={styles.body}>
          <span className={styles.shine} />
          <span className={styles.liquid} />
        </span>
      </div>
      <div className={styles.caustic} />
    </div>
  );
}
