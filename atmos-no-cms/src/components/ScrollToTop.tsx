// components/ScrollToTop.tsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { getLenis } from "../lib/lenis";

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .replace("px", "");
  return (Number(raw) || 0) + 0;
}

function nativeScrollTo(y: number) {
  // Write to both potential scroll roots (iOS can vary)
  const html = document.documentElement;
  const body = document.body as HTMLElement;
  // Use window first (safest), then explicit roots
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
  html.scrollTop = y;
  body.scrollTop = y;
}

function getYForEl(el: HTMLElement, offset = 0) {
  const rect = el.getBoundingClientRect();
  return Math.max(0, rect.top + (window.scrollY || window.pageYOffset || 0) - offset);
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const guardRef = useRef(0);

  useEffect(() => {
    // Respect back/forward (native restoration)
    if (navType === "POP") return;

    // Avoid double-running if React StrictMode mounts twice
    guardRef.current++;

    const lenis = getLenis?.();
    const offset = getHeaderOffset();

    const nudge = () => {
      // Re-run observers / in-view logic immediately
      requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    };

    const snapTop = () => {
      if (lenis?.scrollTo) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        nativeScrollTo(0);
      }
      nudge();
    };

    const snapToHash = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = getYForEl(el, offset);
      if (lenis?.scrollTo) {
        lenis.scrollTo(y, { immediate: true });
      } else {
        nativeScrollTo(y);
      }
      nudge();
    };

    // Phase 1: Run as soon as the new route paints
    requestAnimationFrame(() => {
      if (hash) {
        snapToHash(hash.slice(1));
      } else {
        snapTop();
      }
    });

    // Phase 2: Re-apply after very short delay to beat iOS URL bar collapse
    const t1 = setTimeout(() => {
      if (hash) {
        snapToHash(hash.slice(1));
      } else {
        snapTop();
      }
    }, 40);

    // Phase 3: Listen for visualViewport changes briefly and re-apply once
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    let reApplied = false;
    const reapply = () => {
      if (reApplied) return;
      reApplied = true;
      if (hash) {
        snapToHash(hash.slice(1));
      } else {
        snapTop();
      }
    };

    if (vv) {
      const onVV = () => reapply();
      vv.addEventListener("resize", onVV, { passive: true } as any);
      vv.addEventListener("scroll", onVV, { passive: true } as any);
      // Stop listening after a short window (URL bar settle)
      const t2 = setTimeout(() => {
        vv.removeEventListener("resize", onVV as any);
        vv.removeEventListener("scroll", onVV as any);
      }, 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        vv.removeEventListener("resize", onVV as any);
        vv.removeEventListener("scroll", onVV as any);
      };
    }

    return () => {
      clearTimeout(t1);
    };
  }, [pathname, hash, navType]);

  return null;
}




