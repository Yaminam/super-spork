import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { CONTACT_CHANNELS } from "@/content/india";
import { ORG } from "@/lib/site-config";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "The right entry points into Pernod Ricard India, for media, investors, talent, trade partners, policy stakeholders and general enquiries.",
  alternates: { canonical: "/contact" },
};

/** Map a channel action to a link where one applies. */
function actionFor(audience: string, action: string): { label: string; href?: string } {
  if (action.includes("@")) return { label: action, href: `mailto:${action}` };
  if (audience === "Investors & analysts") return { label: action, href: "/investors" };
  if (audience === "Talent & careers") return { label: action, href: "/careers" };
  return { label: action };
}

export default function ContactPage() {
  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-contact"
        data={[
          webPageSchema({ name: "Contact", description: metadata.description as string, path: "/contact" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" }])]}
      />

      <PageIntro
        index="07"
        eyebrow="Contact"
        title="Find the right door into the company."
        lede="Media, investors, talent, partners and policy stakeholders, every audience has a dedicated way to reach us."
      />

      <section className="ll-section" style={{ paddingTop: 0 }}>
        <div className="ll-container">
          <ul className={styles.grid}>
            {CONTACT_CHANNELS.map((c, i) => {
              const a = actionFor(c.audience, c.action);
              return (
                <Reveal as="li" className={styles.card} key={c.audience} delay={(i % 3) * 0.05}>
                  <h2 className={styles.audience}>{c.audience}</h2>
                  <p className={styles.detail}>{c.detail}</p>
                  {a.href ? (
                    <Link href={a.href} className={styles.action}>
                      {a.label} <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span className={styles.actionStatic}>{a.label}</span>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={`ll-section ${styles.hq}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Corporate office</p></Reveal>
          <Reveal delay={0.05}>
            <p className={`ll-display ${styles.hqAddr}`}>
              Pernod Ricard India<br />
              {ORG.headquarters.locality}, {ORG.headquarters.region}, India
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.note}>
              This is a corporate website. It does not sell or promote alcohol and complies with
              Indian advertising and surrogate guidelines.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
