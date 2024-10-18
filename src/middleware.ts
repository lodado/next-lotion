/* eslint-disable turbo/no-undeclared-env-vars */

import { NextRequest, NextResponse } from "next/server";

import { i18nMiddleware, withAuthApiMiddleware } from "./app/middlewares/index.server";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

  // sentry
  if (path.startsWith("/monitoring")) {
    return NextResponse.next();
  }

  if (path.startsWith("/api")) {
    return withAuthApiMiddleware(request, path, defaultLocale);
  }

  return i18nMiddleware(request, path, defaultLocale);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|js|json)$).*)"],
  unstable_allowDynamic: ["@mui/icons-material/esm/Check.js", "@mui/icons-material/esm/KeyboardArrowDown.js"],
};
