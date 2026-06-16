import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/site/Reveal";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo/jsonld";
import { ARTICLES, ARTICLE_BY_SLUG, formatDate } from "@/content/news";
import styles from "./article.module.css";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLE_BY_SLUG[slug];
  if (!a) return { title: "Newsroom" };
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/news/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.datePublished },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLE_BY_SLUG[slug];
  if (!a) notFound();

  return (
    <article className={styles.page}>
      <JsonLd
        id="ld-article"
        data={[
          articleSchema({ headline: a.title, description: a.excerpt, path: `/news/${a.slug}`, datePublished: a.datePublished, category: a.category }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Newsroom", path: "/news" },
            { name: a.title, path: `/news/${a.slug}` },
          ]),
        ]}
      />

      <header className={`ll-section ${styles.head}`}>
        <div className="ll-container">
          <Reveal>
            <p className={styles.meta}>
              <Link href="/news" className={styles.back}>Newsroom</Link>
              <span className={styles.sep} aria-hidden>/</span>
              <span className={styles.cat}>{a.category}</span>
              <span className={styles.sep} aria-hidden>·</span>
              <time className={styles.date} dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className={`ll-display ${styles.title}`}>{a.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.standfirst}>{a.excerpt}</p>
          </Reveal>
        </div>
      </header>

      <div className={styles.bodyWrap}>
        <div className="ll-container">
          <div className={styles.body}>
            {a.body.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 0.04}>
                <p className={styles.para}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className={styles.note}>
              This is a corporate communication and does not promote the consumption of alcohol.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/news" className={styles.cta}><span aria-hidden>←</span> All news</Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
