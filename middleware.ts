import { NextRequest, NextResponse } from "next/server";

// Auth.js v5 session cookie names (dev vs prod/HTTPS)
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const adminRoutes = ["/admin", "/admin/users"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAdmin = adminRoutes.some((r) => pathname.startsWith(r));

  if (!isProtected && !isAdmin) return NextResponse.next();

  const hasSession = SESSION_COOKIES.some((name) => req.cookies.has(name));

  if (!hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role enforcement for admin routes is handled in app/(admin)/layout.tsx
  // which calls requireRole("ADMIN") server-side with a full DB session lookup.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/admin/:path*"],
};
