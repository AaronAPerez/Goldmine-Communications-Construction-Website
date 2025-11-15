import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  // Allow access to login page
  if (isLoginPage) {
    // Redirect to dashboard if already logged in
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    const response = NextResponse.next();
    response.headers.set('x-pathname', req.nextUrl.pathname);
    return response;
  }

  // Protect admin routes - redirect to login if not authenticated
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Check role-based access for sensitive routes
  if (req.nextUrl.pathname.startsWith("/admin/settings")) {
    const role = req.auth?.user?.role;
    const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // Add pathname to headers for layout detection
  const response = NextResponse.next();
  response.headers.set('x-pathname', req.nextUrl.pathname);
  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};