import { SERVER_DI_REPOSITORY } from "@/DI/index.server";
import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { GetDomainByUserIdUseCase } from "@/features/blog/domain/models/core/usecase";

import { CreateDomainPage } from "@/homepages/create-domain/index.server.";

import { redirect } from "next/navigation";
import React from "react";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const Page = async () => {
  const isUserLogin = await new GetUserInfoUseCase(new SERVER_DI_REPOSITORY.Auth()).isUserLogin();
  if (!isUserLogin) redirect("/");

  const isAlreadyUserCreatedDomain = await new GetDomainByUserIdUseCase(
    new SERVER_DI_REPOSITORY.Domain(),
    new SERVER_DI_REPOSITORY.Auth()
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
