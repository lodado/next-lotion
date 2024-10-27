import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/Auth/index.server";
import { DomainServerRepository } from "@/features/blog/domain/models/server/repository";
import { GetDomainByUserIdUseCase } from "@/features/blog/domain/models/core/usecase";

import { CreateDomainPage } from "@/homepages/create-domain/index.server.";

import i18nOption, { LANGUAGE_LIST } from "@/shared/libs/i18n/lib/option";
import { redirect } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import { getLinkHref } from "@/shared";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export async function generateMetadata() {
  return {
    title: "Create Domain",
    description: "Create a new domain for your project.",

    alternates: {
      canonical: "/en" + "/create-blog",
      languages: {
        ...i18nOption.locales
          .filter((ele) => ele !== "en")
          .reduce((total: any, ele) => {
            total[ele] = `/${ele}` + "/create-blog";
            return total;
          }, {}),
      },
    },
  };
}

const Page = async () => {
  const UserCreatedDomain = await new GetDomainByUserIdUseCase(
    new DomainServerRepository(),
    new AuthServerRepository()
  ).getDomainByUserId();

  const isAlreadyUserCreatedDomain = !!UserCreatedDomain;

  if (isAlreadyUserCreatedDomain) {
    const subDomainLocation = UserCreatedDomain.domainLocation;

    redirect(await getLinkHref({ subDomain: `${subDomainLocation}`, href: "/" }));
  }

  return (
    <div className="w-full page-content flex justify-center">
      <CreateDomainPage />
    </div>
  );
};

export default Page;
