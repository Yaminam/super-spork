import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import Marquee from "@/components/site/Marquee";
import PhotoBreak from "@/components/site/PhotoBreak";
import CareersForm from "@/components/site/CareersForm";
import BrandHighlights from "@/components/site/BrandHighlights";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import {
  EMPLOYER_PILLARS,
  CAREER_AREAS,
  CAREERS_FAQS,
  CAREER_VALUES,
  CAREER_STATS,
  CAREER_LOCATIONS,
  HIRING_STEPS,
} from "@/content/india";
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
          <Image className={styles.heroImg} src={hero} alt="Working at Pernod Ricard India" fill sizes="100vw" quality={90} priority />
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
          <Reveal delay={0.15}>
            <a href="#apply" className={styles.heroCta}>Submit your interest <span aria-hidden>→</span></a>
          </Reveal>
        </div>
      </header>

      {/* Life-here numbers, drawn from the group */}
      <section className={styles.statsBand}>
        <div className="ll-container">
          <ul className={styles.statsRow}>
            {CAREER_STATS.map((s) => (
              <li className={styles.stat} key={s.label}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cardinal values */}
      <section className={`ll-section ${styles.valuesSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> What drives us</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Three values, lived every day.</h2></Reveal>
          </div>
          <ul className={styles.values}>
            {CAREER_VALUES.map((v, i) => (
              <Reveal as="li" className={styles.value} key={v.title} delay={(i % 3) * 0.06}>
                <span className={styles.valueNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.valueName}>{v.title}</h3>
                <p className={styles.valueText}>{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

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

      <PhotoBreak
        src="/images/pages/group-history/00-img_2459m2.jpg"
        eyebrow="Life here"
        caption="A place to grow, with brands worth building."
        alt="The workplace"
      />

      {band && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={band} alt="Life at Pernod Ricard India" fill sizes="100vw" quality={90} />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal><p className={`ll-display ${styles.bandQuote}`}>Great brands are built by people who are trusted to lead.</p></Reveal>
            <Reveal delay={0.06}>
              <a href="#apply" className={styles.cta}>Submit your interest <span aria-hidden>→</span></a>
            </Reveal>
          </div>
        </section>
      )}

      {/* Where you'd work */}
      <section className={`ll-section ${styles.locsSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Where you&apos;d work</p></Reveal>
            <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Hubs and houses across India.</h2></Reveal>
          </div>
          <ul className={styles.locs}>
            {CAREER_LOCATIONS.map((l, i) => (
              <Reveal as="li" className={styles.loc} key={l.city} delay={(i % 2) * 0.06}>
                <h3 className={styles.locCity}>{l.city}</h3>
                <p className={styles.locText}>{l.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className={`ll-section ${styles.applySec}`}>
        <div className="ll-container">
          <div className={styles.applyGrid}>
            <div className={styles.applyIntro}>
              <Reveal><p className="ll-eyebrow"><span>·</span> Join us</p></Reveal>
              <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Tell us where you&apos;d make an impact.</h2></Reveal>
              <Reveal delay={0.1}>
                <p className={styles.applyLede}>
                  We&apos;re always interested in people who want to build. Share your details and the
                  area you&apos;re drawn to, and our talent team will be in touch.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ol className={styles.steps}>
                  {HIRING_STEPS.map((s) => (
                    <li className={styles.step} key={s.step}>
                      <span className={styles.stepNo}>{s.step}</span>
                      <div>
                        <h3 className={styles.stepTitle}>{s.title}</h3>
                        <p className={styles.stepText}>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
            <div className={styles.applyForm}>
              <CareersForm />
            </div>
          </div>
        </div>
      </section>

      <BrandHighlights />

      <Faq items={CAREERS_FAQS} title="Working here, answered." eyebrow="Answers" />
    </article>
  );
}
