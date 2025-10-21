import { useConsent } from "./ConsentContext";

export default function CookieSettingsLink({ className }: { className?: string }) {
  const { resetConsent } = useConsent();
  return (
    <button type="button" className={className} onClick={resetConsent}>
      Cookie settings
    </button>
  );
}
