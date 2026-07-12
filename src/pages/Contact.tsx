import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import PageGallery from "../components/PageGallery";
import { brand, websiteTypes } from "../data/content";
import "./InnerPages.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const type = String(form.get("type") || "");
    const queries = String(form.get("queries") || "");
    const subject = encodeURIComponent(`Contact — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nWebsite Type: ${type}\n\nQueries:\n${queries}`,
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--teal)" }}>
            Contact Us
          </p>
          <h1>Let us talk about your website</h1>
          <p>
            Share your name, phone, project type, and questions — we will get back
            with a clear next step.
          </p>
        </div>
      </section>

      <PageGallery title="See the quality before you order" />

      <section className="section contact-section">
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Reach Automexa</h2>
            <p>
              Prefer a quick chat? Email or call us — or send the form and we will
              prepare your free quote.
            </p>
            <ul className="contact-details">
              <li>
                <Mail size={20} />
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>
                <Phone size={20} />
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
              </li>
              <li>
                <MapPin size={20} />
                <span>United Kingdom · Serving clients worldwide</span>
              </li>
            </ul>
            <div className="contact-social">
              <p className="section-label section-label--catchy">Follow Us</p>
              <div className="contact-social__row">
                <a href={brand.tiktok} target="_blank" rel="noreferrer" className="contact-social__btn">
                  TikTok
                </a>
                <a href={brand.facebook} target="_blank" rel="noreferrer" className="contact-social__btn">
                  Facebook
                </a>
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="contact-social__btn">
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="modal-accent" style={{ borderRadius: "24px 24px 0 0" }} />
            {sent ? (
              <div className="form-success">
                <CheckCircle2 size={52} color="#00c2a8" />
                <h3>Message Ready</h3>
                <p className="modal-sub">Your email app should open with your details filled in.</p>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <p className="modal-sub">Fill in the details below — we will reply with a free quote.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input id="contact-name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input id="contact-phone" name="phone" type="tel" required placeholder="+44..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-type">Type of Website</label>
                    <select id="contact-type" name="type" required defaultValue="">
                      <option value="" disabled>
                        Select website type
                      </option>
                      {websiteTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-queries">Your Queries</label>
                    <textarea
                      id="contact-queries"
                      name="queries"
                      required
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
