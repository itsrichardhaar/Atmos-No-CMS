// src/pages/Contact.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import "./Contact.css";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

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
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_BEZIER } },
};

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const reduce = useReducedMotion();

  // reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Gate animations until the user interacts
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (reduce) { setReady(false); return; }
    const markReady = () => setReady(true);
    window.addEventListener("scroll", markReady, { once: true, passive: true });
    window.addEventListener("pointerdown", markReady, { once: true, passive: true });
    window.addEventListener("keydown", markReady as any, { once: true } as any);
    return () => {
      window.removeEventListener("scroll", markReady as any);
      window.removeEventListener("pointerdown", markReady as any);
      window.removeEventListener("keydown", markReady as any);
    };
  }, [reduce]);

  // inView + controls
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const headerInView = useInView(headerRef, { amount: 0.6, margin: "0px 0px -15% 0px" });
  const formInView = useInView(formRef, { amount: 0.5, margin: "0px 0px -15% 0px" });
  const headerControls = useAnimation();
  const formControls = useAnimation();
  useEffect(() => { if (!reduce && ready && headerInView) headerControls.start("visible"); }, [reduce, ready, headerInView, headerControls]);
  useEffect(() => { if (!reduce && ready && formInView) formControls.start("visible"); }, [reduce, ready, formInView, formControls]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!RECAPTCHA_SITE_KEY) {
      alert("reCAPTCHA is not configured. Please set VITE_RECAPTCHA_SITE_KEY.");
      return;
    }
    if (!captchaToken) {
      alert("Please verify that you’re not a robot.");
      recaptchaRef.current?.getValue();
      return;
    }

    setSubmitting(true);

    // TODO: send form + captchaToken to your backend here.

    setTimeout(() => {
      setSubmitting(false);
      (e.currentTarget as HTMLFormElement).reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      alert("Thanks! We received your message.");
    }, 500);
  }

  const title = "Contact us";
  const titleChars = useMemo(() => Array.from(title), []);
  const animProps = (controls: ReturnType<typeof useAnimation>) =>
    reduce ? {} : { variants: filterGroup, initial: "hidden", animate: controls };

  return (
    <section className="contact">
      <div className="contact__wrap">
        {/* Header */}
        <motion.div ref={headerRef} {...animProps(headerControls)}>
          <motion.p className="contact__tagline" variants={fadeUp}>
            Tagline
          </motion.p>

          <motion.h1 className="contact__title" variants={titleGroup} aria-label={title}>
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

          <motion.p className="contact__intro" variants={fadeUp}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          className="contactForm"
          onSubmit={onSubmit}
          noValidate
          {...animProps(formControls)}
        >
          {/* Row: First/Last */}
          <motion.div className="contactForm__row contactForm__row--2" variants={filterItem}>
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
          <motion.div className="contactForm__row contactForm__row--2" variants={filterItem}>
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

          {/* Radios btns */}
          <motion.fieldset className="contactForm__row contactForm__radios" variants={filterItem}>
            <legend>Which best describes you?</legend>
            <div className="radioCol">
              <label className="radio"><input type="radio" name="persona" value="first" /><span>First choice</span></label>
              <label className="radio"><input type="radio" name="persona" value="third" /><span>Third choice</span></label>
              <label className="radio"><input type="radio" name="persona" value="fifth" /><span>Fifth choice</span></label>
            </div>
            <div className="radioCol">
              <label className="radio"><input type="radio" name="persona" value="second" /><span>Second choice</span></label>
              <label className="radio"><input type="radio" name="persona" value="fourth" /><span>Fourth choice</span></label>
              <label className="radio"><input type="radio" name="persona" value="other" /><span>Other</span></label>
            </div>
          </motion.fieldset>

          {/* Message */}
          <motion.div className="contactForm__row" variants={filterItem}>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={7} placeholder="Type your message..." />
            </div>
          </motion.div>

          {/* reCAPTCHA */}
          <motion.div className="contactForm__row" variants={filterItem}>
            {RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                theme="dark"
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
                onErrored={() => setCaptchaToken(null)}
              />
            ) : (
              <p style={{ color: "#f99", margin: 0 }}>
                reCAPTCHA isn’t configured. Set <code>VITE_RECAPTCHA_SITE_KEY</code> in your env and redeploy.
              </p>
            )}
          </motion.div>

          {/* Submit */}
          <motion.div className="contactForm__actions" variants={filterItem}>
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







