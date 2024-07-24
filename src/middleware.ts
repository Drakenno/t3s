import { NextResponse } from "next/server";
import { authConfig } from "./auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // console.log("NEXTURL: ", nextUrl);
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", nextUrl.pathname);
  console.log("IS LOGGED IN: ", isLoggedIn);

  const isApiAuthRRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

// export function middleware(request: NextRequest) {
//   const nextUrl = request.nextUrl.pathname;
//   const headers = new Headers(request.headers);
//   headers.set("x-current-path", nextUrl);
//   return NextResponse.next({ headers });
// }
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
