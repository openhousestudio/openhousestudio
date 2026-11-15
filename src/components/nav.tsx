"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Nav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const dark = variant === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 h-[76px] transition-colors duration-300 " +
        (scrolled
          ? dark
            ? "border-b border-light/10 bg-ink/90 backdrop-blur-md"
            : "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-8">
        <a
          href="/"
          aria-label="Open House Studio, back to home"
          className={dark ? "text-light" : "text-ink"}
        >
          <Wordmark tone={dark ? "light" : "ink"} />
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

        <a
          href="/#free"
          className={
            "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.985] " +
            (dark
              ? "border border-light/25 text-light hover:border-light/50"
              : "bg-primary text-light hover:bg-primary-hover")
          }
        >
          Start free
        </a>
      </div>
    </header>
  );
}
