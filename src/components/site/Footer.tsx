import Link from "next/link";
import { FOOTER_COLUMNS } from "@/content/site";
import styles from "./Footer.module.css";

const SOCIALS = ["LinkedIn", "Instagram", "YouTube"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`ll-container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Pernod Ricard India</p>
          <p className={styles.tag}>Créateurs de convivialité</p>
          <p className={styles.resp}>
            This is a corporate website and does not promote the consumption of alcohol.
            <br />
            Please be responsible. You must be of legal drinking age to view this site.
          </p>
        </div>
        <nav className={styles.columns} aria-label="Footer">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className={styles.colHeading}>{col.heading}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={`ll-container ${styles.legal}`}>
        <p>© 2026 Pernod Ricard India Private Limited. Part of the Pernod Ricard group.</p>
        <div className={styles.socials}>
          {SOCIALS.map((s) => (
            <a key={s} href="#" className={styles.social} aria-label={s}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
