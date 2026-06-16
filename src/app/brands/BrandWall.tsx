"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_DETAILS } from "@/content/brands-detail";
import { PORTFOLIO } from "@/content/pernod-portfolio";
import styles from "./brands.module.css";

const ALL = "All";
const EASE = [0.16, 1, 0.3, 1] as const;
const SIZES = "(max-width: 560px) 45vw, (max-width: 1024px) 30vw, 16vw";
const LOGO_BY_NAME = new Map(PORTFOLIO.map((b) => [b.name.toLowerCase(), b.logo]));

export default function BrandWall() {
  const categories = useMemo(() => {
    const set = new Set<string>();
    BRAND_DETAILS.forEach((b) => set.add(b.category));
    return [ALL, ...[...set].sort()];
  }, []);
  const [filter, setFilter] = useState(ALL);
  const visible = filter === ALL ? BRAND_DETAILS : BRAND_DETAILS.filter((b) => b.category === filter);

  return (
    <>
      <div className={styles.filters} role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={`${styles.chip} ${filter === c ? styles.chipActive : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.ul layout className={styles.wall} data-testid="brand-wall">
        <AnimatePresence mode="popLayout">
          {visible.map((b) => {
            const logo = LOGO_BY_NAME.get(b.name.toLowerCase());
            return (
              <motion.li
                key={b.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Link href={`/brands/${b.slug}`} className={styles.tile} title={`${b.name} - ${b.category}`}>
                  <span className={styles.tileMedia}>
                    {logo ? (
                      <Image src={logo} alt={b.name} fill sizes={SIZES} className={styles.tileLogo} />
                    ) : (
                      <span className={styles.tileText}>{b.name}</span>
                    )}
                  </span>
                  <span className={styles.tileMeta}>
                    <span className={styles.tileCat}>{b.category}</span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
