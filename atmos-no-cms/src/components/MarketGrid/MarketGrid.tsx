// src/components/MarketGrid/MarketGrid.tsx

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Market } from "../../types/market";
import MarketCard from "../MarketCard/MarketCard";
import "./MarketGrid.css";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } }, 
};

const titleChar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_BEZIER },
  },
};

type Props = {
  title?: string;
  subtitle?: string;
  markets: Market[];
};

export default function MarketGrid({ title = "Markets", subtitle, markets }: Props) {
  const titleChars = useMemo(() => Array.from(title), [title]);

  return (
    <section className="mg">
      <div className="container">
        <div className={`mg__header ${subtitle ? "mg__header--withSub" : ""}`}>
      
          <motion.h2
            className="mg__title"
            variants={titleGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            aria-label={title}
          >
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                variants={titleChar}
                style={{ display: "inline-block" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mg__subtitle"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div className="mg__grid" layout>
          {markets.map((m) => (
            <motion.div
              key={m.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0, 1] as const }}
            >
              <MarketCard market={m} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


