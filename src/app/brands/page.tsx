import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import BrandWall from "./BrandWall";
import { BRAND_BY_SLUG } from "@/content/brands-detail";
import { JsonLd, breadcrumbSchema, webPageSchema, brandsSchema } from "@/lib/seo/jsonld";
import { INDIA_BRANDS } from "@/content/india";
import styles from "./brands.module.css";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "The Pernod Ricard India portfolio in a corporate context, leading Indian-made and international brands across whisky, wine and other categories.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <JsonLd
        id="ld-brands"
        data={[
          webPageSchema({ name: "Brands", description: metadata.description as string, path: "/brands" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Brands", path: "/brands" }]),
          brandsSchema(INDIA_BRANDS)]}
      />

      <PageIntro
        index="02"
        eyebrow="The portfolio"
        title="A portfolio of houses, made and shared in India."
        lede="Leading Indian-made brands alongside international icons. Presented here in a corporate context, the heritage, provenance and role each plays in the business."
      />

      {/* Corporate disclosure */}
      <section className={styles.noteSec}>
        <div className="ll-container">
          <Reveal>
            <p className={styles.note}>
              This is a corporate overview. It does not market products, show pricing or
              encourage consumption, in line with Indian advertising and surrogate guidelines.
            </p>
          </Reveal>
        </div>
      </section>

      {/* India-first corporate portfolio */}
      <section className={`ll-section ${styles.portfolioSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> Brands at a glance</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Indian houses, international icons.</h2></Reveal>
          <ul className={styles.grid}>
            {INDIA_BRANDS.map((b, i) => {
              const href = b.slug && BRAND_BY_SLUG[b.slug] ? `/brands/${b.slug}` : "#group-portfolio";
              return (
                <Reveal as="li" key={b.name} delay={(i % 3) * 0.05}>
                  <Link href={href} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cat}>{b.category}</span>
                      <span className={styles.origin}>{b.origin}</span>
                    </div>
                    <h3 className={styles.name}>{b.name}</h3>
                    <p className={styles.text}>{b.note}</p>
                    <span className={styles.cardLink}>
                      View brand <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Wider group portfolio (visual) */}
      <section id="group-portfolio" className={`ll-section ${styles.wallSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The wider group</p></Reveal>
          <Reveal delay={0.05}><h2 className={`ll-display ${styles.h2}`}>Part of a global house of brands.</h2></Reveal>
        </div>
        <div className="ll-container">
          <BrandWall />
        </div>
      </section>
    </>
  );
}
