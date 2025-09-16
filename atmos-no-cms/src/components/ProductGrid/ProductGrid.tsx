// src/components/ProductGrid.tsx
import { useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import "./ProductGrid.css";

type Props = {
  title?: string;
  products: Product[];
  showViewAll?: boolean;
  withFilters?: boolean;
  defaultCategory?: string | "All";
};

export default function ProductGrid({
  title = "Our Products",
  products,
  showViewAll = true,
  withFilters = false,
  defaultCategory = "All",
}: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.categories.forEach(c => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [products]);

  const [active, setActive] = useState<string>(defaultCategory);

  const isVisible = (p: Product) =>
    active === "All" ? true : p.categories.includes(active as any);

  return (
    <section className="pg">
      <div className="container">
        <div className="pg__header">
          <h2 className="pg__title">{title}</h2>
          {showViewAll && (
            <Link to="/products" className="btn btn--primary pg__viewall">
              View All Products →
            </Link>
          )}
        </div>

        {withFilters && (
          <div className="pg__filters" role="tablist" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`pill ${active === cat ? "is-active" : ""}`}
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="pg__grid">
          {products.map(p => (
            <div
              key={p.id}
              className={`pg__cell ${isVisible(p) ? "" : "is-hidden"}`}
              aria-hidden={!isVisible(p)}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

