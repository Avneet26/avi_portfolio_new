export const profile = {
  name: "Avneet Singh Virdi",
  shortName: "Avneet",
  age: 26,
  role: "Senior Frontend Engineer",
  company: "OptiPhoenix",
  yearsExperience: "4+",
  location: "India · Remote",
  email: "avneetvirdi26@gmail.com",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  tagline: "Obsessed with the gap between good-looking and great-feeling — design systems, motion, and the last 5% that ships.",
} as const;

export const lorem = {
  short:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu velit a tortor pretium.",
  medium:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et lectus sed nibh imperdiet vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et lectus sed nibh imperdiet vehicula. Pellentesque habitant morbi tristique. Quisque pretium, ipsum vitae malesuada efficitur, augue mauris facilisis lacus, eu pretium tortor velit non magna. Curabitur consequat, ipsum nec ornare imperdiet, sapien lacus pulvinar tortor.",
};

export const experience = [
  {
    company: "OptiPhoenix",
    role: "Senior Frontend Engineer",
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Lead frontend architecture decisions across 4 product surfaces.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit phasellus.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"],
  },
  {
    company: "Lorem Studio",
    role: "Frontend Engineer",
    period: "2021 — 2023",
    location: "Lorem, IN",
    bullets: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit phasellus.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Storybook"],
  },
  {
    company: "Lorem Labs",
    role: "Junior Frontend Developer",
    period: "2020 — 2021",
    location: "Lorem, IN",
    bullets: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit phasellus.",
    ],
    stack: ["JavaScript", "Vue", "SCSS"],
  },
];

export const freelance = [
  { client: "Lorem Co.",      year: "2024", scope: "Marketing site",    note: "Lorem ipsum dolor sit." },
  { client: "Ipsum Brand",    year: "2023", scope: "Design system",     note: "Lorem ipsum dolor sit amet." },
  { client: "Dolor Studio",   year: "2023", scope: "E-commerce front",  note: "Lorem ipsum dolor." },
  { client: "Sit Amet Inc.",  year: "2022", scope: "Dashboard MVP",     note: "Lorem ipsum dolor sit amet consectetur." },
  { client: "Consectetur LLC",year: "2021", scope: "Landing pages",     note: "Lorem ipsum dolor sit." },
];

export const projects = [
  {
    code: "PRJ-001",
    title: "Lorem Vector",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit phasellus.",
    stack: ["Next.js", "WebGL", "Framer Motion"],
    cover: "https://placehold.co/800x600/58aec3/0e1620?text=PRJ-001&font=oswald",
  },
  {
    code: "PRJ-002",
    title: "Ipsum Console",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stack: ["React", "TypeScript", "D3"],
    cover: "https://placehold.co/800x600/ff8a47/0e1620?text=PRJ-002&font=oswald",
  },
  {
    code: "PRJ-003",
    title: "Dolor Atlas",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stack: ["Next.js", "Tailwind", "Mapbox"],
    cover: "https://placehold.co/800x600/0e1620/f1efe7?text=PRJ-003&font=oswald",
  },
  {
    code: "PRJ-004",
    title: "Sit Reactor",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stack: ["React", "Three.js"],
    cover: "https://placehold.co/800x600/c4e6ee/0e1620?text=PRJ-004&font=oswald",
  },
];

export const education = [
  {
    school: "Lorem Institute of Technology",
    degree: "B.Tech, Computer Science",
    period: "2016 — 2020",
    note: "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus.",
  },
  {
    school: "Ipsum Senior Secondary",
    degree: "12th — Science",
    period: "2014 — 2016",
    note: "Lorem ipsum dolor sit amet.",
  },
];
