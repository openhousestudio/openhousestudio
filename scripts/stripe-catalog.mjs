/**
 * Create (or complete) the Stripe catalog for the price ladder.
 *
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-catalog.mjs
 *
 * One Product, one monthly USD Price per ladder rung, with lookup key
 * `rung_1` … `rung_12`. Safe to re-run: existing lookup keys are skipped.
 * Stripe cannot change a Price's amount, so a key that already exists at the wrong
 * amount must be archived and recreated, not re-run.
 * The ladder is read from src/lib/site.ts so the catalog cannot drift from
 * the marketing page.
 */
import { readFileSync } from "node:fs";
import Stripe from "stripe";

const siteSource = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
const ladderMatch = siteSource.match(/priceLadder\s*=\s*\[([\s\S]*?)\]/);
if (!ladderMatch) throw new Error("Could not read priceLadder from src/lib/site.ts");

const ladder = ladderMatch[1]
  .split(",")
  .map((value) => Number.parseInt(value, 10))
  .filter((value) => Number.isFinite(value));

if (ladder.length === 0) throw new Error("priceLadder is empty");

const key = process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
const stripe = new Stripe(key);

const products = await stripe.products.search({
  query: "metadata['plan']:'studio'",
  limit: 1,
});

let product = products.data[0];
if (product) {
  console.log(`product exists: ${product.id} ${product.name}`);
} else {
  product = await stripe.products.create({
    name: "Open House Studio",
    description:
      "Editable social media templates for real estate agents, every caption included.",
    metadata: { plan: "studio" },
  });
  console.log(`product created: ${product.id}`);
}

for (const [index, dollars] of ladder.entries()) {
  const rung = index + 1;
  const lookupKey = `rung_${rung}`;
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  if (existing.data[0]) {
    console.log(`rung ${rung}: exists ${existing.data[0].id}`);
    continue;
  }
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: dollars * 100,
    recurring: { interval: "month" },
    nickname: `Ladder month ${rung}`,
    lookup_key: lookupKey,
    metadata: { tenure_month: String(rung) },
  });
  console.log(`rung ${rung}: $${dollars} ${price.id}`);
}
