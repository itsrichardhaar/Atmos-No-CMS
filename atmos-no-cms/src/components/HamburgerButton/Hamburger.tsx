// src/components/Hamburger.tsx

import "./Hamburger.css";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  label?: string;
};

export default function HamburgerButton({
  isOpen,
  onToggle,
  className,
  label = "Menu",
}: Props) {
  return (
    <button
      type="button"
      className={`hb ${isOpen ? "is-open" : ""} ${className ?? ""}`}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="site-menu"
      onClick={onToggle}
    >
      <span className="hb__box" aria-hidden="true">
        <span className="hb__bar hb__bar--top" />
        <span className="hb__bar hb__bar--mid" />
        <span className="hb__bar hb__bar--bot" />
      </span>
    </button>
  );
}
