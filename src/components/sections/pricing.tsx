import { Check, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { PriceLadder } from "../price-ladder";
import { Reveal } from "../reveal";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-ink py-24 text-bg lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="max-w-[56ch]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-sand">
            Pricing
          </p>
          <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-bg">
            Start at ${site.price.start} USD. Pay 5% less every month you stay.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-bg/70">
            Every month you stay, your price drops 5%, down to ${site.price.floor} USD.
            Cancel and come back, and the clock resets.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-xl border border-bg/15 p-8">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.16em] text-bg/60">
                  Free sample pack
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-bg/45">
                  No card
                </p>
              </div>
              <p className="mt-4 font-sans text-4xl font-semibold tabular-nums">
                $0
                <span className="text-lg font-normal text-bg/60"> USD</span>
              </p>
              <ul className="mt-7 space-y-3 text-[15px] text-bg/80">
                {[
                  "Five sample posts, one per format",
                  "1 custom post made from your own listing link",
                  "Captions included for every post",
                  "No card required",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#free"
                className="mt-auto inline-flex min-h-11 items-center rounded-full border border-bg/25 px-6 py-3 text-sm font-medium text-bg transition-all duration-150 hover:-translate-y-px hover:border-bg/50 active:translate-y-0 active:scale-[0.985]"
              >
                Get the free sample pack
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-xl border border-sand/40 bg-bg/[0.04] p-8">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.16em] text-sand">
                  Founder plan
                </p>
                <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-bg/60">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sand" />
                  Open now, {site.founder.spots} spots
                </p>
              </div>
              <p className="mt-4 font-sans text-4xl font-semibold tabular-nums">
                ${site.founder.price}
                <span className="text-lg font-normal text-bg/60"> USD/month</span>
              </p>
              <p className="mt-2 text-[13px] text-bg/55">
                Locked at ${site.founder.price} a month for as long as you stay.
              </p>
              <ul className="mt-7 space-y-3 text-[15px] text-bg/80">
                {[
                  "One active request at a time, queued as deep as you like",
                  "48-hour delivery, so two to three full packs a week",
                  "Captions written for every post",
                  "Unlimited tweaks for 7 days",
                  "7-day full refund guarantee",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={site.founder.checkoutUrl}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-light transition-all duration-150 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.985]"
              >
                Claim a founder spot
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 rounded-lg border border-bg/12 p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-[56ch]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-bg/60">
                Studio launch pricing · ${site.price.start} to ${site.price.floor} USD/month
              </p>
              <p className="mt-3 text-[15px] leading-[1.7] text-bg/70">
                When the {site.founder.spots} founder spots fill, public Studio
                subscriptions open on the 5% monthly decay ladder, from ${site.price.start}
                {" "}down to ${site.price.floor}. Founders keep ${site.founder.price} for as
                long as they stay.
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-bg/40">
              Not on sale yet
            </p>
          </div>

          <div className="mt-8">
            <PriceLadder />
          </div>
        </div>
      </div>
    </section>
  );
}
