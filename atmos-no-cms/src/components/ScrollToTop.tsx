// components/ScrollToTop.tsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { getLenis } from "../lib/lenis";

function isCoarsePointer() {
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
}

function nativeScrollTo(y: number) {
  // Force all potential roots to the same exact position
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = y;
  (document.body as HTMLElement).scrollTop = y;
}

function getYForEl(el: HTMLElement, offset = 0) {
  const rect = el.getBoundingClientRect();
  const base = window.scrollY || window.pageYOffset || 0;
  return Math.max(0, rect.top + base - offset);
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const guardRef = useRef(0);

  useEffect(() => {
    if (navType === "POP") return; // respect native back/forward restoration

    guardRef.current++;

    const lenis = getLenis?.();
    const coarse = isCoarsePointer();

    const nudge = () => {
      requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    };

    const snapTop = () => {
      if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true });
      // Always force exact 0 after Lenis to avoid fractional Y
      nativeScrollTo(0);
      nudge();
    };

    const snapToHash = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = getYForEl(el, /* offset: fixed header? */ 0);
      if (lenis?.scrollTo) lenis.scrollTo(y, { immediate: true });
      nativeScrollTo(y);
      nudge();
    };

    // ---- Phase A: run on the very next paint
    requestAnimationFrame(() => {
      if (hash) snapToHash(hash.slice(1));
      else snapTop();
    });

    if (coarse) {
      // ---- Mobile/tablet only: re-apply around URL-bar collapse
      const t1 = setTimeout(() => {
        if (hash) snapToHash(hash.slice(1));
        else snapTop();
      }, 40);

      const vv = (window as any).visualViewport as VisualViewport | undefined;
      let reApplied = false;
      const reapply = () => {
        if (reApplied) return;
        reApplied = true;
        if (hash) snapToHash(hash.slice(1));
        else snapTop();
      };

      if (vv) {
        vv.addEventListener("resize", reapply as any, { passive: true } as any);
        vv.addEventListener("scroll", reapply as any, { passive: true } as any);
      }
      const t2 = setTimeout(() => {
        vv?.removeEventListener("resize", reapply as any);
        vv?.removeEventListener("scroll", reapply as any);
      }, 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        vv?.removeEventListener("resize", reapply as any);
        vv?.removeEventListener("scroll", reapply as any);
      };
    } else {
      // ---- Desktop: one extra hard snap on the following frame (belts & suspenders)
      const t = requestAnimationFrame(() => {
        if (hash) snapToHash(hash.slice(1));
        else snapTop();
      });
      return () => cancelAnimationFrame(t);
    }
  }, [pathname, hash, navType]);

  return null;
}





