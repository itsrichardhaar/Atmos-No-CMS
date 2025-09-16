import { Outlet, Link, useLocation } from "react-router"
import { AnimatePresence, motion } from "framer-motion"

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-dvh">
      <nav className="p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
