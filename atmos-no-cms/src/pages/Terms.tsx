import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import styles from "./Terms.module.css";
import CookieSettingsLink from "../consent/CookieSettingsLink";

type TabDef = {
  id: string;
  label: string;
  render: () => JSX.Element; 
};

function useHashSync(defaultId: string) {
  const [hash, setHash] = useState<string>(() => (location.hash ? location.hash.slice(1) : defaultId));

  useEffect(() => {
    const onHash = () => setHash(location.hash ? location.hash.slice(1) : defaultId);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultId]);

  const set = useCallback((id: string) => {
    if (id === hash) return;
    history.replaceState(null, "", `#${id}`);
    setHash(id);
  }, [hash]);

  return [hash, set] as const;
}

export default function Terms() {
  // ---- Tabs definition (edit labels/sections as you like) ----
  const tabs = useMemo<TabDef[]>(
    () => [
      {
        id: "website-terms",
        label: "Website Terms of Use",
        render: () => (
          <section aria-labelledby="website-terms-h">
            <h2 id="website-terms-h" className={styles.h2}>Website Terms of Use</h2>
            <p>
              These Terms govern your access to and use of the Atmos LED website and any content,
              functionality, and services offered on or through it. By accessing our site, you agree
              to be bound by these Terms.
            </p>
            <h3 className={styles.h3}>Acceptable Use</h3>
            <ul>
              <li>No unlawful, infringing, or harmful activities.</li>
              <li>No scraping, automated harvesting, or rate-limiting abuse.</li>
              <li>No reverse engineering of site mechanisms except as permitted by law.</li>
            </ul>
            <h3 className={styles.h3}>Intellectual Property</h3>
            <p>
              All materials (text, graphics, logos, images, UI, and code) are owned by Atmos LED or
              its licensors and are protected by IP laws. You may not reproduce, distribute, or create
              derivative works without prior written permission.
            </p>
            <h3 className={styles.h3}>Links to Third Parties</h3>
            <p>
              Our site may include links to third-party sites or services. We are not responsible for
              their content, policies, or practices.
            </p>
            <h3 className={styles.h3}>Changes to the Site</h3>
            <p>
              We may update or discontinue features at any time. We are not liable for any modification,
              suspension, or discontinuation of the site.
            </p>
            <h3 className={styles.h3}>Contact</h3>
            <p>Questions about these Terms? Email <a href="mailto:support@atmosled.com">support@atmosled.com</a>.</p>
          </section>
        ),
      },
      {
        id: "returns-refunds",
        label: "Returns & Refunds",
        render: () => (
          <section aria-labelledby="returns-refunds-h">
            <h2 id="returns-refunds-h" className={styles.h2}>Returns & Refunds</h2>
            <p>
              If you’re not satisfied with your purchase, you may be eligible for a return or refund
              subject to the conditions below.
            </p>
            <ul>
              <li>Request return authorization within 30 days of delivery.</li>
              <li>Items must be unused, in original packaging, and include all accessories.</li>
              <li>Certain custom or clearance items may be non-returnable.</li>
            </ul>
            <p>To initiate a return, contact <a href="mailto:support@atmosled.com">support@atmosled.com</a>.</p>
          </section>
        ),
      },
      {
        id: "warranty-service",
        label: "Warranty & Service",
        render: () => (
          <section aria-labelledby="warranty-service-h">
            <h2 id="warranty-service-h" className={styles.h2}>Warranty & Service</h2>
            <p>
              Atmos LED products include limited warranties against defects in materials and workmanship.
              Warranty duration and coverage vary by product line.
            </p>
            <h3 className={styles.h3}>What’s Covered</h3>
            <ul>
              <li>Manufacturing defects during the warranty period.</li>
              <li>Repair or replacement at our discretion.</li>
            </ul>
            <h3 className={styles.h3}>What’s Not Covered</h3>
            <ul>
              <li>Damage due to misuse, improper installation, or unauthorized modifications.</li>
              <li>Normal wear and tear, consumables, or incidental damage.</li>
            </ul>
            <p>Start a warranty claim via <a href="mailto:support@atmosled.com">support@atmosled.com</a>.</p>
          </section>
        ),
      },
      {
        id: "shipping",
        label: "Shipping",
        render: () => (
          <section aria-labelledby="shipping-h">
            <h2 id="shipping-h" className={styles.h2}>Shipping</h2>
            <p>
              Orders ship from our U.S. facilities or authorized partners. Shipping times vary by
              destination and product availability.
            </p>
            <ul>
              <li>Tracking details are provided upon dispatch.</li>
              <li>Large displays or custom builds may require freight shipment and scheduling.</li>
              <li>Customs or import duties (if applicable) are the recipient’s responsibility.</li>
            </ul>
          </section>
        ),
      },
      {
        id: "legal",
        label: "Legal Notices",
        render: () => (
          <section aria-labelledby="legal-h">
            <h2 id="legal-h" className={styles.h2}>Legal Notices</h2>
            <h3 className={styles.h3}>Disclaimer of Warranties</h3>
            <p>
              Except as expressly provided, the website and services are provided “as is” and “as available”
              without warranties of any kind, whether express or implied.
            </p>
            <h3 className={styles.h3}>Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, Atmos LED will not be liable for indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>
            <h3 className={styles.h3}>Governing Law</h3>
            <p>
              These Terms are governed by the laws of the state where Atmos LED is headquartered, without
              regard to conflict-of-law principles.
            </p>
            <h3 className={styles.h3}>Cookies & Consent</h3>
            <p>
              Manage your cookie choices at any time via{" "}
              <CookieSettingsLink className={styles.linkBtn}>Cookie Preferences</CookieSettingsLink>.
            </p>
          </section>
        ),
      },
    ],
    []
  );

  // ---- Hash sync & active tab ----
  const defaultId = tabs[0].id;
  const [hash, setHash] = useHashSync(defaultId);
  const currentIndex = Math.max(0, tabs.findIndex(t => t.id === hash));
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  // Keep state in sync if the hash changes (e.g., external link to #shipping)
  useEffect(() => {
    const idx = tabs.findIndex(t => t.id === hash);
    if (idx >= 0 && idx !== activeIndex) setActiveIndex(idx);
  }, [hash, tabs, activeIndex]);

  const onSelect = (idx: number) => {
    if (idx < 0 || idx >= tabs.length) return;
    setActiveIndex(idx);
    setHash(tabs[idx].id);
  };

  // ---- Keyboard navigation (Arrow keys/Home/End) ----
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    const btn = tabRefs.current[activeIndex];
    btn?.focus({ preventScroll: true });
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const count = tabs.length;
    if (e.key === "ArrowRight") { e.preventDefault(); onSelect((activeIndex + 1) % count); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); onSelect((activeIndex - 1 + count) % count); }
    if (e.key === "Home")       { e.preventDefault(); onSelect(0); }
    if (e.key === "End")        { e.preventDefault(); onSelect(count - 1); }
  };

  const Active = tabs[activeIndex]?.render;

  return (
    <main className={styles.page} aria-labelledby="terms-title">
      <header className={styles.header}>
        <h1 id="terms-title">Terms & Policies</h1>
        <p className={styles.meta}>Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      {/* Top tabs */}
      <div className={styles.tabsWrap}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Terms tabs"
          onKeyDown={onKeyDown}
        >
          {tabs.map((t, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                className={selected ? `${styles.tab} ${styles.isActive}` : styles.tab}
                onClick={() => onSelect(i)}
                type="button"
              >
                {t.label}
              </button>
            );
          })}
          <span
            className={styles.ink}
            style={{
              // simple ink indicator based on active tab position
              transform: `translateX(${activeIndex * 100}%)`,
              width: `${100 / tabs.length}%`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Panel */}
      <section
        role="tabpanel"
        id={`panel-${tabs[activeIndex]?.id}`}
        aria-labelledby={`tab-${tabs[activeIndex]?.id}`}
        className={styles.panel}
      >
        {Active && <Active />}
      </section>
    </main>
  );
}
