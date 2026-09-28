/** Confirms analytics hits are not blocked by the CSP on the live domain. */
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "https://labs.sushraj.in";
const b = await chromium.launch();
const p = await b.newPage();
/*
  Advertising endpoints are blocked on purpose. They only fire because Google
  Signals is enabled on the GA property; measurement does not need them, and a
  portfolio has no reason to ship remarketing pixels to its visitors.
*/
const ADS = /doubleclick\.net|googleads|\/rmkt\/|\/ccm\/|google\.com\/pagead/;
const analyticsBlocked = [], adsBlocked = [], sent = [];

p.on("console", (m) => {
  const t = m.text();
  if (!/Content Security Policy/i.test(t)) return;
  (ADS.test(t) ? adsBlocked : analyticsBlocked).push(t.slice(0, 110));
});
p.on("response", (r) => {
  const u = r.url();
  if (/google-analytics\.com|analytics\.google\.com/.test(u) && !ADS.test(u)) {
    sent.push(`${new URL(u).host} ${r.status()}`);
  }
});

await p.goto(BASE, { waitUntil: "load" });
await p.waitForTimeout(7000);

console.log("analytics hits delivered:", [...new Set(sent)].join(", ") || "(none)");
console.log("analytics blocked by CSP:", analyticsBlocked.length ? "\n  " + analyticsBlocked.join("\n  ") : "none");
console.log(`advertising blocked by CSP: ${adsBlocked.length} (intentional)`);

await b.close();
process.exit(analyticsBlocked.length || sent.length === 0 ? 1 : 0);
