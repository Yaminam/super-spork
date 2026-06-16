import styles from "./Marquee.module.css";

/**
 * A slow, continuous band of words (brands, values, regions) that drifts
 * sideways, a kinetic, editorial divider between sections. Pure CSS so it
 * needs no JS; the animation is paused entirely under prefers-reduced-motion.
 * Decorative, so hidden from assistive tech.
 */
export default function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  const row = [...items, ...items];
  return (
    <div className={`${styles.wrap} ${className ?? ""}`} aria-hidden>
      <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        {row.map((it, i) => (
          <span key={i} className={styles.item}>
            {it}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
