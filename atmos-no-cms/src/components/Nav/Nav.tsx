// src/components/Nav.tsx
import { NavLink, Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import useLockBodyScroll from "../../hooks/useLockBodyScroll"
import "./Nav.css"

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock scroll
  useLockBodyScroll(open)

  // Focus first link when opened
  useEffect(() => {
    if (open) setTimeout(() => firstLinkRef.current?.focus(), 0)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "menu__link is-active" : "menu__link"

  return (
    <header className={`nav ${open ? "is-open" : ""}`}>
      <div className="container nav__bar">
        <Link to="/" className="nav__logo" aria-label="Go to home">ATMOS</Link>

        <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}   // toggles open/close
            >
            <span /><span /><span />
        </button>

      </div>

      {/* Backdrop + sliding panel */}
      <div
        id="site-menu"
        className={`menu ${open ? "menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          // click backdrop to close (ignore clicks on the panel)
          if ((e.target as HTMLElement).classList.contains("menu")) setOpen(false)
        }}
      >
        <nav className="menu__panel" aria-label="Primary">
          <NavLink to="/" end className={linkClass} ref={firstLinkRef}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          <div className="menu__cta">
            <a
              className="btn btn--primary"
              href="https://your-shop.myshopify.com"
              target="_blank"
              rel="noreferrer"
            >
              Shop on Shopify ↗
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
