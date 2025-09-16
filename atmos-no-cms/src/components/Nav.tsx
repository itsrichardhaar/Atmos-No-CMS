// src/components/Nav.tsx
import { Link, NavLink } from "react-router-dom"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link"

export default function Nav() {
  return (
    <header className="nav-header">
      <div className="container nav-inner">
        <Link to="/" className="logo">Atmos LED</Link>
        <nav className="nav-links">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

