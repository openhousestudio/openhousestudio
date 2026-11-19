export type CommunityEntry = {
  slug: string;
  image: string;
  format: "Listing" | "Open Home" | "Just Sold" | "Review" | "Story";
  suburb: string;
  /** Shown on hover. Replace the placeholders with the agent's real details. */
  contact: { name: string; phone: string };
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
    slug: "awa-road-listing",
    image: "/community/post-01-listing.jpg",
    format: "Listing",
    suburb: "Onehunga",
    contact: { name: "Studio sample", phone: "Awa Road, Onehunga" },
    example: true,
  },
  {
    slug: "awa-road-open-home",
    image: "/community/post-02-open-home.jpg",
    format: "Open Home",
    suburb: "Onehunga",
    contact: { name: "Studio sample", phone: "Awa Road, Onehunga" },
    example: true,
  },
  {
    slug: "awa-road-sold",
    image: "/community/post-03-just-sold.jpg",
    format: "Just Sold",
    suburb: "Onehunga",
    contact: { name: "Studio sample", phone: "Awa Road, Onehunga" },
    example: true,
  },
  {
    slug: "client-review",
    image: "/community/post-04-review.jpg",
    format: "Review",
    suburb: "Onehunga",
    contact: { name: "Studio sample", phone: "Awa Road, Onehunga" },
    example: true,
  },
  {
    slug: "onehunga-story",
    image: "/community/post-05-story.jpg",
    format: "Story",
    suburb: "Onehunga",
    contact: { name: "Studio sample", phone: "Awa Road, Onehunga" },
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
