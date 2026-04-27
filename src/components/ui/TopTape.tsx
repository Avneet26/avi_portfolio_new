"use client";

const tokens = [
  "VISION (00) UNLOCKED",
  "MODULAR PATTERN",
  "VS_0151 / EXPRESS",
  "MHV-RST",
  "LOC: 35°28′09.2″N",
  "REL.0884105",
  "FRONTEND ENGINEER",
  "AVAILABLE FOR WORK",
];

export default function TopTape() {
  const repeated = [...tokens, ...tokens, ...tokens];
  return (
    <div className="border-b" style={{ borderColor: "var(--color-ink)", background: "var(--color-paper)", willChange: "transform", transform: "translateZ(0)" }}>
      <div className="relative overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap py-2 tape animate-marquee">
          {repeated.map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rotate-45" style={{ background: i % 3 === 0 ? "var(--color-orange-500)" : "var(--color-cyan-500)" }} />
              {t}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-33.333%,0,0); }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
