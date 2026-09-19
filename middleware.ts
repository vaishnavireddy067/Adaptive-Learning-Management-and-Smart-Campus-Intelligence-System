import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const NEXTAUTH_FALLBACK_SECRET = "avniet-lms-super-secret-key-2026-production-ready";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || NEXTAUTH_FALLBACK_SECRET
  });

  const { pathname } = req.nextUrl;

  // Protect /dashboard and /api/ai routes
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/api/ai"))) {
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
