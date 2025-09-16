import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import "./ProductGrid.css";

type Props = {
  title?: string;
  products: Product[];
  showViewAll?: boolean;
};

export default function ProductGrid({ title = "Our Products", products, showViewAll = true }: Props) {
  return (
    <section className="pg">
      <div className="container">
        <div className="pg__header">
          <h2 className="pg__title">{title}</h2>
          {showViewAll && (
            <Link to="/products" className="btn btn--primary pg__viewall">
              View All Products →
            </Link>
          )}
        </div>

        <div className="pg__grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
