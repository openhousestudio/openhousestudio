export type Format = {
  id: string;
  name: string;
  count: number;
  image: string;
  blurb: string;
  eyebrow: string;
  headline: string;
  body: string;
  caption: string;
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
    image: "/community/post-01-listing.jpg",
    blurb: "Send an address, a price and three photos. A carousel or single post comes back.",
    eyebrow: "Listing",
    headline: "Listing posts that look listed.",
    body: "Send an address, a price and three photos. We send back a carousel or single post in 48 hours, with a caption that opens with the street, ends with the open home, and says nothing an agent would not say.",
    caption:
      "New to market on Awa Road. Four bedrooms, north-facing deck off the kitchen, and double internal garaging on a flat full site. First open home this Saturday, 11:00–11:45am.",
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
    image: "/community/post-02-open-home.jpg",
    blurb: "Signage, story and feed formats that match, so the weekend looks planned.",
    eyebrow: "Open house",
    headline: "Open house sets for the weekend.",
    body: "Signage, story and feed posts that match. Date, time and address in the same place every week, with room for one good photograph. Ask on Wednesday and the whole weekend set arrives by Friday.",
    caption:
      "Open home tomorrow at Awa Road, 11:00–11:45am. Come see how the afternoon sun hits the back lawn. Full info pack and LIM available at the door.",
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
    image: "/community/post-03-just-sold.jpg",
    blurb: "Announce the win without sounding like a template.",
    eyebrow: "Just sold",
    headline: "Just-sold posts without the cliches.",
    body: "Announce the win without sounding like a template. Every just-sold post comes with three caption options: quiet, grateful, and a short one for people who hate a paragraph.",
    caption:
      "Sold on Awa Road after 9 days on the market and three competing offers. Thank you to our vendors for trusting the campaign, and welcome to the neighbourhood to the new owners.",
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
    image: "/community/post-04-review.jpg",
    blurb: "Quote-led layouts that keep the focus on the words.",
    eyebrow: "Review",
    headline: "Client reviews that carry the frame.",
    body: "Send the quote and we build the post around it, so the words carry the frame. Two caption styles: one short, one that sets up the story first.",
    caption:
      "Selling a family home of twenty years takes patience. Grateful to the family who let us guide the sale at Awa Road from first appraisal to settlement.",
    post: {
      kicker: "Client review",
      title: "“Sold in nine days, and she kept every open home calm.”",
      meta: "Vendor review · Onehunga",
      price: "Sample",
    },
  },
  {
    id: "story",
    name: "Story",
    count: 3,
    image: "/community/post-05-story.jpg",
    blurb: "Vertical formats for the middle of the week.",
    eyebrow: "Story",
    headline: "Mid-week stories for quiet days.",
    body: "Vertical formats for Tuesdays and Thursdays, when there is no listing to announce. Behind the scenes, a street you like, a question worth asking.",
    caption:
      "Late afternoon walk down Awa Road before tomorrow’s appraisal. Still one of the quietest tree-lined pockets in Onehunga.",
    post: {
      kicker: "Story",
      title: "The street nobody asks about",
      meta: "Onehunga, 4pm",
      price: "Swipe up",
    },
  },
];
