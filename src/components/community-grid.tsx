"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  community,
  communityFormats,
  isFeatured,
  sortCommunity,
  type CommunityEntry,
} from "@/content/community";

function Card({ entry, compact = false }: { entry: CommunityEntry; compact?: boolean }) {
  const featured = isFeatured(entry);

  return (
    <figure className="group transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <figcaption className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.16em] text-light/50">
          {entry.format} · {entry.suburb}
        </span>
        {entry.example && !compact ? (
          <span className="text-[10px] text-light/30">Example</span>
        ) : null}
      </figcaption>

      <div className="relative aspect-[4/5] overflow-hidden border border-light/12 bg-[#F7F4EF] transition-colors duration-300 group-hover:border-light/30">
        <Image
          src={entry.image}
          alt={`${entry.format} post made for a listing in ${entry.suburb}`}
          width={1080}
          height={entry.format === "Story" ? 1920 : 1350}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
        {featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-light backdrop-blur-sm">
            Featured
          </span>
        ) : null}

        {/* contact bar slides up on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-ink/90 px-4 py-3 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[11px] uppercase tracking-[0.14em] text-light/50">Agent</p>
          <p className="mt-1 text-[13px] font-medium text-light">{entry.contact.name}</p>
          <p className="text-[12px] text-light/70">{entry.contact.phone}</p>
        </div>
      </div>
    </figure>
  );
}

export function CommunityGrid() {
  const [filter, setFilter] = useState<string>("All");

  const { featured, free } = useMemo(() => {
    const sorted = sortCommunity(community).filter(
      (entry) => filter === "All" || entry.format === filter,
    );
    return {
      featured: sorted.filter((entry) => isFeatured(entry)),
      free: sorted.filter((entry) => !isFeatured(entry)),
    };
  }, [filter]);

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
            <Card key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : null}

      {free.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {free.map((entry) => (
            <Card key={entry.slug} entry={entry} compact />
          ))}
        </div>
      ) : null}
    </>
  );
}
