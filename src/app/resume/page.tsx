import type { Metadata } from "next";
import ResumeView from "@/components/resume/ResumeView";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume — Avneet Singh Virdi",
  description:
    "Senior Frontend Engineer · 4+ years building production web interfaces in React, Next.js, TypeScript · CRO experiments for Accor, Microsoft, Xbox.",
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return <ResumeView />;
}
