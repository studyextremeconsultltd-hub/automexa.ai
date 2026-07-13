import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import HighlightSlider from "../components/HighlightSlider";
import MotionGallery from "../components/MotionGallery";
import { FeaturedWorkCard } from "../components/PortfolioCard";
import SafeImage from "../components/SafeImage";
import SocialLinks from "../components/SocialLinks";
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
  const deliverLoop = [...deliverBlocks, ...deliverBlocks];

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
              Small and medium scale enterprises for business automation and website
              development — plus professional design, AI automation, e-commerce, CRM
              systems and business solutions for companies worldwide.
            </p>
          </div>
        </div>

        <div className="deliver-rail" aria-label="What we deliver">
          <div className="deliver-rail__track">
            {deliverLoop.map((block, i) => (
              <article
                key={`${block.title}-${i}`}
                className={`deliver-slide deliver-slide--${block.tone}`}
              >
                <SafeImage src={block.image} alt="" className="deliver-slide__bg" />
                <div className="deliver-slide__veil" />
                <div className="deliver-slide__body">
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section work-section--stage" id="work">
        <div className="container">
          <div className="section-head center work-section__head">
            <p className="section-label">Featured Work</p>
            <h2 className="section-title" style={{ maxWidth: "18ch", marginInline: "auto" }}>
              Websites We Have Built
            </h2>
            <p className="section-lead" style={{ marginInline: "auto" }}>
              Full-page previews that rotate and scroll — see the complete build at a glance.
            </p>
          </div>
          <div className="featured-work-grid">
            {projects.map((project, i) => (
              <FeaturedWorkCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section process-section--luma">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">How Ordering Us</p>
            <h2 className="section-title" style={{ maxWidth: "20ch", marginInline: "auto" }}>
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

      <section className="section pricing-section pricing-section--luma" id="pricing">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Our Pricing</p>
            <h2 className="section-title" style={{ maxWidth: "14ch", marginInline: "auto" }}>
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
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Brand Standard</p>
            <h2 className="section-title" style={{ maxWidth: "16ch", marginInline: "auto" }}>
              Designed to the level of the best
            </h2>
          </div>
          <div className="trust-row">
            {trustedCompanies.map((c, i) => (
              <div className={`trust-chip trust-chip--${i % 5}`} key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="social-band">
        <div className="container social-band__inner">
          <div>
            <p className="section-label">Connect With Us</p>
            <h2>Follow Automexa on social</h2>
            <p>Facebook · TikTok · Instagram · YouTube · LinkedIn</p>
          </div>
          <SocialLinks variant="icons" />
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
