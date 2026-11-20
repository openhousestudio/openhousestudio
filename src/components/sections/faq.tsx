import { faqs } from "@/content/faq";
import { Reveal } from "../reveal";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="label">Questions</p>
          <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
            The things agents ask first.
          </h2>
        </div>

        <div className="divide-y divide-line border-t border-line">
          {faqs.map((item) => (
            <Reveal key={item.q}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-medium text-ink marker:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="mt-1 select-none text-primary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.7] text-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
