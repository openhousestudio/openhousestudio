import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  getStripe,
  priceIdForRung,
  MAX_TENURE_MONTH,
  PLAN_METADATA_KEY,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Subscriptions move down the ladder by exactly one rung per paid invoice.
 * The rung is the price the customer has already paid for; the next invoice
 * uses the next rung. State lives on the Stripe subscription metadata, so no
 * database is needed yet.
 */
async function advanceLadder(
  stripe: ReturnType<typeof getStripe>,
  subscriptionId: string,
  invoiceId: string,
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (subscription.metadata.last_invoice_id === invoiceId) {
    return; // Already processed this invoice.
  }

  const paidMonths = Number.parseInt(
    subscription.metadata[PLAN_METADATA_KEY] ?? "1",
    10,
  );
  const current = Number.isFinite(paidMonths)
    ? Math.min(Math.max(paidMonths, 1), MAX_TENURE_MONTH)
    : 1;
  const next = Math.min(current + 1, MAX_TENURE_MONTH);
  const item = subscription.items.data[0];

  const metadata = {
    ...subscription.metadata,
    [PLAN_METADATA_KEY]: String(next),
    last_invoice_id: invoiceId,
  };

  await stripe.subscriptions.update(subscription.id, {
    metadata,
    ...(next !== current && item
      ? {
          items: [{ id: item.id, price: await priceIdForRung(next) }],
          proration_behavior: "none" as const,
        }
      : {}),
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("[stripe-webhook] signature check failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.paid": {
        const invoice = event.data.object;
        const subscriptionId =
          typeof invoice.parent?.subscription_details?.subscription === "string"
            ? invoice.parent.subscription_details.subscription
            : invoice.parent?.subscription_details?.subscription?.id;
        if (subscriptionId) {
          await advanceLadder(stripe, subscriptionId, invoice.id ?? event.id);
        }
        break;
      }
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "invoice.payment_failed":
      case "charge.dispute.created":
      case "charge.refunded":
        console.log(`[stripe-webhook] ${event.type}`, event.id);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe-webhook] handler failed for ${event.type}`, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
