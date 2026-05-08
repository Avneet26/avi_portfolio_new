// Toggle to show/hide "open to work" signals across the entire site
export const openToWork = false;

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
    github: "https://github.com/Avneet26",
    linkedin: "https://www.linkedin.com/in/avneet-singh-virdi-652838185/",
  },
  tagline: "CRO experiments across ABTasty, Optimizely, and VWO — shipped for Accor Hotels, Fairmont, Microsoft, Xbox, and Norwegian Airlines. Based in New Delhi.",
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
    company: "BizData",
    role: "Full Stack Developer Intern",
    period: "2021 · 5 mo",
    year: "2021",
    location: "New Delhi · India",
    bullets: [
      "Built survey-collection web apps integrated with the company's data-ingestion servers.",
      "Owned delivery end-to-end across frontend, PHP/MySQL backend, and Linux deployment.",
    ],
    stack: ["PHP", "JavaScript", "MySQL", "Linux"],
  },
  {
    company: "OptiPhoenix",
    role: "Junior Frontend Developer",
    period: "2021 — 2023",
    year: "2021",
    location: "New Delhi · India",
    bullets: [
      "Shipped A/B test variants across global client sites for a Conversion-Rate-Optimization agency.",
      "Delivered experiments for Accor Hotels, Fairmont, Microsoft, Xbox, Minecraft, and EU/NA e-commerce brands.",
      "Owned the full experiment lifecycle — build, QA, instrumentation, and post-launch analysis.",
    ],
    stack: ["jQuery", "JavaScript", "ABTasty", "Optimizely", "Convert", "VWO"],
  },
  {
    company: "RPS Composites",
    role: "Full Stack Developer",
    period: "2024 — 2025",
    year: "2024",
    location: "Maple · ON · Canada",
    bullets: [
      "8-month contract: architected an inventory management system on Microsoft PowerApps from the ground up.",
      "Replaced manual Excel-based tracking by wiring PowerApps into the existing operational data sources.",
    ],
    stack: ["PowerApps", "Power Query", "Excel", "Azure"],
  },
  {
    company: "OptiPhoenix",
    role: "Senior Frontend Engineer",
    period: "2025 — Present",
    year: "2025",
    location: "New Delhi · India",
    bullets: [
      "Lead a cross-functional pod of 5–6 engineers and 3–4 QA — owning sprint planning, estimation, and client delivery.",
      "Architected the CRO data pipeline aggregating multi-source A/B results into a queryable dataset used company-wide.",
      "Driving AI-assisted development — rolling out agentic workflows and custom Claude Code frameworks across the team.",
    ],
    stack: ["React", "TypeScript", "ABTasty", "Optimizely", "Claude Code"],
  },
];

export type FreelanceItem = {
  client: string;
  year: string;
  scope: string;
  note: string;
  link?: string;
  github?: string;
};

export const freelance: FreelanceItem[] = [
  { client: "Tiger Tires",         year: "2025", scope: "Job Admin · Workshop Mgmt", note: "Truck tire workshop · live job screen + invoicing", github: "https://github.com/Avneet26/NightRiderWebsite" },
  { client: "Golden Hours Bistro", year: "2025", scope: "Website + SEO",              note: "DeeGee Graphics · Elmvale + Barrie" },
  { client: "Tossit Pizza",        year: "2024", scope: "Website + SEO",              note: "DeeGee Graphics · Ontario GTA",      link: "https://tossitpizza.com/" },
  { client: "Active Coachlines",   year: "2024", scope: "Website + SEO",              note: "DeeGee Graphics · Ontario GTA",      link: "https://activecoach.ca/" },
  { client: "DeeGee Graphics",     year: "2024", scope: "Agency Collaboration",       note: "Multi-client website + branding work · Ontario", link: "https://deegeegraphics.com/" },
  { client: "Blends & Bites",      year: "2024", scope: "Website + Branding",         note: "DeeGee Graphics · Restaurant",       link: "http://blendsandbites.com/" },
  { client: "Blue Bagels",         year: "2024", scope: "CRO / Frontend",             note: "French CRO agency · A/B builds" },
];

export type LiveProject = {
  code: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  stack: string[];
  github?: string;
  link?: string;
};

export const liveProjects: LiveProject[] = [
  {
    code: "LIVE-01",
    title: "LooperVid",
    tagline: "Turn GIFs into YouTube-ready looping videos with audio",
    description:
      "A free, browser-based tool for creators making slowed+reverb edits, lo-fi visualizers, and aesthetic compilations. Multi-threaded WebAssembly via FFmpeg.wasm runs the full pipeline locally — no uploads, no sign-ups. Built in collaboration with AI: product direction, UX, and architecture decisions are mine; AI accelerates the iteration loop, not the thinking.",
    cover: "/assets/looopervid.png",
    stack: ["React", "FFmpeg.wasm", "WebAssembly", "SharedArrayBuffer"],
    github: "https://github.com/Avneet26/gif-loopmaker",
    link: "https://www.loopervid.com/",
  },
  {
    code: "LIVE-02",
    title: "Slowed & Reverb Maker",
    tagline: "One-click slowed + reverb / nightcore audio in the browser",
    description:
      "A client-side audio editor with tempo, pitch, and reverb controls plus one-click presets (Slowed + Reverb, Nightcore, and more). All DSP runs locally — files never leave the browser. Built in collaboration with AI: scope, UX, and engineering calls are driven by me, with AI as a force-multiplier on the build.",
    cover: "/assets/slowedreverb.png",
    stack: ["React", "Web Audio API", "Client-side DSP"],
    github: "https://github.com/Avneet26/slowedreverb-maker",
    link: "https://www.slowedreverbmaker.com/",
  },
];

export type FunProject = {
  code: string;
  title: string;
  tagline: string;
  blurb: string;
  stack: string[];
  cover: string;
  github?: string;
  link?: string;
  accent: "cyan" | "orange" | "ink";
};

export const projects: FunProject[] = [
  {
    code: "FUN-01",
    title: "Lightweight Analytics",
    tagline: "Privacy-first analytics platform",
    blurb:
      "Working analytics tool — sub-1KB script, no cookies, GDPR-friendly. Stable today, with room to expand in any direction. Open to live use, with permission.",
    stack: ["TypeScript", "Next.js", "Vercel", "TursoDB"],
    cover: "/assets/analytics.png",
    github: "https://github.com/Avneet26/lightweight-analytics",
    link: "https://lightweight-analytics.vercel.app/",
    accent: "cyan",
  },
  {
    code: "FUN-02",
    title: "Lights Out",
    tagline: "Classic puzzle · React build",
    blurb: "The classic Lights Out puzzle, built while learning React state patterns.",
    stack: ["React"],
    cover: "/assets/lightsout.png",
    github: "https://github.com/Avneet26/lights-out-react",
    link: "https://lightsout26.netlify.app/",
    accent: "orange",
  },
  {
    code: "FUN-03",
    title: "Memory Match",
    tagline: "Pattern memory game · Vanilla JS",
    blurb:
      "Pattern-matching game built for a college coding competition. Earned a nod from the mentors.",
    stack: ["Vanilla JS", "HTML", "CSS"],
    cover: "/assets/memorygame.png",
    github: "https://github.com/Avneet26/memory-game-js",
    link: "https://avneet26.github.io/memory-game-js/",
    accent: "ink",
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
