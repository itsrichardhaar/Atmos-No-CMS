import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentContext";
import "./cookie.css";

export default function CookieSettingsModal() {
  const {
    settingsOpen,
    closeSettings,
    consent,
    updateCategories,
    saveCustom,
    acceptAll,
    rejectAll,
  } = useConsent();

  const dlgRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSettings(); };
    if (settingsOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, closeSettings]);

  if (!settingsOpen) return null;

  return (
    <div className="cookieModal__scrim" role="presentation" onClick={(e) => {
      if (e.target === e.currentTarget) closeSettings();
    }}>
      <div
        className="cookieModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookieModalTitle"
        ref={dlgRef}
      >
        <button className="cookieModal__close" aria-label="Close cookie preferences" onClick={closeSettings}>×</button>
        <h2 id="cookieModalTitle" className="cookieModal__title">Cookie Preferences</h2>
        <p className="cookieModal__lead">
          We use different types of cookies on our websites as listed below. You can change your selections at any time.
          View our <a href="/privacy-policy#cookies" className="cookieModal__link">Cookie Policy</a> for more information.
        </p>

        {/* Cards */}
        <div className="cookieModal__cards">
          <section className="cookieCard">
            <header className="cookieCard__head">
              <label className="cookieSwitch">
                <input type="checkbox" checked readOnly disabled />
                <span className="cookieSwitch__ui" aria-hidden />
              </label>
              <div>
                <h3 className="cookieCard__title">Strictly Necessary Cookies <span className="cookieCard__req">(Required)</span></h3>
              </div>
            </header>
            <p className="cookieCard__desc">
              These cookies are essential for core site functionality and security. They are always enabled.
            </p>
          </section>

          <section className="cookieCard">
            <header className="cookieCard__head">
              <label className="cookieSwitch">
                <input
                  type="checkbox"
                  checked={consent.categories.analytics}
                  onChange={(e) => updateCategories({ analytics: e.target.checked })}
                />
                <span className="cookieSwitch__ui" aria-hidden />
              </label>
              <h3 className="cookieCard__title">Statistics Cookies</h3>
            </header>
            <p className="cookieCard__desc">
              These help us understand how visitors interact with the site so we can improve the experience.
            </p>
          </section>

          <section className="cookieCard">
            <header className="cookieCard__head">
              <label className="cookieSwitch">
                <input
                  type="checkbox"
                  checked={consent.categories.marketing}
                  onChange={(e) => updateCategories({ marketing: e.target.checked })}
                />
                <span className="cookieSwitch__ui" aria-hidden />
              </label>
              <h3 className="cookieCard__title">Marketing Cookies</h3>
            </header>
            <p className="cookieCard__desc">
              Used by advertising partners to deliver relevant ads and measure their performance.
            </p>
          </section>
        </div>

        <div className="cookieModal__actions">
          <button className="btn btn--ghost" onClick={rejectAll}>Decline</button>
          <button className="btn btn--dark" onClick={acceptAll}>Accept</button>
          <button
            className="btn btn--primary"
            onClick={() => { saveCustom(); closeSettings(); }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
