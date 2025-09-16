import { motion } from "framer-motion"
import "./Hero.css"

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hero__title"
          >
            Your Vision in Full View.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="hero__subtitle"
          >
            Hero sub text
          </motion.p>

          <div className="hero__actions">
            <a
              href="https://your-shop.myshopify.com/collections/all"
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              Our Products ↗
            </a>
            <a href="#featured" className="btn btn--ghost">
              View featured
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hero__media"
        >
          <img
            src="#"
            alt="LED Panel One"
            className="hero__img"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
