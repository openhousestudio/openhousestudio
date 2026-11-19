"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  community,
  communityFormats,
  isFeatured,
  sortCommunity,
  type CommunityEntry,
} from "@/content/community";

function Card({
  entry,
  onOpen,
}: {
  entry: CommunityEntry;
  onOpen: (entry: CommunityEntry) => void;
}) {
  const featured = isFeatured(entry);

  return (
    <figure className="group">
      <figcaption className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.16em] text-light/50">
          {entry.format} · {entry.suburb}
        </span>
        {entry.example ? (
          <span className="text-[10px] uppercase tracking-[0.14em] text-light/35">Sample</span>
        ) : null}
      </figcaption>

      <button
        type="button"
        onClick={() => onOpen(entry)}
        aria-label={`Open the ${entry.format} post from ${entry.suburb}`}
        className="relative block aspect-[4/5] w-full overflow-hidden border border-light/12 bg-bg text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-light/35 focus-visible:border-light/60"
      >
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
        {featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-light backdrop-blur-sm">
            Featured
          </span>
        ) : null}

        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-ink/90 px-4 py-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="block">
            <span className="block text-[9px] uppercase tracking-[0.14em] text-light/40">
              {entry.example ? "Format sample" : "Agent"}
            </span>
            <span className="mt-0.5 block text-[12px] font-medium text-light">
              {entry.contact.name}
            </span>
            <span className="block text-[11px] text-light/60">{entry.contact.phone}</span>
          </span>
          <span className="pb-0.5 text-[11px] uppercase tracking-[0.14em] text-light/70">
            View
          </span>
        </span>
      </button>
    </figure>
  );
}

function Lightbox({
  entry,
  onClose,
}: {
  entry: CommunityEntry;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.format} post from ${entry.suburb}`}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex max-h-[90vh] w-full max-w-[1120px] flex-col gap-6 overflow-y-auto p-4 sm:p-8 lg:flex-row lg:items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 -mb-2 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-light/25 bg-ink/70 px-4 text-[13px] text-light backdrop-blur-sm transition-colors duration-150 hover:border-light/50 hover:bg-ink active:translate-y-px"
          >
            Close
          </button>
        </div>

        <div className="mx-auto max-h-[64vh] w-auto overflow-hidden border border-light/15 bg-light/5 lg:max-h-[78vh]">
          <Image
            src={entry.image}
            alt={`${entry.format} post made for a listing in ${entry.suburb}`}
            width={1080}
            height={entry.format === "Story" ? 1920 : 1350}
            className="h-auto max-h-[64vh] w-auto lg:max-h-[78vh]"
            priority
          />
        </div>

        <div className="w-full shrink-0 lg:w-[300px]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-sand">
            {isFeatured(entry) ? "Featured · " : ""}
            {entry.format}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[30px] leading-tight text-light">
            {entry.suburb}
          </p>

          <div className="mt-6 border-t border-light/15 pt-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-light/40">
              {entry.example ? "Format sample" : "Agent"}
            </p>
            <p className="mt-2 text-[15px] text-light">{entry.contact.name}</p>
            <p className="text-[14px] text-light/60">{entry.contact.phone}</p>
          </div>

          {entry.example ? (
            <p className="mt-6 text-[12px] leading-[1.6] text-light/45">
              Sample made by the studio, not a real listing.
            </p>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="mt-8 hidden items-center rounded-full border border-light/25 px-5 py-2.5 text-[13px] text-light transition-all duration-200 hover:-translate-y-px hover:border-light/50 active:translate-y-0 lg:inline-flex"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommunityGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<CommunityEntry | null>(null);

  const { featured, free } = useMemo(() => {
    const sorted = sortCommunity(community).filter(
      (entry) => filter === "All" || entry.format === filter,
    );
    return {
      featured: sorted.filter((entry) => isFeatured(entry)),
      free: sorted.filter((entry) => !isFeatured(entry)),
    };
  }, [filter]);

  const close = useCallback(() => setActive(null), []);
  const total = featured.length + free.length;

  if (total === 0) {
    return (
      <p className="mt-16 max-w-[46ch] text-[15px] leading-[1.7] text-light/50">
        Nothing here yet. Posts appear once the agent who paid for one says yes.
      </p>
    );
  }

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-light/12 py-4">
        {communityFormats.map((format) => (
          <button
            key={format}
            type="button"
            onClick={() => setFilter(format)}
            aria-pressed={filter === format}
            className={
              "text-[11px] uppercase tracking-[0.16em] transition-all duration-200 active:translate-y-px " +
              (filter === format
                ? "text-light"
                : "text-light/40 hover:text-light/70")
            }
          >
            {format}
          </button>
        ))}
        <span className="ml-auto text-[11px] uppercase tracking-[0.16em] text-light/30">
          {total} {total === 1 ? "post" : "posts"}
        </span>
      </div>

      {featured.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => (
            <Card key={entry.slug} entry={entry} onOpen={setActive} />
          ))}
        </div>
      ) : null}

      {free.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {free.map((entry) => (
            <Card key={entry.slug} entry={entry} onOpen={setActive} />
          ))}
        </div>
      ) : null}

      {active ? <Lightbox entry={active} onClose={close} /> : null}
    </>
  );
}
