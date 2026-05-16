import React from "react";
import { ImageResponse } from "next/og";

export const linkedInCoverSize = { width: 1584, height: 396 };

const COLORS = {
  paper: "#0f1923",
  ink: "#dfd9cc",
  inkSoft: "#7b96a9",
  orange: "#d4672a",
  cyan: "#58aec3",
  /** Matches dark .bg-cyber-a + Hero 22px grid */
  gridFine: "rgba(223,217,204,0.18)",
  gridCyan: "rgba(88,174,195,0.09)",
  gridDot: "rgba(88,174,195,0.1)",
} as const;

const SITE_GRID_BACKGROUND = {
  backgroundColor: COLORS.paper,
  backgroundImage: [
    `radial-gradient(circle at 1px 1px, ${COLORS.gridDot} 1px, transparent 0)`,
    `linear-gradient(${COLORS.gridCyan} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${COLORS.gridCyan} 1px, transparent 1px)`,
    `linear-gradient(to right, ${COLORS.gridFine} 1px, transparent 1px)`,
    `linear-gradient(to bottom, ${COLORS.gridFine} 1px, transparent 1px)`,
  ].join(", "),
  backgroundSize: "4px 4px, 56px 56px, 56px 56px, 22px 22px, 22px 22px",
  backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0",
} as const;

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
  ).then((res) => res.text());

  const match = css.match(/src: url\((.+)\) format\('(?:opentype|truetype|woff2)'\)/);
  if (!match?.[1]) throw new Error(`Failed to load font: ${family}`);

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export async function generateLinkedInCover() {
  const [displayBold, monoSemi] = await Promise.all([
    loadGoogleFont("Space+Grotesk", 700),
    loadGoogleFont("JetBrains+Mono", 600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: COLORS.paper,
          color: COLORS.ink,
          padding: "36px 72px 36px 340px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Site grid — dot dust + 56px cyan + 22px fine (dark cyber-a + hero) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            ...SITE_GRID_BACKGROUND,
          }}
        />

        {/* Glows — left side (profile photo zone stays calmer) */}
        <div
          style={{
            position: "absolute",
            left: -80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(88,174,195,0.28) 0%, transparent 68%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 120,
            bottom: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(212,103,42,0.2) 0%, transparent 70%)`,
          }}
        />

        {/* Corner brackets — right */}
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 20,
            height: 20,
            borderTop: `2px solid ${COLORS.ink}`,
            borderRight: `2px solid ${COLORS.ink}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            width: 20,
            height: 20,
            borderBottom: `2px solid ${COLORS.ink}`,
            borderRight: `2px solid ${COLORS.ink}`,
          }}
        />

        {/* Text block — right aligned */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            position: "relative",
            zIndex: 1,
            gap: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "Mono",
              fontSize: 14,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: COLORS.inkSoft,
              marginBottom: 8,
            }}
          >
            SFE.01 · Frontend · 2026
            <div
              style={{
                width: 7,
                height: 7,
                background: COLORS.orange,
                transform: "rotate(45deg)",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "Display",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Avneet Singh
          </div>
          <div
            style={{
              fontFamily: "Display",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-2px",
              textTransform: "uppercase",
              color: COLORS.orange,
            }}
          >
            / Virdi
          </div>

          <div
            style={{
              marginTop: 12,
              fontFamily: "Display",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: COLORS.cyan,
            }}
          >
            Senior Frontend Engineer
          </div>

          <div
            style={{
              marginTop: 10,
              fontFamily: "Mono",
              fontSize: 15,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.inkSoft,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                background: COLORS.orange,
                transform: "rotate(45deg)",
              }}
            />
            React · Next.js · TypeScript
          </div>

          <div
            style={{
              marginTop: 14,
              fontFamily: "Mono",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.inkSoft,
            }}
          >
            avneetvirdi.com
          </div>
        </div>
      </div>
    ),
    {
      ...linkedInCoverSize,
      fonts: [
        { name: "Display", data: displayBold, style: "normal", weight: 700 },
        { name: "Mono", data: monoSemi, style: "normal", weight: 600 },
      ],
    },
  );
}
