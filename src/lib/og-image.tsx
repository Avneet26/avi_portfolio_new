import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Avneet Singh Virdi — Senior Frontend Engineer · React, Next.js, TypeScript";

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    { next: { revalidate: 60 * 60 * 24 } },
  ).then((res) => res.text());

  const match = css.match(/src: url\((.+)\) format\('(?:opentype|truetype|woff2)'\)/);
  if (!match?.[1]) throw new Error(`Failed to load font: ${family}`);

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export async function generateOgImage() {
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
          justifyContent: "space-between",
          background: "#fbfaf4",
          color: "#0e1620",
          padding: "52px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(14,22,32,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,22,32,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Cyan glow — right */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(88,174,195,0.35) 0%, transparent 68%)",
          }}
        />

        {/* Orange glow — bottom left */}
        <div
          style={{
            position: "absolute",
            left: -80,
            bottom: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,138,71,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            width: 22,
            height: 22,
            borderTop: "3px solid #0e1620",
            borderLeft: "3px solid #0e1620",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 36,
            width: 22,
            height: 22,
            borderTop: "3px solid #0e1620",
            borderRight: "3px solid #0e1620",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 36,
            width: 22,
            height: 22,
            borderBottom: "3px solid #0e1620",
            borderLeft: "3px solid #0e1620",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            width: 22,
            height: 22,
            borderBottom: "3px solid #0e1620",
            borderRight: "3px solid #0e1620",
          }}
        />

        {/* Top strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "Mono",
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                background: "#ff8a47",
                transform: "rotate(45deg)",
              }}
            />
            SFE.01 · Frontend Engineer · 2026
          </div>
          <div
            style={{
              fontFamily: "Mono",
              fontSize: 16,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3c4a55",
            }}
          >
            avneetvirdi.com
          </div>
        </div>

        {/* Main */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Display",
              fontSize: 108,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              textTransform: "uppercase",
            }}
          >
            Avneet Singh
          </div>
          <div
            style={{
              fontFamily: "Display",
              fontSize: 108,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              textTransform: "uppercase",
              color: "#ff8a47",
            }}
          >
            / Virdi
          </div>

          <div
            style={{
              marginTop: 28,
              fontFamily: "Display",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              color: "#2b7d92",
            }}
          >
            Senior Frontend Engineer
          </div>

          <div
            style={{
              marginTop: 20,
              maxWidth: 880,
              fontSize: 22,
              lineHeight: 1.45,
              color: "#3c4a55",
              fontFamily: "Display",
            }}
          >
            React · Next.js · TypeScript — frontend for CRO clients: Accor, Microsoft, Xbox ·
            4+ years shipping production web
          </div>

          {/* Tech chips */}
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {["React", "Next.js", "TypeScript", "A/B Testing", "OptiPhoenix"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontFamily: "Mono",
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  border: "2px solid #0e1620",
                  background: "#f1efe7",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    background: "#ff8a47",
                    transform: "rotate(45deg)",
                  }}
                />
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            borderTop: "2px solid #0e1620",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: "Mono",
              fontSize: 17,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#ff8a47" }}>▲</span>
            India · Remote · Open channel
          </div>
          <div
            style={{
              fontFamily: "Mono",
              fontSize: 17,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#3c4a55",
            }}
          >
            Portfolio · Resume · Contact
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Display", data: displayBold, style: "normal", weight: 700 },
        { name: "Mono", data: monoSemi, style: "normal", weight: 600 },
      ],
    },
  );
}
