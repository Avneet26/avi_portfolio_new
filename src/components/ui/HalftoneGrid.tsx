type Props = { className?: string; rows?: number; cols?: number };

export default function HalftoneGrid({ className, rows = 5, cols = 5 }: Props) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "8px",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const intensity = (i % cols) / cols;
        return (
          <svg key={i} viewBox="0 0 60 30" preserveAspectRatio="none">
            <g fill="var(--color-ink)">
              {Array.from({ length: 8 }).map((__, k) => (
                <circle
                  key={k}
                  cx={4 + k * 7}
                  cy={15}
                  r={0.6 + intensity * 2.4 + (k % 3) * 0.2}
                />
              ))}
            </g>
          </svg>
        );
      })}
    </div>
  );
}
