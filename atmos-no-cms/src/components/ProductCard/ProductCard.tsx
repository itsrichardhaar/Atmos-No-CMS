import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="pc">
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
      </header>

      {product.startingFrom && (
        <div className="pc__ctaRow">
          <Link to={`/products/${product.slug}`} className="btn btn--primary">
            Starting at ${product.startingFrom}
          </Link>
        </div>
      )}
    </article>
  );
}
