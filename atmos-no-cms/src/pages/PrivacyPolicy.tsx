import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PrivacyPolicy.module.css";
import CookieSettingsLink from "../consent/CookieSettingsLink";


function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .replace("px", "");
  return (Number(raw) || 72) + 12; 
}


function useScrollSpyStable(ids: string[], options?: { hysteresisPx?: number }) {
  const [active, setActive] = useState<string | null>(null);
  const positionsRef = useRef<{ id: string; top: number; bottom: number }[]>([]);
  const lastIdRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);

  const hysteresisPx = options?.hysteresisPx ?? 24;

  const measure = useCallback(() => {
    const headerOffset = getHeaderOffset();
    positionsRef.current = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - headerOffset;
        const bottom = top + el.offsetHeight;
        return { id, top, bottom };
      })
      .filter((v): v is { id: string; top: number; bottom: number } => !!v)
      .sort((a, b) => a.top - b.top);
  }, [ids]);

  const tick = useCallback(() => {
    const pos = window.scrollY;
    const list = positionsRef.current;
    if (!list.length) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const targetY = pos; 

    let current = list[0].id;
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (targetY >= s.top && targetY < s.bottom) {
        current = s.id;
        break;
      }
      if (targetY >= s.top) current = s.id;
    }

    if (lastIdRef.current && lastIdRef.current !== current) {
      const prev = list.find((x) => x.id === lastIdRef.current)!;
      if (prev) {
        const nearPrevTop = Math.abs(targetY - prev.top) <= hysteresisPx;
        const nearPrevBottom = Math.abs(targetY - prev.bottom) <= hysteresisPx;
        if (nearPrevTop || nearPrevBottom) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      }
    }

    if (lastIdRef.current !== current) {
      lastIdRef.current = current;
      setActive(current);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [hysteresisPx]);

  useEffect(() => {
    measure();
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      measure();
      lastIdRef.current = null;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const onLoad = () => { onResize(); };
    window.addEventListener("load", onLoad);


    const onHash = () => { onResize(); };
    window.addEventListener("hashchange", onHash);

 
    const content = document.querySelector("[class*='sections']") || document.body;
    const ro = new ResizeObserver(() => onResize());
    try { ro.observe(content as Element); } catch {}

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("hashchange", onHash);
      try { ro.disconnect(); } catch {}
    };
  }, [measure, tick]);

  return active;
}


function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const headerH =
    Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h")
        .replace("px", "")
    ) || 72;

  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
  window.scrollTo({ top: y, behavior: "smooth" });

  history.replaceState(null, "", `#${id}`);
}

export default function PrivacyPolicy() {
  const location = useLocation();
  const topRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(
    () => [
      {
        id: "introduction",
        title: "Introduction",
        body: (
          <>
            <p>
              This Privacy Policy explains how Atmos LED (“we”, “us”, “our”) collects, uses, and protects your information when you use our websites, products, and services.
            </p>
            <p>
              By using our services, you agree to the practices described below. If you do not agree, please do not use our services.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        body: (
          <>
            <h4>Information you provide to us</h4>
            <ul>
              <li>Account and contact details (name, email, phone).</li>
              <li>Support communications and form submissions.</li>
              <li>Order and billing information when you purchase.</li>
            </ul>
            <h4>Information collected automatically</h4>
            <ul>
              <li>Device and browser data, IP address, approximate location.</li>
              <li>Usage analytics and event logs.</li>
              <li>Cookies and similar technologies (see Cookie Policy).</li>
            </ul>
          </>
        ),
      },
      {
        id: "how-we-use-information",
        title: "How We Use Information",
        body: (
          <ul>
            <li>Provide, operate, and improve our products and services.</li>
            <li>Personalize content, measure performance, and run analytics.</li>
            <li>Process orders, payments, and customer support requests.</li>
            <li>Detect, prevent, and respond to fraud, abuse, or security incidents.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        ),
      },
      {
        id: "cookies",
        title: "Cookies & Similar Technologies",
        body: (
            <p>
                We use cookies to operate our site (strictly necessary) and, with your consent, to enable analytics and marketing.
                Manage your choices anytime via{" "}
                <CookieSettingsLink className={styles.inlineBtn}>Cookie Preferences</CookieSettingsLink>.
                See our Cookie Policy for details.
            </p>
            ),
      },
      {
        id: "sharing",
        title: "How We Share Information",
        body: (
          <ul>
            <li>Service providers acting on our behalf (e.g., hosting, analytics, payment processing).</li>
            <li>Business transfers in connection with mergers, acquisitions, or asset sales.</li>
            <li>Legal reasons: compliance with law, protection of rights and safety.</li>
          </ul>
        ),
      },
      {
        id: "your-choices",
        title: "Your Choices & Rights",
        body: (
        <>
            <p>
            Depending on your location, you may have rights to access, correct, delete, or export your data, and to object to or restrict certain processing.
            </p>
            <p>
            For cookie choices, open{" "}
            <CookieSettingsLink className={styles.inlineBtn}>Cookie Preferences</CookieSettingsLink>.
            </p>
            <p>To exercise other rights, contact support@atmosled.com.</p>
        </>
        ),
      },
      {
        id: "data-security",
        title: "Data Security & Retention",
        body: (
          <p>
            We implement technical and organizational measures to protect your information. We retain data only as long as necessary for the purposes described or as required by law.
          </p>
        ),
      },
      {
        id: "international",
        title: "International Transfers",
        body: (
          <p>
            We may transfer, store, and process your information outside of your country. Where required, we use appropriate safeguards such as standard contractual clauses.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Changes to this Policy",
        body: (
          <p>
            We may update this Policy from time to time. When we make changes, we will revise the “Last updated” date below and take additional steps if required by law.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contact Us",
        body: (
          <p>
            Questions? Email <a href="mailto:support@atmosled.com">support@atmosled.com</a>.
          </p>
        ),
      },
    ],
    []
  );

  const ids = sections.map((s) => s.id);
  const activeId = useScrollSpyStable(ids);

  // If user lands on a hash, scroll to it with offset
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => scrollToId(id));
    } else {
      topRef.current?.focus();
    }
  }, [location.hash]);

  // Optional: allow global “open-cookie-settings” to open your modal via context
  // If you want, wire this to your ConsentProvider (see note below in tips).

  return (
    <main className={styles.page} aria-labelledby="privacy-title">
      <div tabIndex={-1} ref={topRef} />
      <div className={styles.layout}>
        {/* Left rail (sticky nav) */}
        <aside className={styles.rail} aria-label="On this page">
          <div className={styles.railInner}>
            <h2 className={styles.railTitle}>Privacy Policy</h2>
            <nav>
              <ul className={styles.toc}>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={
                        activeId === s.id ? `${styles.tocLink} ${styles.isActive}` : styles.tocLink
                      }
                      aria-current={activeId === s.id ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(s.id);
                      }}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <section className={styles.content}>
          <header className={styles.header}>
            <h1 id="privacy-title">Privacy Policy</h1>
            <p className={styles.meta}>Last updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className={styles.sections}>
            {sections.map((s) => (
              <article key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className={styles.sectionTitle}>
                  {s.title}
                </h2>
                <div className={styles.sectionBody}>{s.body}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
