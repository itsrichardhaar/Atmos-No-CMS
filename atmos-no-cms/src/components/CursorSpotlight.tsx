import { useEffect, useRef } from "react";

type Props = {
  gridRef: React.RefObject<HTMLDivElement | null>;
  cardSelector?: string;   // ".mc" for MarketCard, ".pc" for ProductCard, etc.
  radius?: number;         // px
  glowRGB?: string;        // "r,g,b"
  disabled?: boolean;      // respects prefers-reduced-motion when true
  spotlightClass?: string; // optional class for the floating circle
};

export default function CursorSpotlight({
  gridRef,
  cardSelector = ".mc",
  radius = 300,
  glowRGB = "40,153,213",
  disabled = false,
  spotlightClass = "cursor-spotlight",
}: Props) {
  const spotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const running = useRef(false);
  const inside = useRef(false);

  type CardState = { el: HTMLElement; x: number; y: number; i: number; tx: number; ty: number; ti: number };
  const states = useRef<CardState[]>([]);

  useEffect(() => {
    if (disabled) return;

    const spot = document.createElement("div");
    spot.className = spotlightClass;
    spot.style.cssText = `
      position:fixed;width:${radius * 2.3}px;height:${radius * 2.3}px;
      border-radius:50%;transform:translate(-50%,-50%);
      pointer-events:none;z-index:5;opacity:0;mix-blend-mode:screen;
      background:radial-gradient(circle,
        rgba(${glowRGB},0.14) 0%,
        rgba(${glowRGB},0.07) 25%,
        rgba(${glowRGB},0.03) 50%,
        transparent 70%);
      transition:opacity .25s ease;
    `;
    document.body.appendChild(spot);
    spotRef.current = spot;

    const ensureStates = () => {
      if (!gridRef.current) return;
      const els = Array.from(gridRef.current.querySelectorAll<HTMLElement>(cardSelector));
      if (states.current.length !== els.length) {
        states.current = els.map((el) => ({ el, x: 50, y: 50, i: 0, tx: 50, ty: 50, ti: 0 }));
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      ensureStates();

      spot.style.left = `${e.clientX}px`;
      spot.style.top  = `${e.clientY}px`;

      const rect = gridRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      inside.current = isInside;
      spot.style.opacity = isInside ? "1" : "0";

      const proximity = radius * 0.5;
      const fade = radius * 0.75;

      states.current.forEach((s) => {
        const r = s.el.getBoundingClientRect();
        s.tx = ((e.clientX - r.left) / r.width) * 100;
        s.ty = ((e.clientY - r.top)  / r.height) * 100;

        if (!isInside) {
          s.ti = 0;
        } else {
          const cx = r.left + r.width / 2;
          const cy = r.top  + r.height / 2;
          const halfMax = Math.max(r.width, r.height) / 2;
          const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - halfMax);
          s.ti = dist <= proximity ? 1 : dist <= fade ? (fade - dist) / (fade - proximity) : 0;
        }
      });

      if (!running.current) { running.current = true; tick(); }
    };

    const onLeave = () => {
      inside.current = false;
      spot.style.opacity = "0";
      states.current.forEach((s) => (s.ti = 0));
      if (!running.current) { running.current = true; tick(); }
    };

    const LERP = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const tPos = 0.18, tInt = 0.15;
      let any = false;

      states.current.forEach((s) => {
        const nx = LERP(s.x, s.tx, tPos);
        const ny = LERP(s.y, s.ty, tPos);
        const ni = LERP(s.i, s.ti, tInt);
        if (Math.abs(nx - s.x) > 0.02 || Math.abs(ny - s.y) > 0.02 || Math.abs(ni - s.i) > 0.01) any = true;

        s.x = nx; s.y = ny; s.i = ni;
        s.el.style.setProperty("--glow-x", `${s.x}%`);
        s.el.style.setProperty("--glow-y", `${s.y}%`);
        s.el.style.setProperty("--glow-intensity", `${s.i}`);
        s.el.style.setProperty("--glow-radius", `${radius}px`);
        s.el.style.setProperty("--glow-rgb", `${glowRGB}`);
      });

      if (any || inside.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        running.current = false;
        rafRef.current = null;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      spotRef.current?.remove();
    };
  }, [gridRef, cardSelector, radius, glowRGB, disabled, spotlightClass]);

  return null;
}

