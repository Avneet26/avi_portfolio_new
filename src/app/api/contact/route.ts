import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/security/rate-limit";
import {
  getClientIp,
  isAllowedOrigin,
  MIN_FORM_READY_MS,
} from "@/lib/security/request";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "avneetvirdi26@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(req);
  const limited = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website, formReadyMs } =
    (body as Record<string, unknown>) || {};

  // Honeypot — silently succeed if filled (bot)
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Timing honeypot — reject instant submissions (bots)
  if (
    typeof formReadyMs !== "number" ||
    !Number.isFinite(formReadyMs) ||
    formReadyMs < MIN_FORM_READY_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (typeof name !== "string" || name.trim().length < 2) errors.push("name");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("email");
  if (typeof message !== "string" || message.trim().length < 1) errors.push("message");
  if (errors.length) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
  }

  if (typeof message === "string" && message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(String(name).trim());
  const safeEmail = escapeHtml(String(email).trim());
  const safeMessage = escapeHtml(String(message).trim()).replace(/\n/g, "<br />");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: String(email).trim(),
      subject: `Portfolio contact — ${safeName}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; color: #0e1620; max-width: 560px;">
          <h2 style="margin: 0 0 12px; font-size: 18px; letter-spacing: 0.05em; text-transform: uppercase; color: #2b7d92;">
            New contact transmission
          </h2>
          <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 6px 8px; background: #f1efe7; width: 96px; font-weight: 600;">Name</td>
              <td style="padding: 6px 8px; background: #fbfaf4;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 8px; background: #f1efe7; font-weight: 600;">Email</td>
              <td style="padding: 6px 8px; background: #fbfaf4;">
                <a href="mailto:${safeEmail}" style="color: #c25a1f;">${safeEmail}</a>
              </td>
            </tr>
          </table>
          <h3 style="margin: 18px 0 8px; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #3c4a55;">
            Message
          </h3>
          <div style="border-left: 3px solid #ff8a47; padding: 8px 12px; background: #fff; line-height: 1.6;">
            ${safeMessage}
          </div>
          <p style="margin-top: 18px; font-size: 12px; color: #3c4a55;">
            Reply to this email to respond directly.
          </p>
        </div>
      `,
      text: `New contact transmission

Name: ${String(name).trim()}
Email: ${String(email).trim()}

Message:
${String(message).trim()}
`,
    });

    if (result.error) {
      console.error("[contact] resend error", result.error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
