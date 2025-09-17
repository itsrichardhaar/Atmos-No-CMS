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

    const getHeaderH = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h").trim();
      const n = parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };

    const onScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const headerH = getHeaderH();                         // px
      const effVh = Math.max(1, vh - headerH);             // effective viewport

      // As the 200vh section moves, rect.top goes from 0 → -effVh during reveal
      const prog = Math.min(1, Math.max(0, (-rect.top) / effVh));

      const start = 0;                                     // px
      const end = Math.max(effVh * 1.6, 1200);              // px
      const r = start + (end - start) * prog;

      dotEl.style.setProperty("--maskR", `${Math.round(r)}px`);

      if (prog >= 0.999) {
        sectionEl.classList.add("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "done");
      } else {
        sectionEl.classList.remove("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "active");
      }
    };

    // mark as active immediately to keep nav transparent
    document.documentElement.setAttribute("data-hero-reveal", "active");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.setAttribute("data-hero-reveal", "done");
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero hero--center hero--reveal">
      <div className="hero__sticky">
        {/* BG stack */}
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-base" />
          <div
            ref={dotsRef}
            className="dotgrid dotgrid--reveal"
            style={{
              // @ts-ignore
              "--dg-color": "rgba(255,255,255,0.24)",
              "--dg-size": "2px",
              "--dg-gap": "22px",
            }}
          />
        </div>

        {/* Inner holds padding so sticky pins cleanly */}
        <div className="hero__inner">
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
                Atmos LED creates professional-grade LED display solutions built for
                impact, reliability, and flexibility. Backed by U.S. support and a
                trusted warranty, our panels deliver brilliant visuals, easy integration,
                and long-term performance for any environment.
              </motion.p>

              <div className="hero__actions hero__actions--center">
                <Link to="/products" className="btn btn--primary">
                  Shop our Products ↗
                </Link>
              </div>
            </div>
          </div>

          <div className="hero__divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}





