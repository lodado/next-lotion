"use client";

import { PropsWithChildren } from "react";

import { ReactQueryProvider, ThemeProvider } from "@/shared";

import { store } from "../models/store";
import ReduxInitStoreProvider from "./ReduxInitStoreProvider";
import { NextAuthSessionResponse } from "@/entities/Auth/server/type";

const ClientProvider = ({
  children,
  session,
}: PropsWithChildren & {
  session: NextAuthSessionResponse | undefined;
}) => {
  return (
    <ReactQueryProvider>
      <ReduxInitStoreProvider session={session} initStore={store}>
        {children}
      </ReduxInitStoreProvider>
    </ReactQueryProvider>
  );
};

export default ClientProvider;
