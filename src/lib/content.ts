/* Single source of truth for site content — everything here comes from the
   Realest Auto Collective business plan (July 2025). */

export const BRAND = {
  name: "Realest",
  fullName: "Realest Auto Collective",
  founded: 2024,
  location: "Katlehong, South Africa",
  email: "zwanesandile26@gmail.com",
  linktree: "https://linktr.ee/realestautocollective",
  instagram: "https://www.instagram.com/realestautocollective/",
  tiktok: "https://www.tiktok.com/@realestautocollective",
  youtube: "https://www.youtube.com/@realestautocollective",
  handle: "@realestautocollective",
  phones: [
    { name: "Sandile", number: "072 357 4822" },
    { name: "Andiswa", number: "063 827 9099" },
  ],
  vision:
    "Become a go-to name in the automotive scene for car lovers who appreciate culture, style, and realism.",
  mission:
    "To build an authentic automotive community through high-quality car photography, in-depth car reviews, and street-inspired auto merchandise.",
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  accent: string;
  short: string;
  long: string;
  icon: "play" | "camera" | "shirt" | "clapperboard" | "zap";
};

export const SERVICES: Service[] = [
  {
    slug: "reviews",
    index: "01",
    title: "YouTube Reviews",
    accent: "honest & engaging",
    short:
      "Honest, engaging car reviews — from daily drivers to high-performance builds.",
    long:
      "No script, no fluff. We review cars the way the culture actually talks about them — daily drivers, weekend builds and high-performance machines, all judged on what they're really like to live with and love.",
    icon: "play",
  },
  {
    slug: "photography",
    index: "02",
    title: "Car Photography",
    accent: "light, angle, attitude",
    short:
      "High-quality shoots of cars, meets and everything car related — for social media and clients.",
    long:
      "From rolling shots to golden-hour statics, we photograph cars, meets and everything in between. Built for owners who want their build seen properly, and for brands who need imagery with real attitude.",
    icon: "camera",
  },
  {
    slug: "behind-the-scenes",
    index: "03",
    title: "Behind-the-Scenes Vlogs",
    accent: "the real process",
    short:
      "A real look into car culture and our creative process, from the inside.",
    long:
      "The story behind the build matters as much as the build itself. Our vlogs take fans inside the scene — the people, the prep, the late nights — and show how the content actually gets made.",
    icon: "clapperboard",
  },
  {
    slug: "short-form",
    index: "04",
    title: "Short-Form Content",
    accent: "built for reach",
    short: "Reels and TikToks made for broader reach and viral engagement.",
    long:
      "Fast, sharp and made to travel. We cut reels and TikToks designed for reach — moments from meets, builds and shoots that put the culture in front of a wider audience.",
    icon: "zap",
  },
  {
    slug: "merchandise",
    index: "05",
    title: "Street-Inspired Merch",
    accent: "wear the culture",
    short:
      "Car-themed hoodies, tracksuits, tees and caps. Limited-edition collabs with car influencers and brands.",
    long:
      "Street style meets automotive art. Car-themed hoodies, tracksuits, tees and caps released in limited drops — plus collaboration pieces with car influencers and brands who share the vision.",
    icon: "shirt",
  },
];

export const TEAM = [
  {
    name: "Sandile Zwane",
    role: "Founder & Creative Director",
    bio: "Founded Realest Auto Collective with a vision to blend car culture and art. Leads the direction of the brand, capturing and editing all visuals — photography and video.",
  },
  {
    name: "Andiswa Zwane",
    role: "Brand Representative & Outreach Lead",
    bio: "Plays a vital role in networking, setting up collaborations, and helping grow our presence in the car scene.",
  },
];

export const MILESTONES = [
  { year: "2025", goal: "Reach 1,000 subscribers" },
  { year: "2026", goal: "Release our first limited clothing drop" },
  { year: "2030", goal: "Collaborate with 2–3 local car brands or car clubs" },
  { year: "2035", goal: "Grow social media to 100,000+ followers" },
];

export const STATS = [
  { value: 65, label: "Car media is growing" },
  { value: 70, label: "Streetwear influence" },
  { value: 60, label: "Lifestyle sells" },
];

