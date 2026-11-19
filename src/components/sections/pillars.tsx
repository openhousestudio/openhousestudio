import { PenLine, House, CalendarClock } from "lucide-react";
import { Reveal } from "../reveal";

const pillars = [
  {
    icon: PenLine,
    title: "Captions included",
    body: "Every post arrives with the property copy already written. No blank caption box—just approve and post.",
  },
  {
    icon: CalendarClock,
    title: "48-hour turnaround",
    body: "List on Wednesday, post your open house by Friday. Fast two-business-day delivery built around real estate timelines.",
  },
  {
    icon: House,
    title: "Simple active queue",
    body: "Queue as many listings as you like. We deliver one active request every 48 hours—up to 3 full packs a week, zero per-post fees.",
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
