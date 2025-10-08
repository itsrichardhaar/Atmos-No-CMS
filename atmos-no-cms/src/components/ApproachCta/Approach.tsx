import styles from "../ApproachCta/Approach.module.css";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const logoGroup = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const logoItem = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

// === Title split animation (per character) ===
const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } }, // delay between chars
};

const titleChar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_BEZIER },
  },
};

export default function Approach() {
  const headingText = "Our Approach";
  const chars = Array.from(headingText);

  return (
    <section className={styles.section} aria-labelledby="approach-heading">
      <div className={styles.inner}>
        {/* Top: 2-col */}
        <div className={styles.topRow}>
          {/* Left image */}
          <figure className={styles.figure}>
            <img
              src="/assets/products/approach-cta-panel.png"
              alt="LED module showcasing mounting hardware and panel design"
              className={styles.image}
              loading="lazy"
            />
          </figure>

          {/* Right copy */}
          <div className={styles.copy}>
            {/* Split-text H2 */}
            <motion.h2
              id="approach-heading"
              className={styles.h2}
              variants={titleGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              aria-label={headingText}
            >
              {chars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={titleChar}
                  style={{ display: "inline-block" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className={styles.p}
            >
              At Atmos LED, we bring clarity to a fast-moving industry by reshaping what it
              means to deliver professional-grade visual technology. Rather than simply
              supplying LED panels, we act as strategic partners—collaborating closely with
              dealers and integrators to understand the unique demands of each venue, timeline,
              and budget.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={styles.p}
            >
              This consultative approach ensures every system we deliver is purpose-built,
              reliable, and ready when it’s needed. In a market often defined by delays and
              compromises, we offer something different: speed, consistency, and trusted
              support. With thousands of panels stocked in the U.S. and a team that understands
              real-world installations, we help our partners move faster, plan smarter, and
              deliver with confidence—so they can focus on winning more jobs.
            </motion.p>
          </div>
        </div>

        {/* Bottom: slim partner strip */}
        <div className={styles.strip}>
          <div className={styles.stripLeft}>
            <small className={styles.stripKicker}>
              Used by the world’s leading companies
            </small>
          </div>
          <motion.ul
            className={styles.logoRow}
            aria-label="Partner logos"
            variants={logoGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.li variants={logoItem}>
              <img src="/assets/logos/webflow.svg" alt="Webflow" />
            </motion.li>
            <motion.li variants={logoItem}>
              <img src="/assets/logos/relume.svg" alt="Relume" />
            </motion.li>
            <motion.li variants={logoItem}>
              <img src="/assets/logos/webflow.svg" alt="Webflow" />
            </motion.li>
            <motion.li variants={logoItem}>
              <img src="/assets/logos/relume.svg" alt="Relume" />
            </motion.li>
            <motion.li variants={logoItem}>
              <img src="/assets/logos/webflow.svg" alt="Webflow" />
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
