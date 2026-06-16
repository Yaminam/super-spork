import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/site/Reveal";
import { BRAND_DETAILS, BRAND_BY_SLUG } from "@/content/brands-detail";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return BRAND_DETAILS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = BRAND_BY_SLUG[slug];
  if (!b) return { title: "Brand" };
  return { title: b.name, description: b.description?.slice(0, 160) || `${b.name}, part of the Pernod Ricard portfolio.` };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = BRAND_BY_SLUG[slug];
  if (!brand) notFound();

  const gallery = brand.products.filter(Boolean);
  const related = BRAND_DETAILS.filter((b) => b.category === brand.category && b.slug !== brand.slug).slice(0, 4);

  return (
    <article className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        {brand.hero ? (
          <Image className={styles.heroImg} src={brand.hero} alt={brand.name} fill sizes="100vw" priority />
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}
        <div className={styles.heroShade} />
        <div className={`ll-container ${styles.heroContent}`}>
          <Reveal>
            <p className="ll-eyebrow"><Link href="/brands" className={styles.back}>Brands</Link> · {brand.category}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className={`ll-display ${styles.title}`}>{brand.name}</h1>
          </Reveal>
        </div>
      </header>

      {/* Lead + facts */}
      {(brand.description || brand.blocks.length > 0) && (
        <section className={`ll-section ${styles.intro}`}>
          <div className={`ll-container ${styles.introGrid}`}>
            <div className={styles.introMain}>
              {brand.description && (
                <Reveal><p className={styles.desc}>{brand.description}</p></Reveal>
              )}
              {brand.blocks.length > 0 && (
                <div className={styles.story}>
                  {brand.blocks.map((b, i) => (
                    <Reveal key={i}>
                      {b.t === "h" ? (
                        <h2 className={b.level <= 2 ? styles.storyH2 : styles.storyH3}>{b.v}</h2>
                      ) : (
                        <p className={styles.storyP}>{b.v}</p>
                      )}
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
            <aside className={styles.facts}>
              {brand.bottle && (
                <Reveal>
                  <div className={styles.bottleWrap}>
                    <Image
                      className={styles.bottleImg}
                      src={brand.bottle}
                      alt={`${brand.name} bottle`}
                      fill
                      sizes="(max-width: 900px) 80vw, 28vw"
                    />
                  </div>
                </Reveal>
              )}
              <Reveal>
                <dl className={styles.factList}>
                  <dt>Category</dt>
                  <dd>{brand.category}</dd>
                  <dt>House</dt>
                  <dd>Pernod Ricard</dd>
                </dl>
              </Reveal>
            </aside>
          </div>
        </section>
      )}

      {/* Product gallery */}
      {gallery.length > 0 && (
        <section className={`ll-section ${styles.gallerySec}`}>
          <div className="ll-container">
            <Reveal><p className="ll-eyebrow"><span>·</span> The range</p></Reveal>
            <ul className={styles.gallery}>
              {gallery.map((src, i) => (
                <Reveal as="li" className={styles.shot} key={src} delay={(i % 3) * 0.06}>
                  <Image src={src} alt={`${brand.name}, ${i + 1}`} fill sizes="(max-width: 720px) 50vw, 30vw" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className={`ll-section ${styles.relatedSec}`}>
          <div className="ll-container">
            <p className="ll-eyebrow"><span>·</span> More in {brand.category}</p>
            <ul className={styles.related}>
              {related.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className={styles.relatedCard}>
                    {b.hero || b.bottle ? (
                      <Image src={(b.hero || b.bottle) as string} alt={b.name} fill sizes="(max-width: 720px) 50vw, 22vw" className={!b.hero ? styles.relatedBottle : undefined} />
                    ) : (
                      <span className={styles.relatedFallback} aria-hidden />
                    )}
                    <span className={styles.relatedName}>{b.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
