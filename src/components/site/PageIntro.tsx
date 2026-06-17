import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import styles from "./PageIntro.module.css";

/** Spirit-hue accents, cycled by the page index so each page feels distinct. */
const ACCENTS = ["#c8812f", "#cfe0ea", "#e6a6a0", "#b5683a", "#8fae6a", "#e4d4a8"];

/**
 * Shared inner-page header: an oversized accent index, eyebrow, a drawing
 * accent rule, a large display title and lede, over a breathing accent glow.
 * The accent hue is derived from the index so every page reads as its own.
 */
export default function PageIntro({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  const accent = ACCENTS[(parseInt(index, 10) || 1) % ACCENTS.length];

  return (
    <header className={styles.intro} style={{ "--pi-accent": accent } as CSSProperties}>
      <div className={`ll-container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className={`ll-eyebrow ${styles.eyebrow}`}>
              <span>{index}</span> {eyebrow}
            </p>
          </Reveal>
          <span className={styles.rule} aria-hidden />
          <Reveal delay={0.05}>
            <h1 className={`ll-display ${styles.title}`}>{title}</h1>
          </Reveal>
        </div>
        {lede && (
          <Reveal delay={0.1} className={styles.right}>
            <p className={styles.lede}>{lede}</p>
          </Reveal>
        )}
      </div>
      <div className={styles.glow} aria-hidden />
    </header>
  );
}
