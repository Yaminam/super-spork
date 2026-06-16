// Minimal CDP screenshotter: seeds the age-gate, then captures the page.
// Usage: node scripts/shoot.mjs <url> <out.png> [scrollY]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME =
  "C:/Users/tshre/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe";
const [, , url = "http://localhost:4010/", out = "shot.png", scrollY = "0"] =
  process.argv;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu-sandbox",
  "--remote-debugging-port=9333",
  "--user-data-dir=C:/Users/tshre/AppData/Local/Temp/cdp-shoot",
  "--use-angle=swiftshader",
  "--use-gl=angle",
  "--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist",
  "--hide-scrollbars",
  "--window-size=1440,900",
  "about:blank",
]);
chrome.stderr.on("data", () => {});

let ws;
try {
  // wait for the debugger endpoint
  let targetWs;
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch("http://localhost:9333/json");
      const t = await r.json();
      const page = t.find((x) => x.type === "page");
      if (page) {
        targetWs = page.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await sleep(250);
  }
  if (!targetWs) throw new Error("no CDP target");

  ws = new WebSocket(targetWs);
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  });
  await new Promise((res) => ws.addEventListener("open", res));
  const send = (method, params = {}) =>
    new Promise((res) => {
      const myId = ++id;
      pending.set(myId, res);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  // reduced motion disables Lenis so programmatic scroll works for captures
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  // first load to set the origin, then seed localStorage and reload
  await send("Page.navigate", { url });
  await sleep(1500);
  await send("Runtime.evaluate", {
    expression: "localStorage.setItem('ll-age-verified','true')",
  });
  await send("Page.navigate", { url });
  await sleep(4500);
  await send("Runtime.evaluate", {
    expression: `window.scrollTo(0, ${Number(scrollY)})`,
  });
  await sleep(1200);
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log("wrote", out);
} finally {
  try { ws?.close(); } catch {}
  chrome.kill();
}
