import { ArrowRight } from "lucide-react";
import { formats } from "@/content/formats";
import { Glow } from "../glow";
import { PostPreview } from "../post-preview";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-[112px] md:pb-24 md:pt-[140px]"
    >
      <Glow />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8">
        <div>
          <p className="label">Unlimited posts for agents</p>

          <h1 className="display mt-5 text-[clamp(44px,6vw,88px)] text-ink">
            <span className="block">Post like</span>
            <span className="block">your listing</span>
            <span className="block">deserves it.</span>
          </h1>

          <p className="mt-7 max-w-[46ch] text-[18px] leading-[1.65] text-muted">
            Send us your listing and we send back the posts. Unlimited requests, every
            caption written, one drop every Monday. Your price drops every month you stay.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#free"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-medium text-light transition-all duration-200 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0"
            >
              Get 5 free templates
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-px hover:border-ink/30 active:translate-y-0"
            >
              See how pricing works
            </a>
          </div>

          <p className="mt-8 text-[13px] text-muted">
            Unlimited requests · Monday drops · captions included · no design skills
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px]">
          <div className="relative aspect-[4/5]">
            <PostPreview post={formats[3].post} format={formats[3].name} />
          </div>
        </div>
      </div>
    </section>
  );
}
