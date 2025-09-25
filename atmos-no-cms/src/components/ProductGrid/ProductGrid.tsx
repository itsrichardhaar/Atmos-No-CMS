// src/components/ProductGrid/ProductGrid.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import type { Product, ProductCategory } from "../../types/product"; // ← import ProductCategory
import { Link } from "react-router-dom";
import "./ProductGrid.css";

type Props = {
  title?: string;
  products: Product[];
  showViewAll?: boolean;
  withFilters?: boolean;
  defaultCategory?: ProductCategory | "All";   // ← union, not plain string
};

// Convenience union
type CatOrAll = ProductCategory | "All";

export default function ProductGrid({
  title = "Our Products",
  products,
  showViewAll = true,
  withFilters = false,
  defaultCategory = "All",
}: Props) {
  // De-dupe (optional hardening)
  const data = useMemo(() => {
    const byId = new Map<string, Product>();
    for (const p of products) if (!byId.has(p.id)) byId.set(p.id, p);
    return Array.from(byId.values());
  }, [products]);

  // Build category list with correct typing
  const categories = useMemo<CatOrAll[]>(() => {
    const set = new Set<ProductCategory>();
    data.forEach(p => p.categories.forEach(c => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [data]);

  // Active filter is a ProductCategory or "All"
  const [active, setActive] = useState<CatOrAll>(defaultCategory);

  // Stable original order
  const orderMap = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach((p, i) => m.set(p.id, i));
    return m;
  }, [data]);

  // Filter with proper narrowing (no casts needed)
  const visible = useMemo(() => {
    const list = active === "All" ? data : data.filter(p => p.categories.includes(active));
    return [...list].sort((a, b) => (orderMap.get(a.id)! - orderMap.get(b.id)!));
  }, [active, data, orderMap]);

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
            {categories.map((cat) => (
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

        <motion.div className="pg__grid" layout>
          {/* remove AnimatePresence here */}
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              // remove exit prop
              transition={{ duration: 0.48, ease: [0.4, 0, 0, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



