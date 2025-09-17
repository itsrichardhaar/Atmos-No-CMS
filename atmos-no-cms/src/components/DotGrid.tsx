import React from "react";
import "./DotGrid.css";

type DotGridProps = {
  dotColor?: string;   // dot color (rgba recommended)
  size?: number;       // dot diameter in px
  gap?: number;        // spacing in px
  offsetX?: number;    // pattern offset x (px)
  offsetY?: number;    // pattern offset y (px)
  reveal?: boolean;    // use the reveal mask variant
  className?: string;
  style?: React.CSSProperties;
};

export default function DotGrid({
  dotColor = "rgba(255,255,255,0.22)",
  size = 2,
  gap = 22,
  offsetX = 0,
  offsetY = 0,
  reveal = false,
  className,
  style
}: DotGridProps) {
  const vars: React.CSSProperties = {
    // @ts-ignore custom props
    "--dg-color": dotColor,
    "--dg-size": `${size}px`,
    "--dg-gap": `${gap}px`,
    "--dg-offset-x": `${offsetX}px`,
    "--dg-offset-y": `${offsetY}px`,
  };
  return (
    <div
      className={`dotgrid ${reveal ? "dotgrid--reveal" : ""} ${className ?? ""}`}
      style={{ ...vars, ...style }}
      aria-hidden="true"
    />
  );
}

