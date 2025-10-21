import { useState } from "react";
import { useConsent } from "./ConsentContext";
import "./cookie.css";

export default function CookieBanner() {
  const { consent, acceptAll, rejectAll, updateCategories, saveCustom } = useConsent();
  const [openCustomize, setOpenCustomize] = useState(false);

  if (consent.status !== "unknown") return null;

  return (
    <div className="cookieBanner" role="dialog" aria-live="polite">
      <div className="cookieBanner__content">
        <p className="cookieBanner__text">
          We use cookies to enhance site navigation, analyze usage, and assist in our marketing efforts.
          You can accept, reject, or customize your choices. You can change your consent anytime in “Cookie settings”.
        </p>
        {!openCustomize ? (
          <div className="cookieBanner__actions">
            <button className="btn btn--secondary" onClick={() => setOpenCustomize(true)}>Customize</button>
            <button className="btn" onClick={rejectAll}>Reject non-essential</button>
            <button className="btn btn--primary" onClick={acceptAll}>Accept all</button>
          </div>
        ) : (
          <form
            className="cookieBanner__form"
            onSubmit={(e) => { e.preventDefault(); saveCustom(); }}
          >
            <label className="cookieBanner__row">
              <input type="checkbox" checked readOnly disabled />
              <span>Strictly necessary (always on)</span>
            </label>
            <label className="cookieBanner__row">
              <input
                type="checkbox"
                onChange={(e) => updateCategories({ analytics: e.target.checked })}
              />
              <span>Analytics</span>
            </label>
            <label className="cookieBanner__row">
              <input
                type="checkbox"
                onChange={(e) => updateCategories({ marketing: e.target.checked })}
              />
              <span>Marketing</span>
            </label>
            <div className="cookieBanner__actions">
              <button type="button" className="btn" onClick={rejectAll}>Reject non-essential</button>
              <button type="submit" className="btn btn--primary">Save choices</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
