import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { community } from "@/content/community";
import { Reveal } from "../reveal";

export function CommunityStrip() {
  const picks = community.slice(0, 3);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46ch]">
            <p className="label">The community</p>
            <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
              Posts we made, posts they posted.
            </h2>
          </div>

          <a
            href="/community"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Browse the community
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.06}>
              <a href="/community" className="group block">
                <div className="overflow-hidden border border-line bg-card shadow-[0_14px_34px_-26px_rgba(26,23,20,0.55)]">
                  <Image
                    src={entry.image}
                    alt={`${entry.format} post made for a listing in ${entry.suburb}`}
                    width={1080}
                    height={1350}
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                <p className="mt-3 flex items-baseline justify-between border-t border-line pt-2 text-[11px] uppercase tracking-[0.16em] text-muted">
                  <span>
                    {entry.format} · {entry.suburb}
                  </span>
                  <span className="text-muted/60">
                    {entry.example ? "Example" : entry.credit}
                  </span>
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
