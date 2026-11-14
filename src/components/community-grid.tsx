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

function Card({ entry }: { entry: CommunityEntry }) {
  const featured = isFeatured(entry);

  return (
    <figure className="group">
      <div className="relative overflow-hidden border border-light/12 bg-light/5">
        <Image
          src={entry.image}
          alt={`${entry.format} post made for a listing in ${entry.suburb}`}
          width={1080}
          height={1350}
          className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
        {featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-light backdrop-blur-sm">
            Featured
          </span>
        ) : null}
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-light/12 pt-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-light/50">
          {entry.format} · {entry.suburb}
        </span>
        <span className="text-[11px] text-light/35">
          {entry.example ? "Example" : entry.credit}
        </span>
      </figcaption>
    </figure>
  );
}

export function CommunityGrid() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(() => {
    const sorted = sortCommunity(community);
    return filter === "All"
      ? sorted
      : sorted.filter((entry) => entry.format === filter);
  }, [filter]);

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
              "text-[11px] uppercase tracking-[0.16em] transition-colors " +
              (filter === format
                ? "text-light"
                : "text-light/40 hover:text-light/70")
            }
          >
            {format}
          </button>
        ))}
        <span className="ml-auto text-[11px] uppercase tracking-[0.16em] text-light/30">
          {visible.length} {visible.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <p className="mt-4 text-[12px] text-light/35">
        Being listed is free, for as long as you want. Paying only moves your post to the
        top.
      </p>

      {visible.length === 0 ? (
        <p className="mt-16 max-w-[46ch] text-[15px] leading-[1.7] text-light/50">
          Nothing here yet. Posts appear once the agent who paid for one says yes.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry) => (
            <Card key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
}
