import { profile } from "@/lib/profile";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="font-display text-5xl uppercase leading-none">{profile.name}</div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest opacity-70">// {profile.role} · {profile.company}</div>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-3">// Index</div>
            <ul className="space-y-2 font-mono text-xs uppercase tracking-widest">
              <li><a className="hover:text-orange-500" href="#about">About</a></li>
              <li><a className="hover:text-orange-500" href="#experience">Experience</a></li>
              <li><a className="hover:text-orange-500" href="#projects">Projects</a></li>
              <li><a className="hover:text-orange-500" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-3">// Channels</div>
            <SocialLinks className="mb-4" color="paper" />
            <ul className="space-y-2 font-mono text-xs uppercase tracking-widest">
              <li><a className="opacity-70 hover:opacity-100 hover:text-orange-500" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-paper/20 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            © {new Date().getFullYear()} {profile.shortName}. Built with Next.js · Designed in the open.
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            VS_0151 / EOF
          </span>
        </div>
      </div>
    </footer>
  );
}
