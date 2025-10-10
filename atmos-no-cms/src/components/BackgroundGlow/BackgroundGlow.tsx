// src/components/BackgroundGlow/BackgroundGlow.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import "./BackgroundGlow.css";

export default function BackgroundGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-200px", "200px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]); 

  return (
    <motion.div
      ref={ref}
      className="background-glow"
      aria-hidden="true"
      style={reduce ? undefined : { y, scale }}
    />
  );
}
