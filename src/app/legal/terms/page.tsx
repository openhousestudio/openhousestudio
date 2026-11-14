import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms — Open House Studio" };

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-[140px]">
        <p className="label">Legal</p>
        <h1 className="display mt-4 text-[clamp(32px,4vw,48px)]">Terms</h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
          <p>
            Open House Studio is a monthly design service for real estate agents. You send
            listing details and photos; we send back finished social posts with captions.
            Access is personal to the subscriber.
          </p>
          <p>
            Requests are unlimited and worked through one queue in the order received, then
            delivered in the weekly drop, currently Monday. Turnaround is not guaranteed per
            request, only per drop.
          </p>
          <p>
            The Studio plan includes a commercial licence to use the delivered designs in
            marketing for listings you represent. You may not resell, redistribute, or share
            the design files themselves.
          </p>
          <p>
            Unlimited tweaks are included within seven days of delivery, sent as one list per
            asset. Changes requested after seven days are treated as new requests.
          </p>
          <p>
            Designs contain original artwork. No third-party trademarks, characters, or
            likenesses are included. You are responsible for the accuracy and legality of the
            content you publish.
          </p>
          <p>
            Prices start at ${site.price.start} per month, drop 5% each month of continuous
            subscription, and never fall below ${site.price.floor}. Cancelling resets the
            price to the current starting price if you return.
          </p>
          <p>
            The founder offer is ${site.founder.price} per month on a recurring monthly
            subscription and stays at that price for as long as the subscription continues.
            Founder subscriptions are refundable in full on request at any time before launch.
          </p>
          <p>
            Subscriptions renew automatically each month until cancelled. You can cancel at
            any time and keep access until the end of the paid period. No further charge is
            made after cancellation.
          </p>
          <p>
            Refunds are available within 7 days of a charge. Contact
            hello@openhousestudio.online.
          </p>
          <p>
            These terms are governed by New Zealand law. Nothing here limits your rights
            under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
