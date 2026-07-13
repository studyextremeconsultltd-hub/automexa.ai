import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import PageGallery from "../components/PageGallery";
import SocialLinks from "../components/SocialLinks";
import { brand, pageGalleries, websiteTypes } from "../data/content";
import { sanitizeField } from "../utils/sanitize";
import "./InnerPages.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = sanitizeField(form.get("name"), 100);
    const phone = sanitizeField(form.get("phone"), 30);
    const type = sanitizeField(form.get("type"), 60);
    const queries = sanitizeField(form.get("queries"), 1000);
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
          <p className="section-label" style={{ color: "var(--blue)" }}>
            Contact Us
          </p>
          <h1>Let us talk about your website</h1>
          <p>
            Share your name, phone, project type, and questions — we will get back
            with a clear next step.
          </p>
        </div>
      </section>

      <PageGallery
        title="Start a conversation with confidence"
        subtitle="Clear channels, fast replies, and a briefing experience built for decision-makers."
        images={pageGalleries.contact}
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Reach AutoMexa</h2>
            <p>
              Prefer a quick chat? Email or call us — or send the form and we will
              prepare your free quote.
            </p>

            <div className="contact-highlights">
              <a className="contact-highlight contact-highlight--mail" href={`mailto:${brand.email}`}>
                <span className="contact-highlight__icon">
                  <Mail size={22} />
                </span>
                <span>
                  <small>Email</small>
                  <strong>{brand.email}</strong>
                </span>
              </a>
              <a
                className="contact-highlight contact-highlight--phone"
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
              >
                <span className="contact-highlight__icon">
                  <Phone size={22} />
                </span>
                <span>
                  <small>Phone / WhatsApp</small>
                  <strong>{brand.phone}</strong>
                </span>
              </a>
              <div className="contact-highlight contact-highlight--place">
                <span className="contact-highlight__icon">
                  <MapPin size={22} />
                </span>
                <span>
                  <small>Location</small>
                  <strong>United Kingdom · Worldwide</strong>
                </span>
              </div>
            </div>

            <div className="contact-social">
              <p className="section-label">Follow Us</p>
              <SocialLinks variant="pills" />
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
                <CheckCircle2 size={52} color="#2563EB" />
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
                    <input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Your name"
                      maxLength={100}
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+44..."
                      maxLength={30}
                      pattern="[+0-9()\-\s]{7,30}"
                      title="Please enter a valid phone number"
                      autoComplete="tel"
                    />
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
                      maxLength={1000}
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
