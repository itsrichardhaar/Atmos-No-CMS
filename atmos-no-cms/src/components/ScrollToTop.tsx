import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on pathname change. Preserves hash (#anchor) jumps. */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // If navigating to /page#id, honor the anchor
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: "auto", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, key, hash]);

  return null;
}

