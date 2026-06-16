/** Helper meta for report cards: a one-line description + a distinct image. */
import { BRAND_DETAILS } from "./brands-detail";
import { PAGES } from "./pages";

const seen = new Set<string>();
const pageImgs = Object.values(PAGES).flatMap((p) => [
  p.hero,
  ...p.blocks.filter((b): b is { t: "img"; v: string; alt: string } => b.t === "img").map((b) => b.v),
]);
export const REPORT_IMAGES: string[] = [
  ...BRAND_DETAILS.filter((b) => b.hero).map((b) => b.hero as string),
  ...pageImgs.filter((v): v is string => Boolean(v)),
].filter((v) => v && !seen.has(v) && (seen.add(v), true));

export function reportImage(i: number): string | null {
  return REPORT_IMAGES.length ? REPORT_IMAGES[i % REPORT_IMAGES.length] : null;
}

export function reportDescription(d: { title: string; section: string }): string {
  const t = `${d.title} ${d.section}`.toLowerCase();
  if (/registration|annual|integrated|\biar\b/.test(t))
    return "The integrated annual report: strategy, performance, governance and sustainability, gathered in one volume.";
  if (/transcript/.test(t))
    return "The full results-call transcript, with management commentary and analyst questions.";
  if (/presentation|comfi/.test(t))
    return "The results presentation: financial detail and category performance, slide by slide.";
  if (/agm|general.?meeting/.test(t))
    return "Documents prepared for the Annual General Meeting of shareholders.";
  if (/sustainab|responsib/.test(t))
    return "Sustainability reporting and the independent review of our non-financial performance.";
  if (/sales|results|full.?year|half.?year|\bh1\b|\b9m\b|\bq[1-4]\b|\bfy\d/.test(t))
    return "Sales and results: net sales, organic growth and profit, by region and by category.";
  if (/press/.test(t))
    return "An official press release from the house.";
  return "A document from the Pernod Ricard library.";
}

export function reportLabel(d: { kb: number }): string {
  return d.kb >= 1024 ? `${(d.kb / 1024).toFixed(1)} MB` : `${d.kb} KB`;
}
