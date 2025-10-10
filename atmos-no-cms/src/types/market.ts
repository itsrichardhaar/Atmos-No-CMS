// src/types/market.ts

export type MarketBenefit = {
  image: string;          
  title: string;
  body: string;
};

export type Market = {
  id: string;
  slug: string;              
  name: string;     
  nameWords?: string[];        
  blurb: string;             
  gridImage?: string;         
  heroImage?: string;        
  
  intro?: {
    image: string;        
    headline: string;     
    body: string;
  };

  benefits?: {
    title?: string;       
    items: MarketBenefit[];
  };
};