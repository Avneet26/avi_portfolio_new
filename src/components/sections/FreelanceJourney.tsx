"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import BlockHeading from "@/components/ui/BlockHeading";
import HalftoneGrid from "@/components/ui/HalftoneGrid";
import { freelance } from "@/lib/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FreelanceJourney() {
  const totalClients = freelance.length;

  return (
    <section
      id="freelance"
      className="relative border-b overflow-hidden bg-cyber-b"
      style={{ borderColor: "var(--color-ink)" }}
      aria-label="Freelance journey"
    >
      <div
        className="absolute -right-10 top-10 w-[40rem] max-w-[55vw] opacity-25 pointer-events-none"
        aria-hidden
      >
        <HalftoneGrid rows={6} cols={6} className="w-full" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.18em] mb-3 text-ink-soft font-semibold">
              04 / Freelance Log
            </div>
            <BlockHeading as="h2" size="lg">
              Freelance<span className="text-orange-500">.</span>
            </BlockHeading>
            <div className="mt-3 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft">
              Independent work · 2024 → present
            </div>
          </div>
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink">
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ background: "var(--color-orange-500)", opacity: 0.6 }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--color-orange-500)" }}
                />
              </span>
              {totalClients} Clients · 3 Sectors · 2 Continents
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* List */}
          <div className="lg:col-span-8">
            <ol className="border-2 border-ink bg-paper">
              {freelance.map((f, i) => (
                <FreelanceRow key={`${f.client}-${i}`} item={f} index={i} last={i === freelance.length - 1} />
              ))}
            </ol>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Stats */}
            <div className="border-2 border-ink p-5 bg-paper-elev relative">
              <CornerTicks />
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft font-semibold mb-4">
                // Stats
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: "Clients", v: `${totalClients}+` },
                  { k: "Sectors", v: "03" },
                  { k: "Continents", v: "02" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-[2.4rem] leading-none text-ink">{s.v}</div>
                    <div className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-soft font-semibold mt-2">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping label — themed strip */}
            <div className="border-2 border-ink p-4 bg-orange-500 relative">
              <div className="font-mono text-[11.5px] uppercase tracking-[0.14em] font-semibold text-ink">
                SHIPPING / 137°45′41.4″E · 35°28′09.2″N
              </div>
              <div className="font-display text-[1.6rem] mt-1 leading-none uppercase">Cross-border</div>
              <div className="mt-3 flex items-center gap-3">
                <svg viewBox="0 0 100 30" className="h-7 w-32" aria-hidden>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <rect key={i} x={i * 2.4} y={0} width={(i % 4) + 0.6} height={30} fill="var(--color-ink)" />
                  ))}
                </svg>
                <span className="font-mono text-[11px] tracking-[0.1em] font-semibold">[BACK] [TRACK] [REF]</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Post-grid CTA */}
        <div className="mt-8 pt-7 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: "color-mix(in srgb, var(--color-ink) 20%, transparent)" }}>
          <div>
            <div className="font-mono text-[11.5px] uppercase tracking-[0.15em] text-ink-soft font-semibold mb-1">// Curious about the process?</div>
            <p className="text-ink text-[14.5px] leading-[1.5]">
              Happy to talk shop — frontend builds, A/B experiments, or how any of this came together.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 border-2 border-ink bg-orange-500 text-ink font-mono text-[12.5px] uppercase tracking-[0.1em] font-semibold px-4 py-2.5 hover:bg-ink hover:text-paper"
            style={{ transition: "background 160ms ease-out, color 160ms ease-out", boxShadow: "3px 3px 0 0 var(--color-ink)" }}
          >
            Say Hello →
          </a>
        </div>
      </div>
    </section>
  );
}

function FreelanceRow({
  item,
  index,
  last,
}: {
  item: (typeof freelance)[number];
  index: number;
  last: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.25, ease, delay: index * 0.03 }}
      className={`relative px-4 sm:px-5 py-4 hover:bg-orange-100/40 ${!last ? "border-b-2 border-ink" : ""}`}
    >
      {/* Mobile layout: column, button pinned top-right */}
      <div className="sm:hidden relative pr-[96px]">
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <ActionButton href={item.github} label={`${item.client} GitHub repo`} accent="ink">
            <GitHubIcon />
          </ActionButton>
          <ActionButton href={item.link} label={`Open ${item.client}`} accent="orange">
            <ExternalIcon />
          </ActionButton>
        </div>
        <div className="flex items-center gap-3 mb-1.5">
          <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft font-semibold w-7 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink font-semibold">
            {item.year}
          </span>
        </div>
        <div className="font-display text-[22px] uppercase leading-[1.05] text-ink">
          {item.client}
        </div>
        <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-cyan-700 font-semibold mt-2">
          {item.scope}
        </div>
        <div className="text-[13px] text-ink-soft mt-0.5 leading-[1.5]">{item.note}</div>
      </div>

      {/* sm+ layout: original row */}
      <div className="hidden sm:flex items-start gap-4">
        <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft font-semibold pt-1 w-7 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink font-semibold pt-1 w-12 shrink-0">
          {item.year}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[24px] uppercase leading-[1.05] text-ink">
            {item.client}
          </div>
        </div>
        <div className="w-[34%] pt-1 shrink-0">
          <div className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-cyan-700 font-semibold">
            {item.scope}
          </div>
          <div className="text-[13px] text-ink-soft mt-1 leading-[1.45]">{item.note}</div>
        </div>
        <div className="flex items-center justify-end gap-2 shrink-0 pt-0.5 w-[84px]">
          <ActionButton href={item.github} label={`${item.client} GitHub repo`} accent="ink">
            <GitHubIcon />
          </ActionButton>
          <ActionButton href={item.link} label={`Open ${item.client}`} accent="orange">
            <ExternalIcon />
          </ActionButton>
        </div>
      </div>
    </motion.li>
  );
}

function ActionButton({
  href,
  label,
  accent,
  children,
}: {
  href?: string;
  label: string;
  accent: "ink" | "orange";
  children: ReactNode;
}) {
  if (!href) return null;
  const fillClass =
    accent === "orange" ? "hover:bg-orange-500" : "hover:bg-cyan-100";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      whileHover={{ x: -1, y: -1 }}
      whileTap={{ x: 1, y: 1 }}
      transition={{ type: "spring", stiffness: 700, damping: 28 }}
      className={`inline-flex h-9 w-9 items-center justify-center border-2 border-ink bg-paper text-ink ${fillClass} hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
      style={{ boxShadow: "2px 2px 0 0 var(--color-ink)" }}
    >
      {children}
    </motion.a>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.95c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      <path d="M9 5H5v14h14v-4" />
      <path d="M14 4h6v6" />
      <path d="M11 13L20 4" />
    </svg>
  );
}

function CornerTicks() {
  const base = "absolute h-2 w-2 border-orange-500 pointer-events-none";
  return (
    <>
      <span className={`${base} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${base} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </>
  );
}
