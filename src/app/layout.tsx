import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import Crosshair from "@/components/ui/Crosshair";
import IntroGate from "@/components/ui/IntroGate";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-google",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-google",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avneetvirdi.dev"),
  title: {
    default: "Avneet Singh Virdi — Senior Frontend Engineer",
    template: "%s | Avneet Singh Virdi",
  },
  description:
    "Senior Frontend Engineer at OptiPhoenix. 4+ years of full-time and freelance experience building production-grade web interfaces in React, Next.js, and TypeScript.",
  keywords: [
    "Avneet Singh Virdi",
    "Senior Frontend Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "OptiPhoenix",
    "Freelance Frontend",
  ],
  authors: [{ name: "Avneet Singh Virdi" }],
  creator: "Avneet Singh Virdi",
  openGraph: {
    type: "website",
    title: "Avneet Singh Virdi — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer at OptiPhoenix. 4+ years building production-grade web interfaces.",
    siteName: "Avneet Singh Virdi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avneet Singh Virdi — Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer at OptiPhoenix. 4+ years building production-grade web interfaces.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`}>
      <head>
        {/* Flash-prevention: apply stored/preferred theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Science+Gothic:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <IntroGate />
        <ThemeProvider>
          <MotionProvider>
            <LenisProvider>{children}</LenisProvider>
            <Crosshair />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
