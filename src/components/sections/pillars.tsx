import { PenLine, House, CalendarClock } from "lucide-react";
import { Reveal } from "../reveal";

const pillars = [
  {
    icon: PenLine,
    title: "Captions included",
    body: "The words are already written. Swap the address and post.",
  },
  {
    icon: House,
    title: "Built for property",
    body: "Listing, open house, just sold, review, story. Nothing generic.",
  },
  {
    icon: CalendarClock,
    title: "Fresh every month",
    body: "Ten new templates a month, so the library keeps growing.",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-8 lg:py-32">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div className="h-full rounded-lg border border-line bg-card p-7">
              <pillar.icon className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="mt-5 font-sans text-[17px] font-semibold text-ink">
                {pillar.title}
              </h2>
              <p className="mt-2 text-[15px] leading-[1.65] text-muted">{pillar.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
