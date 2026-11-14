import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.setRequestInterception(true);

let captured = null;

page.on("request", async (req) => {
  if (req.url().includes("assets.mailerlite.com/jsonp")) {
    captured = { url: req.url(), method: req.method(), postData: req.postData() };
    await req.respond({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ success: true }),
    });
    return;
  }
  req.continue();
});

await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.querySelector("#free")?.scrollIntoView());
await page.type("#email", "test@example.com");
await page.click('button[type="submit"]');
await new Promise((r) => setTimeout(r, 1500));

const bodyText = await page.evaluate(() => document.body.innerText);

console.log(JSON.stringify({ captured, showsSuccess: bodyText.includes("Check your inbox") }, null, 2));
await browser.close();
