// App.tsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Nav from "./components/Nav/Nav";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";
import { getLenis, destroyLenis } from "./lib/lenis";
import CookieBanner from "./consent/CookieBanner";
import CookieSettingsModal from "./consent/CookieSettingsModal";

export default function App() {
  const location = useLocation();
  const rafRef = useRef<number | null>(null);

  // Set manual restoration once
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
  const lenis = getLenis();

  // If Lenis is disabled on this device, do nothing (native scroll)
  if (!lenis) return;

  const onRaf = (time: number) => {
    lenis?.raf?.(time);
    rafRef.current = requestAnimationFrame(onRaf);
  };
  rafRef.current = requestAnimationFrame(onRaf);

  // Nudge IO after first RAF so in-view checks run even if we're already at top
  requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));

  return () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    destroyLenis();
  };
}, []);

  return (
    <div className="min-h-dvh">
      <Nav />
      <div className="nav-spacer" aria-hidden="true" />
      <CookieBanner />
      <CookieSettingsModal />
      <ScrollToTop />
      <div key={location.key}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}






