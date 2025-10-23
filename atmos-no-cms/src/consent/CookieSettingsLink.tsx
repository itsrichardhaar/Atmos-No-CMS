import { useConsent } from "./ConsentContext";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: ReactNode;
};

export default function CookieSettingsLink({
  className,
  children,
  onClick,
  ...rest
}: Props) {
  const { openSettings } = useConsent();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // preserve any caller onClick, then open the modal
    onClick?.(e);
    if (!e.defaultPrevented) openSettings();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children ?? "Cookie Settings"}
    </button>
  );
}


