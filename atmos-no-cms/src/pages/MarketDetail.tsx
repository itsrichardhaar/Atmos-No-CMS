import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { markets } from "../data/markets";
import "./MarketDetail.css";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }, // stagger by phrase/word-block
};

const wordGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } }, // then stagger chars inside each word
};

const charVar: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_BEZIER } },
};

// ===== Parsing helper =====
// We accept either:
//  - market.name with optional "quoted phrases" to force a line break before them
//  - market.nameWords?: string[] to explicitly define words/phrases; quotes there also force a break
type Token = { phrase: string; breakBefore: boolean };

function buildTokens(name: string, nameWords?: string[]): Token[] {
  // If nameWords provided, treat each item as a word/phrase. Quotes mean “break before”.
  if (nameWords && nameWords.length) {
    return nameWords.map((w, idx) => {
      const hasLeadingQuote = w.startsWith('"') || w.startsWith("'");
      const cleaned = w.replace(/^['"]+|['"]+$/g, "");
      return {
        phrase: cleaned,
        breakBefore: hasLeadingQuote && idx > 0, // force a break before the first quoted item (not at index 0)
      };
    });
  }

  // Otherwise parse `name`:
  // - capture "double-quoted" or 'single-quoted' phrases as blocks
  // - everything else split by whitespace
  const out: Token[] = [];
  const re = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(name))) {
    const quoted = m[1] ?? m[2];
    if (quoted) {
      out.push({ phrase: quoted, breakBefore: out.length > 0 });
    } else if (m[3]) {
      out.push({ phrase: m[3], breakBefore: false });
    }
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

  // Build tokens (words/phrases) once. If you’ve added `nameWords` to your data/type, pass it here.
  // If you haven't changed your type, (market as any).nameWords is fine too.
  const tokens = useMemo(
    () => buildTokens(market.name ?? "", (market as any).nameWords),
    [market.name, (market as any).nameWords]
  );

  return (
    <section className="market market--heroBleed">
      {/* FULL-BLEED HERO */}
      <div className="market__hero">
        <img
          src={heroSrc}
          alt={market.name}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="market__heroInner">
          <div className="market__heroContent">
            {/* Animated H1: wraps by words/phrases, animates by characters.
                Quoted tokens in data force a line break BEFORE that token. */}
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
                    {/* normal space between blocks that DON'T force a break */}
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
        {/* Intro split (image + big headline + body) */}
        {market.intro && (
          <section className="marketIntro">
            <figure className="marketIntro__media">
              <img
                src={market.intro.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
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

        {/* Benefits grid */}
        {market.benefits?.items?.length ? (
          <section className="marketBenefits">
            {market.benefits.title && (
              <h2 className="marketBenefits__title">{market.benefits.title}</h2>
            )}
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
      </div>

      <BuildDisplayCta />
    </section>
  );
}



