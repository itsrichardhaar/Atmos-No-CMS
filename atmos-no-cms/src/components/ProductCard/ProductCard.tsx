// src/components/ProductCard/ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { motion } from "framer-motion";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="pc pc--glow">
      <Link to={`/products/${product.slug}`} className="pc__imageWrap" aria-label={`${product.name} details`}>
        <motion.div
          className="pc__imageAnim"
          style={{ transformOrigin: "50% 50%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale:   { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
          }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <img className="pc__image" src={product.image} alt={product.name} loading="lazy" />
          <div className="pc__fx" />
        </motion.div>
        <div className="pc__fx" />
      </Link>

      <header className="pc__header">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="pc__title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
            {product.series && 
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="pc__series">
              {product.series}
          </motion.span>}
        </motion.h3>
          {product.tagline && 
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="pc__tagline">
              {product.tagline}
          </motion.p>}
        {product.specs && 
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="pc__specs">
          {product.specs}
        </motion.p>}
      </header>
      
      <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          >
      <Link to={`/products/${product.slug}`} className="btn btn--primary">
        <span className="btn__label">Starting at ${product.startingFrom}</span>
        <span className="btn__arrows" aria-hidden="true">
          <span className="btn__arrow btn__arrow--off"></span>
          <span className="btn__arrow btn__arrow--on"></span>
        </span>
      </Link>
      </motion.div>
    </article>
  );
}

