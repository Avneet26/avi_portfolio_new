import BlockHeading from "@/components/ui/BlockHeading";
import { experience } from "@/lib/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative border-b bg-paper-elev" style={{ borderColor: "var(--color-ink)" }} aria-label="Experience">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] mb-3 opacity-70">03 / Career Log</div>
            <BlockHeading as="h2" size="lg">Experience<span className="text-cyan-500">.</span></BlockHeading>
          </div>
          <div className="font-mono text-xs uppercase opacity-70">{experience.length} roles · 2020 → present</div>
        </div>

        <ol className="relative grid gap-4">
          {experience.map((e, i) => (
            <li
              key={e.company}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 border-2 border-ink p-5 lg:p-7 bg-paper hover:bg-cyan-100/30 transition-colors"
            >
              <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest">
                <div className="opacity-60">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="mt-1">{e.period}</div>
                <div className="mt-1 opacity-70">{e.location}</div>
              </div>
              <div className="md:col-span-6">
                <div className="font-display text-3xl lg:text-4xl uppercase leading-none">{e.role}</div>
                <div className="font-mono text-sm uppercase tracking-widest mt-2 text-orange-500">@ {e.company}</div>
                <ul className="mt-4 space-y-2 text-ink-soft text-sm leading-[1.7]">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="pl-5 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rotate-45 bg-cyan-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3 flex flex-wrap content-start gap-2">
                {e.stack.map((s) => (
                  <span key={s} className="px-2 py-1 border border-rule font-mono text-[11px] uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
