import { Reveal } from "../reveal";

const steps = [
  { title: "Pick a format", body: "Listing, open house, just sold, review or story." },
  { title: "Swap the details", body: "Address, price, photos. The layout holds." },
  { title: "Paste the caption", body: "Written for you. Change the street name and go." },
  { title: "Post it", body: "Feed, story, or both. No design skills required." },
];

export function How() {
  return (
    <section id="how" className="scroll-mt-24 border-y border-line bg-card/50">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-32">
        <div>
          <p className="label">How it works</p>
          <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
            From listing to post in four steps.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.7] text-muted">
            The whole job is under two minutes once the photos are in your phone.
          </p>
        </div>

        <ol className="relative space-y-10 border-l border-line pl-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-bg text-[10px] tabular-nums text-primary"
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
