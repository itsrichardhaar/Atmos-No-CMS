import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./Hero.css"
import "../DotGrid.css";

export default function Hero() {
  return (
    <section className="hero hero--center hero--full">
        {/* STATIC DOT GRID BACKGROUND */}
      <div className="hero__bg" aria-hidden="true">
        <div
          className="dotgrid dotgrid--fade"
          // tweak tokens inline if you want
          style={{
            // @ts-ignore — CSS custom props
            "--dg-bg": "#000",
            "--dg-color": "rgba(255,255,255,0.24)",
            "--dg-size": "2px",
            "--dg-gap": "22px",
          }}
        />
      </div>
      <div className="container">
        <div className="hero__copy hero__copy--center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hero__title"
          >
            Your Vision. In Full View.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="hero__subtitle"
          >
            Atmos LED creates professional-grade LED display solutions built for impact, reliability, and flexibility. Backed by U.S. support and a trusted warranty, our panels deliver brilliant visuals, easy integration, and long-term performance for any environment.
          </motion.p>

          <div className="hero__actions hero__actions--center">
            <Link to="/products" className="btn btn--primary">
              Shop our Products ↗
            </Link>
          </div>
        </div>
      </div>
      {/* Radial shape divider */}
      <div className="hero__divider" aria-hidden="true" />
    </section>
  )
}

