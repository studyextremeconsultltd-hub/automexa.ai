import PageGallery from "../components/PageGallery";
import PortfolioCard from "../components/PortfolioCard";
import { projects } from "../data/content";
import { useQuote } from "../context/QuoteContext";
import "./InnerPages.css";

export default function Portfolio() {
  const { openQuote } = useQuote();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--teal)" }}>
            Portfolio
          </p>
          <h1>Work that speaks for itself</h1>
          <p>
            Explore live websites we have delivered — open each project and see the
            quality firsthand.
          </p>
        </div>
      </section>

      <PageGallery title="Crafted visuals behind every Automexa launch" />

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          {projects.map((project, i) => (
            <PortfolioCard key={project.id} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Want results like these?</h2>
            <p>Start with a free quote — we can launch within three days.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openQuote}>
            Get Free Quote
          </button>
        </div>
      </section>
    </main>
  );
}
