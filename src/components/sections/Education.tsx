import BlockHeading from "@/components/ui/BlockHeading";
import { education } from "@/lib/profile";

export default function Education() {
  return (
    <section id="education" className="relative border-b" style={{ borderColor: "var(--color-ink)" }} aria-label="Education">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] mb-3 opacity-70">06 / Training Module</div>
            <BlockHeading as="h2" size="lg">Education<span className="text-cyan-500">.</span></BlockHeading>
          </div>
          <span className="font-mono text-xs uppercase opacity-70">Cert · Institute · Year</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((e, i) => (
            <article key={i} className="border-2 border-ink p-6 bg-paper-elev hover:bg-cyan-100/40 transition-colors">
              <div className="font-mono text-xs uppercase tracking-widest opacity-60">[{String(i + 1).padStart(2, "0")}] {e.period}</div>
              <div className="mt-3 font-display text-3xl uppercase leading-none">{e.school}</div>
              <div className="mt-2 font-mono text-sm uppercase tracking-widest text-orange-500">{e.degree}</div>
              <p className="mt-4 text-ink-soft text-sm leading-[1.7]">{e.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
