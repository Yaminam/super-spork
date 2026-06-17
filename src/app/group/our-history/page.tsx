import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { PAGES } from "@/content/pages";
import BrandHighlights from "@/components/site/BrandHighlights";
import HistoryTimeline from "./HistoryTimeline";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "From an 1805 lineage in France to one of India's largest premium spirits companies: the story of Pernod Ricard in India since 1993.",
  alternates: { canonical: "/group/our-history" },
};

const MILESTONES: { year: string; title: string; text: string; img?: string }[] = [
  { year: "1715", title: "Martell", text: "Maison Martell is founded in Cognac, one of the oldest of the great cognac houses.", img: "/images/brands/martell/25-brand-martell-cordon-bleu-lifestyle-orig.jpg" },
  { year: "1780", title: "Jameson", text: "John Jameson establishes his Dublin distillery, and Irish whiskey enters the house's future.", img: "/images/pernod/27-jameson_distillery_bow_st_bar.jpg" },
  { year: "1805", title: "The lineage begins", text: "Maison Pernod opens in France. The craft and the name that will anchor the house enter the world." },
  { year: "1811", title: "Perrier-Jouët", text: "The champagne house is founded in Épernay, a name still poured at the finest tables.", img: "/images/pernod/32-maison_belle_epoque.jpg" },
  { year: "1824", title: "The Glenlivet", text: "Licensed in Speyside, it becomes one of the defining single malt Scotch whiskies.", img: "/images/pernod/33-the_glenlivet_distillery.jpg" },
  { year: "1827", title: "Ballantine's", text: "George Ballantine begins blending in Edinburgh, building a Scotch loved worldwide." },
  { year: "1863", title: "Beefeater", text: "The classic London Dry gin is established, and goes on to travel the world.", img: "/images/brands/beefeater/26-brand-beefeater-24-lifestyle-original-jp.jpg" },
  { year: "1909", title: "Chivas Regal", text: "Chivas Brothers releases Chivas Regal, a benchmark of aged, blended Scotch.", img: "/images/pernod/13-chivas-brothers-engineers-celebrate-_1_.jpg" },
  { year: "1934", title: "Havana Club", text: "The Cuban rum is founded, later a global icon of the category.", img: "/images/pernod/14-havanaclub-31_0.jpg" },
  { year: "1965", title: "100 Pipers", text: "The blended Scotch launches, and grows into a leader across Asia." },
  { year: "1975", title: "Two families, one vision", text: "Pernod and Ricard merge to form Pernod Ricard, a French house with global ambition." },
  { year: "1979", title: "Absolut", text: "Absolut Vodka launches from Åhus, Sweden, and redefines premium vodka.", img: "/images/brands/absolut/25-originalsizejpeg-absolut_atlas_lifestyle.jpg" },
  { year: "1993", title: "India begins", text: "Pernod Ricard India is incorporated, an early bet on the country's appetite for premium spirits." },
  { year: "1995", title: "Made in India", text: "Royal Stag and Blenders Pride launch, Indian-made whiskies built for the market.", img: "/images/brands/royal-stag/25-brand-royal-stag-barrel-select-lifestyle.jpg" },
  { year: "1997", title: "Imperial Blue", text: "A new Indian whisky joins the portfolio and scales rapidly nationwide.", img: "/images/brands/imperial/23-brand-imperial-lifestyle-original-jpg.jpg" },
  { year: "2001", title: "An Indian portfolio", text: "The group's acquisition of Seagram brings Royal Stag, Blenders Pride, Imperial Blue and 100 Pipers into the house." },
  { year: "2010s", title: "Trading up", text: "Premiumisation accelerates; the network grows to more than thirty bottling plants and distilleries at Nashik and Behror." },
  { year: "2021", title: "A good place", text: "The 'Good Times from a Good Place' 2030 roadmap drives water stewardship and community action across India.", img: "/images/pernod/28-nurturing_terroir1440x1080.jpg" },
  { year: "2023", title: "A new chapter", text: "Jean Touboul is appointed Managing Director & CEO, continuing the transformation of the India business." },
  { year: "Today", title: "Among India's largest", text: "The second-largest spirits company in India by revenue, manufacturing nationwide and building for the decades ahead.", img: "/images/pernod/31-midleton_distillery.jpg" },
];

export default function OurHistoryPage() {
  const hero = PAGES["group-history"]?.hero;
  // each milestone now carries its own brand image (see MILESTONES above)
  const timeline = MILESTONES;
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

      <BrandHighlights />
    </>
  );
}
