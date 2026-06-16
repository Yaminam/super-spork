import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import Marquee from "@/components/site/Marquee";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import { EMPLOYER_PILLARS, CAREER_AREAS, CAREERS_FAQS } from "@/content/india";
import styles from "./careers.module.css";

const page = PAGES.careers;
const photos = [
  ...new Set(
    (page?.blocks ?? [])
      .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
      .map((b) => b.v))];
const hero = photos[0] ?? null;
const band = photos[1] ?? photos[0] ?? null;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career with one of India's leading premium spirits companies, ownership from day one, brands worth building, and growth across the Pernod Ricard group.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-careers"
        data={[
          webPageSchema({ name: "Careers", description: metadata.description as string, path: "/careers" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" }])]}
      />

      <header className={styles.hero}>
        {hero ? (
          <Image className={styles.heroImg} src={hero} alt="Working at Pernod Ricard India" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>06</span> Careers</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Build something that lasts.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Join one of India&apos;s leading premium spirits companies, a place where you are
              trusted to lead early, given brands worth building, and able to grow across the
              wider Pernod Ricard group.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Employer pillars */}
      <section className={`ll-section ${styles.pillarsSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Why build here</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>An employer worth choosing.</h2></Reveal>
          </div>
          <ul className={styles.pillars}>
            {EMPLOYER_PILLARS.map((p, i) => (
              <Reveal as="li" className={styles.pillar} key={p.title} delay={(i % 2) * 0.06}>
                <span className={styles.pillarNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.pillarName}>{p.title}</h3>
                <p className={styles.pillarText}>{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Kinetic functions band */}
      <Marquee items={CAREER_AREAS.map((a) => a.name)} reverse />

      {/* Functional areas */}
      <section className={`ll-section ${styles.areasSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Where you could grow</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Find your place in the business.</h2></Reveal>
          </div>
          <ul className={styles.areas}>
            {CAREER_AREAS.map((a, i) => {
              const img = photos[(i % Math.max(1, photos.length - 1)) + 1] ?? photos[0];
              return (
                <Reveal as="li" className={styles.area} key={a.name} delay={(i % 3) * 0.05}>
                  <span className={styles.areaMedia}>
                    {img ? <Image src={img} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /> : <span className={styles.areaFallback} aria-hidden />}
                  </span>
                  <div className={styles.areaBody}>
                    <h3 className={styles.areaName}>{a.name}</h3>
                    <p className={styles.areaText}>{a.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {band && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={band} alt="Life at Pernod Ricard India" fill sizes="100vw" />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal><p className={`ll-display ${styles.bandQuote}`}>Great brands are built by people who are trusted to lead.</p></Reveal>
            <Reveal delay={0.06}>
              <Link href="/contact" className={styles.cta}>Talk to our talent team <span aria-hidden>→</span></Link>
            </Reveal>
          </div>
        </section>
      )}

      <Faq items={CAREERS_FAQS} title="Working here, answered." eyebrow="Answers" />
    </article>
  );
}
