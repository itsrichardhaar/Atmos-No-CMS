import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); 

  useEffect(() => {
    if (navType === "POP") return;

    if (hash) {
      requestAnimationFrame(() => {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: "start", inline: "nearest" });
      });
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scroller =
      document.scrollingElement || document.documentElement; 

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });
  }, [pathname, hash, navType]);

  return null;
}


