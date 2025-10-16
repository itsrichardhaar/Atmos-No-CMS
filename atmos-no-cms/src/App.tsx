import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Nav from "./components/Nav/Nav";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";
import { getLenis, destroyLenis } from "./lib/lenis";

export default function App() {
  const location = useLocation();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = getLenis();

    // Keep your existing scroll listeners working:
    // Lenis still updates window scroll and fires 'scroll' events.
    const onRaf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(onRaf);
    };
    rafRef.current = requestAnimationFrame(onRaf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      destroyLenis();
    };
  }, []);

  return (
    <div className="min-h-dvh">
      <Nav />
      <div className="nav-spacer" aria-hidden="true" />
      <ScrollToTop />
      <div key={location.key}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}





