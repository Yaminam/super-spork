import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { ARTICLES, formatDate } from "@/content/news";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Corporate news, results, sustainability progress and media communications from Pernod Ricard India.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <JsonLd
        id="ld-news"
        data={[
          webPageSchema({ name: "Newsroom", description: metadata.description as string, path: "/news" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Newsroom", path: "/news" }])]}
      />
      <PageIntro
        index="06"
        eyebrow="Newsroom"
        title="The company, in its own words."
        lede="Results, sustainability progress, people and corporate communications, the record media, partners and stakeholders can rely on."
      />
      <section className="ll-section">
        <div className="ll-container">
          <ul className={styles.list}>
            {ARTICLES.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 4) * 0.05}>
                <Link href={`/news/${a.slug}`} className={styles.item}>
                  <span className={styles.meta}>
                    <span className={styles.cat}>{a.category}</span>
                    <time className={styles.date} dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
                  </span>
                  <span className={styles.title}>{a.title}</span>
                  <span className={styles.excerpt}>{a.excerpt}</span>
                  <span className={styles.arrow} aria-hidden>→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
