@echo off
setlocal
cd /d "%~dp0cloudflare\checkout-worker"

echo.
echo === Deploy Automexa live checkout ===
echo.

call npx wrangler whoami
if errorlevel 1 (
  echo.
  echo Not logged into Cloudflare. Run: npx wrangler login
  pause
  exit /b 1
)

echo.
echo Deploying worker...
call npx wrangler deploy
if errorlevel 1 (
  echo Deploy failed.
  pause
  exit /b 1
)

echo.
echo Setting Stripe secret from ..\.env ...
node -e "const fs=require('fs');const p=require('path');const t=fs.readFileSync(p.join('..','..','.env'),'utf8').replace(/^\uFEFF/,'');const m=t.match(/^STRIPE_SECRET_KEY=(.*)$/m);if(!m||!m[1].trim().startsWith('sk_')){process.exit(2)};process.stdout.write(m[1].trim().replace(/^[\"']|[\"']$/g,''));" | npx wrangler secret put STRIPE_SECRET_KEY
if errorlevel 1 (
  echo Could not set STRIPE_SECRET_KEY from .env
  pause
  exit /b 1
)

echo https://automexa.co.uk| npx wrangler secret put SITE_URL

echo.
echo Checking health...
curl -s https://automexa-checkout.adeelcolchester.workers.dev/health
echo.
echo.
echo Done. Live pay page: https://automexa.co.uk/pay
echo.
pause
