import styles from "../ApproachCta/Approach.module.css";
import { motion } from "framer-motion";

export default function Approach() {
  return (
    <section className={styles.section} aria-labelledby="approach-heading">
      <div className={styles.inner}>
        {/* Top: 2-col */}
        <div className={styles.topRow}>
          {/* Left image */}
          <figure className={styles.figure}>
            {/* Replace with your image path */}
            <img
              src="/assets/products/approach-cta-panel.png"
              alt="LED module showcasing mounting hardware and panel design"
              className={styles.image}
              loading="lazy"
            />
          </figure>

          {/* Right copy */}
          <div className={styles.copy}>
            <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            id="approach-heading" className={styles.h2}>Our Approach</motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className={styles.p}>
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
              className={styles.p}>
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
          <ul className={styles.logoRow} aria-label="Partner logos">
            {/* Swap src paths with your actual SVG/PNG assets */}
            <li><img src="/assets/logos/webflow.svg"  alt="Webflow"  /></li>
            <li><img src="/assets/logos/relume.svg"   alt="Relume"   /></li>
            <li><img src="/assets/logos/webflow.svg"  alt="Webflow"  /></li>
            <li><img src="/assets/logos/relume.svg"   alt="Relume"   /></li>
            <li><img src="/assets/logos/webflow.svg"  alt="Webflow"  /></li>
          </ul>
        </div>
      </div>
    </section>
  );
}