import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedForm } from "@/components/featured-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your featured spot — Open House Studio",
  robots: { index: false, follow: false },
};

export default async function FeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const plan = params.plan === "month" ? "month" : "week";

  return (
    <main className="mx-auto max-w-[720px] px-6 pb-24 pt-[120px]">
      <Link
        href="/"
        className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-primary"
      >
        Open House Studio
      </Link>

      <p className="label mt-10">Featured spot</p>
      <h1 className="display mt-4 text-[clamp(36px,5vw,56px)] text-ink">One thing left.</h1>

      <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
        We have your payment. Tell us what to put up and it goes live within one working
        day.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["week", "month"] as const).map((key) => {
          const option = site.community[key];
          const active = key === plan;
          return (
            <p
              key={key}
              className={
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] " +
                (active
                  ? "border-ink bg-ink text-light"
                  : "border-line text-muted")
              }
            >
              {active ? (
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              ) : null}
              {option.days} days at the top · ${option.price}
              {active ? " · paid" : ""}
            </p>
          );
        })}
      </div>

      <FeaturedForm plan={plan} />

      <p className="mt-10 text-[12px] leading-[1.6] text-muted">
        Buying placement moves your post to the top of the community page for the period
        paid. It does not guarantee views, clicks or enquiries. Questions:
        hello@openhousestudio.online
      </p>
    </main>
  );
}
