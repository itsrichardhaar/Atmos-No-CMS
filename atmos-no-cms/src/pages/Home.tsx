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
          subtitle="Atmos LED delivers professional LED display solutions designed for Houses of Worship, Live Events, Commercial spaces, and more. Our systems are built to engage audiences, elevate presentations, and enhance environments with exceptional image quality, reliability, and seamless integration. Atmos LED delivers clarity, impact, and innovation—on every screen."
          markets={markets}
        />
        <BuildDisplayCta />
      </div>
    </>
  );
}

