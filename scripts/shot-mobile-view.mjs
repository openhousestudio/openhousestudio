import puppeteer from "puppeteer-core";

const url = "http://localhost:3112";
const out = process.argv[2] ?? "C:/Users/yeetp/AppData/Local/Temp/opencode/mv.png";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: out });
await browser.close();
console.log("saved");
