// src/pages/Home.tsx
import Hero from "../components/Hero/Hero"
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { products } from "../data/products";
import Approach from "../components/ApproachCta/Approach";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";
import MarketGrid from "../components/MarketGrid/MarketGrid";
import { markets } from "../data/markets";
import BackgroundGlow from "../components/BackgroundGlow/BackgroundGlow";

export default function Home() {
  return (
    <>
      <Hero />
      {/* The block that will slide up over the hero */}
      <div 
        className="afterHero"
        style={{ marginBottom: "var(--overtake-y)" }}
      >
        <ProductGrid
          title="Our Products"
          products={products.slice(0, 8)}
          withFilters
          showViewAll
        />
        <Approach />
        <BackgroundGlow />
        <MarketGrid
          title="Solutions built for..."
          subtitle="Atmos LED delivers dynamic lighting solutions designed for Places of Worship, Live Events, and Commercial spaces. Our systems are crafted to elevate spiritual experiences, captivate audiences, and enhance everyday environments with precision, reliability, and effortless control. Whether you’re illuminating a sanctuary, energizing a stage, or brightening a workspace, Atmos LED brings clarity, emotion, and innovation to every moment."
          markets={markets}
        />
        <BuildDisplayCta />
      </div>
    </>
  );
}

