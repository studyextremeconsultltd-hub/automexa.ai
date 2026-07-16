import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { mosaicPool, pricingPlans } from "../data/content";
import { fetchCheckoutConfig, startStripeCheckout } from "../data/payments";
import "./PaymentHub.css";

const bgPool = [
  ...mosaicPool,
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90&fm=jpg",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=90&fm=jpg",
];

export default function PaymentHub() {
  const [params] = useSearchParams();
  const checkoutState = params.get("checkout");
  const initialPlan = params.get("plan") || pricingPlans.find((p) => p.featured)?.id || pricingPlans[0]?.id;

  const [planId, setPlanId] = useState(initialPlan || "standard");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [stripeReady, setStripeReady] = useState<boolean | null>(null);
  const [setupMessage, setSetupMessage] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const selected = useMemo(
    () => pricingPlans.find((p) => p.id === planId) || pricingPlans[0],
    [planId],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setBgIndex((i) => (i + 1) % bgPool.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchCheckoutConfig()
      .then((cfg) => {
        if (cancelled) return;
        setStripeReady(cfg.enabled);
        setSetupMessage(cfg.message || "");
      })
      .catch(() => {
        if (cancelled) return;
        setStripeReady(false);
        setSetupMessage(
          "Checkout API is offline. Run npm run dev (starts Vite + Stripe checkout server).",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function pay() {
    setError("");
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email so Stripe can send your receipt.");
      return;
    }
    if (!selected) {
      setError("Choose a package.");
      return;
    }
    setBusy(true);
    try {
      const url = await startStripeCheckout({
        productId: selected.id,
        customerEmail: email.trim(),
      });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  if (checkoutState === "success") {
    return (
      <div className="pay-hub">
        <div className="pay-hub__veil" />
        <div className="pay-hub__panel pay-hub__panel--status">
          <CheckCircle2 size={40} color="#4ade80" />
          <h1>Payment received</h1>
          <p className="pay-hub__sub">
            Thanks — Stripe confirmed your payment. We’ll follow up by email shortly.
          </p>
        </div>
      </div>
    );
  }

  if (checkoutState === "cancel") {
    return (
      <div className="pay-hub">
        <div className="pay-hub__veil" />
        <div className="pay-hub__panel pay-hub__panel--status">
          <AlertCircle size={40} color="#fde68a" />
          <h1>Checkout cancelled</h1>
          <p className="pay-hub__sub">No charge was made. Pick a package below when you’re ready.</p>
          <button
            type="button"
            className="pay-hub__stripe"
            onClick={() => {
              window.history.replaceState({}, "", "/pay");
              window.location.reload();
            }}
          >
            <strong>Try again</strong>
          </button>
        </div>
      </div>
    );
  }

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
            Choose a package — Stripe handles cards, Apple Pay & Google Pay.
          </p>
        </header>

        <div className="pay-hub__plans" role="radiogroup" aria-label="Package">
          {pricingPlans.map((plan) => {
            const active = plan.id === planId;
            return (
              <button
                key={plan.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`pay-hub__plan${active ? " is-active" : ""}`}
                onClick={() => setPlanId(plan.id)}
              >
                <span className="pay-hub__plan-name">{plan.name}</span>
                <span className="pay-hub__plan-price">
                  £{plan.price}
                </span>
              </button>
            );
          })}
        </div>

        <label className="pay-hub__field">
          <span>Email for receipt</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
          />
        </label>

        {stripeReady === false && (
          <p className="pay-hub__banner pay-hub__banner--warn">{setupMessage}</p>
        )}
        {error && <p className="pay-hub__banner pay-hub__banner--error">{error}</p>}

        <button
          type="button"
          className="pay-hub__stripe"
          disabled={busy || stripeReady === false}
          onClick={pay}
        >
          <span className="pay-hub__stripe-badge">Primary · Stripe</span>
          <strong>
            {busy ? "Opening Stripe…" : `Pay £${selected?.price} securely`}
          </strong>
          <em>
            {selected?.name} · Cards, Apple Pay & Google Pay
          </em>
          <span className="pay-hub__stripe-cta">
            {busy ? (
              <>
                <Loader2 size={16} className="pay-hub__spin" /> Preparing checkout
              </>
            ) : (
              "Continue to official Stripe"
            )}
          </span>
        </button>

        <p className="pay-hub__foot">
          <Lock size={14} />
          <ShieldCheck size={14} />
          Encrypted Stripe Checkout · No card details touch our site
        </p>
      </div>
    </div>
  );
}
