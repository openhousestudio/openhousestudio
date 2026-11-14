import { formats } from "@/content/formats";
import { Reveal } from "../reveal";

export function Formats() {
  return (
    <section id="formats" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32">
      <div className="max-w-[52ch]">
        <p className="label">The library</p>
        <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
          Five formats. One library.
        </h2>
        <p className="mt-5 text-[17px] leading-[1.7] text-muted">
          Every format covers a different week of an agent's job: the announcement,
          the weekend, the result, the proof, and the quiet days in between.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {formats.map((format, i) => (
          <Reveal key={format.id} delay={i * 0.06}>
            <div className="group relative h-full overflow-hidden rounded-lg border border-line bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_40px_-24px_rgba(26,23,20,0.45)]">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 text-[12px] font-semibold tabular-nums text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-sans text-[17px] font-semibold text-ink">
                {format.name}
              </h3>
              <p className="mt-2 inline-flex rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium tabular-nums text-ink/70">
                {format.count} templates
              </p>
              <p className="mt-4 text-[14px] leading-[1.6] text-muted">{format.blurb}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
