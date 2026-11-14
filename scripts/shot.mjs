import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3111";
const out = process.argv[3] ?? "C:/Users/yeetp/AppData/Local/Temp/opencode/page.png";
const full = process.argv[4] === "full";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

if (full) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: 1440, height: Math.min(height, 9000), deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 1200));
}

await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log("saved", out);
