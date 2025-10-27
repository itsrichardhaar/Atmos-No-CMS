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

/* -----------------------------
   Variants
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
  const reduce = useReducedMotion();

  // Anim controls
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

  // reCAPTCHA v2
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // If Custom reCAPTCHA is on in Formspree, require a token
      if (RECAPTCHA_SITE_KEY && !captchaToken) {
        throw new Error("Please verify that you’re not a robot.");
      }

      const formData = new FormData(e.currentTarget);
      const payload: Record<string, any> = Object.fromEntries(formData.entries());

      // Formspree expects this exact field name
      if (captchaToken) payload["g-recaptcha-response"] = captchaToken;

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          data?.errors?.map((e: any) => e.message).join(", ") ||
          data?.message ||
          `Request failed: ${res.status}`;
        throw new Error(msg);
      }

      alert("Thanks! We received your message.");
      (e.currentTarget as HTMLFormElement).reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Sorry, something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const title = "Get a Quote";
  const titleChars = useMemo(() => Array.from(title), []);
  const animProps = (controls: ReturnType<typeof useAnimation>) =>
    reduce ? {} : { variants: filterGroup, initial: "hidden", animate: controls };

  return (
    <section className="contact">
      <div className="contact__wrap">
        {/* Header */}
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
          {/* Hidden helpers for Formspree */}
          <input type="hidden" name="_subject" value="New quote request" />
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          {/* Row: First/Last */}
          <motion.div className="contactForm__row contactForm__row--2" variants={filterItem} style={{ gap: 16 }}>
            <div className="field">
              <label htmlFor="first">First name</label>
              <input id="first" name="first" type="text" autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="last">Last name</label>
              <input id="last" name="last" type="text" autoComplete="family-name" />
            </div>
          </motion.div>

          {/* Row: Email/Phone */}
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
              <textarea id="message" name="message" rows={7} placeholder="Tell us about your project…" />
            </div>
          </motion.div>

          {/* reCAPTCHA widget (required for Custom reCAPTCHA) */}
          {!!RECAPTCHA_SITE_KEY && (
            <motion.div className="contactForm__row" variants={filterItem}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                theme="dark"
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
                onErrored={() => setCaptchaToken(null)}
              />
            </motion.div>
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












