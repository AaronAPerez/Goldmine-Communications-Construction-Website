import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Create response with pathname header for layout detection
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  // Only apply auth logic to admin routes
  if (!pathname.startsWith('/admin')) {
    return response;
  }

  // Allow login page to be accessed
  if (pathname === '/admin/login') {
    return response;
  }

  // Check for NextAuth session token
  const sessionToken =
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('__Secure-authjs.session-token')?.value;

  // If no session token, redirect to login
  if (!sessionToken) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow authenticated users to proceed
  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files and API
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).)*',
  ],
};