/* Real videos from the channel — youtube.com/@realestautocollective.
   Thumbnails come straight from YouTube (i.ytimg.com), no assets needed. */
export const YOUTUBE = {
  channel: "https://www.youtube.com/@realestautocollective",
  videos: [
    { id: "XxrN40aFsss", title: "GAS Coldstart Breakfast Run [4K]" },
    { id: "3nu2ect0bkA", title: "Merch Photoshoot | Sandton [4K]" },
    { id: "EY0u_HHPQdA", title: "TRACTION OFF | Breakfast Run | Vlog | 4K" },
    { id: "RVTcTT8DPWg", title: "BMW M60i | Eye of Africa Estate | 4K" },
    { id: "0o81j2JifH0", title: "BMW 325is | Owner's Story | Review | 4K" },
    { id: "qErT8B9wQho", title: "GAS | The Takeover Vol 1 | Vlog | Cinematics" },
    { id: "WYBpgw5SzG8", title: "MSG Blanket Drive | Vlog | 4K" },
    { id: "3sIkIDLvfUQ", title: "German vs Japan 2024 | Cinematics" },
    { id: "sodtaLEDBlg", title: "M Powered Breakfast Run | SMG | BMW Convoy" },
    { id: "lrXXuglQZcI", title: "Pharoah – Rush Breakfast Run | Sandton – Soshanguve" },
    { id: "22U3szEGVdA", title: "BMW vs VW 2023 | 4K" },
    { id: "gHJF5GmHFsQ", title: "Fresh Fridays | Fast & Furious Park Off | JHB Parties" },
    { id: "MLPhNXLiKWI", title: "Slammer Sunday" },
    { id: "D5yHBWI9XAI", title: "TOYZ 4 BOYZ 2K23 | JHB Parties" },
  ],
};

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const videoThumb = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export type Product = {
  slug: string;
  name: string;
  caption: string;
  colorway: string;
  price: number; // ZAR — placeholder, to be finalized
  front: string;
  back: string;
  lifestyle?: string[]; // optional "as worn" shots — shown after front/back
};

/* Drop 001 — boxy fit tees. Prices are placeholders. */
export const PRODUCTS: Product[] = [
  {
    slug: "fear-tee",
    name: "Fear of Being Average Tee",
    caption: "Fear of being average.",
    colorway: "Washed Black",
    price: 450,
    front: "/merch/fear-front.webp",
    back: "/merch/fear-back.webp",
  },
  {
    slug: "fuel-glory-tee",
    name: "Fuel & Glory Tee",
    caption: "If everything seems under control, you're not going fast enough.",
    colorway: "Ash Grey",
    price: 480,
    front: "/merch/fuel-front.webp",
    back: "/merch/fuel-back.webp",
  },
  {
    slug: "yum-tee",
    name: "Yum. Piston Tee",
    caption: "Every upgrade starts with removing something.",
    colorway: "Vintage White",
    price: 450,
    front: "/merch/yum-front.webp",
    back: "/merch/yum-back.webp",
  },
  {
    slug: "stance-tee",
    name: "Pretty Girls Love Stance Tee",
    caption: "For the girls who choose fitment over ordinary.",
    colorway: "Vintage White",
    price: 480,
    front: "/merch/stance-front.webp",
    back: "/merch/stance-back.webp",
    lifestyle: [
      "/merch/stance-life-3.webp",
      "/merch/stance-life-1.webp",
      "/merch/stance-life-2.webp",
      "/merch/stance-life-4.webp",
    ],
  },
  {
    slug: "bagged-tee",
    name: "Bagged Tee",
    caption: "Aired out, laid out.",
    colorway: "Vintage White",
    price: 480,
    front: "/merch/bagged-front.webp",
    back: "/merch/bagged-back.webp",
  },
  {
    slug: "static-tee",
    name: "Static Tee",
    caption: "Bags are for groceries.",
    colorway: "Vintage White",
    price: 480,
    front: "/merch/static-front.webp",
    back: "/merch/static-back.webp",
  },
];

export const DROP = {
  code: "DROP 001",
  name: "Boxy Fit Tees",
  blurb:
    "Heavyweight boxy-fit tees, mock neck, drop shoulder. Limited run — once they're gone, they're gone.",
};
