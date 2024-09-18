/* eslint-disable turbo/no-undeclared-env-vars */

import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { supabaseProjectId } from "./shared/libs/supabase/projectId";
import { i18nOption } from "./shared/libs/i18n";
import { GetUserInfoUseCase } from "./entities/Auth/core";
import { AuthServerRepository } from "./entities/index.server";

export const runtime = "nodejs";

const redirectPath = (request: NextRequest, newPath: string) => {
  const url = request.nextUrl.clone();
  url.pathname = newPath;

  return NextResponse.redirect(url);
};

const cspMiddleware = (request: NextRequest, response: NextResponse) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    style-src 'self' 'unsafe-inline' spoqa.github.io cdn.jsdelivr.net data:;
    img-src 'self' blob: data: ${supabaseProjectId}.supabase.co;
    font-src 'self' cdnjs.cloudflare.com spoqa.github.io cdn.jsdelivr.net data:;
    script-src 'self' ${
      process.env.NODE_ENV !== "production" ? `'unsafe-eval'` : ""
    } 'nonce-${nonce}' 'strict-dynamic' cdn.jsdelivr.net;
    script-src-elem 'self' 'nonce-${nonce}';
    object-src 'none';
    connect-src 'self' https://www.google-analytics.com https://o4506497206779904.ingest.sentry.io;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    manifest-src 'self';
    report-uri https://o4506497206779904.ingest.sentry.io/api/4506497210253317/security/?sentry_key=c0d1bc230a8ad553b5f82c9efd56882a;
    report-to csp-endpoint;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  request.headers.set("x-nonce", nonce);
  request.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  response.headers.set("x-nonce", nonce);
  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return response;
};

const i18nMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const handleI18nRouting = await createIntlMiddleware(i18nOption as any);
  const response = handleI18nRouting(request);

  return cspMiddleware(request, response);
};


const withAuthApiMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const user = await new GetUserInfoUseCase(new AuthServerRepository()).execute();
  const response = NextResponse.next();

  // private page
  if (!user && /\/protected/.test(path)) {
    return NextResponse.json({ message: "Login required." }, { status: 401 });
  }

  return response;
};

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
};
