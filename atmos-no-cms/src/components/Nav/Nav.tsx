// src/components/Nav/Nav.tsx
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import HamburgerButton from "../HamburgerButton/Hamburger";
import logo from "/assets/logos/Company Logo.png";
import "./Nav.css";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [armed, setArmed] = useState(false); 
  const location = useLocation();

  
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

 
  const getY = () =>
    window.scrollY ||
    document.documentElement.scrollTop ||
    (document.body as HTMLElement).scrollTop ||
    0;

  const isAtTop = () => getY() <= 2;


  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useLockBodyScroll(open);

  
  useEffect(() => {
    setArmed(false);
    
    setSolid(false);
    const t = requestAnimationFrame(() => {
      setSolid(!isAtTop() /* becomes solid if page loads scrolled */);
    });
    return () => cancelAnimationFrame(t);
  }, [location.pathname]);


  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const active = document.querySelector<HTMLAnchorElement>(".menu__link.is-active");
      if (active) active.focus();
      else menuPanelRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [open]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

 
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = getY();
        if (!armed) {
          if (y > 2) setArmed(true); 
          setSolid(y > 2 ? true : false); 
        } else {
          setSolid(y > 2);
        }
        ticking = false;
      });
    };

   
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [armed]); 

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "menu__link is-active" : "menu__link";

  const EASE = [0.22, 1, 0.36, 1] as const;
  const listGroup: Variants = { hidden: {}, visible: {} };
  const linkRow: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: EASE, delay: 0.08 + i * 0.16, when: "beforeChildren" },
    }),
  };
  const baselineGroup: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.25, ease: EASE, when: "beforeChildren" } },
  };
  const makeLabelGroup = (charStagger = 0.1, delayChildren = 0.06): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: charStagger, delayChildren } },
  });
  const labelChar: Variants = {
    hidden: { opacity: 0, y: "1em", scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: EASE } },
  };

  const AnimatedLabel = ({ text, delay = 0.06, stagger = 0.1 }: { text: string; delay?: number; stagger?: number }) => {
    const chars = useMemo(() => Array.from(text), [text]);
    return (
      <motion.span className="menu__linkBaselineWrap" variants={baselineGroup} style={{ display: "inline-block", willChange: "clip-path" }}>
        <motion.span
          key={open ? "open" : "closed"}
          className="menu__linkLabel"
          variants={makeLabelGroup(stagger, delay)}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          aria-hidden="true"
          style={{ display: "inline-block" }}
        >
          {chars.map((ch, i) => (
            <motion.span key={i} variants={labelChar} style={{ display: "inline-block", transformOrigin: "bottom" }}>
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    );
  };

  return (
    <header className={`nav ${open ? "is-open" : ""} ${solid ? "is-solid" : "is-transparent"}`}>
      <div className="container nav__bar">
        <Link to="/" className="nav__logo" aria-label="Go to home">
          <img src={logo} alt="ATMOS LED" className="nav__logo-img" />
        </Link>

        <div className="nav__actions">
          <a href="https://dfuc15-ke.myshopify.com" className="nav__storeBtn" target="_blank" rel="noreferrer" aria-label="Open the store in a new tab">
            <svg className="nav__storeIcon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 7h11a1 1 0 0 1 .99 1.1l-1.06 9.4A2 2 0 0 1 15.46 20H8.54a2 2 0 0 1-1.97-1.5L5.5 8.1A1 1 0 0 1 6.5 7Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.2 7a3.8 3.8 0 0 1 7.6 0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="nav__storeLabel">Store</span>
          </a>

          <HamburgerButton isOpen={open} onToggle={() => setOpen((o) => !o)} className="site-hamburger" />
        </div>
      </div>

      <div
        id="site-menu"
        className={`menu ${open ? "menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains("menu")) setOpen(false);
        }}
      >
        <nav className="menu__panel" aria-label="Primary">
          <div className="menu__content container" ref={menuPanelRef} tabIndex={-1}>
            <Link to="/" className="mobile__logo" aria-label="Go to home"></Link>

            <motion.div className="menu__linksWrap" variants={listGroup} initial="hidden" animate={open ? "visible" : "hidden"}>
              <div className="menu__links">
                <motion.div variants={linkRow} custom={0} className="menu__linkWrapper">
                  <NavLink to="/about" end className={linkClass} ref={firstLinkRef} aria-label="About">
                    <span className="menu__linkRow"><AnimatedLabel text="About" /></span>
                  </NavLink>
                </motion.div>

                <motion.div variants={linkRow} custom={1} className="menu__linkWrapper">
                  <NavLink to="/products" end className={linkClass} aria-label="Products">
                    <span className="menu__linkRow"><AnimatedLabel text="Products" /></span>
                  </NavLink>
                </motion.div>

                <motion.div variants={linkRow} custom={2} className="menu__linkWrapper">
                  <NavLink to="/markets" end className={linkClass} aria-label="Markets">
                    <span className="menu__linkRow"><AnimatedLabel text="Markets" /></span>
                  </NavLink>
                </motion.div>

                <motion.div variants={linkRow} custom={3} className="menu__linkWrapper">
                  <NavLink to="/contact" end className={linkClass} aria-label="Contact">
                    <span className="menu__linkRow"><AnimatedLabel text="Contact" /></span>
                  </NavLink>
                </motion.div>

                <motion.div variants={linkRow} custom={4} className="menu__linkWrapper">
                  <a href="https://mapoutcreative.com/calculator/" className="menu__link" target="_blank" rel="noreferrer" aria-label="Calculator">
                    <span className="menu__linkRow"><AnimatedLabel text="Calculator" /></span>
                  </a>
                </motion.div>

                <motion.div variants={linkRow} custom={5} className="menu__linkWrapper">
                  <a href="https://dfuc15-ke.myshopify.com" className="menu__link" target="_blank" rel="noreferrer" aria-label="Store">
                    <span className="menu__linkRow"><AnimatedLabel text="Store" /></span>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <div className="menu__meta">
              <a className="meta__row" href="tel:+18332866728">
                <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.62-3.07 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h2a2 2 0 0 1 2 1.72c.12.86.33 1.69.62 2.49a2 2 0 0 1-.45 2.11L8.09 9.49a16.9 16.9 0 0 0 6.42 6.42l1.17-1.16a2 2 0 0 1 2.11-.45c.8.29 1.63.5 2.49.62A2 2 0 0 1 22 16.92Z"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>(833) 286-6728</span>
              </a>

              <a className="meta__row" href="mailto:support@atmosled.co">
                <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"
                    fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>support@atmosled.co</span>
              </a>

              <div className="menu__social" aria-label="Social media">
                <a className="social__link" href="https://www.linkedin.com/company/atmosled" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.06h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 5.99 3.33 5.99 7.65V24h-5v-6.58c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.54 1.72-2.54 3.48V24h-5V8.98z"/>
                </svg>
                </a>
                <a className="social__link" href="https://facebook.com/atmosled" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12a10 10 0 10-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0022 12z"/>
                  </svg>
                </a>
                <a className="social__link" href="https://instagram.com/atmosled" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 00-5-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-2.25a1 1 0 110 2 1 1 0 010-2z"/>
                  </svg>
                </a>
                <a className="social__link" href="https://youtube.com/@atmosled" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.5 7.2a3 3 0 00-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6A3 3 0 00.5 7.2C0 9 0 12 0 12s0 3 .5 4.8a3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1C24 15 24 12 24 12s0-3-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                </a>
                <span className="menu__social-label">Get Connected</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}







