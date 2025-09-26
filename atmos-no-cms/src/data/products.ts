import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "element",
    name: "Element",
    series: "Series",
    tagline: "Efficient. Accurate. Versatile.",
    startingFrom: 555,
    image: "/assets/products/element.png",
    categories: ["Indoor Performance", "Compact & Versatile"],
    specs: ["E2.6 / EX2.6  •  E2.9 / EX2.9  •  E3.9  •  E4.8 / EX4.8"],
    description: "The Element Series is our IP65-rated LED panel designed for excellent visuals for any indoor installation or production deployment. Built for demanding outdoor environments, it features a durable die-cast aluminum cabinet and a modular design with fast-locking mechanisms. With high brightness, wide viewing angles, and front-and-back maintenance, it ensures seamless visuals even in direct sunlight—ideal for concerts, sports, exhibitions, and stage productions. ",
    useTitle: "Versatile Outdoor and Touring Applications",
    productUses: [
      {
      heading: "Outdoor Concerts and Festivals",
      body: "Provide brilliant visuals that withstand sunlight and deliver immersive experiences in any outdoor setting."
      },
      {
        heading: "Tour-Ready Mobility",
        body: "Rugged, crash-proof panels endure frequent setups and teardowns without compromising quality."
      },
      {
        heading: "Exhibition and Sporting Events",
        body: "Adaptable panels bring reliable visuals to temporary outdoor events that demand performance and durability."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/element",
    glowColor: "#D81279"
  },
  {
    id: "p2",
    slug: "kiosk",
    name: "Kiosk",
    series: "Series",
    tagline: "Modular kiosk-ready panels.",
    startingFrom: 555,
    image: "/assets/products/kiosk.png",
    categories: ["Indoor Performance", "Compact & Versatile"],
    specs: ["KI1.2  •  KI1.5  •  KI1.8  •  KI2.5"],
    description: "The Kiosk Series offers a sleek, ultra-slim design with flexible installation options, including hanging, wall mounting, and seamless splicing. Its lightweight build and compact form make it easy to transport and set up. With remote-control compatibility via laptop, mobile device, or cloud platform, it’s an excellent solution for digital signage in shopping malls, retail stores, conference rooms, exhibitions, and event spaces. ",
    useTitle: "Flexible Signage Solutions with the Kiosk Series",
    productUses: [
      {
      heading: "Mall and Retail Promotions",
      body: "Deliver bright, dynamic messaging that draws customers into stores and showcases products."
      },
      {
        heading: "Conference and Event Signage",
        body: "Share schedules, wayfinding, or branding in high-traffic areas with portable LED kiosks."
      },
      {
        heading: "Exhibitions and Trade Shows",
        body: "Compact, transportable LED posters that make setup simple while maximizing impact."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/kiosk",
    glowColor: "#DC902A"
  },
  {
    id: "p3",
    slug: "phantom",
    name: "Phantom",
    series: "Series",
    tagline: "High-impact visuals for bold spaces.",
    startingFrom: 595,
    image: "/assets/products/phantom.png",
    categories: ["Creative & Immersive", "Indoor Performance"],
    specs: ["PH3.9  •  PH7.8"],
    description: "The Phantom Series is our transparent LED panel designed for indoor and outdoor applications requiring ultimate concealment and disguise. Engineered for seamless integration, it delivers 5000nits of brightness, 16-bit grayscale, and a 7680Hz refresh rate for crisp, high-contrast visuals. With up to 50% transparency, it blends effortlessly into its surroundings, making it ideal for retail, exhibitions, and immersive digital displays. ",
    useTitle: "Where Transparency Creates New Possibilities",
    productUses: [
      {
      heading: "Retail Storefront Displays",
      body: "Blend digital content with physical displays while maintaining visibility into the store."
      },
      {
        heading: "Exhibition Installations",
        body: "Deliver futuristic visual effects that impress visitors without obstructing space design."
      },
      {
        heading: "Architectural Integration",
        body: "Incorporate transparent LED seamlessly into glass and structures for subtle, dynamic visuals."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/phantom",
    glowColor: "#1D458B"
  },
  {
    id: "p4",
    slug: "stratos",
    name: "Stratos",
    series: "Series",
    tagline: "Outdoor brightness. Built to endure.",
    startingFrom: 655,
    image: "/assets/products/stratos.png",
    categories: ["Outdoor & Weatherproof"],
    specs: ["STR4.4  •  STR5.7  •  STR8  •  STR10"],
    description: "The Atmos LED Stratos Series delivers maximum impact for permanent outdoor installations with ultra-high brightness (up to 10,000 nits) and a fully IP65-rated weatherproof design. Whether under direct sunlight or in harsh weather conditions, Stratos ensures crystal-clear visuals and 24/7 reliability. Designed for long-term performance, it’s the ideal solution for venues, signage, stadiums, and architectural displays that demand both durability and stunning visual clarity. With Stratos, you’re investing in long-lasting performance, minimal maintenance, and maximum audience engagement. ",
    useTitle: "Stratos in Action: Outdoor Reliability",
    productUses: [
      {
      heading: "Stadium Scoreboards and Jumbotrons",
      body: "Display replays, stats, and ads with crystal clarity—even under direct sunlight."
      },
      {
        heading: "Large-Scale Outdoor Signage",
        body: "Capture attention with vibrant LED billboards that run reliably 24/7."
      },
      {
        heading: "Architectural Displays",
        body: "Transform building facades into digital canvases with bold, weatherproof LED solutions."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/stratos",
    glowColor: "#F18037"
  },
  {
    id: "p5",
    slug: "trek",
    name: "Trek",
    series: "Series",
    tagline: "Portable, rental-friendly LED.",
    startingFrom: 585,
    image: "/assets/products/trek.png",
    categories: ["Compact & Versatile", "Creative & Immersive"],
    specs: ["TRX2.5  •  TRX2.6  •  TRX2.9  •  TRX3.9  •  TRX4.8"],
    description: "The Trek Series is our stage deck LED floor panel designed to increase visual experiences by providing visuals on the floor of any indoor venue. Built for durability, it features a scratch-resistant PC material mask and supports up to 1.8 tons per square meter. Adjustable height settings accommodate uneven surfaces, while a built-in inductor system enables an ultra-responsive 0.02-second reaction time, creating interactive and immersive floor displays. ",
    useTitle: "Transforming Spaces with Trek LED Floors",
    productUses: [
      {
      heading: "Immersive Event Experiences",
      body: "Turn floors into interactive displays that react instantly to audience movement."
      },
      {
        heading: "Sports and Training Applications",
        body: "Visualize drills, metrics, and game strategies directly on responsive LED flooring."
      },
      {
        heading: "Exhibitions and Museum Installs",
        body: "Engage visitors with interactive storytelling and environments that respond to every step."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/trek",
    glowColor: "#035F66"
  },
  {
    id: "p6",
    slug: "vision",
    name: "Vision",
    series: "Series",
    tagline: "Fine-pitch clarity for premium interiors.",
    startingFrom: 635,
    image: "/assets/products/vision.png",
    categories: ["Indoor Performance"],
    specs: ["V1.9  •  V2.9 / VX2.6  •  V2.9 / VX2.9  •  V3.9 / VX3.9"],
    description: "The Vision Series is our premier production LED panel designed to provide superb visuals for any indoor installation or production deployment. Featuring multiple pixel pitch options and a 7680Hz refresh rate, it delivers stunning, high-definition imagery. Its modular design ensures quick, tool-free maintenance, while optional curved panels support concave, convex, and curvilinear configurations, making it a versatile choice for dynamic visual setups. ",
    useTitle: "Where Vision Series Makes the Biggest Impact",
    productUses: [
      {
      heading: "Seamless Stage Backdrops",
      body: "Create vibrant LED walls that deliver stunning clarity for live events, conferences, and worship services."
      },
      {
        heading: "Flexible Event Builds",
        body: "Adapt to any venue with modular panels that support flat, concave, or convex designs."
      },
      {
        heading: "Fast Turnaround Productions",
        body: "Tool-free, magnetic modules ensure quick installation and maintenance, keeping tight timelines on track."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/vision",
    glowColor: "#6A449B"
  },
  {
    id: "p7",
    slug: "vivid",
    name: "Vivid",
    series: "Series",
    tagline: "Punchy color. Effortless install.",
    startingFrom: 565,
    image: "/assets/products/vivid.png",
    categories: ["Indoor Performance", "Creative & Immersive"],
    specs: ["VI.7  •  VI.9  •  VI1.5  •  VI1.8  •  VI2.3"],
    description: "The Vivid Series is our ultimate UHD LED panel designed for direct-to-wall or surface mounting. With advanced pixel pitch technology and seamless panel integration, it delivers ultra-high-definition visuals with precision. Its slim, lightweight frame enables easy installation, while energy-efficient performance ensures long-term reliability. Supporting resolutions up to 8K, it’s the perfect choice for high-end retail, corporate settings, broadcast studios, and luxury venues. ",
    useTitle: "Premium Applications for the Vivid Series",
    productUses: [
      {
      heading: "High-End Retail Displays",
      body: "Deliver lifelike visuals that elevate customer experiences in flagship stores and luxury environments."
      },
      {
        heading: "Broadcast and Studio Quality",
        body: "Support 4K and 8K workflows with pixel-perfect detail and color calibration."
      },
      {
        heading: "Corporate and Executive Spaces",
        body: "Transform boardrooms and lobbies with slim, seamless walls that showcase premium branding."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/vivid",
    glowColor: "#223C78"
  },
  {
    id: "p8",
    slug: "vue",
    name: "Vue",
    series: "Series",
    tagline: "Balanced performance, smart value.",
    startingFrom: 545,
    image: "/assets/products/vue.png",
    categories: ["Compact & Versatile"],
    specs: ["VU1.2  •  VU1.5  •  VU1.8  •  VU2.5"],
    description: "The Vue Series is our high-density LED panel designed for direct-to-wall or surface mounting. Engineered for superior image clarity, it features ultra-wide viewing angles, a high contrast ratio, and a 7680Hz refresh rate for outstanding color accuracy. Its lightweight die-cast aluminum frame allows for seamless splicing, easy front access for maintenance, and quick installation— ideal for digital signage, corporate environments, and high-end displays. ",
    useTitle: "Practical Solutions Powered by the Vue Series",
    productUses: [
      {
      heading: "Campus and Classroom Displays",
      body: "Deliver clear, engaging visuals for lectures, assemblies, and presentations."
      },
      {
        heading: "Digital Signage Solutions",
        body: "Enhance communications in retail, corporate, and institutional environments."
      },
      {
        heading: "Budget-Friendly Installations",
        body: "Balance affordability with reliable LED performance at scale."
      }
    ],
    shopUrl: "https://your-shop.myshopify.com/products/vue",
    glowColor: "#F5CC19"
  },
  {
  id: "p7",
  slug: "vivid",
  name: "Vivid",
  series: "Series",
  tagline: "Punchy color. Effortless install.",
  startingFrom: 555, 
  image: "/assets/products/vivid.png",
  categories: ["Indoor Performance", "Creative & Immersive"],
  specs: ["V1.7", "V1.9", "V1.12", "V1.5", "V1.8", "V2.3"],
  description: "Vivid Series focuses on saturated color and simple installs for retail, hospitality, and venues.",
  useTitle: "Practical",
  productUses: [
    {
      heading: "Campus and Classroom Displays",
      body: "Deliver clear, engaging visuals for lectures, assemblies, and presentations."
    },
    {
      heading: "Digital Signage Solutions",
      body: "Enhance communications in retail, corporate, and institutional environments."
    },
    {
      heading: "Budget-Friendly Installations",
      body: "Balance affordability with reliable LED performance at scale."
    }
  ],
  shopUrl: "https://your-shop.myshopify.com/products/vivid",
  glowColor: "#3BBE7A"
  },
  {
  id: "p8",
  slug: "vue",
  name: "Vue",
  series: "Series",
  tagline: "Balanced performance, smart value.",
  startingFrom: 555,
  image: "/assets/products/vue.png",
  categories: ["Compact & Versatile"],
  specs: ["VU1.2", "VU1.5", "VU1.8", "VU2.5"],
  description: "Vue Series offers a balanced package of brightness, efficiency, and serviceability for broad use cases.",
  useTitle: "Practical Solutions Powered by the Vue Series",
  productUses: [
    {
      heading: "Campus and Classroom Displays",
      body: "Deliver clear, engaging visuals for lectures, assemblies, and presentations."
    },
    {
      heading: "Digital Signage Solutions",
      body: "Enhance communications in retail, corporate, and institutional environments."
    },
    {
      heading: "Budget-Friendly Installations",
      body: "Balance affordability with reliable LED performance at scale."
    }
  ],
  shopUrl: "https://your-shop.myshopify.com/products/vue",
  glowColor: "#3BBE7A"
  },
];

