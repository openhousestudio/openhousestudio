import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms — Open House Studio" };

export default function TermsPage() {
  return (
    <>
      <main id="main" className="mx-auto max-w-[720px] px-6 pb-24 pt-[120px]">
        <a href="/" className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-ink">
          ← Back to Open House Studio
        </a>
        <p className="label">Legal</p>
        <h1 className="display mt-4 text-[clamp(32px,4vw,48px)]">Terms</h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
          <p>
            Open House Studio is a monthly design service for real estate agents. You send
            listing details and photos; we send back finished social posts with captions.
            Access is personal to the subscriber.
          </p>
          <p>
            You can submit as many requests to your queue as you like. Requests are worked
            one active request at a time in the order received, with a typical turnaround of
            48 hours (two business days) per active request. One request covers a single
            format pack for one listing (for example, a listing carousel, an open house feed
            and story set, a just-sold post, a client review, or a story set) along with its
            written caption.
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
            Community listings are free and stay up for as long as the agent wants, subject
            to a written opt-in and the content rules. Featured placement is a one-off
            purchase: {site.community.week.days} days for ${site.community.week.price}, or{" "}
            {site.community.month.days} days for ${site.community.month.price}. It buys
            position at the top of the community page and nothing else. Views, clicks, and
            enquiries are not guaranteed. Placement is always labelled, expires on the date
            purchased, and is not refundable once it starts.
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
