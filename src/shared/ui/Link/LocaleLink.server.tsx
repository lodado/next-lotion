import { getLocale } from "next-intl/server";
import Link from "next/link";
import React, { ComponentProps, ComponentType } from "react";

const LocaleLink = async (props: ComponentProps<typeof Link> & { href?: string }) => {
  const { href = "", ...rest } = props;
  const locale = await getLocale();
  let _href = href;

  if (_href !== "" && _href?.[0] !== "/") {
    _href = `/${_href}`;
  }

  const LinkHref = `/${locale}${_href}`;

  return <Link {...rest} href={LinkHref} />;
};

export default LocaleLink;
