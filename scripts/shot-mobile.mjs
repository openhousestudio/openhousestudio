import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3112";
const out = process.argv[3] ?? "C:/Users/yeetp/AppData/Local/Temp/opencode/mobile.png";
const width = Number(process.argv[4] ?? 390);
const height = Number(process.argv[5] ?? 844);

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const docHeight = await page.evaluate(() => document.body.scrollHeight);
await page.setViewport({ width, height: Math.min(docHeight, 12000), deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out, "height", docHeight);
