// src/data/markets.ts
import type { Market } from "../types/market";

export const markets: Market[] = [
  {
    id: "m1",
    slug: "corporate-events",
    name: "Corporate Events",
    blurb:
      "Transform conferences and keynotes with vivid large-format displays and stage visuals.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/corporate.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/corporate.png",
  },
  {
    id: "m2",
    slug: "house-of-worship",
    name: "House of Worship",
    blurb:
      "From ambient glows to bold stage looks, enhance storytelling and connection.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
  {
    id: "m3",
    slug: "concerts-tours",
    name: "Concerts & Tours",
    blurb:
      "Road-ready systems that survive travel, set fast, and dazzle every show.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
  {
    id: "m4",
    slug: "retail-hospitality",
    name: "Retail & Hospitality",
    blurb:
      "Capture attention with digital canvases for promotions, ambience, and brand moments.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
  {
    id: "m5",
    slug: "virtual-production",
    name: "Virtual Production",
    blurb:
      "LED volumes and backgrounds for immersive in-camera workflows.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
  {
    id: "m6",
    slug: "immersive-productions",
    name: "Immersive Productions",
    blurb:
      "Interactive, experiential environments that react and engage.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
  {
    id: "m7",
    slug: "education-institutions",
    name: "Education & Institutions",
    blurb:
      "Clarity for lectures, assemblies, and presentations across campuses.",
    gridImage: "",
    heroImage: "/assets/markets/education-institutions.jpg",
  },
];
