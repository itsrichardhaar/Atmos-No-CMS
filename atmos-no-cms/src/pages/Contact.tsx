// src/pages/Contact.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import "./Contact.css";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xldogbak";
const RECAPTCHA_SITE_KEY = (import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "").trim();
const hasSiteKey = Boolean(RECAPTCHA_SITE_KEY);

/* -----------------------------
   Animation Variants
----------------------------- */
const titleGroup: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } };
const titleChar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_BEZIER } },
};
const filterGroup: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const filterItem: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const reduce = useReducedMotion();

  // Animate on mount
  const headerControls = useAnimation();
  const formControls = useAnimation();
  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => {
      headerControls.start("visible");
      formControls.start("visible");
    });
    return () => cancelAnimationFrame(id);
  }, [reduce, headerControls, formControls]);

  /* -----------------------------
     Submit handler (Formspree + reCAPTCHA)
  ----------------------------- */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (RECAPTCHA_SITE_KEY && !captchaToken) {
        throw new Error("Please verify that you’re not a robot.");
      }

      const form = e.currentTarget;
      const fd = new FormData(form);

      // Required for Formspree custom reCAPTCHA
      if (captchaToken) fd.set("g-recaptcha-response", captchaToken);

      // Optional helpers
      fd.set("_subject", "New quote request");

      // Convert to URL-encoded string (safer than JSON with Formspree + reCAPTCHA)
      const body = new URLSearchParams();
      fd.forEach((value, key) => {
        body.append(key, String(value));
      });

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body.toString(),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error("Formspree error:", data);
        const msg =
          data?.errors?.map((e: any) => e.message).join(", ") ||
          data?.message ||
          `Request failed: ${res.status}`;
        throw new Error(msg);
      }

      alert("✅ Thanks! We received your message.");
      form.reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err: any) {
      alert(err.message || "❌ Sorry, something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  /* -----------------------------
     Animation helpers
  ----------------------------- */
  const title = "Get a Quote";
  const titleChars = useMemo(() => Array.from(title), []);
  const animProps = (controls: ReturnType<typeof useAnimation>) =>
    reduce ? {} : { variants: filterGroup, initial: "hidden", animate: controls };

  /* -----------------------------
     JSX
  ----------------------------- */
  return (
    <section className="contact">
      <div className="contact__wrap">
        {/* Title */}
        <motion.div {...animProps(headerControls)}>
          <motion.h1
            className="contact__title"
            variants={titleGroup}
            aria-label={title}
            style={{ marginBottom: "clamp(16px, 3.5vh, 40px)" }}
          >
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                variants={titleChar}
                style={{ display: "inline-block" }}
                className="contact__titleChar"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Form */}
        <motion.form
          className="contactForm"
          onSubmit={onSubmit}
          noValidate
          {...animProps(formControls)}
          style={{ marginTop: "clamp(8px, 2.5vh, 28px)", display: "grid", gap: "18px" }}
        >
          {/* Honeypot + Subject */}
          <input type="hidden" name="_subject" value="New quote request" />
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Row: First / Last */}
          <motion.div className="contactForm__row contactForm__row--2" variants={filterItem} style={{ gap: 16 }}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="organization">Organization</label>
              <input id="organization" name="organization" type="text" autoComplete="company-name" />
            </div>
          </motion.div>

          {/* Row: Email / Phone */}
          <motion.div className="contactForm__row contactForm__row--2" variants={filterItem} style={{ gap: 16 }}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </motion.div>

          {/* Topic select */}
          <motion.div className="contactForm__row" variants={filterItem}>
            <div className="field">
              <label htmlFor="topic">Choose a topic</label>
              <div className="selectWrap">
                <select id="topic" name="topic" defaultValue="">
                  <option value="" disabled>Select one…</option>
                  <option>Sales / New project</option>
                  <option>Service & Support</option>
                  <option>Partnerships</option>
                  <option>Careers</option>
                  <option>Other</option>
                </select>
                <span className="selectCaret" aria-hidden="true">▾</span>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div className="contactForm__row" variants={filterItem}>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={7}
                placeholder="Tell us about your project…"
              />
            </div>
          </motion.div>

          {/* reCAPTCHA widget */}
          {!!RECAPTCHA_SITE_KEY && (
            <div
            className="contactForm__row recaptchaRow"
            // NOTE: not animated; keep it plain to avoid iframe render issues
            style={{
              position: "relative",
              zIndex: 5,
              padding: "4px 0",
              minHeight: 78,         // v2 checkbox height
            }}
          >
            {!hasSiteKey && (
              <p style={{ color: "#f99", margin: 0 }}>
                reCAPTCHA site key is missing. Set <code>VITE_RECAPTCHA_SITE_KEY</code> in your production env and redeploy.
              </p>
            )}

            {hasSiteKey && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                theme="dark"
                size="normal"            // ensure checkbox mode
                hl="en"
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
                onErrored={() => setCaptchaToken(null)}
                // Make the box impossible to hide by layout quirks
                className="recaptchaBox"
              />
            )}
          </div>
          )}
          {/* Submit */}
          <motion.div
            className="contactForm__actions"
            variants={filterItem}
            style={{ display: "flex", alignItems: "center", marginTop: 4, minHeight: 48 }}
          >
            <motion.button
              className="btn btn--primary contactForm__submit"
              disabled={submitting}
              type="submit"
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.08 }}
            >
              {submitting ? "Submitting…" : "Submit"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}













