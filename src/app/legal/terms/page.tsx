import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = { title: "Terms — Open House Studio" };

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto max-w-[720px] px-6 pb-24 pt-[140px]">
        <p className="label">Legal</p>
        <h1 className="display mt-4 text-[clamp(32px,4vw,48px)]">Terms</h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
          <p>
            Open House Studio sells editable social media templates and captions on a
            monthly subscription. Access is personal to the subscriber.
          </p>
          <p>
            The Studio plan includes a commercial licence to use the templates in
            marketing for listings you represent. You may not resell, redistribute, or
            share the template files themselves.
          </p>
          <p>
            Templates contain original designs. No third-party trademarks, characters, or
            likenesses are included. You are responsible for the accuracy and legality of
            the content you publish.
          </p>
          <p>
            Prices start at $25 per month, drop 5% each month of continuous subscription,
            and never fall below $10. Cancelling resets the price to $25 if you return.
          </p>
          <p>
            The founder offer is $9 per month on a recurring monthly subscription. It was
            offered while the library was still being built and is locked for your first 12
            months. We will contact you before your price changes. Founder subscriptions are
            refundable in full on request at any time before launch.
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
