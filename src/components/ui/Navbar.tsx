"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "experience", label: "Career" },
  { id: "freelance",  label: "Freelance" },
  { id: "projects",   label: "Projects" },
  { id: "education",  label: "Edu" },
  { id: "blogs",      label: "Blog" },
  { id: "contact",    label: "Contact" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

type LenisLike = { scrollTo: (target: string | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void };

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -96 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

export default function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  useEffect(() => {
    const els = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            id: e.target.id as SectionId,
            top: Math.abs(e.boundingClientRect.top),
          }))
          .sort((a, b) => a.top - b.top);
        if (visible[0]) setActive(visible[0].id);
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const move = () => {
      const target = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!target) return;
      const parentRect = list.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      indicator.style.width = `${rect.width}px`;
      indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
      indicator.style.opacity = "1";
    };

    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  return (
    <div
      className="border-b border-t backdrop-blur"
      style={{
        borderColor: "var(--color-ink)",
        background: "color-mix(in oklab, var(--color-paper) 88%, transparent)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-2">
        <nav
          className="relative flex items-center justify-between gap-4 px-3 lg:px-4 py-2"
          style={{ border: "1.5px solid var(--color-ink)", background: "var(--color-paper-elevated)" }}
        >
          <span aria-hidden className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 bg-orange-500" />
          <span aria-hidden className="absolute -top-[3px] -right-[3px] h-1.5 w-1.5 bg-cyan-500" />
          <span aria-hidden className="absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 bg-cyan-500" />
          <span aria-hidden className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 bg-orange-500" />

          <a
            href="#home"
            onClick={(e) => handleClick(e, "home")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="h-7 w-7 grid place-items-center bg-ink text-paper font-display text-base leading-none">A</div>
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
              VIRDI<span className="opacity-50"> / </span>0151
            </span>
            <span
              className="hidden xl:inline-flex items-center gap-1.5 ml-2 pl-3 border-l font-mono text-[10px] uppercase tracking-widest opacity-70"
              style={{ borderColor: "var(--color-ink)" }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3ecf8e] animate-pulse" />
              ONLINE
            </span>
          </a>

          <ul
            ref={listRef}
            className="nav-list relative hidden lg:flex items-stretch font-mono text-[10px] uppercase tracking-[0.14em]"
          >
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="flex">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  data-id={s.id}
                  data-active={active === s.id}
                  aria-current={active === s.id ? "true" : undefined}
                  className="nav-link relative flex items-center gap-1.5 px-2.5 py-2 transition-colors"
                >
                  <span className="nav-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
            <span
              ref={indicatorRef}
              aria-hidden
              className="nav-indicator"
            />
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleClick(e, "contact")}
            className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-transform shrink-0 hover:-translate-y-[1px]"
            style={{
              border: "1.5px solid var(--color-ink)",
              background: "var(--color-orange-500)",
              color: "var(--color-ink)",
              boxShadow: "3px 3px 0 0 var(--color-ink)",
            }}
          >
            Get in touch <span aria-hidden>→</span>
          </a>
        </nav>

        <ol
          className="mt-1.5 flex lg:hidden items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em]"
          aria-label="Section progress"
        >
          {SECTIONS.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex-1">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  className="block h-[3px] w-full transition-colors"
                  style={{
                    background: isActive ? "var(--color-orange-500)" : "var(--color-ink)",
                    opacity: isActive ? 1 : 0.18,
                  }}
                  aria-label={`${String(i + 1).padStart(2, "0")} ${s.label}`}
                  aria-current={isActive ? "true" : undefined}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
