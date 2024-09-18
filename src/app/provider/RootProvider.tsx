import React, { PropsWithChildren } from "react";

import ClientProvider from "./ClientProvider";
import { AuthProvider, AuthServerRepository, GetUserSessionInfoUseCase } from "@/entities/index.server";

const RootProvider = async ({ children }: PropsWithChildren) => {
  /* RSC에서 API를 caching하는 방법도 있긴 한데 
    라이브러리 sideEffect가 발생할 수도 있어서 
    해당 방법을 사용하려면 조사해야함
    그냥 props drilling으로 하는게 나을듯
  */
  const session = await new GetUserSessionInfoUseCase(new AuthServerRepository()).execute();
  return (
    <ClientProvider session={session}>
      <AuthProvider session={session}>{children}</AuthProvider>
    </ClientProvider>
  );
};

export default RootProvider;
