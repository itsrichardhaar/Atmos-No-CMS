// src/components/FeatureGrid/FeatureGrid.tsx
import styles from "./FeatureGrid.module.css";
import type { FeatureItem } from "../../types/product";

type Props = {
  title?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;   
  id?: string;
  className?: string;
};

export default function FeatureGrid({ title, items, columns = 3, id, className }: Props) {
  return (
    <section
      className={`${styles.section} ${className ?? ""}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className={styles.inner}>
        {title && (
          <h2 id={id ? `${id}-title` : undefined} className={styles.h2}>
            {title}
          </h2>
        )}

        <ul className={`${styles.grid} ${styles[`cols${columns}`]}`}>
          {items.map((it, i) => (
            <li key={i} className={styles.card}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
