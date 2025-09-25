// App.tsx
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer";

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-dvh">
      <Nav />
      <div className="nav-spacer" aria-hidden="true" />
      <ScrollToTop />

      {/* Force unmount/mount of the route subtree on every nav */}
      <div key={location.key}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}




