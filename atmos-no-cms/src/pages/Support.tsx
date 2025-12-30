import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import "./Support.css";
import "./MarketDetail.css";

/* Swap this to any Support hero you want */
const heroImage =
  "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/about/LED_Detail.webp";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const DOWNLOAD_URL = "https://example.com"; // <-- replace with your real download URL

/* -----------------------------
   Keep H1 animation EXACTLY as-is
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

/* -----------------------------
   Reused ProductGrid-style motions
----------------------------- */
const filterGroup: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const filterItem: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

const intro = {
  headline: "Remote Support Download",
  body: [
    "Need help with an Atmos LED product or troubleshooting? You’re in the right place.",
    "Download the Atmos LED Remote Support tool to your computer for remote assistance by a support expert. Once installed our team can remote into your device and assist with install and performance support.",
    "If you’re on a timeline, reach out, our goal is to keep your project moving with fast, clear answers.",
  ],
};

const installSteps = [
  "If you're in need of support and have not contacted us yet, please Submit A Request or call our office at 833-286-6728.",
  "You must have an active, stable internet connection with sufficient bandwidth to support remote desktop software where the screen is located.",
  "The LED Screen must be powered on and connected to the processor.",
  "The processor must be connected to the control computer via USB or Ethernet LAN.",
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What information should I include when requesting support?",
    a: "Include your product series, pixel pitch (if known), a short description of the issue, and photos or video when possible. If the question is installation-related, include mounting type, dimensions, and controller/processor details. This helps us diagnose quickly and respond with the right next steps.",
  },
  {
    q: "How do I troubleshoot a module or cabinet that isn’t displaying correctly?",
    a: "Start by confirming signal flow and power: check cable seating, swap known-good data/power runs, and verify controller output. If only one area is affected, isolate by swapping the module position (if applicable) to determine whether it follows the module or stays with the cabinet/channel. Document results and share them with support for faster resolution.",
  },
  {
    q: "Do you provide help choosing the right LED series for my application?",
    a: "Yes. Tell us viewing distance, environment (indoor/outdoor), brightness needs, content type, and target dimensions. We’ll recommend a series and pixel pitch that matches your goals and budget while minimizing surprises during install and commissioning.",
  },
  {
    q: "Can you help with installation and commissioning guidance?",
    a: "Absolutely. We can provide guidance on mounting considerations, service access (front/rear), basic commissioning checks, and common pitfalls to avoid. For integrators and dealers, we’ll collaborate to support a smooth handoff and long-term performance.",
  },
  {
    q: "What’s the best way to get in touch if I need urgent help?",
    a: "Use the Contact page and include “URGENT” in your message subject plus a phone number for quickest follow-up. If it’s a show-critical or time-sensitive scenario, include what you’ve already tested so we can jump directly to the next diagnostic step.",
  },
];

export default function Support() {
  const reduce = useReducedMotion();
  const title = "Support";
  const titleChars = useMemo(() => Array.from(title), [title]);

  // In-view helper (unchanged) for sections that should wait for scroll
  const motionProps = (variants: Variants, amount = 0.75) =>
    reduce
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount } };

  // mount-based helper so above-the-fold content plays on page load
  const mountProps = (variants: Variants) =>
    reduce ? {} : { variants, initial: "hidden", animate: "visible" };

  return (
    <section className="support support--heroBleed">
      <div className="support__hero">
        <img
          src={heroImage}
          alt="Atmos LED Support"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="support__heroInner">
          <div className="support__heroContent">
            {/* H1 stays exactly the same pattern as About */}
            <motion.h1
              id="support-heading"
              className="support__title"
              variants={titleGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              aria-label={title}
            >
              {titleChars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={titleChar}
                  className="support__titleChar"
                  style={{ display: "inline-block" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container support__wrap">
        {/* Intro — headline + paragraphs animate on mount */}
        <motion.section className="supportIntro supportIntro--single" {...mountProps(filterGroup)}>
          <div className="supportIntro__copy">
            <motion.h2 className="supportIntro__headline" variants={filterItem}>
              {intro.headline}
            </motion.h2>

            {intro.body.map((para, idx) => (
              <motion.p key={idx} className="supportIntro__body" variants={filterItem}>
                {para}
              </motion.p>
            ))}

            {/* NEW: Installation Steps */}
            <motion.h3 className="supportIntro__subhead" variants={filterItem}>
              Installation Steps
            </motion.h3>

            <motion.ul className="supportIntro__steps" variants={filterItem}>
              {installSteps.map((step, idx) => (
                <li key={idx} className="supportIntro__step">
                  {step}
                </li>
              ))}
            </motion.ul>

            {/* NEW: External download button */}
            <motion.div className="supportIntro__download" variants={filterItem}>
              <a
                className="btn btn--primary"
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Support Tool
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA — in-view */}
        <motion.section className="supportCTA" {...motionProps(fadeUp, 0.7)}>
          <h2 className="supportCTA__h2">Need assistance?</h2>
          <p className="supportCTA__p">Send us details and we’ll get back quickly.</p>
          <div className="supportCTA__actions">
            <Link className="btn btn--primary" to="/contact">
              Contact Support
            </Link>
          </div>
        </motion.section>

        {/* FAQs — split layout */}
        <section className="supportFaqs supportFaqs--split">
          <motion.aside className="supportFaqs__intro" {...motionProps(filterGroup, 0.75)}>
            <motion.h2 className="supportFaqs__kicker" variants={filterItem}>
              FAQs
            </motion.h2>
            <motion.p className="supportFaqs__lead" variants={filterItem}>
              Quick answers for common support questions—troubleshooting, commissioning,
              and selecting the right LED solution.
            </motion.p>

            <motion.div variants={filterItem}>
              <Link className="supportFaqs__cta" to="/contact">
                <span>Contact Us</span>
                <span className="supportFaqs__ctaArrow" aria-hidden="true">
                  ›
                </span>
              </Link>
            </motion.div>
          </motion.aside>

          <motion.div className="supportFaqs__right" {...motionProps(filterGroup, 0.8)}>
            <div className="supportFaqs__list" role="list">
              {faqs.map((f, i) => (
                <motion.details key={i} className="supportFaqs__item" variants={filterItem}>
                  <summary className="supportFaqs__q">{f.q}</summary>
                  <div className="supportFaqs__aWrap">
                    <p className="supportFaqs__a">{f.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </section>
  );
}