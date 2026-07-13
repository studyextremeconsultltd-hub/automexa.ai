const hd = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90&fm=jpg`;

export const brand = {
  name: "Automexa",
  tagline: "Websites That Grow Your Business",
  email: "info@automexa.co.uk",
  phone: "+44 7869 480914",
  whatsapp: "https://wa.me/447869480914",
  tiktok: "https://www.tiktok.com/@automexa",
  facebook: "https://www.facebook.com/automexa",
  instagram: "https://www.instagram.com/automexa",
  youtube: "https://www.youtube.com/@automexa",
  linkedin: "https://www.linkedin.com/company/automexa",
};

export const heroSlides = [
  {
    id: 1,
    image: hd("photo-1498050108023-c5249f4df085"),
    title: "AI-Powered Website Design",
    subtitle: "From idea to live site — crafted with intelligence, refined by experts.",
  },
  {
    id: 2,
    image: hd("photo-1497366216548-37526070297c"),
    title: "Built for Growth & Conversion",
    subtitle: "High-performance sites that turn visitors into loyal customers.",
  },
  {
    id: 3,
    image: hd("photo-1551288049-bebda4e38f71"),
    title: "Launch Within 3 Days",
    subtitle: "Professional websites, e-commerce & CRM — delivered at startup speed.",
  },
];

/** Shared HD mosaic / motion imagery (distinct, reliable Unsplash assets) */
export const mosaicPool = [
  hd("photo-1498050108023-c5249f4df085", 1200),
  hd("photo-1561070791-2526d30994b5", 1200),
  hd("photo-1497366216548-37526070297c", 1200),
  hd("photo-1551288049-bebda4e38f71", 1200),
  hd("photo-1517694712202-14dd9538aa97", 1200),
  hd("photo-1472851294608-062f824d29cc", 1200),
  hd("photo-1600880292203-757bb62b4baf", 1200),
  hd("photo-1531482615713-2afd69097998", 1200),
  hd("photo-1451187580459-43490279c0fa", 1200),
  hd("photo-1454165804606-c3d57bc86b40", 1200),
];

export const websiteTypes = [
  "Business / Corporate Website",
  "E-commerce Store",
  "Portfolio / Agency Site",
  "Landing Page",
  "CRM / Booking System",
  "AI Automation Platform",
  "Educational / LMS",
  "Other / Custom",
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
  },
  {
    title: "AI Automation",
    text: "Automate enquiries, follow-ups, and routines so your team focuses on growth — not repetitive admin.",
    tone: "blue",
    image: hd("photo-1451187580459-43490279c0fa", 1400),
  },
  {
    title: "E-commerce",
    text: "Online stores built to sell — product clarity, smooth checkout, and a path from browse to buy.",
    tone: "sky",
    image: hd("photo-1472851294608-062f824d29cc", 1400),
  },
  {
    title: "CRM Systems",
    text: "Capture leads, track conversations, and keep every client relationship organised in one place.",
    tone: "navy",
    image: hd("photo-1551288049-bebda4e38f71", 1400),
  },
  {
    title: "Business Solutions",
    text: "Custom digital tools for small and medium enterprises — booking, dashboards, and workflow systems.",
    tone: "blue",
    image: hd("photo-1454165804606-c3d57bc86b40", 1400),
  },
  {
    title: "Within 3 Days",
    text: "Fast launch for growing businesses — professional quality without the long agency wait.",
    tone: "sky",
    image: hd("photo-1517694712202-14dd9538aa97", 1400),
  },
];

export const trustedCompanies = [
  { name: "Tesco", category: "Retail" },
  { name: "Barclays", category: "Banking" },
  { name: "British Airways", category: "Travel" },
  { name: "BBC", category: "Media" },
  { name: "HSBC", category: "Finance" },
];

export const services = [
  {
    title: "Professional Website Design",
    text: "Pixel-perfect, conversion-led websites that look premium on every device and load in a blink.",
    image: hd("photo-1467232004584-a241de8bcf5d", 1600),
  },
  {
    title: "AI Automation",
    text: "Smart workflows, chat assistants, and content systems that save hours and scale with you.",
    image: hd("photo-1677442136019-21780ecad995", 1600),
  },
  {
    title: "E-commerce Solutions",
    text: "Stores built to sell — product pages, secure checkout, and inventory-ready architecture.",
    image: hd("photo-1556742049-0cfed4f6a45d", 1600),
  },
  {
    title: "CRM Systems",
    text: "Capture leads, manage clients, and keep your pipeline organised in one clean system.",
    image: hd("photo-1552664730-d307ca884978", 1600),
  },
  {
    title: "Business Solutions",
    text: "From booking platforms to dashboards — tailored tools that fit how your company works.",
    image: hd("photo-1504384308090-c894fdcc538d", 1600),
  },
];

/** Page-specific Visual Showcase galleries */
export const pageGalleries = {
  about: [
    { src: hd("photo-1600880292203-757bb62b4baf", 1600), label: "Collaborative teams" },
    { src: hd("photo-1497366216548-37526070297c", 1600), label: "Modern workspace" },
    { src: hd("photo-1531482615713-2afd69097998", 1600), label: "Strategy sessions" },
    { src: hd("photo-1552664730-d307ca884978", 1600), label: "Client workshops" },
    { src: hd("photo-1522071820081-009f0129c71c", 1600), label: "Creative culture" },
    { src: hd("photo-1517245386807-bb43f82c33c4", 1600), label: "Delivery focus" },
  ],
  services: [
    { src: hd("photo-1467232004584-a241de8bcf5d", 1600), label: "Website craft" },
    { src: hd("photo-1451187580459-43490279c0fa", 1600), label: "AI systems" },
    { src: hd("photo-1472851294608-062f824d29cc", 1600), label: "Commerce flows" },
    { src: hd("photo-1551288049-bebda4e38f71", 1600), label: "CRM dashboards" },
    { src: hd("photo-1504384308090-c894fdcc538d", 1600), label: "Business tooling" },
    { src: hd("photo-1517694712202-14dd9538aa97", 1600), label: "Fast builds" },
  ],
  portfolio: [
    { src: hd("photo-1460925895917-afdab827c52f", 1600), label: "Growth metrics" },
    { src: hd("photo-1561070791-2526d30994b5", 1600), label: "UI systems" },
    { src: hd("photo-1498050108023-c5249f4df085", 1600), label: "Product builds" },
    { src: hd("photo-1558655146-d09347e92766", 1600), label: "Brand polish" },
    { src: hd("photo-1581291518633-83b4ebd1d83c", 1600), label: "Interface detail" },
    { src: hd("photo-1454165804606-c3d57bc86b40", 1600), label: "Launch readiness" },
  ],
  contact: [
    { src: hd("photo-1423666639041-f56000c27a9a", 1600), label: "Open conversation" },
    { src: hd("photo-1521791136064-7986c2920216", 1600), label: "Partnership" },
    { src: hd("photo-1596524430615-b46475ddff6e", 1600), label: "Clear support" },
    { src: hd("photo-1516321318423-f06f85e504b3", 1600), label: "Digital briefing" },
    { src: hd("photo-1556761175-b413da4baf72", 1600), label: "Team alignment" },
    { src: hd("photo-1573164713714-d95e436ab8d6", 1600), label: "Ready to start" },
  ],
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact Us", path: "/contact" },
];
