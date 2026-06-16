import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import CountUp from "@/components/site/CountUp";
import Marquee from "@/components/site/Marquee";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { OPERATIONS, INDIA_STATS, OPERATIONS_FAQS } from "@/content/india";
import { absoluteUrl } from "@/lib/site-config";
import styles from "./operations.module.css";

export const metadata: Metadata = {
  title: "Operations, manufacturing, supply chain & sourcing",
  description:
    "How Pernod Ricard India makes and moves its brands: manufacturing and bottling across the country, a resilient supply chain, and long-term agri-sourcing relationships.",
  alternates: { canonical: "/operations" },
};

const PRINCIPLES: { t: string; d: string }[] = [
  { t: "Made close to demand", d: "Production and bottling located near the markets they serve, reducing logistics intensity and supporting regional economies." },
  { t: "Resilient supply chain", d: "A diversified network designed to keep quality consistent and supply dependable across the country." },
  { t: "Responsible sourcing", d: "Long-term relationships with farming communities, with programmes that support responsible water and soil practices." },
  { t: "Quality without compromise", d: "Distillation, blending and bottling held to the same standard across every site, Indian and international brands alike." }];

export default function OperationsPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-operations"
        data={[
          webPageSchema({ name: "Operations", description: metadata.description as string, path: "/operations" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Operations", path: "/operations" }])]}
      />

      <PageIntro
        index="04"
        eyebrow="Manufacturing, supply chain & sourcing"
        title="From grain and grape to the finished glass."
        lede="Our operations footprint turns provenance into product, a national network of manufacturing, bottling and sourcing built for quality, resilience and responsibility."
      />

      {/* Footprint stats */}
      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {INDIA_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <CountUp value={s.value} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footprint map / nodes */}
      <section className={`ll-section ${styles.sec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The footprint</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>A national network, region by region.</h2></Reveal>
          <ol className={styles.nodes}>
            {OPERATIONS.map((n, i) => (
              <Reveal as="li" className={styles.node} key={n.region} delay={(i % 3) * 0.05}>
                <span className={styles.nodeNo}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.nodeName}>{n.region}</h3>
                  <p className={styles.nodeText}>{n.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Kinetic footprint band */}
      <Marquee items={["Gurugram", "Nashik", "Behror", "30+ bottling plants", "Agri-sourcing", "Made in India"]} />

      {/* Principles */}
      <section className={`ll-section ${styles.principlesSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> How we operate</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Four principles hold it together.</h2></Reveal>
          <ul className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" className={styles.principle} key={p.t} delay={(i % 2) * 0.06}>
                <h3 className={styles.principleName}>{p.t}</h3>
                <p className={styles.principleText}>{p.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className={`ll-section ${styles.ctaSec}`}>
        <div className="ll-container">
          <Reveal>
            <p className={`ll-display ${styles.statement}`}>
              The same care that shapes a single malt shapes the network that makes it.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/sustainability" className={styles.cta}>Our sustainability roadmap <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      <Faq items={OPERATIONS_FAQS} title="Operations, answered." eyebrow="Answers" />
    </article>
  );
}
