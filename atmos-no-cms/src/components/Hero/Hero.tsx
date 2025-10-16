// src/components/Hero/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";
import "../DotGrid.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  const [videoReady, setVideoReady] = useState(false);
  const [videoSrcSet, setVideoSrcSet] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Preload the video file early
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href =
      "#";
    link.type = "video/mp4";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Lazy set the video src when hero enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !videoSrcSet) {
          vid.preload = "auto";
          vid.src =
            "#";
          setVideoSrcSet(true);
          vid.play().catch(() => {});
        }
      },
      { root: null, rootMargin: "200px 0px 0px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [videoSrcSet]);

  // Mark video ready/visible once it can play
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const markReady = () => {
      if (vid.readyState >= 3) {
        setVideoReady(true);
        requestAnimationFrame(() => setVideoVisible(true));
      }
    };
    vid.addEventListener("loadeddata", markReady as any, { passive: true } as any);
    vid.addEventListener("canplay", markReady as any, { passive: true } as any);
    vid.addEventListener("canplaythrough", markReady as any, { passive: true } as any);

    return () => {
      vid.removeEventListener("loadeddata", markReady as any);
      vid.removeEventListener("canplay", markReady as any);
      vid.removeEventListener("canplaythrough", markReady as any);
    };
  }, []);

  // Scroll-driven reveal + overtake
  useEffect(() => {
    const sectionEl = sectionRef.current!;
    const dotEl = dotsRef.current!;
    const copyEl = copyRef.current!;
    const videoWrapEl = videoWrapRef.current!;
    const nextEl = sectionEl?.nextElementSibling as HTMLElement | null; // should be .afterHero
    if (!sectionEl || !dotEl || !copyEl || !videoWrapEl || !nextEl) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const getHeaderH = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h")
        .trim();
      const n = parseFloat(v || "0");
      return Number.isFinite(n) ? n : 0;
    };
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    const update = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const headerH = getHeaderH();
      const effVh = Math.max(1, vh - headerH);

      // Base progress across the first viewport of sticky hero
      const progRaw = clamp((-rect.top) / effVh, 0, 1);
      const prog = ease(progRaw);

      // Dot reveal radius and tint
      const end = Math.max(effVh * 1.6, 1200);
      dotEl.style.setProperty("--maskR", `${Math.round(end * prog)}px`);

      if (!prefersReducedMotion) {
        const hue = (prog * 720) % 360;
        const l = clamp(94 - 2 * prog, 88, 96);
        const s = clamp(100 - 2 * prog, 92, 100);
        const a = 0.34 - 0.1 * prog;
        dotEl.style.setProperty("--dg-hue", `${Math.round(hue)}`);
        dotEl.style.setProperty("--dg-l", `${l}%`);
        dotEl.style.setProperty("--dg-s", `${s}%`);
        dotEl.style.setProperty("--dg-alpha", `${a.toFixed(3)}`);
      }

      const liftPx = -(effVh * 1.05 * prog);
      copyEl.style.setProperty("--hero-copy-y", `${Math.round(liftPx)}px`);
      const copyFade = prefersReducedMotion ? 1 : 1 - clamp(progRaw * 1.25, 0, 1);
      copyEl.style.opacity = String(copyFade);

      const overtakeSpanPx = effVh * 1.5;
      const overtakeProgRaw = clamp((-rect.top) / overtakeSpanPx, 0, 1);
      const overtakeProg = ease(overtakeProgRaw);

      const translateYPx = -overtakeProg * effVh;
      nextEl.style.setProperty("--overtake-y", `${translateYPx}px`);

      const videoFadeMatch = 1 - overtakeProgRaw;
      const finalVideoFade = Math.min(copyFade, videoFadeMatch);
      videoWrapEl.style.opacity = String(finalVideoFade);

      if (progRaw >= 0.999) {
        sectionEl.classList.add("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "done");
      } else {
        sectionEl.classList.remove("reveal-done");
        document.documentElement.setAttribute("data-hero-reveal", "active");
      }
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

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
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-base" />

          <div
            ref={dotsRef}
            className="dotgrid dotgrid--reveal"
            style={
              {
                // @ts-ignore
                "--dg-size": "2px",
                "--dg-gap": "22px",
                "--dg-color": "#2899D5",
                "--dg-alpha-pct": "65%",
              } as React.CSSProperties
            }
          />

          <div
            ref={videoWrapRef}
            className={`hero__videoWrap ${videoReady ? "is-ready" : ""} ${
              videoVisible ? "is-visible" : ""
            }`}
          >
            <video
              ref={videoRef}
              className="hero__video"
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden="true"
              poster=""
              controls={false}
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
            />
          </div>
        </div>

        <div className="hero__inner">
          <div className="container">
            <div className="hero__copy hero__copy--center" ref={copyRef}>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="hero__title"
              >
                Your Vision. In Full View.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
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
                transition={{ duration: 0.5, delay: 1.1 }}
                className="hero__actions hero__actions--center"
              >
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











