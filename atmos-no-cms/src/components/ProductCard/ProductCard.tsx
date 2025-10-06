// src/components/ProductCard/ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="pc pc--glow">
      <Link to={`/products/${product.slug}`} className="pc__imageWrap" aria-label={`${product.name} details`}>
        <img className="pc__image" src={product.image} alt={product.name} loading="lazy" />
        <div className="pc__fx" />
      </Link>

      <header className="pc__header">
        <h3 className="pc__title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
          {product.series && <span className="pc__series">{product.series}</span>}
        </h3>
        {product.tagline && <p className="pc__tagline">{product.tagline}</p>}
        {product.specs && <p className="pc__specs">{product.specs}</p>}
      </header>

      <Link to={`/products/${product.slug}`} className="btn btn--primary">
        <span className="btn__label">Starting at ${product.startingFrom}</span>
        <span className="btn__arrows" aria-hidden="true">
          <span className="btn__arrow btn__arrow--off"></span>
          <span className="btn__arrow btn__arrow--on"></span>
        </span>
      </Link>
    </article>
  );
}

