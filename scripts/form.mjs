/**
 * Exercises the contact form for real, with the network intercepted so no
 * message is actually sent and FormSubmit's one-time activation is not
 * consumed by a test.
 *
 * Checks the whole path: browser validation blocks an empty submit, the
 * request is shaped the way FormSubmit expects, the success state renders and
 * the form clears, and a rejection surfaces as an error rather than a silent
 * no-op.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const failures = [];

const check = (label, ok, detail = "") => {
  console.log(`${ok ? "OK  " : "FAIL"} ${label}${detail ? "  " + detail : ""}`);
  if (!ok) failures.push(label);
};

async function open() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (e) => failures.push("pageerror: " + e.message));
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  return page;
}

async function fill(page) {
  await page.fill("#name", "Test Person");
  await page.fill("#email", "test@example.com");
  await page.fill("#company", "Example Fund");
  await page.fill("#message", "Checking the contact form end to end.");
}

// ── 1. Required fields block an empty submit ────────────────────────────────
{
  const page = await open();
  let requested = false;
  await page.route("**/formsubmit.co/**", (route) => {
    requested = true;
    return route.abort();
  });

  await page.click('button[type="submit"]');
  await page.waitForTimeout(600);

  check("empty submit is blocked by validation", !requested);
  const invalid = await page.$eval("#name", (el) => el.matches(":invalid"));
  check("name field reports invalid", invalid);
  await page.close();
}

// ── 2. A filled submit sends the right request ──────────────────────────────
{
  const page = await open();
  let seen = null;

  await page.route("**/formsubmit.co/**", async (route) => {
    const request = route.request();
    seen = {
      url: request.url(),
      method: request.method(),
      contentType: request.headerValue ? await request.headerValue("content-type") : null,
      body: request.postData(),
    };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: "true", message: "The form has been submitted" }),
    });
  });

  await fill(page);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  check("request was sent", Boolean(seen));

  if (seen) {
    check("posts to the ajax endpoint", seen.url.includes("/ajax/"), seen.url);
    check("uses POST", seen.method === "POST");
    check("sends JSON", (seen.contentType ?? "").includes("application/json"));

    let payload = {};
    try {
      payload = JSON.parse(seen.body ?? "{}");
    } catch {
      check("body is valid JSON", false);
    }

    check("carries name", payload.name === "Test Person");
    check("carries email", payload.email === "test@example.com");
    check("carries company", payload.company === "Example Fund");
    check("carries message", String(payload.message ?? "").length > 10);
    check("carries _subject", Boolean(payload._subject));
    check("carries _captcha=false", payload._captcha === "false");
    check("honeypot is empty", payload._honey === "");
  }

  const button = await page.textContent('button[type="submit"]');
  check("button shows the sent state", /Message sent/i.test(button ?? ""), button?.trim());

  const status = await page.textContent('[role="status"]');
  check("status line confirms", /Thanks/i.test(status ?? ""));

  const nameValue = await page.inputValue("#name");
  check("form is cleared after sending", nameValue === "");

  await page.close();
}

// ── 3. A rejection surfaces as an error ─────────────────────────────────────
{
  const page = await open();
  await page.route("**/formsubmit.co/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: "false", message: "Inbox not activated" }),
    }),
  );

  await fill(page);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  const alert = await page.$('[role="alert"]');
  check("rejection shows an alert", Boolean(alert));
  if (alert) {
    const text = await alert.textContent();
    check("alert repeats the reason", /not activated/i.test(text ?? ""));
    check("alert offers the direct address", /rohit@sushraj\.in/.test(text ?? ""));
  }
  await page.close();
}

// ── 4. The no-JS fallback is wired ──────────────────────────────────────────
{
  const page = await open();
  const action = await page.getAttribute("#contact form", "action");
  const method = await page.getAttribute("#contact form", "method");
  check("fallback action posts to formsubmit", /formsubmit\.co/.test(action ?? ""), action ?? "");
  check("fallback action is not the ajax route", !(action ?? "").includes("/ajax/"));
  check("fallback method is POST", (method ?? "").toLowerCase() === "post");
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log("\nPASS: the contact form submits correctly.");
