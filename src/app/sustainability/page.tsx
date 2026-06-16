import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import CountUp from "@/components/site/CountUp";
import Marquee from "@/components/site/Marquee";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import {
  SUSTAINABILITY_PILLARS,
  SUSTAINABILITY_STATS,
  SUSTAINABILITY_PROGRAMMES,
  CORPORATE_FAQS,
} from "@/content/india";
import styles from "./sustainability.module.css";

const page = PAGES.sustainability;

export const metadata: Metadata = {
  title: "Sustainability & Responsibility",
  description:
    "Good Times from a Good Place: Pernod Ricard India's 2030 sustainability roadmap, water stewardship, communities, circular packaging and responsible drinking.",
  alternates: { canonical: "/sustainability" },
};

// Real photos from the extracted page, unique only, never the hero, no diagrams.
const photos = [
  ...new Set(
    (page?.blocks ?? [])
      .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
      .map((b) => b.v))]
  .filter((v) => v !== page?.hero)
  .filter((v) => !/framework|simplified|sdg|7-1|logo/i.test(v));

const RESPONSIBLE_FAQS = CORPORATE_FAQS.filter((f) =>
  /sustainab|responsib|buy alcohol/i.test(f.q));

export default function SustainabilityPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-sustainability"
        data={[
          webPageSchema({ name: "Sustainability & Responsibility", description: metadata.description as string, path: "/sustainability" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sustainability & Responsibility", path: "/sustainability" }])]}
      />

      {/* Hero */}
      <header className={styles.hero}>
        {page?.hero ? (
          <Image className={styles.heroImg} src={page.hero} alt="Pernod Ricard India sustainability" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>03</span> Sustainability &amp; Responsibility</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Good Times from a Good Place.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Our 2030 roadmap reshapes how spirits are made in India, from water in the
              watershed to the served glass, across four commitments.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Stats */}
      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {SUSTAINABILITY_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <CountUp value={s.value} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.pillarsHead}>
            <Reveal><p className="ll-eyebrow"><span>·</span> The 2030 roadmap</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.pillarsTitle}`}>Four commitments, one promise.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {SUSTAINABILITY_PILLARS.map((p, i) => (
              <Reveal as="li" className={styles.pillar} key={p.no} delay={(i % 2) * 0.06}>
                <span className={styles.pillarMedia}>
                  {photos[i] ? (
                    <Image src={photos[i]} alt={p.name} fill sizes="(max-width: 760px) 100vw, 50vw" />
                  ) : (
                    <span className={styles.pillarFallback} aria-hidden />
                  )}
                  <span className={styles.pillarNo}>{p.no}</span>
                </span>
                <div className={styles.pillarBody}>
                  <h3 className={styles.pillarName}>{p.name}</h3>
                  <p className={styles.pillarText}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Kinetic pillars band */}
      <Marquee items={SUSTAINABILITY_PILLARS.map((p) => p.name)} reverse />

      {/* India programmes */}
      <section className={`ll-section ${styles.contentSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> In India</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.pillarsTitle}`}>Action where it is needed most.</h2></Reveal>
          <div className={styles.prose}>
            {SUSTAINABILITY_PROGRAMMES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.04}>
                <h3 className={styles.blockH3}>{p.title}</h3>
                <p className={styles.para}>{p.text}</p>
              </Reveal>
            ))}
            <Reveal delay={0.08}>
              <p className={styles.para}>
                Through the Pernod Ricard India Foundation, our community programmes in water
                stewardship, agriculture and livelihoods have reached more than five lakh people
                across thirteen states and three union territories.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className={`ll-section ${styles.statementSec}`}>
        <div className="ll-container">
          <Reveal>
            <p className={`ll-display ${styles.statement}`}>
              We hold ourselves to the same standard as our craft: patient, precise,
              and made to last.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/group/our-role-society" className={styles.cta}>Our role in society <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <Faq items={RESPONSIBLE_FAQS} title="Sustainability & responsibility, answered." eyebrow="Answers" />
    </article>
  );
}
