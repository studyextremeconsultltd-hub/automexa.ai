# AutoMexa

High-performance websites, AI automation, e-commerce & CRM — delivered within 3 days.

## Local setup

```bash
npm install
cp .env.example .env
```

1. Open [Stripe API keys](https://dashboard.stripe.com/test/apikeys)
2. Paste `sk_test_…` into `.env` as `STRIPE_SECRET_KEY`
3. Run:

```bash
npm run dev
```

Opens the site at http://localhost:5173 with a Rose Empire–style checkout API
(`server/checkout.mjs`). Customers pick a package → Stripe Checkout Session is
created dynamically — no Payment Links per product.

## Live checkout (Cloudflare Worker)

GitHub Pages hosts the static site. Stripe sessions are created by:

`cloudflare/checkout-worker`

```bash
cd cloudflare/checkout-worker
npm install
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler deploy
```

Then set GitHub repo variable `VITE_CHECKOUT_API_URL` to the worker URL
(or keep the default in `.github/workflows/deploy-pages.yml`).
