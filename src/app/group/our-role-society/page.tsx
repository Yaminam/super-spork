import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import CountUp from "@/components/site/CountUp";
import { ECONOMY_CONTRIBUTION } from "@/content/india";
import styles from "./role-society.module.css";

export const metadata: Metadata = {
  title: "Our Role in Society",
  description:
    "How Pernod Ricard India contributes beyond the balance sheet, communities, responsible drinking, water and environment, and the livelihoods our business supports.",
  alternates: { canonical: "/group/our-role-society" },
};

const PILLARS: { no: string; name: string; text: string }[] = [
  { no: "01", name: "Communities", text: "Through the Pernod Ricard India Foundation, programmes in education, livelihoods and women's empowerment reach communities across the country, with a reach of more than five lakh people." },
  { no: "02", name: "Responsible drinking", text: "We market our brands responsibly and run prevention and awareness programmes, in full compliance with Indian advertising and surrogate guidelines for the category." },
  { no: "03", name: "Water & environment", text: "Watershed projects and community farm ponds near our plants help secure water for agriculture, as we work towards being water-balanced in India's high-risk watersheds by 2030." },
  { no: "04", name: "Ethics & livelihoods", text: "We operate to a clear code of conduct, support thousands of livelihoods through our manufacturing and sourcing network, and contribute meaningfully to the public exchequer." }];

export default function OurRoleSocietyPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-role-society"
        data={[
          webPageSchema({ name: "Our Role in Society", description: metadata.description as string, path: "/group/our-role-society" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Group", path: "/group" },
            { name: "Our Role in Society", path: "/group/our-role-society" }])]}
      />

      <PageIntro
        index="02 / Society"
        eyebrow="Our Role in Society"
        title="A market leader's responsibility runs deeper than its market."
        lede="We measure ourselves by more than performance: by the communities we support, the water we return, and the standards we hold while we do it."
      />

      {/* Pillars */}
      <section className={`ll-section ${styles.sec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> How we contribute</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Four ways we give back.</h2></Reveal>
          <ul className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <Reveal as="li" className={styles.pillar} key={p.no} delay={(i % 2) * 0.06}>
                <span className={styles.pillarNo}>{p.no}</span>
                <h3 className={styles.pillarName}>{p.name}</h3>
                <p className={styles.pillarText}>{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Contribution stats */}
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

      {/* Statement */}
      <section className={`ll-section ${styles.ctaSec}`}>
        <div className="ll-container">
          <Reveal>
            <p className={`ll-display ${styles.statement}`}>
              Good times, we believe, must come from a good place.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/sustainability" className={styles.cta}>Our 2030 roadmap <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
