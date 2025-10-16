// src/components/LenisProvider/LenisProvider.tsx
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "@studio-freight/lenis";

type LenisCtx = { lenis: Lenis | null };
const Ctx = createContext<LenisCtx>({ lenis: null });

export function useLenis() {
  return useContext(Ctx).lenis;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const value = useMemo<LenisCtx>(() => ({ lenis: lenisRef.current }), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const lenis = new Lenis({
        duration: 1.0,
        easing: (t: number): number => t,
        lerp: 0.1,
        smoothWheel: !prefersReduced,
        gestureOrientation: "vertical" as const,
    }); 

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = ({ scroll }: { scroll: number }) => {
      document.documentElement.style.setProperty("--scroll-y", String(scroll));
    };
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

