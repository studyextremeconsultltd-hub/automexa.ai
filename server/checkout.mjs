/**
 * Automexa — Stripe Checkout API (same pattern as Rose Empire).
 * Creates Checkout Sessions from cart/line items — no Payment Links needed.
 *
 * Env: STRIPE_SECRET_KEY, SITE_URL (optional)
 */

import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile() {
  const path = resolve(root, ".env");
  if (!existsSync(path)) return;
  const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    // Always prefer .env for Stripe keys so restarts pick up updates
    if (key.startsWith("STRIPE_") || !(key in process.env)) {
      process.env[key] = val.trim();
    }
  }
}

loadEnvFile();

const PORT = Number(process.env.CHECKOUT_PORT || 8787);
const HOST = process.env.CHECKOUT_HOST || "127.0.0.1";

/** Known packages — amounts in pence. Future products can also be sent as freeform items. */
export const CATALOG = {
  starter: { name: "Automexa Starter package", unitAmount: 10000 },
  standard: { name: "Automexa Standard package", unitAmount: 30000 },
  custom: { name: "Automexa Custom package", unitAmount: 50000 },
};

const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

function isPlaceholderKey(key) {
  return (
    !key ||
    !key.startsWith("sk_") ||
    /your_|placeholder|example|xxx/i.test(key)
  );
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (
    origin &&
    (ALLOWED_ORIGINS.has(origin) ||
      origin.endsWith(".github.io") ||
      /automexa/i.test(origin))
  ) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

function sendJson(res, status, data, origin) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    ...corsHeaders(origin),
  });
  res.end(body);
}

function resolveItems(body) {
  const items = [];

  if (body.productId && CATALOG[body.productId]) {
    const p = CATALOG[body.productId];
    items.push({
      name: p.name,
      unitAmount: p.unitAmount,
      quantity: 1,
      productId: body.productId,
    });
  }

  for (const raw of body.items || []) {
    const productId = String(raw.productId || "").trim();
    if (productId && CATALOG[productId]) {
      const p = CATALOG[productId];
      const qty = Math.max(1, Math.min(99, parseInt(raw.quantity, 10) || 1));
      items.push({
        name: p.name,
        unitAmount: p.unitAmount,
        quantity: qty,
        productId,
      });
      continue;
    }

    const name = String(raw.name || raw.title || "").trim().slice(0, 120);
    const unitAmount = Math.round(Number(raw.unitAmount) || Number(raw.unitPrice) * 100 || 0);
    const quantity = Math.max(1, Math.min(99, parseInt(raw.quantity, 10) || 1));
    if (!name || unitAmount < 50 || unitAmount > 5_000_000) continue;
    items.push({ name, unitAmount, quantity, productId: productId || "" });
  }

  // Deduplicate by productId+name
  const seen = new Map();
  for (const item of items) {
    const key = `${item.productId}|${item.name}`;
    const prev = seen.get(key);
    if (prev) prev.quantity = Math.min(99, prev.quantity + item.quantity);
    else seen.set(key, { ...item });
  }
  return [...seen.values()];
}

async function createCheckoutSession(body) {
  const secret = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (isPlaceholderKey(secret)) {
    return {
      status: 503,
      data: {
        status: "error",
        message:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to .env (Dashboard → Developers → API keys).",
      },
    };
  }

  const email = String(body.customerEmail || "").trim();
  if (!email || !email.includes("@")) {
    return {
      status: 400,
      data: { status: "error", message: "Enter a valid email before checkout." },
    };
  }

  const lineItems = resolveItems(body);
  if (!lineItems.length) {
    return {
      status: 400,
      data: { status: "error", message: "Select a package or product to pay for." },
    };
  }

  const domain = String(
    body.domain || process.env.SITE_URL || "http://localhost:5173",
  ).replace(/\/$/, "");

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${domain}/pay?checkout=success`);
  params.set("cancel_url", `${domain}/pay?checkout=cancel`);
  params.set("customer_email", email);
  params.set("allow_promotion_codes", "true");
  params.set("billing_address_collection", "auto");
  params.set("metadata[source]", "automexa-site");
  params.set(
    "metadata[products]",
    lineItems.map((i) => i.productId || i.name).join(","),
  );

  lineItems.forEach((item, idx) => {
    params.set(`line_items[${idx}][price_data][currency]`, "gbp");
    params.set(`line_items[${idx}][price_data][product_data][name]`, item.name);
    params.set(
      `line_items[${idx}][price_data][unit_amount]`,
      String(item.unitAmount),
    );
    params.set(`line_items[${idx}][quantity]`, String(item.quantity));
  });

  const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const data = await resp.json();
  if (!resp.ok) {
    return {
      status: 500,
      data: {
        status: "error",
        message: data?.error?.message || "Stripe session failed.",
      },
    };
  }
  return { status: 200, data: { status: "success", url: data.url } };
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  const url = new URL(req.url || "/", `http://${HOST}:${PORT}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders(origin));
    res.end();
    return;
  }

  try {
    if (url.pathname === "/health" && req.method === "GET") {
      const configured = !isPlaceholderKey(
        (process.env.STRIPE_SECRET_KEY || "").trim(),
      );
      sendJson(res, 200, { status: "ok", stripe_configured: configured }, origin);
      return;
    }

    if (url.pathname === "/api/checkout/config" && req.method === "GET") {
      const configured = !isPlaceholderKey(
        (process.env.STRIPE_SECRET_KEY || "").trim(),
      );
      sendJson(
        res,
        200,
        {
          status: "success",
          enabled: configured,
          currency: "GBP",
          catalog: Object.entries(CATALOG).map(([id, p]) => ({
            id,
            name: p.name,
            price: p.unitAmount / 100,
          })),
          message: configured
            ? "Stripe ready."
            : "Add STRIPE_SECRET_KEY to .env (Stripe Dashboard → Developers → API keys).",
        },
        origin,
      );
      return;
    }

    if (url.pathname === "/api/checkout/create" && req.method === "POST") {
      let body = {};
      try {
        body = await readJson(req);
      } catch {
        sendJson(res, 400, { status: "error", message: "Invalid JSON body." }, origin);
        return;
      }
      const result = await createCheckoutSession(body);
      sendJson(res, result.status, result.data, origin);
      return;
    }

    sendJson(res, 404, { status: "error", message: "Not found" }, origin);
  } catch (err) {
    sendJson(
      res,
      500,
      { status: "error", message: err?.message || "Server error" },
      origin,
    );
  }
});

server.listen(PORT, HOST, () => {
  const configured = !isPlaceholderKey(
    (process.env.STRIPE_SECRET_KEY || "").trim(),
  );
  console.log(`Automexa checkout API  http://${HOST}:${PORT}`);
  console.log(
    `  Stripe: ${configured ? "configured" : "not configured — add STRIPE_SECRET_KEY to .env"}`,
  );
});
