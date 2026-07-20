/**
 * GitHub Pages SPA support:
 * - 404.html so unknown paths still boot the React app
 * - per-route index.html so /about, /services, etc. return HTTP 200 (required for Google sitemap)
 */
import { copyFileSync, mkdirSync, existsSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const index = join(dist, "index.html");
if (!existsSync(index)) {
  console.error("spa-fallback: dist/index.html missing — build failed earlier");
  process.exit(1);
}

copyFileSync(index, join(dist, "404.html"));

const routes = ["about", "services", "portfolio", "contact", "pay"];
for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
  // GitHub Pages also resolves /about → about.html
  copyFileSync(index, join(dist, `${route}.html`));
}

const today = new Date().toISOString().slice(0, 10);
const urls = ["/", ...routes.map((r) => `/${r}`)]
  .map(
    (p) =>
      `  <url>\n    <loc>https://automexa.co.uk${p === "/" ? "/" : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  )
  .join("\n");

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: https://automexa.co.uk/sitemap.xml\n`,
  "utf8"
);

// Keep public/ copies in sync for local preview consistency
try {
  writeFileSync(
    join("public", "sitemap.xml"),
    readFileSync(join(dist, "sitemap.xml"), "utf8"),
    "utf8"
  );
  writeFileSync(
    join("public", "robots.txt"),
    readFileSync(join(dist, "robots.txt"), "utf8"),
    "utf8"
  );
} catch {
  /* public may be locked; dist is source of truth for deploy */
}

console.log(`spa-fallback: 404.html + ${routes.length} routes + sitemap ready`);
