import { Link, NavLink } from "react-router-dom"

const link = "px-3 py-2"
const active = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${link} underline` : link

export default function Nav() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link to="/" className="font-semibold">MySite</Link>
      <nav className="flex gap-3">
        <NavLink to="/" end className={active}>Home</NavLink>
        <NavLink to="/about" className={active}>About</NavLink>
        <NavLink to="/work" className={active}>Work</NavLink>
        <NavLink to="/contact" className={active}>Contact</NavLink>
      </nav>
    </header>
  )
}
