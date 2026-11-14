import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { CommunityGrid } from "@/components/community-grid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community — Open House Studio",
  description:
    "Real posts made for real listings. See what agents are publishing with Open House Studio, and ask for yours to be shown.",
};

export default function CommunityPage() {
  return (
    <>
      <Nav variant="dark" />
      <main className="min-h-screen bg-ink text-light">
        <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-[140px] lg:px-8 lg:pb-32 lg:pt-[180px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            Community
          </p>

          <h1 className="display mt-6 max-w-[18ch] text-[clamp(44px,7vw,96px)] text-light">
            Real posts, real listings.
          </h1>

          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-light/60">
            Every post here was made for an agent, then published by them. Nothing is
            invented, and nobody is shown without asking first.
          </p>

          <CommunityGrid />
        </section>

        <section className="border-t border-light/12">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                Your post here
              </p>
              <h2 className="display mt-4 max-w-[24ch] text-[clamp(30px,4vw,52px)] text-light">
                Want yours in the grid?
              </h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-light/60">
                Tell us when you want a post featured. Featured spots sit at the top of the
                page and are always labelled. Nothing else about the order is for sale.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/#free"
                className="inline-flex items-center rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-primary hover:text-light"
              >
                Become a founder
              </a>
              <a
                href={`mailto:${site.email}?subject=Community%20feature`}
                className="inline-flex items-center rounded-full border border-light/25 px-6 py-3.5 text-[15px] font-medium text-light transition-colors hover:border-light/50"
              >
                Ask about a feature
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-light/12">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-10 text-[12px] text-light/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>© 2026 Open House Studio · New Zealand</p>
            <div className="flex gap-6">
              <a href="/" className="hover:text-light">
                Home
              </a>
              <a href="/legal/privacy" className="hover:text-light">
                Privacy
              </a>
              <a href="/legal/terms" className="hover:text-light">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
