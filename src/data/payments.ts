/** UK payment providers — set live links in `.env.local` */

const env = (key: string, fallback = "") =>
  (import.meta.env[key] as string | undefined)?.trim() || fallback;

export const paymentConfig = {
  stripeDeposit: env(
    "VITE_STRIPE_PAYMENT_LINK",
    "https://dashboard.stripe.com/login",
  ),
  stripeByPlan: {
    starter: env("VITE_STRIPE_LINK_STARTER", env("VITE_STRIPE_PAYMENT_LINK", "https://dashboard.stripe.com/login")),
    standard: env("VITE_STRIPE_LINK_STANDARD", env("VITE_STRIPE_PAYMENT_LINK", "https://dashboard.stripe.com/login")),
    custom: env("VITE_STRIPE_LINK_CUSTOM", env("VITE_STRIPE_PAYMENT_LINK", "https://dashboard.stripe.com/login")),
  } as Record<string, string>,
  paypal: env("VITE_PAYPAL_LINK", "https://www.paypal.com/uk/home"),
  klarna: env("VITE_KLARNA_LINK", "https://www.klarna.com/uk/"),
  clearpay: env("VITE_CLEARPAY_LINK", "https://www.clearpay.co.uk/en-GB"),
  applePay: env("VITE_APPLE_PAY_LINK", env("VITE_STRIPE_PAYMENT_LINK", "https://dashboard.stripe.com/login")),
  googlePay: env("VITE_GOOGLE_PAY_LINK", env("VITE_STRIPE_PAYMENT_LINK", "https://dashboard.stripe.com/login")),
};

export type PaymentMethodId =
  | "stripe"
  | "paypal"
  | "klarna"
  | "clearpay"
  | "applepay"
  | "googlepay";

export const paymentMethods: {
  id: PaymentMethodId;
  name: string;
  blurb: string;
  url: string;
  accent: string;
  primary?: boolean;
}[] = [
  {
    id: "stripe",
    name: "Stripe",
    blurb: "Primary account · Cards, Apple Pay & Google Pay",
    url: paymentConfig.stripeDeposit,
    accent: "#635bff",
    primary: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    blurb: "PayPal balance or linked card",
    url: paymentConfig.paypal,
    accent: "#003087",
  },
  {
    id: "klarna",
    name: "Klarna",
    blurb: "Pay in 3 · Popular in the UK",
    url: paymentConfig.klarna,
    accent: "#ffb3c7",
  },
  {
    id: "clearpay",
    name: "Clearpay",
    blurb: "Interest-free instalments",
    url: paymentConfig.clearpay,
    accent: "#000000",
  },
  {
    id: "applepay",
    name: "Apple Pay",
    blurb: "Checkout via Stripe",
    url: paymentConfig.applePay,
    accent: "#111111",
  },
  {
    id: "googlepay",
    name: "Google Pay",
    blurb: "Checkout via Stripe",
    url: paymentConfig.googlePay,
    accent: "#4285F4",
  },
];

function popupFeatures(width = 560, height = 820) {
  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
  return [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "menubar=no",
    "toolbar=no",
    "location=yes",
    "status=yes",
    "resizable=yes",
    "scrollbars=yes",
  ].join(",");
}

/** Opens provider URL (Stripe / PayPal / etc.) in a dedicated window */
export function openPaymentWindow(url: string, title = "Automexa Pay") {
  const win = window.open(url, title.replace(/\s+/g, "_"), popupFeatures());
  if (!win) window.open(url, "_blank", "noopener,noreferrer");
  else win.focus();
}

/** Opens Automexa Pay Hub (all methods, Stripe primary) in a new window */
export function openPayHub(planId?: string) {
  const base = `${window.location.origin}/pay`;
  const url = planId ? `${base}?plan=${encodeURIComponent(planId)}` : base;
  const win = window.open(url, "Automexa_Pay_Now", popupFeatures(580, 860));
  if (!win) window.open(url, "_blank", "noopener,noreferrer");
  else win.focus();
}

export function openStripeDeposit(planId?: string) {
  openPayHub(planId);
}

export function stripeUrlForPlan(planId?: string) {
  return (planId && paymentConfig.stripeByPlan[planId]) || paymentConfig.stripeDeposit;
}
