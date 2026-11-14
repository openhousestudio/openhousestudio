import Stripe from "stripe";

let client: Stripe | null = null;

/** Lazily build the client so a missing key fails at request time, not import time. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key, {
    appInfo: { name: "Open House Studio", version: "0.1.0" },
  });
  return client;
}

export const PLAN_METADATA_KEY = "tenure_month";
export const MAX_TENURE_MONTH = 19;

/** Stripe lookup key for a given ladder rung. Rung 1 is $25, rung 19 is $10. */
export function lookupKeyForRung(rung: number): string {
  const clamped = Math.min(Math.max(rung, 1), MAX_TENURE_MONTH);
  return `rung_${clamped}`;
}

/** Resolve the ladder Price id for a tenure month, creating nothing. */
export async function priceIdForRung(rung: number): Promise<string> {
  const stripe = getStripe();
  const key = lookupKeyForRung(rung);
  const result = await stripe.prices.list({ lookup_keys: [key], limit: 1 });
  const price = result.data[0];
  if (!price) {
    throw new Error(
      `No Stripe price with lookup key "${key}". Run scripts/stripe-catalog.mjs first.`,
    );
  }
  return price.id;
}
