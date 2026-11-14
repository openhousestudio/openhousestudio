export type Format = {
  id: string;
  name: string;
  count: number;
  blurb: string;
  eyebrow: string;
  headline: string;
  body: string;
  post: {
    kicker: string;
    title: string;
    meta: string;
    price: string;
  };
};

export const formats: Format[] = [
  {
    id: "listing",
    name: "Listing",
    count: 6,
    blurb: "Send an address, a price and three photos. A carousel or single post comes back.",
    eyebrow: "Listing",
    headline: "Listings that look listed.",
    body: "Send an address, a price and three photos. We send back a carousel or single post, with a caption that opens with the street, ends with the open home, and says nothing an agent would not say.",
    post: {
      kicker: "Just listed",
      title: "Awa Road",
      meta: "4 bed · 2 bath · 2 garage",
      price: "$1,240,000",
    },
  },
  {
    id: "open-house",
    name: "Open House",
    count: 6,
    blurb: "Signage, story and feed formats that match, so the weekend looks planned.",
    eyebrow: "Open house",
    headline: "Open house, handled.",
    body: "Signage, story and feed posts that match. Date, time and address in the same place every week, with room for one good photograph. Ask once and the whole set arrives together.",
    post: {
      kicker: "Open home",
      title: "Saturday, 11–11:45",
      meta: "Awa Road, Onehunga",
      price: "All welcome",
    },
  },
  {
    id: "just-sold",
    name: "Just Sold",
    count: 6,
    blurb: "Announce the win without sounding like a template.",
    eyebrow: "Just sold",
    headline: "Just sold, done.",
    body: "Announce the win without sounding like a template. Every just-sold post comes with three caption options: quiet, grateful, and a short one for people who hate a paragraph.",
    post: {
      kicker: "Just sold",
      title: "Under offer in 9 days",
      meta: "Awa Road, Onehunga",
      price: "Sold",
    },
  },
  {
    id: "review",
    name: "Review",
    count: 3,
    blurb: "Quote-led layouts that keep the focus on the words.",
    eyebrow: "Review",
    headline: "Reviews that read.",
    body: "Send the quote and we build the post around it, so the words carry the frame. Two caption styles: one short, one that sets up the story first.",
    post: {
      kicker: "Client review",
      title: "“Sold in a week, and she never once pushed.”",
      meta: "— Sarah, Onehunga",
      price: "★★★★★",
    },
  },
  {
    id: "story",
    name: "Story",
    count: 3,
    blurb: "Vertical formats for the middle of the week.",
    eyebrow: "Story",
    headline: "Stories for the quiet days.",
    body: "Vertical formats for Tuesdays and Thursdays, when there is no listing to announce. Behind the scenes, a street you like, a question worth asking.",
    post: {
      kicker: "Story",
      title: "The street nobody asks about",
      meta: "Onehunga, 4pm",
      price: "Swipe up",
    },
  },
];
