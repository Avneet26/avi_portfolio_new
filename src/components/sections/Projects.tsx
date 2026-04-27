"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlockHeading from "@/components/ui/BlockHeading";
import { projects } from "@/lib/profile";

export default function Projects() {
  return (
    <section id="projects" className="relative border-b bg-paper-elev" style={{ borderColor: "var(--color-ink)" }} aria-label="Projects">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] mb-3 opacity-70">05 / Selected Builds</div>
            <BlockHeading as="h2" size="lg">Projects<span className="text-orange-500">/</span>Personal</BlockHeading>
          </div>
          <a href="#contact" className="btn-ghost">All Builds →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.code}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative border-2 border-ink bg-paper overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 to-transparent" aria-hidden />
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-paper px-2 py-1 border border-ink">
                  {p.code}
                </div>
                <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest bg-orange-500 px-2 py-1 border border-ink">
                  Case study →
                </div>
              </div>
              <div className="p-5 border-t-2 border-ink">
                <div className="font-display text-3xl uppercase leading-none">{p.title}</div>
                <p className="mt-2 text-ink-soft text-sm leading-[1.7]">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-1 border border-rule font-mono text-[11px] uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
