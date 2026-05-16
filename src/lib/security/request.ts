const DEFAULT_ORIGINS = [
  "https://avneetvirdi.com",
  "https://www.avneetvirdi.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function isAllowedOrigin(req: Request): boolean {
  if (process.env.NODE_ENV === "development") return true;

  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const origins = allowed.length > 0 ? allowed : DEFAULT_ORIGINS;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  if (origin && origins.some((o) => origin === o || origin.startsWith(`${o}/`))) {
    return true;
  }
  if (referer && origins.some((o) => referer.startsWith(o))) {
    return true;
  }

  return false;
}

/** Minimum time (ms) the contact form should be open before submit. */
export const MIN_FORM_READY_MS = 3000;
