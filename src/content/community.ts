export type CommunityEntry = {
  slug: string;
  image: string;
  format: "Listing" | "Open Home" | "Just Sold" | "Review" | "Story";
  suburb: string;
  credit: string;
  /**
   * Paid placement expires. Set this to an ISO date (YYYY-MM-DD) when the
   * purchase lands: today + 7 days for the week link, today + 30 for the month.
   * No cap on how many entries a person can feature.
   */
  featuredUntil?: string;
  /** Our own work, shown while the community is empty. Always labelled. */
  example?: boolean;
};

/**
 * Community entries are added by hand, with written permission from the agent.
 * Never add invented names, quotes, ratings, or engagement numbers.
 */
export const community: CommunityEntry[] = [
  {
    slug: "awa-road-just-listed",
    image: "/community/example-01.jpg",
    format: "Listing",
    suburb: "Onehunga",
    credit: "Example, made by the studio",
    example: true,
  },
  {
    slug: "awa-road-clear",
    image: "/community/example-02.jpg",
    format: "Open Home",
    suburb: "Onehunga",
    credit: "Example, made by the studio",
    example: true,
  },
  {
    slug: "awa-road-glass",
    image: "/community/example-03.jpg",
    format: "Just Sold",
    suburb: "Onehunga",
    credit: "Example, made by the studio",
    example: true,
  },
];

export function isFeatured(entry: CommunityEntry, now: Date = new Date()): boolean {
  if (!entry.featuredUntil) return false;
  const until = new Date(`${entry.featuredUntil}T23:59:59Z`);
  return Number.isFinite(until.getTime()) && until > now;
}

export function featuredUntilTime(entry: CommunityEntry): number {
  if (!entry.featuredUntil) return 0;
  const time = new Date(`${entry.featuredUntil}T23:59:59Z`).getTime();
  return Number.isFinite(time) ? time : 0;
}

/** Active placements first, longest purchase highest. Everything else is newest first. */
export function sortCommunity(
  entries: CommunityEntry[],
  now: Date = new Date(),
): CommunityEntry[] {
  const featured = entries
    .filter((entry) => isFeatured(entry, now))
    .sort((a, b) => featuredUntilTime(b) - featuredUntilTime(a));
  const rest = entries.filter((entry) => !isFeatured(entry, now));
  return [...featured, ...rest];
}

export const communityFormats = [
  "All",
  "Listing",
  "Open Home",
  "Just Sold",
  "Review",
  "Story",
] as const;
