import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";
import "../DotGrid.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current!;
    const dotEl = dotsRef.current!;
    if (!sectionEl || !dotEl) return;

    const onScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // For a 200vh section, rect.top goes 0 -> -vh over the first viewport.
      const prog = Math.min(1, Math.max(0, (-rect.top) / vh));

      const start = 0;                          // px (tight spotlight at load)
      const end = Math.max(vh * 1.6, 1400);     // px (safely larger than view)
      const r = start + (end - start) * prog;

      dotEl.style.setProperty("--maskR", `${Math.round(r)}px`);
      if (prog >= 0.999) sectionEl.classList.add("reveal-done");
      else sectionEl.classList.remove("reveal-done");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero hero--center hero--reveal">
      {/* Sticky viewport that stays for the first 100vh */}
      <div className="hero__sticky">
        {/* Background stack: solid base + dots (masked) */}
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-base" />
          <div
            ref={dotsRef}
            className="dotgrid dotgrid--reveal"
            style={{
              // @ts-ignore — CSS custom props
              "--dg-color": "rgba(255,255,255,0.24)",
              "--dg-size": "2px",
              "--dg-gap": "22px",
              // no inline --maskR; JS updates it
            }}
          />
        </div>

        {/* Content */}
        <div className="container">
          <div className="hero__copy hero__copy--center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero__title"
            >
              Your Vision. In Full View.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero__subtitle"
            >
              Atmos LED creates professional-grade LED display solutions built
              for impact, reliability, and flexibility. Backed by U.S. support
              and a trusted warranty, our panels deliver brilliant visuals, easy
              integration, and long-term performance for any environment.
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
      </div>
    </section>
  );
}



