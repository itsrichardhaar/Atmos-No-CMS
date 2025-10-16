import React from "react";
import "./DotGrid.css";

type DotGridProps = {
  dotColor?: string;   
  size?: number;      
  gap?: number;        
  offsetX?: number;    
  offsetY?: number;   
  reveal?: boolean;    
  className?: string;
  style?: React.CSSProperties;
};

export default function DotGrid({
  dotColor = "#2899D5",
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

