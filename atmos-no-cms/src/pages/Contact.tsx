// src/pages/Contact.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import "./Contact.css";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/* -----------------------------
   Variants (unchanged)
----------------------------- */
const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};
const titleChar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_BEZIER },
  },
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

  // --- NEW: control when animations are allowed to start
  const [ready, setReady] = useState(false); // becomes true after first user interaction
  useEffect(() => {
    if (reduce) return setReady(false); // skip anim logic if reduced motion
    const markReady = () => setReady(true);

    // First scroll or pointer makes us "ready"
    window.addEventListener("scroll", markReady, { once: true, passive: true });
    window.addEventListener("pointerdown", markReady, { once: true, passive: true });

    // Fallback: if they tab into the page
    window.addEventListener("keydown", markReady, { once: true, passive: true } as any);

    return () => {
      window.removeEventListener("scroll", markReady as any);
      window.removeEventListener("pointerdown", markReady as any);
      window.removeEventListener("keydown", markReady as any);
    };
  }, [reduce]);

  // --- NEW: use refs + inView + animation controls so they don't fire on initial paint
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Shrink the "viewport" a bit so elements must be scrolled further before counting as in-view
  const headerInView = useInView(headerRef, { amount: 0.6, margin: "0px 0px -15% 0px" });
  const formInView = useInView(formRef, { amount: 0.5, margin: "0px 0px -15% 0px" });

  const headerControls = useAnimation();
  const formControls = useAnimation();

  useEffect(() => {
    if (!reduce && ready && headerInView) headerControls.start("visible");
  }, [reduce, ready, headerInView, headerControls]);

  useEffect(() => {
    if (!reduce && ready && formInView) formControls.start("visible");
  }, [reduce, ready, formInView, formControls]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.currentTarget as HTMLFormElement).reset();
      alert("Thanks! We received your message.");
    }, 500);
  }

  // Split title into characters (like ProductGrid)
  const title = "Contact us";
  const titleChars = useMemo(() => Array.from(title), []);

  // Helper: props for animated blocks
  const animProps = (controls: ReturnType<typeof useAnimation>) =>
    reduce
      ? {} // no animation if user prefers reduced motion
      : { variants: filterGroup, initial: "hidden", animate: controls };

  return (
    <section className="contact">
      <div className="contact__wrap">
        {/* Header: gated by user interaction + inView */}
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

        {/* Form: also gated; rows still stagger via filterItem */}
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
                  <option value="" disabled>
                    Select one…
                  </option>
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

          {/* Radios two-column */}
          <motion.fieldset className="contactForm__row contactForm__radios" variants={filterItem}>
            <legend>Which best describes you?</legend>

            <div className="radioCol">
              <label className="radio">
                <input type="radio" name="persona" value="first" />
                <span>First choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="third" />
                <span>Third choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="fifth" />
                <span>Fifth choice</span>
              </label>
            </div>

            <div className="radioCol">
              <label className="radio">
                <input type="radio" name="persona" value="second" />
                <span>Second choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="fourth" />
                <span>Fourth choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="other" />
                <span>Other</span>
              </label>
            </div>
          </motion.fieldset>

          {/* Message */}
          <motion.div className="contactForm__row" variants={filterItem}>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={7} placeholder="Type your message..." />
            </div>
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





