// src/lib/lenis.ts
import Lenis, { type LenisOptions } from "@studio-freight/lenis";

let _lenis: Lenis | null = null;

export function getLenis(): Lenis {
  if (_lenis) return _lenis;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const opts: LenisOptions = {
    // feel free to tweak these
    duration: 1.0,                // seconds (higher = smoother/slower)
    easing: (t: number) => t,     // linear; plug in a custom easing if you want
    lerp: 0.1,                    // alternative to duration (Lenis handles precedence)
    smoothWheel: !prefersReduced, // disable if user prefers reduced motion
    syncTouch: true,              // keep touch and wheel in sync
    syncTouchLerp: 0.075,
    touchInertiaMultiplier: 1.0,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    orientation: "vertical",
    gestureOrientation: "vertical",
    // wrapper, content, wheelEventsTarget, eventsTarget — only if you need custom containers
  };

  _lenis = new Lenis(opts);
  return _lenis;
}

export function destroyLenis() {
  _lenis?.destroy();
  _lenis = null;
}


