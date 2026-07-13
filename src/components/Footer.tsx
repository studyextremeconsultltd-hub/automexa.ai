import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { brand, navLinks } from "../data/content";
import { useQuote } from "../context/QuoteContext";

export default function Footer() {
  const { openQuote } = useQuote();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo variant="light" />
            <p>
              SaaS & AI automation company — intelligent chatbots, system
              integrations, high-performance websites, e-commerce and custom CRM
              apps for companies worldwide. Delivered in days, secured from day one.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/services">AI Automation & Chatbots</Link>
            <Link to="/services">AI Integrations</Link>
            <Link to="/services">Website Design</Link>
            <Link to="/services">CRM & SaaS Platforms</Link>
            <Link to="/services">E-commerce</Link>
            <button
              type="button"
              onClick={openQuote}
              style={{
                display: "block",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.65)",
                padding: "0.35rem 0",
                fontSize: "0.92rem",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Get Free Quote
            </button>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
              Serving clients across the UK & worldwide
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
              Starter from £100 · Launch within 3 days
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AutoMexa. All rights reserved.</span>
          <span>Professional Website Design · AI Automation · Business Solutions</span>
        </div>
      </div>
    </footer>
  );
}
