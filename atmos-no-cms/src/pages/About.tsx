// src/pages/About.tsx
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css";
import "./MarketDetail.css";

const heroImage =
  "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/about/About-main.png";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/* -----------------------------
   Keep H1 animation EXACTLY as-is
----------------------------- */
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

/* -----------------------------
   Reused ProductGrid-style motions
----------------------------- */
const filterGroup: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const filterItem: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_BEZIER },
  },
};

const intro = {
  image: "/assets/about/about-intro.jpg",
  headline: "Who We Are",
  body: [
    "At Atmos LED, we bring clarity to a fast-moving industry by redefining what it means to deliver professional-grade visual technology. Founded by Connor Young, a seasoned audiovisual expert with more than a decade of experience in large-format audio system design and integration, Atmos LED was built to simplify and strengthen the way LED systems are sourced and deployed.",
    "After years of working with houses of worship, concert venues, and live productions—and running his own AV integration company—Connor saw firsthand how fragmented and unpredictable the LED process could be. Atmos LED was created to change that.",
    "Rather than simply supplying LED panels, we act as strategic partners—collaborating closely with dealers and integrators to understand the unique demands of each venue, timeline, and budget. With a consultative approach and thousands of panels stocked in the U.S., we help our partners move faster, plan smarter, and deliver with confidence. In a market often defined by delays and compromises, we offer something different: speed, consistency, and trusted support from people who understand the work firsthand.",
  ],
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What makes Atmos LED panels different from other LED brands?",
    a: "Atmos LED combines high-performance engineering with U.S.-based support and a trusted warranty. Our panels are designed for vivid visuals, energy efficiency, and long-term durability. Unlike many providers, we maintain in-stock inventory strategically in the U.S., so projects stay on schedule. Whether you need indoor, outdoor, or specialty solutions, Atmos products are built to deliver consistent, reliable performance in real-world environments.",
  },
  {
    q: "How do I know which Atmos LED series is right for my project?",
    a: "Choosing the right panel depends on your application. For close-viewing indoor setups like retail, corporate, or broadcast, our Vision, Vivid, and Vue Series provide ultra-fine pixel pitches and seamless integration. For outdoor and high-brightness needs, the Element and Stratos Series deliver weatherproof durability and visibility in direct sunlight. Creative applications like interactive floors (Trek Series) or transparent panels (Phantom Series) support immersive environments, while the Kiosk Series offers slim, mobile-ready digital signage. Our team can help match the right series to your goals.",
  },
  {
    q: "Are Atmos LED panels easy to install and maintain?",
    a: "Yes. Atmos LED panels are designed with installation in mind, featuring lightweight frames, tool-free magnetic modules, and front or rear service options. Many models allow for fast setup and easy maintenance without disrupting your space. Whether for temporary events or permanent installations, our systems reduce downtime and streamline long-term upkeep.",
  },
  {
    q: "Can Atmos LED displays handle outdoor conditions?",
    a: "Absolutely. Our Element and Stratos Series are IP-rated and built to withstand rain, heat, cold, and even direct sunlight. With brightness levels up to 10,000 nits, these panels ensure brilliant visibility in any weather. They’re ideal for stadiums, large signage, and architectural displays where reliability and clarity are essential year-round.",
  },
  {
    q: "What kind of technical support does Atmos provide?",
    a: "Every Atmos LED system comes with U.S.-based technical support from our expert team. For dealer-sold systems, we work directly with partners to ensure smooth integration, fast issue resolution, and long-term reliability. Support doesn’t end after installation—we’re committed to standing behind every panel we ship.",
  },
];

export default function About() {
  const reduce = useReducedMotion();
  const title = "About Us";
  const titleChars = useMemo(() => Array.from(title), [title]);

  const motionProps = (variants: Variants, amount = 0.75) =>
    reduce ? {} : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount } };

  return (
    <section className="about about--heroBleed">
      <div className="about__hero">
        <img
          src={heroImage}
          alt="About Atmos LED"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="about__heroInner">
          <div className="about__heroContent">
            {/* H1 stays exactly the same */}
            <motion.h1
              id="about-heading"
              className="about__title"
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
                  className="about__titleChar"
                  style={{ display: "inline-block" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container about__wrap">
        {/* Intro — now renders 3 separate paragraphs */}
        <motion.section className="aboutIntro aboutIntro--single" {...motionProps(filterGroup, 0.8)}>
          <div className="aboutIntro__copy">
            <motion.h2 className="aboutIntro__headline" variants={filterItem}>
              {intro.headline}
            </motion.h2>

            {intro.body.map((para, idx) => (
              <motion.p key={idx} className="aboutIntro__body" variants={filterItem}>
                {para}
              </motion.p>
            ))}
          </div>
        </motion.section>

        {/* Team section removed per request */}

        {/* CTA — subtle fadeUp for cohesion */}
        <motion.section className="aboutCTA" {...motionProps(fadeUp, 0.7)}>
          <h2 className="aboutCTA__h2">Join the Team</h2>
          <p className="aboutCTA__p">Interested in a career with Atmos LED?</p>
          <div className="aboutCTA__actions">
            <Link className="btn btn--primary" to="/contact">
              Let’s Talk
            </Link>
          </div>
        </motion.section>

        {/* FAQs — left column fades; right list staggers in rows */}
        <section className="aboutFaqs aboutFaqs--split">
          <motion.aside className="aboutFaqs__intro" {...motionProps(filterGroup, 0.75)}>
            <motion.h2 className="aboutFaqs__kicker" variants={filterItem}>FAQs</motion.h2>
            <motion.p className="aboutFaqs__lead" variants={filterItem}>
              Find quick answers to the most common questions about Atmos LED
              displays, from choosing the right panel to installation, support,
              and long-term performance.
            </motion.p>

            <motion.div variants={filterItem}>
              <Link className="aboutFaqs__cta" to="/contact">
                <span>Contact Us</span>
                <span className="aboutFaqs__ctaArrow" aria-hidden="true">›</span>
              </Link>
            </motion.div>
          </motion.aside>

          <motion.div className="aboutFaqs__right" {...motionProps(filterGroup, 0.8)}>
            <div className="aboutFaqs__list" role="list">
              {faqs.map((f, i) => (
                <motion.details key={i} className="aboutFaqs__item" variants={filterItem}>
                  <summary className="aboutFaqs__q">{f.q}</summary>
                  <div className="aboutFaqs__aWrap">
                    <p className="aboutFaqs__a">{f.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </section>
  );
}



