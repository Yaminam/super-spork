"use client";

import { useState } from "react";
import styles from "./CareersForm.module.css";

const AREAS = [
  "Marketing & Brand",
  "Operations & Supply",
  "Sales & Commercial",
  "Technology & Data",
  "Finance & Strategy",
  "People & Culture",
  "Other / Not sure yet",
];

const LOCATIONS = ["Gurugram", "Mumbai", "Nashik", "Behror", "Other / Remote"];

const EXPERIENCE = [
  "Student / Internship",
  "0–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

const RECRUITER_EMAIL = "careers.india@pernod-ricard.com";

type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "area"
  | "location"
  | "experience"
  | "links"
  | "message";

const EMPTY: Record<Field, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  area: "",
  location: "",
  experience: "",
  links: "",
  message: "",
};

export default function CareersForm() {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | "consent", string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<Field | "consent", string>> = {};
    if (!values.firstName.trim()) next.firstName = "Required";
    if (!values.lastName.trim()) next.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email";
    if (!values.area) next.area = "Choose an area";
    if (!values.experience) next.experience = "Select your experience";
    if (!consent) next.consent = "Please agree to be contacted";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // No backend in this corporate prototype: compose a pre-filled email so the
    // application reaches the talent team, and show an on-page confirmation.
    const subject = `Career interest — ${values.area} (${values.firstName} ${values.lastName})`;
    const body = [
      `Name: ${values.firstName} ${values.lastName}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      `Area of interest: ${values.area}`,
      values.location && `Preferred location: ${values.location}`,
      `Experience: ${values.experience}`,
      values.links && `LinkedIn / portfolio / résumé: ${values.links}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${RECRUITER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.done} role="status" aria-live="polite">
        <span className={styles.doneMark} aria-hidden>✦</span>
        <h3 className={styles.doneTitle}>Thank you, {values.firstName || "there"}.</h3>
        <p className={styles.doneText}>
          Your interest in our <strong>{values.area || "team"}</strong> is on its way to our talent team. We have
          opened a pre-filled email for you to send — if it didn&apos;t appear, write to us directly at{" "}
          <a href={`mailto:${RECRUITER_EMAIL}`} className={styles.doneLink}>{RECRUITER_EMAIL}</a>.
        </p>
        <button type="button" className={styles.reset} onClick={() => { setSent(false); setValues(EMPTY); setConsent(false); }}>
          Submit another interest
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <Field label="First name" required error={errors.firstName}>
          <input className={styles.input} type="text" autoComplete="given-name" value={values.firstName} onChange={set("firstName")} />
        </Field>
        <Field label="Last name" required error={errors.lastName}>
          <input className={styles.input} type="text" autoComplete="family-name" value={values.lastName} onChange={set("lastName")} />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input className={styles.input} type="email" autoComplete="email" value={values.email} onChange={set("email")} />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input className={styles.input} type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} />
        </Field>
        <Field label="Area of interest" required error={errors.area}>
          <select className={styles.input} value={values.area} onChange={set("area")}>
            <option value="" disabled>Select an area…</option>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Preferred location" error={errors.location}>
          <select className={styles.input} value={values.location} onChange={set("location")}>
            <option value="">No preference</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Experience" required error={errors.experience}>
          <select className={styles.input} value={values.experience} onChange={set("experience")}>
            <option value="" disabled>Select…</option>
            {EXPERIENCE.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </Field>
        <Field label="LinkedIn / portfolio / résumé link" error={errors.links}>
          <input className={styles.input} type="url" placeholder="https://" value={values.links} onChange={set("links")} />
        </Field>
      </div>

      <Field label="Why you'd like to build here" error={errors.message} full>
        <textarea className={`${styles.input} ${styles.textarea}`} rows={4} value={values.message} onChange={set("message")} placeholder="A few words about what draws you to the house and where you'd make an impact." />
      </Field>

      <label className={styles.consent}>
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((er) => ({ ...er, consent: undefined })); }} />
        <span>I agree to be contacted by the Pernod Ricard India talent team about opportunities, and to my details being processed for recruitment.</span>
      </label>
      {errors.consent && <p className={styles.errorLine}>{errors.consent}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>Submit your interest <span aria-hidden>→</span></button>
        <p className={styles.note}>Or write to us directly at <a href={`mailto:${RECRUITER_EMAIL}`}>{RECRUITER_EMAIL}</a>.</p>
      </div>
    </form>
  );
}

function Field({ label, required, error, full, children }: {
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`${styles.field} ${full ? styles.fieldFull : ""}`}>
      <span className={styles.fieldLabel}>
        {label}{required && <span className={styles.req} aria-hidden> *</span>}
      </span>
      {children}
      {error && <span className={styles.errorLine}>{error}</span>}
    </label>
  );
}
