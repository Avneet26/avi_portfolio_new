export const resume = {
  name: "Avneet Singh Virdi",
  headline: "Senior Frontend Engineer",
  availability: "Open to Remote and Relocation",
  summary:
    "Senior Frontend Engineer with 4+ years shipping production web UIs in React, Next.js, and TypeScript. Deep CRO and A/B testing experience (ABTasty, Optimizely, Convert, VWO) for Accor, Microsoft, Xbox, and Norwegian Airlines. Leads a team of 6 engineers and 4 QA; owns delivery, client calls, and AI-assisted dev workflows.",
};

export const resumeContact = [
  { label: "Email", value: "avneetvirdi26@gmail.com", href: "mailto:avneetvirdi26@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/avneet-singh-virdi", href: "https://www.linkedin.com/in/avneet-singh-virdi-652838185/" },
  { label: "GitHub", value: "github.com/Avneet26", href: "https://github.com/Avneet26" },
  { label: "Portfolio", value: "avneetvirdi.com", href: "https://avneetvirdi.com" },
  { label: "Location", value: "New Delhi, India" },
] as const;

export const resumeSkills: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "Accessibility (WCAG)",
    ],
  },
  {
    label: "CRO and A/B Testing",
    items: ["ABTasty", "Optimizely", "Convert", "VWO", "Google Analytics", "Experiment Design"],
  },
  {
    label: "Backend and Tools",
    items: [
      "Node.js",
      "REST APIs",
      "MongoDB",
      "MySQL",
      "Git",
      "CI/CD",
      "Vercel",
      "Jest",
      "Playwright",
      "PowerApps",
      "Azure",
    ],
  },
  {
    label: "Other",
    items: [
      "Team Leadership",
      "Agile",
      "Scrum",
      "Claude Code",
      "Cursor",
      "English",
      "Hindi",
      "Punjabi",
    ],
  },
];

export const resumeExperience = [
  {
    title: "Senior Frontend Engineer",
    company: "OptiPhoenix",
    location: "New Delhi, India",
    period: "Jan 2025 – Present",
    bullets: [
      "Lead a team of engineers and QA on CRO and frontend delivery.",
      "Built company-wide CRO data pipeline across ABTasty, Optimizely, Convert, and VWO.",
      "Rolled out AI-assisted dev (Claude Code, Cursor) across the team.",
      "Assisted in Bringin out AI automated workflows across the team in Dev and QA"
    ],
    stack: ["React", "TypeScript", "Next.js", "ABTasty", "Agentic Coding", "Optimizely", "Node.js"],
  },
  {
    title: "Full Stack Developer (Contract)",
    company: "RPS Composites",
    location: "Maple, Ontario, Canada",
    period: "Aug 2024 – Mar 2025",
    bullets: [
      "Delivered inventory system on Microsoft PowerApps end to end.",
      "Replaced Excel tracking with PowerApps and Power Query integrations.",
    ],
    stack: ["PowerApps", "Power Query", "Azure", "Javascript", "React"],
  },
  {
    title: "Frontend Developer and A/B Testing Engineer",
    company: "OptiPhoenix",
    location: "New Delhi, India",
    period: "Aug 2021 – Jul 2023",
    bullets: [
      "Shipped A/B tests and frontend builds for Accor, Microsoft, Xbox, and EU/NA brands.",
      "Owned experiment lifecycle: build, QA, instrumentation, and analysis.",
      "Cut average experiment build time ~30% with reusable JS/CSS patterns.",
    ],
    stack: ["JavaScript", "React", "ABTasty", "Optimizely", "VWO", "Google Analytics"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "BizData",
    location: "New Delhi, India",
    period: "Mar 2021 – Jul 2021",
    bullets: [
      "Built survey web apps tied to internal data-ingestion servers.",
      "Shipped features across PHP/MySQL backend and Linux deployment.",
    ],
    stack: ["PHP", "JavaScript", "MySQL", "Linux"],
  },
];

export const resumeProjects = [
  {
    title: "LooperVid",
    description: "Browser-based GIF-to-video tool; FFmpeg.wasm runs encoding locally.",
    stack: ["React", "FFmpeg.wasm", "TypeScript"],
    link: "https://www.loopervid.com/",
  },
  {
    title: "Lightweight Analytics",
    description: "Cookieless, GDPR-friendly analytics with a sub-1KB tracker.",
    stack: ["Next.js", "TypeScript", "TursoDB", "Vercel"],
    link: "https://lightweight-analytics.vercel.app/",
  },
];

export const resumeFreelanceSummary =
  "Freelance frontend and CRO (2024–present): websites and SEO for Ontario clients via DeeGee Graphics; workshop admin for Tiger Tires; A/B builds for Blue Bagels (France).";

export const resumeEducation = [
  {
    degree: "PG Diploma — IT Solutions",
    school: "Humber Polytechnic",
    location: "Toronto, Canada",
    period: "2023 – 2025",
    note: "",
  },
  {
    degree: "B.Tech — Information Technology",
    school: "GTBIT, GGSIP University",
    location: "New Delhi, India",
    period: "2017 – 2021",
    note: "",
  },
];
