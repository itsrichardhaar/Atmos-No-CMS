// src/pages/Contact.tsx
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import "./Contact.css";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/* -----------------------------
   Reused from ProductGrid
----------------------------- */
// Title split/stagger (by chars)
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

// "Filter" style group/row reveal
const filterGroup = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const filterItem = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Simple fade for tagline/intro to match PG header vibe
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const reduce = useReducedMotion();

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

  // Helper to disable animations when user prefers reduced motion
  const motionProps = (variants: Variants, amount = 0.75) =>
    reduce ? {} : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount } };

  return (
    <section className="contact">
      <div className="contact__wrap">
        {/* Header: tagline -> split-char title -> intro */}
        <motion.div {...motionProps(filterGroup, 0.8)}>
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

        {/* Form: apply ProductGrid's filter-like stagger row-by-row */}
        <motion.form
          className="contactForm"
          onSubmit={onSubmit}
          noValidate
          {...motionProps(filterGroup, 0.8)}
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




