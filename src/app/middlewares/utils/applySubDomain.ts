import { NextRequest, NextResponse } from "next/server";

const HEADER_LOCALE_NAME = "X-NEXT-INTL-LOCALE";

function hasTrailingSlash() {
  try {
    // Provided via `env` setting in `next.config.js` via the plugin
    return process.env._next_intl_trailing_slash === "true";
  } catch (e) {
    return false;
  }
}

export function normalizeTrailingSlash(pathname: string) {
  const trailingSlash = hasTrailingSlash();

  if (pathname !== "/") {
    const pathnameEndsWithSlash = pathname.endsWith("/");
    if (trailingSlash && !pathnameEndsWithSlash) {
      pathname += "/";
    } else if (!trailingSlash && pathnameEndsWithSlash) {
      pathname = pathname.slice(0, -1);
    }
  }

  return pathname;
}

export function applyBasePath(pathname: string, basePath: string) {
  return normalizeTrailingSlash(basePath + pathname);
}

/**
 * next-intl v3.20.0에서 발췌 및 수정
 * 단순히 NextResponse.rewrite 를 써서는 next-intl가 적용 안되어
 * 수정함
 * 2024-10-04
 */
export function applySubDomain(request: NextRequest, url: string, locale: string = "en") {
  const hostname = request.headers.get("host")!;

  const headers = new Headers(request.headers);
  headers.set(HEADER_LOCALE_NAME, locale);

  const searchParams = request.nextUrl.searchParams.toString();
  const requestUrl = request.nextUrl;

  const path = `${requestUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  const subDomain = hostname.split(".")[0];

  const urlObj = new URL(url, request.url);

  if (request.nextUrl.basePath) {
    urlObj.pathname = applyBasePath(`/${subDomain}${path}`, request.nextUrl.basePath);
  }

  if (subDomain !== hostname) {
    return NextResponse.rewrite(new URL(applyBasePath(`/${subDomain}${path}`, request.nextUrl.basePath), request.url), {
      request: { headers },
    });
  }

  return NextResponse.rewrite(urlObj, { request: { headers } });
}
