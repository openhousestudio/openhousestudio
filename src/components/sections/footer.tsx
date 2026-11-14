import { DoorMark } from "../door-mark";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <DoorMark className="h-7 w-7" />
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink">
                Open House Studio
              </span>
            </div>
            <p className="mt-4 max-w-[28ch] text-[13px] leading-[1.6] text-muted">
              Unlimited social posts for real estate agents, with the captions
              already written.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Product</p>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/80">
              <li><a href="#formats" className="hover:text-primary">Formats</a></li>
              <li><a href="#how" className="hover:text-primary">How it works</a></li>
              <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              <li><a href="#free" className="hover:text-primary">Free templates</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Company</p>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/80">
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Legal</p>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/80">
              <li><a href="/legal/privacy" className="hover:text-primary">Privacy</a></li>
              <li><a href="/legal/terms" className="hover:text-primary">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Open House Studio · New Zealand</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
