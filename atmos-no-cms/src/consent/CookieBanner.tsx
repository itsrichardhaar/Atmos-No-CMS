import { useState } from "react";
import { useConsent } from "./ConsentContext";
import "./cookie.css";

export default function CookieBanner() {
  const { consent, acceptAll, rejectAll, openSettings } = useConsent();
  const [visible, setVisible] = useState(true);

  // Show the banner only when status is unknown and local hide not set
  if (consent.status !== "unknown" || !visible) return null;

  return (
    <div className="cookieBar" role="dialog" aria-live="polite">
      <div className="cookieBar__inner">
        <div className="cookieBar__copy">
          <strong className="cookieBar__title">We Value Your Privacy</strong>
          <p>
            We use cookies and other similar technologies to operate and improve our site, as described in our{" "}
            <a href="privacy-policy#cookies" className="cookieBar__link">Cookie Policy</a>.
            With your consent, our third-party partners may also use these technologies for analytics and advertising purposes.
            You can manage your settings at any time through{" "}
            <button className="cookieBar__linkBtn" onClick={openSettings}>Cookie Preferences</button>.
          </p>
        </div>
        <div className="cookieBar__actions">
          <button className="btn btn--ghost" onClick={() => { rejectAll(); setVisible(false); }}>Decline</button>
          <button className="btn btn--dark" onClick={() => { acceptAll(); setVisible(false); }}>Accept</button>
          <button className="btn btn--secondary" onClick={openSettings}>Cookie Preferences</button>
        </div>
      </div>
    </div>
  );
}

