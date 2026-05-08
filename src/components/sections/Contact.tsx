"use client";

import { useState } from "react";
import BlockHeading from "@/components/ui/BlockHeading";
import { profile, openToWork } from "@/lib/profile";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data && typeof data.error === "string" && data.error) ||
          "Couldn't send right now. Try again or email me directly.";
        setStatus({ kind: "error", message });
        return;
      }

      setStatus({ kind: "sent" });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Try again or email me directly.",
      });
    }
  }

  return (
    <section
      id="contact"
      className="relative border-b bg-paper-elev"
      style={{ borderColor: "var(--color-ink)" }}
      aria-label="Contact"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Header — match Experience / Freelance / Projects / Blogs */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.18em] mb-3 text-ink-soft font-semibold">
              08 / Transmission
            </div>
            <BlockHeading as="h2" size="lg">
              Contact<span className="text-orange-500">.</span>
            </BlockHeading>
            <div className="mt-3 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft">
              Open channel · Let&rsquo;s build something
            </div>
          </div>
          {openToWork && (
            <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink">
              <span className="inline-flex items-center gap-2">
                <span className="relative inline-flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full"
                    style={{ background: "#3ecf8e", opacity: 0.6 }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: "#3ecf8e" }}
                  />
                </span>
                Status · Available
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left — context */}
          <div className="lg:col-span-5">
            <p className="text-ink-soft text-[15.5px] leading-[1.65] max-w-md">
              {openToWork ? (
                <>Send a transmission. Available for{" "}
                <span className="text-ink font-semibold">senior frontend engineering roles</span>,{" "}
                advisory, and select freelance builds. I read every message.</>
              ) : (
                <>Send a transmission. Always open to interesting conversations — advisory, freelance builds, or just a good chat. I read every message.</>
              )}
            </p>

            <ul className="mt-6 space-y-3 font-mono text-[13px] uppercase tracking-[0.08em]">
              <li className="flex items-start gap-3">
                <span className="text-ink-soft font-semibold w-16 shrink-0">EMAIL</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-ink hover:text-orange-500 break-all"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ink-soft font-semibold w-16 shrink-0">LOC</span>
                <span className="text-ink">{profile.location}</span>
              </li>
              {openToWork && (
                <li className="flex items-start gap-3">
                  <span className="text-ink-soft font-semibold w-16 shrink-0">STATUS</span>
                  <span className="text-orange-500 font-semibold">Open to opportunities</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <span className="text-ink-soft font-semibold w-16 shrink-0">REPLY</span>
                <span className="text-ink">Within 1–2 days</span>
              </li>
            </ul>

            {/* Decorative coordinate strip */}
            <div className="mt-8 border-t border-ink/30 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span className="text-orange-500 font-semibold">▲</span> CHANNEL · OPEN ·{" "}
              <span className="opacity-70">28.61°N / 77.20°E</span>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 border-2 border-ink p-5 lg:p-7 bg-paper space-y-5 relative"
            style={{ boxShadow: "4px 4px 0 0 var(--color-ink)" }}
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            />

            <Field label="Name" name="name" placeholder="Your full name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            <Field label="Message" name="message" textarea placeholder="What are you working on? What do you need?" />

            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] min-w-0">
                {status.kind === "idle" && (
                  <span className="text-ink-soft">// awaiting input</span>
                )}
                {status.kind === "sending" && (
                  <span className="text-ink">// transmitting…</span>
                )}
                {status.kind === "sent" && (
                  <span className="text-orange-500 font-semibold">
                    // signal received — i&rsquo;ll be in touch
                  </span>
                )}
                {status.kind === "error" && (
                  <span className="text-ink font-semibold" role="alert">
                    <span className="text-orange-500">// error · </span>
                    {status.message}
                  </span>
                )}
              </span>
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="btn-block disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: "0.7rem 1.1rem", fontSize: "14px" }}
              >
                {status.kind === "sending" ? "Sending…" : "Send →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft font-semibold">
        // {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={5}
          placeholder={placeholder}
          className="mt-2 w-full bg-paper-elev border-2 border-ink px-4 py-3 font-body text-[14.5px] leading-[1.5] placeholder:text-ink-soft/50 placeholder:font-mono placeholder:text-[13px] focus:outline-none focus:border-orange-500"
        />
      ) : (
        <input
          name={name}
          required
          type={type}
          placeholder={placeholder}
          className="mt-2 w-full bg-paper-elev border-2 border-ink px-4 py-3 font-body text-[14.5px] placeholder:text-ink-soft/50 placeholder:font-mono placeholder:text-[13px] focus:outline-none focus:border-orange-500"
        />
      )}
    </label>
  );
}
