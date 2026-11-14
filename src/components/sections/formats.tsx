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
            <div className="h-full rounded-lg border border-line bg-card p-6 shadow-[0_14px_34px_-26px_rgba(26,23,20,0.55)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-sans text-[17px] font-semibold text-ink">
                {format.name}
              </h3>
              <p className="mt-1 text-[13px] tabular-nums text-muted">
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
