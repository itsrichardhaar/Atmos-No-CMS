// src/types/market.ts

export type MarketBenefit = {
  image: string;          
  title: string;
  body: string;
};

export type MarketUseCaseItem = {
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

  useCases?: {
    headline: string;
    items: MarketUseCaseItem[];
  };

  benefits?: {
    title?: string;       
    items: MarketBenefit[];
  };
};