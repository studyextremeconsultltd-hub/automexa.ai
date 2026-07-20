import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Content Security Policy for production builds only — the dev server needs
 * inline scripts for React Fast Refresh, so the policy is injected at build time.
 * GitHub Pages cannot send HTTP headers, so CSP ships as a meta tag.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' https://*.workers.dev",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https://videos.pexels.com https://*.workers.dev",
  "connect-src 'self' https://api.stripe.com https://*.workers.dev https://checkout.stripe.com",
  "form-action 'self' https://checkout.stripe.com",
  "frame-src https://checkout.stripe.com https://js.stripe.com",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ')

function securityHeaders(): Plugin {
  return {
    name: 'inject-security-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityHeaders()],
  server: {
    proxy: {
      '/api/checkout': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})
