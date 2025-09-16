import React from "react";
import "./DotGrid.css";

type DotGridProps = {
  dotColor?: string;      // color of dots
  bgColor?: string;       // background behind dots
  size?: number;          // dot size in px
  gap?: number;           // distance between dots in px
  opacity?: number;       // 0..1 for dot opacity
  offsetX?: number;       // shift pattern horizontally
  offsetY?: number;       // shift pattern vertically
  fade?: boolean;         // radial fade mask
  className?: string;
  style?: React.CSSProperties;
};

export default function DotGrid({
  dotColor = "rgba(255,255,255,0.22)",
  bgColor = "transparent",
  size = 2,
  gap = 22,
  opacity = 1,
  offsetX = 0,
  offsetY = 0,
  fade = true,
  className,
  style
}: DotGridProps) {
  const vars: React.CSSProperties = {
    // CSS custom properties the CSS file will read:
    // @ts-ignore - allow custom properties
    "--dg-color": dotColor,
    "--dg-bg": bgColor,
    "--dg-size": `${size}px`,
    "--dg-gap": `${gap}px`,
    "--dg-opacity": String(opacity),
    "--dg-offset-x": `${offsetX}px`,
    "--dg-offset-y": `${offsetY}px`,
  };
  return (
    <div
      className={`dot-grid ${fade ? "dot-grid--fade" : ""} ${className ?? ""}`}
      style={{ ...vars, ...style }}
      aria-hidden="true"
    />
  );
}
