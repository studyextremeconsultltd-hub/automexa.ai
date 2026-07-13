import { motion } from "framer-motion";
import { Target, Users, Rocket, HeartHandshake } from "lucide-react";
import LogoShowcase from "../components/LogoShowcase";
import PageGallery from "../components/PageGallery";
import SmartVideo from "../components/SmartVideo";
import { clips, pageGalleries } from "../data/content";
import { useQuote } from "../context/QuoteContext";
import "./InnerPages.css";

const values = [
  {
    icon: Target,
    title: "Clarity First",
    text: "Every page has one job — attract the right clients and make the next step obvious.",
  },
  {
    icon: Rocket,
    title: "Speed Without Compromise",
    text: "We launch in days because our process is sharp — not because we cut corners.",
  },
  {
    icon: Users,
    title: "Built Around Your Brand",
    text: "Templates are a starting point. Your colours, voice, and offer shape the final site.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership Mindset",
    text: "We treat every project like a long-term relationship, not a one-off transaction.",
  },
];

export default function About() {
  const { openQuote } = useQuote();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--blue)" }}>
            About Us
          </p>
          <h1>AutoMexa</h1>
          <p>
            A SaaS and AI automation company — we design premium websites, build
            custom CRM apps, and integrate intelligent automation that converts.
          </p>
        </div>
      </section>

      <PageGallery
        title="Inside the AutoMexa studio"
        subtitle="People, process, and spaces that shape every launch — not recycled landing-page stock."
        images={pageGalleries.about}
      />

      <section className="section">
        <div className="container about-story">
          <div className="about-story__media">
            <SmartVideo
              src={clips.teamMeeting}
              poster="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=90&fm=jpg"
            />
          </div>
          <div>
            <p className="section-label">Our Story</p>
            <h2 className="section-title">Design that sells. Delivery that keeps pace.</h2>
            <p className="section-lead" style={{ maxWidth: "none" }}>
              AutoMexa was built for founders and growing companies who need a serious
              digital backbone — without waiting months or paying agency markups. We are
              specialists in AI automation, system integrations, and website design: we
              connect your tools, automate your workflows with AI agents and chatbots,
              and ship secure, conversion-led websites and CRM apps in days. Every build
              is security-hardened from day one, so you scale with confidence.
            </p>
          </div>
        </div>
      </section>

      <LogoShowcase />

      <section className="section values-section">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">What Drives Us</p>
            <h2 className="section-title" style={{ maxWidth: "16ch", marginInline: "auto" }}>
              Principles behind every launch
            </h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.article
                key={v.title}
                className="value-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <v.icon size={28} color="#2563EB" />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Let us build your next website</h2>
            <p>Share your brief and get a free, no-pressure quote.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openQuote}>
            Get Free Quote
          </button>
        </div>
      </section>
    </main>
  );
}
