import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import CountUp from "@/components/site/CountUp";
import Marquee from "@/components/site/Marquee";
import {
  POSITIONING,
  WHAT_WE_STAND_FOR,
  HOW_WE_OPERATE,
  ECONOMY_CONTRIBUTION,
} from "@/content/india";
import styles from "./group.module.css";

export const metadata: Metadata = {
  title: "Our Group",
  description:
    "Who we are, what we stand for and how we operate. Pernod Ricard India is one of the country's largest premium spirits companies and part of the global Pernod Ricard group.",
  alternates: { canonical: "/group" },
};

const EXPLORE: { label: string; href: string; note: string }[] = [
  { label: "Leadership & Governance", href: "/leadership", note: "The team and principles that govern the business." },
  { label: "Operations", href: "/operations", note: "Our manufacturing, supply-chain and sourcing footprint." },
  { label: "Our History", href: "/group/our-history", note: "Two centuries of lineage, and three decades in India." },
  { label: "Role in Society", href: "/group/our-role-society", note: "How we contribute beyond the balance sheet." }];

export default function GroupPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-group"
        data={[
          webPageSchema({ name: "Our Group", description: metadata.description as string, path: "/group" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Group", path: "/group" }])]}
      />

      <PageIntro
        index="01"
        eyebrow="Our Group"
        title="A premium spirits company, built in India for the long term."
        lede={POSITIONING}
      />

      {/* Who we are */}
      <section className={`ll-section ${styles.sec}`}>
        <div className={`ll-container ${styles.lead}`}>
          <div className={styles.leadLeft}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Who we are</p></Reveal>
            <Reveal delay={0.05}>
              <p className={`ll-display ${styles.statement}`}>
                One of India&apos;s largest premium spirits companies, and part of a
                global house present in more than seventy countries.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className={styles.leadRight}>
            <p className={styles.body}>
              We make and market a portfolio of leading Indian and international brands across
              whisky, wine and other categories. Our scale is real, our standards are
              international, and our roots, in Indian manufacturing, sourcing and talent, run deep.
            </p>
            <p className={styles.body}>
              We are a corporate business, not a consumer storefront: we build brands, livelihoods
              and trust for the long term.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we stand for */}
      <section className={`ll-section ${styles.valuesSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> What we stand for</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Four values, held without compromise.</h2></Reveal>
          <ul className={styles.cards}>
            {WHAT_WE_STAND_FOR.map((v, i) => (
              <Reveal as="li" className={styles.card} key={v.title} delay={(i % 2) * 0.06}>
                <h3 className={styles.cardName}>{v.title}</h3>
                <p className={styles.cardText}>{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Kinetic values band */}
      <Marquee items={WHAT_WE_STAND_FOR.map((v) => v.title)} reverse />

      {/* How we operate */}
      <section className={`ll-section ${styles.opsSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> How we operate</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>An Indian business, run to a global standard.</h2></Reveal>
          <ul className={styles.opsList}>
            {HOW_WE_OPERATE.map((o, i) => (
              <Reveal as="li" className={styles.op} key={o.title} delay={(i % 3) * 0.05}>
                <h3 className={styles.opName}>{o.title}</h3>
                <p className={styles.opText}>{o.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Footprint in the economy */}
      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {ECONOMY_CONTRIBUTION.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <CountUp value={s.value} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Explore */}
      <section className={`ll-section ${styles.exploreSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Go deeper</p></Reveal>
          <ul className={styles.explore}>
            {EXPLORE.map((e, i) => (
              <Reveal as="li" key={e.href} delay={(i % 2) * 0.05}>
                <Link href={e.href} className={styles.exploreCard}>
                  <span className={styles.exploreLabel}>{e.label} <span aria-hidden>→</span></span>
                  <span className={styles.exploreNote}>{e.note}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
