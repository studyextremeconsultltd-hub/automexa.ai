import { useEffect } from "react";
import { brand } from "../data/content";

/** Live ADEV worker URL (Cloudflare) — updated after deploy if needed */
const ADEV_API =
  import.meta.env.VITE_ADEV_API_URL ||
  "https://adev-web-developer-plugin.adeelcolchester.workers.dev";

const WHATSAPP_DIGITS =
  String(brand.whatsapp || "").replace(/\D/g, "") || "447999988450";

/**
 * Loads ADEV late and light.
 * Never bind to pointerdown — that steals scorecard / form taps and pops the widget mid-click.
 */
export default function AdevEmbed() {
  useEffect(() => {
    if (document.querySelector('script[data-adev-embed="automexa"]')) return;

    let cancelled = false;
    const narrow =
      typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
    const idleTimeout = narrow ? 18000 : 10000;
    const fallbackMs = narrow ? 14000 : 9000;

    const inject = () => {
      if (cancelled || document.querySelector('script[data-adev-embed="automexa"]')) return;
      const script = document.createElement("script");
      script.src = `${ADEV_API.replace(/\/$/, "")}/widget.js`;
      script.async = true;
      script.defer = true;
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

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const win = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

    // Scroll past fold is a safe signal; click/tap is not (forms + scorecard).
    const onScroll = () => {
      if (cancelled) return;
      if (window.scrollY < 240) return;
      inject();
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(inject, { timeout: idleTimeout });
    } else {
      timeoutId = window.setTimeout(inject, fallbackMs);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      if (idleId != null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) {
        window.clearTimeout(timeoutId);
      }
      document.querySelector('script[data-adev-embed="automexa"]')?.remove();
      document.getElementById("adev-widget")?.remove();
      document.getElementById("adev-theme-style")?.remove();
    };
  }, []);

  return null;
}
