"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DottedGlobe from "@/components/ui/DottedGlobe";
import IDCard from "@/components/ui/IDCard";
import { profile, openToWork } from "@/lib/profile";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Hero() {
  const [globeHeight, setGlobeHeight] = useState(680);

  useEffect(() => {
    const update = () => {
      const next = window.innerWidth < 1024 ? 450 : 680;
      setGlobeHeight(prev => prev === next ? prev : next);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b flex flex-col"
      style={{
        borderColor: "var(--color-ink)",
        backgroundColor: "var(--color-paper-elevated)",
        // viewport minus sticky header (TopTape ~34px + Navbar ~64px)
        minHeight: "calc(100dvh - 98px)",
      }}
      aria-label="Intro"
    >
      {/* 22px grid — masked so it fades toward the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 16%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 16%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 55% 100% at 0% 50%, #000 40%, transparent 75%), radial-gradient(ellipse 55% 100% at 100% 50%, #000 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 100% at 0% 50%, #000 40%, transparent 75%), radial-gradient(ellipse 55% 100% at 100% 50%, #000 40%, transparent 75%)",
          maskComposite: "add",
          WebkitMaskComposite: "destination-over",
        }}
      />

      {/* Crosshair guides */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-ink) 18%, transparent) 12%, color-mix(in srgb, var(--color-ink) 18%, transparent) 88%, transparent)" }} />
        <div className="absolute right-[8%] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-cyan-500) 45%, transparent) 12%, color-mix(in srgb, var(--color-cyan-500) 45%, transparent) 88%, transparent)" }} />
        <div className="absolute left-0 right-0 top-[42%] h-px" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-ink) 12%, transparent) 10%, color-mix(in srgb, var(--color-ink) 12%, transparent) 90%, transparent)" }} />
      </div>

      <div className="scanlines absolute inset-0" aria-hidden />

      {/* Dotted globe */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[-32%] w-[500px] lg:w-[44vw] lg:max-w-[680px] opacity-80">
        <DottedGlobe width={680} height={globeHeight} />
      </div>


      {/* Corner brackets */}
      <CornerBrackets />

      <div className="relative z-[1] mx-auto w-full max-w-[1400px] px-6 lg:px-10 pt-6 lg:pt-10 xl:pt-14 pb-6 xl:pb-8 flex-1 flex flex-col">
        {/* Coordinate / sector strip */}
        <div className="font-mono text-[12px] xl:text-[13px] uppercase tracking-[0.16em] flex items-center justify-between gap-4 mb-5 lg:mb-8 xl:mb-12 text-ink">
          <div className="flex items-center gap-3 font-semibold">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-orange-500" />
            <span>SFE.01 · Frontend Engineer · India / Remote · 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-ink-soft">
            <span>SECTOR <span className="text-orange-500 font-semibold">07</span></span>
            <span className="opacity-40">·</span>
            <span>LAT 28.61°N</span>
            <span className="opacity-40">·</span>
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

              {/* Mobile / tablet: 3 stacked lines */}
              <div className="lg:hidden">
                <h1
                  className="font-display font-black uppercase leading-[0.88] text-[17vw] sm:text-[13vw]"
                  style={{
                    letterSpacing: "-3px",
                    background: "linear-gradient(108deg, var(--color-ink) 55%, var(--color-cyan-700) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Avneet
                </h1>
                <h1
                  className="font-display font-black uppercase leading-[0.88] text-outline text-[17vw] sm:text-[13vw]"
                  style={{ letterSpacing: "-3px" }}
                >
                  Singh
                </h1>
                <h1
                  className="font-display font-black uppercase leading-[0.88] text-ink text-[17vw] sm:text-[13vw]"
                  style={{ letterSpacing: "-3px" }}
                >
                  <span className="text-orange-500">/ </span>Virdi
                </h1>
              </div>
            </motion.div>

            <div className="mt-6 lg:mt-10 xl:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-2xl xl:max-w-3xl bg-[color-mix(in_srgb,var(--color-paper-elevated)_78%,transparent)] border border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)] px-4 py-4 lg:bg-transparent lg:border-0 lg:p-0">
              <p className="text-ink leading-[1.65] text-[15px] xl:text-[17px]">
                <span className="font-semibold">{profile.role}</span> at <span className="font-semibold">{profile.company}</span>.{" "}
                <span className="text-ink-soft">{profile.yearsExperience} years building pixel-precise, production-grade web products.</span>
              </p>
              <p className="text-ink-soft leading-[1.65] text-[15px] xl:text-[17px]">
                {profile.tagline}
              </p>
            </div>

            <div className="mt-6 lg:mt-8 xl:mt-10 flex flex-wrap items-center gap-3 xl:gap-4">
              <a href="#contact" className="btn-block" style={{ padding: "0.7rem 1.1rem", fontSize: "14px" }}>Get in Touch →</a>
              <a href="#projects" className="btn-ghost" style={{ padding: "0.6rem 1rem", fontSize: "13px" }}>View Projects</a>

              {/* Tech-stack strip — inline, desktop only */}
              <div className="ml-1 hidden md:flex flex-wrap items-center gap-x-4 gap-y-1 pl-3 border-l" style={{ borderColor: "color-mix(in srgb, var(--color-ink) 40%, transparent)" }}>
                {["React", "Next", "TS", "Tailwind", "Motion", "Node"].map((tech) => (
                  <span key={tech} className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink flex items-center gap-1.5 font-semibold">
                    <span className="inline-block h-1 w-1 rotate-45 bg-orange-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links — visible on mobile below CTA, hidden on desktop (shown in right col) */}
            <div className="lg:hidden">
              <SocialLinks className="mt-4" variant="chips" />
              <HeroResumeCta className="mt-4 w-full" />
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
                ...(openToWork ? [{ label: "Status", value: "Open to Work" }] : []),
              ]}
            />
            <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink flex items-center gap-2 pt-1 font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3ecf8e] animate-pulse" />
              Wired for production · Ships to scale
            </div>
            <div className="hidden lg:block">
              <SocialLinks className="mt-4" variant="chips" />
            </div>

            {/* Resume CTA — quick path to the formal one-pager */}
            <HeroResumeCta className="hidden lg:flex w-full" />
          </div>
        </div>

        {/* Bottom rail */}
        <div
          className="mt-6 lg:mt-8 xl:mt-10 flex items-center justify-between gap-6 pt-3 xl:pt-4 font-mono text-[12px] xl:text-[13px] uppercase tracking-[0.12em]"
          style={{ borderColor: "var(--color-ink)" }}
        >
          <div className="flex items-center gap-3 text-ink">
            <span className="text-orange-500 font-semibold">01</span>
            <span className="opacity-50">/</span>
            <span className="font-semibold">Hero</span>
            <span className="opacity-40 mx-1">·</span>
            <span>Built<span className="text-cyan-500"> / </span>for<span className="text-cyan-500"> / </span>the web</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-ink-soft">
            <span>Scroll for index</span>
            <span aria-hidden className="inline-block h-3 w-px bg-[var(--color-ink)] opacity-60" />
            <span className="text-orange-500 font-semibold">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroResumeCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/resume"
      className={`hero-resume-cta ${className}`.trim()}
      aria-label="View resume"
    >
      <span className="hero-resume-cta-tab">
        <span className="hero-resume-cta-diamond" aria-hidden />
        RESUME · ASV-26
      </span>
      <span className="hero-resume-cta-body">
        <span className="hero-resume-cta-headline">
          View / Download Resume
        </span>
        <span className="hero-resume-cta-meta">
          A4 · PDF · 1 page · Updated 2026
        </span>
      </span>
      <span className="hero-resume-cta-arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}

function CornerBrackets() {
  const stroke = "var(--color-ink)";
  const size = 18;
  const bracketPaths = [
    ["top-0 left-0", `M0 ${size} V0 H${size}`],
    ["top-0 right-0", `M${24 - size} 0 H24 V${size}`],
    ["bottom-0 left-0", `M0 ${24 - size} V24 H${size}`],
    ["bottom-0 right-0", `M${24 - size} 24 H24 V${24 - size}`],
  ] as const;

  return (
    <div aria-hidden className="absolute inset-3 lg:inset-5 pointer-events-none">
      {bracketPaths.map(([pos, d]) => (
        <svg key={pos} className={`absolute ${pos}`} width="22" height="22" viewBox="0 0 24 24">
          <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      ))}
    </div>
  );
}
