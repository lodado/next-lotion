import { AuthRepositoryImpl, UserEntity } from "@/entities/Auth/core";
import { signOut } from "next-auth/react";

export default class AuthClientRepository implements AuthRepositoryImpl {
  // TODO: login 가능한 dialog가 띄워짐
  login(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    await signOut({ redirect: false });
  }
  getUserInfo(): Promise<UserEntity | undefined> {
    throw new Error("Method not implemented.");
  }
}
