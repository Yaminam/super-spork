"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

/** Illuminated heritage timeline with a gold rail that draws as you scroll. */
export function HeritageTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className={`${s.section} ${s.heritageSection}`}>
      <div className="ll-container">
        <div className={s.head}>
          <Reveal><p className="ll-eyebrow"><span>08</span> Heritage</p></Reveal>
          <Reveal delay={0.05}><h2 className={s.title}>Our story, held in light.</h2></Reveal>
        </div>
        <div className={s.tlWrap} ref={ref}>
          <div className={s.tlRail}>
            <motion.div className={s.tlRailFill} style={{ scaleY }} />
          </div>
          {INDIA_STORY.map((m) => (
            <motion.div
              key={m.year}
              className={s.tlBeat}
              initial={{ opacity: 0, x: 56 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <motion.span
                className={s.tlDot}
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              />
              <motion.span
                className={s.tlYear}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {m.year}
              </motion.span>
              <p className={s.tlText}>{m.text}</p>
            </motion.div>
          ))}
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
          Let’s raise a glass.
        </motion.h2>
        <Reveal delay={0.1}><p className={s.closeLede}>Media, investors, partners and talent, all welcome.</p></Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic><Link href="/contact" className={s.cta}>Contact us</Link></Magnetic>
            <Magnetic><Link href="/brands" className={s.ctaGhost}>Explore the brands <span aria-hidden>→</span></Link></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
