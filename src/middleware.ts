import { decrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const loginPage = "/login";
  const pathname = request.nextUrl.pathname;

  const rawAuthCookieValue = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string
  )?.value;
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
  matcher: [
    // Root path
    "/",

    // Locale-prefixed pages
    "/(my|en)/:path*",

    // All other paths excluding _next, _vercel, static files, and api
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
