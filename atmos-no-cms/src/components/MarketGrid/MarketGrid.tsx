// src/components/MarketGrid/MarketGrid.tsx
import { motion } from "framer-motion";
import type { Market } from "../../types/market";
import MarketCard from "../MarketCard/MarketCard";
import "./MarketGrid.css";

export default function MarketGrid({ title = "Markets", markets }: { title?: string; markets: Market[] }) {
  return (
    <section className="mg">
      <div className="container">
        <div className="mg__header">
          <h2 className="mg__title">{title}</h2>
        </div>

        <motion.div className="mg__grid" layout>
          {markets.map((m) => (
            <motion.div
              key={m.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0, 1] }}
            >
              <MarketCard market={m} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
