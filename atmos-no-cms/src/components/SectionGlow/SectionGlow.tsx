import styles from "./SectionGlow.module.css";

type Props = {
  start?: string;                 // start color
  end?: string;                   // end color (usually transparent/black)
  size?: string;                  // gradient size, e.g. "1200px 700px"
  at?: string;                    // anchor position, e.g. "50% 35%"
  height?: number;                // container height in px
  offsetY?: number;               // move glow up/down relative to where inserted
  opacity?: number;               // overall opacity
  className?: string;
};

export default function SectionGlow({
  start = "#29a8ff",
  end = "rgba(0,0,0,0)",
  size = "1200px 700px",
  at = "50% 35%",                 // centered, slightly above middle
  height = 480,
  offsetY = -40,                  // pull up so it sits under the image
  opacity = 0.65,
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${className}`}
      style={{
        height,
        marginTop: offsetY,
        // CSS vars for the gradient
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
