"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BlockHeading from "@/components/ui/BlockHeading";
import { experience } from "@/lib/profile";

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.4 });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative border-b bg-paper-elev overflow-hidden"
      style={{ borderColor: "var(--color-ink)" }}
      aria-label="Experience"
    >
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* heading row */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.18em] mb-3 text-ink-soft font-semibold">
              03 / Career Log
            </div>
            <BlockHeading as="h2" size="lg">
              Experience<span className="text-cyan-500">.</span>
            </BlockHeading>
          </div>
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink">
            <span className="inline-flex items-center gap-2">
              <Pulse />
              {experience.length} Roles · 2021 → Present
            </span>
          </div>
        </div>

        {/* timeline */}
        <div ref={trackRef} className="relative pl-10 sm:pl-14">
          {/* spine — base */}
          <div
            aria-hidden
            className="absolute left-3 sm:left-5 top-2 bottom-2 w-px"
            style={{ background: "color-mix(in srgb, var(--color-ink) 18%, transparent)" }}
          />
          {/* spine — progress */}
          <motion.div
            aria-hidden
            className="absolute left-3 sm:left-5 top-2 bottom-2 w-[2px] origin-top"
            style={{
              scaleY: lineScale,
              background:
                "linear-gradient(var(--color-cyan-500) 0%, var(--color-cyan-500) 60%, var(--color-orange-500) 100%)",
              boxShadow: "0 0 8px color-mix(in srgb, var(--color-cyan-500) 60%, transparent)",
            }}
          />

          <ol className="grid gap-5">
            {experience.map((e, i) => (
              <Entry key={`${e.company}-${e.period}-${i}`} entry={e} index={i} last={i === experience.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Entry({
  entry,
  index,
  last,
}: {
  entry: (typeof experience)[number];
  index: number;
  last: boolean;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.45, ease, delay: index * 0.06 }}
      className="group relative"
    >
      {/* spine node */}
      <div className="absolute -left-10 sm:-left-14 top-3 flex items-center gap-2">
        <motion.span
          className="relative block h-3 w-3 rotate-45 border-2 border-ink bg-paper-elev"
          whileHover={{ scale: 1.3, rotate: 90 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        >
          {last && (
            <span
              aria-hidden
              className="absolute inset-0 -rotate-45 animate-ping rounded-[1px]"
              style={{ background: "var(--color-orange-500)", opacity: 0.5 }}
            />
          )}
        </motion.span>
      </div>

      {/* year badge */}
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink mb-2 flex items-center flex-wrap gap-x-2 gap-y-0.5">
        <span className="text-cyan-700 font-semibold">[{String(index + 1).padStart(2, "0")}]</span>
        <span className="opacity-30">/</span>
        <span className="font-semibold">{entry.period}</span>
        <span className="opacity-30">·</span>
        <span className="text-ink-soft">{entry.location}</span>
      </div>

      {/* card */}
      <motion.article
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative border-2 border-ink bg-paper p-4 lg:p-5"
        style={{ boxShadow: "3px 3px 0 0 var(--color-ink)" }}
      >
        {/* corner ticks */}
        <CornerTicks />

        {/* hover scanline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            transition: "opacity 200ms ease-out",
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, color-mix(in srgb, var(--color-cyan-500) 8%, transparent) 3px, color-mix(in srgb, var(--color-cyan-500) 8%, transparent) 4px)",
            mixBlendMode: "multiply",
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-7">
            <h3 className="font-display text-[26px] lg:text-[30px] leading-[0.95] uppercase tracking-tight">
              {entry.role}
            </h3>
            <div className="font-mono text-[13px] uppercase tracking-[0.12em] mt-2 font-semibold">
              <span className="text-orange-500">@ {entry.company}</span>
            </div>
            <ul className="mt-3.5 space-y-2 text-ink-soft text-[14.5px] leading-[1.6]">
              {entry.bullets.map((b, j) => (
                <li key={j} className="pl-4 relative">
                  <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rotate-45 bg-cyan-500" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 flex flex-wrap content-start gap-1.5">
            {entry.stack.map((s, k) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease, delay: 0.15 + k * 0.03 }}
                whileHover={{ y: -2 }}
                className="px-2.5 py-[4px] border border-rule font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink hover:bg-cyan-100/60 hover:border-ink"
                style={{ transition: "background 160ms ease-out, border-color 160ms ease-out" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

function CornerTicks() {
  const base = "absolute h-2 w-2 border-cyan-500 pointer-events-none";
  return (
    <>
      <span className={`${base} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${base} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </>
  );
}

function Pulse() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full"
        style={{ background: "var(--color-cyan-500)", opacity: 0.6 }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: "var(--color-cyan-500)" }}
      />
    </span>
  );
}
