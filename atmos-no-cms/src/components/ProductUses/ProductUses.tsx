// src/components/ProductUses/ProductUses.tsx

import styles from "./ProductUses.module.css";
import type { ProductUses as ProductUseItem } from "../../types/product";

type Props = {
  title: string;
  items: ProductUseItem[];
};

export default function ProductUses({ title, items }: Props) {
  return (
    <section className={styles.section} aria-labelledby="use-title">
      <div className={styles.inner}>
        <h2 id="use-title" className={styles.title}>{title}</h2>

        {items?.length ? (
          <ul className={styles.grid}>
            {items.map((it, i) => (
              <li key={i} className={styles.card}>
                <h3 className={styles.cardHead}>{it.heading}</h3>
                <p className={styles.cardBody}>{it.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

