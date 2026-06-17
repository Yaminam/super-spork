import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./Spotlights.module.css";

/** Featured brand spotlights — image cards linking to each brand. Imagery (c)
 * Pernod Ricard / brand owners, design comp only. */
const SPOTS = [
  { name: "Royal Stag", cat: "Indian Whisky", slug: "royal-stag", img: "/images/brands/royal-stag/25-brand-royal-stag-barrel-select-lifestyle.jpg" },
  { name: "Chivas Regal", cat: "Scotch Whisky", slug: "chivas", img: "/images/brands/chivas/25-previewlarge-chivas-20socialassets-20-20.jpg" },
  { name: "Absolut", cat: "Vodka", slug: "absolut", img: "/images/brands/absolut/25-originalsizejpeg-absolut_atlas_lifestyle.jpg" },
  { name: "Jameson", cat: "Irish Whiskey", slug: "jameson", img: "/images/brands/jameson/26-brand-jameson-black-barrel-lifestyle-ori.jpg" },
];

export default function Spotlights() {
  return (
    <ul className={styles.wrap}>
      {SPOTS.map((b, i) => (
        <Reveal as="li" key={b.slug} delay={(i % 4) * 0.06}>
          <Link href={`/brands/${b.slug}`} className={styles.card}>
            <Image src={b.img} alt={b.name} fill sizes="(max-width: 640px) 100vw, 24vw" className={styles.img} />
            <span className={styles.shade} />
            <span className={styles.meta}>
              <span className={styles.name}>{b.name}</span>
              <span className={styles.cat}>{b.cat}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
