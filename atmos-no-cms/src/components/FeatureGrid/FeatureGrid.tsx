import { useMemo, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./FeatureGrid.module.css";
import type { FeatureItem } from "../../types/product";

type Props = {
  title?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  id?: string;
  className?: string;
};

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const ltrContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const slideInLtr: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

export default function FeatureGrid({ title, items, columns = 3, id, className }: Props) {
  const reduce = useReducedMotion(); 
  const titleId = useMemo(() => (id ? `${id}-title` : undefined), [id]);

  const listRef = useRef<HTMLUListElement | null>(null);
  const inView = useInView(listRef, {
    amount: 0.35,                  
    margin: "-10% 0px -10% 0px",   
    once: true,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (reduce) {
      controls.set("visible");     
    } else if (inView) {
      controls.start("visible");
    }
  }, [reduce, inView, controls]);

  return (
    <section
      className={`${styles.section} ${className ?? ""}`}
      aria-labelledby={titleId}
    >
      <div className={styles.inner}>
        {title && (
          <h2 id={titleId} className={styles.h2}>
            {title}
          </h2>
        )}

        <motion.ul
          ref={listRef}
          className={`${styles.grid} ${styles[`cols${columns}`]}`}
          role="list"
          variants={ltrContainer}
          initial="hidden"
          animate={controls}
        >
          {items.map((it, i) => (
            <motion.li
              key={i}
              className={styles.card}
              variants={slideInLtr}
            >
              {it.icon && (
                <img
                  src={it.icon}
                  alt=""
                  aria-hidden="true"
                  className={styles.icon}
                  loading="lazy"
                />
              )}
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>{it.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}


