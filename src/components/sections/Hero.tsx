"use client";

import { motion } from "framer-motion";
import DottedGlobe from "@/components/ui/DottedGlobe";
import IDCard from "@/components/ui/IDCard";
import { profile } from "@/lib/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b flex flex-col"
      style={{
        borderColor: "var(--color-ink)",
        // viewport minus sticky header (TopTape ~34px + Navbar ~64px)
        minHeight: "calc(100dvh - 98px)",
      }}
      aria-label="Intro"
    >
      {/* Layered cyberpunk grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,22,32,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,22,32,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px, 80px 80px",
        }}
      />
      {/* Crosshair guides */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(14,22,32,0.18) 12%, rgba(14,22,32,0.18) 88%, transparent)" }} />
        <div className="absolute right-[8%] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(88,174,195,0.45) 12%, rgba(88,174,195,0.45) 88%, transparent)" }} />
        <div className="absolute left-0 right-0 top-[42%] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(14,22,32,0.12) 10%, rgba(14,22,32,0.12) 90%, transparent)" }} />
      </div>

      <div className="scanlines absolute inset-0" aria-hidden />

      {/* Dotted globe — large, right-third backdrop */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[-32%] w-[44vw] max-w-[680px] opacity-80">
        <DottedGlobe width={680} height={680} className="w-full h-auto" />
      </div>


      {/* Corner brackets */}
      <CornerBrackets />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10 pt-6 lg:pt-10 xl:pt-14 pb-6 xl:pb-8 flex-1 flex flex-col">
        {/* Coordinate / sector strip */}
        <div className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.28em] flex items-center justify-between gap-4 mb-5 lg:mb-8 xl:mb-12">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-orange-500" />
            <span>SFE.01 · Frontend Engineer · India / Remote · 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-3 opacity-70">
            <span>SECTOR <span className="text-orange-500">07</span></span>
            <span>·</span>
            <span>LAT 28.61°N</span>
            <span>·</span>
            <span>LON 77.20°E</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start flex-1">
          <div className="lg:col-span-8 relative">
            {/* tiny line markers next to heading */}
            <div aria-hidden className="absolute -left-3 top-1 bottom-6 w-px hidden lg:block" style={{ background: "var(--color-ink)" }}>
              <span className="absolute -left-[3px] top-0 h-1.5 w-1.5 rotate-45 bg-orange-500" />
              <span className="absolute -left-[3px] bottom-0 h-1.5 w-1.5 rotate-45 bg-cyan-500" />
            </div>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Desktop: 3 stacked lines */}
              <div className="hidden lg:block">
                <h1
                  className="font-display font-black uppercase leading-[0.88] lg:text-[6.5rem] xl:text-[8rem] 2xl:text-[9.5rem]"
                  style={{
                    letterSpacing: "-15px",
                    background: "linear-gradient(108deg, var(--color-ink) 60%, var(--color-cyan-700) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Avneet
                </h1>
                <h1 className="font-display font-black uppercase leading-[0.88] text-outline lg:text-[6.5rem] xl:text-[8rem] 2xl:text-[9.5rem]" style={{ letterSpacing: "-15px" }}>
                  Singh
                </h1>
                <h1 className="font-display font-black uppercase leading-[0.88] text-ink lg:text-[6.5rem] xl:text-[8rem] 2xl:text-[9.5rem]" style={{ letterSpacing: "-15px" }}>
                  <span className="text-orange-500">/ </span>Virdi
                </h1>
              </div>

              {/* Mobile / tablet: single line, viewport-scaled */}
              <div className="lg:hidden overflow-x-hidden">
                <h1 className="font-display font-black uppercase leading-[0.9] tracking-[-0.02em] text-[8.5vw] whitespace-nowrap">
                  <span
                    style={{
                      background: "linear-gradient(108deg, var(--color-ink) 55%, var(--color-cyan-700) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Avneet{" "}
                  </span>
                  <span className="text-outline">Singh</span>
                  <span className="text-ink">
                    {" "}<span className="text-orange-500">/</span> Virdi
                  </span>
                </h1>
              </div>
            </motion.div>

            <div className="mt-6 lg:mt-10 xl:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-2xl xl:max-w-3xl">
              <p className="text-ink-soft leading-[1.6] text-[13px] md:text-sm xl:text-base">
                {profile.role} at <span className="text-ink font-semibold">{profile.company}</span>.{" "}
                {profile.yearsExperience}+ yrs across full-time and freelance — pixel-precise, production-grade web products.
              </p>
              <p className="text-ink-soft leading-[1.6] text-[13px] md:text-sm xl:text-base">
                {profile.tagline}
              </p>
            </div>

            <div className="mt-6 lg:mt-8 xl:mt-10 flex flex-wrap items-center gap-3 xl:gap-4">
              <a href="#projects" className="btn-block" style={{ padding: "0.65rem 1rem", fontSize: "13px" }}>View Projects →</a>
              <a href="#contact" className="btn-ghost" style={{ padding: "0.55rem 0.9rem", fontSize: "11px" }}>Hire Me</a>

              {/* Tech-stack strip — inline */}
              <div className="ml-1 hidden md:flex flex-wrap items-center gap-x-4 gap-y-1 pl-3 border-l" style={{ borderColor: "rgba(14,22,32,0.3)" }}>
                {["React", "Next", "TS", "Tailwind", "Motion", "Node"].map((tech) => (
                  <span key={tech} className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft flex items-center gap-1.5">
                    <span className="inline-block h-1 w-1 rotate-45 bg-orange-500 opacity-70" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pl-4 xl:pl-6 space-y-3 xl:space-y-4">
            <IDCard
              title="IDENT."
              code="ASV-26"
              accent="cyan"
              fields={[
                { label: "Division", value: "FRONTEND" },
                { label: "Clearance", value: "SENIOR" },
                { label: "Region", value: "INDIA · REMOTE" },
                { label: "Mode", value: "FULL-TIME" },
              ]}
            />
            <IDCard
              title="ROLE."
              code="SR-FE"
              accent="orange"
              fields={[
                { label: "Position", value: "Sr. Frontend" },
                { label: "Company", value: "OptiPhoenix" },
                { label: "Stack", value: "REACT / TS" },
                { label: "Status", value: "Open to Work" },
              ]}
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft flex items-center gap-2 pt-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3ecf8e] animate-pulse" />
              Wired for production · Ships to scale
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div
          className="mt-6 lg:mt-8 xl:mt-10 flex items-center justify-between gap-6 border-t pt-3 xl:pt-4 font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.22em]"
          style={{ borderColor: "var(--color-ink)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-orange-500">01</span>
            <span className="opacity-60">/</span>
            <span>Hero</span>
            <span className="opacity-40 mx-1">·</span>
            <span className="opacity-70">Built<span className="text-cyan-500"> / </span>for<span className="text-cyan-500"> / </span>the web</span>
          </div>
          <div className="hidden md:flex items-center gap-3 opacity-70">
            <span>Scroll for index</span>
            <span aria-hidden className="inline-block h-3 w-px bg-[var(--color-ink)] opacity-50" />
            <span className="text-orange-500">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerBrackets() {
  const stroke = "var(--color-ink)";
  const size = 18;
  return (
    <div aria-hidden className="absolute inset-3 lg:inset-5 pointer-events-none">
      {([
        ["top-0 left-0", `M0 ${size} V0 H${size}`],
        ["top-0 right-0", `M${24 - size} 0 H24 V${size}`, "rotate(0)"],
        ["bottom-0 left-0", `M0 ${24 - size} V24 H${size}`],
        ["bottom-0 right-0", `M${24 - size} 24 H24 V${24 - size}`],
      ] as const).map(([pos, d]) => (
        <svg key={pos} className={`absolute ${pos}`} width="22" height="22" viewBox="0 0 24 24">
          <path d={d as string} fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      ))}
    </div>
  );
}
