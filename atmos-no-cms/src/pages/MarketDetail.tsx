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

  return (
    <section className="market">
      <div className="container market__wrap">
        <div className="market__hero">
          <img src={market.heroImage} alt={market.name} />
          <h1 className="market__title">{market.name}</h1>
          <p className="market__blurb">{market.blurb}</p>
        </div>

        {/* You can drop a <MarketGrid markets={markets} /> here to cross-link others */}
      </div>
    </section>
  );
}
