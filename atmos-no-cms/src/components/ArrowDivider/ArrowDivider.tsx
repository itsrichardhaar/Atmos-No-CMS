import styles from "./ArrowDivider.module.css";

type Props = {
  imageSrc?: string;     // allow override if needed
  height?: number;       // visual height of the divider
  shiftY?: number;       // how far it overlaps the sections (px)
};

export default function ArrowDivider({
  imageSrc = "/images/arrow.svg",
  height = 160,
  shiftY = -80,         // negative pulls the arrow up to “split” sections
}: Props) {
  return (
    <div
      className={styles.wrap}
      style={{ height: `${height}px`, marginTop: `${shiftY}px` }}
      aria-hidden="true"
    >
      <div
        className={styles.art}
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
    </div>
  );
}
