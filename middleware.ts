import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const NEXTAUTH_FALLBACK_SECRET = "avniet-lms-super-secret-key-2026-production-ready";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || NEXTAUTH_FALLBACK_SECRET;

  // Try standard getToken
  let token = await getToken({ req, secret });

  // If running on HTTPS proxy (e.g. Vercel), try explicit secureCookie: true fallback
  if (!token) {
    token = await getToken({ req, secret, secureCookie: true });
  }
  // Try explicit secureCookie: false fallback
  if (!token) {
    token = await getToken({ req, secret, secureCookie: false });
  }

  // Check if session token cookie exists
  const hasSessionCookie = 
    req.cookies.has("__Secure-next-auth.session-token") ||
    req.cookies.has("next-auth.session-token");

  const { pathname } = req.nextUrl;

  // Protect /dashboard and /api/ai routes - only redirect if completely unauthenticated
  if (!token && !hasSessionCookie && (pathname.startsWith("/dashboard") || pathname.startsWith("/api/ai"))) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/ai/:path*",
  ],
};
