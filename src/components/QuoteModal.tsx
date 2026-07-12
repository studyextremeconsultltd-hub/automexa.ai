import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { brand, websiteTypes } from "../data/content";
import { useQuote } from "../context/QuoteContext";

export default function QuoteModal() {
  const { isOpen, closeQuote } = useQuote();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const type = String(form.get("type") || "");
    const queries = String(form.get("queries") || "");
    const subject = encodeURIComponent(`Free Quote Request — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nWebsite Type: ${type}\n\nQueries:\n${queries}`,
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  function handleClose() {
    closeQuote();
    setTimeout(() => setSent(false), 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-accent" />
            <button type="button" className="modal-close" onClick={handleClose} aria-label="Close">
              <X size={18} />
            </button>

            {sent ? (
              <div className="form-success">
                <CheckCircle2 size={52} color="#00c2a8" />
                <h3>Request Ready to Send</h3>
                <p className="modal-sub">
                  Your email client should open with your details. We typically reply within a few hours.
                </p>
                <button type="button" className="btn btn-primary" onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 id="quote-title">Get a Free Quote</h2>
                <p className="modal-sub">
                  Tell us what you need — we will craft a clear plan and price with no obligation.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="quote-name">Full Name</label>
                    <input id="quote-name" name="name" type="text" placeholder="Jane Smith" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote-phone">Phone Number</label>
                    <input id="quote-phone" name="phone" type="tel" placeholder="+44 7700 900123" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote-type">Type of Website</label>
                    <select id="quote-type" name="type" required defaultValue="">
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
                    <label htmlFor="quote-queries">Your Queries</label>
                    <textarea
                      id="quote-queries"
                      name="queries"
                      placeholder="Share your goals, timeline, and any must-have features..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                    Send Free Quote Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
