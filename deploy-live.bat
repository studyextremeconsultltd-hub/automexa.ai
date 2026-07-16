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
node set-secrets.mjs
if errorlevel 1 (
  echo Could not set secrets. Run: node set-secrets.mjs
  pause
  exit /b 1
)

echo.
echo Checking health...
curl -s https://automexa-checkout.adeelcolchester.workers.dev/health
echo.
curl -s https://automexa-checkout.adeelcolchester.workers.dev/api/checkout/config
echo.
echo.
echo Done. Live pay page: https://automexa.co.uk/pay
echo.
pause
