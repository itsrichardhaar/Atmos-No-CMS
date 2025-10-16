// src/components/ProductGrid/ProductGrid.tsx
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import type { Product, ProductCategory } from "../../types/product";
import { Link } from "react-router-dom";
import "./ProductGrid.css";
import type { Variants } from "framer-motion";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const filterGroup = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const filterItem = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const titleGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const titleChar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_BEZIER }, 
  },
};

type Props = {
  title?: string;
  products: Product[];
  showViewAll?: boolean;
  withFilters?: boolean;
  defaultCategory?: ProductCategory | "All";
};

type CatOrAll = ProductCategory | "All";

/** =============================
 * CursorSpotlight / Card Glow
 * ============================= */
function CursorSpotlight({
  gridRef,
  radius = 300,
  glowRGB = "40,153,213",
  disabled = false,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  glowRGB?: string;
  disabled?: boolean;
}) {
  const spotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  type CardState = {
    el: HTMLElement;
    x: number; y: number; i: number;
    tx: number; ty: number; ti: number;
  };
  const statesRef = useRef<CardState[]>([]);
  const insideRef = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const spot = document.createElement("div");
    spot.className = "pg-spotlight";
    spot.style.cssText = `
      position: fixed; width:${radius * 2.3}px; height:${radius * 2.3}px;
      border-radius:50%; transform:translate(-50%,-50%);
      pointer-events:none; z-index:5; opacity:0; mix-blend-mode:screen;
      background: radial-gradient(circle,
        rgba(${glowRGB}, 0.14) 0%,
        rgba(${glowRGB}, 0.07) 25%,
        rgba(${glowRGB}, 0.03) 50%,
        transparent 70%);
      transition:opacity .25s ease;
    `;
    document.body.appendChild(spot);
    spotRef.current = spot;

    const ensureStates = () => {
      if (!gridRef.current) return;
      const els = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".pc"));
      if (statesRef.current.length !== els.length) {
        statesRef.current = els.map((el) => ({
          el, x: 50, y: 50, i: 0, tx: 50, ty: 50, ti: 0,
        }));
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      ensureStates();
      spot.style.left = `${e.clientX}px`;
      spot.style.top = `${e.clientY}px`;

      const rect = gridRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      insideRef.current = inside;
      spot.style.opacity = inside ? "1" : "0";

      if (!inside) {
        statesRef.current.forEach(s => { s.ti = 0; });
        return;
      }

      const proximity = radius * 0.5;
      const fade = radius * 0.75;

      statesRef.current.forEach((s) => {
        const r = s.el.getBoundingClientRect();
        const relX = ((e.clientX - r.left) / r.width) * 100;
        const relY = ((e.clientY - r.top) / r.height) * 100;
        s.tx = relX; s.ty = relY;

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const halfMax = Math.max(r.width, r.height) / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy) - halfMax;
        const d = Math.max(0, dist);

        let intensity = 0;
        if (d <= proximity) intensity = 1;
        else if (d <= fade) intensity = (fade - d) / (fade - proximity);
        s.ti = intensity;
      });

      if (!runningRef.current) {
        runningRef.current = true;
        tick();
      }
    };

    const onLeaveDoc = () => {
      insideRef.current = false;
      spot.style.opacity = "0";
      statesRef.current.forEach(s => { s.ti = 0; });
      if (!runningRef.current) {
        runningRef.current = true;
        tick();
      }
    };

    const LERP = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const tPos = 0.18;
      const tInt = 0.15;
      let anyMoving = false;

      statesRef.current.forEach((s) => {
        const nx = LERP(s.x, s.tx, tPos);
        const ny = LERP(s.y, s.ty, tPos);
        const ni = LERP(s.i, s.ti, tInt);

        if (Math.abs(nx - s.x) > 0.02 || Math.abs(ny - s.y) > 0.02 || Math.abs(ni - s.i) > 0.01) {
          anyMoving = true;
        }

        s.x = nx; s.y = ny; s.i = ni;

        s.el.style.setProperty("--glow-x", `${s.x}%`);
        s.el.style.setProperty("--glow-y", `${s.y}%`);
        s.el.style.setProperty("--glow-intensity", `${s.i}`);
        s.el.style.setProperty("--glow-radius", `${radius}px`);
        s.el.style.setProperty("--glow-rgb", glowRGB);
      });

      if (anyMoving || insideRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        runningRef.current = false;
        rafRef.current = null;
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      spotRef.current?.remove();
    };
  }, [gridRef, radius, glowRGB, disabled]);

  return null;
}

/** ==============
 * Product Grid
 * ============== */
export default function ProductGrid({
  title = "Our Products",
  products,
  showViewAll = true,
  withFilters = false,
  defaultCategory = "All",
}: Props) {
  const data = useMemo(() => {
    const byId = new Map<string, Product>();
    for (const p of products) if (!byId.has(p.id)) byId.set(p.id, p);
    return Array.from(byId.values());
  }, [products]);

  const categories = useMemo<CatOrAll[]>(() => {
    const set = new Set<ProductCategory>();
    data.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [data]);

  const [active, setActive] = useState<CatOrAll>(defaultCategory);
  const isFiltered = active !== "All";

  const orderMap = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach((p, i) => m.set(p.id, i));
    return m;
  }, [data]);

  const visible = useMemo(() => {
    const list = active === "All" ? data : data.filter((p) => p.categories.includes(active));
    return [...list].sort((a, b) => (orderMap.get(a.id)! - orderMap.get(b.id)!));
  }, [active, data, orderMap]);

  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], 
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-600px", "600px"]);
  const titleChars = useMemo(() => Array.from(title), [title]);

  return (
    <motion.section 
      className={`pg ${isFiltered ? "pg--noAfter" : ""}`}
      ref={sectionRef}
      style={reduce ? undefined : ({ ["--pg-y" as any]: y } as any)}
    >
      <div className="container">
        <div className="pg__header">
          
          <motion.h2
            className="pg__title"
            variants={titleGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            aria-label={title}
          >
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                variants={titleChar}
                className="pg__titleChar"
                style={{ display: "inline-block" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.h2>

          {showViewAll && (
            <Link to="/products" className="btn btn--primary pg__viewall">
              View All Products →
            </Link>
          )}
        </div>

        {withFilters && (
          <motion.div
            className="pg__filters"
            role="tablist"
            aria-label="Filter by category"
            variants={filterGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                className={`pill ${active === cat ? "is-active" : ""}`}
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
                variants={filterItem}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        <CursorSpotlight gridRef={gridRef} radius={300} glowRGB="40,153,213" />

        <motion.div className="pg__grid" layout ref={gridRef}>
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.48, ease: [0.4, 0, 0, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}






