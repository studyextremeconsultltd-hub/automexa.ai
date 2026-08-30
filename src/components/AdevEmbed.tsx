import { useEffect } from "react";
import { brand } from "../data/content";

/** Live ADEV worker URL (Cloudflare) — updated after deploy if needed */
const ADEV_API =
  import.meta.env.VITE_ADEV_API_URL ||
  "https://adev-web-developer-plugin.adeelcolchester.workers.dev";

const WHATSAPP_DIGITS =
  String(brand.whatsapp || "").replace(/\D/g, "") || "447999988450";

/**
 * Loads ADEV after first paint so chat widget does not compete with images.
 */
export default function AdevEmbed() {
  useEffect(() => {
    if (document.querySelector('script[data-adev-embed="automexa"]')) return;

    let cancelled = false;
    const narrow =
      typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
    const idleTimeout = narrow ? 8000 : 4000;
    const fallbackMs = narrow ? 5000 : 2500;

    const inject = () => {
      if (cancelled || document.querySelector('script[data-adev-embed="automexa"]')) return;
      const script = document.createElement("script");
      script.src = `${ADEV_API.replace(/\/$/, "")}/widget.js`;
      script.async = true;
      script.dataset.adevEmbed = "automexa";
      script.dataset.apiBase = ADEV_API.replace(/\/$/, "");
      script.dataset.clientId = "automexa";
      script.dataset.title = "ADEV";
      script.dataset.siteName = "AutoMexa";
      script.dataset.publicRole = "Online manager";
      script.dataset.accent = "#c9a66b";
      script.dataset.whatsapp = WHATSAPP_DIGITS || "447999988450";
      script.dataset.fx = "false";
      document.body.appendChild(script);
    };

    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(inject, { timeout: idleTimeout })
        : window.setTimeout(inject, fallbackMs);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
      document.querySelector('script[data-adev-embed="automexa"]')?.remove();
      document.getElementById("adev-widget")?.remove();
      document.getElementById("adev-theme-style")?.remove();
    };
  }, []);

  return null;
}
