import { chromium } from "playwright";
const EXE =
  "C:\\Users\\tshre\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));

await page.goto("http://localhost:3001", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(6000);
await page.screenshot({ path: "scripts/ll-home.png" });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
await page.waitForTimeout(2000);
await page.screenshot({ path: "scripts/ll-home-brands.png" });

await page.goto("http://localhost:3001/brands", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: "scripts/ll-brands.png" });

console.log("done", errs.length ? errs : "(no errors)");
await browser.close();
