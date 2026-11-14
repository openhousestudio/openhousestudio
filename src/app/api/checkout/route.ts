import { NextResponse } from "next/server";
import { priceIdForRung, PLAN_METADATA_KEY, getStripe } from "@/lib/stripe";

function originFrom(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const origin = originFrom(request);
    const price = await priceIdForRung(1);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: {
        metadata: { [PLAN_METADATA_KEY]: "1" },
      },
      success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] failed", error);
    return NextResponse.json(
      { error: "Could not start checkout" },
      { status: 500 },
    );
  }
}
