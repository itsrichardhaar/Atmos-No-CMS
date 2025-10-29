// src/components/Hero/Hero.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  const [videoReady, setVideoReady] = useState(false);
  const [videoSrcSet, setVideoSrcSet] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Text + lines
  const LINE1 = "Your Vision.";
  const LINE2 = "In Full View.";
  const TITLE = `${LINE1} ${LINE2}`;
  const charsLine1 = useMemo(() => Array.from(LINE1), []);
  const charsLine2 = useMemo(() => Array.from(LINE2), []);
  const totalLen = charsLine1.length + 1 + charsLine2.length;

  // Typewriter / reveal phasing
  const [typeCount, setTypeCount] = useState(0);
  const [subsProg, setSubsProg] = useState(0);
  const [btnProg, setBtnProg] = useState(0);
  const [allowReveal, setAllowReveal] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Preload video early
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href =
      "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/videos/1000ph_rotate.mp4";
    link.type = "video/mp4";
    document.head.appendChild(link);

    // ✅ return void, not the removed node
    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  // Lazy-set video src when hero is near the viewport
  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !videoSrcSet) {
          vid.preload = "auto";
          vid.src =
            "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/videos/1000ph_rotate.mp4";
          setVideoSrcSet(true);
          vid.play().catch(() => {});
        }
      },
      { rootMargin: "200px 0px 0px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [videoSrcSet]);

  // Mark video ready/visible
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

  // Scroll-driven typewriter + staged reveals + overtake
  useEffect(() => {
    const sectionEl = sectionRef.current!;
    const copyEl = copyRef.current!;
    const videoWrapEl = videoWrapRef.current!;
    const nextEl = sectionEl?.nextElementSibling as HTMLElement | null;
    if (!sectionEl || !copyEl || !videoWrapEl || !nextEl) return;

    if (prefersReducedMotion) {
      setTypeCount(totalLen);
      setSubsProg(1);
      setBtnProg(1);
      setAllowReveal(true);
    }

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

      const progRaw = clamp((-rect.top) / effVh, 0, 1);

      // Typewriter (~18%)
      const typePhaseEnd = 0.18;
      const typeProg = clamp(progRaw / typePhaseEnd, 0, 1);
      const newCount = Math.round(typeProg * totalLen);
      if (newCount !== typeCount) setTypeCount(newCount);

      // Subtitle/Button (next ~15%)
      const subsPhaseStart = typePhaseEnd;
      const subsPhaseEnd = subsPhaseStart + 0.15;
      const subsPhaseSpan = Math.max(0.001, subsPhaseEnd - subsPhaseStart);
      const rawSubs = clamp((progRaw - subsPhaseStart) / subsPhaseSpan, 0, 1);
      const easedSubs = ease(rawSubs);
      const rawBtn = clamp((rawSubs - 0.25) / 0.75, 0, 1);
      const easedBtn = ease(rawBtn);

      const sRounded = Math.round(easedSubs * 100) / 100;
      const bRounded = Math.round(easedBtn * 100) / 100;
      if (sRounded !== subsProg) setSubsProg(sRounded);
      if (bRounded !== btnProg) setBtnProg(bRounded);

      const canReveal = rawBtn >= 1 && newCount >= totalLen;
      if (canReveal !== allowReveal) setAllowReveal(canReveal);

      if (allowReveal) {
        // Fade hero copy out (no upward motion)
        const copyFade = 1 - clamp((progRaw - subsPhaseEnd) / 0.35, 0, 1);
        copyEl.style.opacity = String(copyFade);
        copyEl.style.transform = "none";

        // Slide the next section upward (overtake)
        const overtakeSpanPx = effVh * 1.5;
        const overtakeProgRaw = clamp((-rect.top) / overtakeSpanPx, 0, 1);
        const overtakeProg = ease(overtakeProgRaw);
        const translateYPx = -overtakeProg * effVh;
        nextEl.style.setProperty("--overtake-y", `${translateYPx}px`);

        // Keep video opacity matching the overtake fade
        const videoFadeMatch = 1 - overtakeProgRaw;
        const finalVideoFade = Math.min(copyFade, videoFadeMatch);
        videoWrapEl.style.opacity = String(finalVideoFade);
      } else {
        copyEl.style.opacity = "1";
        copyEl.style.transform = "none";
        nextEl.style.setProperty("--overtake-y", `0px`);
        videoWrapEl.style.opacity = "1";
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

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [prefersReducedMotion, totalLen, typeCount, subsProg, btnProg, allowReveal]);

  // Accent: last revealed character
  const accentIndex = typeCount < totalLen ? Math.max(0, typeCount - 1) : -1;

  const renderLine = (chars: string[], lineOffset: number) =>
    chars.map((ch, i) => {
      const globalIndex = lineOffset + i;
      const visible = globalIndex < typeCount;
      const isAccent = globalIndex === accentIndex;
      const char = ch === " " ? "\u00A0" : ch;
      return (
        <span
          key={globalIndex}
          className={`hero__letter ${visible ? "is-visible" : ""} ${isAccent ? "is-accent" : ""}`}
          style={{
            color: !visible ? "transparent" : isAccent ? "var(--hero-accent)" : "var(--hero-fg)",
          }}
          aria-hidden="true"
        >
          {char}
        </span>
      );
    });

  const offsetLine1 = 0;
  const offsetLine2 = charsLine1.length + 1;

  return (
    <section ref={sectionRef} className="hero hero--center hero--reveal">
      <div className="hero__sticky">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__bg-base" />
          <div
            ref={videoWrapRef}
            className={`hero__videoWrap ${videoReady ? "is-ready" : ""} ${videoVisible ? "is-visible" : ""}`}
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
              <h1 className="hero__title" aria-label={TITLE}>
                <span className="hero__titleWrap">
                  <span className="hero__line">
                    <span className="hero__letters">{renderLine(charsLine1, offsetLine1)}</span>
                  </span>
                  <span className="hero__line">
                    <span className="hero__letters">{renderLine(charsLine2, offsetLine2)}</span>
                  </span>
                </span>
              </h1>

              <p
                className="hero__subtitle"
                style={{
                  opacity: subsProg,
                  transform: `translateY(${Math.round((1 - subsProg) * 14)}px)`,
                }}
              >
                Atmos LED creates professional-grade LED display solutions built for
                impact, reliability, and flexibility. Backed by U.S. support and a
                trusted warranty, our panels deliver brilliant visuals, easy integration,
                and long-term performance for any environment.
              </p>

              <div
                className="hero__actions hero__actions--center"
                style={{
                  opacity: btnProg,
                  transform: `translateY(${Math.round((1 - btnProg) * 12)}px)`,
                }}
              >
                <Link to="/products" className="btn btn--hero">
                  Shop Our Products
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
















