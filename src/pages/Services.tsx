import { motion } from "framer-motion";
import PageGallery from "../components/PageGallery";
import SafeImage from "../components/SafeImage";
import { pageGalleries, services } from "../data/content";
import { useQuote } from "../context/QuoteContext";
import "./InnerPages.css";

export default function Services() {
  const { openQuote } = useQuote();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--blue)" }}>
            Our Services
          </p>
          <h1>Everything you need to grow online</h1>
          <p>
            Professional Website Design, AI Automation, E-commerce, CRM Systems and
            Business Solutions for Companies Worldwide.
          </p>
        </div>
      </section>

      <PageGallery
        title="Services brought to life"
        subtitle="Each frame maps to a capability we deliver — websites, automation, commerce, and CRM."
        images={pageGalleries.services}
      />

      <section className="section">
        <div className="container services-list">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className={`service-row ${i % 2 === 1 ? "service-row--reverse" : ""}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="service-row__media">
                <SafeImage src={service.image} alt={service.title} />
              </div>
              <div className="service-row__body">
                <span className="service-index">0{i + 1}</span>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <button type="button" className="btn btn-secondary" onClick={openQuote}>
                  Request This Service
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Not sure which package fits?</h2>
            <p>Tell us your goals — we will recommend the right plan.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openQuote}>
            Get Free Quote
          </button>
        </div>
      </section>
    </main>
  );
}
