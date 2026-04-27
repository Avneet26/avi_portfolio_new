import clsx from "clsx";

type Field = { label: string; value: string };
type Props = {
  title?: string;
  code?: string;
  fields: Field[];
  className?: string;
  accent?: "cyan" | "orange" | "ink";
};

export default function IDCard({ title = "CORP.", code = "0151", fields, className, accent = "ink" }: Props) {
  const accentColor =
    accent === "cyan" ? "var(--color-cyan-500)" : accent === "orange" ? "var(--color-orange-500)" : "var(--color-ink)";
  return (
    <div className={clsx("id-card grid", className)} style={{ gridTemplateColumns: "1fr auto" }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: "var(--color-ink)" }}>
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-lg leading-none" style={{ color: accentColor }}>
            {title}
          </span>
          <span className="opacity-60">{code}</span>
        </div>
      </div>
      <div className="row-span-2 grid place-items-center px-3 border-l" style={{ borderColor: "var(--color-ink)" }}>
        {/* QR-ish glyph */}
        <svg viewBox="0 0 30 30" width="36" height="36" aria-hidden>
          <g fill="var(--color-ink)">
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => {
                const on = (r * 7 + c * 3 + (r ^ c)) % 3 === 0;
                return on ? <rect key={`${r}-${c}`} x={c * 4 + 1} y={r * 4 + 1} width="3" height="3" /> : null;
              })
            )}
          </g>
        </svg>
      </div>
      <div className="grid grid-cols-2">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="px-3 py-2 border-t"
            style={{
              borderColor: "var(--color-ink)",
              borderRightWidth: i % 2 === 0 ? 1 : 0,
              borderRightStyle: "solid",
              borderRightColor: "var(--color-ink)",
            }}
          >
            <div className="opacity-60 text-[10px]">{f.label}</div>
            <div className="text-ink">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
