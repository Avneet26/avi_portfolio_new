import BlockHeading from "@/components/ui/BlockHeading";

export default function Blogs() {
  return (
    <section id="blogs" className="relative border-b overflow-hidden" style={{ borderColor: "var(--color-ink)" }} aria-label="Blogs and knowledge sharing — coming soon">
      <div className="scanlines absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="font-mono text-xs uppercase tracking-[0.25em] mb-6 opacity-70">07 / Knowledge Sharing</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <BlockHeading as="h2" size="xl">Blogs</BlockHeading>
            <BlockHeading as="h3" size="lg" outline className="-mt-2 lg:-mt-4">Coming<span className="text-orange-500"> · </span>Soon</BlockHeading>
            <p className="mt-6 max-w-xl text-ink-soft leading-[1.7]">
              Knowledge sharing module is initializing. Long-form posts on frontend craft, motion, performance and DX shipping shortly.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="inline-block h-2 w-2 rotate-45 bg-orange-500 animate-pulse" />
              status: building · ETA TBD
            </div>
          </div>
          <aside className="lg:col-span-4 border-2 border-ink p-6 bg-paper-elev">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-70">// Topics queued</div>
            <ul className="mt-3 space-y-2 font-mono text-xs uppercase tracking-widest">
              {["// Building blocky type systems", "// Motion budgeting on the web", "// Edge rendering in Next.js", "// Design + engineering bridges"].map((t) => (
                <li key={t} className="flex items-center gap-3 opacity-80">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-cyan-500" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
