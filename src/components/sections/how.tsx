import { Reveal } from "../reveal";

const steps = [
  { title: "Send the listing", body: "Address, price and photos. One short form, no back and forth." },
  { title: "We design the posts", body: "Posts and captions in your brand, across any format you need." },
  { title: "Monday drop", body: "Everything lands in one batch, ready to post all week." },
  { title: "Tweak the post", body: "Unlimited tweaks for seven days after delivery, sent as one list." },
];

export function How() {
  return (
    <section id="how" className="scroll-mt-24 border-y border-line bg-card/50">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-32">
        <div>
          <p className="label">How it works</p>
          <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
            From listing photos to finished posts.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.7] text-muted">
            You send the listing. We send back posts you can publish without opening a
            design tool.
          </p>
        </div>

        <ol className="relative space-y-10 border-l border-line pl-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-bg text-[11px] tabular-nums text-primary"
                >
                  {i + 1}
                </span>
                <h3 className="font-sans text-[17px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
