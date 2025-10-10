import { Link } from "react-router-dom";
import styles from "./BuildDisplayCta.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;
  imageSrc?: string;              // kept as a fallback / poster
  videoSrc?: string;              // NEW: optional override
};

export default function BuildDisplayCta({
  title = "Build Your Display Now.",
  subtitle = "Use our custom wall builder to create a solution for your space today.",
  buttonText = "Build Your Display",
  to = "/builder",
  imageSrc = "/assets/images/build-cta.png",
  videoSrc = "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/videos/Atmos_wall_bg-2.mp4",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [srcSet, setSrcSet] = useState(false);

  // Preload connection hint (browser may warm up the request)
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = videoSrc;
    link.type = "video/mp4";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link) };
  }, [videoSrc]);

  // Lazy-attach the src when the section approaches viewport
  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !srcSet) {
          vid.preload = "auto";
          vid.src = videoSrc;
          setSrcSet(true);
          vid.play().catch(() => {});
        }
      },
      { root: null, rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [srcSet, videoSrc]);

  // Mark ready on canplay* (then fade in via CSS)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onReady = () => {
      if (vid.readyState >= 3) {
        // next frame to ensure transition applies
        requestAnimationFrame(() => setReady(true));
      }
    };
    vid.addEventListener("loadeddata", onReady, { passive: true });
    vid.addEventListener("canplay", onReady, { passive: true });
    vid.addEventListener("canplaythrough", onReady, { passive: true });
    return () => {
      vid.removeEventListener("loadeddata", onReady as any);
      vid.removeEventListener("canplay", onReady as any);
      vid.removeEventListener("canplaythrough", onReady as any);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="build-cta-title">
      {/* Background video (behind scrim) */}
      <div className={`${styles.videoWrap} ${ready ? styles.isReady : ""}`}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          loop
          playsInline
          preload="metadata"     // upgraded to auto when intersecting
          aria-hidden="true"
          poster={imageSrc || ""}
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
        />
      </div>

      {/* Scrim overlay stays above the video */}
      <div className={styles.scrim} />

      {/* Foreground content */}
      <div className={styles.inner}>
        <div className={styles.frame}>
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05}}
            viewport={{ once: true }}
            id="build-cta-title"
            className={styles.title}
          >
            {title}
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1}}
            viewport={{ once: true }}
            className={styles.subtitle}
          >
            {subtitle}
          </motion.p>
          <Link to={to} className={styles.button} aria-label={buttonText}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}


