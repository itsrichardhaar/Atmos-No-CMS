import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { markets } from "../data/markets";
import "./MarketDetail.css";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";

/** SVG assets */
import largeAMarkUrl from "../assets/marks/large-a.svg";   // update paths if needed
import smallAMarkUrl from "../assets/marks/small-a.svg";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/** Hero title animation */
const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};
const charVar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_BEZIER } },
};

/** UseCases animation */
const usecasesContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_BEZIER } },
};

// ===== helper for animated H1 =====
type Token = { phrase: string; breakBefore: boolean };
function buildTokens(name: string, nameWords?: string[]): Token[] {
  if (nameWords && nameWords.length) {
    return nameWords.map((w, idx) => {
      const hasLeadingQuote = w.startsWith('"') || w.startsWith("'");
      const cleaned = w.replace(/^['"]+|['"]+$/g, "");
      return { phrase: cleaned, breakBefore: hasLeadingQuote && idx > 0 };
    });
  }
  const out: Token[] = [];
  const re = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(name))) {
    const quoted = m[1] ?? m[2];
    if (quoted) out.push({ phrase: quoted, breakBefore: out.length > 0 });
    else if (m[3]) out.push({ phrase: m[3], breakBefore: false });
  }
  return out.length ? out : [{ phrase: name, breakBefore: false }];
}

export default function MarketDetail() {
  const { slug } = useParams();
  const market = markets.find((m) => m.slug === slug);

  if (!market) {
    return (
      <section className="market">
        <div className="container">
          <p style={{ color: "#fff" }}>Market not found.</p>
          <Link className="btn btn--primary" to="/markets">
            Back to Markets
          </Link>
        </div>
      </section>
    );
  }

  const heroSrc = market.heroImage;

  const tokens = useMemo(
    () => buildTokens(market.name ?? "", (market as any).nameWords),
    [market.name, (market as any).nameWords]
  );

  return (
    <section className="market market--heroBleed">
      {/* HERO */}
      <div className="market__hero">
        <img src={heroSrc} alt={market.name} loading="eager" decoding="async" fetchPriority="high" />
        <div className="market__heroInner">
          <div className="market__heroContent">
            <motion.h1
              className="market__title"
              variants={titleGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              aria-label={market.name}
            >
              {tokens.map((tok, ti) => {
                const words = tok.phrase.split(/\s+/).filter(Boolean);
                return (
                  <span key={`blk-${ti}`} style={{ display: "inline" }}>
                    {tok.breakBefore && <br />}
                    {words.map((w, wi) => {
                      const chars = Array.from(w);
                      return (
                        <motion.span
                          key={`w-${ti}-${wi}`}
                          className="market__titleWord"
                          variants={wordGroup}
                          style={{ display: "inline-block" }}
                        >
                          {chars.map((ch, ci) => (
                            <motion.span
                              key={`c-${ti}-${wi}-${ci}`}
                              className="market__titleChar"
                              variants={charVar}
                              style={{ display: "inline-block" }}
                            >
                              {ch}
                            </motion.span>
                          ))}
                          {wi < words.length - 1 ? " " : null}
                        </motion.span>
                      );
                    })}
                    {ti < tokens.length - 1 && !tokens[ti + 1].breakBefore ? " " : null}
                  </span>
                );
              })}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container market__wrap">
        {/* Intro split */}
        {market.intro && (
          <section className="marketIntro">
            <figure className="marketIntro__media">
              <img src={market.intro.image} alt="" loading="lazy" decoding="async" />
            </figure>
            <div className="marketIntro__copy">
              <h2 className="marketIntro__headline">
                {market.intro.headline.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <p className="marketIntro__body">{market.intro.body}</p>
            </div>
          </section>
        )}

        {/* Benefits (kept where it was) */}
        {market.benefits?.items?.length ? (
          <section className="marketBenefits">
            {market.benefits.title && <h2 className="marketBenefits__title">{market.benefits.title}</h2>}
            <ul className="marketBenefits__grid" role="list">
              {market.benefits.items.map((b, i) => (
                <li key={i} className="marketBenefits__card">
                  <span className="marketBenefits__thumb">
                    <img src={b.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <h3 className="marketBenefits__h3">{b.title}</h3>
                  <p className="marketBenefits__p">{b.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* === NEW ORDER: UseCases AFTER Benefits, BEFORE CTA === */}
        {market.useCases && (
          <section className="marketUseCases">
            {/* Large background “A” that bleeds upward behind Benefits */}
            <div className="marketUseCases__bg" aria-hidden="true">
              <img
                className="marketUseCases__bgImg"
                src={largeAMarkUrl}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <motion.div
              className="marketUseCases__inner"
              variants={usecasesContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="marketUseCases__headlineWrap">
                <img
                  className="marketUseCases__mark"
                  src={smallAMarkUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <motion.h2 className="marketUseCases__headline" variants={fadeUp}>
                  {market.useCases.headline}
                </motion.h2>
              </div>

              <ul className="marketUseCases__grid" role="list">
                {market.useCases.items.map((it, i) => (
                  <motion.li key={i} className="marketUseCases__card" variants={fadeUp}>
                    <h3 className="marketUseCases__h3">{it.title}</h3>
                    <p className="marketUseCases__p">{it.body}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </section>
        )}
      </div>

      {/* CTA stays last */}
      <BuildDisplayCta />
    </section>
  );
}





