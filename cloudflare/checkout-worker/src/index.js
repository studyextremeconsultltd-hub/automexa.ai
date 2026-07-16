/**
 * Automexa — Stripe Checkout Cloudflare Worker
 * Secrets: STRIPE_SECRET_KEY
 * Optional vars: SITE_URL
 */

const CATALOG = {
  starter: { name: "Automexa Starter package", unitAmount: 10000 },
  standard: { name: "Automexa Standard package", unitAmount: 30000 },
  custom: { name: "Automexa Custom package", unitAmount: 50000 },
};

const ALLOWED_ORIGINS = new Set([
  "https://automexa.co.uk",
  "https://www.automexa.co.uk",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

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

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function isPlaceholderKey(key) {
  return !key || !key.startsWith("sk_") || /your_|placeholder|example|xxx/i.test(key);
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
      items.push({ name: p.name, unitAmount: p.unitAmount, quantity: qty, productId });
      continue;
    }

    const name = String(raw.name || raw.title || "")
      .trim()
      .slice(0, 120);
    const unitAmount = Math.round(
      Number(raw.unitAmount) || Number(raw.unitPrice) * 100 || 0,
    );
    const quantity = Math.max(1, Math.min(99, parseInt(raw.quantity, 10) || 1));
    if (!name || unitAmount < 50 || unitAmount > 5_000_000) continue;
    items.push({ name, unitAmount, quantity, productId: productId || "" });
  }

  const seen = new Map();
  for (const item of items) {
    const key = `${item.productId}|${item.name}`;
    const prev = seen.get(key);
    if (prev) prev.quantity = Math.min(99, prev.quantity + item.quantity);
    else seen.set(key, { ...item });
  }
  return [...seen.values()];
}

async function createCheckoutSession(env, body) {
  const secret = (env.STRIPE_SECRET_KEY || "").trim();
  if (isPlaceholderKey(secret)) {
    return {
      status: 503,
      data: {
        status: "error",
        message:
          "Stripe is not configured on the checkout worker. Set STRIPE_SECRET_KEY via wrangler secret.",
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
    body.domain || env.SITE_URL || "https://automexa.co.uk",
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
        message: (data.error && data.error.message) || "Stripe session failed.",
      },
    };
  }
  return { status: 200, data: { status: "success", url: data.url } };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      const configured = !isPlaceholderKey((env.STRIPE_SECRET_KEY || "").trim());
      return json({ status: "ok", stripe_configured: configured }, 200, origin);
    }

    if (url.pathname === "/api/checkout/config" && request.method === "GET") {
      const configured = !isPlaceholderKey((env.STRIPE_SECRET_KEY || "").trim());
      return json(
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
            : "Set STRIPE_SECRET_KEY on the checkout worker.",
        },
        200,
        origin,
      );
    }

    if (url.pathname === "/api/checkout/create" && request.method === "POST") {
      let body = {};
      try {
        body = await request.json();
      } catch {
        return json({ status: "error", message: "Invalid JSON body." }, 400, origin);
      }
      const result = await createCheckoutSession(env, body);
      return json(result.data, result.status, origin);
    }

    return json({ status: "error", message: "Not found" }, 404, origin);
  },
};
