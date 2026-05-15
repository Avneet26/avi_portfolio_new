"use client";

import { useEffect, useRef } from "react";

const TRAIL_LEN = 14;
const TRAIL_MIN_DIST_SQ = 36; // ~6px between samples
const TRAIL_DECAY = 0.86;     // per-frame life multiplier
const TRAIL_BASE_SIZE = 6;

export default function Crosshair() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    const trail: Array<{ x: number; y: number; life: number }> = Array.from(
      { length: TRAIL_LEN },
      () => ({ x: target.x, y: target.y, life: 0 })
    );
    let trailHead = 0;
    const lastSample = { x: target.x, y: target.y };

    let interactive = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const t = e.target as Element | null;
      interactive = !!t?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary'
      );
    };

    const onLeave = () => {
      if (rootRef.current) rootRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (rootRef.current) rootRef.current.style.opacity = "1";
    };

    let raf = 0;
    const tick = () => {
      ring.x += (target.x - ring.x) * 0.2;
      ring.y += (target.y - ring.y) * 0.2;

      const ringEl = ringRef.current;
      if (ringEl) {
        const scale = interactive ? 1.6 : 1;
        ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      const dotEl = dotRef.current;
      if (dotEl) {
        dotEl.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      const dx = target.x - lastSample.x;
      const dy = target.y - lastSample.y;
      if (dx * dx + dy * dy > TRAIL_MIN_DIST_SQ) {
        trailHead = (trailHead - 1 + TRAIL_LEN) % TRAIL_LEN;
        const slot = trail[trailHead];
        slot.x = target.x;
        slot.y = target.y;
        slot.life = 1;
        lastSample.x = target.x;
        lastSample.y = target.y;
      }

      for (let i = 0; i < TRAIL_LEN; i++) {
        const p = trail[(trailHead + i) % TRAIL_LEN];
        p.life *= TRAIL_DECAY;
        const el = trailRefs.current[i];
        if (!el) continue;
        if (p.life < 0.02) {
          el.style.opacity = "0";
          continue;
        }
        const size = TRAIL_BASE_SIZE * p.life;
        el.style.opacity = `${p.life * 0.6}`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={rootRef} className="crosshair-root" aria-hidden="true">
      {Array.from({ length: TRAIL_LEN }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="crosshair-trail"
          style={{ opacity: 0 }}
        />
      ))}

      <div ref={dotRef} className="crosshair-dot" />

      <div ref={ringRef} className="crosshair-ring">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <line x1="18" y1="2"  x2="18" y2="9"  stroke="currentColor" strokeWidth="1.25" />
          <line x1="18" y1="27" x2="18" y2="34" stroke="currentColor" strokeWidth="1.25" />
          <line x1="2"  y1="18" x2="9"  y2="18" stroke="currentColor" strokeWidth="1.25" />
          <line x1="27" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>
    </div>
  );
}
