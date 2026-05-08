"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlockHeading from "@/components/ui/BlockHeading";
import { liveProjects, projects, type LiveProject, type FunProject } from "@/lib/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-b bg-paper-elev"
      style={{ borderColor: "var(--color-ink)" }}
      aria-label="Projects"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.18em] mb-3 text-ink-soft font-semibold">
              05 / Selected Builds
            </div>
            <BlockHeading as="h2" size="lg">
              Projects<span className="text-orange-500">/</span>Personal
            </BlockHeading>
          </div>
          <motion.a
            href="https://github.com/Avneet26"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Avneet's GitHub profile"
            whileHover={{ x: -1, y: -1 }}
            whileTap={{ x: 1, y: 1 }}
            transition={{ type: "spring", stiffness: 700, damping: 28 }}
            className="inline-flex items-center gap-2 border-2 border-ink bg-ink text-paper hover:bg-paper hover:text-ink px-4 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.12em] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            style={{ boxShadow: "3px 3px 0 0 var(--color-ink)" }}
          >
            <GitHubIcon />
            <span>GitHub Profile</span>
            <span aria-hidden>↗</span>
          </motion.a>
        </div>

        {/* Intro note */}
        <div className="mb-12 max-w-3xl border-l-2 border-orange-500 pl-4 py-1">
          <p className="text-ink text-[15px] leading-[1.6]">
            Stuff I built outside of work and freelance — for fun, for learning, and for the
            occasional rabbit-hole experiment.
            <span className="text-ink-soft">
              {" "}A handful are featured below; many more sit in my{" "}
            </span>
            <a
              href="https://github.com/Avneet26?tab=stars"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-orange-500 decoration-2 underline-offset-[3px] hover:text-orange-500"
            >
              GitHub starred list
            </a>
            <span className="text-ink-soft">.</span>
          </p>
        </div>

        {/* Live Projects subsection */}
        <div className="mb-14">
          <SubsectionLabel
            label="// Now live · Production builds"
            meta={`${liveProjects.length} shipped · open to use`}
          />

          <div className="grid grid-cols-1 gap-6">
            {liveProjects.map((p, i) => (
              <LiveProjectCard key={p.code} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* Fun / experimental project grid — compact */}
        <div>
          <SubsectionLabel
            label="// For fun · Experiments"
            meta={`${projects.length} small builds`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <FunProjectCard key={p.code} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SubsectionLabel({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
      <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-soft font-semibold flex items-center gap-3">
        <span>{label}</span>
        <span className="hidden sm:inline-block flex-1 h-px bg-ink/15 min-w-[40px]" />
      </div>
      <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft">{meta}</div>
    </div>
  );
}

function LiveProjectCard({ project, index }: { project: LiveProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="group relative border-2 border-ink bg-paper overflow-hidden"
      style={{ boxShadow: "4px 4px 0 0 var(--color-ink)" }}
    >
      <CornerTicks />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Image */}
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] border-b-2 lg:border-b-0 lg:border-r-2 border-ink overflow-hidden bg-paper-elev">
          <Image
            src={project.cover}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.02]"
            unoptimized
          />
          {/* gradient + scanline overlay (cyberpunk) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, color-mix(in srgb, var(--color-ink) 18%, transparent) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              transition: "opacity 220ms ease-out",
              background:
                "repeating-linear-gradient(0deg, transparent 0 3px, color-mix(in srgb, var(--color-cyan-500) 10%, transparent) 3px 4px)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Code chip */}
          <div className="absolute top-3 left-3 font-mono text-[11px] uppercase tracking-[0.12em] bg-paper px-2 py-1 border-2 border-ink font-semibold">
            {project.code}
          </div>
          {/* Live status */}
          <div className="absolute top-3 right-3 font-mono text-[11px] uppercase tracking-[0.12em] bg-paper px-2.5 py-1 border-2 border-ink font-semibold flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full"
                style={{ background: "#3ecf8e", opacity: 0.7 }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#3ecf8e" }}
              />
            </span>
            Live
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 p-5 lg:p-6 flex flex-col gap-4">
          <div>
            <h3 className="font-display text-[28px] lg:text-[32px] uppercase leading-[0.95] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-[12.5px] uppercase tracking-[0.08em] text-cyan-700 font-semibold">
              {project.tagline}
            </p>
          </div>

          <p className="text-ink-soft text-[14.5px] leading-[1.6]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-2.5 py-[4px] border border-rule font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-2 flex items-center gap-2.5">
            {project.github && (
              <ActionLink href={project.github} label={`${project.title} repo on GitHub`} variant="ghost">
                <GitHubIcon />
                <span>Source</span>
              </ActionLink>
            )}
            {project.link && (
              <ActionLink href={project.link} label={`Open ${project.title}`} variant="solid">
                <span>Visit Live</span>
                <ExternalIcon />
              </ActionLink>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FunProjectCard({ project, index }: { project: FunProject; index: number }) {
  const accentBg =
    project.accent === "orange"
      ? "var(--color-orange-500)"
      : project.accent === "ink"
      ? "var(--color-ink)"
      : "var(--color-cyan-500)";
  const accentText =
    project.accent === "ink" ? "var(--color-paper)" : "var(--color-ink)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.45, ease, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="group relative border-2 border-ink bg-paper flex flex-col"
      style={{ boxShadow: "3px 3px 0 0 var(--color-ink)" }}
    >
      {/* accent strip */}
      <div
        aria-hidden
        className="h-2 w-full border-b-2 border-ink"
        style={{ background: accentBg }}
      />

      {/* cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-ink bg-paper-elev">
        <Image
          src={project.cover}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
          unoptimized
        />
        {/* depth gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--color-ink) 16%, transparent) 100%)",
          }}
        />
        {/* hover scanline */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            transition: "opacity 220ms ease-out",
            background:
              "repeating-linear-gradient(0deg, transparent 0 3px, color-mix(in srgb, var(--color-cyan-500) 10%, transparent) 3px 4px)",
            mixBlendMode: "multiply",
          }}
        />
        {/* code chip */}
        <span
          className="absolute top-3 left-3 inline-block px-2 py-[3px] border-2 border-ink font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
          style={{ background: accentBg, color: accentText }}
        >
          {project.code}
        </span>
        {/* sparkline */}
        <svg viewBox="0 0 60 12" className="absolute top-3 right-3 h-3 w-12 opacity-70" aria-hidden>
          {Array.from({ length: 18 }).map((_, k) => (
            <rect
              key={k}
              x={k * 3.4}
              y={k % 3 === 0 ? 2 : k % 2 === 0 ? 5 : 7}
              width="1.4"
              height={k % 3 === 0 ? 10 : k % 2 === 0 ? 7 : 5}
              fill="var(--color-paper)"
              stroke="var(--color-ink)"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </div>

      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-[24px] uppercase leading-[1] tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-cyan-700 font-semibold">
            {project.tagline}
          </p>
        </div>

        <p className="text-ink-soft text-[14px] leading-[1.55]">{project.blurb}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-[3px] border border-rule font-mono text-[11px] uppercase tracking-[0.08em] text-ink"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center gap-2">
          {project.github && (
            <ActionLink href={project.github} label={`${project.title} repo`} variant="ghost" small>
              <GitHubIcon />
              <span>Source</span>
            </ActionLink>
          )}
          {project.link && (
            <ActionLink href={project.link} label={`Open ${project.title}`} variant="solid" small>
              <span>Live</span>
              <ExternalIcon />
            </ActionLink>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ActionLink({
  href,
  label,
  variant,
  small = false,
  children,
}: {
  href: string;
  label: string;
  variant: "solid" | "ghost";
  small?: boolean;
  children: React.ReactNode;
}) {
  const solid = "bg-orange-500 text-ink hover:bg-orange-300";
  const ghost = "bg-paper text-ink hover:bg-cyan-100";
  const sizeCls = small
    ? "px-2.5 py-1.5 text-[11px] tracking-[0.08em] gap-1.5"
    : "px-3 py-2 text-[12px] tracking-[0.1em] gap-2";
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ x: -1, y: -1 }}
      whileTap={{ x: 1, y: 1 }}
      transition={{ type: "spring", stiffness: 700, damping: 28 }}
      className={`inline-flex items-center border-2 border-ink font-mono uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${sizeCls} ${
        variant === "solid" ? solid : ghost
      }`}
      style={{ boxShadow: "2px 2px 0 0 var(--color-ink)" }}
    >
      {children}
    </motion.a>
  );
}

function CornerTicks() {
  const base = "absolute h-2.5 w-2.5 border-orange-500 pointer-events-none z-10";
  return (
    <>
      <span className={`${base} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${base} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.95c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
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
