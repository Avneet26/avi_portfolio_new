export const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=16d_ByolqJ6gXsxJ0W1Hh8AHFYow4ZfMZ";

export const resume = {
  name: "Avneet Singh Virdi",
  headline: "Senior Frontend Engineer | React, Next.js, TypeScript | Experimentation and CRO",
  availability: "Open to remote roles",
  summary:
    "Senior Frontend Engineer with 4+ years of experience building responsive, production-grade web interfaces in React, Next.js, TypeScript and JavaScript for brands including Accor, Microsoft, Xbox and Norwegian Airlines. Lead a team of 4-5 developers shipping 4-5 A/B tests per week. Built a BigQuery data warehouse and attribution pipeline from scratch. Cut A/B test turnaround by 40-50% with AI development pipelines (Claude, Cursor).",
};

export const resumeContact = [
  { label: "Location", value: "India" },
  { label: "Phone", value: "+91 9990039289", href: "tel:+919990039289" },
  { label: "Email", value: "avneetvirdi26@gmail.com", href: "mailto:avneetvirdi26@gmail.com" },
  { label: "Portfolio", value: "avneetvirdi.com", href: "https://avneetvirdi.com" },
  { label: "LinkedIn", value: "linkedin.com/in/avneet-singh-virdi-652838185", href: "https://www.linkedin.com/in/avneet-singh-virdi-652838185/" },
  { label: "GitHub", value: "github.com/Avneet26", href: "https://github.com/Avneet26" },
] as const;

export const resumeSkills: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "WebAssembly"],
  },
  {
    label: "Performance and Quality",
    items: ["Core Web Vitals", "Web Performance", "Accessibility (WCAG)", "Responsive Design"],
  },
  {
    label: "Architecture and APIs",
    items: ["REST", "GraphQL", "State Management (Redux)", "Component Libraries", "Design Systems"],
  },
  {
    label: "Process and Testing",
    items: ["CI/CD", "Agile/Scrum", "Code Review", "Mentoring", "Playwright (AI-assisted)"],
  },
  {
    label: "Experimentation and Analytics",
    items: ["A/B Testing", "CRO", "Google Analytics", "Tag Management", "SEO"],
  },
  {
    label: "Data",
    items: ["BigQuery", "SQL", "Airbyte", "Parquet", "Data Attribution", "Data Warehousing"],
  },
  {
    label: "Backend and Tools",
    items: ["PHP", "MySQL", "Apache", "Shopify", "Microsoft Power Apps", "Git", "Claude", "Cursor"],
  },
];

export const resumeExperience = [
  {
    title: "Senior Frontend Engineer",
    company: "OptiPhoenix",
    location: "Delhi, India",
    period: "Nov 2025 – Present",
    bullets: [
      "Lead a team of 4-5 frontend developers delivering experiment builds for 3-4 major and 5-6 smaller European and North American clients, with code reviews, mentoring and Agile/Scrum delivery.",
      "Ship 4-5 A/B tests per week in JavaScript, HTML and CSS, cutting turnaround time 40-50% with AI pipelines.",
      "Contribute to internal products in React and TypeScript, including the company website, the data warehouse dashboard and an AI insights tool for CRO.",
      "Designed a complete Cursor agent workflow for a client, now adopted company-wide by the whole team.",
      "Designed and built a data warehouse from scratch in BigQuery using Airbyte, SQL and Parquet, consolidating Google Analytics, A/B testing tool, backend, Meta Ads and Google Ads data. Led a two-person data team.",
      "Built data attribution reporting that reconstructs complete user journeys and shows where users drop off.",
    ],
  },
  {
    title: "Information System Analyst",
    company: "RPS Composites Inc.",
    location: "Maple, Ontario, Canada",
    period: "Jul 2024 – Mar 2025",
    bullets: ["Built internal inventory tools in Microsoft Power Apps and managed the internal inventory database."],
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Brampton, Ontario, Canada",
    period: "2024 – 2025",
    bullets: [
      "Built and launched websites (including Shopify) with SEO for local small businesses, including Golden Hours Bistro, Tossit Pizza, Active Coachlines and Blends & Bites, with DeeGee Graphics.",
      "Developed a job administration tool with a live job screen and invoicing for Tiger Tires, and built A/B test variants for Blue Bagels, a client of a French CRO agency.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "OptiPhoenix",
    location: "Delhi, India",
    period: "Jul 2021 – Mar 2023",
    bullets: [
      "Built responsive frontend components in HTML, CSS and JavaScript with design and marketing teams.",
      "Ran A/B tests and analyzed user behavior to optimize user flows and conversion paths.",
      "Implemented analytics tracking scripts and tags and integrated frontend components with backend APIs.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Bizdata Inc.",
    location: "",
    period: "Mar 2021 – Jul 2021",
    bullets: [
      "Built full-stack web apps and dynamic forms with PHP, MySQL, HTML, CSS and JavaScript.",
      "Configured Apache servers for deployment and optimized MySQL queries for efficient data retrieval.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Local Ollama Frontend",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Ollama"],
    description:
      "Built an open-source, ChatGPT-style frontend for Ollama that keeps chats in the browser, with a model picker, thinking mode and optional web search.",
    link: "https://github.com/Avneet26/my-private-gpt",
  },
  {
    title: "LooperVid",
    stack: ["React", "FFmpeg.wasm", "WebAssembly", "SharedArrayBuffer"],
    description:
      "Built a browser-based tool that turns GIFs into looping videos with audio, using multi-threaded WebAssembly to process everything locally.",
    link: "https://www.loopervid.com/",
    secondaryLink: "https://github.com/Avneet26/gif-loopmaker",
  },
];

export const resumeEducation = [
  {
    degree: "Postgraduate Degree in Information Technology",
    school: "Humber College",
    location: "Toronto, Canada",
    period: "2024 – 2025",
  },
  {
    degree: "BTech in Information Technology",
    school: "Guru Teg Bahadur Institute of Technology",
    location: "Delhi, India",
    period: "2017 – 2021",
  },
];
