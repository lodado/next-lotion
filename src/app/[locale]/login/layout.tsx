import { AuthServerRepository } from "@/entities/index.server";
import { Navigation } from "@/widgets/index.server";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation authRepository={new AuthServerRepository()} />
      {children}
    </>
  );
};

export default Layout;
