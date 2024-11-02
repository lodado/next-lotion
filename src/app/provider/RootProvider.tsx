import { SERVER_DI_REPOSITORY } from "@/DI/index.server";

import React, { PropsWithChildren } from "react";
import ClientProvider from "./ClientProvider";
import { AuthProvider, GetUserSessionInfoUseCase } from "@/entities/index.server";
import { Domain, domainInitialState, GetDomainByUserIdUseCase } from "@/features/blog/domain/models";

const RootProvider = async ({ children }: PropsWithChildren) => {
  const session = await new GetUserSessionInfoUseCase(new SERVER_DI_REPOSITORY.Auth()).execute();

  const userDomain = session
    ? await new GetDomainByUserIdUseCase(new SERVER_DI_REPOSITORY.Domain(), new SERVER_DI_REPOSITORY.Auth()).getDomainByUserId()
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
