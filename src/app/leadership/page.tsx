import type { Metadata } from "next";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import { JsonLd, breadcrumbSchema, webPageSchema, leadershipSchema } from "@/lib/seo/jsonld";
import { LEADERSHIP, LEADERSHIP_AS_OF, GOVERNANCE, CORPORATE_FAQS } from "@/content/india";
import styles from "./leadership.module.css";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "The people and principles that govern Pernod Ricard India: the leadership team, board oversight, ethics and compliance, responsible marketing and transparent disclosure.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-leadership"
        data={[
          webPageSchema({ name: "Leadership & Governance", description: metadata.description as string, path: "/leadership" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Leadership & Governance", path: "/leadership" }]),
          leadershipSchema(LEADERSHIP)]}
      />

      <PageIntro
        index="05"
        eyebrow="Leadership & Governance"
        title="Led with intent. Governed with care."
        lede="A market leader should be measured by how it operates, not only by what it makes. Here is who leads the India business, and the principles that hold it to account."
      />

      {/* Leadership team */}
      <section className={`ll-section ${styles.sec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The leadership team</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>The team steering the business.</h2></Reveal>
          <ul className={styles.people}>
            {LEADERSHIP.map((l, i) => (
              <Reveal as="li" className={styles.person} key={l.role} delay={(i % 3) * 0.05}>
                <span className={styles.avatar} aria-hidden>{l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                <h3 className={styles.personName}>{l.name}</h3>
                <p className={styles.personRole}>{l.role}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className={styles.disclaimer}>
              Leadership team as of {LEADERSHIP_AS_OF}. Full biographies and portraits are
              published with each appointment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Governance pillars */}
      <section className={`ll-section ${styles.govSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Governance</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>How we hold ourselves to account.</h2></Reveal>
          <ul className={styles.pillars}>
            {GOVERNANCE.map((g, i) => (
              <Reveal as="li" className={styles.pillar} key={g.title} delay={(i % 2) * 0.06}>
                <h3 className={styles.pillarName}>{g.title}</h3>
                <p className={styles.pillarText}>{g.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ, answer-ready, emits FAQPage schema */}
      <Faq items={CORPORATE_FAQS} title="What people ask about Pernod Ricard India." eyebrow="Answers" />
    </article>
  );
}
