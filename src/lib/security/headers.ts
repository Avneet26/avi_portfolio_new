const isProd = process.env.NODE_ENV === "production";

export function securityHeaders(): Record<string, string> {
  // Next.js dev (HMR / react-refresh) needs unsafe-eval; never allow in production.
  const scriptSrc = isProd
    ? "'self' 'unsafe-inline' https://va.vercel-scripts.com"
    : "'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com";

  const connectSrc = isProd
    ? "'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com"
    : "'self' ws: wss: https://vitals.vercel-insights.com https://va.vercel-scripts.com";

  const headers: Record<string, string> = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "X-DNS-Prefetch-Control": "on",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-site",
    "Content-Security-Policy": [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      `connect-src ${connectSrc}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  };

  if (isProd) {
    headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload";
  }

  return headers;
}
