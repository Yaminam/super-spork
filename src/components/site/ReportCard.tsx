import Image from "next/image";
import { reportDescription, reportImage, reportLabel } from "@/content/report-meta";
import type { DocItem } from "@/content/documents";
import styles from "./ReportCard.module.css";

/** One report: name, description, image, then the PDF download. */
export default function ReportCard({ doc, index }: { doc: DocItem; index: number }) {
  const img = reportImage(index);
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{doc.title}</h3>
      <p className={styles.text}>{reportDescription(doc)}</p>
      {img && (
        <span className={styles.media}>
          <Image src={img} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" />
        </span>
      )}
      <a href={doc.file} target="_blank" rel="noopener noreferrer" download className={styles.download}>
        <span className={styles.pdfIcon} aria-hidden>PDF</span>
        <span>Download</span>
        <span className={styles.size}>{reportLabel(doc)}</span>
      </a>
    </article>
  );
}
