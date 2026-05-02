export const profile = {
  name: "Avneet Singh Virdi",
  shortName: "Avneet",
  age: 26,
  role: "Senior Frontend Engineer",
  company: "OptiPhoenix",
  yearsExperience: "4+",
  location: "New Delhi · India",
  email: "avneetvirdi26@gmail.com",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  tagline: "Senior Frontend Engineer specialising in CRO, A/B testing, and UI that actually converts. Based in Delhi — shipping since 2021.",
} as const;

export const about = {
  intro:
    "B.Tech in IT, self-taught the MERN stack, first job at BizData in PHP and MySQL. Since 2021: junior to senior at OptiPhoenix, a PG Diploma in Toronto, freelancing across Ontario, and now back in Delhi leading the frontend team.",
  expertise:
    "Four years in CRO — experiment builds across ABTasty, Optimizely, Convert, and VWO. Shipped for Accor Hotels, Fairmont, Microsoft, Xbox, and Euronics. Also built an inventory system on PowerApps at RPS Composites in Canada.",
  agentic:
    "Currently leading a team of 5 devs and 4 QA, owning client calls, and running the data pipeline for CRO experiments. Rolling out AI workflows and agentic coding practices across the team.",
  gamedev:
    "Dev logs incoming — AI-native workflows, CRO experiment teardowns, and building in public. Dropping soon.",
  personal:
    "Gaming and music outside of work. Travel is on pause for now. The Weeknd in Toronto was a highlight. Trying to go to the gym every week, failing most weeks, but the intention is still there.",
} as const;

export const experience = [
  {
    company: "OptiPhoenix",
    role: "Senior Frontend Engineer",
    period: "2025 — Present",
    location: "New Delhi · India",
    bullets: [
      "Rejoined as Senior FE — now leading a team of 5–6 developers and 3–4 QA engineers alongside the PM, running sprint planning, timelines, and estimations.",
      "Owns client calls directly and manages delivery expectations — a real step up from just shipping code.",
      "Leading the Data Collection & Analysis initiative: designed and built the pipeline that aggregates CRO A/B test data from multiple sources into a clean, queryable format the whole CRO team uses to plan their next experiments.",
      "Driving AI integration across the team — rolling out agentic coding workflows, custom Claude Code prompt frameworks, and AI-assisted dev practices to cut build time and increase quality.",
    ],
    stack: ["React", "TypeScript", "jQuery", "ABTasty", "Optimizely", "Convert", "Claude Code"],
  },
  {
    company: "RPS Composites",
    role: "Full Stack Developer",
    period: "2024 — 2025",
    location: "Maple · Ontario · Canada",
    bullets: [
      "8-month contract at a major plastic parts manufacturing company — my first proper western corporate experience.",
      "Built an inventory management system from scratch on Microsoft PowerApps, wiring it into their existing Excel-based databases.",
      "Replaced manual tracking for an entire manufacturing operation — shipped something that genuinely made a difference for a team that had been doing it the hard way for years.",
    ],
    stack: ["Microsoft PowerApps", "Power Query", "Excel", "Azure"],
  },
  {
    company: "OptiPhoenix",
    role: "Junior Frontend Developer",
    period: "2021 — 2023",
    location: "New Delhi · India",
    bullets: [
      "Joined as a junior A/B test developer — built and shipped UI components across client websites for a CRO agency.",
      "Worked on experiments for major hotel chains (Accor Hotels, Fairmont), tech giants (Microsoft, Xbox, Minecraft), and e-commerce brands (Euronics and others across Europe and North America).",
      "Grew from executing tickets to understanding the full experiment lifecycle: build, QA, instrument, and analyse.",
    ],
    stack: ["jQuery", "JavaScript", "HTML", "CSS", "ABTasty", "Optimizely", "Convert", "VWO"],
  },
  {
    company: "BizData",
    role: "Full Stack Developer Intern",
    period: "2021 · 5 months",
    location: "New Delhi · India",
    bullets: [
      "First job out of B.Tech via campus placement — built form survey collection websites for their data integration servers.",
      "Full stack from day one: PHP, HTML, CSS, JavaScript, MySQL on the backend, and Linux server setup for deployment.",
      "No senior to hold your hand, no safety net. Learned fast.",
    ],
    stack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "Linux"],
  },
];

export const freelance = [
  { client: "Tossit Pizza",         year: "2024", scope: "Website + SEO",     note: "DeeGee Graphics · Ontario GTA" },
  { client: "Active Coachlines",    year: "2024", scope: "Website + SEO",     note: "DeeGee Graphics · Ontario GTA" },
  { client: "Blends & Bites",       year: "2024", scope: "Website + Branding", note: "DeeGee Graphics · Restaurant" },
  { client: "Golden Hours Bistro",  year: "2025", scope: "Website + SEO",     note: "DeeGee Graphics · Elmvale + Barrie" },
  { client: "Blue Bagels",          year: "2024", scope: "CRO / Frontend",    note: "French CRO agency · A/B builds" },
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
    school: "Humber Polytechnic · Toronto, Canada",
    degree: "PG Diploma — IT Solutions",
    period: "2024 — 2025",
    note: "Two years in Toronto — got a solid taste of everything from databases to iOS/Android, but my specialisation was in ML and full-stack web development. Freelanced and worked in parallel the whole time, because rent in Canada doesn't negotiate.",
  },
  {
    school: "Guru Teg Bahadur Institute of Technology · IP University · New Delhi",
    degree: "B.Tech — Information Technology",
    period: "2017 — 2021",
    note: "Four years of B.Tech in IT. The classroom gave me Java and computer science fundamentals; the late nights gave me the MERN stack and the skills that actually got me hired. Also had a head start — HTML and C++ from high school.",
  },
];
