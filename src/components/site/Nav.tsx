"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/content/site";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} data-testid="nav">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Pernod Ricard, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pernod/03-mobile-logo.svg" alt="Pernod Ricard" className={styles.logoImg} />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <button className={styles.locale} aria-label="Region, English">EN</button>
          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open} />
            <span data-open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobile}
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
