import LogoMark from "./LogoMark";
import "./LogoShowcase.css";

export default function LogoShowcase() {
  return (
    <section className="logo-showcase" aria-label="AutoMexa brand mark">
      <div className="container">
        <p className="section-label center">Brand Identity</p>
        <h2 className="section-title center">The Living Circuit</h2>
        <p className="logo-showcase__lead">
          A delta monogram traced by a comet of light — energy in constant motion,
          just like the automations we build.
        </p>

        <div className="logo-hero">
          <div className="logo-hero__stage">
            <div className="logo-hero__grid" aria-hidden />
            <div className="logo-hero__aura" aria-hidden />
            <LogoMark variant="signature" className="logo-hero__mark" />
          </div>
          <div className="logo-hero__word">
            Auto<span>Mexa</span>
          </div>
          <p className="logo-hero__tag">AI Automation · SaaS · Web Engineering</p>
        </div>
      </div>
    </section>
  );
}
