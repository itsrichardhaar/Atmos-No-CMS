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

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const getHeaderH = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
      const n = parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };

    // Simple easing so hue 
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-out

    const update = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const headerH = getHeaderH();
      const effVh = Math.max(1, vh - headerH);

      // 0 → 1 across the reveal
      const progRaw = Math.min(1, Math.max(0, (-rect.top) / effVh));
      const prog = ease(progRaw);

      // Outer radius (unchanged)
      const start = 0;
      const end = Math.max(effVh * 1.6, 1200);
      const r = start + (end - start) * prog;
      dotEl.style.setProperty("--maskR", `${Math.round(r)}px`);

      
      if (!prefersReducedMotion) {
       
        const hue = (prog * 720) % 360;

        // Start bright, ease down a touch as you scroll
        const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
        const l = clamp(94 - 2 * prog, 88, 96);   // 86% → ~78%
        const s = clamp(100 - 2 * prog, 92, 100);  // 96% → ~90%
        const a = 0.34 - 0.10 * prog;             // 0.34 → 0.24 (optional)

        dotEl.style.setProperty("--dg-hue", `${Math.round(hue)}`);
        dotEl.style.setProperty("--dg-l", `${l}%`);
        dotEl.style.setProperty("--dg-s", `${s}%`);
        dotEl.style.setProperty("--dg-alpha", `${a.toFixed(3)}`);
      }

      if (progRaw >= 0.999) {
        sectionEl.classList.add("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "done");

        // Optionally “freeze” final color to a brand hue:
        // dotEl.style.setProperty("--dg-hue", "330");
      } else {
        sectionEl.classList.remove("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "active");
      }
    };

    // Use rAF to avoid jank on fast scroll
    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    // mark as active immediately to keep nav transparent
    document.documentElement.setAttribute("data-hero-reveal", "active");
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
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
                "--dg-size": "2px",
                "--dg-gap": "22px",
                "--dg-hue": "210",   // any starting hue
                "--dg-s": "96%",     // ↑ brighter
                "--dg-l": "86%",     // ↑ brighter
                "--dg-alpha": "0.34" // ↑ slightly more visible
            } as React.CSSProperties}
          />
        </div>

        {/* Inner holds padding so sticky pins cleanly */}
        <div className="hero__inner">
          <div className="container">
            <div className="hero__copy hero__copy--center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="hero__title"
              >
                Your Vision. In Full View.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="hero__subtitle"
              >
                Atmos LED creates professional-grade LED display solutions built for
                impact, reliability, and flexibility. Backed by U.S. support and a
                trusted warranty, our panels deliver brilliant visuals, easy integration,
                and long-term performance for any environment.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4}}
                className="hero__actions hero__actions--center">
                <Link to="/products" className="btn btn--hero">
                  Shop Our Products
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="hero__divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}






