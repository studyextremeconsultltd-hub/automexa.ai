import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const workerDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(workerDir, "../..");
const text = readFileSync(resolve(root, ".env"), "utf8").replace(/^\uFEFF/, "");
const match = text.match(/^STRIPE_SECRET_KEY=(.*)$/m);
if (!match) {
  console.error("STRIPE_SECRET_KEY missing from .env");
  process.exit(2);
}
let key = match[1].trim();
if (
  (key.startsWith('"') && key.endsWith('"')) ||
  (key.startsWith("'") && key.endsWith("'"))
) {
  key = key.slice(1, -1);
}
if (!key.startsWith("sk_") || key.length < 40) {
  console.error("STRIPE_SECRET_KEY in .env is not a valid secret key");
  process.exit(2);
}

function run(args, input) {
  const wrangler = resolve(workerDir, "node_modules", "wrangler", "bin", "wrangler.js");
  const r = spawnSync(process.execPath, [wrangler, ...args], {
    cwd: workerDir,
    input,
    encoding: "utf8",
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("Setting STRIPE_SECRET_KEY on worker...");
run(["secret", "put", "STRIPE_SECRET_KEY"], key);
console.log("Setting SITE_URL...");
run(["secret", "put", "SITE_URL"], "https://automexa.co.uk");
console.log("Done.");
