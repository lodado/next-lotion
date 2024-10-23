import { GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/Auth/index.server";
import { DomainServerRepository } from "@/features/blog/domain/server/repository";
import { GetDomainByUserIdUseCase } from "@/features/blog/domain/usecase";

import { CreateDomainPage } from "@/homepages/create-domain/index.server.";

import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const Layout = async ({ children }: PropsWithChildren) => {
  /*
  const isAlreadyUserCreatedDomain = await new GetDomainByUserIdUseCase(
    new DomainServerRepository(),
    new AuthServerRepository()
  ).getDomainByUserId();

  if (isAlreadyUserCreatedDomain) {
    console.log("WTF?");
  }
  */

  console.log(await new AuthServerRepository().getUserInfo());

  return <div className="w-full page-content flex justify-center">{children}</div>;
};

export default Layout;
