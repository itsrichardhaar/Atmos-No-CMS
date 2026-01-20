import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "element",
    name: "Element",
    series: "Series",
    tagline: "Powerful. Weatherproof. Performance Driven.",
    startingFrom: 555,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/Element.png",
    categories: ["Outdoor", "Creative & Immersive"],
    specs: ["E2.6 / EX2.6  •  E2.9 / EX2.9  •  E3.9  •  E4.8 / EX4.8"],
    description: "The Element Series is our IP65-rated LED panel designed for excellent visuals for any indoor or outdoor installation or production deployment. Built for demanding outdoor environments, it features a durable die-cast aluminum cabinet and a modular design with fast-locking mechanisms. With high brightness, wide viewing angles, and front-and-back maintenance, it ensures seamless visuals even in direct sunlight—ideal for concerts, sports, exhibitions, and stage productions. ",
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/element",
    glowColor: "#D81279",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Element_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals with High Refresh Rates",
        body: "Up to 7680Hz for smooth playback and vibrant color—ideal for worship, events, and concerts."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "1.2 to 2.5 pixel pitch options."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600–10,000 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "Flat, curved, convex/concave—engineered for custom builds."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
      { icon: "/icons/features/storm.svg",
        title: "Weatherproof Displays for Outdoor Reliability",
        body: "IP-rated protection for harsh environments and round-the-clock operation."
      },
    ],
  },
  {
    id: "p2",
    slug: "kiosk",
    name: "Kiosk",
    series: "Series",
    tagline: "Modular all-in-one kiosk panels.",
    startingFrom: 555,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/kiosk.png",
    categories: ["Indoor"],
    specs: ["KI1.2  •  KI1.5  •  KI1.8  •  KI2.5"],
    description: "The Kiosk Series offers a sleek, ultra-slim design with flexible installation options, including hanging, wall mounting, and seamless splicing up to 8 units. Its lightweight build and compact form make it easy to transport and set up. With remote-control compatibility via laptop, mobile device, or cloud platform, it’s an excellent solution for digital signage in shopping malls, retail stores, conference rooms, exhibitions, and event spaces. ",
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/kiosk",
    glowColor: "#DC902A",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Kiosk_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals",
        body: "Up to 3840Hz for smooth playback and vibrant color—ideal for worship, events, and concerts."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "From ultra-fine to 10mm options, including transparent and interactive LED floors."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600–800 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "Stand-alone or splice kiosk arrangements for creative spaces."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
    ],
  },
  {
    id: "p3",
    slug: "phantom",
    name: "Phantom",
    series: "Series",
    tagline: "Transparent. Lightweight. Impactful.",
    startingFrom: 595,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/phantom.png",
    categories: ["Indoor", "Outdoor", "Creative & Immersive"],
    specs: ["PH3.9  •  PH7.8"],
    description: "The Phantom Series is our transparent LED panel designed for indoor and outdoor applications requiring ultimate concealment and disguise. Engineered for seamless integration, it delivers 5000nits of brightness, 16-bit grayscale, and a 7680Hz refresh rate for crisp, high-contrast visuals. With up to 50% transparency, it blends effortlessly into its surroundings, making it ideal for production or installation applications that demand ultimate concealment and performance. ",
    useTitle: "Where Transparency Creates New Possibilities",
    productUses: [
      {
      heading: "Retail Storefront Displays",
      body: "Provide large-format displays indoors or outdoors, while allowing air to flow through the panels."
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/phantom",
    glowColor: "#1D458B",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Phantom_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals with High Refresh Rates",
        body: "Up to 7680Hz for smooth playback and vibrant color—ideal for worship, events, and concerts."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "3.9-7.8 pixel pitch options, including transparent."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "5000 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "LED solutions to blend in to the environment and be seen when needed."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
      { icon: "/icons/features/storm.svg",
        title: "Weatherproof Displays for Outdoor Reliability",
        body: "IP-rated protection for harsh environments and round-the-clock operation."
      },
    ],
  },
  {
    id: "p4",
    slug: "stratos",
    name: "Stratos",
    series: "Series",
    tagline: "Bright. Weatherproof. Reliable.",
    startingFrom: 655,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/stratos.png",
    categories: ["Outdoor"],
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/stratos",
    glowColor: "#F18037",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Stratos_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals",
        body: "Up to 3840Hz for smooth playback and vibrant color—ideal for signage, billboards, and large outdoor spaces."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "2.9- 10 pixel pitch options, including transparent and interactive LED floors."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "4500–10,000 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "displays designed to showcase your message in large-format applications."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
      { icon: "/icons/features/storm.svg",
        title: "Weatherproof Displays for Outdoor Reliability",
        body: "IP-rated protection for harsh environments and round-the-clock operation."
      },
    ],
  },
  {
    id: "p5",
    slug: "trek",
    name: "Trek",
    series: "Series",
    tagline: "Rugged. Immersive. Interactive.",
    startingFrom: 585,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/trek.png",
    categories: ["Indoor", "Creative & Immersive"],
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/trek",
    glowColor: "#035F66",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Trek_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals",
        body: "Up to 3840Hz for smooth playback and vibrant color—ideal for ideal for indoor stage floor displays, interactive attractions, and virtual productions."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "2.5-4.8 pixel pitch available, including transparent and interactive LED floors."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600–10,000 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "Engineered to immerse your guests  into a digital environment."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
    ],
  },
  {
    id: "p6",
    slug: "vision",
    name: "Vision",
    series: "Series",
    tagline: "Dynamic. Versatile. Creative.",
    startingFrom: 635,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/vision.png",
    categories: ["Indoor", "Creative & Immersive"],
    specs: ["V1.9  •  V2.9 / VX2.6  •  V2.9 / VX2.9  •  V3.9 / VX3.9"],
    description: "The Vision Series is our premier production LED panel designed to provide superb visuals for any indoor installation or production deployment. Featuring multiple pixel pitch options and a 7680Hz refresh rate, it delivers stunning, high-definition imagery. Its modular design ensures quick, tool-free maintenance, while optional curved panels support flex, concave, convex, and curvilinear configurations, making it a versatile choice for dynamic visual setups. ",
    useTitle: "Where Vision Series Makes the Biggest Impact",
    productUses: [
      {
      heading: "Seamless Stage Backdrops",
      body: "Create vibrant LED walls that deliver stunning clarity for live events, conferences, and worship services."
      },
      {
        heading: "Flexible Event Builds",
        body: "Adapt to any venue with modular panels that support flex, flat, concave, or convex designs."
      },
      {
        heading: "Fast Turnaround Productions",
        body: "Tool-free, magnetic modules ensure quick installation and maintenance, keeping tight timelines on track."
      }
    ],
    shopUrl: "https://dfuc15-ke.myshopify.com/products/vision",
    glowColor: "#6A449B",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Vision_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals with High Refresh Rates",
        body: "Up to 7680Hz for smooth playback and vibrant color—ideal for worship, events, and concerts."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "1.9 to 3.9 pixel pitch options, including transparent."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600–1200 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "Flex, Flat, curved, convex/concave—engineered for custom builds."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
    ],
  },
  {
    id: "p7",
    slug: "vivid",
    name: "Vivid",
    series: "Series",
    tagline: "Sleek. Bold. Engaging.",
    startingFrom: 565,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/vivid.png",
    categories: ["Indoor", "Creative & Immersive"],
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/vivid",
    glowColor: "#223C78",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Vivid_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals with High Refresh Rates",
        body: "Up to 7680Hz for smooth playback and vibrant color—ideal for worship, events, and concerts."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "0.7- 2.3 pixel pitch options, including transparent and interactive LED floors."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600–1200 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and quick serviceability speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "Build UHD displays that are designed to impress."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
    ],
  },
  {
    id: "p8",
    slug: "vue",
    name: "Vue",
    series: "Series",
    tagline: "Simple. Efficient. Effective.",
    startingFrom: 545,
    image: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/products/vue.png",
    categories: ["Indoor"],
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
    shopUrl: "https://dfuc15-ke.myshopify.com/products/vue",
    glowColor: "#F5CC19",
    specSheetUrl: "https://springercdn-cf.s3.us-east-1.amazonaws.com/atmos-led/spec-sheets/Atmos_Vue_Series_Sales_Sheet.pdf",
    features: [
      { icon: "/icons/features/burst.svg",
        title: "Stunning Visuals with High Refresh Rates",
        body: "Up to 7680Hz for smooth playback and vibrant color—ideal for houses of worship, retail, education, and corporate applications."
      },
      { icon: "/icons/features/shield.svg",
        title: "Durable LED Panels Built to Last",
        body: "Die-cast aluminum + protective features for long-term performance in tough environments."
      },
      { icon: "/icons/features/matrix.svg",
        title: "Flexible Pixel Pitches for Every Project",
        body: "1.2-2.5 pixel pitch options."
      },
      { icon: "/icons/features/headset.svg",
        title: "Expert Support and Trusted Warranty",
        body: "U.S.-based support, fast integration, and a trusted two-year warranty."
      },
      { icon: "/icons/features/sun.svg",
        title: "Energy Efficiency with Brilliant Brightness",
        body: "600 nits with efficient power design to reduce operating costs."
      },
      { icon: "/icons/features/layers.svg",
        title: "Lightweight Panels for Easy Installation",
        body: "Slim frames, magnetic modules, and front-serviceable design speed up installs."
      },
      { icon: "/icons/features/shape.svg",
        title: "Creative LED Solutions for Unique Designs",
        body: "LED made simple."
      },
      { icon: "/icons/features/eye.svg",
        title: "Vivid Color Accuracy and Wide Viewing",
        body: "Ultra-wide angles and high contrast ensure consistent visuals."
      },
    ],
  },
];

