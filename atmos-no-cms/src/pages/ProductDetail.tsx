import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetail.css";
import ProductUses from "../components/ProductUses/ProductUses";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";


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
    
    <section
      className="product"
      style={{ ['--glow-color' as any]: product.glowColor ?? '#29a8ff' }}
    >
      <div className="container product__wrap">
        <div className="product__media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product__info">
          <h2 className="product__title">
            {product.name} {product.series && <span className="product__series">{product.series}</span>}
          </h2>

          {product.tagline && <p className="product__tagline">{product.tagline}</p>}
          {product.description && <p className="product__desc">{product.description}</p>}

          <div className="pixel__heading__wrapper">
            <p className="pixel__heading">Vision Series is Avaialable</p>
            <p className="pixel__heading">In The Following Pixel Pitches:</p>
          </div>

          {product.specs.length > 0 && (
            <div className="product__specs">
              {product.specs.map((s, i) => (
                <p key={i} className="product__spec">
                  <img
                    src="/icons/product-spec-icon.svg"
                    alt=""
                    aria-hidden="true"
                    className="product__specImg"
                    width={24}
                    height={24}
                  />
                  <span>{s}</span>
                </p>
              ))}
            </div>
          )}

          <div className="product__actions">
            {!!product.startingFrom && <span className="product__price">Starting at ${product.startingFrom}</span>}
            {product.shopUrl && (
              <a href={product.shopUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                Shop {product.name} Series ↗
              </a>
            )}
          </div>

          <Link to="/products" className="product__back">← Back to all products</Link>
        </div>
      </div>

      {/* Glow (behind) */}
      <div className="product__glow" aria-hidden="true" />
 
      <div className="arrow-wrapper">
      <img className="product__arrow" src="/assets/images/Arrow.svg" alt="" aria-hidden="true" />
      </div>
      <ProductUses
        title={product.useTitle || `Practical Solutions Powered by the ${product.name} Series`}
        items={product.productUses || []}
      />
      {product.features?.length ? (
        <FeatureGrid
          title={`Why ${product.name}?`}
          items={product.features}
          columns={3}
        />
      ) : null}
    </section>
  );
}
