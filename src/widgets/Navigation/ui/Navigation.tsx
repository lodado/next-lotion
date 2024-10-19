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
  return (
    <NavigationProvider>
      <LoginNavBar authRepository={authRepository} />
    </NavigationProvider>
  );
};

export default Navigation;
