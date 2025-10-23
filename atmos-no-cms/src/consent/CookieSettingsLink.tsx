import { useConsent } from "./ConsentContext";

export default function CookieSettingsLink({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" className={className} onClick={openSettings}>
      Cookie settings
    </button>
  );
}

