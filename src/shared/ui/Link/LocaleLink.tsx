"use client";

import useUrl from "@/shared/hooks/useUrl";
import { sanitizeUrl } from "@/shared/utils/sanitizeUrl";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { ComponentProps } from "react";

const LocaleLink = (props: ComponentProps<typeof Link> & { href?: string; subDomain?: string; custom?: boolean }) => {
  const { href = "", subDomain: _subDomain, custom = false, ...rest } = props;
  const { locale, params } = useUrl();

  let _href = href;
  let { subDomain = "www" } = params;
  subDomain = _subDomain || subDomain; 

  // 새로운 서브도메인 지정 (예: "newsub")
  const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
  const domain = isLocalhost ? "localhost" : process.env.NEXT_PUBLIC_DOMAIN;
  const protocol = isLocalhost ? "http" : "https";
  const port = window.location.port ? `:${window.location.port}` : "";

  const preSubDomain = isLocalhost ? "" : `${subDomain}.`;
  const postSubDomain = isLocalhost ? `${subDomain}` : "";

  // 서브도메인 및 locale prefix 추가하여 href 생성
  const LinkHref = custom ? _href : `${protocol}://${preSubDomain}${domain}${port}/${locale}/${postSubDomain}${_href}`;

  return <Link {...rest} href={sanitizeUrl(LinkHref)!} />;
};

export default LocaleLink;
