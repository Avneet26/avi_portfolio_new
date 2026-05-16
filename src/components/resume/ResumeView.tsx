"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  resume,
  resumeContact,
  resumeExperience,
  resumeProjects,
  resumeSkills,
  resumeEducation,
  resumeFreelanceSummary,
} from "@/lib/resume";

const PDF_FILENAME = "Avneet_Singh_Virdi_Resume.pdf";

export default function ResumeView() {
  const sheetRef = useRef<HTMLElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    const node = sheetRef.current;
    if (!node || exporting) return;

    setExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [8, 8, 8, 8],
          filename: PDF_FILENAME,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
            letterRendering: true,
            /* Render at A4 pixel width regardless of actual viewport size.
               scrollX/scrollY compensate for current page scroll so the
               capture region aligns with the element's bounding rect. */
            windowWidth: 794,
            scrollX: 0,
            scrollY: -window.scrollY,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(node)
        .save();
    } catch {
      window.print();
    } finally {
      setExporting(false);
    }
  }, [exporting]);

  return (
    <div className="resume-shell">
      {/* Screen-only toolbar */}
      <div className="resume-toolbar">
        <div className="resume-toolbar-inner">
          <Link href="/" className="resume-back" aria-label="Back to portfolio">
            <span aria-hidden>←</span> Back to portfolio
          </Link>
          <div className="resume-toolbar-actions">
            <span className="resume-toolbar-meta">
              <span className="dot" /> Single page · A4 · Updated 2026
            </span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={exporting}
              className="resume-download"
            >
              <DownloadGlyph />
              {exporting ? "Generating PDF…" : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      <div className="resume-sheet-wrap">
      <article ref={sheetRef} className="resume-sheet" aria-label="Resume">
        <header className="r-head">
          <h1 className="r-name">{resume.name}</h1>
          <p className="r-headline">{resume.headline}</p>
          <p className="r-availability">{resume.availability}</p>

          <div className="r-contact" aria-label="Contact">
            {resumeContact.map((c, i) => (
              <span key={c.label} className="r-contact-item">
                <span className="r-contact-label">{c.label}:</span>{" "}
                {"href" in c && c.href ? (
                  <a href={c.href} className="r-contact-value">
                    {c.value}
                  </a>
                ) : (
                  <span className="r-contact-value">{c.value}</span>
                )}
                {i < resumeContact.length - 1 ? (
                  <span className="r-contact-divider" aria-hidden>
                    {" · "}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </header>

        <section className="r-section">
          <SectionHead title="Summary" />
          <p className="r-summary">{resume.summary}</p>
        </section>

        <section className="r-section">
          <SectionHead title="Skills" />
          <div className="r-skills">
            {resumeSkills.map((group) => (
              <p key={group.label} className="r-skill-row">
                <strong>{group.label}:</strong> {group.items.join(", ")}.
              </p>
            ))}
          </div>
        </section>

        <section className="r-section">
          <SectionHead title="Professional Experience" />
          {resumeExperience.map((job, i) => (
            <div key={`${job.company}-${i}`} className="r-job">
              <h3 className="r-job-title">
                {job.title} — {job.company}
              </h3>
              <p className="r-job-meta">
                {job.location} <span className="sep">·</span> {job.period}
              </p>
              <ul className="r-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="r-section">
          <SectionHead title="Projects and Freelance" />
          <ul className="r-compact-list">
            {resumeProjects.map((p, i) => (
              <li key={i}>
                <strong>{p.title}</strong>
                {p.link ? (
                  <>
                    {" "}
                    (<a href={p.link}>{stripScheme(p.link)}</a>)
                  </>
                ) : null}
                {" — "}
                {p.description} <em>{p.stack.join(", ")}</em>
              </li>
            ))}
          </ul>
          <p className="r-freelance">{resumeFreelanceSummary}</p>
        </section>

        <section className="r-section r-section-last">
          <SectionHead title="Education" />
          {resumeEducation.map((e, i) => (
            <p key={i} className="r-edu-line">
              <strong>{e.degree}</strong>
              <span className="sep"> · </span>
              {e.school}, {e.location}
              <span className="sep"> · </span>
              {e.period}
            </p>
          ))}
        </section>
      </article>
      </div>
    </div>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div className="r-section-head">
      <h2 className="r-section-title">{title}</h2>
    </div>
  );
}

function stripScheme(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function DownloadGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M12 4v12" />
      <path d="M6 11l6 6 6-6" />
      <path d="M5 20h14" />
    </svg>
  );
}
