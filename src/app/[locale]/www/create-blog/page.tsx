import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/Auth/index.server";
import { DomainServerRepository } from "@/features/blog/domain/server/repository";
import { GetDomainByUserIdUseCase } from "@/features/blog/domain/usecase";

import { CreateDomainPage } from "@/homepages/create-domain/index.server.";

import i18nOption, { LANGUAGE_LIST } from "@/shared/libs/i18n/lib/option";
import { redirect } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";

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
  const isUserLogin = await new GetUserInfoUseCase(new AuthServerRepository()).isUserLogin();
  if (!isUserLogin) redirect("/");

  const isAlreadyUserCreatedDomain = await new GetDomainByUserIdUseCase(
    new DomainServerRepository(),
    new AuthServerRepository()
  ).getDomainByUserId();

  if (!!isAlreadyUserCreatedDomain) {
    redirect("/");
  }

  return (
    <div className="w-full page-content flex justify-center">
      <CreateDomainPage />
    </div>
  );
};

export default Page;
