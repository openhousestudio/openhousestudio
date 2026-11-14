export const site = {
  name: "Open House Studio",
  domain: "openhousestudio.online",
  url: "https://openhousestudio.online",
  email: "hello@openhousestudio.online",
  price: {
    start: 99,
    floor: 59,
    decayPercent: 5,
  },
  founder: {
    price: 39,
    checkoutUrl: "https://buy.stripe.com/28E4gy4aicDmbJq4ZD3sI05",
  },
  community: {
    week: {
      price: 10,
      days: 7,
      checkoutUrl: "https://buy.stripe.com/aFa4gycGObzi3cUdw93sI06",
    },
    month: {
      price: 30,
      days: 30,
      checkoutUrl: "https://buy.stripe.com/4gM7sK9uCfPyeVC1Nr3sI07",
    },
  },
  dropDay: "Monday",
  nav: [
    { label: "Formats", href: "#formats" },
    { label: "Community", href: "/community" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const priceLadder = [
  99, 94, 89, 85, 81, 77, 73, 69, 66, 63, 60, 59,
];
