"use client";

import { useState } from "react";
import { priceLadder, site } from "@/lib/site";

/**
 * The price ladder as a milestone tracker: every month is a real control, so
 * the visitor can see what the price becomes rather than reading a string.
 */
export function PriceLadder() {
  const [index, setIndex] = useState(0);
  const price = priceLadder[index];
  const month = index + 1;
  const atFloor = index === priceLadder.length - 1;
  const savings = site.price.start - price;

  return (
    <div className="rounded-lg border border-bg/10 p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-bg/50">
            The price ladder
          </p>
          <p className="mt-3 font-sans text-[15px] text-bg/70">
            {atFloor ? "The floor. It stays here." : `Month ${month} of ${priceLadder.length}`}
          </p>
          <p className="mt-1 font-sans text-[13px] text-bg/50">
            {savings > 0
              ? `$${savings} less than month one`
              : "Full price for the first month"}
          </p>
        </div>

        <p className="font-sans text-4xl font-semibold tabular-nums text-bg">
          ${price}
          <span className="text-base font-normal text-bg/60">/mo</span>
        </p>
      </div>

      <div className="mt-5 flex items-end gap-1" role="group" aria-label="Monthly price ladder">
        {priceLadder.map((value, i) => {
          const active = i === index;
          const height = 14 + ((value - site.price.floor) / (site.price.start - site.price.floor)) * 34;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setIndex(i)}
              onFocus={() => setIndex(i)}
              onClick={() => setIndex(i)}
              aria-label={`Month ${i + 1}, $${value} per month`}
              aria-pressed={active}
              className="group/step flex-1 rounded-sm pt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                className={
                  "block w-full rounded-sm transition-all duration-200 " +
                  (active
                    ? "bg-accent"
                    : "bg-bg/20 group-hover/step:bg-bg/40")
                }
                style={{ height: `${height}px` }}
              />
              <span
                className={
                  "mt-2 block text-center text-[10px] tabular-nums transition-colors " +
                  (active ? "text-bg" : "text-bg/40 group-hover/step:text-bg/70")
                }
              >
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[12px] text-bg/45">
        Drops 5% each month you stay, down to ${site.price.floor}. Hover a month to see it.
      </p>
    </div>
  );
}
