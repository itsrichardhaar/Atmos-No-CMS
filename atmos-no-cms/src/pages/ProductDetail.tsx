import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <section className="product">
        <div className="container">
          <p style={{ color: "#fff" }}>Product not found.</p>
          <Link className="btn btn--primary" to="/products">Back to Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="product">
      <div className="container product__wrap">
        <div className="product__media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product__info">
          <h1 className="product__title">
            {product.name} {product.series && <span className="product__series">{product.series}</span>}
          </h1>
          {product.tagline && <p className="product__tagline">{product.tagline}</p>}
          {product.description && <p className="product__desc">{product.description}</p>}

          {product.specs.length > 0 && (
            <ul className="product__specs">
              {product.specs.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}

          <div className="product__actions">
            {!!product.startingFrom && <span className="product__price">Starting at ${product.startingFrom}</span>}
            {product.shopUrl && (
              <a href={product.shopUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                Buy on Shopify ↗
              </a>
            )}
          </div>

          <Link to="/products" className="product__back">← Back to all products</Link>
        </div>
      </div>
    </section>
  );
}
