import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck, ExternalLink, Sparkles, Lock } from "lucide-react";
import {
  openPaymentWindow,
  paymentMethods,
  stripeUrlForPlan,
} from "../data/payments";
import { mosaicPool } from "../data/content";
import "./PaymentHub.css";

const bgPool = [
  ...mosaicPool,
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90&fm=jpg",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=90&fm=jpg",
];

export default function PaymentHub() {
  const [params] = useSearchParams();
  const planId = params.get("plan") || undefined;
  const stripeUrl = useMemo(() => stripeUrlForPlan(planId), [planId]);
  const others = paymentMethods.filter((m) => !m.primary);
  const stripe = paymentMethods.find((m) => m.primary)!;
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBgIndex((i) => (i + 1) % bgPool.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pay-hub">
      <AnimatePresence mode="wait">
        <motion.div
          key={bgPool[bgIndex]}
          className="pay-hub__bg"
          style={{ backgroundImage: `url(${bgPool[bgIndex]})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="pay-hub__veil" />
      <div className="pay-hub__grain" />

      <div className="pay-hub__panel">
        <header className="pay-hub__top">
          <p className="pay-hub__eyebrow">
            <Sparkles size={14} />
            Automexa Secure Checkout
          </p>
          <h1>
            Pay <span>Now</span>
          </h1>
          <p className="pay-hub__sub">
            Choose your method — Stripe is our primary account for deposits.
          </p>
        </header>

        <button
          type="button"
          className="pay-hub__stripe"
          onClick={() => openPaymentWindow(stripeUrl, "Stripe — Automexa")}
        >
          <span className="pay-hub__stripe-badge">Primary · Stripe</span>
          <strong>Pay with Stripe</strong>
          <em>{stripe.blurb}</em>
          <span className="pay-hub__stripe-cta">
            Continue to official Stripe
            <ExternalLink size={16} />
          </span>
        </button>

        <p className="pay-hub__kicker">More UK payment options</p>
        <div className="pay-hub__list">
          {others.map((method, i) => (
            <motion.button
              key={method.id}
              type="button"
              className={`pay-hub__row pay-hub__row--${method.id}`}
              style={{ ["--pay-accent" as string]: method.accent }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              onClick={() => openPaymentWindow(method.url, `${method.name} — Automexa`)}
            >
              <span className="pay-hub__row-left">
                <span className="pay-hub__name">{method.name}</span>
                <span className="pay-hub__blurb">{method.blurb}</span>
              </span>
              <span className="pay-hub__go">
                Pay
                <ExternalLink size={14} />
              </span>
            </motion.button>
          ))}
        </div>

        <p className="pay-hub__foot">
          <Lock size={14} />
          <ShieldCheck size={14} />
          Official provider windows · Encrypted checkout
        </p>
      </div>
    </div>
  );
}
