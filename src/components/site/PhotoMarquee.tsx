"use client";

import Image from "next/image";
import styles from "./PhotoMarquee.module.css";

/** Brand lifestyle photos, drifting continuously (imagery (c) Pernod Ricard /
 * brand owners, design comp only). */
const ITEMS = [
  { src: "/images/brands/royal-stag/25-brand-royal-stag-barrel-select-lifestyle.jpg", label: "Royal Stag" },
  { src: "/images/brands/blenders-pride/24-brand-blenders-pride-rare-premium-whisky.jpg", label: "Blenders Pride" },
  { src: "/images/brands/chivas/25-previewlarge-chivas-20socialassets-20-20.jpg", label: "Chivas Regal" },
  { src: "/images/brands/absolut/25-originalsizejpeg-absolut_atlas_lifestyle.jpg", label: "Absolut" },
  { src: "/images/brands/jameson/26-brand-jameson-black-barrel-lifestyle-ori.jpg", label: "Jameson" },
  { src: "/images/brands/the-glenlivet/26-image-201-jpg.jpg", label: "The Glenlivet" },
  { src: "/images/brands/beefeater/26-brand-beefeater-24-lifestyle-original-jp.jpg", label: "Beefeater" },
];

export default function PhotoMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.viewport} aria-label="Brands">
      <div className={`${styles.track} ${styles.driftL}`}>
        {loop.map((it, i) => (
          <figure className={styles.cell} key={`${it.label}-${i}`}>
            <Image src={it.src} alt={it.label} fill sizes="340px" className={styles.img} loading="lazy" />
            <figcaption className={styles.cap}>{it.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
