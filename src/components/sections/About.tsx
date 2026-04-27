import BlockHeading from "@/components/ui/BlockHeading";
import { lorem, profile } from "@/lib/profile";

export default function About() {
  return (
    <section id="about" className="relative border-b" style={{ borderColor: "var(--color-ink)" }} aria-label="About me">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="font-mono text-xs uppercase tracking-[0.25em] mb-6 opacity-70">
          02 / About — Operator Profile
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <BlockHeading as="h2" size="lg">
              About<span className="text-orange-500">_</span>me
            </BlockHeading>
            <BlockHeading as="h3" size="md" outline className="mt-2">
              Operator / 0151
            </BlockHeading>

            <p className="mt-8 max-w-xl text-ink-soft leading-[1.75]">
              {lorem.long}
            </p>
            <p className="mt-5 max-w-xl text-ink-soft leading-[1.75]">
              {lorem.medium}
            </p>
          </div>

          <aside className="lg:col-span-5 lg:pl-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Years", v: profile.yearsExperience },
                { k: "Role", v: "Sr. FE" },
                { k: "Stack", v: "React/Next" },
                { k: "Mode", v: "Remote" },
                { k: "Type", v: "FT + Freelance" },
                { k: "Coffee/day", v: "3.0" },
              ].map((s) => (
                <div key={s.k} className="border id-card p-4 hover:bg-cyan-100/40 transition-colors">
                  <div className="text-[10px] opacity-60">{s.k.toUpperCase()}</div>
                  <div className="mt-1 font-display text-2xl text-ink">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--color-ink)" }}>
              <div className="font-mono text-[11px] uppercase tracking-widest opacity-70">// Currently exploring</div>
              <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
                {["Three.js", "WebGPU", "Motion Design", "DX Tooling"].map((t) => (
                  <span key={t} className="px-2 py-1 border border-rule">{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
