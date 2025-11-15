import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "SUPER_ADMIN" || token?.role === "ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Allow access to login page
    if (req.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Protect admin routes
    if (isAdminRoute && !token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Check role-based access for sensitive routes
    if (req.nextUrl.pathname.startsWith("/admin/settings") && !isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
// import { NextResponse, type NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET
//   });

//   const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
//   const isLoginPage = request.nextUrl.pathname === "/admin/login";

//   // Allow access to login page
//   if (isLoginPage) {
//     // Redirect to dashboard if already logged in
//     if (token) {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Protect admin routes
//   if (isAdminRoute && !token) {
//     const loginUrl = new URL("/admin/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Check role-based access for sensitive routes
//   const isAdmin = token?.role === "SUPER_ADMIN" || token?.role === "ADMIN";
//   if (request.nextUrl.pathname.startsWith("/admin/settings") && !isAdmin) {
//     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
