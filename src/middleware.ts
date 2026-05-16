import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBlockedBot } from "@/lib/security/bots";
import { securityHeaders } from "@/lib/security/headers";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent");
  const { pathname } = request.nextUrl;

  if (isBlockedBot(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Block direct API probing without a browser-like Accept header
  if (pathname.startsWith("/api/")) {
    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("application/json") && !accept.includes("*/*")) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(securityHeaders())) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
