/** Automexa payments — Stripe Checkout (dynamic, like Rose Empire). */

import { pricingPlans } from "./content";

const env = (key: string, fallback = "") =>
  (import.meta.env[key] as string | undefined)?.trim() || fallback;

/** Optional override if you host checkout API elsewhere (Cloudflare Worker, etc.) */
export const checkoutApiBase = env("VITE_CHECKOUT_API_URL", "").replace(/\/$/, "");

export type CheckoutItem = {
  productId?: string;
  name?: string;
  /** Amount in pence (e.g. 10000 = £100) */
  unitAmount?: number;
  quantity?: number;
};

export async function fetchCheckoutConfig(): Promise<{
  enabled: boolean;
  message: string;
  catalog?: { id: string; name: string; price: number }[];
}> {
  const url = `${checkoutApiBase}/api/checkout/config`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Checkout API unavailable");
  return res.json();
}

export async function startStripeCheckout(opts: {
  productId?: string;
  items?: CheckoutItem[];
  customerEmail: string;
}): Promise<string> {
  const url = `${checkoutApiBase}/api/checkout/create`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: opts.productId,
      items: opts.items,
      customerEmail: opts.customerEmail,
      domain: window.location.origin,
    }),
  });
  const data = await res.json();
  if (!res.ok || data.status !== "success" || !data.url) {
    throw new Error(data.message || "Could not start Stripe checkout.");
  }
  return data.url as string;
}

export function openPayHub(planId?: string) {
  const base = `${window.location.origin}/pay`;
  const url = planId ? `${base}?plan=${encodeURIComponent(planId)}` : base;
  const width = 580;
  const height = 860;
  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
  const features = [
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
  const win = window.open(url, "Automexa_Pay_Now", features);
  if (!win) window.open(url, "_blank", "noopener,noreferrer");
  else win.focus();
}

export function openStripeDeposit(planId?: string) {
  openPayHub(planId);
}

export function planLabel(planId?: string | null) {
  return pricingPlans.find((p) => p.id === planId)?.name;
}
