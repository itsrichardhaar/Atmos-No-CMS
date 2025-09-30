// src/components/MarketCard/MarketCard.tsx
import { Link } from "react-router-dom";
import type { Market } from "../../types/market";
import "./MarketCard.css";

export default function MarketCard({ market }: { market: Market }) {
  return (
    <article className="mc">
      <Link
        to={`/markets/${market.slug}`}
        className="mc__imageWrap"
        aria-label={`${market.name} details`}
      >
        <img className="mc__image" src={market.gridImage} alt={market.name} loading="lazy" />
        <div className="mc__shade" />
      </Link>

      <header className="mc__header">
        <h3 className="mc__title">
          <Link to={`/markets/${market.slug}`}>{market.name}</Link>
        </h3>
        <p className="mc__blurb">{market.blurb}</p>
      </header>

      <div className="mc__ctaRow">
        <Link to={`/markets/${market.slug}`} className="btn btn--secondary btn--sm">
          Learn More
        </Link>
      </div>
    </article>
  );
}
