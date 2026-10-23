"use client";

import Link from "next/link";
import {
  RESUME_DOWNLOAD_URL,
  resume,
  resumeContact,
  resumeExperience,
  resumeProjects,
  resumeSkills,
  resumeEducation,
} from "@/lib/resume";

export default function ResumeView() {
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
            <a
              href={RESUME_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-download"
            >
              <DownloadGlyph />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div className="resume-sheet-wrap">
      <article className="resume-sheet" aria-label="Resume">
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
              <div className="r-job-head">
                <h3 className="r-job-title">
                  {job.title}
                  <span className="r-job-company">
                    , {job.company}
                    {job.location ? `, ${job.location}` : ""}
                  </span>
                </h3>
                <span className="r-job-period">{job.period}</span>
              </div>
              <ul className="r-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="r-section">
          <SectionHead title="Projects" />
          {resumeProjects.map((p, i) => (
            <div key={i} className="r-job">
              <h3 className="r-job-title r-project-title">
                {p.title} <span className="r-job-stack">({p.stack.join(", ")})</span>
              </h3>
              <ul className="r-bullets">
                <li>
                  <span>
                    {p.description} (<a href={p.link}>{stripScheme(p.link)}</a>
                    {"secondaryLink" in p && p.secondaryLink ? (
                      <>
                        , <a href={p.secondaryLink}>{stripScheme(p.secondaryLink)}</a>
                      </>
                    ) : null}
                    )
                  </span>
                </li>
              </ul>
            </div>
          ))}
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
