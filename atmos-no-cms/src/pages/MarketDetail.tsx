// src/pages/MarketDetail.tsx
import { useParams, Link } from "react-router-dom";
import { markets } from "../data/markets";
import "./MarketDetail.css";

export default function MarketDetail() {
  const { slug } = useParams();
  const market = markets.find(m => m.slug === slug);
  if (!market) {
    return (
      <section className="market">
        <div className="container">
          <p style={{color:"#fff"}}>Market not found.</p>
          <Link className="btn btn--primary" to="/markets">Back to Markets</Link>
        </div>
      </section>
    );
  }

  const heroSrc = market.heroImage;

  return (
    <section className="market market--heroBleed">
      {/* FULL-BLEED HERO (outside container) */}
      <div className="market__hero">
        <img src={heroSrc} alt={market.name} loading="eager" decoding="async" fetchPriority="high" />

            <div className="market__heroInner">
            <div className="market__heroContent">
                <h1 className="market__title">{market.name}</h1>
                {market.blurb && <p className="market__blurb">{market.blurb}</p>}
            </div>
            </div>
      </div>

      {/* page content in a container */}
      <div className="container market__wrap">
        {/* …your sections / grids etc. */}
      </div>
    </section>
  );
}
