// src/pages/About.tsx
import { Link } from "react-router-dom";
import "./About.css";
import "./MarketDetail.css";

type TeamMember = {
  name: string;
  title: string;
  photo: string;
  bio?: string;
  linkedin?: string;
  x?: string;
  site?: string;
};

const heroImage =
  "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/about/About-main.png"; 

const intro = {
  image: "/assets/about/about-intro.jpg", 
  headline: "Driven by experts\nwho power your vision.",
  body:
    "Atmos LED combines high-performance engineering with U.S.-based support and a trusted partner network. We design, deploy, and stand behind immersive LED environments that deliver business impact.",
};

const team: TeamMember[] = [
  {
    name: "Full name",
    title: "Job title",
    photo: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/about/Placeholder.png",
    bio: "Short bio or area of focus. Keep to 1–2 lines for balance.",
    linkedin: "#",
    x: "#",
    site: "#",
  },
  {
    name: "Full name",
    title: "Job title",
    photo: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/about/Placeholder.png",
    bio: "Short bio or area of focus. Keep to 1–2 lines for balance.",
    linkedin: "#",
  },
];

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
  return (
    <section className="market market--heroBleed">
      <div className="market__hero">
        <img
          src={heroImage}
          alt="About Atmos LED"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="market__heroInner">
          <div className="market__heroContent">
            <h1 className="market__title">About Us</h1>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container market__wrap">
        <section className="marketIntro">
          <figure className="marketIntro__media">
            <img src={intro.image} alt="" loading="lazy" decoding="async" />
          </figure>
          <div className="marketIntro__copy">
            <h2 className="marketIntro__headline">
              {intro.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="marketIntro__body">{intro.body}</p>
          </div>
        </section>

        <section className="aboutTeam">
          <h2 className="aboutTeam__title">Our team</h2>
          <ul className="aboutTeam__grid" role="list">
            {team.map((m, i) => (
              <li key={i} className="aboutTeam__card">
                <div className="aboutTeam__photoWrap">
                  <img src={m.photo} alt={m.name} loading="lazy" decoding="async" />
                </div>
                <div className="aboutTeam__meta">
                  <h3 className="aboutTeam__name">{m.name}</h3>
                  <p className="aboutTeam__title">{m.title}</p>
                  {m.bio && <p className="aboutTeam__bio">{m.bio}</p>}
                  <div className="aboutTeam__links">
                    {m.linkedin && (
                      <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`}>
                        LinkedIn
                      </a>
                    )}
                    {m.x && (
                      <a href={m.x} aria-label={`${m.name} on X`}>X</a>
                    )}
                    {m.site && (
                      <a href={m.site} aria-label={`${m.name} website`}>Site</a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="aboutCTA">
          <h2 className="aboutCTA__h2">Join the Team</h2>
          <p className="aboutCTA__p">Interested in a career with Atmos LED?</p>
          <div className="aboutCTA__actions">
            <Link className="btn btn--primary" to="/contact">
              Let’s Talk
            </Link>
          </div>
        </section>

        <section className="aboutFaqs">
          <h2 className="aboutFaqs__title">FAQs</h2>
          <div className="aboutFaqs__list" role="list">
            {faqs.map((f, i) => (
              <details key={i} className="aboutFaqs__item">
                <summary className="aboutFaqs__q">{f.q}</summary>
                <p className="aboutFaqs__a">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

