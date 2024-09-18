import React, { PropsWithChildren } from "react";

import LoginSessionProvider from "./LoginSessionProvider";
import { NextAuthSessionResponse } from "../../server/type";

const AuthProvider = async ({
  children,
  session,
}: PropsWithChildren & {
  session: NextAuthSessionResponse | undefined;
}) => {
  return <LoginSessionProvider session={session}>{children}</LoginSessionProvider>;
};

export default AuthProvider;
