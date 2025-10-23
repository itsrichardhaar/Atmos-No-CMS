import Lenis, { type LenisOptions } from "@studio-freight/lenis";

let _lenis: Lenis | null = null;

export function shouldUseLenis(): boolean {
  if (typeof window === "undefined") return false;

  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Treat mobile/tablet as "native scroll"
  const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const isSmall  = window.matchMedia?.("(max-width: 1024px)")?.matches ?? false;

  // Run Lenis only on larger/precision-pointer screens with no reduced motion
  return !prefersReduced && !(isCoarse || isSmall);
}

export function getLenis(): Lenis | null {
  if (_lenis) return _lenis;

  if (!shouldUseLenis()) {
    _lenis = null; // native scroll
    return _lenis;
  }

  const opts: LenisOptions = {
    duration: 1.0,
    easing: (t: number) => t,
    lerp: 0.1,
    smoothWheel: true,
    // If your Lenis version supports it, this also helps keep touch native:
    // smoothTouch: false,
    syncTouch: true,
    syncTouchLerp: 0.075,
    touchInertiaMultiplier: 1.0,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    orientation: "vertical",
    gestureOrientation: "vertical",
  };

  _lenis = new Lenis(opts);
  return _lenis;
}

export function destroyLenis() {
  _lenis?.destroy();
  _lenis = null;
}



