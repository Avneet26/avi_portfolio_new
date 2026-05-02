"use client";

const ICON = (slug: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

const stack: { name: string; cat: string; src: string; tone: "cyan" | "orange" }[] = [
  { name: "HTML",       cat: "Markup",    src: ICON("html5"),                 tone: "cyan" },
  { name: "CSS",        cat: "Styling",   src: ICON("css3"),                  tone: "cyan" },
  { name: "JavaScript", cat: "Core",      src: ICON("javascript"),            tone: "cyan" },
  { name: "TypeScript", cat: "Core",      src: ICON("typescript"),            tone: "cyan" },
  { name: "React",      cat: "Frontend",  src: ICON("react"),                 tone: "orange" },
  { name: "Next.js",    cat: "Framework", src: ICON("nextjs", "original-wordmark"), tone: "orange" },
  { name: "Java",       cat: "Language",  src: ICON("java"),                  tone: "cyan" },
  { name: "C#",         cat: "Language",  src: ICON("csharp"),                tone: "cyan" },
  { name: "SQL",        cat: "Database",  src: ICON("mysql"),                 tone: "orange" },
  { name: "MongoDB",    cat: "Database",  src: ICON("mongodb"),               tone: "orange" },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {stack.map((t) => (
        <div
          key={t.name}
          className="tech-card group relative border bg-white/55 backdrop-blur-md px-2 py-1.5 cursor-default select-none"
          style={{ borderColor: "var(--color-ink)" }}
        >

          {/* corner accent — animates in on hover */}
          <span
            aria-hidden
            className="tech-corner pointer-events-none absolute top-0 left-0 w-2.5 h-2.5"
            style={{
              borderTop: `1.5px solid ${t.tone === "orange" ? "#f97316" : "#58aec3"}`,
              borderLeft: `1.5px solid ${t.tone === "orange" ? "#f97316" : "#58aec3"}`,
            }}
          />
          <span
            aria-hidden
            className="tech-corner-br pointer-events-none absolute bottom-0 right-0 w-2.5 h-2.5"
            style={{
              borderBottom: `1.5px solid ${t.tone === "orange" ? "#f97316" : "#58aec3"}`,
              borderRight: `1.5px solid ${t.tone === "orange" ? "#f97316" : "#58aec3"}`,
            }}
          />

          {/* scan beam */}
          <span
            aria-hidden
            className="tech-scan pointer-events-none absolute inset-0 overflow-hidden"
          />

          <div className="relative flex items-center gap-1.5">
            <img
              src={t.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="tech-logo block w-[18px] h-[18px] flex-shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <div
                className="font-display font-black uppercase leading-none text-ink whitespace-nowrap"
                style={{ letterSpacing: "-0.03em", fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)" }}
              >
                {t.name}
              </div>
              <div className="font-mono text-[8px] opacity-55 mt-0.5 uppercase tracking-[0.18em] whitespace-nowrap">
                {t.cat}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
