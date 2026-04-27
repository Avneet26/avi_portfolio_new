type Props = { className?: string; stroke?: string };

export default function WireframeGlobe({
  className,
  stroke = "var(--color-cyan-500)",
}: Props) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      <g fill="none" stroke={stroke} strokeWidth="0.7" opacity="0.9">
        <circle cx="120" cy="120" r="110" />
        {Array.from({ length: 9 }).map((_, i) => {
          const r = 12 + i * 11;
          return <ellipse key={`h${i}`} cx="120" cy="120" rx="110" ry={r} />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const rx = 12 + i * 9;
          return <ellipse key={`v${i}`} cx="120" cy="120" rx={rx} ry="110" />;
        })}
        <line x1="10" y1="120" x2="230" y2="120" />
        <line x1="120" y1="10" x2="120" y2="230" />
      </g>
    </svg>
  );
}
