import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Nav from "./components/Nav/Nav"
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-dvh">
      <Nav />
      <div className="nav-spacer" aria-hidden="true" />

      {/* Ensure we reset scroll on route change */}
      <ScrollToTop />

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
      <Footer />
    </div>
  );
}



