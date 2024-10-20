import { AuthServerRepository } from "@/entities/index.server";
import { Navigation } from "@/widgets/index.server";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation.Root>
        <Navigation.Header />
        <Navigation.Footer authRepository={new AuthServerRepository()} />
      </Navigation.Root>
      {children}
    </>
  );
};

export default Layout;
