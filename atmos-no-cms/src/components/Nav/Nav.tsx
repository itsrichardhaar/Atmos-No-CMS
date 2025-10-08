// src/components/Nav.tsx
import { NavLink, Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import useLockBodyScroll from "../../hooks/useLockBodyScroll"
import HamburgerButton from "../HamburgerButton/Hamburger"
import logo from "/assets/logos/Company Logo.png"
import "./Nav.css"

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)             // NEW
  const location = useLocation()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => { setOpen(false) }, [location.pathname])
  useLockBodyScroll(open)

  useEffect(() => { if (open) setTimeout(() => firstLinkRef.current?.focus(), 0) }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // —— solid background once we’ve scrolled a bit
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10)
    onScroll() // set initial state on load
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "menu__link is-active" : "menu__link"

  return (
    <header className={`nav ${open ? "is-open" : ""} ${solid ? "is-solid" : "is-transparent"}`}>
      <div className="container nav__bar">
        <Link to="/" className="nav__logo" aria-label="Go to home">
          <img src={logo} alt="ATMOS LED" className="nav__logo-img" />
        </Link>

        <HamburgerButton
          isOpen={open}
          onToggle={() => setOpen(o => !o)}
          className="site-hamburger"
        />
      </div>

      <div
        id="site-menu"
        className={`menu ${open ? "menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains("menu")) setOpen(false)
        }}
      >
        {/* decorative sweeps */}
        <div className="menu__prelayers" aria-hidden="true">
          <span className="menu__prelayer" data-i="1" />
          <span className="menu__prelayer" data-i="2" />
          <span className="menu__prelayer" data-i="3" />
        </div>

        <nav className="menu__panel" aria-label="Primary">
          {/* NEW: inner container aligned with desktop header */}
          <div className="menu__content container">
            {/* top row: mobile logo, aligned to container gutter */}
            <Link to="/" className="mobile__logo" aria-label="Go to home">
              <img src={logo} alt="ATMOS LED" className="nav__logo-img" />
            </Link>

            {/* middle row: links, vertically centered between logo + meta */}
            <div className="menu__links">
              <NavLink to="/about" className={linkClass} ref={firstLinkRef}>About</NavLink>
              <NavLink to="/products" className={linkClass}>Products</NavLink>
              <NavLink to="/markets" className={linkClass}>Markets</NavLink>
              <NavLink to="/contact" className={linkClass}>Contact</NavLink>
              <NavLink to="https://mapoutcreative.com/atmosled/" className={linkClass} target="_blank">Calculator</NavLink>
              <NavLink to="https://dfuc15-ke.myshopify.com" className={linkClass} target="_blank">Shop</NavLink>
            </div>

            {/* bottom row: meta */}
            <div className="menu__meta">
              {/* phone */}
              <a className="meta__row" href="tel:+18332866728">
                <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.62-3.07 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h2a2 2 0 0 1 2 1.72c.12.86.33 1.69.62 2.49a2 2 0 0 1-.45 2.11L8.09 9.49a16.9 16.9 0 0 0 6.42 6.42l1.17-1.16a2 2 0 0 1 2.11-.45c.8.29 1.63.5 2.49.62A2 2 0 0 1 22 16.92Z"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>(833) 286-6728</span>
              </a>

              {/* email */}
              <a className="meta__row" href="mailto:support@atmosled.co">
                <svg className="meta__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"
                    fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>support@atmosled.co</span>
              </a>

            {/* Socials */}
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
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-2.25a1 1 0 110 2 1 1 0 010-2z"/>
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
  )
}
