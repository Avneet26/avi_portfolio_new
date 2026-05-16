"use client";

import { usePathname } from "next/navigation";
import ResumeBar from "./ResumeBar";

export default function ResumeBarRouted() {
  const pathname = usePathname();
  if (pathname?.startsWith("/resume")) return null;
  return <ResumeBar />;
}
