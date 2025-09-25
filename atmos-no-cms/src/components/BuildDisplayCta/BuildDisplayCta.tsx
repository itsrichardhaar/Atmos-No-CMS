import { Link } from "react-router-dom";
import styles from "./BuildDisplayCta.module.css";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;                 // react-router link
  imageSrc?: string;           // background image path
};

export default function BuildDisplayCta({
  title = "Build Your Display Now.",
  subtitle = "Use our custom wall builder to create a solution for your space today.",
  buttonText = "Build Your Display",
  to = "/builder",
  imageSrc = "/assets/images/build-cta.png",
}: Props) {
  return (
    <section className={styles.section} aria-labelledby="build-cta-title">
      <div className={styles.bg} style={{ backgroundImage: `url("${imageSrc}")` }} />
      <div className={styles.scrim} />

      <div className={styles.inner}>
        <div className={styles.frame}>
          <h2 id="build-cta-title" className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          <Link to={to} className={styles.button} aria-label={buttonText}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}

