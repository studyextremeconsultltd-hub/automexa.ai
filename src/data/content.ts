const hd = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90&fm=jpg`;

/** Pexels CDN motion clips (free license) — verified working renditions */
const clip = (id: number, fps: 24 | 25 | 30 = 30) =>
  `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_${fps}fps.mp4`;

export const clips = {
  codeScreen: clip(3129671),
  digitalRain: clip(3130284),
  codeEditor: clip(3141210, 25),
  hologramData: clip(2792370),
  aiTech: clip(8084616, 25),
  typingLaptop: clip(3163534),
  cityTech: clip(2516159, 24),
  laptopWork: clip(3251808, 25),
  dataCenter: clip(3209828, 25),
  serverRoom: clip(3209663, 25),
  nightCoding: clip(2887463, 25),
  devFlow: clip(3129957, 25),
  dashboards: clip(5091624, 24),
  teamOffice: clip(4990233),
  fintech: clip(7989448, 25),
  workspace: clip(946146),
  teamMeeting: clip(1409899, 25),
  keyboard: clip(852421),
  laptopDesk: clip(856787),
  matrixCode: clip(3130182),
  analytics: clip(5377684, 25),
  onlineStore: clip(4443255, 25),
  digitalGrid: clip(8303104, 24),
  productDesign: clip(4630097, 25),
  techAbstract: clip(5453622, 24),
} as const;

export const brand = {
  name: "AutoMexa",
  logoMark: "signature" as const,
  tagline: "AI Automation, SaaS & Websites That Grow Your Business",
  email: "info@automexa.co.uk",
  phone: "07999988450",
  whatsapp: "https://wa.me/447999988450",
  tiktok: "https://www.tiktok.com/@automexa",
  facebook: "https://www.facebook.com/automexa",
  instagram: "https://www.instagram.com/automexa",
  youtube: "https://www.youtube.com/@automexa",
  linkedin: "https://www.linkedin.com/company/automexa",
};

export const heroSlides = [
  {
    id: 1,
    image: "/images/hero-ai-automation.png",
    video: clips.codeScreen,
    title: "AI Automation That Works While You Sleep",
    subtitle:
      "Chatbots, AI agents and smart workflows — we integrate intelligence into every corner of your business.",
  },
  {
    id: 2,
    image: "/images/hero-crm-saas.png",
    video: clips.digitalRain,
    title: "Custom CRM & SaaS Platforms",
    subtitle:
      "Lead capture, pipelines, bookings and dashboards — built around how your company actually works.",
  },
  {
    id: 3,
    image: "/images/hero-web-design.png",
    video: clips.codeEditor,
    title: "High-Performance Websites in 3 Days",
    subtitle:
      "Conversion-led design, secure architecture and launch-ready builds at startup speed.",
  },
];

/** Looping motion clips for the hero mosaic tiles (Luma-style live imagery) */
export const heroTileVideos: Record<number, string> = {
  0: clips.hologramData,
  2: clips.aiTech,
  3: clips.keyboard,
  5: clips.matrixCode,
  7: clips.analytics,
};

/** Live clips for the cinematic motion gallery columns */
export const motionClips = [
  { video: clips.fintech, poster: "/images/hero-crm-saas.png" },
  { video: clips.laptopDesk, poster: hd("photo-1561070791-2526d30994b5", 1200) },
  { video: clips.matrixCode, poster: "/images/hero-ai-automation.png" },
  { video: clips.analytics, poster: hd("photo-1551288049-bebda4e38f71", 1200) },
  { video: clips.digitalGrid, poster: "/images/hero-web-design.png" },
  { video: clips.productDesign, poster: hd("photo-1472851294608-062f824d29cc", 1200) },
  { video: clips.techAbstract, poster: hd("photo-1677442136019-21780ecad995", 1200) },
  { video: clips.serverRoom, poster: hd("photo-1531482615713-2afd69097998", 1200) },
  { video: clips.keyboard, poster: hd("photo-1451187580459-43490279c0fa", 1200) },
  { video: clips.hologramData, poster: hd("photo-1518186285589-2f7649de83e0", 1200) },
];

/** Shared HD mosaic / motion imagery — custom Automexa renders + tech assets */
export const mosaicPool = [
  "/images/hero-ai-automation.png",
  hd("photo-1561070791-2526d30994b5", 1200),
  "/images/hero-crm-saas.png",
  hd("photo-1551288049-bebda4e38f71", 1200),
  "/images/hero-web-design.png",
  hd("photo-1472851294608-062f824d29cc", 1200),
  hd("photo-1677442136019-21780ecad995", 1200),
  hd("photo-1531482615713-2afd69097998", 1200),
  hd("photo-1451187580459-43490279c0fa", 1200),
  hd("photo-1518186285589-2f7649de83e0", 1200),
];

export const websiteTypes = [
  "Business / Corporate Website",
  "E-commerce Store",
  "Portfolio / Agency Site",
  "Landing Page",
  "CRM / Booking System",
  "AI Automation Platform",
  "AI Chatbot / Agent Integration",
  "SaaS Product / Web App",
  "Educational / LMS",
  "Other / Custom",
];

/** Core expertise pillars — the SaaS positioning of Automexa */
export const expertiseAreas = [
  {
    icon: "bot",
    title: "AI Automation & Agents",
    text: "We design AI systems that handle real work — not gimmicks.",
    points: [
      "24/7 AI chatbots for sales & support",
      "Autonomous agents for enquiries & follow-ups",
      "Smart lead qualification & routing",
      "AI content & response workflows",
    ],
  },
  {
    icon: "plug",
    title: "System Integrations",
    text: "Your tools finally talking to each other — automatically.",
    points: [
      "WhatsApp, email & SMS automation",
      "Stripe payments & invoicing flows",
      "CRM ↔ website ↔ calendar sync",
      "Zapier, n8n & custom API pipelines",
    ],
  },
  {
    icon: "layout",
    title: "Website Design & Development",
    text: "Premium, conversion-led websites engineered for speed.",
    points: [
      "Mobile-first, pixel-perfect layouts",
      "SEO & Core Web Vitals optimised",
      "E-commerce with secure checkout",
      "Launch within 3 days",
    ],
  },
  {
    icon: "database",
    title: "CRM & SaaS Applications",
    text: "Custom platforms that organise and scale your operations.",
    points: [
      "Lead & client pipeline management",
      "Booking, quoting & billing systems",
      "Role-based dashboards & reporting",
      "Built to grow with your business",
    ],
  },
  {
    icon: "shield",
    title: "Security-First Builds",
    text: "Every project ships hardened — no shortcuts on safety.",
    points: [
      "HTTPS & strict security headers",
      "Content Security Policy on every page",
      "Validated forms & protected data flows",
      "Zero known-vulnerability dependencies",
    ],
  },
  {
    icon: "rocket",
    title: "Growth & Scale Support",
    text: "We stay with you after launch — as your technology partner.",
    points: [
      "Analytics & conversion tracking",
      "Ongoing automation improvements",
      "Priority support & maintenance",
      "Roadmaps for scaling to SaaS",
    ],
  },
];

/** Proof numbers for the stats band */
export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3 Days", label: "Average Launch Time" },
  { value: "24/7", label: "AI-Powered Support" },
  { value: "100%", label: "Security-Hardened Builds" },
];

/** Platforms & tools we integrate for clients */
export const integrations = [
  "OpenAI",
  "WhatsApp Business",
  "Stripe",
  "Zapier",
  "n8n",
  "Google Workspace",
  "Shopify",
  "HubSpot",
  "Calendly",
  "Mailchimp",
  "Twilio",
  "Meta Ads",
];

export const projects = [
  {
    id: "roseempire",
    name: "RoseEmpire",
    industry: "Wholesale Bedding Supplier",
    country: "United Kingdom",
    technology: "AI Automation",
    completionTime: "3 Days",
    url: "https://www.roseempire.co.uk/",
    screenshot:
      "https://image.thum.io/get/width/1400/crop/2200/noanimate/https://www.roseempire.co.uk/",
    screenshotFallback:
      "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.roseempire.co.uk%2F?w=1600&h=2400",
    description:
      "A bold wholesale platform that turns browsers into trade buyers — manufacturer-direct pricing, crystal-clear product paths, and an enquiry flow built to close deals across the UK.",
  },
  {
    id: "msbt",
    name: "MSBT",
    industry: "Education & Technology",
    country: "United Kingdom",
    technology: "AI Automation",
    completionTime: "3 Days",
    url: "https://msbt.co.uk/",
    screenshot:
      "https://image.thum.io/get/width/1400/crop/2200/noanimate/https://msbt.co.uk/",
    screenshotFallback:
      "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmsbt.co.uk%2F?w=1600&h=2400",
    description:
      "A sharp education brand site that builds trust instantly — clear course pathways, modern visuals, and a digital presence that makes students and partners want to enrol.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Send your Business Details and Pictures",
    text: "Logo, colours if you have them, photos, and your text content — we take it from there.",
  },
  {
    step: "02",
    title: "Initial Payment",
    text: "Secure checkout through our Stripe account. Simple, fast, and fully protected.",
  },
  {
    step: "03",
    title: "Customization",
    text: "We rebuild the template around your business — not a copy-paste job.",
  },
  {
    step: "04",
    title: "Launch",
    text: "Your website goes live within 3 days — ready to attract and convert clients.",
  },
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "100",
    currency: "GBP",
    delivery: "3-Days Delivery",
    theme: "blue",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "1 revision round",
    ],
    featured: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: "300",
    currency: "GBP",
    delivery: "5 Days Delivery",
    theme: "navy",
    features: [
      "Up to 10 pages",
      "Custom branding polish",
      "E-commerce ready option",
      "Speed & SEO optimisation",
      "3 revision rounds",
      "Analytics setup",
    ],
    featured: true,
  },
  {
    id: "custom",
    name: "Custom",
    price: "500",
    currency: "GBP",
    delivery: "7 Days Delivery",
    theme: "sky",
    features: [
      "Unlimited page structure",
      "AI automation features",
      "CRM / booking systems",
      "Advanced integrations",
      "Priority support",
      "Unlimited revisions in build",
    ],
    featured: false,
  },
];

export const deliverBlocks = [
  {
    title: "Website Design",
    text: "Conversion-led websites for SMEs — clear structure, premium polish, and mobile-first layouts that win trust fast.",
    tone: "navy",
    image: hd("photo-1561070791-2526d30994b5", 1400),
    video: clips.workspace,
  },
  {
    title: "AI Automation",
    text: "Chatbots, AI agents, and smart workflows that automate enquiries, follow-ups, and routines 24/7.",
    tone: "blue",
    image: hd("photo-1451187580459-43490279c0fa", 1400),
    video: clips.nightCoding,
  },
  {
    title: "AI Integrations",
    text: "OpenAI, WhatsApp, Stripe, Zapier, and your tools — connected into one automated pipeline.",
    tone: "sky",
    image: hd("photo-1518186285589-2f7649de83e0", 1400),
    video: clips.devFlow,
  },
  {
    title: "E-commerce",
    text: "Online stores built to sell — product clarity, smooth checkout, and a path from browse to buy.",
    tone: "sky",
    image: hd("photo-1472851294608-062f824d29cc", 1400),
    video: clips.onlineStore,
  },
  {
    title: "CRM Systems",
    text: "Capture leads, track conversations, and keep every client relationship organised in one place.",
    tone: "navy",
    image: hd("photo-1551288049-bebda4e38f71", 1400),
    video: clips.dashboards,
  },
  {
    title: "Business Solutions",
    text: "Custom digital tools for small and medium enterprises — booking, dashboards, and workflow systems.",
    tone: "blue",
    image: hd("photo-1454165804606-c3d57bc86b40", 1400),
    video: clips.teamMeeting,
  },
  {
    title: "Within 3 Days",
    text: "Fast launch for growing businesses — professional quality without the long agency wait.",
    tone: "sky",
    image: hd("photo-1517694712202-14dd9538aa97", 1400),
    video: clips.teamOffice,
  },
];

export const services = [
  {
    title: "AI Automation & Chatbots",
    text: "Intelligent chatbots, autonomous AI agents, and smart workflows that answer enquiries, qualify leads, and follow up 24/7 — so your business never sleeps.",
    image: hd("photo-1677442136019-21780ecad995", 1600),
    video: clips.nightCoding,
  },
  {
    title: "AI Integrations & Workflows",
    text: "We connect OpenAI, WhatsApp, Stripe, Zapier, n8n and your existing tools into one automated pipeline — no more copy-paste admin between systems.",
    image: hd("photo-1518186285589-2f7649de83e0", 1600),
    video: clips.devFlow,
  },
  {
    title: "Professional Website Design",
    text: "Pixel-perfect, conversion-led websites that look premium on every device, load in a blink, and ship with security headers and SEO built in.",
    image: hd("photo-1467232004584-a241de8bcf5d", 1600),
    video: clips.workspace,
  },
  {
    title: "CRM & SaaS Platforms",
    text: "Custom CRM, booking and quoting systems with dashboards and reporting — capture leads, manage clients, and keep your pipeline organised in one place.",
    image: hd("photo-1552664730-d307ca884978", 1600),
    video: clips.dashboards,
  },
  {
    title: "E-commerce Solutions",
    text: "Stores built to sell — product clarity, secure Stripe checkout, inventory-ready architecture, and automated order follow-ups.",
    image: hd("photo-1556742049-0cfed4f6a45d", 1600),
    video: clips.onlineStore,
  },
  {
    title: "Business Solutions & Support",
    text: "From booking platforms to internal dashboards — tailored, security-hardened tools that fit how your company works, with ongoing support after launch.",
    image: hd("photo-1504384308090-c894fdcc538d", 1600),
    video: clips.teamMeeting,
  },
];

/** Page-specific Visual Showcase galleries — live motion clips with poster fallbacks */
export const pageGalleries = {
  about: [
    { src: hd("photo-1600880292203-757bb62b4baf", 1600), video: clips.teamMeeting, label: "Collaborative teams" },
    { src: hd("photo-1497366216548-37526070297c", 1600), video: clips.workspace, label: "Modern workspace" },
    { src: hd("photo-1531482615713-2afd69097998", 1600), video: clips.typingLaptop, label: "Strategy sessions" },
    { src: hd("photo-1552664730-d307ca884978", 1600), video: clips.laptopWork, label: "Client workshops" },
    { src: hd("photo-1522071820081-009f0129c71c", 1600), video: clips.laptopDesk, label: "Creative culture" },
    { src: hd("photo-1517245386807-bb43f82c33c4", 1600), video: clips.analytics, label: "Delivery focus" },
  ],
  services: [
    { src: hd("photo-1467232004584-a241de8bcf5d", 1600), video: clips.nightCoding, label: "Website craft" },
    { src: hd("photo-1451187580459-43490279c0fa", 1600), video: clips.devFlow, label: "AI systems" },
    { src: hd("photo-1472851294608-062f824d29cc", 1600), video: clips.onlineStore, label: "Commerce flows" },
    { src: hd("photo-1551288049-bebda4e38f71", 1600), video: clips.dashboards, label: "CRM dashboards" },
    { src: hd("photo-1504384308090-c894fdcc538d", 1600), video: clips.matrixCode, label: "Business tooling" },
    { src: hd("photo-1517694712202-14dd9538aa97", 1600), video: clips.teamOffice, label: "Fast builds" },
  ],
  portfolio: [
    { src: hd("photo-1460925895917-afdab827c52f", 1600), video: clips.fintech, label: "Growth metrics" },
    { src: hd("photo-1561070791-2526d30994b5", 1600), video: clips.keyboard, label: "UI systems" },
    { src: hd("photo-1498050108023-c5249f4df085", 1600), video: clips.codeScreen, label: "Product builds" },
    { src: hd("photo-1558655146-d09347e92766", 1600), video: clips.digitalGrid, label: "Brand polish" },
    { src: hd("photo-1581291518633-83b4ebd1d83c", 1600), video: clips.productDesign, label: "Interface detail" },
    { src: hd("photo-1454165804606-c3d57bc86b40", 1600), video: clips.techAbstract, label: "Launch readiness" },
  ],
  contact: [
    { src: hd("photo-1423666639041-f56000c27a9a", 1600), video: clips.typingLaptop, label: "Open conversation" },
    { src: hd("photo-1521791136064-7986c2920216", 1600), video: clips.teamMeeting, label: "Partnership" },
    { src: hd("photo-1596524430615-b46475ddff6e", 1600), video: clips.laptopWork, label: "Clear support" },
    { src: hd("photo-1516321318423-f06f85e504b3", 1600), video: clips.workspace, label: "Digital briefing" },
    { src: hd("photo-1556761175-b413da4baf72", 1600), video: clips.cityTech, label: "Team alignment" },
    { src: hd("photo-1573164713714-d95e436ab8d6", 1600), video: clips.serverRoom, label: "Ready to start" },
  ],
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact Us", path: "/contact" },
];
