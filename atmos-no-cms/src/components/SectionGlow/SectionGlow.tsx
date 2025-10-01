// Component used for variable gradient on each product page
// Glow gradient values set in data/products.ts

import styles from "./SectionGlow.module.css";

type Props = {
  start?: string;               
  end?: string;                   
  size?: string;                  
  at?: string;                    
  height?: number;                
  offsetY?: number;               
  opacity?: number;               
  className?: string;
};

export default function SectionGlow({
  start = "#29a8ff",
  end = "rgba(0,0,0,0)",
  size = "1200px 700px",
  at = "50% 35%",                 
  height = 480,
  offsetY = -40,                  
  opacity = 0.65,
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${className}`}
      style={{
        height,
        marginTop: offsetY,

        ["--glow-start" as any]: start,
        ["--glow-end" as any]: end,
        ["--glow-size" as any]: size,
        ["--glow-at" as any]: at,
        ["--glow-opacity" as any]: opacity,
      }}
      aria-hidden="true"
    >
      <div className={styles.glow} />
    </div>
  );
}
