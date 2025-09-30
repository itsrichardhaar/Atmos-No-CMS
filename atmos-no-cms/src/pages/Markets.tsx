// src/pages/Markets.tsx 
import MarketGrid from "../components/MarketGrid/MarketGrid";
import { markets } from "../data/markets";
import "./Markets.css"; 
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";


export default function MarketsPage() {
  return (
    <main className="markets">
      {/* Top header area with dots */}
      <section className="markets__hero" aria-labelledby="markets-heading">
        <div className="container">
          <div className="markets-top">
          <h1 id="markets-heading" className="markets__title">Our Markets</h1>
          <p className="markets__sub">
            Solutions designed for every industry and environment.
          </p>
          </div>
        </div>
      </section>

      {/* Grid (no extra heading here) */}
      <MarketGrid 
        title=""
        markets={markets} />
      
      <BuildDisplayCta />
    </main>
  );
}
