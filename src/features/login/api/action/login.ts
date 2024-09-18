"use server";

import { LOGIN_METHOD } from "./variable";
import { AuthServerRepository } from "@/entities/index.server";
import { AuthError } from "next-auth";
import { Oauth2LoginUsecase } from "@/entities/Auth/core";

// eslint-disable-next-line consistent-return
export async function authenticateAction(prevState: any, formData: FormData) {
  const signupMethod = formData.get(LOGIN_METHOD);
  try {
    await new Oauth2LoginUsecase(new AuthServerRepository(signupMethod as string)).execute();
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
