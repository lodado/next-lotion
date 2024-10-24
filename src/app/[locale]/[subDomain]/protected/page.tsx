import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/Auth/index.server";
import { DomainServerRepository } from "@/features/blog/domain/server/repository";
import { GetDomainByUserIdUseCase } from "@/features/blog/domain/usecase";

import { CreateDomainPage } from "@/homepages/create-domain/index.server.";

import { redirect } from "next/navigation";
import React from "react";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

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
