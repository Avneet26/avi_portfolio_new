"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./resume-bar.css";

const STORAGE_KEY = "asv:resume-bar-dismissed";
const APPEAR_DELAY_MS = 1800;

export default function ResumeBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="resume-bar"
          role="region"
          aria-label="Download resume"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
          className="resume-bar"
        >
          {/* Corner ticks */}
          <span aria-hidden className="rb-tick rb-tick-tl" />
          <span aria-hidden className="rb-tick rb-tick-tr" />

          {/* Top barcode strip */}
          <div aria-hidden className="rb-barcode" />

          <div className="rb-inner">
            {/* LEFT: meta */}
            <div className="rb-meta">
              <span className="rb-tag">
                <span className="rb-dot" />
                FILE · ASV-26 / RESUME
              </span>
              <span className="rb-head">
                <strong>Avneet Singh Virdi</strong>
                <span className="rb-sep">·</span>
                <span className="rb-sub">Senior Frontend Engineer · 4+ yrs</span>
              </span>
            </div>

            {/* MIDDLE: actions */}
            <div className="rb-actions">
              <a
                href="/resume"
                className="rb-btn rb-btn-ghost"
                aria-label="Open resume in a new tab"
              >
                <span className="rb-btn-glyph" aria-hidden>↗</span>
                View
              </a>
              <a
                href="/resume"
                className="rb-btn rb-btn-primary"
              >
                <DownloadGlyph />
                Download Resume · PDF
              </a>
            </div>

            {/* RIGHT: close */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss resume bar"
              className="rb-close"
            >
              <CloseGlyph />
            </button>
          </div>

        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function DownloadGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M12 4v12" />
      <path d="M6 11l6 6 6-6" />
      <path d="M5 20h14" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  );
}
