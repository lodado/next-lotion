import { AuthServerRepository } from "@/entities/Auth/index.server";

import Navigation from "@/widgets/Navigation/ui/Navigation";

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

  return (
    <div className="w-full page-content flex justify-center">
      <Navigation.Root>
        <Navigation.Header />
        <Navigation.Footer authRepository={new AuthServerRepository()} />
      </Navigation.Root>
      {children}
    </div>
  );
};

export default Layout;
