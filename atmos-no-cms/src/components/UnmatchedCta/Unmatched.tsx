import styles from "../UnmatchedCta/Unmatched.module.css";

export default function Unmatched() {
  return (
    <section className={styles.section} aria-labelledby="unmatched-heading">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <figure className={styles.figure}>
            <img
              src="/assets/images/capital-a.svg"
              alt="LED module showcasing mounting hardware and panel design"
              className={styles.image}
              loading="lazy"
            />
          </figure>

          <div className={styles.copy}>
            <p className={styles.tagline}>
              Create immersive visuals that captivate audiences.
            </p>
            <h3 id="unmatched-heading" className={styles.h3}>Unmatched Visual Performance Across Every Environment</h3>
            <p className={styles.p}>
              From immersive indoor displays to weatherproof outdoor solutions, Atmos LED delivers vibrant, high-definition visuals that engage audiences and elevate experiences in any setting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}