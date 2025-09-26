// src/pages/Markets.tsx (index)
import MarketGrid from "../components/MarketGrid/MarketGrid";
import { markets } from "../data/markets";

export default function MarketsPage() {
  return (
    <main>
      <MarketGrid 
      title="" 
      markets={markets} />
    </main>
  );
}
