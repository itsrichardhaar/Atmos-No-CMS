import styles from "../ApproachCta/Approach.module.css";

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
            <h3 id="approach-heading" className={styles.h2}>Our Approach</h3>
            <p className={styles.p}>
              At Atmos LED, we bring clarity to a fast-moving industry by reshaping what it
              means to deliver professional-grade visual technology. Rather than simply
              supplying LED panels, we act as strategic partners—collaborating closely with
              dealers and integrators to understand the unique demands of each venue, timeline,
              and budget.
            </p>
            <p className={styles.p}>
              This consultative approach ensures every system we deliver is purpose-built,
              reliable, and ready when it’s needed. In a market often defined by delays and
              compromises, we offer something different: speed, consistency, and trusted
              support. With thousands of panels stocked in the U.S. and a team that understands
              real-world installations, we help our partners move faster, plan smarter, and
              deliver with confidence—so they can focus on winning more jobs.
            </p>
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