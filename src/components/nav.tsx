"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-8">
        <a href="#top" aria-label="Open House Studio, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#free"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-light transition-colors hover:bg-primary-hover"
        >
          Start free
        </a>
      </div>
    </header>
  );
}
