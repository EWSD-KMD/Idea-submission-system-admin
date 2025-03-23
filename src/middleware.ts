import { decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const loginPage = "/login";
  const pathname = request.nextUrl.pathname;

  const rawAuthCookieValue = request.cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string)?.value;
  const authCookieValue = decrypt(rawAuthCookieValue);

  const isLoggedIn = Boolean(authCookieValue.accessToken);
  const isLoginPage = pathname === loginPage;

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(request.nextUrl.origin));
  }

  if (!isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL(request.nextUrl.origin + loginPage));
  }

  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(my|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
