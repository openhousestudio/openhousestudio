"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Nav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 h-[76px] transition-colors duration-300 " +
        (scrolled || open
          ? dark
            ? "border-b border-light/10 bg-ink/95 backdrop-blur-md"
            : "border-b border-line bg-bg/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-3 px-6 lg:px-8">
        <a
          href="/"
          aria-label="Open House Studio, back to home"
          className={dark ? "text-light" : "text-ink"}
        >
          <Wordmark compact tone={dark ? "light" : "ink"} />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href.startsWith("#") ? `/${item.href}` : item.href}
              className={
                "text-[15px] transition-colors " +
                (dark
                  ? "text-light/75 hover:text-light"
                  : "text-ink/80 hover:text-primary")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#free"
            className={
              "hidden min-h-11 items-center rounded-full px-5 text-sm font-medium transition-all duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.985] md:inline-flex " +
              (dark
                ? "border border-light/25 text-light hover:border-light/50"
                : "bg-primary text-light hover:bg-primary-hover")
            }
          >
            Get the free sample pack
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors md:hidden " +
              (dark
                ? "border-light/25 text-light hover:border-light/50"
                : "border-line text-ink hover:border-ink/40")
            }
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className={
            "absolute inset-x-0 top-[76px] h-[calc(100dvh-76px)] overflow-y-auto border-b px-6 pb-8 pt-2 md:hidden " +
            (dark ? "border-light/10 bg-ink" : "border-line bg-bg")
          }
        >
          <nav aria-label="Sections, mobile">
            <ul
              className={
                "border-t " +
                (dark
                  ? "divide-y divide-light/10 border-light/10"
                  : "divide-y divide-line/70 border-line/70")
              }
            >
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    onClick={() => setOpen(false)}
                    className={
                      "flex min-h-12 items-center text-[16px] " +
                      (dark ? "text-light/85" : "text-ink")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="/#free"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-light"
          >
            Get the free sample pack
          </a>
        </div>
      ) : null}
    </header>
  );
}
