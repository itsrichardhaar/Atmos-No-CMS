// src/components/MarketCard/MarketCard.tsx
import { Link } from "react-router-dom";
import type { Market } from "../../types/market";
import { motion } from "framer-motion";
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
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.8 }}
          className="mc__title">
          <Link to={`/markets/${market.slug}`}>{market.name}</Link>
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.8 }}
          className="mc__blurb">
            {market.blurb}
        </motion.p>
      </header>

      <div className="mc__ctaRow">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true, amount: 0.8 }}
        
        >
        <Link to={`/markets/${market.slug}`} className="btn btn--secondary">
          <span className="btn__label">Learn More</span>
          <span className="btn__arrows" aria-hidden="true">
            <span className="btn__arrow btn__arrow--off"></span>
            <span className="btn__arrow btn__arrow--on"></span>
          </span>
        </Link>
        </motion.div>
      </div>
    </article>
  );
}
