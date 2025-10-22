// src/pages/Home.tsx
import Hero from "../components/Hero/Hero"
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { products } from "../data/products";
import Approach from "../components/ApproachCta/Approach";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";
import MarketGrid from "../components/MarketGrid/MarketGrid";
import { markets } from "../data/markets";
import BackgroundGlow from "../components/BackgroundGlow/BackgroundGlow";
import Seo from "../seo/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="LED Displays & Immersive Visual Solutions"
        description="Atmos LED delivers indoor/outdoor LED displays and turnkey installations for worship spaces, live events, retail, education, and more."
        path="/"
        image="https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/social/home.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Atmos LED",
            "url": "https://atmos-no-cms.vercel.app/",
            "logo": "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/brand/logo.png",
            "sameAs": ["https://www.linkedin.com/company/atmos-led"]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Atmos LED",
            "url": "https://atmos-no-cms.vercel.app/",
            // Include this ONLY if /search exists:
              // ,"potentialAction": {
              //   "@type": "SearchAction",
              //   "target": "https://atmos-no-cms.vercel.app/search?q={query}",
              //   "query-input": "required name=query"
              // }
          }
        ]}
      />
      <Hero />
      {/* The block that will slide up over the hero */}
      <div className="afterHero">
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

