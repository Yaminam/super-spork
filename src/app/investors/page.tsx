import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { PAGES } from "@/content/pages";
import { DOCUMENTS } from "@/content/documents";
import { BRAND_BY_SLUG } from "@/content/brands-detail";
import { INVESTOR_HIGHLIGHTS, INVESTOR_FAQS } from "@/content/india";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import Faq from "@/components/site/Faq";
import CountUp from "@/components/site/CountUp";
import ReportCard from "@/components/site/ReportCard";
import styles from "./investors.module.css";

const page = PAGES.investors;
const bandImg =
  BRAND_BY_SLUG["martell"]?.hero ?? BRAND_BY_SLUG["mumm"]?.hero ?? BRAND_BY_SLUG["midleton-very-rare"]?.hero ?? null;

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Disclosures, reports and the long-term strategy behind Pernod Ricard India, premiumisation, local manufacturing scale and transparent governance.",
  alternates: { canonical: "/investors" },
};

const STATS = [
  { value: "Premium-led", label: "Long-term value strategy" },
  { value: "20+", label: "Manufacturing & bottling sites" },
  { value: "70+", label: "Countries in the group" },
  { value: "1993", label: "In India since" }];

const ESSENTIALS = [
  "Full-year & half-year results",
  "Annual General Meeting",
  "Financial calendar",
  "Share price & dividend",
  "Strategy & outlook",
  "Governance"];

export default function InvestorsPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-investors"
        data={[
          webPageSchema({ name: "Investors", description: metadata.description as string, path: "/investors" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Investors", path: "/investors" }])]}
      />
      <header className={styles.hero}>
        {page?.hero ? (
          <Image className={styles.heroImg} src={page.hero} alt="Pernod Ricard investors" fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal><p className="ll-eyebrow"><span>04</span> Investors</p></Reveal>
          <Reveal delay={0.05}><h1 className={`ll-display ${styles.title}`}>Value, created with patience.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              How we create value for the long term: a premium-led strategy, the scale of local
              manufacturing, and the transparency to be read with confidence.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Equity story */}
      <section className={`ll-section ${styles.highlightsSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The equity story</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>Built for long-term value.</h2></Reveal>
          <ul className={styles.highlights}>
            {INVESTOR_HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" className={styles.highlight} key={h.title} delay={(i % 3) * 0.05}>
                <h3 className={styles.highlightName}>{h.title}</h3>
                <p className={styles.highlightText}>{h.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.statsBand}>
        <div className={`ll-container ${styles.statsRow}`}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <CountUp value={s.value} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Strategy statement, full-bleed pull quote */}
      <section className={`ll-section ${styles.statementSec}`}>
        <div className={`ll-container ${styles.statementGrid}`}>
          <Reveal>
            <p className="ll-eyebrow"><span>·</span> Long-term value</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className={`ll-display ${styles.statement}`}>
              We invest behind premium brands and a mix that trades up over time, 
              creating value patiently, and disclosing it transparently.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Reports */}
      {DOCUMENTS.length > 0 && (
        <section className={`ll-section ${styles.reportsSec}`}>
          <div className="ll-container">
            <div className={styles.head}>
              <Reveal><p className="ll-eyebrow"><span>·</span> Reports &amp; results</p></Reveal>
              <Reveal delay={0.05}><h2 className={`ll-display ${styles.headTitle}`}>The house, on the record.</h2></Reveal>
            </div>
            <div className={styles.reportsGrid}>
              {DOCUMENTS.map((d, i) => (
                <Reveal key={d.file} delay={(i % 3) * 0.05}>
                  <ReportCard doc={d} index={i} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}><Link href="/documents" className={styles.cta}>All documents <span aria-hidden>→</span></Link></Reveal>
          </div>
        </section>
      )}

      {/* Image band */}
      {bandImg && (
        <section className={styles.bandSec}>
          <Image className={styles.bandImg} src={bandImg} alt="A Pernod Ricard maison" fill sizes="100vw" />
          <span className={styles.bandShade} />
          <div className={`ll-container ${styles.bandInner}`}>
            <Reveal>
              <p className={`ll-display ${styles.bandQuote}`}>
                We make the spirits that mark the moments that matter.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Essentials */}
      <section className={`ll-section ${styles.essSec}`}>
        <div className="ll-container">
          <div className={styles.head}>
            <Reveal><p className="ll-eyebrow"><span>·</span> Investor essentials</p></Reveal>
          </div>
          <ul className={styles.essGrid}>
            {ESSENTIALS.map((e, i) => (
              <Reveal as="li" key={e} delay={(i % 3) * 0.05}>
                <a href="#" className={styles.ess}>
                  <span className={styles.essNo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.essName}>{e}</span>
                  <span className={styles.essArrow} aria-hidden>→</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={`ll-section ${styles.contactSec}`}>
        <div className="ll-container">
          <Reveal><p className={`ll-display ${styles.contactLine}`}>Investor relations</p></Reveal>
          <Reveal delay={0.05}>
            <a href="mailto:investors@pernod-ricard.com" className={styles.cta}>
              investors@pernod-ricard.com <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <Faq items={INVESTOR_FAQS} title="For investors, answered." eyebrow="Answers" />
    </article>
  );
}
