export type CommunityEntry = {
  slug: string;
  image: string;
  format: "Listing" | "Open Home" | "Just Sold" | "Review" | "Story";
  suburb: string;
  credit: string;
  /** Paid placement. Always shown with a visible Featured tag. */
  featured?: boolean;
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

export const communityFormats = [
  "All",
  "Listing",
  "Open Home",
  "Just Sold",
  "Review",
  "Story",
] as const;
