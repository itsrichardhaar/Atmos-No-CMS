// src/data/markets.ts
import type { Market } from "../types/market";

export const markets: Market[] = [
  {
    id: "m1",
    slug: "corporate-events",
    name: "Corporate Events",
    nameWords: ["Corporate", '"Events"'],
    blurb:
      "Transform conferences and keynotes with vivid large-format displays and stage visuals.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/corporate.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/corporate.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/corporate-events/corporate-main.png",
      headline: "Professional-grade LED displays\n" +
                "designed to elevate presentations,\n" +
                "product launches, and conferences\n" +
                "with crystal-clear, engaging visuals.",
      body: "Corporate events demand professionalism, clarity, and reliability—and Atmos LED delivers on all three. Our panels ensure that every message is communicated with impact, whether it’s a keynote, product reveal, or live-streamed meeting. With seamless integration and energy-efficient performance, Atmos displays enhance engagement while aligning with your brand’s high standards.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/corporate-events/corp-benefit-1.png",
          title: "Sharp, high-resolution visuals for presentations and branding",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/corporate-events/corp-benefit-2.png",
          title: "Easy installation and quick teardown for fast-paced events",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/corporate-events/corp-benefit-3.png",
          title: "Flexible configurations",
          body: "Walls, stages, backdrops, and signage",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/corporate-events/corp-benefit-4.png",
          title: "Reliable operation with U.S.-based technical support",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Elevate presentations and conferences with dynamic LED visuals that impress every audience.",
      items: [
        {
          title: "Dynamic Backdrops that Reinforce Your Brand Message",
          body: "Transform presentations and conferences with vivid LED walls that showcase your brand identity while keeping audiences visually engaged.",
        },
        {
          title: "Product Launches That Capture Audience Attention Instantly",
          body: "Use LED displays to create dramatic reveals and immersive visuals that highlight every product detail with clarity.",
        },
        {
          title: "Hybrid Events with Seamless Visual Integration",
          body: "Ensure both in-person and remote participants experience crystal-clear visuals that maintain professionalism and engagement."
        }
      ]
    }
  },


  {
    id: "m2",
    slug: "house-of-worship",
    name: "House of Worship",
    nameWords: ["House", "of", '"Worship"'],
    blurb:
      "From ambient glows to bold stage looks, enhance storytelling and connection.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/worship.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/worship.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/houses-of-worship/worship-main.png",
      headline: "LED video walls that\n" +
                "inspire worship by\n" +
                "creating immersive,\n" +
                "clear visuals in\n" +
                "sanctuaries, chapels,\n" +
                "and gathering\n" +
                "spaces.",
      body: "In worship environments, connection and clarity matter most. Atmos LED provides displays that bring lyrics, sermons, and multimedia to life, ensuring every member of the congregation feels engaged. With wide viewing angles and easy-to-maintain panels, Atmos LED empowers ministries to share their message with impact.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/houses-of-worship/worship-benefit-1.png",
          title: "Vivid visuals that support worship and teaching",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/houses-of-worship/worship-benefit-2.png",
          title: "Wide angles so no seat misses a detail",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/houses-of-worship/worship-benefit-3.png",
          title: "Seamless integration with AV systems",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/houses-of-worship/worship-benefit-4.png",
          title: "Long-lasting, energy-efficient performance",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Inspire connection and worship with crystal-clear displays that reach every seat.",
      items: [
        {
          title: "Video Walls that Connect Congregations in Worship",
          body: "Deliver lyrics, scripture, and sermon visuals clearly to every seat with wide viewing angles and vivid color.",
        },
        {
          title: "Enhancing Worship with Immersive Visual Storytelling",
          body: "Support messages with high-definition video and imagery that bring services to life and deepen engagement.",
        },
        {
          title: "Flexible Displays for Modern and Traditional Spaces",
          body: "Seamlessly integrate LED technology into sanctuaries of all sizes without disrupting architectural design."
        }
      ]
    }
  },



  {
    id: "m3",
    slug: "concerts-tours",
    name: "Concerts & Tours",
    nameWords: ["Concerts", '"&"', "Tours"],
    blurb:
      "Road-ready systems that survive travel, set fast, and dazzle every show.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/concerts.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/concerts.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/concerts-and-tours/concerts-main.png",
      headline: "High-impact LED\n" +
                "panels built for\n" +
                "touring, concerts, and\n" +
                "live productions\n" +
                "where durability,\n" +
                "performance, and\n" +
                "speed are essential.",
      body: "Touring productions and concerts need displays that perform under pressure. Atmos LED panels provide rugged durability, quick setup, and breathtaking visuals that engage audiences in any venue. From stage backdrops to immersive effects, Atmos LED brings energy and reliability to the show night after night.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/concerts-and-tours/concerts-benefit-1.png",
          title: "Crash-proof protection for frequent setup and transport",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/concerts-and-tours/concerts-benefit-2.png",
          title: "High brightness for indoor or outdoor venues",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/concerts-and-tours/concerts-benefit-3.png",
          title: "Flexible panel designs for creative stage environments",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/concerts-and-tours/concerts-benefit-4.png",
          title: "Tool-free, fast installation and teardown",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Bring live performances to life with tour-ready LED displays that captivate crowds.",
      items: [
        {
          title: "High-Impact Stage Backdrops with Immersive Visuals",
          body: "Set the mood with LED backdrops that sync with live performances and captivate audiences.",
        },
        {
          title: "Tour-Ready Panels Built for Rigorous Travel",
          body: "Durable, crash-proof panels withstand frequent setups and teardowns while maintaining brilliant performance.",
        },
        {
          title: "Outdoor Festival Displays Visible in Any Light",
          body: "Ensure visibility with ultra-bright outdoor panels that perform even in direct sunlight."
        }
      ]
    }
  },



  {
    id: "m4",
    slug: "retail-hospitality",
    name: "Retail & Hospitality",
    nameWords: ["Retail", '"&"', "Hospitality"],
    blurb:
      "Capture attention with digital canvases for promotions, ambience, and brand moments.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/worship.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/worship.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/retail-and-hospitality/retail-main.png",
      headline: "Captivating LED\n" +
                "displays that\n" +
                "transform customer\n" +
                "experiences in retail\n" +
                "storefronts,\n" +
                "restaurants, hotels,\n" +
                "and entertainment\n" +
                "venues.",
      body: "First impressions matter in retail and hospitality. Atmos LED products deliver vibrant, seamless visuals that attract attention, communicate brand stories, and create unforgettable customer experiences. With slim designs and energy-efficient operation, our displays offer a modern upgrade for businesses looking to stand out.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/retail-and-hospitality/retail-benefit-1.png",
          title: "Eye-catching visuals to increase foot traffic",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/retail-and-hospitality/retail-benefit-2.png",
          title: "Seamless integration with store layouts and signage",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/retail-and-hospitality/retail-benefit-3.png",
          title: "Lightweight, slim designs for easy placement",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/retail-and-hospitality/retail-benefit-4.png",
          title: "Reliable, energy-efficient performance for long-term use",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Transform customer experiences with stunning displays that attract, inform, and inspire.",
      items: [
        {
          title: "Storefront Displays That Draw Customers Inside",
          body: "Turn heads with bright, dynamic LED signage that attracts foot traffic and drives engagement.",
        },
        {
          title: "Immersive In-Store Experiences that Elevate Shopping",
          body: "Integrate LED displays into retail spaces to highlight promotions, storytelling, and interactive branding.",
        },
        {
          title: "Hospitality Venues That Deliver Memorable Experiences",
          body: "Hotels, restaurants, and entertainment venues use LED walls to set ambiance and delight guests."
        }
      ]
    }
  },



  {
    id: "m5",
    slug: "virtual-production",
    name: "Virtual Production",
    nameWords: ["Virtual", '"Production"'],
    blurb:
      "LED volumes and backgrounds for immersive in-camera workflows.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/virtual.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/virtual.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/virtual-production/virtual-main.png",
      headline: "Cutting-edge LED\n" +
                "panels designed for\n" +
                "broadcast, film, and\n" +
                "virtual production\n" +
                "environments with\n" +
                "lifelike realism and\n" +
                "color accuracy.",
      body: "In virtual production, precision is everything. Atmos LED provides UHD panels optimized for high refresh rates, color consistency, and seamless performance with standard processing systems. Our panels integrate effortlessly with film and broadcast workflows, enabling directors and producers to create stunning content in real-time.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/virtual-production/virtual-benefit-1.png",
          title: "Ultra-fine pixel pitches for broadcast-quality imagery",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/virtual-production/virtual-benefit-2.png",
          title: "Seamless color calibration for true-to-life accuracy",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/virtual-production/virtual-benefit-3.png",
          title: "Wide viewing angles for multi-camera setups",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/virtual-production/virtual-benefit-4.png",
          title: "Reliable integration with industry-standard processing",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Create lifelike, real-time environments with LED panels built for film and broadcast.",
      items: [
        {
          title: "Seamless Backgrounds for Film and Broadcast Shoots",
          body: "Achieve lifelike, real-time environments that reduce post-production costs and improve creative flexibility.",
        },
        {
          title: "Immersive XR Stages for Advanced Storytelling",
          body: "Empower creators with LED environments that respond dynamically to lighting and camera setups.",
        },
        {
          title: "Color-Accurate Displays for Professional Studio Workflows",
          body: "Ensure consistent, calibrated visuals that meet broadcast and film industry standards."
        }
      ]
    }
  },




  {
    id: "m6",
    slug: "immersive-productions",
    name: "Immersive Productions",
    nameWords: ["Immersive", '"Productions"'],
    blurb:
      "Interactive, experiential environments that react and engage.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/immersive.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/immersive.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/immersive-environments/immersive-main.png",
      headline: "Flexible LED solutions\n" +
                "for creative,\n" +
                "interactive\n" +
                "environments that\n" +
                "engage audiences\n" +
                "through unique and\n" +
                "memorable\n" +
                "expreiences.",
      body: "Immersive environments demand creativity and technical precision. Atmos LED delivers both, offering panels that can be curved, shaped, or made transparent to create truly one-of-a-kind installations. Whether for exhibitions, experiential marketing, or art, our technology makes bold ideas possible.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/immersive-environments/immersive-benefit-1.png",
          title: "Support for curved, concave, and convex builds",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/immersive-environments/immersive-benefit-2.png",
          title: "Transparent and interactive LED options",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/immersive-environments/immersive-benefit-3.png",
          title: "High brightness for indoor or outdoor installations",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/immersive-environments/immersive-benefit-4.png",
          title: "Advanced engineering support for custom projects",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Elevate presentations and conferences with dynamic LED visuals that impress every audience.",
      items: [
        {
          title: "Dynamic Backdrops that Reinforce Your Brand Message",
          body: "Transform presentations and conferences with vivid LED walls that showcase your brand identity while keeping audiences visually engaged.",
        },
        {
          title: "Product Launches That Capture Audience Attention Instantly",
          body: "Use LED displays to create dramatic reveals and immersive visuals that highlight every product detail with clarity.",
        },
        {
          title: "Hybrid Events with Seamless Visual Integration",
          body: "Ensure both in-person and remote participants experience crystal-clear visuals that maintain professionalism and engagement."
        }
      ]
    }
  },




  {
    id: "m7",
    slug: "education-institutions",
    name: "Education & Institutions",
    nameWords: ["Education", '"&"', "Institutions"],
    blurb:
      "Clarity for lectures, assemblies, and presentations across campuses.",
    gridImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/education.png",
    heroImage: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/hero/education.png",
    intro: {
      image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/education-and-institutions/education-main.png",
      headline: "Affordable, high-\n" +
                "quality LED displays\n" +
                "that enhance\n" +
                "learning,\n" +
                "communication, and\n" +
                "collaboration across\n" +
                "campuses and\n" +
                "educational facilities.",
      body: "From lecture halls to student centers, Atmos LED supports education with engaging, easy-to-use displays. Our panels provide clear visuals for presentations, events, and campus-wide communications, ensuring institutions can share information effectively while inspiring students and faculty alike.",
    },
    benefits: {
      title:"Atmos LED Benefits",
      items: [
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/education-and-institutions/education-benefit-1.png",
          title: "Clear, large-format visuals for classrooms and auditoriums",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/education-and-institutions/education-benefit-2.png",
          title: "Energy-efficient operation for budget-conscious institutions",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/education-and-institutions/education-benefit-3.png",
          title: "Simple maintenance and long-term reliability",
          body: "",
        },
        {
          image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/markets/detail/education-and-institutions/education-benefit-4.png",
          title: "Versatile applications for events, signage, and branding",
          body: "",
        }
      ]
    },
    useCases: {
      headline: "Enhance learning and communication with LED solutions designed for schools and campuses.",
      items: [
        {
          title: "Lecture Halls Enhanced with Clear Visual Communication",
          body: "Support learning with LED walls that deliver presentations, videos, and graphics visible from every seat.",
        },
        {
          title: "Campus-Wide Messaging Made Modern and Dynamic",
          body: "Share important announcements and branding through energy-efficient LED signage across school facilities.",
        },
        {
          title: "Event and Sports Venue Displays for Student Engagement",
          body: "Create professional-quality experiences at school assemblies, graduations, and athletic competitions."
        }
      ]
    }
  },
];
