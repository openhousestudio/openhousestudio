import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = { title: "Privacy — Open House Studio" };

export default function PrivacyPage() {
  return (
    <>
      <main id="main" className="mx-auto max-w-[720px] px-6 pb-24 pt-[120px]">
        <a href="/" className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-ink">
          ← Back to Open House Studio
        </a>
        <p className="label">Legal</p>
        <h1 className="display mt-4 text-[clamp(32px,4vw,48px)]">Privacy</h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
          <p>
            We collect your email address when you request the free templates or
            subscribe. We use it to send the templates, occasional product updates, and
            nothing else.
          </p>
          <p>
            Payments are handled by Stripe. We never see or store your card details.
            Email delivery and list management are handled by our email provider.
          </p>
          <p>
            You can unsubscribe from any email, or ask us to delete your data, by writing
            to hello@openhousestudio.online. We keep records only as long as needed for
            tax and accounting.
          </p>
          <p>
            This policy is governed by the New Zealand Privacy Act 2020.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
