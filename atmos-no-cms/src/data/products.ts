import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "element",
    name: "Element",
    series: "Series",
    tagline: "Efficient. Accurate. Versatile.",
    startingFrom: 555,
    image: "/assets/products/element.jpg",
    categories: ["Indoor Performance", "Compact & Versatile"],
    specs: ["P1.2 • P1.5 • P1.8", "600–1200 nits", "HDR ready"],
    description:
      "Element Series delivers accurate color and flexible configurations for retail and corporate environments.",
    shopUrl: "https://your-shop.myshopify.com/products/element"
  },
  {
    id: "p2",
    slug: "kiosk",
    name: "Kiosk",
    series: "Series",
    tagline: "Modular kiosk-ready panels.",
    startingFrom: 555,
    image: "/assets/products/kiosk.jpg",
    categories: ["Indoor Performance", "Compact & Versatile"],
    specs: ["P1.9 • P2.5 • P3.9", "Tool-less access", "Front service"],
    shopUrl: "https://your-shop.myshopify.com/products/kiosk"
  },
  // …add the rest (Phantom, Stratos, Trek, Vision, Vivid, Vue)
];
