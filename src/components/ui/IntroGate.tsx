"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Stage = "boot" | "opening" | "done";

const BOOT_MS = 460;
const OPEN_MS = 720;
const SAFETY_MS = 240;
const REDUCED_MS = 240;

export default function IntroGate() {
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("boot");
  const leftGateRef = useRef<HTMLDivElement | null>(null);
  const previousOverflowRef = useRef<string | null>(null);

  // Skip splash entirely on standalone routes (e.g. /resume) where the
  // visitor likely arrived for a single document and not the homepage.
  const skip = pathname?.startsWith("/resume") ?? false;

  // Stage 1 — schedule the gate-open from "boot"
  useEffect(() => {
    if (skip) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tOpen = window.setTimeout(
      () => setStage("opening"),
      reduced ? 60 : BOOT_MS
    );

    return () => {
      window.clearTimeout(tOpen);
    };
  }, [skip]);

  // Lock scrolling while splash is visible, and always restore previous style.
  useEffect(() => {
    if (skip) return;
    if (previousOverflowRef.current === null) {
      previousOverflowRef.current = document.body.style.overflow;
    }

    if (stage === "done") {
      document.body.style.overflow = previousOverflowRef.current;
      return;
    }

    document.body.style.overflow = "hidden";
  }, [stage, skip]);

  useEffect(() => {
    return () => {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
      }
    };
  }, []);

  // Stage 2 — unmount when the slide actually finishes (transitionend),
  // with a generous safety timer so we never unmount mid-animation.
  useEffect(() => {
    if (skip) return;
    if (stage !== "opening") return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const node = leftGateRef.current;
    const finish = () => setStage("done");

    const onEnd = (e: TransitionEvent) => {
      if (e.target === node && e.propertyName === "transform") finish();
    };
    node?.addEventListener("transitionend", onEnd);

    const fallback = window.setTimeout(
      finish,
      reduced ? REDUCED_MS : OPEN_MS + SAFETY_MS
    );

    return () => {
      window.clearTimeout(fallback);
      node?.removeEventListener("transitionend", onEnd);
    };
  }, [stage, skip]);

  if (skip || stage === "done") return null;

  return (
    <div className="intro-gate" data-stage={stage} aria-hidden="true">
      <div className="gate gate-left" ref={leftGateRef}>
        <span className="stencil">01</span>
        <div className="seam-h" style={{ top: "30%" }} />
        <div className="seam-h" style={{ top: "62%" }} />
        <div className="vents vents-left" />
        <Rivets edge="right" />
        <span className="edge-tag tag-top">DOCK · A</span>
        <span className="edge-tag tag-bot">SEAL · ACTIVE</span>
        <span className="corner-tick tick-tl" />
        <span className="corner-tick tick-bl" />
      </div>

      <div className="gate gate-right">
        <span className="stencil stencil-right">02</span>
        <div className="seam-h" style={{ top: "30%" }} />
        <div className="seam-h" style={{ top: "62%" }} />
        <div className="vents vents-right" />
        <Rivets edge="left" />
        <span className="edge-tag tag-top tag-right">DOCK · B</span>
        <span className="edge-tag tag-bot tag-right">CLEARANCE · OK</span>
        <span className="corner-tick tick-tr" />
        <span className="corner-tick tick-br" />
      </div>

      <div className="seam" aria-hidden="true">
        <div className="seam-beam" />
      </div>

      <div className="hud">
        <div className="hud-tag">
          <span className="diamond" />
          <span>OPERATOR FILE · BOOT</span>
          <span className="diamond diamond-cyan" />
        </div>
        <div className="hud-id">
          ASV<span className="hud-dot">·</span>26
        </div>
        <div className="hud-bar" aria-hidden>
          <div className="hud-bar-fill" />
          <span className="hud-bar-ticks" />
        </div>
        <div className="hud-foot">
          <span>28.61°N / 77.20°E</span>
          <span className="hud-sep">/</span>
          <span className="hud-status">DOCK · CLEAR</span>
        </div>
      </div>

      <style jsx>{`
        .intro-gate {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: auto;
          overflow: hidden;
          /* Hard-disable cursor here so it doesn't override before app boots */
          cursor: default;
        }

        /* ─── Gate panels (steel plates) ─────────────────────────────── */
        .gate {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          overflow: hidden;
          will-change: transform;
          transition: transform 720ms cubic-bezier(0.78, 0, 0.16, 1);
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.05) 0%,
              transparent 18%,
              transparent 82%,
              rgba(0, 0, 0, 0.45) 100%
            ),
            repeating-linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.025) 0 2px,
              transparent 2px 3px
            ),
            linear-gradient(135deg, #0b121a 0%, #18222e 35%, #0e1620 65%, #050810 100%);
          box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.55);
        }
        .gate-left {
          left: 0;
          transform: translateX(0);
        }
        .gate-right {
          right: 0;
          transform: translateX(0);
        }
        .intro-gate[data-stage="opening"] .gate-left {
          transform: translateX(-100%);
        }
        .intro-gate[data-stage="opening"] .gate-right {
          transform: translateX(100%);
        }

        /* Inner-edge bevel + light leak (the side that meets the seam) */
        .gate-left::after,
        .gate-right::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 26px;
          pointer-events: none;
        }
        .gate-left::after {
          right: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(88, 174, 195, 0.05) 60%,
            rgba(255, 138, 71, 0.05)
          );
          box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.06);
        }
        .gate-right::after {
          left: 0;
          background: linear-gradient(
            -90deg,
            transparent,
            rgba(88, 174, 195, 0.05) 60%,
            rgba(255, 138, 71, 0.05)
          );
          box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.06);
        }

        /* Horizontal armor seams */
        .seam-h {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.55);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.035);
          pointer-events: none;
        }

        /* Stencil digit */
        .stencil {
          position: absolute;
          top: 14%;
          left: 8%;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(8rem, 19vw, 18rem);
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.045);
          letter-spacing: -0.06em;
          font-variation-settings: "wdth" 72;
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
        }
        .stencil-right {
          left: auto;
          right: 8%;
          color: rgba(255, 138, 71, 0.04);
          -webkit-text-stroke: 2px rgba(255, 138, 71, 0.06);
        }

        /* Vents */
        .vents {
          position: absolute;
          bottom: 8%;
          width: 140px;
          height: 78px;
          background: repeating-linear-gradient(
            -45deg,
            transparent 0 6px,
            rgba(88, 174, 195, 0.18) 6px 8px,
            transparent 8px 14px
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.6);
        }
        .vents-left {
          right: 6%;
        }
        .vents-right {
          left: 6%;
          background: repeating-linear-gradient(
            45deg,
            transparent 0 6px,
            rgba(255, 138, 71, 0.18) 6px 8px,
            transparent 8px 14px
          );
        }

        /* Corner ticks (match site's existing language) */
        .corner-tick {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 0 solid var(--color-cyan-500);
          pointer-events: none;
          opacity: 0.7;
        }
        .tick-tl {
          top: 18px;
          left: 18px;
          border-top-width: 2px;
          border-left-width: 2px;
        }
        .tick-bl {
          bottom: 18px;
          left: 18px;
          border-bottom-width: 2px;
          border-left-width: 2px;
        }
        .tick-tr {
          top: 18px;
          right: 18px;
          border-top-width: 2px;
          border-right-width: 2px;
          border-color: var(--color-orange-500);
        }
        .tick-br {
          bottom: 18px;
          right: 18px;
          border-bottom-width: 2px;
          border-right-width: 2px;
          border-color: var(--color-orange-500);
        }

        /* Edge tags */
        .edge-tag {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(223, 217, 204, 0.45);
          pointer-events: none;
          white-space: nowrap;
        }
        .tag-top {
          top: 18px;
          left: 40px;
        }
        .tag-bot {
          bottom: 22px;
          left: 40px;
        }
        .tag-right {
          left: auto;
          right: 40px;
          text-align: right;
        }

        /* ─── Center seam (only visible while gates are closed) ─────── */
        .seam {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 3px;
          transform: translateX(-50%);
          background: linear-gradient(
            180deg,
            var(--color-orange-500) 0%,
            rgba(255, 138, 71, 0.6) 6%,
            rgba(14, 22, 32, 0) 18%,
            rgba(14, 22, 32, 0) 82%,
            rgba(88, 174, 195, 0.6) 94%,
            var(--color-cyan-500) 100%
          );
          box-shadow:
            0 0 14px rgba(255, 138, 71, 0.45),
            0 0 24px rgba(88, 174, 195, 0.35);
          transition: opacity 260ms ease;
          opacity: 1;
        }
        .seam-beam {
          position: absolute;
          left: -4px;
          right: -4px;
          height: 64px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(255, 255, 255, 0.78),
            transparent
          );
          filter: blur(2px);
          animation: seam-scan 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .intro-gate[data-stage="opening"] .seam {
          opacity: 0;
        }

        @keyframes seam-scan {
          0% {
            top: -12%;
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        /* ─── HUD console ─────────────────────────────────────────── */
        .hud {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: min(360px, 78vw);
          text-align: center;
          color: rgba(223, 217, 204, 0.95);
          font-family: var(--font-mono);
          transition:
            opacity 240ms ease,
            transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }
        .intro-gate[data-stage="opening"] .hud {
          opacity: 0;
          transform: translate(-50%, -54%);
        }

        .hud-tag {
          font-size: 10.5px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(223, 217, 204, 0.62);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .diamond {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--color-orange-500);
          transform: rotate(45deg);
          box-shadow: 0 0 10px var(--color-orange-500);
          animation: pulse 1.2s ease-in-out infinite;
        }
        .diamond-cyan {
          background: var(--color-cyan-500);
          box-shadow: 0 0 10px var(--color-cyan-500);
          animation-delay: 0.4s;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .hud-id {
          font-family: var(--font-display);
          font-weight: 900;
          font-variation-settings: "wdth" 72;
          font-size: clamp(2.6rem, 7.4vw, 4.2rem);
          letter-spacing: -0.025em;
          text-transform: uppercase;
          line-height: 0.95;
          color: #dfd9cc;
          text-shadow:
            0 0 26px rgba(88, 174, 195, 0.38),
            0 0 6px rgba(0, 0, 0, 0.6);
        }
        .hud-dot {
          color: var(--color-orange-500);
          padding: 0 0.18em;
        }

        .hud-bar {
          margin: 22px auto 14px;
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: relative;
          overflow: hidden;
        }
        .hud-bar-fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: linear-gradient(
            90deg,
            var(--color-cyan-500),
            var(--color-orange-500)
          );
          box-shadow: 0 0 12px rgba(255, 138, 71, 0.5);
          animation: hud-fill 440ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes hud-fill {
          to {
            width: 100%;
          }
        }
        .hud-bar-ticks {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.5) 0 1px,
            transparent 1px 32px
          );
          opacity: 0.55;
          pointer-events: none;
        }

        .hud-foot {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(223, 217, 204, 0.5);
        }
        .hud-sep {
          color: rgba(223, 217, 204, 0.25);
        }
        .hud-status {
          color: var(--color-orange-500);
          font-weight: 600;
          letter-spacing: 0.2em;
          animation: status-blink 1.1s steps(2, end) infinite;
        }
        @keyframes status-blink {
          0%,
          60% {
            opacity: 1;
          }
          70%,
          100% {
            opacity: 0.55;
          }
        }

        /* ─── Reduced motion fallback ─────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .gate,
          .seam,
          .hud {
            transition: opacity 180ms ease !important;
          }
          .intro-gate[data-stage="opening"] .gate,
          .intro-gate[data-stage="opening"] .seam,
          .intro-gate[data-stage="opening"] .hud {
            opacity: 0;
            transform: none !important;
          }
          .seam-beam,
          .hud-bar-fill,
          .diamond,
          .hud-status {
            animation: none !important;
          }
          .hud-bar-fill {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function Rivets({ edge }: { edge: "left" | "right" }) {
  const positions = [10, 28, 46, 54, 72, 90];
  return (
    <>
      {positions.map((top) => (
        <span
          key={top}
          className="rivet"
          style={{
            position: "absolute",
            top: `${top}%`,
            [edge]: "10px",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), rgba(0,0,0,0.6) 70%)",
            boxShadow:
              "inset 0 -1px 0 rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
