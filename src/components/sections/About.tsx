"use client";

import { motion } from "framer-motion";
import { about, profile } from "@/lib/profile";
import TechStack from "@/components/ui/TechStack";

const stats = [
  { k: "Years", v: profile.yearsExperience },
  { k: "Role", v: "Sr. FE" },
  { k: "Degree", v: "B.Tech" },
  { k: "Base", v: "Delhi · IN" },
  { k: "Roamed", v: "IN · TH · CA" },
  { k: "Coffee/day", v: "3.0" },
];

const abTools = ["ABTasty", "Optimizely", "Convert", "VWO", "Google Optimize"];

const ease = [0.2, 0.8, 0.2, 1] as const;

const item = {
  hidden: { y: 16, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 0.48, ease } },
};

const leftContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rightContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative border-b overflow-hidden"
      style={{
        borderColor: "var(--color-ink)",
        backgroundColor: "var(--color-paper-elevated)",
      }}
      aria-label="About me"
    >
      {/* Layer 1: Diagonal pinstripe hatch — sets the dossier rhythm */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(14,22,32,0.045) 0 1px, transparent 1px 14px)",
        }}
      />

      {/* Layer 2: Counter-diagonal accent hatch (cyan) — depth without noise */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(43,125,146,0.05) 0 1px, transparent 1px 28px)",
        }}
      />

      {/* Layer 3: Top-right halftone radial — cyan scan beam glow */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[640px] h-[640px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(88,174,195,0.22) 0%, rgba(88,174,195,0.10) 35%, transparent 65%)",
          maskImage:
            "radial-gradient(circle, currentColor 1.4px, transparent 1.6px)",
          WebkitMaskImage:
            "radial-gradient(circle, currentColor 1.4px, transparent 1.6px)",
          maskSize: "8px 8px",
          WebkitMaskSize: "8px 8px",
        }}
      />

      {/* Layer 4: Bottom-left halftone radial — orange warm anchor */}
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[520px] h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,138,71,0.18) 0%, rgba(255,138,71,0.08) 40%, transparent 70%)",
          maskImage:
            "radial-gradient(circle, currentColor 1.2px, transparent 1.4px)",
          WebkitMaskImage:
            "radial-gradient(circle, currentColor 1.2px, transparent 1.4px)",
          maskSize: "7px 7px",
          WebkitMaskSize: "7px 7px",
        }}
      />

      {/* Layer 5: SVG paper grain — subtle texture so the hatch doesn't feel digital */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.45] mix-blend-multiply"
      >
        <filter id="aboutGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.05  0 0 0 0 0.08  0 0 0 0 0.12  0 0 0 0.18 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aboutGrain)" />
      </svg>

      {/* Layer 6: Massive decorative "02" — file folder tab */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          right: "-2.5rem",
          bottom: "-2rem",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(18rem, 32vw, 32rem)",
          lineHeight: 0.78,
          letterSpacing: "-0.06em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(14,22,32,0.10)",
          fontVariationSettings: '"wdth" 72',
        }}
      >
        02
      </div>

      {/* Layer 7: Top horizontal "classification" rule with mono ticks */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--color-ink) 0 24px, transparent 24px 32px)",
          opacity: 0.3,
        }}
      />

      {/* Layer 8: Left-edge dossier "punch holes" */}
      <div aria-hidden className="absolute left-3 top-0 bottom-0 hidden lg:flex flex-col justify-around items-center pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="block w-2 h-2 rounded-full"
            style={{ background: "var(--color-paper)", boxShadow: "inset 0 0 0 1px rgba(14,22,32,0.35)" }}
          />
        ))}
      </div>

      {/* Layer 9: Stamp / classification mark — top-right corner */}
      <div
        aria-hidden
        className="absolute top-8 right-8 hidden md:block pointer-events-none rotate-[-6deg]"
        style={{
          border: "1.5px solid rgba(255,138,71,0.55)",
          color: "rgba(255,138,71,0.75)",
          padding: "4px 10px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          background: "rgba(255,255,255,0.4)",
        }}
      >
        ◆ Operator File ◆
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        {/* Section label */}
        <motion.div
          className="font-mono text-[13px] uppercase tracking-[0.18em] mb-10 text-ink-soft font-semibold flex items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-orange-500" />
          02 / About — Operator Profile
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT — bio */}
          <motion.div
            className="lg:col-span-7"
            variants={leftContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Heading */}
            <motion.div variants={item}>
              <h2
                className="font-display font-black uppercase leading-[0.88] text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem]"
                style={{
                  letterSpacing: "-4px",
                  background: "linear-gradient(108deg, var(--color-ink) 60%, var(--color-cyan-700) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                About
              </h2>
              <h2
                className="font-display font-black uppercase leading-[0.88] text-outline text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem]"
                style={{ letterSpacing: "-4px" }}
              >
                Me<span className="text-orange-500">_</span>
              </h2>
            </motion.div>

            {/* Bio paragraphs */}
            <div className="mt-8 space-y-5 max-w-xl">
              {[about.intro, about.expertise, about.agentic, about.personal].map((para, i) => (
                <motion.p key={i} variants={item} className="text-ink-soft leading-[1.7] text-[15px] xl:text-[16.5px]">
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Coming soon callout */}
            <motion.div variants={item} className="mt-6 border-l-2 pl-4 py-1.5" style={{ borderColor: "#f97316" }}>
              <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-orange-500 mb-1.5 font-semibold">// Coming soon</div>
              <p className="text-ink text-[14.5px] leading-[1.6]">{about.gamedev}</p>
            </motion.div>

            {/* Tech stack cards */}
            <motion.div variants={item} className="mt-8 border-t pt-5" style={{ borderColor: "var(--color-ink)" }}>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft font-semibold mb-3 flex items-center gap-2">
                <span>// Stack — comfortable in</span>
                <span className="flex-1 h-px bg-ink/20" />
                <span className="opacity-70">10 / 10</span>
              </div>
              <TechStack />
            </motion.div>

            {/* A/B tools strip */}
            <motion.div variants={item} className="mt-5">
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft font-semibold mb-3">// A/B testing platforms</div>
              <div className="flex flex-wrap gap-2 font-mono text-[12.5px] uppercase tracking-[0.06em]">
                {abTools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 border flex items-center gap-1.5 text-ink"
                    style={{ borderColor: "rgba(249,115,22,0.7)" }}
                  >
                    <span className="inline-block h-1 w-1 rotate-45 bg-orange-500" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — stat cards + specialisation */}
          <motion.aside
            className="lg:col-span-5 lg:pl-6"
            variants={rightContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item} className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="border p-4 hover:bg-cyan-50/60 transition-colors backdrop-blur-md bg-white/55"
                  style={{ borderColor: "var(--color-ink)" }}
                >
                  <div className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.12em] font-semibold">{s.k}</div>
                  <div className="mt-1 font-display text-2xl text-ink">{s.v}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-6 border p-5 backdrop-blur-md bg-white/55" style={{ borderColor: "var(--color-ink)" }}>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft font-semibold mb-4">// Specialisation</div>
              <div className="space-y-3">
                {[
                  { label: "UI Development", sub: "Pixel-precise, production-grade interfaces", accent: "cyan" },
                  { label: "A/B Testing", sub: "End-to-end experiment build & instrumentation", accent: "cyan" },
                  { label: "Team Leadership", sub: "5–6 devs, 3–4 QA — timelines, clients, the works", accent: "orange" },
                  { label: "Agentic Coding", sub: "Prompt frameworks, Claude Code, AI-native workflows", accent: "orange" },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <span
                      className="inline-block h-2 w-2 rotate-45 flex-shrink-0 mt-[7px]"
                      style={{ background: spec.accent === "orange" ? "#f97316" : "#58aec3" }}
                    />
                    <div>
                      <div className="font-display text-[17px] font-black uppercase text-ink leading-tight">{spec.label}</div>
                      <div className="text-[13.5px] text-ink-soft leading-[1.5] mt-1">{spec.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Status strip */}
            <motion.div variants={item} className="mt-3 border p-4 flex items-center justify-between backdrop-blur-md bg-white/55" style={{ borderColor: "var(--color-ink)" }}>
              <div>
                <div className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-soft font-semibold">Current status</div>
                <div className="font-display text-[17px] font-black uppercase text-ink mt-1 leading-tight">Full-time · OptiPhoenix</div>
                <div className="text-[13px] text-ink-soft mt-0.5">Delhi, India</div>
              </div>
              <span className="inline-block h-2 w-2 rounded-full bg-[#3ecf8e] animate-pulse flex-shrink-0" />
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
