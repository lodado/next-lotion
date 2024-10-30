import React, { PropsWithChildren } from "react";

import ClientProvider from "./ClientProvider";
import { AuthProvider, AuthServerRepository, GetUserSessionInfoUseCase } from "@/entities/index.server";
import { Domain, domainInitialState, GetDomainByUserIdUseCase } from "@/features/blog/domain/models";
import { DomainServerRepository } from "@/features/blog/domain/models/server/repository";

const RootProvider = async ({ children }: PropsWithChildren) => {
  const session = await new GetUserSessionInfoUseCase(new AuthServerRepository()).execute();

  const userDomain = session
    ? await new GetDomainByUserIdUseCase(new DomainServerRepository(), new AuthServerRepository()).getDomainByUserId()
    : undefined;

  return (
    <ClientProvider
      session={session}
      userDomain={
        userDomain ?? {
          userId: "",
          domainId: -1, // null
          domainName: "",
          domainLocation: "",
          createdTime: Date.now(),
          description: "",
          image: "",
          language: "en",
        }
      }
    >
      <AuthProvider session={session}>{children}</AuthProvider>
    </ClientProvider>
  );
};

export default RootProvider;
