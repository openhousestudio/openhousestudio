const steps = [
  {
    title: "Send the listing link or photos",
    body: "Paste your listing URL, or drop in the address, price and photos. One short form, no calls or meetings.",
  },
  {
    title: "We design and write the copy",
    body: "We lay out your photos in clean studio formats and write the property caption in a natural agent voice.",
  },
  {
    title: "Delivered in 48 hours",
    body: "Your finished post pack and captions arrive in 48 hours, fast enough for mid-week listings and Saturday open homes.",
  },
  {
    title: "Next in queue and 7-day tweaks",
    body: "As soon as one request is delivered, your next queued listing starts. Ask for unlimited tweaks for seven days.",
  },
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
            <li key={step.title} className="reveal relative">
              <span
                aria-hidden
                className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-bg text-[10px] tabular-nums text-primary"
              >
                {i + 1}
              </span>
              <h3 className="font-sans text-[17px] font-semibold text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
