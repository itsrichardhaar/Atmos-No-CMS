// src/components/BackgroundGlow/BackgroundGlow.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import "./BackgroundGlow.css";

export default function BackgroundGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Progress of THIS section through the viewport:
  // 0 when the top of the section hits the bottom of the viewport,
  // 1 when the bottom of the section hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Gentle parallax range (tweak px to taste)
  const y = useTransform(scrollYProgress, [0, 1], ["-200px", "200px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]); // ultra subtle

  return (
    <motion.div
      ref={ref}
      className="background-glow"
      aria-hidden="true"
      style={reduce ? undefined : { y, scale }}
    />
  );
}
