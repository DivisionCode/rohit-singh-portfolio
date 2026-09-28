/**
 * Guards against the two failures that have already shipped once each:
 *   1. content hidden behind an animation that never runs (opacity stuck at 0)
 *   2. content stuck mid-animation forever (permanently blurred or faded,
 *      which is what a percentage range inside `entry` did to tall sections)
 *
 * Scrolls each page in steps and, at every stop, asserts that anything sitting
 * well inside the viewport is fully opaque and unfiltered. Elements still
 * entering from the bottom are exempt: those are legitimately mid-reveal.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const PAGES = ["/", "/work/fundrev/", "/work/erp/", "/work/sushraj-ventures/"];
const STEP = 600;

const browser = await chromium.launch();
let failures = 0;

for (const path of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + path, { waitUntil: "load" });
  // The page sets scroll-behavior: smooth, so a programmatic jump animates and
  // the view timeline is genuinely mid-way when we sample. Turn it off so each
  // stop is measured at rest.
  // Injected directly rather than with addStyleTag, which fails the whole run
  // if the page happens to log a CSP violation while it is being added.
  await page.evaluate(() => {
    document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
  });
  await page.waitForTimeout(900);

  const height = await page.evaluate(() => document.body.scrollHeight);

  for (let y = 0; y <= height; y += STEP) {
    await page.evaluate((to) => window.scrollTo(0, to), y);
    await page.waitForTimeout(260);

    const bad = await page.evaluate(() => {
      const problems = [];
      // "Settled" means the element's bottom is above 70% of the viewport, so
      // it has had a full screen of scrolling to finish revealing.
      const settledLine = window.innerHeight * 0.7;

      for (const el of document.querySelectorAll("body *")) {
        const rect = el.getBoundingClientRect();
        if (rect.height < 24 || rect.width < 24) continue;
        if (rect.top < 0 || rect.bottom > settledLine) continue;

        const style = getComputedStyle(el);
        const opacity = Number.parseFloat(style.opacity);
        const filter = style.filter;

        // Decoration is allowed to be part-opacity: hover overlays, the
        // lattice's pulse rings, the ticker. Check the ancestors too, since
        // the aria-hidden usually sits on the wrapper, not the shape.
        if (el.closest('[aria-hidden="true"]')) continue;
        if (el.closest(".spotlight")) continue;

        if (opacity < 0.99) {
          problems.push(`opacity ${opacity} on ${el.tagName}.${String(el.className).slice(0, 36)}`);
        } else if (filter !== "none" && filter.includes("blur")) {
          problems.push(`${filter} on ${el.tagName}.${String(el.className).slice(0, 36)}`);
        }
      }
      return problems.slice(0, 3);
    });

    if (bad.length) {
      console.error(`FAIL ${path} @ y=${y}`);
      bad.forEach((b) => console.error(`      ${b}`));
      failures += bad.length;
    }
  }

  await page.close();
}

await browser.close();

if (failures) {
  console.error(`\n${failures} element(s) not fully revealed.`);
  process.exit(1);
}
console.log("PASS: everything settled is fully opaque and unfiltered.");
