export type CommunityEntry = {
  slug: string;
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
    slug: "awa-road-just-listed",
    format: "Listing",
    suburb: "Onehunga",
    contact: { name: "[Agent name]", phone: "[phone]" },
    featuredUntil: "2026-12-31",
    example: true,
  },
  {
    slug: "awa-road-clear",
    format: "Open Home",
    suburb: "Onehunga",
    contact: { name: "[Agent name]", phone: "[phone]" },
    featuredUntil: "2026-12-24",
    example: true,
  },
  {
    slug: "awa-road-glass",
    format: "Just Sold",
    suburb: "Onehunga",
    contact: { name: "[Agent name]", phone: "[phone]" },
    featuredUntil: "2026-12-17",
    example: true,
  },
  {
    slug: "morningside-review",
    format: "Review",
    suburb: "Morningside",
    contact: { name: "[Agent name]", phone: "[phone]" },
    example: true,
  },
  {
    slug: "kingsland-story",
    format: "Story",
    suburb: "Kingsland",
    contact: { name: "[Agent name]", phone: "[phone]" },
    example: true,
  },
  {
    slug: "grey-lynn-listing",
    format: "Listing",
    suburb: "Grey Lynn",
    contact: { name: "[Agent name]", phone: "[phone]" },
    example: true,
  },
  {
    slug: "ponsonby-open-home",
    format: "Open Home",
    suburb: "Ponsonby",
    contact: { name: "[Agent name]", phone: "[phone]" },
    example: true,
  },
  {
    slug: "eden-terrace-sold",
    format: "Just Sold",
    suburb: "Eden Terrace",
    contact: { name: "[Agent name]", phone: "[phone]" },
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
