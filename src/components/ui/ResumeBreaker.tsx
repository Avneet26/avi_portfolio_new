"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "orange" | "cyan";

type Props = {
  /** Slot number shown on the strip — keeps numbering coherent with section index. */
  code?: string;
  /** Headline mono label — left side. */
  label?: string;
  /** Hook sentence — the human pitch. */
  headline?: string;
  /** Sub copy underneath the headline. */
  sub?: string;
  /** Visual variant — different breakers in different positions feel intentional. */
  variant?: Variant;
};

export default function ResumeBreaker({
  code = "REQ-01",
  label = "// Recruiter brief",
  headline = "Hiring? Grab the full resume.",
  sub = "Single page · A4 · Updated for 2026.",
  variant = "orange",
}: Props) {
  const accent =
    variant === "orange" ? "var(--color-orange-500)" : "var(--color-cyan-500)";
  const baseBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "11.5px",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    fontWeight: 700,
    border: "1.5px solid var(--color-ink)",
    color: "var(--color-ink)",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    cursor: "pointer",
  };

  return (
    <aside
      aria-label="Download resume"
      className="resume-breaker"
      style={{ ["--rbk-accent" as string]: accent }}
    >
      {/* Top mono ledger */}
      <div className="rbk-ledger" aria-hidden>
        <span className="rbk-ledger-num">{code}</span>
        <span className="rbk-ledger-divider" />
        <span className="rbk-ledger-strip" />
        <span className="rbk-ledger-meta">A4 · PDF · 1 PAGE</span>
      </div>

      <div className="rbk-grid">
        {/* LEFT — copy */}
        <div className="rbk-copy">
          <div className="rbk-label">
            <span className="rbk-diamond" />
            {label}
          </div>
          <h3 className="rbk-headline">{headline}</h3>
          <p className="rbk-sub">{sub}</p>
        </div>

        {/* RIGHT — file card + CTAs */}
        <div className="rbk-actions">
          <FileCard variant={variant} />
          <div className="rbk-buttons">
            <Link
              href="/resume"
              className="rbk-btn rbk-btn-ghost"
              style={{
                ...baseBtnStyle,
                background: "var(--color-paper)",
                boxShadow: "2px 2px 0 0 var(--color-ink)",
              }}
            >
              View Resume <span aria-hidden>→</span>
            </Link>
            <Link
              href="/resume"
              className="rbk-btn rbk-btn-primary"
              style={{
                ...baseBtnStyle,
                background: "var(--rbk-accent)",
                boxShadow: "3px 3px 0 0 var(--color-ink)",
              }}
            >
              <DownloadGlyph /> Download · PDF
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .resume-breaker {
          position: relative;
          margin: 0 auto;
          padding: 22px 22px 24px;
          max-width: 1180px;
          border: 2px solid var(--color-ink);
          background:
            repeating-linear-gradient(
              -45deg,
              transparent 0 8px,
              color-mix(in srgb, var(--rbk-accent) 4%, transparent) 8px 9px
            ),
            var(--color-paper-elevated);
          box-shadow: 6px 6px 0 0 var(--color-ink);
        }
        .resume-breaker::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          height: 5px;
          background: repeating-linear-gradient(
            90deg,
            var(--color-ink) 0 18px,
            transparent 18px 26px
          );
          opacity: 0.4;
          pointer-events: none;
        }
        .resume-breaker::after {
          content: "";
          position: absolute;
          inset: 6px;
          border: 1px dashed color-mix(in srgb, var(--color-ink) 18%, transparent);
          pointer-events: none;
        }

        .rbk-ledger {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-soft);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .rbk-ledger-num {
          color: var(--color-ink);
          border: 1.5px solid var(--color-ink);
          padding: 2px 6px;
          background: var(--color-paper);
          letter-spacing: 0.18em;
        }
        .rbk-ledger-divider {
          width: 12px;
          height: 1.5px;
          background: var(--color-ink);
          opacity: 0.5;
        }
        .rbk-ledger-strip {
          flex: 1;
          height: 3px;
          background: repeating-linear-gradient(
            90deg,
            var(--rbk-accent) 0 4px,
            transparent 4px 9px
          );
          opacity: 0.55;
        }
        .rbk-ledger-meta {
          color: var(--color-ink);
        }

        .rbk-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: center;
        }

        .rbk-copy { min-width: 0; }
        .rbk-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-ink-soft);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .rbk-diamond {
          width: 6px;
          height: 6px;
          background: var(--rbk-accent);
          transform: rotate(45deg);
          display: inline-block;
        }
        .rbk-headline {
          font-family: var(--font-display);
          font-weight: 900;
          font-variation-settings: "wdth" 72;
          text-transform: uppercase;
          letter-spacing: -0.015em;
          font-size: clamp(1.6rem, 3.4vw, 2.4rem);
          line-height: 0.95;
          color: var(--color-ink);
          margin: 0;
        }
        .rbk-sub {
          margin: 8px 0 0;
          color: var(--color-ink-soft);
          font-size: 14px;
          line-height: 1.5;
          max-width: 48ch;
        }

        .rbk-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          justify-content: flex-end;
        }
        .rbk-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: stretch;
        }
        .rbk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          border: 1.5px solid var(--color-ink);
          color: var(--color-ink);
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition:
            transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
            background 140ms ease;
        }
        .rbk-btn-ghost {
          background: var(--color-paper);
          color: var(--color-ink);
          box-shadow: 2px 2px 0 0 var(--color-ink);
        }
        .rbk-btn-ghost:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 0 var(--color-ink);
          background: var(--color-cyan-100);
        }
        .rbk-btn-primary {
          background: var(--rbk-accent);
          box-shadow: 3px 3px 0 0 var(--color-ink);
        }
        .rbk-btn-primary:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 0 var(--color-ink);
        }
        .rbk-btn-primary:active,
        .rbk-btn-ghost:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 0 var(--color-ink);
        }

        @media (max-width: 880px) {
          .rbk-grid { grid-template-columns: 1fr; gap: 18px; }
          .rbk-actions {
            justify-content: flex-start;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
          }
          .rbk-buttons { width: 100%; }
        }
      `}</style>
    </aside>
  );
}

function FileCard({ variant }: { variant: Variant }) {
  const accent =
    variant === "orange" ? "var(--color-orange-500)" : "var(--color-cyan-500)";

  return (
    <motion.div
      className="rbk-file"
      initial={{ rotate: -3, y: 6, opacity: 0 }}
      whileInView={{ rotate: -3, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      whileHover={{ rotate: 0, y: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="rbk-file-tab">RESUME · ASV-26</div>
      <div className="rbk-file-body">
        <div className="rbk-file-row long" />
        <div className="rbk-file-row med" />
        <div className="rbk-file-row long" />
        <div className="rbk-file-row short" />
        <div className="rbk-file-row med" />
        <div className="rbk-file-stamp">
          <span className="rbk-file-stamp-glyph" aria-hidden>
            ●
          </span>
          A4 / PDF
        </div>
      </div>

      <style jsx>{`
        .rbk-file {
          position: relative;
          width: 140px;
          flex-shrink: 0;
          border: 1.5px solid var(--color-ink);
          background: #fff;
          padding: 28px 12px 14px;
          box-shadow: 4px 4px 0 0 var(--color-ink);
          transform-origin: bottom right;
        }
        .rbk-file-tab {
          position: absolute;
          top: -14px;
          left: 8px;
          padding: 3px 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          border: 1.5px solid var(--color-ink);
          background: ${accent};
          color: var(--color-ink);
        }
        .rbk-file-body { display: flex; flex-direction: column; gap: 6px; }
        .rbk-file-row {
          height: 4px;
          background: color-mix(in srgb, var(--color-ink) 14%, transparent);
        }
        .rbk-file-row.long { width: 100%; }
        .rbk-file-row.med { width: 75%; }
        .rbk-file-row.short { width: 45%; }
        .rbk-file-stamp {
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${accent};
          font-weight: 700;
          border: 1px dashed color-mix(in srgb, ${accent} 60%, transparent);
          padding: 4px 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
        }
        .rbk-file-stamp-glyph { font-size: 8px; line-height: 1; }

        @media (max-width: 880px) {
          .rbk-file { width: 120px; align-self: flex-start; }
        }
      `}</style>
    </motion.div>
  );
}

function DownloadGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M12 4v12" />
      <path d="M6 11l6 6 6-6" />
      <path d="M5 20h14" />
    </svg>
  );
}
