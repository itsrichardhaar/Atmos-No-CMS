// src/pages/Products.tsx
import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { products } from "../data/products";

export default function Products() {
  // (nice-to-have) set page title
  useEffect(() => { document.title = "Products — ATMOS LED"; }, []);

  return (
    <main>
      <ProductGrid
          title="Our Products"
          products={products.slice(0, 8)}
          withFilters  // show first 6; tweak as you like
          showViewAll
      />
    </main>
  );
}
