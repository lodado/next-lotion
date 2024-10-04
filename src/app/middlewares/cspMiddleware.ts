import { NextRequest, NextResponse } from "next/server";
import { supabaseProjectId } from "../../shared/libs/supabase/projectId";

export const cspMiddleware = (request: NextRequest, response: NextResponse) => {
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
