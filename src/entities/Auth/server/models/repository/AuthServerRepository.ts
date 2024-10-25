import { USER_ID_SPLITTER } from "@/shared";
import { UserEntity, AuthRepositoryImpl } from "../../../core";
import { auth, signIn, signOut } from "../../libs/auth";
import { NextAuthSessionResponse } from "../../type";

export default class AuthServerRepository implements AuthRepositoryImpl {
  constructor(private signUpMethod?: string) {}

  getUserSessionInfo = async (): Promise<NextAuthSessionResponse> => {
    const session = await auth();

    if (session?.user) {
      session.user = {
        id: session.user.id.split(USER_ID_SPLITTER)[0],
        name: session.user.name,
        email: session.user.email,
        picture: session.user.picture,
      }; // filter out sensitive data
    }

    return session as NextAuthSessionResponse;
  };

  async login(): Promise<void> {
    await signIn(this.signUpMethod, { redirect: false });
  }

  logout(): Promise<void> {
    return signOut();
  }

  getUserInfo = async (): Promise<UserEntity | undefined> => {
    const user = (await this.getUserSessionInfo())?.user;

    if (!user) return Promise.resolve(undefined);

    return new UserEntity({ ...user });
  };
}
