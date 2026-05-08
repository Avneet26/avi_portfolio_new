"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

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

function SunIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

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

          {/* Logo */}
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

          {/* Desktop nav list */}
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
                  <span className="nav-num hidden min-[1220px]:inline">{String(i + 1).padStart(2, "0")}</span>
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

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Theme toggle — desktop only (segmented control) */}
            <div
              role="group"
              aria-label="Color theme"
              className="hidden lg:flex h-7 shrink-0"
              style={{ border: "1.5px solid var(--color-ink)" }}
            >
              {/* Sun / Light segment */}
              <button
                onClick={() => theme !== "light" && toggleTheme()}
                aria-label="Light mode"
                aria-pressed={theme === "light"}
                className="relative flex items-center justify-center w-8 h-full transition-colors duration-200"
                style={{
                  background: theme === "light"
                    ? "color-mix(in srgb, var(--color-orange-500) 14%, var(--color-paper-elevated))"
                    : "var(--color-paper-elevated)",
                  borderRight: "1px solid color-mix(in srgb, var(--color-ink) 30%, transparent)",
                }}
              >
                {theme === "light" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--color-orange-500)" }}
                  />
                )}
                <span style={{
                  color: theme === "light" ? "var(--color-orange-500)" : "var(--color-ink-soft)",
                  opacity: theme === "light" ? 1 : 0.4,
                  transition: "color 200ms, opacity 200ms",
                  display: "flex",
                }}>
                  <SunIcon size={13} />
                </span>
              </button>

              {/* Moon / Dark segment */}
              <button
                onClick={() => theme !== "dark" && toggleTheme()}
                aria-label="Dark mode"
                aria-pressed={theme === "dark"}
                className="relative flex items-center justify-center w-8 h-full transition-colors duration-200"
                style={{
                  background: theme === "dark"
                    ? "color-mix(in srgb, var(--color-cyan-500) 14%, var(--color-paper-elevated))"
                    : "var(--color-paper-elevated)",
                }}
              >
                {theme === "dark" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--color-cyan-500)" }}
                  />
                )}
                <span style={{
                  color: theme === "dark" ? "var(--color-cyan-500)" : "var(--color-ink-soft)",
                  opacity: theme === "dark" ? 1 : 0.4,
                  transition: "color 200ms, opacity 200ms",
                  display: "flex",
                }}>
                  <MoonIcon size={13} />
                </span>
              </button>
            </div>

            {/* CTA — desktop only */}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "contact")}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-transform shrink-0 hover:-translate-y-[1px]"
              style={{
                border: "1.5px solid var(--color-ink)",
                background: "var(--color-orange-500)",
                color: "var(--color-ink)",
                boxShadow: "3px 3px 0 0 var(--color-ink)",
              }}
            >
              Get in touch <span aria-hidden>→</span>
            </a>

            {/* Hamburger — mobile/tablet */}
            <div ref={menuRef} className="relative lg:hidden">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                className="flex flex-col justify-center items-center h-8 w-8 gap-[5px]"
                style={{
                  border: "1.5px solid var(--color-ink)",
                  background: "var(--color-paper-elevated)",
                }}
              >
                <span
                  className="block w-4 h-px transition-transform duration-200"
                  style={{
                    background: "var(--color-ink)",
                    transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block w-4 h-px transition-opacity duration-200"
                  style={{
                    background: "var(--color-ink)",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-4 h-px transition-transform duration-200"
                  style={{
                    background: "var(--color-ink)",
                    transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                  }}
                />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 z-50"
                  style={{
                    border: "1.5px solid var(--color-ink)",
                    background: "var(--color-paper-elevated)",
                    boxShadow: "4px 4px 0 0 var(--color-ink)",
                  }}
                >
                  <span aria-hidden className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 bg-orange-500" />
                  <span aria-hidden className="absolute -top-[3px] -right-[3px] h-1.5 w-1.5 bg-cyan-500" />
                  <span aria-hidden className="absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 bg-cyan-500" />
                  <span aria-hidden className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 bg-orange-500" />

                  <ul className="py-1">
                    {SECTIONS.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => handleClick(e, s.id)}
                          className="flex items-center gap-2.5 px-3.5 py-[7px] font-mono text-[10px] uppercase tracking-[0.14em] transition-colors"
                          style={{
                            color: active === s.id ? "var(--color-orange-500)" : "var(--color-ink)",
                            background: active === s.id
                              ? "color-mix(in srgb, var(--color-orange-500) 8%, transparent)"
                              : "transparent",
                          }}
                        >
                          <span style={{ opacity: 0.4 }}>{String(i + 1).padStart(2, "0")}</span>
                          <span>{s.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mx-3 border-t"
                    style={{ borderColor: "color-mix(in srgb, var(--color-ink) 18%, transparent)" }}
                  />

                  <div className="px-3 py-2">
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors"
                      style={{
                        border: "1px solid var(--color-ink)",
                        background: "var(--color-paper)",
                        color: "var(--color-ink)",
                      }}
                    >
                      <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                      <span style={{ color: theme === "dark" ? "var(--color-cyan-500)" : "var(--color-orange-500)" }}>
                        {theme === "dark" ? <MoonIcon size={12} /> : <SunIcon size={12} />}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile section progress bar */}
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
