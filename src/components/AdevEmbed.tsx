import { useEffect } from "react";
import { brand } from "../data/content";

/** Live ADEV worker URL (Cloudflare) — updated after deploy if needed */
const ADEV_API =
  import.meta.env.VITE_ADEV_API_URL ||
  "https://adev-web-developer-plugin.adeelcolchester.workers.dev";

const WHATSAPP_DIGITS =
  String(brand.whatsapp || "").replace(/\D/g, "") || "447999988450";

/**
 * Loads ADEV as the only on-site assistant.
 * WhatsApp connect runs inside ADEV (no separate WhatsApp FAB).
 */
export default function AdevEmbed() {
  useEffect(() => {
    const existing = document.querySelector('script[data-adev-embed="automexa"]');
    if (existing) return;

    const script = document.createElement("script");
    script.src = `${ADEV_API.replace(/\/$/, "")}/widget.js`;
    script.async = true;
    script.dataset.adevEmbed = "automexa";
    script.dataset.apiBase = ADEV_API.replace(/\/$/, "");
    script.dataset.clientId = "automexa";
    script.dataset.title = "ADEV";
    script.dataset.siteName = "AutoMexa";
    script.dataset.accent = "#c9a66b";
    script.dataset.whatsapp = WHATSAPP_DIGITS || "447999988450";
    // Keep widget light on public pages — no heavy FX bundles
    script.dataset.fx = "false";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.getElementById("adev-widget")?.remove();
      document.getElementById("adev-theme-style")?.remove();
    };
  }, []);

  return null;
}
