import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ExpertiseShowcase from "../components/ExpertiseShowcase";
import HighlightSlider from "../components/HighlightSlider";
import MotionGallery from "../components/MotionGallery";
import { FeaturedWorkCard } from "../components/PortfolioCard";
import SmartVideo from "../components/SmartVideo";
import SocialLinks from "../components/SocialLinks";
import {
  deliverBlocks,
  pricingPlans,
  processSteps,
  projects,
} from "../data/content";
import { useQuote } from "../context/QuoteContext";
import { openPayHub } from "../data/payments";
import { useLiteMedia } from "../hooks/useLiteMedia";
import "./Home.css";

/** Below-fold home content — code-split so first paint stays light for PageSpeed. */
export default function HomeRest() {
  const { openQuote } = useQuote();
  const lite = useLiteMedia();

  return (
    <>
      <HighlightSlider />
      <MotionGallery />

      <section className="section cv-auto" style={{ paddingBlock: "2.5rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="section-label">Free · 2 minutes</p>
          <h2 className="section-title" style={{ maxWidth: "18ch", marginInline: "auto" }}>
            Score your website & Google Maps
          </h2>
          <p className="section-lead" style={{ marginInline: "auto" }}>
            Get a score out of 100. Interested traders raise their hand — we help you close.
          </p>
          <Link
            to="/scorecard"
            className="btn btn-primary"
            style={{ marginTop: "1rem", display: "inline-flex" }}
          >
            Take the free scorecard <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section intro-section cv-auto">
        <div className="container">
          <div className="section-head">
            <p className="section-label">What We Deliver</p>
            <h2 className="section-title">
              AI Automation, SaaS Platforms & Websites That Grow Your Business
            </h2>
            <p className="section-lead" style={{ fontWeight: 700 }}>
              AutoMexa is a SaaS and AI automation company — we design professional
              websites, build custom CRM apps, and integrate intelligent automation
              for businesses worldwide. One partner, end to end.
            </p>
          </div>
        </div>

        <div className="deliver-rail" aria-label="What we deliver">
          <div className="deliver-rail__track">
            {(lite ? deliverBlocks : [...deliverBlocks, ...deliverBlocks]).map((block, i) => (
              <article
                key={`${block.title}-${i}`}
                className={`deliver-slide deliver-slide--${block.tone}`}
              >
                {lite ? (
                  <img
                    src={block.image}
                    alt=""
                    className="deliver-slide__bg"
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={480}
                  />
                ) : (
                  <SmartVideo
                    src={block.video}
                    poster={block.image}
                    className="deliver-slide__bg"
                  />
                )}
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

      <ExpertiseShowcase />

      <section className="section work-section work-section--stage cv-auto" id="work">
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
            {projects.map((project) => (
              <FeaturedWorkCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section process-section--luma cv-auto">
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
              <article
                key={step.step}
                className={`process-card process-card--${i} process-card--glow`}
              >
                <span className="process-num">Step-{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section packages-section cv-auto" id="packages">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Our Packages</p>
            <h2 className="section-title" style={{ maxWidth: "16ch", marginInline: "auto" }}>
              Choose the package that fits your business
            </h2>
            <p className="section-lead" style={{ marginInline: "auto", fontWeight: 700 }}>
              Clear deliverables, fast launch, and pricing built for SMEs.
            </p>
          </div>
          <div className="packages-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`package-card package-card--${plan.theme} ${
                  plan.featured ? "package-card--featured" : ""
                }`}
              >
                {plan.featured && <span className="package-badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <p className="package-price">
                  <span>{plan.currency}</span> {plan.price}
                </p>
                <p className="package-delivery">{plan.delivery}</p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-order"
                  onClick={() => openPayHub(plan.id)}
                >
                  Order Now
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="social-band cv-auto">
        <div className="container social-band__inner">
          <div>
            <p className="section-label">Connect With Us</p>
            <h2>Follow AutoMexa on social</h2>
            <p>Facebook · TikTok · Instagram · YouTube · LinkedIn</p>
          </div>
          <SocialLinks variant="icons" />
        </div>
      </section>

      <section className="cta-band cv-auto">
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
    </>
  );
}
