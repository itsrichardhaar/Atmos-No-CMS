// src/pages/MarketDetail.tsx
import { useParams, Link } from "react-router-dom";
import { markets } from "../data/markets";
import "./MarketDetail.css";

export default function MarketDetail() {
  const { slug } = useParams();
  const market = markets.find(m => m.slug === slug);

  if (!market) {
    return (
      <section className="market">
        <div className="container">
          <p style={{ color: "#fff" }}>Market not found.</p>
          <Link className="btn btn--primary" to="/markets">Back to Markets</Link>
        </div>
      </section>
    );
  }

  const heroSrc = market.heroImage;

  return (
    <section
      className="market market--heroBleed"
    >
      {/* FULL-BLEED HERO */}
      <div className="market__hero">
        <img src={heroSrc} alt={market.name} loading="eager" decoding="async" fetchPriority="high" />
        <div className="market__heroInner">
          <div className="market__heroContent">
            <h1 className="market__title">{market.name}</h1>
            {market.blurb && <p className="market__blurb">{market.blurb}</p>}
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
    </section>
  );
}

