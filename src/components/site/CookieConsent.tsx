"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

const KEY = "ll-cookie-consent";

/**
 * Cookie consent banner aligned with the Digital Personal Data Protection Act
 * (DPDP). Consent is explicit and opt-in: analytics/marketing cookies are only
 * set after "Accept". A real deployment would wire the stored choice into the
 * tag manager (see [[backend-architecture]], compliance & data).
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={styles.bar} role="region" aria-label="Cookie consent" data-testid="cookie-consent">
      <div className={`ll-container ${styles.inner}`}>
        <p className={styles.copy}>
          We use essential cookies to run this site, and, only with your consent, 
          analytics cookies to understand how it is used. You can change your choice at
          any time. See our <Link href="/contact" className={styles.link}>privacy notice</Link>.
        </p>
        <div className={styles.actions}>
          <button className={styles.ghost} onClick={() => decide("rejected")}>
            Essential only
          </button>
          <button className={styles.primary} onClick={() => decide("accepted")} data-testid="cookie-accept">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
