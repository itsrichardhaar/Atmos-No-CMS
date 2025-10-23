import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Markets from "./pages/Markets"
import Shop from "./pages/Shop"
import Calculator from "./pages/Calculator"
import NotFound from "./pages/NotFound"
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MarketDetail from "./pages/MarketDetail"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Terms from "./pages/Terms"
import "./App.css"
import { ConsentProvider } from "./consent/ConsentContext";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <ProductsPage /> },
      { path: "contact", element: <Contact /> },
      { path: "markets", element: <Markets /> },
      { path: "calculator", element: <Calculator /> },
      { path: "shop", element: <Shop /> },
      { path: "products/:slug", element: <ProductDetail /> },
      { path: "markets/:slug", element: <MarketDetail /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConsentProvider>
    <RouterProvider router={router} />
    </ConsentProvider>
  </React.StrictMode>
)

