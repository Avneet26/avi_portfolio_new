"use client";

import { useState } from "react";
import BlockHeading from "@/components/ui/BlockHeading";
import { profile } from "@/lib/profile";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    // UI-only: log payload, simulate latency, show confirmation.
    console.log("[contact-form] submit", data);
    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  }

  return (
    <section id="contact" className="relative border-b bg-paper-elev" style={{ borderColor: "var(--color-ink)" }} aria-label="Contact">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="font-mono text-xs uppercase tracking-[0.25em] mb-6 opacity-70">08 / Transmission</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <BlockHeading as="h2" size="xl">Contact</BlockHeading>
            <BlockHeading as="h3" size="md" outline className="mt-2">Open<span className="text-orange-500"> · </span>Channel</BlockHeading>
            <p className="mt-6 text-ink-soft leading-[1.7] max-w-md">
              Send a transmission. Available for senior frontend engineering roles, advisory, and select freelance builds.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs uppercase tracking-widest">
              <li className="flex items-center gap-3"><span className="opacity-60">EMAIL</span> {profile.email}</li>
              <li className="flex items-center gap-3"><span className="opacity-60">LOC</span> {profile.location}</li>
              <li className="flex items-center gap-3"><span className="opacity-60">STATUS</span> <span className="text-orange-500">Available</span></li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 border-2 border-ink p-6 lg:p-8 bg-paper space-y-5"
          >
            <Field label="Name" name="name" placeholder="OPERATOR / FULL NAME" />
            <Field label="Email" name="email" type="email" placeholder="OPERATOR@DOMAIN" />
            <Field label="Message" name="message" textarea placeholder="TRANSMISSION CONTENTS" />
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                {status === "idle" && "// awaiting input"}
                {status === "sending" && "// transmitting…"}
                {status === "sent" && <span className="text-orange-500">// signal received — i&rsquo;ll be in touch</span>}
              </span>
              <button type="submit" disabled={status === "sending"} className="btn-block disabled:opacity-50">
                Send →
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
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">// {label}</span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={5}
          placeholder={placeholder}
          className="mt-2 w-full bg-transparent border-2 border-ink px-4 py-3 font-mono text-sm placeholder:opacity-40 focus:outline-none focus:border-orange-500"
        />
      ) : (
        <input
          name={name}
          required
          type={type}
          placeholder={placeholder}
          className="mt-2 w-full bg-transparent border-2 border-ink px-4 py-3 font-mono text-sm placeholder:opacity-40 focus:outline-none focus:border-orange-500"
        />
      )}
    </label>
  );
}
