import { Link } from "react-router-dom";
import styles from "./BuildDisplayCta.module.css";
import { motion } from "framer-motion";

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
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05}}
            viewport={{ once: true }}
            id="build-cta-title" 
            className={styles.title}>
              {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1}}
            viewport={{ once: true }}
            className={styles.subtitle}>
              {subtitle}
          </motion.p>

          <Link to={to} className={styles.button} aria-label={buttonText}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}

