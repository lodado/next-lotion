import { AuthRepositoryImpl, UserEntity } from "@/entities/Auth/core";
import { signOut } from "next-auth/react";

export default class AuthClientRepository implements AuthRepositoryImpl {
  private user: UserEntity;

  constructor(user?: UserEntity) {
    this.user = user!;
  }

  // TODO: login 가능한 dialog가 띄워짐
  login(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async logout(): Promise<void> {
    await signOut({ redirect: false });
  }
  getUserInfo(): Promise<UserEntity | undefined> {
    return Promise.resolve(this.user);
  }
}
