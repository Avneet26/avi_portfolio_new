"use client";

import { motion } from "framer-motion";
import BlockHeading from "@/components/ui/BlockHeading";

const ease = [0.22, 1, 0.36, 1] as const;
const revealInView = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -5% 0px" },
  transition: { duration: 0.28, ease },
} as const;

const topicPillars = [
  { k: "AI / Agentic", v: "Claude Code, prompt frameworks, real-world wins & sharp edges", accent: "cyan" as const },
  { k: "Game Dev", v: "Dev logs from a side build — engine choices, UI, scope creep", accent: "orange" as const },
  { k: "Frontend / CRO", v: "Motion budgets, A/B teardowns, what production actually needs", accent: "ink" as const },
];

const accentBarColor = {
  orange: "var(--color-orange-500)",
  ink: "var(--color-ink)",
  cyan: "var(--color-cyan-500)",
} as const;

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="relative border-b overflow-hidden bg-cyber-a"
      style={{ borderColor: "var(--color-ink)" }}
      aria-label="Dev logs and blogs — coming soon"
    >
      <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Header — matches Experience / Freelance / Projects */}
        <motion.div {...revealInView} className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.18em] mb-3 text-ink-soft font-semibold">
              07 / Dev Logs · Blogs
            </div>
            <BlockHeading as="h2" size="lg">
              Dev Logs<span className="text-cyan-500">.</span>
            </BlockHeading>
            <div className="mt-3 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft">
              Field notes from the build · 2026 →
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
              Status · Building
            </span>
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          {...revealInView}
          className="border-2 border-ink bg-paper-elev p-5 lg:p-6 relative max-w-3xl"
          style={{ boxShadow: "4px 4px 0 0 var(--color-ink)" }}
        >
          <CornerTicks accent="cyan" />
          <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-cyan-700 font-semibold mb-3">
            // Coming soon
          </div>
          <p className="text-ink text-[16px] leading-[1.65]">
            Long-form posts on the things I&rsquo;m actually shipping —
            <span className="font-semibold text-ink"> AI-native and agentic coding workflows</span>,{" "}
            <span className="font-semibold text-ink">CRO experiment teardowns</span>, and an ongoing{" "}
            <span className="font-semibold text-ink">game dev / dev log</span> series as I build something on the side.
          </p>
          <p className="text-ink-soft text-[14.5px] leading-[1.65] mt-3">
            Less &ldquo;how to use React,&rdquo; more &ldquo;what changed when an agent wrote half of it.&rdquo;
          </p>

          {/* Topic pillars */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topicPillars.map((t) => (
              <div key={t.k} className="border-2 border-ink p-3 bg-paper relative">
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-1 w-12"
                  style={{ background: accentBarColor[t.accent] }}
                />
                <div className="font-display text-[18px] uppercase leading-tight text-ink">{t.k}</div>
                <div className="text-[12.5px] text-ink-soft leading-[1.5] mt-1">{t.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CornerTicks({ accent }: { accent: "cyan" | "orange" }) {
  const cls = accent === "orange" ? "border-orange-500" : "border-cyan-500";
  const base = `absolute h-2.5 w-2.5 ${cls} pointer-events-none`;
  return (
    <>
      <span className={`${base} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${base} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </>
  );
}
