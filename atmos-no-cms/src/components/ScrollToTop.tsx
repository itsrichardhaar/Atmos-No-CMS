// components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { getLenis } from "../lib/lenis";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  useEffect(() => {
    // Respect back/forward native restoration
    if (navType === "POP") return;

    const lenis = getLenis?.();
    const scroller = document.scrollingElement || document.documentElement;

    const nudge = () => {
      // Force IntersectionObserver/Framer to re-evaluate immediately
      // Use two rAFs to ensure layout has settled after scrollTo
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
      });
    };

    if (hash) {
      // Scroll to anchor
      const go = () => {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        // If you have a fixed nav, adjust here (e.g., -72)
        const offset = 0;

        if (lenis?.scrollTo) {
          lenis.scrollTo(el, { immediate: true, offset });
        } else {
          el.scrollIntoView({ block: "start", inline: "nearest" });
          if (offset) scroller.scrollTop = scroller.scrollTop - offset;
        }
        nudge();
      };
      requestAnimationFrame(go);
      return;
    }

    const atTop = (scroller?.scrollTop ?? window.pageYOffset ?? 0) <= 0;

    // If already at the top, just nudge observers and bail
    if (atTop) {
      nudge();
      return;
    }

    // Otherwise, snap to top (immediate so we don’t animate this) then nudge
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { immediate: true });
      nudge();
    } else {
      requestAnimationFrame(() => {
        scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
        nudge();
      });
    }
  }, [pathname, hash, navType]);

  return null;
}



