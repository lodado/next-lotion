/* eslint-disable turbo/no-undeclared-env-vars */

import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { applySubDomain } from "./utils/applySubDomain";
import { cspMiddleware } from "./cspMiddleware";
import { i18nOption } from "@/shared/libs/i18n/lib/option";
 
export const runtime = "nodejs";

export const i18nMiddleware = async (request: NextRequest, path: string, defaultLocale: string) => {
  const handleI18nRouting = await createIntlMiddleware(i18nOption as any);
  const res = handleI18nRouting(request);

  const response = applySubDomain(request, res);

  return cspMiddleware(request, response);
};
