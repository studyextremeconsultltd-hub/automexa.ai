import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import HighlightSlider from "../components/HighlightSlider";
import MotionGallery from "../components/MotionGallery";
import PortfolioCard from "../components/PortfolioCard";
import {
  deliverBlocks,
  pricingPlans,
  processSteps,
  projects,
  trustedCompanies,
} from "../data/content";
import { useQuote } from "../context/QuoteContext";
import "./Home.css";

export default function Home() {
  const { openQuote } = useQuote();

  return (
    <main>
      <HeroSlider />
      <HighlightSlider />
      <MotionGallery />

      <section className="section intro-section">
        <div className="container">
          <div className="section-head">
            <p className="section-label">What We Deliver</p>
            <h2 className="section-title">
              Build High-Performance Websites That Grow Your Business
            </h2>
            <p className="section-lead">
              Professional Website Design, AI Automation, E-commerce, CRM
              Systems and Business Solutions for Companies Worldwide.
            </p>
          </div>
          <div className="deliver-grid">
            {deliverBlocks.map((block, i) => (
              <motion.article
                key={block.title}
                className={`deliver-card deliver-card--${block.tone}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="container work-layout">
          <aside className="side-panel side-panel--teal">
            <p>Portfolio</p>
            <h3>Real sites. Live motion.</h3>
            <span>Watch each project scroll — then open the live site.</span>
          </aside>
          <div>
            <div className="section-head">
              <p className="section-label section-label--catchy">Featured Work</p>
              <h2 className="section-title">Websites We Have Built</h2>
            </div>
            {projects.map((project, i) => (
              <PortfolioCard key={project.id} project={project} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-head center">
            <p className="section-label section-label--catchy">How Ordering Us</p>
            <h2 className="section-title" style={{ maxWidth: "22ch", marginInline: "auto" }}>
              Complete the process within{" "}
              <strong className="accent-strong">three days</strong>
            </h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <motion.article
                key={step.step}
                className={`process-card process-card--${i} process-card--glow`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="process-num">Step-{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Our Pricing</p>
            <h2 className="section-title" style={{ maxWidth: "16ch", marginInline: "auto" }}>
              Clear packages. Bold value.
            </h2>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, i) => (
              <motion.article
                key={plan.id}
                className={`price-card price-card--${plan.theme} ${
                  plan.featured ? "price-card--featured" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.featured && <span className="price-badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <div className="price-amount">
                  <span className="currency">{plan.currency}</span>
                  <span className="value">{plan.price}</span>
                </div>
                <p className="price-delivery">{plan.delivery}</p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-order" onClick={openQuote}>
                  Order Now
                  <ArrowRight size={16} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trusted-section">
        <div className="container trusted-layout">
          <aside className="side-panel side-panel--amber">
            <p>Trusted by</p>
            <h3>Inspired by UK leaders</h3>
            <span>Retail · Finance · Travel · Media · Tech</span>
          </aside>
          <div>
            <div className="section-head">
              <p className="section-label section-label--catchy">Brand Standard</p>
              <h2 className="section-title">Designed to the level of the best</h2>
              <p className="section-lead">
                We design to the standard of leading brands across every major UK category.
              </p>
            </div>
            <div className="marquee">
              <div className="marquee-track">
                {[...trustedCompanies, ...trustedCompanies].map((c, i) => (
                  <div className={`trust-chip trust-chip--${i % 4}`} key={`${c.name}-${i}`}>
                    <strong>{c.name}</strong>
                    <span>{c.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Ready to launch your website?</h2>
            <p>Get a free quote today — tell us your vision and we will make it live.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openQuote}>
            Get Free Quote
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
