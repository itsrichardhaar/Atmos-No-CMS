// src/hooks/useLockBodyScroll.ts
import { useLayoutEffect } from "react";

export default function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const { style: rootStyle } = root;
    const { style: bodyStyle } = document.body;

    const prev = {
      rootOverflow: rootStyle.overflow,
      rootPaddingRight: rootStyle.paddingRight,
      rootOverscroll: rootStyle.overscrollBehavior,
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      attr: root.getAttribute("data-nav-open"),
    };

    if (locked) {
      // Prevent layout shift from hidden scrollbar
      const scrollbarW = window.innerWidth - root.clientWidth;
      rootStyle.overflow = "hidden";
      if (scrollbarW > 0) rootStyle.paddingRight = `${scrollbarW}px`;

      // iOS: fix body and store scroll
      const y = window.scrollY;
      bodyStyle.position = "fixed";
      bodyStyle.top = `-${y}px`;
      bodyStyle.width = "100%";

      // Stop scroll chaining / bounce
      rootStyle.overscrollBehavior = "none";

      // Useful global flag (CSS hooks, etc.)
      root.setAttribute("data-nav-open", "true");

      return () => {
        rootStyle.overflow = prev.rootOverflow;
        rootStyle.paddingRight = prev.rootPaddingRight;
        rootStyle.overscrollBehavior = prev.rootOverscroll;
        root.setAttribute("data-nav-open", prev.attr ?? "");

        const restoreY = Math.abs(parseInt(bodyStyle.top || "0", 10));
        bodyStyle.position = prev.bodyPosition;
        bodyStyle.top = prev.bodyTop;
        bodyStyle.width = prev.bodyWidth;
        // restore scroll
        window.scrollTo(0, restoreY);
      };
    }
  }, [locked]);
}

