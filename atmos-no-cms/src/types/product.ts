// src/types/product.ts

export type ProductCategory =
  | "Indoor Performance"
  | "Outdoor & Weatherproof"
  | "Creative & Immersive"
  | "Compact & Versatile";

export type ProductUses = {
  heading: string;
  body: string;
};

export type FeatureItem = {
  icon?: string;
  title: string;
  body: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  series?: string;
  tagline?: string;
  startingFrom?: number;
  image?: string;
  categories: ProductCategory[];
  specs: string[];
  description?: string;
  shopUrl?: string;
  glowColor?: string;
  useTitle?: string;
  productUses?: ProductUses[];
  features?: FeatureItem[];
  specSheetUrl?: string; 
};

