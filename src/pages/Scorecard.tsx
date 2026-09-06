import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle, CreditCard } from "lucide-react";
import { brand } from "../data/content";
import { openPayHub } from "../data/payments";
import { sanitizeField } from "../utils/sanitize";
import { useQuote } from "../context/QuoteContext";
import "./InnerPages.css";
import "./Scorecard.css";

type Q = { id: string; label: string; yesPts: number; hint?: string };

const QUESTIONS: Q[] = [
  { id: "website", label: "Do you have a live business website?", yesPts: 20, hint: "Not Facebook / Instagram alone" },
  { id: "mobile", label: "Does it look clear and fast on a phone?", yesPts: 15 },
  { id: "clickcall", label: "Can customers tap to call or WhatsApp in one tap?", yesPts: 15 },
  { id: "maps", label: "Do you show up on Google Maps / Business Profile?", yesPts: 20 },
  { id: "reviews", label: "Do you have recent Google reviews (last 90 days)?", yesPts: 10 },
  { id: "photos", label: "Are real job photos on your site or Maps profile?", yesPts: 10 },
  { id: "quote", label: "Can someone request a quote in under 30 seconds?", yesPts: 10 },
];

export default function Scorecard() {
  const { openQuote } = useQuote();
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, null])),
  );
  const [step, setStep] = useState<"quiz" | "details" | "done">("quiz");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [trade, setTrade] = useState("");

  const score = useMemo(() => {
    return QUESTIONS.reduce((sum, q) => {
      if (answers[q.id] === true) return sum + q.yesPts;
      return sum;
    }, 0);
  }, [answers]);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null);

  const band =
    score >= 80 ? "strong" : score >= 50 ? "okay" : "weak";

  const bandCopy =
    band === "strong"
      ? "Solid foundation — we can still tighten conversion and Maps."
      : band === "okay"
        ? "You're leaving jobs on the table. A Week-1 site usually closes that gap."
        : "Most new UK trades score here. A £300 Week-1 kit gets you live fast.";

  function setAnswer(id: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function goDetails() {
    if (!allAnswered) return;
    setStep("details");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const n = sanitizeField(name, 100);
    const p = sanitizeField(phone, 30);
    const b = sanitizeField(business, 120);
    const t = sanitizeField(trade, 60);
    const lines = QUESTIONS.map((q) => {
      const a = answers[q.id] === true ? "YES" : "NO";
      return `- ${q.label}: ${a}`;
    }).join("\n");
    const subject = encodeURIComponent(`Website Scorecard ${score}/100 — ${n}`);
    const body = encodeURIComponent(
      `WARM LEAD — Website/Maps Scorecard\n\nName: ${n}\nPhone: ${p}\nBusiness: ${b}\nTrade: ${t}\nScore: ${score}/100 (${band})\n\nAnswers:\n${lines}\n\nOffer: Week-1 website £300 / £100 deposit · GBP rescue available\nSource: automexa.co.uk/scorecard`,
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStep("done");
  }

  return (
    <main>
      <section className="page-hero scorecard-hero">
        <div className="container">
          <p className="section-label" style={{ color: "var(--blue)" }}>
            Free scorecard · 2 minutes
          </p>
          <h1>Is your trade business losing jobs online?</h1>
          <p>
            Answer 7 quick questions. Get a score out of 100 — then we only call if you want a
            clear fix. No spam lists.
          </p>
        </div>
      </section>

      <section className="section scorecard-section">
        <div className="container scorecard-wrap">
          {step === "quiz" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="scorecard-meter" aria-live="polite">
                <strong>{score}</strong>
                <span>/ 100</span>
              </div>
              <ul className="scorecard-qs">
                {QUESTIONS.map((q) => (
                  <li key={q.id} className="scorecard-q">
                    <div>
                      <p>{q.label}</p>
                      {q.hint ? <small>{q.hint}</small> : null}
                    </div>
                    <div className="scorecard-yesno">
                      <button
                        type="button"
                        className={answers[q.id] === true ? "is-on" : ""}
                        onClick={() => setAnswer(q.id, true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={answers[q.id] === false ? "is-on" : ""}
                        onClick={() => setAnswer(q.id, false)}
                      >
                        No
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!allAnswered}
                onClick={goDetails}
              >
                See my score <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`scorecard-result scorecard-result--${band}`}>
                <h2>
                  Your score: {score}/100
                </h2>
                <p>{bandCopy}</p>
              </div>
              <form className="scorecard-form" onSubmit={handleSubmit}>
                <p className="scorecard-form-lead">
                  Leave your details and we will email you the score + next step. Prefer WhatsApp?
                  Use the button after.
                </p>
                <div className="form-group">
                  <label htmlFor="sc-name">Your name</label>
                  <input
                    id="sc-name"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sc-phone">Phone / WhatsApp</label>
                  <input
                    id="sc-phone"
                    required
                    type="tel"
                    maxLength={30}
                    pattern="[+0-9()\-\s]{7,30}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sc-biz">Business name</label>
                  <input
                    id="sc-biz"
                    required
                    maxLength={120}
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sc-trade">Trade</label>
                  <input
                    id="sc-trade"
                    required
                    maxLength={60}
                    placeholder="Plumber, electrician, mechanic…"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send my score to Automexa <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              className="scorecard-done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={48} color="#2563EB" />
              <h2>Score ready — {score}/100</h2>
              <p>
                Your email client should open with the score. We treat this as a warm enquiry —
                reply on WhatsApp or book a deposit when you are ready.
              </p>
              <div className="scorecard-ctas">
                <a className="btn btn-primary" href={brand.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp us the score
                </a>
                <button type="button" className="btn" onClick={() => openPayHub("starter")}>
                  <CreditCard size={16} /> Pay £100 deposit
                </button>
                <button type="button" className="btn" onClick={openQuote}>
                  Request full quote
                </button>
              </div>
              <p className="scorecard-fine">
                Week-1 website from £300 · Standard plan £300 ·{" "}
                <Link to="/services">See services</Link>
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
