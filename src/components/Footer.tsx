import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { brand, navLinks } from "../data/content";
import { useQuote } from "../context/QuoteContext";

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.11v-3.55a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.29a8.2 8.2 0 0 0 4.76 1.52V7.36a4.85 4.85 0 0 1-1-.67z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4z" />
      <path d="M17.5 6.3a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
      <path d="M12 2.5c-2.6 0-2.9 0-3.9.1-2.6.1-4.4 1.9-4.5 4.5-.1 1-.1 1.3-.1 3.9s0 2.9.1 3.9c.1 2.6 1.9 4.4 4.5 4.5 1 .1 1.3.1 3.9.1s2.9 0 3.9-.1c2.6-.1 4.4-1.9 4.5-4.5.1-1 .1-1.3.1-3.9s0-2.9-.1-3.9c-.1-2.6-1.9-4.4-4.5-4.5-1-.1-1.3-.1-3.9-.1zm0 1.8c2.5 0 2.8 0 3.8.1 1.8.1 3 1.3 3.1 3.1.1 1 .1 1.2.1 3.7s0 2.7-.1 3.7c-.1 1.8-1.3 3-3.1 3.1-1 .1-1.2.1-3.8.1s-2.8 0-3.8-.1c-1.8-.1-3-1.3-3.1-3.1-.1-1-.1-1.2-.1-3.7s0-2.7.1-3.7c.1-1.8 1.3-3 3.1-3.1 1-.1 1.3-.1 3.8-.1z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.65 4.75 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8.5z" />
    </svg>
  );
}

export default function Footer() {
  const { openQuote } = useQuote();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-text">
              Auto<span>mexa</span>
            </div>
            <p>
              High-performance websites, AI automation, e-commerce and CRM
              systems for companies worldwide — delivered in days, not months.
            </p>
            <div className="social-row">
              <a href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href={brand.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <YouTubeIcon />
              </a>
              <a href={brand.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
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
            <Link to="/services">Website Design</Link>
            <Link to="/services">AI Automation</Link>
            <Link to="/services">E-commerce</Link>
            <Link to="/services">CRM Systems</Link>
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
          <span>© {new Date().getFullYear()} Automexa. All rights reserved.</span>
          <span>Professional Website Design · AI Automation · Business Solutions</span>
        </div>
      </div>
    </footer>
  );
}
