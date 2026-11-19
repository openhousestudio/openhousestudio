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
          <div className="max-w-[600px]">
            <p className="label">The community</p>
            <h2 className="display mt-4 text-[clamp(30px,4vw,56px)] text-ink">
              Five formats, built for real listings.
            </h2>
          </div>

          <a
            href="/community"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-primary transition-colors hover:text-primary-hover"
          >
            <span className="relative">
              Browse the community
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.06}>
              <a href="/community" className="group block">
                <p className="mb-2 flex items-baseline justify-between text-[11px] uppercase tracking-[0.16em] text-muted">
                  <span>
                    {entry.format} · {entry.suburb}
                  </span>
                  <span className="text-muted/50">
                    {entry.example ? "Sample" : "View"}
                  </span>
                </p>
                <div className="aspect-[4/5] overflow-hidden border border-line bg-card shadow-[0_14px_34px_-26px_rgba(26,23,20,0.55)] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-ink/20 group-hover:shadow-[0_20px_40px_-24px_rgba(26,23,20,0.5)]">
                  <Image
                    src={entry.image}
                    alt={`${entry.format} post made for a listing in ${entry.suburb}`}
                    width={1080}
                    height={entry.format === "Story" ? 1920 : 1350}
                    className={
                      "h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.045] " +
                      (entry.format === "Story" ? "object-top" : "object-center")
                    }
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
