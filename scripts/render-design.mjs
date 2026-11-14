/**
 * Render a design HTML file to PNG at exact pixel sizes.
 *
 *   node scripts/render-design.mjs designs/post-01-listing.html designs/post-01-listing.png
 *
 * Uses the Chrome headless shell installed by `npx puppeteer browsers install
 * chrome-headless-shell`. Falls back to $CHROME_PATH. Height is read from the
 * document, so 4:5 posts and 9:16 stories both work.
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import puppeteer from "puppeteer-core";

const htmlArg = process.argv[2] ?? "designs/listing-01.html";
const outArg = process.argv[3] ?? "designs/listing-01.png";

const candidates = [
  process.env.CHROME_PATH,
  `${process.env.HOME}/.cache/puppeteer/chrome-headless-shell/linux-157.0.8103.50/chrome-headless-shell-linux64/chrome-headless-shell`,
].filter(Boolean);

const executablePath = candidates.find((path) => existsSync(path));
if (!executablePath) {
  throw new Error("No Chrome found. Set CHROME_PATH or install chrome-headless-shell.");
}

const htmlPath = resolve(htmlArg);
const outPath = resolve(outArg);

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--font-render-hinting=none"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  const size = await page.evaluate(() => ({
    width: Math.round(document.body.getBoundingClientRect().width),
    height: Math.max(
      document.body.scrollHeight,
      document.body.getBoundingClientRect().height,
      document.documentElement.scrollHeight,
    ),
  }));

  await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 2 });
  // Give webfonts and background images a beat.
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: size.width, height: size.height },
  });
  console.log(`rendered ${outPath} at ${size.width}x${size.height} (2x)`);
} finally {
  await browser.close();
}
