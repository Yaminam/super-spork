import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import HistoryTimeline from "./HistoryTimeline";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "From an 1805 lineage in France to one of India's largest premium spirits companies: the story of Pernod Ricard in India since 1993.",
  alternates: { canonical: "/group/our-history" },
};

const MILESTONES: { year: string; title: string; text: string }[] = [
  { year: "1805", title: "The lineage begins", text: "Maison Pernod opens in France. The craft and the name that will anchor the house enter the world." },
  { year: "1975", title: "Two families, one vision", text: "Pernod and Ricard merge to form Pernod Ricard, a French house with global ambition." },
  { year: "1993", title: "India begins", text: "Pernod Ricard India is incorporated, an early bet on the country's appetite for premium spirits." },
  { year: "2001", title: "An Indian portfolio", text: "The group's acquisition of Seagram brings Royal Stag, Blenders Pride, Imperial Blue and 100 Pipers into the house." },
  { year: "2000s", title: "Made in India, at scale", text: "Indian-made whiskies grow nationally as the business invests in local manufacturing and distribution." },
  { year: "2010s", title: "Trading up", text: "Premiumisation accelerates; the network grows to more than thirty bottling plants and distilleries at Nashik and Behror." },
  { year: "2021", title: "A good place", text: "The 'Good Times from a Good Place' 2030 roadmap drives water stewardship and community action across India." },
  { year: "2023", title: "A new chapter", text: "Jean Touboul is appointed Managing Director & CEO, continuing the transformation of the India business." },
  { year: "Today", title: "Among India's largest", text: "The second-largest spirits company in India by revenue, manufacturing nationwide and building for the decades ahead." },
];

export default function OurHistoryPage() {
  const hero = PAGES["group-history"]?.hero;
  const imgs = (PAGES["group-history"]?.blocks ?? [])
    .filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img")
    .map((b) => b.v)
    .filter((v) => v !== hero);
  // give roughly every other milestone an image, drawn from the page's own set
  const timeline = MILESTONES.map((m, i) => ({
    ...m,
    img: i % 2 === 1 ? imgs[Math.floor(i / 2) % Math.max(1, imgs.length)] : undefined,
  }));
  return (
    <>
      <JsonLd
        id="ld-history"
        data={[
          webPageSchema({ name: "Our History", description: metadata.description as string, path: "/group/our-history" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Group", path: "/group" },
            { name: "Our History", path: "/group/our-history" },
          ]),
        ]}
      />

      <PageIntro
        index="02 / History"
        eyebrow="Our History"
        title="A lineage from 1805. A business built in India since 1993."
        lede="The story of Pernod Ricard in India joins two centuries of French craft to three decades of patient, premium brand-building in one of the world's most dynamic markets."
      />

      {hero && (
        <section className={styles.heroSec}>
          <div className="ll-container">
            <Reveal>
              <span className={styles.heroFrame}>
                <Image src={hero} alt="Pernod Ricard heritage" fill sizes="(max-width: 1200px) 100vw, 1200px" priority />
              </span>
            </Reveal>
          </div>
        </section>
      )}

      <section className={`ll-section ${styles.timelineSec}`}>
        <div className="ll-container">
          <Reveal><p className="ll-eyebrow"><span>·</span> The milestones</p></Reveal>
          <HistoryTimeline items={timeline} />
        </div>
      </section>
    </>
  );
}
