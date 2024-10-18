import { AuthRepositoryImpl, GetUserInfoUseCase } from "@/entities/Auth/core";
import { AuthServerRepository } from "@/entities/index.server";
import React from "react";
import { User } from "lucide-react";
import LoginNavBar from "./Login/components/LoginNavBar";
import { NavigationProvider } from "./Login/NavContext";

/** TO DO - PPR 적용 대상
 *
 *
 */
const Navigation = async ({ authRepository }: { authRepository: AuthRepositoryImpl }) => {
  const isLogin = await new GetUserInfoUseCase(authRepository).isUserLogin();

  return <NavigationProvider>{isLogin ? <LoginNavBar /> : <></>}</NavigationProvider>;
};

export default Navigation;
