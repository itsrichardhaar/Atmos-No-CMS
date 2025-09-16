// src/components/ProductGrid.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Stable order: remember each product's original index
  const orderMap = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p, i) => m.set(p.id, i));
    return m;
  }, [products]);

  const visible = useMemo(() => {
    const list =
      active === "All"
        ? products
        : products.filter(p => p.categories.includes(active as any));
    // sort by original index to preserve order across filters
    return [...list].sort((a, b) => (orderMap.get(a.id)! - orderMap.get(b.id)!));
  }, [active, products, orderMap]);

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

        {/* Animate grid reflow + item enter/exit */}
        <motion.div className="pg__grid" layout>
            <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.48, ease: [0.4, 0, 0, 1] }}
                >
                    <ProductCard product={p} />
                </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


