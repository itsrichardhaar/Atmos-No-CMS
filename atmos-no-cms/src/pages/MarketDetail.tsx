// src/pages/MarketDetail.tsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { markets } from "../data/markets";
import "./MarketDetail.css";
import BuildDisplayCta from "../components/BuildDisplayCta/BuildDisplayCta";
import Seo from "../seo/Seo";

import largeAMarkUrl from "../../src/assets/icons/large-a.svg";
import smallAMarkUrl from "../../src/assets/icons/small-a.svg";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/** ====== HERO TITLE VARIANTS ====== */
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

/** ====== GENERIC FADE UP ====== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_BEZIER } },
};

/** ====== LTR GRID STAGGER ====== */
const ltrContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const slideInLtr: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

/** ====== INTRO HEADLINE animation ====== **/
const introLineOnly: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: EASE_BEZIER }
  }),
};

/** ====== INTRO BODY animation ====== **/
const bodySentenceVar: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * i, duration: 0.35, ease: EASE_BEZIER }
  }),
};

// ===== Parsing helper for animated H1 =====
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

function splitSentences(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g);
  return parts ? parts.map(s => s.trim()) : [text];
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

  const bodySentences = useMemo(
    () => (market.intro?.body ? splitSentences(market.intro.body) : []),
    [market.intro?.body]
  );

  // ── SEO: dynamic meta + Breadcrumb JSON-LD ───────────────────────────────
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Markets",
        "item": "https://atmos-no-cms.vercel.app/markets"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": market.name,
        "item": `https://atmos-no-cms.vercel.app/markets/${market.slug}`
      }
    ]
  };

  // NEW: Mobile detection — disables only the left→right slide-ins on mobile (≤900px)
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 900px)").matches,
    []
  );

  return (
    <section className="market market--heroBleed">
      <Seo
        title={`${market.name} LED Displays`}
        description={market.blurb}
        path={`/markets/${market.slug}`}
        image={heroSrc}
        type="article"
        jsonLd={breadcrumbLd}
      />

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
              <img
                src={market.intro.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="marketIntro__copy">
              {/* ===== Animated intro headline ===== */}
              <h2
                className="marketIntro__headline"
                aria-label={market.intro.headline.replace(/\n/g, " ")}
              >
                {market.intro.headline
                  .split("\n")
                  .map((line, i, arr) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={introLineOnly}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.6 }}
                      style={{ display: "block", willChange: "transform" }}
                    >
                      {line}
                      {i < arr.length - 1 ? <br /> : null}
                    </motion.span>
                  ))}
              </h2>

              {/* ===== Animated intro body ===== */}
              <p className="marketIntro__body" aria-label={market.intro.body}>
                {bodySentences.map((s, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={bodySentenceVar}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    style={{ display: "inline-block", willChange: "transform" }}
                  >
                    {s}
                    {i < bodySentences.length - 1 ? " " : null}
                  </motion.span>
                ))}
              </p>
            </div>
          </section>
        )}

        {/* Benefits grid */}
        {market.benefits?.items?.length ? (
          <section className="marketBenefits">
            {market.benefits.title && (
              <h2 className="marketBenefits__title">{market.benefits.title}</h2>
            )}

            <motion.ul
              className="marketBenefits__grid"
              role="list"
              {...(isMobile
                ? {}
                : {
                    variants: ltrContainer,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true, amount: 0.85 },
                  })}
            >
              {market.benefits.items.map((b, i) => (
                <motion.li
                  key={i}
                  className="marketBenefits__card"
                  {...(isMobile ? {} : { variants: slideInLtr })}
                >
                  <span className="marketBenefits__thumb">
                    <img src={b.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <h3 className="marketBenefits__h3">{b.title}</h3>
                  <p className="marketBenefits__p">{b.body}</p>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        ) : null}
      </div>

      {/* Use Cases Section */}
      {market.useCases && (
        <section className="marketUseCases">
          <div className="marketUseCases__bg" aria-hidden="true" style={{ zIndex: 0 }}>
            {/* Background "A" */}
            <img
              className="marketUseCases__bgImg"
              src={largeAMarkUrl}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="marketUseCases__inner" style={{ position: "relative", zIndex: 1 }}>
            <div className="marketUseCases__headlineWrap">
              <img
                className="marketUseCases__mark"
                src={smallAMarkUrl}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <motion.h2
                className="marketUseCases__headline"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                {market.useCases.headline}
              </motion.h2>
            </div>

            <motion.ul
              className="marketUseCases__grid"
              role="list"
              {...(isMobile
                ? {}
                : {
                    variants: ltrContainer,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true, amount: 0.85 },
                  })}
            >
              {market.useCases.items.map((it, i) => (
                <motion.li
                  key={i}
                  className="marketUseCases__card"
                  {...(isMobile ? {} : { variants: slideInLtr })}
                >
                  <h3 className="marketUseCases__h3">{it.title}</h3>
                  <p className="marketUseCases__p">{it.body}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      <BuildDisplayCta />
    </section>
  );
}









