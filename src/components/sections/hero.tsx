import Image from "next/image";
import { ArrowRight } from "lucide-react";

const lines = ["Social posts", "and captions", "for solo agents."];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-[112px] md:pb-24 md:pt-[140px]"
    >
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8">
        <div>
          <p className="label">Open House Studio</p>

          <h1 className="display mt-5 text-balance text-[clamp(36px,5vw,72px)] text-ink">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-muted sm:mt-7 sm:text-[18px] sm:leading-[1.65]">
            Send your listing link or photos. We return finished posts with the property
            captions already written in 48 hours. One active request at a time, at a monthly
            price that drops 5% every month you stay.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#free"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-medium text-light transition-all duration-200 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.985] sm:w-auto"
            >
              Get the free sample pack
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#pricing"
              className="inline-flex min-h-11 items-center px-1 text-[14px] font-medium text-muted underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-ink"
            >
              View pricing and the decay ladder
            </a>
          </div>

          <p className="mt-8 text-[13px] text-muted">
            48-hour delivery · captions included · USD pricing · cancel any time
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[470px] items-center justify-between gap-4">
          <div className="aspect-[4/5] w-[33%] overflow-hidden rounded-lg border border-line bg-card shadow-[0_18px_44px_-28px_rgba(26,23,20,0.5)]">
            <Image
              src="/community/post-02-open-home.jpg"
              alt="Open home post made by Open House Studio for Awa Road, Onehunga"
              width={1080}
              height={1350}
              sizes="(min-width: 1024px) 160px, 33vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="aspect-[4/5] w-[63%] overflow-hidden rounded-xl border border-line bg-card shadow-[0_26px_60px_-34px_rgba(26,23,20,0.5)]">
            <Image
              src="/community/post-01-listing.jpg"
              alt="Listing post made by Open House Studio for Awa Road, Onehunga"
              width={1080}
              height={1350}
              priority
              sizes="(min-width: 1024px) 300px, 63vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
