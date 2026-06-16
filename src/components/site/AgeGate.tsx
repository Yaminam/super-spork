"use client";

import { useEffect, useState } from "react";
import styles from "./AgeGate.module.css";

const KEY = "ll-age-verified";

/**
 * Age verification gate (Indian alco-bev compliance). This is a CORPORATE
 * site, so the gate is a confirmation of legal drinking age, not a consumer
 * unlock. Choice persists in localStorage; declining shows a respectful
 * message rather than content. Renders nothing until mounted to avoid a
 * hydration flash, and is hidden from AX tree when inactive.
 */
export default function AgeGate() {
  const [state, setState] = useState<"loading" | "ask" | "declined" | "ok">("loading");

  useEffect(() => {
    try {
      setState(localStorage.getItem(KEY) === "true" ? "ok" : "ask");
    } catch {
      setState("ask");
    }
  }, []);

  const confirm = () => {
    try {
      localStorage.setItem(KEY, "true");
    } catch {}
    setState("ok");
  };

  if (state === "loading" || state === "ok") return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="age-title" data-testid="age-gate">
      <div className={styles.panel}>
        <p className={styles.kicker}>Pernod Ricard India</p>
        {state === "ask" ? (
          <>
            <h2 id="age-title" className={`ll-display ${styles.title}`}>
              A moment, before you enter.
            </h2>
            <p className={styles.body}>
              This is a corporate website. To continue, please confirm that you are of
              legal drinking age in your country of residence.
            </p>
            <div className={styles.actions}>
              <button className={styles.primary} onClick={confirm} data-testid="age-confirm">
                I am of legal drinking age
              </button>
              <button className={styles.ghost} onClick={() => setState("declined")}>
                I am not
              </button>
            </div>
            <p className={styles.note}>Please enjoy our brands responsibly.</p>
          </>
        ) : (
          <>
            <h2 id="age-title" className={`ll-display ${styles.title}`}>
              Thank you for your honesty.
            </h2>
            <p className={styles.body}>
              We are sorry, but this site is intended for visitors who are of legal
              drinking age. You are welcome to return when you are.
            </p>
            <button className={styles.ghost} onClick={() => setState("ask")}>
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
