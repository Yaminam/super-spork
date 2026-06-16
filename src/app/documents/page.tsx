import PageIntro from "@/components/site/PageIntro";
import Reveal from "@/components/site/Reveal";
import ReportCard from "@/components/site/ReportCard";
import { DOCUMENTS } from "@/content/documents";
import styles from "./documents.module.css";

export const metadata = {
  title: "Documents & Reports",
  description: "Annual reports, investor results and sustainability documents from Pernod Ricard.",
};

const SECTION_LABELS: Record<string, string> = {
  investors: "Investors",
  sustainability: "Sustainability & Responsibility",
  annual: "Annual Report",
  results: "Results",
  "our-group": "Our Group",
  general: "General",
};

function grouped() {
  const map = new Map<string, typeof DOCUMENTS>();
  for (const d of DOCUMENTS) {
    if (!map.has(d.section)) map.set(d.section, []);
    map.get(d.section)!.push(d);
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

export default function DocumentsPage() {
  const groups = grouped();
  let idx = 0;
  return (
    <>
      <PageIntro
        index="09"
        eyebrow="Documents & Reports"
        title="The house, on the record."
        lede={`Annual reports, financial results and sustainability documents. ${DOCUMENTS.length} files, free to download.`}
      />
      <section className="ll-section">
        <div className="ll-container">
          {groups.map(([section, docs]) => (
            <div key={section} className={styles.group}>
              <h2 className={styles.groupTitle}>
                {SECTION_LABELS[section] ?? section}
                <span className={styles.groupCount}>{docs.length}</span>
              </h2>
              <div className={styles.grid}>
                {docs.map((d) => {
                  const i = idx++;
                  return (
                    <Reveal key={d.file} delay={(i % 3) * 0.05}>
                      <ReportCard doc={d} index={i} />
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
