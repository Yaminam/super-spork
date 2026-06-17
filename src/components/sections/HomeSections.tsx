"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from "framer-motion";
import Reveal from "@/components/site/Reveal";
import Magnetic from "@/components/site/Magnetic";
import CountUp from "@/components/site/CountUp";
import { PORTFOLIO } from "@/content/pernod-portfolio";
import { OPERATIONS, INDIA_STORY } from "@/content/india";
import { BRAND_DETAILS } from "@/content/brands-detail";
import s from "./Sections.module.css";

const WALL = PORTFOLIO.slice(0, 40);
const ROW_A = WALL.filter((_, i) => i % 2 === 0);
const ROW_B = WALL.filter((_, i) => i % 2 === 1);

const EASE = [0.16, 1, 0.3, 1] as const;
// fires when the element is ~22% up from the bottom, so items pop in as you reach them
const VIEW = { once: true, margin: "0px 0px -22% 0px" } as const;

/** Vertical parallax wrapper: children drift as the element crosses the view. */
function PY({ children, from, to, className }: { children: React.ReactNode; from: number; to: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, to]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** A brand row that drifts continuously (items duplicated x2 for a seamless
 * loop), opposite direction per row. Pauses on hover. */
function BrandRow({ items, dir }: { items: typeof WALL; dir: 1 | -1 }) {
  const loop = [...items, ...items];
  return (
    <div className={s.rowViewport}>
      <div className={`${s.rowTrack} ${dir === 1 ? s.driftL : s.driftR}`}>
        {loop.map((b, i) => (
          <div className={s.mTile} key={`${b.name}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt={b.name} className={s.logo} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** House-of-brands wall as a two-row parallax marquee. */
export function BrandWall() {
  return (
    <section className={`${s.section} ${s.wallSection}`}>
      <div className="ll-container">
        <div className={s.head}>
          <Reveal><p className="ll-eyebrow"><span>06</span> The portfolio</p></Reveal>
          <Reveal delay={0.05}><h2 className={s.title}>A house of brands.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className={s.lede}>
              From Indian icons to global houses, {BRAND_DETAILS.length}+ brands across every major category.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="ll-container">
        <div className={s.rows}>
          <BrandRow items={ROW_A} dir={1} />
          <BrandRow items={ROW_B} dir={-1} />
        </div>
        <div className={s.wallFoot}>
          <Reveal delay={0.1}>
            <Link href="/brands" className={s.ctaGhost}>Explore all {BRAND_DETAILS.length}+ brands <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const OPS_STATS = [
  { value: "1993", label: "In India since" },
  { value: "30+", label: "Plants nationwide" },
  { value: "2", label: "Distilleries" },
  { value: "1,400", label: "Employees" },
];

/** Operations across India: parallax stat band + the real location network. */
export function OperationsSection() {
  return (
    <section className={`${s.section} ${s.opsSection}`}>
      <div className="ll-container">
        <PY from={50} to={-20}>
          <div className={s.head}>
            <Reveal><p className="ll-eyebrow"><span>07</span> Operations</p></Reveal>
            <Reveal delay={0.05}><h2 className={s.title}>Made in India, at scale.</h2></Reveal>
            <Reveal delay={0.1}>
              <p className={s.lede}>
                Distilled, blended and bottled across the country, close to the markets and communities we serve.
              </p>
            </Reveal>
          </div>
        </PY>
        <ul className={s.opsStats}>
          {OPS_STATS.map((st, i) => (
            <motion.li
              key={st.label}
              className={s.opsStat}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <CountUp value={st.value} className={s.opsStatVal} />
              <span className={s.opsStatLabel}>{st.label}</span>
            </motion.li>
          ))}
        </ul>
        <ul className={s.opsGrid}>
          {OPERATIONS.map((o) => (
            <motion.li
              key={o.region}
              className={s.opsCard}
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className={s.opsDot} aria-hidden />
              <div>
                <h3 className={s.opsRegion}>{o.region}</h3>
                <p className={s.opsDetail}>{o.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Heritage eras for the horizontal reel — each milestone paired with a real,
// high-resolution maison/heritage image (all 2880×1234 or large lifestyle).
const ERA_IMAGES = [
  "/images/pernod/32-maison_belle_epoque.jpg",
  "/images/pages/investors/00-pernod-20ricard-20hq.jpg",
  "/images/brands/blenders-pride/24-brand-blenders-pride-rare-premium-whisky.jpg",
  "/images/pages/group-history/00-img_2459m2.jpg",
  "/images/pernod/28-nurturing_terroir1440x1080.jpg",
  "/images/pernod/31-midleton_distillery.jpg",
];
const ERAS = INDIA_STORY.map((m, i) => ({ ...m, img: ERA_IMAGES[i] ?? ERA_IMAGES[0] }));

/**
 * "The Reel" — a pinned, cinematic horizontal timeline (synthesised from an
 * audit of award-winning scrollytelling sites). Scrolling down pins the stage
 * and scrubs a row of era panels sideways like a film reel; a gold progress
 * rail and gliding years track position; the active panel gilds. The row width
 * is measured so the last era lands flush, and on narrow screens it collapses
 * to a vertical stack (measured travel becomes zero).
 */
export function HeritageTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (rowRef.current) setDist(Math.max(0, rowRef.current.scrollWidth - window.innerWidth));
    };
    calc();
    const t = setTimeout(calc, 300); // re-measure once fonts/images settle
    window.addEventListener("resize", calc);
    return () => { clearTimeout(t); window.removeEventListener("resize", calc); };
  }, []);

  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const prog = reduce ? scrollYProgress : sp;
  const x = useTransform(prog, [0, 1], [0, -dist]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(ERAS.length - 1, Math.max(0, Math.round(v * (ERAS.length - 1)))));
  });

  return (
    <section ref={ref} className={`${s.heritageSection} ${s.reel}`} aria-label="Our heritage">
      <div className={s.reelStage}>
        <div className={s.reelHead}>
          <p className="ll-eyebrow"><span>08</span> Heritage</p>
          <h2 className={s.reelTitle}>Our story, held in light.</h2>
        </div>

        <motion.div ref={rowRef} className={s.reelRow} style={{ x }}>
          {ERAS.map((e, i) => (
            <article key={e.year} className={s.reelPanel} data-active={i === active}>
              <div className={s.reelMedia}>
                <Image src={e.img} alt="" fill sizes="(max-width: 760px) 100vw, 56vw" quality={90} className={s.reelImg} />
                <span className={s.reelShade} aria-hidden />
              </div>
              <div className={s.reelBody}>
                <span className={s.reelNo}>{String(i + 1).padStart(2, "0")} — {String(ERAS.length).padStart(2, "0")}</span>
                <span className={s.reelYear}>{e.year}</span>
                <span className={s.reelBar} aria-hidden />
                <p className={s.reelText}>{e.text}</p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className={s.reelRail} aria-hidden>
          <div className={s.reelRailTrack}>
            <motion.div className={s.reelRailFill} style={{ scaleX: reduce ? 1 : scrollYProgress }} />
          </div>
          <div className={s.reelRailYears}>
            {ERAS.map((e, i) => (
              <span key={e.year} className={s.reelRailYear} data-active={i === active}>{e.year}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Closing call to action. */
export function ClosingCta() {
  return (
    <section className={`${s.section} ${s.closeSection}`}>
      <div className="ll-container">
        <Reveal><p className="ll-eyebrow" style={{ justifyContent: "center" }}><span>09</span> Get in touch</p></Reveal>
        <motion.h2
          className={s.closeTitle}
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VIEW}
          transition={{ duration: 1.2, ease: EASE }}
        >
          Let’s raise a toast.
        </motion.h2>
        <Reveal delay={0.1}><p className={s.closeLede}>Media, investors, partners and talent, all welcome.</p></Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic><Link href="/contact" className={s.cta}>Contact us</Link></Magnetic>
            <Magnetic><Link href="/brands" className={s.ctaGhost}>Explore our brands <span aria-hidden>→</span></Link></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
