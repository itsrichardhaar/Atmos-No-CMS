// src/pages/Markets.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import MarketGrid from "../components/MarketGrid/MarketGrid";
import { markets } from "../data/markets";
import "./Markets.css";
import Unmatched from "../components/UnmatchedCta/Unmatched";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";
import { Features } from "../data/features";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";

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

export default function MarketsPage() {
  const title = "Our Markets";
  const titleChars = useMemo(() => Array.from(title), [title]);

  return (
    <main className="markets">
      {/* Top header area with dots */}
      <section className="markets__hero" aria-labelledby="markets-heading">
        <div className="container">
          <div className="markets-top">
            <motion.h1
              id="markets-heading"
              className="markets__title"
              variants={titleGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              aria-label={title}
            >
              {titleChars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={titleChar}
                  className="markets__titleChar"
                  style={{ display: "inline-block" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>

            <p className="markets__sub">
              Solutions designed for every industry and environment.
            </p>
          </div>
        </div>
      </section>

      <MarketGrid title="" markets={markets} />
      <Unmatched />
      <img className="market__arrow" src="/assets/images/Arrow.svg" alt="" aria-hidden="true" />
      <FeatureGrid title="Why Atmos LED" items={Features} columns={3} />
      <BuildDisplayCta />
    </main>
  );
}

