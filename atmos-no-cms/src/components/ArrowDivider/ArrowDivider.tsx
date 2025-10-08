import styles from "./ArrowDivider.module.css";

type Props = {
  imageSrc?: string;     
  height?: number;       
  shiftY?: number;       
};

export default function ArrowDivider({
  imageSrc = "/images/arrow.svg",
  height = 160,
  shiftY = -80,         
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
