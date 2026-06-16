import Reveal from "./Reveal";
import styles from "./PageIntro.module.css";

/**
 * Shared inner-page header: index, title and lede on a lit dark field.
 * Two-column on desktop (title left, lede right) so the header fills the
 * width and reads as intentional rather than leaving the right side empty.
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
  return (
    <header className={styles.intro}>
      <div className={`ll-container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="ll-eyebrow">
              <span>{index}</span> {eyebrow}
            </p>
          </Reveal>
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
