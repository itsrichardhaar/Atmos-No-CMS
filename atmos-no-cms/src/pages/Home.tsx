// src/pages/Home.tsx
import Hero from "../components/Hero/Hero"
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { products } from "../data/products";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid
        title="Our Products"
        products={products.slice(0, 8)}
        withFilters  // show first 6; tweak as you like
        showViewAll
      />
    </>
  );
}
