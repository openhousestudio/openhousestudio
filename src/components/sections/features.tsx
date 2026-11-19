import { formats } from "@/content/formats";
import { Reveal } from "../reveal";
import { PostPreview } from "../post-preview";

export function Features() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-8 lg:px-8">
      <div className="space-y-24 lg:space-y-32">
        {formats.slice(0, 3).map((format, i) => (
          <Reveal key={format.id}>
            <div
              className={
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-16 " +
                (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")
              }
            >
              <div className="relative mx-auto w-full max-w-[340px]">
                <div
                  aria-hidden
                  className="absolute inset-8 -z-10 rounded-full bg-sand/60 blur-2xl"
                />
                <PostPreview post={format.post} format={format.name} />
              </div>

              <div className="max-w-[46ch]">
                <p className="label">{format.eyebrow}</p>
                <h2 className="display mt-4 text-[clamp(30px,3.6vw,48px)] text-ink">
                  {format.headline}
                </h2>
                <p className="mt-5 text-[17px] leading-[1.7] text-muted">{format.body}</p>
                <div className="mt-6 rounded-lg border border-line bg-card p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                    Included caption sample
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink/85">
                    “{format.caption}”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
