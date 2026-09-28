// Screenshot harness. Boots against a already-running dev/preview server and
// captures the viewports that matter, so design can be reviewed as pixels
// rather than as description.
//
//   node scripts/shoot.mjs [baseUrl]
//
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const OUT = "screens";

const SHOTS = [
  { name: "home-desktop", path: "/", width: 1440, height: 900, full: true },
  { name: "home-fold", path: "/", width: 1440, height: 900, full: false },
  { name: "home-mobile", path: "/", width: 390, height: 844, full: true },
  { name: "work-fundrev", path: "/work/fundrev/", width: 1440, height: 900, full: true },
  { name: "work-erp", path: "/work/erp/", width: 1440, height: 900, full: false },
];

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: shot.full ? 1 : 2,
  });

  await page.goto(BASE + shot.path, { waitUntil: "load" });

  // Drive every scroll-reveal to its end state, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });

  await page.screenshot({
    path: `${OUT}/${shot.name}.png`,
    fullPage: shot.full,
  });

  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${shot.name.padEnd(16)} ${shot.width}px  page height ${height}px`);

  await page.close();
}

await browser.close();
