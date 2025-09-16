import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Markets from "./pages/Markets"
import Shop from "./pages/Shop"
import Calculator from "./pages/Calculator"
import NotFound from "./pages/NotFound"
import "./App.css"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "contact", element: <Contact /> },
      { path: "markets", element: <Markets /> },
      { path: "calculator", element: <Calculator /> },
      { path: "shop", element: <Shop /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

