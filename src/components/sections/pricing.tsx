import { Check, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { PriceLadder } from "../price-ladder";
import { Reveal } from "../reveal";
import { SubscribeButton } from "../subscribe-button";

export function Pricing() {
  const stripeReady = Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <section id="pricing" className="scroll-mt-24 bg-ink py-24 text-bg lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="max-w-[54ch]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            Pricing
          </p>
          <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-bg">
            Start at ${site.price.start}. Pay less every month.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-bg/70">
            Every month you stay, your price drops 5%, down to ${site.price.floor}. Cancel
            and come back, and the clock resets.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-bg/15 p-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-bg/60">Free</p>
              <p className="mt-4 font-sans text-4xl font-semibold tabular-nums">$0</p>
              <ul className="mt-7 space-y-3 text-[15px] text-bg/80">
                {[
                  "Five sample posts, one per format",
                  "1 custom post made from your own listing link",
                  "Captions included for every post",
                  "No card required",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#free"
                className="mt-8 inline-flex rounded-full border border-bg/25 px-6 py-3 text-sm font-medium text-bg transition-all duration-150 hover:-translate-y-px hover:border-bg/50 active:translate-y-0 active:scale-[0.985]"
              >
                Get the free pack
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-accent bg-bg/[0.04] p-8">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Studio</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-bg/50">
                  48-hour queue
                </p>
              </div>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-bg/20 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-bg/60">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Not on sale yet
              </p>
              <p className="mt-4 font-sans text-4xl font-semibold tabular-nums">
                ${site.price.start}
                <span className="text-lg font-normal text-bg/60">/month today</span>
              </p>
              <ul className="mt-7 space-y-3 text-[15px] text-bg/80">
                {[
                  "Unlimited requests in your queue (1 active at a time)",
                  "48-hour turnaround (2–3 full listing packs/week)",
                  "Captions written for every post",
                  "Unlimited tweaks for 7 days",
                  "Cancel any time",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#free"
                className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-all duration-150 hover:-translate-y-px hover:bg-primary active:translate-y-0 active:scale-[0.985]"
              >
                Start free, upgrade later
              </a>
              {stripeReady ? (
                <div className="mt-3">
                  <SubscribeButton
                    label={`Subscribe at $${site.price.start}/month`}
                    className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-6 py-3 text-sm font-medium text-bg transition-colors hover:border-bg/50 disabled:opacity-70"
                  />
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 rounded-lg border border-accent/40 bg-bg/[0.04] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
              Founder mode · Limited to {site.founder.spots} early spots
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-bg/60">
              7-day full refund guarantee
            </p>
          </div>
          <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.7] text-bg/80">
            The Studio plan at ${site.price.start} is not on sale yet. Until it opens, we are
            taking on {site.founder.spots} founding agents at ${site.founder.price} a month,
            locked for as long as you stay. Same 48-hour turnaround, same active request
            queue—and you keep the ${site.founder.price} rate when Studio launches.
          </p>
          <a
            href={site.founder.checkoutUrl}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-all duration-150 hover:-translate-y-px hover:bg-primary active:translate-y-0 active:scale-[0.985]"
          >
            Claim a founder spot — ${site.founder.price}/mo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-10">
          <PriceLadder />
        </div>
      </div>
    </section>
  );
}
