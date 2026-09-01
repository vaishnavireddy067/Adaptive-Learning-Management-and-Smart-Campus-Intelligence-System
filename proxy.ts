import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET || "avniet-lms-super-secret-key-2026-fallback-secret",
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/ai/:path*",
  ],
};
