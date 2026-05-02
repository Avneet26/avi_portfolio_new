import BlockHeading from "@/components/ui/BlockHeading";
import HalftoneGrid from "@/components/ui/HalftoneGrid";
import { freelance } from "@/lib/profile";

export default function FreelanceJourney() {
  return (
    <section id="freelance" className="relative border-b overflow-hidden" style={{ borderColor: "var(--color-ink)" }} aria-label="Freelance journey">
      <div className="absolute -right-10 top-10 w-[40rem] max-w-[55vw] opacity-30 pointer-events-none" aria-hidden>
        <HalftoneGrid rows={6} cols={6} className="w-full" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="font-mono text-xs uppercase tracking-[0.25em] mb-6 opacity-70">04 / Independent — Tabloid</div>

        <div className="flex items-end gap-4 flex-wrap">
          <BlockHeading as="h2" size="xl">FREELANCE</BlockHeading>
          <span className="font-display text-7xl text-orange-500 leading-none">J</span>
          <span className="font-mono text-xs uppercase tracking-widest opacity-70 ml-auto">DESIGNED · TO PASS · THE EXTREMES</span>
        </div>
        <BlockHeading as="h3" size="md" outline className="mt-2">
          Journey / 2021 — Now
        </BlockHeading>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ol className="border-2 border-ink divide-y-2 divide-[var(--color-ink)]">
              {freelance.map((f, i) => (
                <li key={i} className="grid grid-cols-12 items-center gap-3 px-5 py-4 hover:bg-orange-100/40 transition-colors">
                  <span className="col-span-1 font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-2 font-mono text-xs uppercase tracking-widest">{f.year}</span>
                  <span className="col-span-4 font-display text-2xl uppercase leading-none">{f.client}</span>
                  <span className="col-span-3 font-mono text-xs uppercase tracking-widest text-cyan-500">{f.scope}</span>
                  <span className="col-span-2 text-ink-soft text-xs hidden md:block">{f.note}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5 lg:pl-6 space-y-4">
            <div className="border-2 border-ink p-6">
              <div className="font-mono text-[11px] uppercase tracking-widest opacity-70">// Stats</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { k: "Clients", v: "5+" },
                  { k: "Sectors", v: "03" },
                  { k: "Continents", v: "02" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-3xl">{s.v}</div>
                    <div className="text-[10px] uppercase opacity-60 mt-1">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping label */}
            <div className="border-2 border-ink p-4 bg-orange-500 relative">
              <div className="font-mono text-[10px] uppercase tracking-widest">SHIPPING / 137°45′41.4″E · 35°28′09.2″N</div>
              <div className="font-display text-2xl mt-1 leading-none">MONOCHROME</div>
              <div className="mt-3 flex items-center gap-3">
                <svg viewBox="0 0 100 30" className="h-7 w-32" aria-hidden>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <rect key={i} x={i * 2.4} y={0} width={(i % 4) + 0.6} height={30} fill="var(--color-ink)" />
                  ))}
                </svg>
                <span className="font-mono text-[10px]">[BACK] [TRACK] [REF]</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
