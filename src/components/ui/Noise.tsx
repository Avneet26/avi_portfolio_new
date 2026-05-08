"use client";

import { useEffect, useRef } from "react";

interface NoiseProps {
  /** How often to redraw the grain in animation frames. 1 = every frame, 2 = every other, etc. */
  patternRefreshInterval?: number;
  /** 0–255. Higher = grainier. Keep low (10–22) on light surfaces. */
  patternAlpha?: number;
  /** "dark" paints near-black grains (use on paper/cream); "light" paints near-white grains (use on ink). */
  tone?: "dark" | "light";
  /** Extra Tailwind classes for positioning / blend modes / opacity. */
  className?: string;
}

/**
 * Filmic grain overlay rendered on a 1024×1024 canvas, scaled to fill its parent.
 * Parent must be `relative` (or fixed) for the absolute positioning to anchor.
 */
export default function Noise({
  patternRefreshInterval = 2,
  patternAlpha = 16,
  tone = "dark",
  className = "",
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const size = 1024;
    canvas.width = size;
    canvas.height = size;

    let frame = 0;
    let raf = 0;

    const drawGrain = () => {
      const img = ctx.createImageData(size, size);
      const data = img.data;
      // tone "dark" = pixel value ~0–80 (paper grain); "light" = ~175–255 (film white)
      const base = tone === "dark" ? 0 : 175;
      const range = tone === "dark" ? 80 : 80;
      for (let i = 0; i < data.length; i += 4) {
        const v = base + Math.random() * range;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      raf = requestAnimationFrame(loop);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawGrain();
    } else {
      loop();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [patternRefreshInterval, patternAlpha, tone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
